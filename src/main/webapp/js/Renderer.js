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

    var createTemplateRenderFunc = function (that, resources, tree, opts) {
        return function () {
            var templateNames = [];
            var i = 0;
            for (var key in resources) {
                if (resources.hasOwnProperty(key)) {
                    var template = fluid.parseTemplates(resources, [key], {});
                    fluid.reRender(template, fluid.byId(resources[key].nodeId), tree, opts);
                }
            }
            that.events.pageRendered.fire();
        };
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
    
    var addCutpointsToList = function (list, specPart) {
        var index = list.length;
        for (var key in specPart) {
            if (specPart.hasOwnProperty(key)) {
                list[index] = {
                    id: key,
                    selector: specPart[key].selector
                };
                if (specPart[key].hasOwnProperty("repeated")) {
                    list[index].id = key + ":";
                    addCutpointsToList(list, specPart[key].repeated);
                }
                index = list.length;
            }
        }
    };

    var buildCutpointsFromSpec = function (spec) {
        var cutpoints = [];
        addCutpointsToList(cutpoints, spec);
        return cutpoints;
    };

    var buildLinkComponent = function (key, modelPart, spec, i) {
        var targetString;
        if (spec.replacements) {
            var reps = [];
            for (var prop in spec.replacements) {
                if (spec.replacements.hasOwnProperty(prop)) {
 // CSPACE-416: Currently, App layer doesn't return multiple fields for lists of records, only
 // an array of IDs. Until this is changed, process the data assuming it is an array of IDs
//                    reps[prop] = fluid.model.getBeanValue(modelPart[i], spec.replacements[prop]);
                    reps[prop] = modelPart[i];
                }
            }
            targetString = fluid.stringTemplate(spec.href, reps);
        }
        return {
            ID: key,
            target: targetString,
 // CSPACE-416: Currently, App layer doesn't return multiple fields for lists of records, only
 // an array of IDs. Until this is changed, process the data assuming it is an array of IDs
//          linktext: modelPart[i][key]
          linktext: modelPart[i]
        };
    };

    var buildSelectComponent = function (key, el, model, spec, strings) {
        var optList = fluid.copy(spec.options);
        var optNames = fluid.copy(spec["options-text"]);
        var val = fluid.model.getBeanValue(model, el);
        if (spec.hasOwnProperty("default")) {
            var defaultIndex = parseInt(spec["default"]);
            optNames[defaultIndex] += strings.defaultTermIndicator;
            if (!val || val === "") {
                fluid.model.setBeanValue(model, el, optList[defaultIndex]);
            }
        } else {
            optList.splice(0, 0, "none");
            optNames.splice(0, 0, strings.noDefaultInvitation);
            if (!val || val === "") {
                fluid.model.setBeanValue(model, el, optList[0]);
            }
        }

        return {
            ID: key,
            selection: {valuebinding: el},
            optionlist: optList,
            optionnames: optNames
        };
    };

    var addRepeatedItemsToComponentTree = function (children, name, specPart, model, el, strings) {
        var index = children.length;
        var modelPart = fluid.model.getBeanValue(model, el);
        for (var i = 0; i < modelPart.length; i++) {
            children[index] = {
                ID: name + ":",
                children: []
            };
            var j = 0;
            for (var key in specPart) {
                if (specPart.hasOwnProperty(key)) {
                    var spec = specPart[key];
                    var newEl = (el ? el + "." + i + "." + key : key);
                    if (spec.hasOwnProperty("type") && spec.type === "link") {
                        children[index].children[j] = buildLinkComponent(key, modelPart, spec, i);
                    } else if (spec.hasOwnProperty("options")) {
                        children[index].children[j] = buildSelectComponent(key, newEl, model, spec, strings);
                    } else {
                        children[index].children[j] = {
                            ID: key,
                            valuebinding: newEl
                        };
                    }
                    if (spec.decorators && spec.decorators.length > 0) {
                        children[index].children[j].decorators = spec.decorators;
                    }
                    j++;
                }
            }
            index++;
        }
    };
    
    var buildComponentTreeChildren = function (specPart, that, el) {
        var children = [];
        var index = 0;
        for (var key in specPart) {
            if (specPart.hasOwnProperty(key)) {
                var elPath = (el ? fluid.model.composePath(el, key) : key);
                if (specPart[key].hasOwnProperty("repeated")) {
                    // repeated items need to be filled in based on the data, not the schema
                    // the schema defines the fields for each row, but the data must be 
                    // examined to fill in each row
                    addRepeatedItemsToComponentTree(children, key, specPart[key].repeated, that.model/*[key]*/, elPath, that.options.strings);
                } else {
                    if (specPart[key].hasOwnProperty("options")) {
                        children = children.concat(buildSelectComponent(key, key, that.model, specPart[key], that.options.strings));
                    } else {
                        children[index] = {
                            ID: key,
                            valuebinding: elPath
                        };
                    }
                    if (specPart[key].decorators && specPart[key].decorators.length > 0) {
                        children[index].decorators = specPart[key].decorators;
                        children[index].decorators = fluid.transform(children[index].decorators, function (value, ind) {
                            if (value.func === "cspace.numberPatternChooser") {
                                value.options = value.options || {};
                                value.options.baseUrl = that.dataContext.urlFactory.baseUrl();
                                value.options.applier = that.applier;
                            }
                            return value;
                        });
                    }
                }
                index = children.length;
            }
        }            
        return children;
    };

    cspace.renderer = {
        buildComponentTree: function (spec, that) {
            var tree = {children: buildComponentTreeChildren(spec, that)};
            return tree;
        },

        renderPage: function (that) {
            var fullUISpec = buildFullUISpec(that);
            var renderOptions = {
                model: that.model,
//                debugMode: true,
                autoBind: true,
                applier: that.applier
            };
            var cutpoints = buildCutpointsFromSpec(fullUISpec);            
            var tree = cspace.renderer.buildComponentTree(fullUISpec, that);
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
                createTemplateRenderFunc(that, resources, tree, renderOptions));
        },
        
        createCutpoints: function (spec) {
            var cutpoints = [];
            addCutpointsToList(cutpoints, spec);
            return cutpoints;
        }
    };

})(jQuery, fluid_1_1);
