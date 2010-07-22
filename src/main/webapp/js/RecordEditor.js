/*
Copyright 2009-2010 University of Toronto

Licensed under the Educational Community License (ECL), Version 2.0. 
ou may not use this file except in compliance with this License.

You may obtain a copy of the ECL 2.0 License at
https://source.collectionspace.org/collection-space/LICENSE.txt
*/

/*global jQuery, fluid, cspace*/
"use strict";

cspace = cspace || {};

(function ($, fluid) {
    fluid.log("RecordEditor.js loaded");

    // operation = one of "create", "delete", "fetch", "update"
    var makeDCErrorHandler = function (that) {
        return function (operation, message) {
            var msgKey = operation + "FailedMessage";
            var msg = that.options.strings[msgKey] + message;
            cspace.util.displayTimestampedMessage(that.dom, msg, "");
            that.events.onError.fire(operation);
            if (operation === "create") {
                // This is only temporary until http://issues.collectionspace.org/browse/CSPACE-263
                // is resolved
                that.applier.requestChange("csid", undefined);
            }
        };
    };

    var validateIdentificationNumber = function (domBinder, container, message) {
        return function () {
            var required = domBinder.locate("identificationNumber");
            if (required === container) {
                return true;
            }
            if ($.trim(required.val()) === "") {
                cspace.util.displayTimestampedMessage(domBinder, message);
                return false;
            }
            return true;
        };
    };
    
    var validateRequiredFields = function (domBinder, message) {
        var required = domBinder.locate("requiredFields");
        for (var i = 0; i < required.length; i++) {
            if (required[i].value === "") {
                cspace.util.displayTimestampedMessage(domBinder, message);
                return false;
            }
        }
        return true;
    };

    var bindEventHandlers = function (that) {
        $(that.options.selectors.confirmationInclude + ":not(" + that.options.selectors.confirmationExclude + ")").live("click", that.showConfirmation);

        that.events.onSave.addListener(validateIdentificationNumber(that.dom, that.container, that.options.strings.identificationNumberRequired));

        that.events.onSave.addListener(function () {
            cspace.util.displayTimestampedMessage(that, that.options.strings.savingMessage, "");
        });
        
        that.events.onSave.addListener(function () {
            return validateRequiredFields(that.dom, that.options.strings.missingRequiredFields);
        });

        that.dataContext.events.afterCreate.addListener(function (data) {
            that.applier.requestChange("csid", data.csid);
            that.locate("deleteButton").removeAttr("disabled").removeClass("deactivate");
            that.events.afterCreateObjectDataSuccess.fire(data, that.options.strings.createSuccessfulMessage);
            that.applier.requestChange("termsUsed", data.termsUsed);
	        cspace.util.displayTimestampedMessage(that, that.options.strings.createSuccessfulMessage, Date());
            that.unsavedChanges = false;
        });

        that.dataContext.events.afterUpdate.addListener(function (data) {
            that.events.afterUpdateObjectDataSuccess.fire(data, that.options.strings.updateSuccessfulMessage);
            that.applier.requestChange("termsUsed", data.termsUsed);
	        cspace.util.displayTimestampedMessage(that, that.options.strings.updateSuccessfulMessage, Date());
            that.unsavedChanges = false;
        });

        that.dataContext.events.afterRemove.addListener(function () {
            that.events.afterRemove.fire(that.options.strings.removeSuccessfulMessage);
        });

        that.dataContext.events.modelChanged.addListener(function (data) {
            that.refreshView();
        });
        
        that.dataContext.events.afterFetch.addListener(function () {
            that.unsavedChanges = false;
        });
        
        var setUnchanged = function () {
            that.unsavedChanges = true;
        };
        
        that.applier.modelChanged.addListener("*", setUnchanged);

        that.events.afterRender.addListener(function () {
            that.locate("save").click(that.requestSave);
            that.locate("deleteButton").click(that.remove);
            that.locate("cancel").click(function () {
                that.locate("messageContainer", "body").hide();
                that.events.onCancel.fire();
            });
			cspace.util.setZIndex();
			cspace.util.corner();
        });

        that.dataContext.events.onError.addListener(makeDCErrorHandler(that));
    };
    
    var setupDataEntry = function (that) {
        bindEventHandlers(that);
        that.refreshView();
    };
    
    var renderPage = function (that) {
        fluid.log("RecordEditor.js renderPage start");
        var expander = fluid.renderer.makeProtoExpander({ELstyle: "${}"});
        var protoTree = cspace.renderUtils.buildProtoTree(that.uispec, that);
        fluid.log("RecordEditor.js after buildProtoTree");
        var tree = expander(protoTree);
        cspace.renderUtils.fixSelectionsInTree(tree);
        fluid.log("RecordEditor.js after tree is fixed");
        var selectors = {};
        cspace.renderUtils.buildSelectorsFromUISpec(that.uispec, selectors);
        fluid.log("RecordEditor.js after building selectors");
        var renderOpts = {
            cutpoints: fluid.engage.renderUtils.selectorsToCutpoints(selectors, {}),
            model: that.model,
            // debugMode: true,
            autoBind: true,
            applier: that.applier
        };
        
        fluid.log("RecordEditor.js before render");
        if (that.template) {
            fluid.reRender(that.template, that.container, tree, renderOpts);
            fluid.log("RecordEditor.js after reRender");
        }
        else {
            that.template = fluid.selfRender(that.container, tree, renderOpts);
            fluid.log("RecordEditor.js after selfRender");
        }
        // TODO: This comparison against test@collectionspace.org is a hack put in place for the 0.6
        // release to prevent testers from deleting the test account. It should be removed asap
        if (!that.model.csid || (that.model.fields.email === "test@collectionspace.org")) {
            that.locate("deleteButton").attr("disabled", "disabled").addClass("deactivate");
        } else {
            that.locate("deleteButton").removeAttr("disabled").removeClass("deactivate");
        }
        that.events.afterRender.fire();
        fluid.log("RecordEditor.js renderPage end");
    };

    /**
     * Object Entry component
     */
    cspace.recordEditor = function (container, dataContext, applier, uispec, options) {
        var that = fluid.initView("cspace.recordEditor", container, options);
        that.dataContext = dataContext;
        that.applier = applier;
        that.uispec = uispec;
        that.model = that.applier.model;

        that.refreshView = function () {
            renderPage(that);
            that.locate("messageContainer", "body").hide();
        };
        
        that.showSpecErrorMessage = function (msg) {
            that.locate("errorMessage", "body").text(msg);
            that.locate("errorDialog", "body").dialog({
                modal: true,
                dialogClass: "fl-widget"
            });
        };

        /*
         * return: Boolean true if the save was submitted, false if it was prevented by any event listeners.
         * Note that a return value of true does not necessarily indicate that the save was successful, only that
         * it was successfully submitted.
         */
        that.requestSave = function () {
            var ret = that.events.onSave.fire(that.model);
            if (ret !== false) {
                if (that.model.csid) {
                    that.dataContext.update();
                } else {
                    that.applier.requestChange("csid", "");
                    that.dataContext.create();
                }
                return true;
            }
            return false;
        };
        
        that.remove = function () {
            that.dataContext.remove(that.model.csid);
        };
        
        that.confirmation = fluid.initSubcomponent(that, "confirmation", [
            that.container,
            $.extend(true, {
                action: that.requestSave,
                actionSuccessEvents: [that.events.afterCreateObjectDataSuccess, that.events.afterUpdateObjectDataSuccess],
                actionErrorEvents: [that.events.onError]
            }, that.options.confirmation.options) 
        ]);
        
        that.showConfirmation = function () {
            if (that.unsavedChanges) {
                // TODO: confirmation only works on element clicks that have an href
                // http://issues.collectionspace.org/browse/CSPACE-1813
                that.confirmation.open($(this).attr("href"));
                return false;
            }
        };

        setupDataEntry(that);
        that.unsavedChanges = false;

        return that;
    };
    
    fluid.defaults("cspace.recordEditor", {
        confirmation: {
            type: "cspace.confirmation"
        },
        events: {
	        onSave: "preventable",
            onCancel: null,
            afterCreateObjectDataSuccess: null,  // params: data, textStatus
            afterUpdateObjectDataSuccess: null,  // params: data, textStatus
            afterRemove: null, // params: textStatus
            onError: null,  // params: operation
            afterRender: null
        },
        selectors: {
            errorDialog: ".csc-error-dialog",
            errorMessage: ".csc-error-message",
            save: ".csc-save",
            cancel: ".csc-cancel",
            deleteButton: ".csc-delete",
            messageContainer: ".csc-message-container",
            feedbackMessage: ".csc-message",
            timestamp: ".csc-timestamp",
            relatedRecords: ".csc-related-records",
            requiredFields: ".csc-required:visible",
            confirmationInclude: "a",
            confirmationExclude: "[href*=#], .csc-confirmation-exclusion, .ui-autocomplete a"
        },
        strings: {
            specFetchError: "I'm sorry, an error has occurred fetching the UISpec: ",
            errorRecoverySuggestion: "Please try refreshing your browser",
            savingMessage: "Saving, please wait...",
            updateSuccessfulMessage: "Record successfully saved",
            createSuccessfulMessage: "New Record successfully created",
            removeSuccessfulMessage: "Record successfully deleted",
            updateFailedMessage: "Error saving Record: ",
            createFailedMessage: "Error creating Record: ",
            deleteFailedMessage: "Error deleting Record: ",
            fetchFailedMessage: "Error retriving Record: ",
            addRelationsFailedMessage: "Error adding related records: ",
            defaultTermIndicator: " (default)",
            noDefaultInvitation: "-- Select an item from the list --",
            missingRequiredFields: "Some required fields are empty"
        }
    });
})(jQuery, fluid);
