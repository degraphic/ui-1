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

    cspace.rolesSetup = function () {

        var setUpPage = function () {

            var permsOpts = {
                uispec: "{pageBuilder}.uispec"
            };
            if (cspace.util.isLocal()) {
                permsOpts.dataContext = {
                    options: {
                        baseUrl: "data/",
                        fileExtension: ".json"
                    }
                };
            }
            var dependencies = {
                permissions: {
                    funcName: "cspace.adminRoles",
                    args: [".csc-roles-roleAdmin", permsOpts]
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
                }
            };
            cspace.pageBuilder(dependencies, options);
        };

        if (!cspace.pageBuilder || !cspace.pageBuilder.uispec) {
            var uispecUrl = (cspace.util.isLocal() ? "./uispecs/roles/uispec.json" : "../../chain/users/uispec");
            jQuery.ajax({
                url: uispecUrl,
                type: "GET",
                dataType: "json",
                success: function (data, textStatus) {
                    cspace.pageBuilder.uispec = data;
                    setUpPage();
                },
                error: function (xhr, textStatus, errorThrown) {
                    fluid.fail("Error fetching roles uispec: " + textStatus);
                }
            });
        } else {
            setUpPage();
        }
    };
    
})(jQuery);

