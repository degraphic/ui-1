/*
Copyright 2010 University of Toronto

Licensed under the Educational Community License (ECL), Version 2.0. 
You may not use this file except in compliance with this License.

You may obtain a copy of the ECL 2.0 License at
https://source.collectionspace.org/collection-space/LICENSE.txt
*/

/*global jQuery, window, cspace*/

cspace = cspace || {};

(function ($) {

    cspace.adminSetup = function () {
        fluid.log("adminSetup.js loaded");

        var adminOpts = {
            uispec: "{pageBuilder}.uispec",
            currentUserId: "{pageBuilder}.currentUserId",
            userListEditor: {
                options: {
                    dataContext: {
                        options: {
                            dataSource: {
                                options: {
                                    schema: "{pageBuilder}.schema",
                                    sources: {
                                        role: {
                                            href: "../../chain/role",
                                            path: "fields.role",
                                            resourcePath: "items",
                                            merge: cspace.dataSource.mergeRoles
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        };
        if (cspace.util.useLocalData()) {
            adminOpts.recordType = "users/records/list.json";
            adminOpts.queryURL = "data/users/search/list.json";
            adminOpts.userListEditor.options.baseUrl = "data/";
            adminOpts.userListEditor.options.dataContext.options.baseUrl = "data/";
            adminOpts.userListEditor.options.dataContext.options.fileExtension = ".json";
            adminOpts.userListEditor.options.dataContext.options.dataSource.options.sources.role.href = "data/role/list.json";
        }
        var dependencies = {
            users: {
                funcName: "cspace.adminUsers",
                args: [".csc-users-userAdmin", adminOpts]
            }
        };

        var options = {
            recordType: "users",
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
            pageType: "users"
        };
        cspace.pageBuilder(dependencies, options);
    };
    
})(jQuery);

