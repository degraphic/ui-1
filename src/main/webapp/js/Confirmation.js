/*
Copyright 2009-2010 University of Toronto

Licensed under the Educational Community License (ECL), Version 2.0. 
You may not use this file except in compliance with this License.

You may obtain a copy of the ECL 2.0 License at
https://source.collectionspace.org/collection-space/LICENSE.txt
*/

/*global jQuery, fluid, window, cspace*/
"use strict";

cspace = cspace || {};

(function ($, fluid) {
    fluid.log("Confirmation.js loaded");
    
    var updateHandlerForEvents = function (action, events, handler, namespace) {
        $.each(events, function (index, event) {
            var updateListener = event[action + "Listener"];
            if (action === "add") {
                updateListener(handler, namespace);
            }
            else {
                updateListener(namespace);
            }
        });
    };
    
    var bindEvents = function (that) {
        that.locate("cancel", that.dlg).click(function () {
            that.close();
        });
        that.locate("close", that.dlg).click(function () {
            that.close();
        });
        that.locate("proceed", that.dlg).click(function (e) {
            that.successHandler();
        });
        that.locate("act", that.dlg).click(function (e) {
            that.options.action();
        });
        that.dlg.bind("dialogclose", function () {
            that.events.afterClose.fire();
        });
        that.dlg.bind("dialogopen", function () {
            that.events.afterOpen.fire();
        });
    };
    
    var addButtonToTree = function (id, strings, styles) {
        return {
            ID: id,
            decorators: [{
                type: "attrs",
                attributes: {
                    alt: strings[id + "Alt"],
                    value: strings[id + "Text"]
                } 
            }, {
                type: "addClass",
                classes: styles[id]
            }]
        };
    };
    
    var buildTree = function (strings, styles, enableButtons) {        
        var tree = {
            children: [{
                ID: "message:",
                messagekey: "primaryMessage"
            }, {
                ID: "close",
                decorators: {
                    type: "attrs",
                    attributes: {
                        alt: strings.closeAlt                        
                    }
                }
            }]
        };
        
        $.each(enableButtons, function (index, button) {
            tree.children.push(addButtonToTree(button, strings, styles));
        });
                
        if (strings.secondaryMessage) {
            tree.children.push({
                ID: "message:",
                messagekey: "secondaryMessage"
            });
        }
        
        return tree;
    };

    cspace.confirmation = function (container, options) {
        var that = fluid.initRendererComponent("cspace.confirmation", container, options);
        
        that.updateEventListeners = function (action) {
            updateHandlerForEvents(action, that.options.actionSuccessEvents, that.successHandler, "successHandler");
            updateHandlerForEvents(action, that.options.actionErrorEvents, that.close, "errorHandler");
        };
        
        that.dlg = $("<div></div>", that.container[0].ownerDocument).dialog({
            autoOpen: false,
            modal: true,
            title: that.options.strings.confirmationTitle
        });
        
        that.refreshView = function () {
            that.renderer.refreshView();
            bindEvents(that);
            that.events.afterRender.fire(that);
        };
        
        that.close = function () {
            that.dlg.dialog("close");
            that.updateEventListeners("remove");
        };
        that.open = function (successHandlerCreator, options) {
            that.successHandler = (successHandlerCreator || that.options.successHandlerCreator)(that, options);
            that.updateEventListeners("add");
            that.dlg.dialog("open");
        };
        
        that.refreshView();
        return that;
    };
    
    cspace.confirmation.getDialogGetter = function(that) {
        return function() {
            return that.dlg;
        }
    };
    
    cspace.confirmation.produceTree = function(that) {
        return buildTree(that.options.strings, that.options.styles, that.options.enableButtons);
    };
    
    cspace.confirmation.defaultSuccessHandlerCreator = function (confirmation, options) {
        var that = fluid.initLittleComponent("cspace.confirmation.defaultSuccessHandler", options);
        return function () {
            if (!that.options.href) {
                confirmation.close();
            }
            else {
                confirmation.updateEventListeners("remove");
                window.location = that.options.href;
            }
        };
    };
    
    fluid.defaults("cspace.confirmation.defaultSuccessHandler", {
        href: "#"
    });
    
    fluid.defaults("cspace.confirmation", {
        successHandlerCreator: cspace.confirmation.defaultSuccessHandlerCreator,
        selectors: {
            dialog: { // This shenanigans is necessary since right now the DOM binder is specified
            // to accept only a context-free function, and the dialog markup will not be created until
            // after initRendererFunction returns. This could be resolved by means of the "ginger world".
                expander: {
                    type: "fluid.deferredCall",
                    func: "cspace.confirmation.getDialogGetter",
                    args: ["{confirmation}"]
                }
            },
            cancel: ".csc-confirmationDialogButton-cancel",
            proceed: ".csc-confirmationDialogButton-proceed",
            act: ".csc-confirmationDialogButton-act",
            close: ".csc-confirmationDialog-closeBtn",
            // Had to add a : because we currently can not use the expander
            // with repeating rows and message bundle at the same time.
            "message:": ".csc-confirmationDialog-text"
        },
        selectorsToIgnore: "dialog",
        enableButtons: ["act", "proceed", "cancel"],    // selector names
        strings: {
            primaryMessage: "You are about to leave this record.",
            secondaryMessage: "Save Changes?",
            confirmationTitle: "Confirmation.",
            actText: "Save",
            actAlt: "save and proceed",
            cancelText: "Cancel",
            cancelAlt: "cancel",
            proceedText: "Don't Save",
            proceedAlt: "proceed without saving",
            closeAlt: "close dialog"
        },
        rendererFnOptions: {
            rendererTargetSelector: "dialog",
            noexpand: true, // TODO: These two options are provisional in Infusion 1.3
        },
        produceTree: cspace.confirmation.produceTree,
        events: {
            afterRender: null,
            afterOpen: null,
            afterClose: null,
        },
        styles: {
            cancel: "cs-confirmationDialogButton-cancel",
            proceed: "cs-confirmationDialogButton-proceed",
            act: "cs-confirmationDialogButton-act"
        },
        resources: {
            template: cspace.prolepticResourceSpec({
                fetchClass: "slowTemplate",
                url: "%webapp/html/Confirmation.html"
            })
        }
    });
    
    fluid.fetchResources.primeCacheFromResources("cspace.confirmation");
    
    
})(jQuery, fluid);