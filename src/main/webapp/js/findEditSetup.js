/*
Copyright 2009 University of Toronto

Licensed under the Educational Community License (ECL), Version 2.0. 
You may not use this file except in compliance with this License.

You may obtain a copy of the ECL 2.0 License at
https://source.collectionspace.org/collection-space/LICENSE.txt
*/

/*global jQuery, cspace, console*/

cspace = cspace || {};

(function ($) {

    cspace.setupFindEdit = function () {
        var objOpts = {
            dataContext: { options: { recordType: "objects" } },
            uispec: "{pageBuilder}.uispec.objects"
        };
        var intOpts = {
            dataContext: { options: { recordType: "intake" } },
            uispec: "{pageBuilder}.uispec.proceduresIntake"
        };
        var acqOpts = {
            dataContext: { options: { recordType: "acquisition" } },
            uispec: "{pageBuilder}.uispec.proceduresAcquisition"
        };
        var liOpts = {
            dataContext: { options: { recordType: "loanin" } },
            uispec: "{pageBuilder}.uispec.proceduresLoanIn"
        };
        var loOpts = {
            dataContext: { options: { recordType: "loanout" } },
            uispec: "{pageBuilder}.uispec.proceduresLoanOut"
        };
        if (cspace.util.isLocal()) {
            objOpts.dataContext.options.baseUrl = 
                intOpts.dataContext.options.baseUrl = 
                    acqOpts.dataContext.options.baseUrl =  
                        liOpts.dataContext.options.baseUrl =  
                            loOpts.dataContext.options.baseUrl = "data";
            objOpts.dataContext.options.fileExtension = 
                intOpts.dataContext.options.fileExtension = 
                    acqOpts.dataContext.options.fileExtension = 
                        liOpts.dataContext.options.fileExtension = 
                            loOpts.dataContext.options.fileExtension = ".json";
        }
        var dependencies = {
            objects: {
                funcName: "cspace.recordList",
                args: [".object-records-group", objOpts]
            },
            proceduresIntake: {
                funcName: "cspace.recordList",
                args: [".intake-records-group", intOpts]
            },
            proceduresAcquisition: {
                funcName: "cspace.recordList",
                args: [".acquisition-records-group", acqOpts]
                },
                proceduresLoanIn: {
                    funcName: "cspace.recordList",
                    args: [".loanIn-records-group", liOpts]
                },
                proceduresLoanOut: {
                    funcName: "cspace.recordList",
                    args: [".loanOut-records-group", loOpts]
          }
        };
        
        var options = {
            pageSpec: {
                header: {
                    href: "header.html",
                    templateSelector: ".csc-header-template",
                    targetSelector: ".csc-header-container"
                },
                footer: {
                    href: "footer.html",
                    templateSelector: ".csc-footer",
                    targetSelector: ".csc-footer-container"
                }
            },
            pageType: "find-edit"
        };
        cspace.pageBuilder(dependencies, options);
    };

})(jQuery);
