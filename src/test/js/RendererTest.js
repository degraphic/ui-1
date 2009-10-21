/*
Copyright 2009 University of Toronto

Licensed under the Educational Community License (ECL), Version 2.0. 
ou may not use this file except in compliance with this License.

You may obtain a copy of the ECL 2.0 License at
https://source.collectionspace.org/collection-space/LICENSE.txt
*/

/*global jqUnit, jQuery, jqMock, cspace, fluid, start, stop, ok, same*/

var rendererTester = function(){

    var rendererTest = new jqUnit.TestCase("Renderer Tests");

    rendererTest.test("Cutpoints", function () {
        var cutpoints = cspace.renderer.createCutpoints(testSpec.spec);
        jqUnit.assertDeepEq("Cutpoints for UISpec with repeated items", testCutpoints, cutpoints);
    });

    rendererTest.test("Basic Component trees", function () {
        var tree = cspace.renderer.buildComponentTree(testSpec.spec, testModel);
        jqUnit.assertDeepEq("Component tree for UISpec with repeated items", testTree, tree);
    });

    rendererTest.test("Component tree, Select only", function () {
        var treeDefault = cspace.renderer.buildComponentTree(defaultEmptyModel.spec.spec, defaultEmptyModel.model);
        jqUnit.assertDeepEq("Tree for select, list has default, model has no value", defaultEmptyModel.tree, treeDefault);
        jqUnit.assertEquals("Model should have default value", "post", defaultEmptyModel.model.entryMethod);
        
        var treeNoDefault = cspace.renderer.buildComponentTree(noDefaultEmptyModel.spec.spec, noDefaultEmptyModel.model);
        jqUnit.assertDeepEq("Tree for select, list has no default, model has no value", noDefaultEmptyModel.tree, treeNoDefault);
        jqUnit.assertEquals("Model should have 'none'", "none", noDefaultEmptyModel.model.entryReason);

        var treeDefaultWithModel = cspace.renderer.buildComponentTree(defaultWithModel.spec.spec, defaultWithModel.model);
        jqUnit.assertDeepEq("Tree for select, list has default, model has a value", defaultWithModel.tree, treeDefaultWithModel);
        jqUnit.assertEquals("Model should have original value", "found-on-doorstep", defaultWithModel.model.entryMethod);

        var treeNoDefaultWithModel = cspace.renderer.buildComponentTree(noDefaultWithModel.spec.spec, noDefaultWithModel.model);
        jqUnit.assertDeepEq("Tree for select, list has no default, model has a value", noDefaultWithModel.tree, treeNoDefaultWithModel);
        jqUnit.assertEquals("Model should have original value", "commission", noDefaultWithModel.model.entryReason);
    });

};

(function () {
    rendererTester();
}());
