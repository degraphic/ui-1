/*
Copyright 2009 University of Cambridge
Copyright 2009 University of Toronto

Licensed under the Educational Community License (ECL), Version 2.0. 
ou may not use this file except in compliance with this License.

You may obtain a copy of the ECL 2.0 License at
https://source.collectionspace.org/collection-space/LICENSE.txt
*/

/*global jQuery, fluid_1_1*/

var cspace = cspace || {};

(function ($, fluid) {
	
    // Ultimately, the UISpec will be loaded via JSONP (see CSPACE-300). Until then,
    // load it manually via ajax
    var fetchUISpec = function (that, callback) {
        jQuery.ajax({
            url: that.options.uiSpecUrl,
            type: "GET",
            dataType: "json",
            success: callback,
            error: function (xhr, textStatus, errorThrown) {
                console.log("Error retrieving UISpec: " + textStatus);
            }
        });
    };
    
    // TODO: This component tree will eventually be programmatically generated from the UI Spec
    var buildComponentTree = function (that) {
        var tree = {
            children: [{
                ID: "news-info",
                valuebinding: "newsInfo"
            }, {
                ID: "userid",
                valuebinding: "userid"
            }, {
                ID: "password",
                valuebinding: "password"
            }, {
                ID: "login-button",
                value: "login",
                decorators: [{
                    type: "jQuery",
                    func: "click",
                    args: function () {
                        that.events.onLogin.fire();
                    }
                }]
            }]
        };
        return tree;
    };
        
	var sendLoginToServer = function (that) {
        // TODO: Security - don't want to send login info as plain text
        jQuery.ajax({
            // TODO: Specify the URL in the options, so users can provide it
            url: "http://localhost/",
            type: "POST",
            dataType: "json",
            data: JSON.stringify(that.model),
            success: that.events.loginSuccess.fire,
            error: that.events.loginError.fire
        });
    };
    
    var handleError = function (that, XMLHttpRequest, textStatus, errorThrown) {
        that.locate("unWarning").show();
    };
    
    var createPageRenderer = function (that) {
        return function (spec, textStatus) {
            that.spec = spec.spec;
            that.model.newsInfo = that.spec.newsInfo.defaultText;
            that.refreshView();
        };
    };
    
    var setupLogin = function (that) {        
        that.events.onLogin.addListener(function () {
            sendLoginToServer(that);
        });
        
        that.events.loginError.addListener(function (XMLHttpRequest, textStatus, errorThrown) {
            handleError(that, XMLHttpRequest, textStatus, errorThrown);
        });
        
        fetchUISpec(that, createPageRenderer(that));
    };
    
    /**
     * Login Component
     * 
     * @param {Object} container
     * @param {Object} options
     */
    cspace.login = function (container, options) {
        var that = fluid.initView("cspace.login", container, options);
        that.model = {
            userid: "",
            password: "",
            newsInfo: ""
        };
                
        that.refreshView = function () {
            var opts = {
                model: that.model,
                autoBind: true
            };
            fluid.selfRender(that.container, buildComponentTree(that), opts);
        };

        setupLogin(that);
        return that;
    };

    fluid.defaults("cspace.login", {
        
        events: {
            onLogin: null,
            loginSuccess: null,
            loginError: null
        },
    
        selectors: {
            userID: ".csc-user-id",
            password: ".csc-password",
            loginButton: ".csc-login-button",
            unWarning: ".csc-un-warning",
            pwWarning: ".csc-pw-warning"
        },
        
        // Ultimately, the UISpec will be loaded via JSONP (see CSPACE-300). Until then,
        // load it manually via ajax
        uiSpecUrl: "./login/spec/spec.json"
        
    });
    
})(jQuery, fluid_1_1);
