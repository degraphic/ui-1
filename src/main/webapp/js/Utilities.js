/*
Copyright 2009-2010 University of Toronto

Licensed under the Educational Community License (ECL), Version 2.0. 
ou may not use this file except in compliance with this License.

You may obtain a copy of the ECL 2.0 License at
https://source.collectionspace.org/collection-space/LICENSE.txt
*/

/*global jQuery, fluid_1_1*/

var cspace = cspace || {};

(function ($, fluid) {

    cspace.util = {};

    cspace.util.getUrlParameter = function (name) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regexS = "[\\?&]" + name + "=([^&#]*)";
        var regex = new RegExp(regexS);
        var results = regex.exec(window.location.href);
        if (results === null) {
            return "";
        } else {
            return results[1];
        }
    };

    cspace.util.setupTestDataContext = function (recordType) {
        return {
            type: "cspace.dataContext",
            options: {
                urlFactory: {
                    type: "cspace.dataContext.testUrlFactory",
                    options: {
                        resourceMapper: {
                            type: "cspace.dataContext.staticResourceMapper",
                            options: {
                            	modelToResourceMap: {
                                    "*": "data/"+recordType+"/%recordId",
                                    "fields": "data/"+recordType+"/%recordId",
                                    "relations": "data/"+recordType+"/%recordId",
                                    "spec": "uispecs/"+recordType+"/uispec"
                                },
                                replacements: {
                                    "recordId": "csid"
                                }
                            }
                        }
                    }
                }
            }
        };
    };

	cspace.util.isLocal = function () {
		return document.location.protocol === "file:";
	};
    
})(jQuery, fluid_1_1);
