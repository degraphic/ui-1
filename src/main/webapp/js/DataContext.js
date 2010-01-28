/*
Copyright 2009-2010 University of Toronto

Licensed under the Educational Community License (ECL), Version 2.0. 
ou may not use this file except in compliance with this License.

You may obtain a copy of the ECL 2.0 License at
https://source.collectionspace.org/collection-space/LICENSE.txt
*/

/*global jQuery, fluid_1_2*/

var cspace = cspace || {};

(function ($, fluid) {
    
    var types = {
        create: "POST",
        fetch: "GET",
        update: "PUT",
        remove: "DELETE"
    };

    /*
     * Wrapper around fluid.model.getBeanValue() that handles a modelPath of "*"
     */
    cspace.getBeanValue = function (model, modelPath) {
        return (modelPath === "*" ? model : fluid.model.getBeanValue(model, modelPath));
    };

    /*
     * that: the DataContext object
     * operation: string ("create", "fetch", "update", "remove"); will be displayed in the case of an error
     * modelPath:
     * model:
     * successEvent: event to fire after success
     * data: data to be stringified for PUT or POST (optional)
     */
    var ajax = function (that, operation, modelPath, model, successEvent, data) {
        var opts = {
            url: that.urlFactory.urlForModelPath(modelPath, model),
            type: types[operation],
            dataType: that.urlFactory.options.dataType,
            success: function (data, textStatus) {
                successEvent.fire(modelPath, data);
            },
            error: function (xhr, textStatus, errorThrown) {
                that.events.onError.fire(operation, modelPath, textStatus);
            }
        };
        if (operation === "create" || operation === "update") {
            opts.data = JSON.stringify(data);
        }
        jQuery.ajax(opts);
    };

    fluid.completelyIndirectStringTemplate = function (template, values, model) {
        var newString = template;
        var hasModel = !!model;
        for (var key in values) {
            if (values.hasOwnProperty(key)) {
                var searchStr = "%" + key;
                var value = hasModel ? fluid.getBeanValue(model, values[searchStr]) : values[key];
                newString = newString.replace(searchStr, value);
            }
        }
        return newString;
    };
    
    var bindEventHandlers = function (that) {
        that.events.afterFetch.addListener(function (modelPath, data) {
            that.updateModel(data);
        });
    };

    // This isn't currently used, but might be useful in fuzzing over slashes.
    var addTrailingSlash = function (url) {
        return url + (url.chatAt(length - 1) !== "/") ? "/" : "";
    };
    
    /**
     * The Data Context, an object that provides generic CRUD operations for models.
     * 
     * @param {Object} model the model that is bound to this data context
     * @param {Object} options configuration options
     */
    cspace.dataContext = function (model, options) {
        var that = {
            model: model
        };
        fluid.mergeComponentOptions(that, "cspace.dataContext", options);
        that.urlFactory = fluid.initSubcomponent(that, "urlFactory", [fluid.COMPONENT_OPTIONS]);
        fluid.instantiateFirers(that, that.options);
        
        // TODO: This should probably accept the modelPath as well, and only update that part of the tree
        that.updateModel = function (newModel, source) {
            var oldModel;
			$.extend(true, that.model, newModel);
            that.events.modelChanged.fire(that.model, oldModel, source);
        };
        
        that.fetch = function (modelPath, queryParameters) {
            var shadow = {};
            // setBeanValue() doesn't treat "*" as intended, so we have to do it manually
            if (modelPath === "*") {
                shadow = queryParameters;
            } else {
                fluid.model.setBeanValue(shadow, modelPath, queryParameters);
            }
            var workingModel = $.extend({}, that.model, shadow);
            ajax(that, "fetch", modelPath, workingModel, that.events.afterFetch);
        };
        
        that.create = function (modelPath) {
            var data = cspace.getBeanValue(that.model, modelPath);
            ajax(that, "create", modelPath, that.model, that.events.afterCreate, data);
        };
        
        that.update = function (modelPath) {
            var data = cspace.getBeanValue(that.model, modelPath);
            ajax(that, "update", modelPath, that.model, that.events.afterUpdate, data);
        };

        // creates or updates as necessary
        that.save = function (modelPath)  {
            
        };
            
        that.remove = function (modelPath) {
            
        };
        
        bindEventHandlers(that);
        return that;
    };
    
    fluid.defaults("cspace.dataContext", {
        events: {
            modelChanged: null,    // newModel, oldModel, source
            afterCreate: null,   // modelPath, data
            afterRemove: null, // modelPath
            afterFetch: null,  // modelPath, data
            afterUpdate: null,  // modelPath, data
            onError: null      // operation["create", "remove", "fetch", "update"], modelPath, message
        },
        urlFactory: {
            type: "cspace.dataContext.urlFactory"
        }
    });
    
    /**
     * A convenience function for creating a dataContext that uses the default resourceMapper
     * version of the default urlFactory.
     */
    cspace.resourceMapperDataContext = function (model, options) {
        var mapperDefaults = fluid.defaults("cspace.dataContext.staticResourceMapper"); 
        var mapperOpts = {};
        for (var key in mapperDefaults) {
            if (mapperDefaults.hasOwnProperty(key)) {
                mapperOpts[key] = options[key];
            }
        }
        mapperOpts.modelToResourceMap = options.modelToResourceMap;
        mapperOpts.replacements = options.replacements;
        
        var urlFactoryOpts = {};
        var urlFactoryDefaults = fluid.defaults("cspace.dataContext.urlFactory");
        for (key in urlFactoryDefaults) {
            if (urlFactoryDefaults.hasOwnProperty(key)) {
                urlFactoryOpts[key] = options[key];
            }
        }
        urlFactoryOpts.resourceMapper = {
            type: "cspace.dataContext.staticResourceMapper",
            options: mapperOpts
        };

        var dataContextDefaults = fluid.defaults("cspace.dataContext");
        var dataContextOpts = {};
        for (key in dataContextDefaults) {
            if (dataContextDefaults.hasOwnProperty(key)) {
                dataContextOpts[key] = options[key];
            }
        }
        dataContextOpts.urlFactory = {
            type: "cspace.dataContext.urlFactory",
            options: urlFactoryOpts
        };

        return cspace.dataContext(model, dataContextOpts);        
    };
    
    /**
     * A UrlFactory is responsible for hiding away the variations between loading data locally for testing
     * and on the server in production. It also uses the resourceMapper to determine the proper
     * URL for communications related to a given model path.
     * 
     * @param {Object} options configuration options for the url factory
     */
    cspace.dataContext.urlFactory = function (options) {
        var that = {};
        fluid.mergeComponentOptions(that, "cspace.dataContext.urlFactory", options);
        // TODO: The resourceMapper should probably not be nested so deeply
        that.resourceMapper = fluid.initSubcomponent(that, "resourceMapper", [fluid.COMPONENT_OPTIONS]);
        
        var extension = function () {
            // TODO: This should be generalized to something more sensible. Or should we have the user specifically provide the extension?
            return that.options.includeResourceExtension ? "." + that.options.dataType : "";
        };
        
        that.urlForModelPath = function (modelPath, model) {
            var resource = that.resourceMapper.map(model, modelPath);
            return that.options.protocol + that.options.baseUrl + resource + extension();
        };

        that.baseUrl = function () {
            return that.options.protocol + that.options.baseUrl;
        }; 
            
        return that;    
    };

    /*
     * This object defaults to an URL that includes a file extension of ".json" which is used
     * in testing.
     */
    cspace.dataContext.testUrlFactory = function (options) {
        var that = {};
        fluid.mergeComponentOptions(that, "cspace.dataContext.testUrlFactory", options);
        that.resourceMapper = fluid.initSubcomponent(that, "resourceMapper", [fluid.COMPONENT_OPTIONS]);

        that.urlForModelPath = function (modelPath, model) {
            var resource = that.resourceMapper.map(model, modelPath);
            return that.options.protocol + that.options.baseUrl + resource + ".json";
        };

        that.baseUrl = function () {
            return that.options.protocol + that.options.baseUrl;
        }; 
            
        return that;
    };

    fluid.defaults("cspace.dataContext.urlFactory", {
        resourceMapper: {
            type: "cspace.dataContext.staticResourceMapper"
        },
        protocol: "",
        baseUrl: "../../chain/",
        dataType: "json",
        includeResourceExtension: false
    });

    fluid.defaults("cspace.dataContext.testUrlFactory", {
        resourceMapper: {
            type: "cspace.dataContext.staticResourceMapper",
            options: {
                modelToResourceMap: {
                    "*": "files"
                }
            }
        },
        protocol: "",
        baseUrl: "./",
        dataType: "json",
        includeResourceExtension: true
    });

    /**
     * The StaticResourceMapper is the default strategy for mapping model paths to resource-oriented URLs.
     * The urlFactory uses a resource mapper to generate urls.
     * 
     * @param {Object} options configuration options for the mapper, including the modelToResourceMap
     */
    cspace.dataContext.staticResourceMapper = function (options) {
		
		var that = fluid.initLittleComponent("cspace.dataContext.staticResourceMapper", 
		    options);

        that.map = function (model, modelPath) {
            if (!modelPath) {
                modelPath = "*";
            }
            
            var result = "";
            if (!that.options.modelToResourceMap.hasOwnProperty(modelPath)) {
                // TODO: what to return if there's no map??
                return result;
            }

            // TODO: this is pretty inefficient; resolving the values of each key in the replacements, even if we only need a few of them.
            var reps = [];
            for (var key in that.options.replacements) {
                if (that.options.replacements.hasOwnProperty(key)) {
                    reps[key] = fluid.model.getBeanValue(model, that.options.replacements[key]);
                }
            }
            result = fluid.stringTemplate(that.options.modelToResourceMap[modelPath], reps);

            return result;
        };
        
        return that;
    };
	
	fluid.defaults("cspace.dataContext.staticResourceMapper", {
		modelToResourceMap: {},
		replacements: {}
	});
	
})(jQuery, fluid_1_2);
