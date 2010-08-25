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
    fluid.log("acquistionSetup.js loaded");

    cspace.acquisitionSetup = function (options) {

        options = options || {};
        var tbOpts = {
            uispec: "{pageBuilder}.uispec.titleBar"
        };
        var tabsOpts = {
            tabList: [
                {name: "Acquisition", target: "#primaryTab"},
				{name: "Acquisition - related", target: null},
				{name: "Cataloging", target: cspace.util.fullUrl(options.templateUrlPrefix, "objectTabPlaceholder.html")},
				{name: "Intake", target: null},
				{name: "Loan In", target: null},
				{name: "Loan Out", target: null},
				{name: "Location &amp; Movement", target: cspace.util.fullUrl(options.templateUrlPrefix, "movementTab.html")},
				{name: "Media", target: null}
            ],
            tabSetups: [
                null, {
                    func: "cspace.tabSetup",
                    options: {
                        primaryRecordType: "{pageBuilder}.options.pageType",
                        configURL: "./config/object-tab.json"
                    }
                },
                {
                    func: "cspace.tabSetup",
                    options: {
                        primaryRecordType: "{pageBuilder}.options.pageType",
                        configURL: "./config/movement-tab.json"
                    } 
                }
            ]
        };
        $.extend(true, tabsOpts, options.tabsOpts);

        var reOpts = {
            selectors: {identificationNumber: ".csc-acquisition-numberPatternChooser-reference-number"},
            strings: {identificationNumberRequired: "Please specify an Acquisition Reference Number"}
        };
        $.extend(true, reOpts, options.recordEditorOpts);

        var sbOpts = {
            uispec: "{pageBuilder}.uispec.sidebar",
            primaryRecordType: "{pageBuilder}.options.pageType"
        };
        $.extend(true, sbOpts, options.sideBarOpts);
        
        var dependencies = {
            titleBar: {
                funcName: "cspace.titleBar",
                args: [".csc-acquisition-titleBar-template", "{pageBuilder}.applier", tbOpts]
            },
            tabs: {
                funcName: "cspace.tabs",
                args: [".csc-tabs-template", "{pageBuilder}.applier", tabsOpts]
            },
            recordEditor: {
                funcName: "cspace.recordEditor",
                args: [".csc-acquisition-template", "{pageBuilder}.dataContext", 
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
                    recordType: "acquisition"
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
                href: cspace.util.fullUrl(options.templateUrlPrefix, "acquisitionTitleBar.html"),
                templateSelector: ".csc-acquisition-titleBar-template",
                targetSelector: ".csc-acquisition-titleBar-container"
            },
            tabs: {
                href: cspace.util.fullUrl(options.templateUrlPrefix, "tabsTemplate.html"),
                templateSelector: ".csc-tabs-template",
                targetSelector: ".csc-tabs-container"
            },
            recordEditor: {
                href: cspace.util.fullUrl(options.templateUrlPrefix, "acquisitionTemplate.html"),
                templateSelector: ".csc-acquisition-template",
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
        pageBuilderOpts.pageType = "acquisition"
        var csid = cspace.util.getUrlParameter("csid");
        if (csid) {
            pageBuilderOpts.csid = csid;
        }
        return cspace.pageBuilder(dependencies, pageBuilderOpts);
    };
    
})(jQuery);

