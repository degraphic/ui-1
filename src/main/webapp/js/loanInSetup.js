/*
Copyright 2009-2010 University of Toronto
Copyright 2009 University of Cambridge

Licensed under the Educational Community License (ECL), Version 2.0. 
You may not use this file except in compliance with this License.

You may obtain a copy of the ECL 2.0 License at
https://source.collectionspace.org/collection-space/LICENSE.txt
*/

/*global jQuery, window, cspace*/

cspace = cspace || {};

(function ($) {
    fluid.log("loanInSetup.js loaded");

    /**
     * options: {
     *     pageBuilderOpts: {
     *                    ....
     *     },
     *     sideBarOpts: {
     *                    ....
     *     },
     *     templateUrlPrefix: ""
     * }
     */
    cspace.loanInSetup = function (options) {
        options = options || {};
        
        var tbOpts = {
            uispec: "{pageBuilder}.uispec.titleBar"
        };
        $.extend(true, tbOpts, options.titleBarOpts);

        var tabsOpts = {
            tabList: [
                {name: "Loan In", target: "#primaryTab"},
                {name: "Acquisition", target: null},
                {name: "Cataloging", target: "objectTabPlaceholder.html"},
                {name: "Intake", target: null},
                {name: "Loan In - related", target: null},
                {name: "Loan Out", target: null},
                {name: "Location &amp; Movement", target: null},
                {name: "Media", target: null}
            ],
            tabSetups: [
                null, {
                    func: "cspace.tabSetup",
                    options: {
                        primaryRecordType: "loanin",
                        configURL: "./config/object-tab.json"
                    }
                }
            ]
        };
        $.extend(true, tabsOpts, options.tabsOpts);

        var reOpts = options.recordEditorOpts || {};
        var reOpts = {
            selectors: {identificationNumber: ".csc-loanIn-loanInNumber"},
            strings: {identificationNumberRequired: "Please specify a Loan In Number"}
        };
        $.extend(true, reOpts, options.recordEditorOpts);

        var sbOpts = {
            uispec: "{pageBuilder}.uispec.sidebar",
            primaryRecordType: "loanin"
        };
        $.extend(true, sbOpts, options.sideBarOpts);
        
        var dependencies = {
            titleBar: {
                funcName: "cspace.titleBar",
                args: [".csc-loanIn-titleBar-template", "{pageBuilder}.applier", tbOpts]
            },
            tabs: {
                funcName: "cspace.tabs",
                args: [".csc-tabs-template", "{pageBuilder}.applier", tabsOpts]
            },
            recordEditor: {
                funcName: "cspace.recordEditor",
                args: [".csc-loanIn-template", "{pageBuilder}.dataContext", 
                	"{pageBuilder}.applier", "{pageBuilder}.uispec.recordEditor", reOpts]
            },
            sidebar: {
                funcName: "cspace.sidebar",
                args: [".csc-sidebar", "{pageBuilder}.applier", sbOpts]
            }
        };
        
        var pageBuilderOpts = {
            dataContext:{
                options: {
                    recordType: "loanin"
                }
            }
        };
        if (cspace.util.useLocalData()) {
            $.extend(true, pageBuilderOpts, {
                dataContext: {
                    options: {
                        baseUrl: "data",
                        fileExtension: ".json"
                    }
                }
            })
        }
        pageBuilderOpts.pageSpec = {
            header: {
                href: cspace.util.fullUrl(options.templateUrlPrefix, "header.html"),
                templateSelector: ".csc-header-template",
                targetSelector: ".csc-header-container"
            },
            titleBar: {
                href: cspace.util.fullUrl(options.templateUrlPrefix, "loanInTitleBar.html"),
                templateSelector: ".csc-loanIn-titleBar-template",
                targetSelector: ".csc-loanIn-titleBar-container"
            },
            tabs: {
                href: cspace.util.fullUrl(options.templateUrlPrefix, "tabsTemplate.html"),
                templateSelector: ".csc-tabs-template",
                targetSelector: ".csc-tabs-container"
            },
            dateEntry: {
                href: cspace.util.fullUrl(options.templateUrlPrefix, "loanInTemplate.html"),
                templateSelector: ".csc-loanIn-template",
                targetSelector: ".csc-record-edit-container"
            },
            sidebar: {
                href: cspace.util.fullUrl(options.templateUrlPrefix, "right-sidebar.html"),
                templateSelector: ".csc-right-sidebar",
                targetSelector: ".csc-sidebar-container"
            },
            footer: {
                href: cspace.util.fullUrl(options.templateUrlPrefix, "footer.html"),
                templateSelector: ".csc-footer",
                targetSelector: ".csc-footer-container"
            }
        };
        pageBuilderOpts.pageType = "loanin";
        $.extend(true, pageBuilderOpts, options.pageBuilderOpts);

        var csid = cspace.util.getUrlParameter("csid");
        if (csid) {
            pageBuilderOpts.csid = csid;
        }
        
        return cspace.pageBuilder(dependencies, pageBuilderOpts);
    };
    
})(jQuery);

