/*
Copyright 2009-2010 University of Toronto
Copyright 2009 University of Cambridge

Licensed under the Educational Community License (ECL), Version 2.0. 
You may not use this file except in compliance with this License.

You may obtain a copy of the ECL 2.0 License at
https://source.collectionspace.org/collection-space/LICENSE.txt
*/

/*global jQuery, window, cspace*/

var demo = demo || {};

(function ($) {

    demo.setup = function () {
        var pageSpec = {
            href: "../html/acquisitionTemplate.html",
            templateID: "csc-acquisition-template",
            targetSelector: ".csc-acquisition-container"
        };
        var intake = cspace.dataEntrySetup("acquisition", pageSpec);
    };
})(jQuery);

