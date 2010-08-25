/*
Copyright 2010 University of Toronto

Licensed under the Educational Community License (ECL), Version 2.0. 
You may not use this file except in compliance with this License.

You may obtain a copy of the ECL 2.0 License at
https://source.collectionspace.org/collection-space/LICENSE.txt
*/

/*global jQuery, cspace, fluid*/
"use strict";

cspace = cspace || {};

(function ($, fluid) {
    fluid.log("Sidebar.js loaded");

    cspace.sidebar = function (container, applier, options) {
        var that = fluid.initView("cspace.sidebar", container, options);
        that.applier = applier;
        
        var intAuthModel = {
            items: that.applier.model.termsUsed || [],
            selectionIndex: -1
        };
        that.integratedAuthorities = fluid.initSubcomponent(that, "recordList", [that.options.selectors.termsUsed,
            intAuthModel,
            that.options.uispec.termsUsed,
             {recordType: "authorities",
              csid: that.applier.model.csid,
              strings: {nothingYet: "No Authority terms used yet"}}]);

        that.applier.modelChanged.addListener("termsUsed", function (model, oldModel, changeRequest) {
            fluid.model.copyModel(that.integratedAuthorities.model.items, model.termsUsed);
            that.integratedAuthorities.refreshView();
        });

        var rrlOpts = {
            uispec : that.options.uispec.relatedProcedures
        };
        if (cspace.util.useLocalData()) {
            $.extend(true, rrlOpts, {
                relationManager: {
                    options: {
                        dataContext: {
                            baseUrl: "data/",
                            fileExtension: ".json"
                        }
                    }
                }
            });
        }
        $.extend(true, rrlOpts, that.options.relatedRecordsList.options);

        that.relatedProcedures = fluid.initSubcomponent(that, "relatedRecordsList", [that.options.selectors.relatedProcedures,
            that.options.primaryRecordType,
            "procedures",
            that.applier,
            rrlOpts]);
        that.relatedObjects = fluid.initSubcomponent(that, "relatedRecordsList", [that.options.selectors.relatedObjects,
            that.options.primaryRecordType,
            "objects",
            that.applier,
            rrlOpts]);

        return that;
    };
    
    fluid.defaults("cspace.sidebar", {
        recordList: {
            type: "cspace.recordList"
        },
        relatedRecordsList: {
            type: "cspace.relatedRecordsList"
        },
        selectors: {
            mediaSnapshot: ".csc-media-snapshot",
            termsUsed: ".csc-integrated-authorities",
            relatedObjects: ".csc-related-objects",
            relatedProcedures: ".csc-related-procedures"
        }
    });
})(jQuery, fluid);
