/*
Copyright 2009 University of Toronto

Licensed under the Educational Community License (ECL), Version 2.0. 
ou may not use this file except in compliance with this License.

You may obtain a copy of the ECL 2.0 License at
https://source.collectionspace.org/collection-space/LICENSE.txt
*/

/*global jQuery, fluid_1_1*/

var cspace = cspace || {};

(function ($, fluid) {

    // This is a temporary function, in place only until the ID service is accessible
    // through the APP layer.
    var newID = function (model, idField) {
        var id = model[idField];
        if ((!id || (id === "")) && model.accessionNumber) {
            id = model.accessionNumber.split(" ")[0];
        }
        if ((!id || (id === "")) && model.objectTitle) {
            id = model.objectTitle.split(" ")[0];
        }
        if (!id || (id === "")) {
            id = new Date().getTime().toString();
        }
        return id;
    };
    
    // Ultimately, the UISpec will be loaded via JSONP (see CSPACE-300). Until then,
    // load it manually via ajax
    var fetchUISpec = function (that, callback) {
        jQuery.ajax({
            url: that.options.uiSpecUrl,
            type: "GET",
            dataType: "json",
            success: callback,
            error: function (xhr, textStatus, errorThrown) {
                that.showSpecErrorMessage(that.options.strings.specFetchError + textStatus + that.options.strings.errorRecoverySuggestion);
                that.locate("feedbackMessage").hide();
                that.events.onError.fire("fetch UISpec");
            }
        });
    };

    var buildFullUISpec = function (that) {
        var fullUISpec = fluid.copy(that.spec);
        
		// This makes the assumption that 'save' exists. This should be configurable.
        fullUISpec.save = {
            "selector": that.options.selectors.save,
            "validators": [],
            "decorators": [
                {type: "jQuery",
                    func: "click", 
                    args: that.save
                }
            ]
        };
        fullUISpec.saveSecondary = {
            "selector": that.options.selectors.saveSecondary,
            "validators": [],
            "decorators": [
                {type: "jQuery",
                    func: "click", 
                    args: that.save
                }
            ]
        };
        return fullUISpec;
    };
    
    var buildEmptyModelFromSpec = function (spec) {
        var model = {};
        for (var key in spec) {
            if (spec.hasOwnProperty(key)) {
                model[key] = "";
            }
        }
        return model;
    };
    
    var makeDCErrorHandler = function (that) {
        return function(operation/*["create", "delete", "fetch", "update"]*/, modelPath, message){
            var msgKey = operation + "FailedMessage";
            var msg = that.options.strings[msgKey] + message;
            that.locate("feedbackMessage").text(msg).show();
            that.events.onError.fire(operation);
        };
    };

    var setupDataContext = function (that) {
        return function(spec, textStatus){
            that.spec = spec.spec;

            // insert the resourceMapper options retrieved with the UISpec into the options structure
            that.options.dataContext.options = that.options.dataContext.options || {};
            that.options.dataContext.options.modelToResourceMap = spec.modelToResourceMap;
            that.options.dataContext.options.replacements = spec.replacements;

            that.dataContext = fluid.initSubcomponent(that, "dataContext", [that.model, fluid.COMPONENT_OPTIONS]);

            bindEventHandlers(that);
            
            fluid.model.copyModel(that.model, buildEmptyModelFromSpec(that.spec));
            if (that.options.objectId) {
                var queryParams = {};
                queryParams[that.options.idField] = that.options.objectId;
                that.dataContext.fetch("*", queryParams);
            }
            else {
                that.refreshView();
            }
        };
    };
    
    var bindEventHandlers = function (that) {
        that.dataContext.events.modelChanged.addListener(function (newModel, oldModel, source) {
            that.events.modelChanged.fire(newModel, oldModel, source);
            that.refreshView();
            that.locate("feedbackMessage").hide();
        });

        that.dataContext.events.afterCreate.addListener(function (modelPath, data) {
            that.events.afterCreateObjectDataSuccess.fire(data, that.options.strings.createSuccessfulMessage);
            that.locate("feedbackMessage").text(that.options.strings.createSuccessfulMessage).show();
        });

        that.dataContext.events.afterUpdate.addListener(function (modelPath, data) {
            that.events.afterUpdateObjectDataSuccess.fire(data, that.options.strings.updateSuccessfulMessage);
            that.locate("feedbackMessage").text(that.options.strings.updateSuccessfulMessage).show();
        });

        that.dataContext.events.onError.addListener(makeDCErrorHandler(that));
    };
    
    var setupDataEntry = function (that) {
        fetchUISpec(that, setupDataContext(that));
    };

    /**
     * Object Entry component
     */
    cspace.dataEntry = function (container, options) {
        var that = fluid.initView("cspace.dataEntry", container, options);
        that.model = {};
        that.spec = {};

        that.refreshView = function () {
            cspace.renderer.renderPage(that);
        };
        
        that.updateModel = function (newModel, source) {
            that.events.modelChanged.fire(newModel, that.model, source);
            fluid.clear(that.model);
            fluid.model.copyModel(that.model, newModel);
            that.refreshView();
        };
        
        that.showSpecErrorMessage = function (msg) {
            that.locate("errorMessage", "body").text(msg);
            that.locate("errorDialog", "body").dialog({
                modal: true,
                dialogClass: "fl-widget"
            });
        };

        that.save = function () {
            that.events.onSave.fire(that.model);
            if (that.options.objectId) {
                that.dataContext.update("*");
            } else {
                that.model[that.options.idField] = newID(that.model, that.options.idField);    // temporary, till server returns ID
                that.dataContext.create("*");
            }
            return false;
        };

        setupDataEntry(that);
        return that;
    };
    
    cspace.saveId = "save";
    
    var createTemplateRenderFunc = function (that, resources, model, opts) {
        return function () {
            var templateNames = [];
            var i = 0;
            for (var key in resources) {
                if (resources.hasOwnProperty(key)) {
                    var template = fluid.parseTemplates(resources, [key], {});
                    fluid.reRender(template, fluid.byId(resources[key].nodeId), model, opts);
                }
            }
            that.events.pageRendered.fire();
        };
    };
    
    cspace.renderer = {
        buildCutpoints: function (spec) {
            var cutpoints = [];
            
            var index = 0;
            for (var key in spec) {
                if (spec.hasOwnProperty(key)) {
                    cutpoints[index] = {
                        id: key,
                        selector: spec[key].selector
                    };
                    index += 1;
                }
            }
            return cutpoints;
        },

        buildComponentTree: function (spec, model) {
            var tree = {children: []};
            
            var index = 0;
            for (var key in spec) {
                if (spec.hasOwnProperty(key)) {
                    tree.children[index] = {
                        ID: key,
                        valuebinding: key
                    };
                    if (spec[key].decorators && spec[key].decorators.length > 0) {
                        tree.children[index].decorators = spec[key].decorators;
                    }
                    index += 1;
                }
            }
            return tree;
        },

        renderPage: function (that) {
            var fullUISpec = buildFullUISpec(that);
            var renderOptions = {
                model: that.model,
//                debugMode: true,
                autoBind: true
            };
            var cutpoints = cspace.renderer.buildCutpoints(fullUISpec);            
            var model = cspace.renderer.buildComponentTree(fullUISpec, that.model);
            var resources = {};
            for (var key in that.options.templates) {
                if (that.options.templates.hasOwnProperty(key)) {
                    var templ = that.options.templates[key];
                    resources[key] = {
                        href: templ.url,
                        nodeId: templ.id,
                        cutpoints: cutpoints
                    };
                }
            }
            fluid.fetchResources(resources,
                createTemplateRenderFunc(that, resources, model, renderOptions));
        }    
    };
    
    fluid.defaults("cspace.dataEntry", {
        dataContext: {
            type: "cspace.resourceMapperDataContext"
        },
        events: {
            modelChanged: null,
			onSave: null,
            afterCreateObjectDataSuccess: null,  // params: data, textStatus
            afterUpdateObjectDataSuccess: null,  // params: data, textStatus
            onError: null,  // params: operation
            pageRendered: null
        },
        selectors: {
            errorDialog: ".csc-error-dialog",
            errorMessage: ".csc-error-message",
            save: ".csc-save",
            saveSecondary: ".csc-save-bottom",
            feedbackMessage: ".csc-saved-message"
        },
        strings: {
            specFetchError: "I'm sorry, an error has occurred fetching the UISpec: ",
            errorRecoverySuggestion: "Please try refreshing your browser",
            updateSuccessfulMessage: "Object Record successfully saved",
            createSuccessfulMessage: "New Object Record successfully created",
            updateFailedMessage: "Error saving Record: ",
            createFailedMessage: "Error creating Record: ",
            deleteFailedMessage: "Error deleting Record: ",
            fetchFailedMessage: "Error retriving Record: "
        },
        templates: {
            header: {
                url: "../html/header.html",
                id: "name-header"
            },
            body: {
                url: "../html/ObjectEntryTemplate.html",
                id: "csc-object-entry-template"
            },
            rightSidebar:  {
                url: "../html/right-sidebar.html",
                id: "csc-right-sidebar"
            },
            footer: {
                url: "../html/footer.html",
                id: "footer"
            }
        },
        objectId: null,
        idField: "csid",

        // Ultimately, the UISpec will be loaded via JSONP (see CSPACE-300). Until then,
        // load it manually via ajax
        uiSpecUrl: "./objects/schema/schema.json"
    });
})(jQuery, fluid_1_1);
