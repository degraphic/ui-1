/*global jQuery, jqUnit, cspace*/
(function ($) {
    
        var testSchema  = {
            "foo": {
                "selector": "brack foofer"
            },
            "bar": {
                "selector": ".hello .goodbye"
            }
        };
    var objectEntryTest = new jqUnit.TestCase("ObjectEntry Tests");

    // this tests a modal dialog - it might have to remain last in the file
    objectEntryTest.test("showSchemaErrorMessage", function () {
        jqUnit.notVisible("Error dialog should not be visible to start", ".csc-error-dialog");

        var objEntry = cspace.objectEntry("#main");

        jqUnit.isVisible("Error dialog should be visible", ".csc-error-dialog");
        var errorMessage = $(".csc-error-message").text();
        jqUnit.assertTrue("Error string should contain schemaFetchError", (errorMessage.indexOf(objEntry.options.strings.schemaFetchError) > -1));
        jqUnit.assertTrue("Error string should contain errorRecoverySuggestion", (errorMessage.indexOf(objEntry.options.strings.errorRecoverySuggestion) > -1));
    });
    
    objectEntryTest.test("renderer.buildCutpoints", function () {
        var cutpoints = cspace.renderer.buildCutpoints(testSchema);
        jqUnit.assertEquals("There should be 2 cutpoints", 2, cutpoints.length);
        jqUnit.assertEquals("Field 'foo' should exist ", "foo", cutpoints[0].id);
        jqUnit.assertEquals("Field 'foo' should have ", "brack foofer", cutpoints[0].selector);
        jqUnit.assertEquals("Field 'bar' should exist ", "bar", cutpoints[1].id);
        jqUnit.assertEquals("Field 'ar' should have ", ".hello .goodbye", cutpoints[1].selector);
    });
    
    objectEntryTest.test("renderer.buildComponentTree", function () {
        var dataModel = {
            "foo": "foofer",
            "bar": "bat"
        };
        var expectedTree = {
            children: [
                {
                    ID: "foo",
                    valuebinding: "foo"
                },
                {
                    ID: "bar",
                    valuebinding: "bar"
                }
            ]
        };
        var tree = cspace.renderer.buildComponentTree(testSchema, dataModel);
        jqUnit.assertDeepEq("Tree should be ", expectedTree, tree);
    });
})(jQuery);
