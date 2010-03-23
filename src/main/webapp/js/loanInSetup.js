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

    cspace.acquisitionSetup = function () {

        var setUpPage = function () {
            var tbOpts = {
                applier: "{pageBuilder}.applier",
                uispec: "{pageBuilder}.uispec.titleBar"
            };
            var tabsOpts = {
                applier: "{pageBuilder}.applier",
                tabList: [
                    {name: "Loan In", target: "#primaryTab"},
                    {name: "Objects", target: "objectTabPlaceholder.html"},
                    {name: "Conservation", target: null},
                    {name: "Location &amp; Movement", target: null},
                    {name: "Transport", target: null},
                    {name: "Valuation", target: null},
                    {name: "Insurance", target: null},
                    {name: "Media", target: null},
                    {name: "Rights", target: null}
                ],
                setupFuncs: [null, "cspace.objectTabSetup"]
            };
            var reOpts = {
                dataContext: "{pageBuilder}.dataContext",
                applier: "{pageBuilder}.applier",
                uispec: "{pageBuilder}.uispec.recordEditor",
                selectors: {identificationNumber: ".csc-loanin-numberPatternChooser-reference-number"},
                strings: {identificationNumberRequired: "Please specify a Loan In Number"}
            };
            var sbOpts = {
                applier: "{pageBuilder}.applier",
                uispec: "{pageBuilder}.uispec.sidebar",
                currentRecordType: "loan in"
            };
            
            var dependencies = {
                titleBar: {
                    funcName: "cspace.titleBar",
                    args: [".csc-loanin-titleBar-template", tbOpts]
                },
                tabs: {
                    funcName: "cspace.tabs",
                    args: [".csc-tabs-template", tabsOpts]
                },
                recordEditor: {
                    funcName: "cspace.recordEditor",
                    args: [".csc-loanin-template", reOpts]
                },
                sidebar: {
                    funcName: "cspace.sidebar",
                    args: [".csc-sidebar", sbOpts]
                }
            };
            var options = {
                dataContext: {
                    options: {
                        recordType: "loan in"
                    }
                },
                pageSpec: {
                    header: {
                        href: "header.html",
                        templateSelector: ".csc-header-template",
                        targetSelector: ".csc-header-container"
                    },
                    titleBar: {
                        href: "loanInTitleBar.html",
                        templateSelector: ".csc-loanin-titleBar-template",
                        targetSelector: ".csc-loanin-titleBar-container"
                    },
                    tabs: {
                        href: "tabsTemplate.html",
                        templateSelector: ".csc-tabs-template",
                        targetSelector: ".csc-tabs-container"
                    },
                    dateEntry: {
                        href: "loanInTemplate.html",
                        templateSelector: ".csc-loanin-template",
                        targetSelector: ".csc-record-edit-container"
                    },
                    sidebar: {
                        href: "right-sidebar.html",
                        templateSelector: ".csc-right-sidebar",
                        targetSelector: ".csc-sidebar-container"
                    },
                    footer: {
                        href: "footer.html",
                        templateSelector: ".csc-footer",
                        targetSelector: ".csc-footer-container"
                    }
                }
            };
            var csid = cspace.util.getUrlParameter("csid");
            if (csid) {
                options.csid = csid;
            }
            if (cspace.util.isLocal()) {
                options.dataContext.options.baseUrl = "data";
                options.dataContext.options.fileExtension = ".json";
            }
            cspace.pageBuilder(dependencies, options);
        };

        if (!cspace.pageBuilder || !cspace.pageBuilder.uispec) {
            var uispecUrl = (cspace.util.isLocal() ? "./uispecs/acquisition/uispec.json" : "../../chain/acquisition/uispec");
            jQuery.ajax({
                url: uispecUrl,
                type: "GET",
                dataType: "json",
                success: function (data, textStatus) {
                    cspace.pageBuilder.uispec = data;
                    setUpPage();
                },
                error: function (xhr, textStatus, errorThrown) {
                    console.log("Error fetching acquisition uispec");
                }
            });
        } else {
            setUpPage();
        }
    };
    
})(jQuery);

