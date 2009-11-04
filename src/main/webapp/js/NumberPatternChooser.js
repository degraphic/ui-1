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

    var buildTree = function (samples) {
		
		var tree = {
			children: [{
				ID: "patterns",
	            optionnames: {valuebinding: "names"},
	            optionlist: {valuebinding: "list"},
	            selection: {valuebinding: ""}
			}]
		};
		
		return tree.children.concat(fluid.transform(samples, function (node, index) {
			return {
                ID: "pattern-row:",
                children: [{
                    ID: "pattern-name",
                    parentRelativeID: "..::patterns",
                    choiceindex: index
                }, {
                    ID: "pattern-sample",
                    value: node
                }]
            };
		}));
    };

    var buildCutpoints = function (selectors) {
        return [
            {id: "pattern-row:", selector: selectors.row},
            {id: "pattern-name", selector: selectors.name},
            {id: "pattern-sample", selector: selectors.sample}
        ];
    };

    var setupChooser = function (that) {
        // Data structure needed by fetchResources
        var resources = {
            chooser: {
                href: that.options.templateURL,
                cutpoints: buildCutpoints(that.options.selectors)
            }
        };
        
        // Get the template, create the tree and render the table of contents
        fluid.fetchResources(resources, function () {
            var templates = fluid.parseTemplates(resources, ["chooser"], {});
            fluid.reRender(templates, that.container, buildTree(that.model.samples), {model: that.model});
            that.events.afterRender.fire();
        });
    };

    cspace.numberPatternChooser = function (container, options) {
        var that = fluid.initView("cspace.numberPatternChooser", container, options);
        that.model = {
            names: ["Intake", "Acquisition", "Loan In"],
            list: ["intake", "acc", "loan-in"],
            selection: "acc",
			samples: ["IN2009.1", "ACC2009.42", "LI2009.1"]
        }; // = options.model?
        
        that.refreshView = function () {
            
        };
        
        setupChooser(that);

        return that;
    };

    fluid.defaults("cspace.numberPatternChooser", {
        selectors: {
            button: ".csc-numberPatternChooser-button",
            list: ".csc-numberPatternChooser-list",
			row: ".csc-numberPatternChooser-patternRow",
			name: ".csc-numberPatternChooser-name",
			sample: ".csc-numberPatternChooser-sample"
        },
        events: {
            afterRender: null
        },
        templateUrl: "../html/NumberPatternChooser.html"
    });
}) (jQuery, fluid_1_1);
