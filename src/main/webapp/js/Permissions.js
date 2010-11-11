/*
Copyright 2010

Licensed under the Educational Community License (ECL), Version 2.0. 
You may not use this file except in compliance with this License.

You may obtain a copy of the ECL 2.0 License at
https://source.collectionspace.org/collection-space/LICENSE.txt
*/

/*global jQuery, fluid, cspace, window*/
"use strict";

fluid.registerNamespace("cspace.permissions");

(function ($, fluid) {
    fluid.log("Permissions.js loaded");
    
    var setupPermissionManager = function (that) {
        var method = that.options.method;
        var operations = that.options.operations;
        if (!method || !operations) {
            return;
        }
        that.resolve = function (elPath) {
            return that["resolve" + method](elPath, operations);
        };
    };
    
    var resolveOperation = function (resolve, elPath, operations, notResolved) {
        return fluid.find(operations, function (operation) {
            if (resolve(elPath, operation) !== notResolved) {
                return !notResolved;
            }
        }, notResolved);
    };

    cspace.permissions.manager = function (options) {
        var that = fluid.initLittleComponent("cspace.permissions.manager", options);
        
        // Resolve a single operation based on options.permissions.
        that.resolvePermissions = function (elPath, operation) {
            var permittedOperations = fluid.model.getBeanValue(that.options.permissions, elPath);
            if (!permittedOperations) {
                return that.options.ifEmpty;
            }
            return $.inArray(operation || that.options.operation, permittedOperations) > -1;
        };
        
        // Resolves a set of permissions to true if there is at least one match with the options.permissions.
        that.resolveOR = function (elPath, operations) {
            return resolveOperation(that.resolvePermissions, elPath, operations || that.options.operations, false);
        };
        
        // Resolves a set of permissions to true only if there is a complete match with options.permissions.
        that.resolveAND = function (elPath, operations) {
            return resolveOperation(that.resolvePermissions, elPath, operations || that.options.operations, true);
        };
        
        // Add that.resolve if method and operations are provided.
        setupPermissionManager(that);
        
        return that;
    };
    
    fluid.defaults("cspace.permissions.manager", {
        permissions: {},
        method: "", // AND or OR // Style of resolving permission.
        ifEmpty: true // Instruction to perm.manager how to resolve a resource when we have no permissions.
    });
})(jQuery, fluid);
