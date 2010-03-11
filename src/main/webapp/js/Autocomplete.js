/*
Copyright 2009-2010 University of Toronto

Licensed under the Educational Community License (ECL), Version 2.0. 
ou may not use this file except in compliance with this License.

You may obtain a copy of the ECL 2.0 License at
https://source.collectionspace.org/collection-space/LICENSE.txt
*/

/*global jQuery, fluid_1_2*/

cspace = cspace || {};

(function ($, fluid) {

    var parseLabelFromUrn = function (string) {
        if (string.substring(0, 4) === "urn:") {
            return string.slice(string.indexOf("'") + 1, string.length - 1).replace("+", " ");
        } else {
            return string;
        }
    };

    var postNewTerm = function (data) {
        $.ajax({
            url: "../../chain" + data.url,
            dataType: "json",
            type: "POST",
            data: JSON.stringify({fields: {displayName: cspace.autocomplete.addConfirmDlg.newDisplayName}}),
            success: function (data) {
                cspace.autocomplete.addConfirmDlg.hide();
                // TODO: this needs to be set to the URN, not the displayName
                cspace.autocomplete.addConfirmDlg.field.val(cspace.autocomplete.addConfirmDlg.newDisplayName);
                cspace.autocomplete.addConfirmDlg.field.change();
            },
            error: function () {
                console.log("error posting new term");
            }
        });
    };

    var addNewTerm = function () {
        if (cspace.util.isLocal()) {
            cspace.autocomplete.addConfirmDlg.hide();
            return;
        }
        $.ajax({
            url: cspace.autocomplete.addConfirmDlg.vocabUrl,
            dataType: "json",
            type: "GET",
            success: postNewTerm,
            error: function () {
                console.log("error getting new term url");
            }
        });
    };

    var clearNewTerm = function () {
        cspace.autocomplete.addConfirmDlg.fieldToClear.val("");
        cspace.autocomplete.addConfirmDlg.hide();
    };

    var showConfirmation = function (newTerm, field, domBinder) {
        $("ul.ui-autocomplete", field.parent()).hide();
        domBinder.locate("newTerm", cspace.autocomplete.addConfirmDlg).text(newTerm);

        var autocompleteInput = $(".ui-autocomplete-input", field.parent());
        cspace.autocomplete.addConfirmDlg.newDisplayName = newTerm;
        cspace.autocomplete.addConfirmDlg.field = field;
        cspace.autocomplete.addConfirmDlg.fieldToClear = autocompleteInput;

        autocompleteInput.after(cspace.autocomplete.addConfirmDlg);
        cspace.autocomplete.addConfirmDlg.show();
    };

    var setUpConfirmation = function (that) {
        if (!cspace.autocomplete.addConfirmDlg) {
            cspace.autocomplete.addConfirmDlg = "temp"; // to ensure that only one is created
            var resources = {
                addConfirm: {
                    href: that.options.addConfirmationTemplate
                }
            };
            
            fluid.fetchResources(resources, function () {
                cspace.autocomplete.addConfirmDlg = $(resources.addConfirm.resourceText, that.container[0].ownerDocument);
                cspace.autocomplete.addConfirmDlg.hide();

                cspace.autocomplete.addConfirmDlg.vocabUrl = that.options.vocabUrl;
                cspace.autocomplete.addConfirmDlg.newDisplayName = "";

                that.locate("clearButton", cspace.autocomplete.addConfirmDlg).click(clearNewTerm);
                that.locate("addButton", cspace.autocomplete.addConfirmDlg).click(addNewTerm);
            });
        }
    };

    var makeAutocompleteCallback = function (that) {
        return function(request, callback){
            $.ajax({
                url: that.options.queryUrl + "?q=" + request.term,
                dataType: "text",
                success: function(data){
                    var dataArray;
                    if (data === "") {
                            showConfirmation(request.term, that.container, that.dom);
                    } else {
                        cspace.autocomplete.addConfirmDlg.hide();
                        var newdata = "[" + data.replace(/}\s*{/g, "},{") + "]";
                        dataArray = JSON.parse(newdata);
                        callback(dataArray);
                    }
                },
                error: function(){
                    if (cspace.util.isLocal()) {
                        if (request.term === "all") {
                            cspace.autocomplete.addConfirmDlg.hide();
                            testdata = ["Fred Allen", "Phyllis Allen", "Karen Allen", "Rex Allen"];
                            callback(testdata);
                        } else {
                            showConfirmation(request.term, that.container, that.dom);
                        }
                    }
                }
            });
        };
    };

    var setupAutocomplete = function (that) {
        var input = that.container;
        var autoCompleteInput = $("<input/>");
        autoCompleteInput.insertAfter(input);
        input.hide();

        var opts = {
            minLength: that.options.minChars,
            delay: that.options.delay,
            source: makeAutocompleteCallback(that),
            select: function(event, ui) {
                input.val(ui.item.urn);
                input.change();
            }
        };
        autoCompleteInput.autocomplete(opts).autocomplete();

        if (input.val()) {
            var val = input.val();
            autoCompleteInput.val(parseLabelFromUrn(val));
        }

        autoCompleteInput.blur(function () {
            var storedVal = input.val();
            var typedVal = autoCompleteInput.val();
            if (typedVal !== parseLabelFromUrn(storedVal)) {
                input.val(typedVal);
                input.change();
            }
        });
    };

	cspace.autocomplete = function (container, options) {
        var that = fluid.initView("cspace.autocomplete", container, options);

        setupAutocomplete(that);
        setUpConfirmation(that);

        return that;
    };
    
    fluid.defaults("cspace.autocomplete", {
        selectors: {
            newTerm: ".csc-autocomplete-newTerm",
            clearButton: ".csc-autcomplete-addClear",
            addButton: ".csc-autcomplete-addConfirm"
        },

        minChars: 3,
        delay: 500,

        addConfirmationTemplate: "../html/AutocompleteAddConfirmation.html"
    });

})(jQuery, fluid_1_2);
