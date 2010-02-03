/*
Copyright 2010 University of Toronto

Licensed under the Educational Community License (ECL), Version 2.0. 
ou may not use this file except in compliance with this License.

You may obtain a copy of the ECL 2.0 License at
https://source.collectionspace.org/collection-space/LICENSE.txt
*/

/*global jQuery, fluid_1_2, cspace*/

cspace = cspace || {};

(function ($, fluid) {

    // Notes:
    // the UISpec has been provided through JSONP, stored in cspace.pageBuilder.uispec

    var injectElementsOfType = function (container, elementType, elements) {
        if (!elements || elements.length < 1) {
            return;
        }

        var elementsOfType = $(elementType, container);
        var repeat = elementsOfType.length === 0 ? function (idx, element) {
            container.append(element);
        } : function (idx, element) {
            var lastEl = $(elementType + ":last", container);
            lastEl.after(element);
        };

        $.each(elements, repeat);
    };
    
    var inject = function (docString, selector, container) {
        if (!docString || docString === "") {
            return;
        }

        var headTag = docString.match(/<head(.|\s)*?\/head>/gi)[0],
            bodyTag = docString.match(/<body(.|\s)*?\/body>/gi)[0];
// Currently, parsing the link and script tags is not working quite properly, so
// for now, forego that process: assume the target HTML has everything you'd need
//        var linkTags = [].concat(headTag.match(/<link(.|\s)*?\/>/gi)).concat(headTag.match(/<link(.|\s)*?\/link>/gi)),
//            scriptTags = headTag.match(/<script(.|\s)*?\/script>/gi);

//        var head = $("head");
//        injectElementsOfType(head, "link", linkTags);
//        injectElementsOfType(head, "script", scriptTags);

        var templateContainer = $("<div></div>").html(bodyTag);
        container.html($(selector, templateContainer)); 
    };
    
    var setup = function (that) {
        that.uispec = cspace.pageBuilder.uispec;
        that.components = [];
        for (var region in that.dependencies) {
            if (that.dependencies.hasOwnProperty(region)) {
                var dep = that.dependencies[region];
                that.components[region] = fluid.invokeGlobalFunction(dep.funcName, dep.args);
            }
        }
    };

    var assembleHTML = function (that) {
        fluid.fetchResources(that.options.pageSpec, function (resourceSpecs) {
            for (var regionName in resourceSpecs) {
                if (resourceSpecs.hasOwnProperty(regionName) && (regionName !== "callbackCalled")) {
                    var region = resourceSpecs[regionName];
                    inject(region.resourceText, region.templateSelector, $(region.targetSelector));
                }
                
            }
            setup(that);
        });

    };

    cspace.pageBuilder = function (dependencies, options) {
        var that = {
            dependencies: dependencies
        };
        if (options && options.container) {
            // not sure exactly what to do here, or what condition to check to decide to do it
            that = fluid.initView("cspace.pageBuilder", options.container, options);
        } else {
            fluid.mergeComponentOptions(that, "cspace.pageBuilder", options);
        }

        if (options && options.pageSpec) {
            assembleHTML(that);
        } else {
            setup(that);
        }
    };

})(jQuery, fluid_1_2);


// the following code snippets will have to be moved somewhere accessible to the components
// I know commented code is bad, but I don't want to lose this work right now.

/*
    var buildCutpoints = function (uispec) {
        var cutpoints = [];
        for (var key in uispec) {
            if (uispec.hasOwnProperty(key)) {
                cutpoints.push({
                    id: key,
                    selector: "." + key
                });
            }
        }
        return cutpoints;
    };

    var extractEL = function (string) {
        var i1 = string.indexOf("${");
        var i2 = string.indexOf("}");
        if (i1 === 0 && i2 !== -1) {
            return string.substring(2, i2);
        }
    };

    var makeProtoTree = function (uispec, model) {
        var protoTree = {};

        // should this be protoTree = fluid.copy(uispec)?
        fluid.model.copyModel(protoTree, uispec);
        
        for (var key in protoTree) {
            if (protoTree.hasOwnProperty(key)) {
                if (fluid.isArrayable(protoTree[key]) && protoTree[key][0].repeatFromModel) {
                    // replace protoTree[key] with a new array
                    var rows = [];
                    var elPath = extractEL(protoTree[key][0].repeatFromModel);
                    elPath = elPath.slice(0, elPath.lastIndexOf(".0"));
                    var numRows = fluid.model.getBeanValue(model,elPath).length;
                    for (var i = 0; i < numRows; i++) {
                        rows.push(protoTree[key][0].repeatFromModel.replace("0", i));
                    }
                    protoTree[key] = rows;
                } else if (key === "buildValue") {
                    
                } else {
                    // leave it, no change necessary
                }
            }
        }
        return protoTree;
    };

        that.expander = fluid.renderer.makeProtoExpander({ELstyle: "${}"});
        for (var region in that.uispec) {
            if (that.uispec.hasOwnProperty(region)) {
                var protoTree = makeProtoTree(that.uispec[region], that.options.model);
                var tree = that.expander(protoTree);
                
                // note: renderer options like debugMode should be passed in, not hard-coded
                var renderOpts = {
                    debugMode: true,
                    cutpoints: buildCutpoints(that.uispec[region])
                };
                if (that.options.model) {
                    if (that.options.modelPath) {
                        renderOpts.model = that.options.model[modelPath];
                    } else {
                        renderOpts.model = that.options.model;
                    }
                }
                fluid.selfRender(that.container, tree, renderOpts);
            }
        }
*/
