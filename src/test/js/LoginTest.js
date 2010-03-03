/*
Copyright 2010 University of Toronto

Licensed under the Educational Community License (ECL), Version 2.0. 
ou may not use this file except in compliance with this License.

You may obtain a copy of the ECL 2.0 License at
https://source.collectionspace.org/collection-space/LICENSE.txt
*/

/*global jqUnit, jQuery, jqMock, cspace, fluid, start, stop, ok, expect*/

var loginTester = function(){
    // jqMock requires jqUnit.ok to exist
    jqUnit.ok = ok;

    var loginTest = new jqUnit.TestCase("Login Tests");

    loginTest.test("Basic login", function () {
        var login = cspace.login(".login-container", {baseUrl: "http://foo.com/bar"});
        jqUnit.isVisible("Basic login should be visible", login.options.selectors.signIn);
        jqUnit.notVisible("Email entry should not be visible", login.options.selectors.enterEmail);
        jqUnit.notVisible("New password entry should not be visible", login.options.selectors.resetRequest);
        jqUnit.notVisible("Reset confirmation should not be visible", login.options.selectors.passwordReset);
        jqUnit.notVisible("Warning should not be visible", login.options.selectors.warning);
        jqUnit.assertEquals("In local mode, login form action should be set to local option", "createnew.html", jQuery(login.options.selectors.loginForm).attr("action"));
        jqUnit.assertEquals("In local mode, reset form action should be set to local option", "createnew.html", jQuery(login.options.selectors.resetForm).attr("action"));

        var tempIsLocal = cspace.util.isLocal;
        cspace.util.isLocal = function () {return false;};
        login = cspace.login(".login-container", {baseUrl: "http://foo.com/bar"});
        jqUnit.assertEquals("Login form action should be set based on the supplied baseUrl", "http://foo.com/bar/login", jQuery(login.options.selectors.loginForm).attr("action"));
        jqUnit.assertEquals("Reset form action should be set based on the supplied baseUrl", "http://foo.com/bar/resetpassword", jQuery(login.options.selectors.resetForm).attr("action"));
        cspace.util.isLocal = tempIsLocal;
    });

    loginTest.test("Password reset request (local)", function () {
        var login = cspace.login(".login-container", {baseUrl: "http://foo.com/bar"});
        jQuery(login.options.selectors.requestReset).click();
        jqUnit.notVisible("Clicking 'reset password' hides basic login", login.options.selectors.signIn);
        jqUnit.isVisible("Clicking 'reset password' shows email form", login.options.selectors.enterEmail);

        jQuery(login.options.selectors.email).val("test@collectionspace.org");
        login.submitEmail();
        jqUnit.notVisible("On success, after submit email form should be hidden", login.options.selectors.enterEmailForm);
        jqUnit.isVisible("On success, after submit 'reset request submitted' message should be displayed", login.options.selectors.enterEmailMessage);
    });

    loginTest.test("Password reset request Ajax parameters", function () {
        var ajaxMock = new jqMock.Mock(jQuery, "ajax");
        // Don't know how jqMock checks functions, so just check the other parameters for now
        var expectedAjaxParams = {
            url: "http://foo.com/bar/passwordreset",
            data: JSON.stringify({"email":"test@collectionspace.org"}),
            type: "POST",
            dataType: "json"
        };
        ajaxMock.modify().args(jqMock.is.objectThatIncludes(expectedAjaxParams));

        var tempIsLocal = cspace.util.isLocal;
        cspace.util.isLocal = function () {return false;};
        var login = cspace.login(".login-container", {baseUrl: "http://foo.com/bar"});
        jQuery(login.options.selectors.email).val("test@collectionspace.org");
        login.submitEmail();
        ajaxMock.verify();
        ajaxMock.restore();
    });

    loginTest.test("Password reset request Ajax callback", function () {
        var tempIsLocal = cspace.util.isLocal;
        cspace.util.isLocal = function () {return false;};
        var login = cspace.login(".login-container", {baseUrl: "http://foo.com/bar"});
        var testSuccess = function (data, textStatus, xhr) {
            jqUnit.assertTrue("Success actually shouldn't happen when testing locally", false);
            cspace.util.isLocal = tempIsLocal;
            start();
        };
        var testError = function (xhr, textStatus, errorThrown) {
            jqUnit.assertTrue("Error callback should happen when testing locally", true);
            cspace.util.isLocal = tempIsLocal;
            start();
        };
        login.events.emailSubmitted.addListener(testSuccess);
        login.events.onError.addListener(testError);

        jQuery(login.options.selectors.email).val("test@collectionspace.org");
        stop();
        login.submitEmail();
    });
};

(function () {
    loginTester();
}());


/*
*/