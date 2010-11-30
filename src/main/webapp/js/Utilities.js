/*
Copyright 2009-2010 University of Toronto

Licensed under the Educational Community License (ECL), Version 2.0. 
You may not use this file except in compliance with this License.

You may obtain a copy of the ECL 2.0 License at
https://source.collectionspace.org/collection-space/LICENSE.txt
*/

/*global jQuery, fluid, cspace, window*/
"use strict";

fluid.registerNamespace("cspace.util");

(function ($, fluid) {
    fluid.log("Utilities.js loaded");
    
    // This should eventually go away [DEPRECATED].
    cspace.util.useLocalData = function () {
        return document.location.protocol === "file:";
    };
    
    if (cspace.util.useLocalData()) {
        fluid.staticEnvironment.cspaceEnvironment = fluid.typeTag("cspace.localData");
    }

    // Attach a 'live' handler to the keydown event on all selects
    // Prevents this upsetting and undesirable behaviour (CSPACE-2840)
    // Note: this is not a utility but rather gets run when this file loads 
    //       - we might consider moving it to a framework file if we create one.
    $("select").live("keydown", function (event) {
        if (event.keyCode === $.ui.keyCode.BACKSPACE) {
            return false;
        }
    });

    cspace.util.addTrailingSlash = function (url) {
        return url + ((url.charAt(url.length - 1) !== "/") ? "/" : "");
    };

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
    
    fluid.defaults("cspace.specBuilderImpl", {
        urlRenderer: {
            expander: {
                type: "fluid.deferredInvokeCall",
                func: "cspace.urlExpander"
            }
        }  
    });

    cspace.specBuilderImpl = function (options) {
        // build a false "component" just to get easy access to options merging
        var that = fluid.initLittleComponent("cspace.specBuilderImpl", options);
        if (that.options.urlPrefix) {
            that.options.spec.url = that.options.urlPrefix + that.options.spec.url;
        }
        else if (that.options.urlRenderer) {
            that.options.spec.url = that.options.urlRenderer(that.options.spec.url);
        }
        return that.options.spec;
    };

    cspace.specBuilder = function (options) {
        return fluid.invoke("cspace.specBuilderImpl", {spec: options});
    };
    
    // a convenience wrapper for specBuilderImpl that lets us pass the URL as a simple string
    cspace.simpleSpecBuilder = function (urlStub) {
        return fluid.invoke("cspace.specBuilderImpl", {url: urlStub});
    };
    
    fluid.demands("cspace.urlExpander", "cspace.localData", {
        args: {
            vars: {
                chain: ".."
            }
        }
    });
    
    cspace.urlExpander = function (options) {
        var that = fluid.initLittleComponent("cspace.urlExpander", options);
        return function (url) {
            return fluid.stringTemplate(url, that.options.vars);
        };
    };
    
    fluid.defaults("cspace.urlExpander", {
        vars: {
            chain: "../../chain",
            webapp: ".."
        }
    });
    
    /**
     * cspace.util.isCurrentUser - currently a function that will verify the csid vs the currenly logged in user's csid.
     * Potientially might have more permission related functionality.
     * % options - an object with options that is currently only interested in csid (current user's csid).
     */
    cspace.util.isCurrentUser = function (options) {
        var that = fluid.initLittleComponent("cspace.util.isCurrentUser", options);
        return function (csid) {
            return csid === that.options.csid;
        };
    };
    
    fluid.defaults("cspace.util.isCurrentUser", {
        csid: null
    });
    
    /** Convert the global state of using local data into an IoC "type tag" so that
     * decisions based on it can be performed out of line with application code.
     * By use of this "indirect dispatch" all test configuration code may now be
     * bundled in files that are not part of the production image */
  
    var eUC = "encodeURIComponent:";
  
    /** A "Data Source" attached to a URL. Reduces HTTP transport to the simple 
     * "Data Source" API. This should become the only form of AJAX throughout CollectionSpace,
     * with the exception of calls routed through fluid.fetchResources (the two methods may
     * be combined by use of makeAjaxOpts and conversion into a resourceSpec) */   
    // TODO: integrate with Engage conception and knock the rough corners off
    cspace.URLDataSource = function (options) {
        var that = fluid.initLittleComponent(options.typeName, options);
        var wrapper = that.options.delay ? function (func) {
            setTimeout(func, that.options.delay);
        } : function (func) {
            func();
        };

        function resolveUrl(directModel) {
            var expander = fluid.invoke("cspace.urlExpander");
            var map = fluid.copy(that.options.termMap) || {};
            map = fluid.transform(map, function (entry) {
                var encode = false;
                if (entry.indexOf(eUC) === 0) {
                    encode = true;
                    entry = entry.substring(eUC.length);
                }
                if (entry.charAt(0) === "%") {
                    entry = fluid.model.getBeanValue(directModel, entry.substring(1));
                }
                if (encode) {
                    entry = encodeURIComponent(entry);
                }
                return entry;
            });
            var replaced = fluid.stringTemplate(that.options.url, map);
            replaced = expander(replaced);
            return replaced;
        }
        
        that.makeAjaxOpts = function (model, directModel, callback, type) {
            var togo = {
                type: type,
                url: resolveUrl(directModel),
                contentType: "application/json; charset=UTF-8",
                dataType: "json",
                success: function (data) {
                    if (that.options.responseParser) {
                        data = that.options.responseParser(data, directModel);
                    }
                    callback(data);
                },
                error: function (xhr, textStatus, errorThrown) {
                    fluid.log("Data fetch error for url " + togo.url + " - textStatus: " + textStatus);
                    fluid.log("ErrorThrown: " + errorThrown);
                }                
            };
            if (model) {
                togo.data = JSON.stringify(model);
            }
            return togo;
        };

        that.get = function (directModel, callback) {
            var ajaxOpts = that.makeAjaxOpts(null, directModel, callback, "GET");
            wrapper(function () {
                $.ajax(ajaxOpts);
            });
        };
        if (options.writeable) {
            that.put = function (model, directModel, callback) {
                var ajaxOpts = that.makeAjaxOpts(model, directModel, callback, "POST");
                $.ajax(ajaxOpts);
            }; 
        }
        return that;
    };
    
    /** "Global Dismissal Handler" for the entire page. Attaches a click handler to the
     *  document root that will cause dismissal of any elements (typically dialogs) which
     *  have registered themselves. Dismissal through this route will automatically clean up
     *  the record - however, the dismisser themselves must take care to deregister in the case
     *  dismissal is triggered through the dialog interface itself. */
    
    var dismissList = {};
    
    $(document).click(function (event) {
        var target = event.target;
        while (target) {
            if (dismissList[target.id]) {
                return;
            }
            target = target.parentNode;
        }
        fluid.each(dismissList, function (dismissFunc, key) {
            dismissFunc();
            delete dismissList[key];
        });
    });
    
    cspace.util.globalDismissal = function (nodes, dismissFunc) {
        nodes = $(nodes);
        fluid.each(nodes, function (node) {
            var id = fluid.allocateSimpleId(node);
            if (dismissFunc) {
                dismissList[id] = dismissFunc;
            }
            else {
                delete dismissList[id];
            }
        });
    };
    
    cspace.util.displayTimestampedMessage = function (locater, msg, time) {
        var messageContainer = locater.locate("messageContainer", "body");
        locater.locate("feedbackMessage", messageContainer).text(msg);
        locater.locate("timestamp", messageContainer).text(time ? time : "");
        messageContainer.show();
    };

    cspace.util.hideMessage = function (locater) {
        locater.locate("messageContainer", "body").hide();
    };

    cspace.util.setZIndex = function () {
        if ($.browser.msie) {
            var zIndexNumber = 999;
            $("div").each(function () {
                $(this).css('zIndex', zIndexNumber);
                zIndexNumber -= 1;
            });
        }
    };

    cspace.util.corner = function () {
    };
    
    cspace.util.getDefaultConfigURL = function () {
        var url = window.location.pathname;
        return ".\/config" + url.substring(url.lastIndexOf("/"), url.indexOf(".html")) + ".json";
    };
    
    fluid.demands("cspace.util.getLoginURL", "cspace.localData", {
        args: {
            url: "%webapp/html/data/login/status.json"
        }
    });
    
    cspace.util.getLoginURL = function (options) {
        var that = fluid.initLittleComponent("cspace.util.getLoginURL", options);
        return that.options.urlRenderer(that.options.url);
    };
    
    fluid.defaults("cspace.util.getLoginURL", {
        url: "%chain/loginstatus",
        urlRenderer: {
            expander: {
                type: "fluid.deferredInvokeCall",
                func: "cspace.urlExpander"
            }
        }
    });
    
    fluid.demands("cspace.util.getDefaultSchemaURL", "cspace.localData", {
        args: ["@0", {
            url: "%webapp/html/uischema/%recordType.json"
        }]
    });
    
    cspace.util.getDefaultSchemaURL = function (recordType, options) {
        var that = fluid.initLittleComponent("cspace.util.getDefaultSchemaURL", options);
        var url = fluid.stringTemplate(that.options.url, {
            recordType: recordType
        });
        return that.options.urlRenderer(url);
    };
    
    fluid.defaults("cspace.util.getDefaultSchemaURL", {
        url: "%chain/%recordType/uischema",
        urlRenderer: {
            expander: {
                type: "fluid.deferredInvokeCall",
                func: "cspace.urlExpander"
            }
        }
    });
    
    fluid.demands("cspace.util.getUISpecURL", "cspace.localData", {
        args: ["@0", {
            url: "%webapp/html/uispecs/%pageType/uispec.json"
        }]
    });
    
    cspace.util.getUISpecURL = function (pageType, options) {
        var that = fluid.initLittleComponent("cspace.util.getUISpecURL", options);
        var url = fluid.stringTemplate(that.options.url, {
            pageType: pageType
        });
        return that.options.urlRenderer(url);
    };
    
    fluid.defaults("cspace.util.getUISpecURL", {
        url: "%chain/%pageType/uispec",
        urlRenderer: {
            expander: {
                type: "fluid.deferredInvokeCall",
                func: "cspace.urlExpander"
            }
        }
    });
    
    cspace.util.fullUrl = function (prefix, templateName) {
        return prefix ? prefix + templateName : templateName;
    };
    
    cspace.util.resolvePermissions = function (source, permManager) {
        fluid.remove_if(source, function (sourceItem, key) {
            if (!permManager.resolve(key)) {
                return true;
            }
            if (sourceItem && typeof sourceItem === "object") {
                cspace.util.resolvePermissions(sourceItem, permManager);
            }
            else {
                return !permManager.resolve(sourceItem);
            }
        });
    };
    
    // This will eventually go away once the getBeanValue strategy is used everywhere.
    cspace.util.getBeanValue = function (root, EL, schema, permManager) {
        if (EL === "" || EL === null || EL === undefined) {
            return root;
        }
        var segs = fluid.model.parseEL(EL);
        for (var i = 0; i < segs.length; ++i) {
            var seg = segs[i];
            if (permManager && !permManager.resolve(seg)) {
                return undefined;
            }
            if (!root[seg] && !schema) {
                return undefined;
            }
            if (root[seg]) {
                root = root[seg];
                continue;
            }
            var subSchema = schema[seg];
            if (!subSchema) {
                return undefined;
            }
            var type = subSchema.type;
            if (!type) {
                // Schema doesn't have a type.
                fluid.fail("Schema for " + seg + "is incorrect: type is missting");
            }
            var defaultValue = subSchema["default"];
            if (typeof defaultValue !== "undefined") {
                if (permManager) {
                    cspace.util.resolvePermissions(defaultValue, permManager);
                }
                root = defaultValue;
                continue;
            }
            if (type === "array") {
                var items = subSchema.items;
                subSchema = items ? [items] : [];
                root[seg] = [];
            }
            else if (type === "object") {
                subSchema = subSchema.properties;
                root[seg] = {};
            }
            else {
                root[seg] = undefined;
            }
            root = root[seg];
            if (!root) {
                return root;
            }
            // TODO: This will show you the whole WORLD, whether you want it or not.
            for (var subSegment in subSchema) {
                root[subSegment] = cspace.util.getBeanValue(root, subSegment, subSchema);
            }
        }
        return root;
    };
    
    fluid.registerNamespace("cspace.util.censorWithSchemaStrategy");
    
	// This should be split into 2 strategies since now getBeanValue
	// can handle falsy resolved values.
    cspace.util.censorWithSchemaStrategy = function (options) {
        return {
            init: function () {
                var that = fluid.initLittleComponent("cspace.util.censorWithSchemaStrategy", options);
                var schema = that.options.schema;
                that.permManager = that.options.permManager;
                if (!that.permManager && that.options.permissions) {
                    fluid.initDependents(that);
                }
                return function (root, segment, index) {
                    if (that.permManager && !that.permManager.resolve(segment)) {
                        return;
                    }
                    if (!root[segment] && !schema) {
                        return;
                    }
                    if (root[segment]) {
                        if (that.permManager) {
                            cspace.util.resolvePermissions(root[segment], that.permManager);
                        }
                        return root[segment];
                    }
                    schema = schema[segment];
                    if (!schema) {
                        return;
                    }
                    var type = schema.type;
                    if (!type) {
                        // Schema doesn't have a type.
                        fluid.fail("Schema for " + segment + "is incorrect: type is missing");
                    }
                    var defaultValue = schema["default"];
                    if (typeof defaultValue !== "undefined") {
                        if (that.permManager) {
                            cspace.util.resolvePermissions(defaultValue, that.permManager);
                        }
                        return defaultValue;
                    }
                    if (type === "array") {
                        var items = schema.items;
                        schema = items ? [items] : [];
                        return [];
                    }
                    else if (type === "object") {
                        schema = schema.properties;
                        return {};
                    }
                    else {
                        return;
                    }
                };
            }
        };
    };
    
    fluid.demands("permManager", "cspace.util.censorWithSchemaStrategy", [fluid.COMPONENT_OPTIONS]);
    
    fluid.defaults("cspace.util.censorWithSchemaStrategy", {
        mergePolicy: {
            schema: "preserve"
        },
        components: {
            permManager: {
                type: "cspace.permissions.manager",
                options: {
                    permissions: "{censorWithSchemaStrategy}.options.permissions",
                    method: "{censorWithSchemaStrategy}.options.method",
                    operations: "{censorWithSchemaStrategy}.options.operations",
                    ifEmpty: "{censorWithSchemaStrategy}.options.ifEmpty"
                }
            }
        }
    });
    
    cspace.util.buildUrl = function (operation, baseUrl, recordType, csid, fileExtension) {
        if (operation === "addRelations") {
            return cspace.util.addTrailingSlash(baseUrl) + "relationships/";
        } else {
            return cspace.util.addTrailingSlash(baseUrl) + recordType + "/" + (csid ? csid + fileExtension : "");
        }
    };
    
    cspace.util.invokeWithoutFail = function (toInvoke, args) {
        if (toInvoke) {
            try {
                toInvoke.apply(null, args);
            }
            catch (e) {
                fluid.log("Exception applying callback: " + e);
            }
        }
    };
    
    cspace.util.composeCallbacks = function (first, second) {
        return function () {
            cspace.util.invokeWithoutFail(first, arguments);
            return cspace.util.invokeWithoutFail(second, arguments);
        };
    };
    
    function createMarkup(that) {
        var markup = $(that.options.markup);
        markup.hide();
        markup.addClass(that.options.styles.rootClass);
        that.locate("image", markup).attr("src", that.options.imageUrl);
        that.locate("message", markup).text(that.options.strings.loadingMessage);
        $("body").append(markup);
        return markup;
    }
    
    function updateDimensions(that) {
        var target = that.container[0];
        that.indicator.css({
            left: target.offsetLeft + "px",
            top: (target.offsetTop - that.options.heightExpand) + "px",
            width: target.offsetWidth + "px",
            height: (target.offsetHeight + that.options.heightExpand * 2) + "px" 
        });
    }
    
    cspace.util.globalLoadingIndicator = function (container, options) {
        var that = fluid.initView("cspace.util.globalLoadingIndicator", container, options);
        that.indicator = createMarkup(that);
        that.show = function () {
            that.indicator.show();
            that.update();
        };
        
        that.update = function () {
            updateDimensions(that);
        };
        
        that.hide = function () {
            that.indicator.hide();
        };
        
        return that;  
    };
    
    fluid.defaults("cspace.util.globalLoadingIndicator", {
        imageUrl: "../images/indeterminateProgressSpinner_92x92_blackonwhite.gif",
        selectors: {
            image: "img",
            message: "span"  
        },
        styles: {
            rootClass: "cs-loading-root"
        },
        strings: {
            loadingMessage: "Loading record..."          
        },
        heightExpand: 5,
        markup: "<div><div class=\"cs-loading-centre\"><span>Message here</span><br/><img src=\"#\"/></div></div>"
    });
    
    cspace.util.globalLoadingAssociator = function (options) {
        var that = fluid.initLittleComponent("cspace.util.globalLoadingAssociator", options);
        var indicator = cspace.util.globalLoadingIndicator(that.options.indicatorTarget, that.options.indicatorOptions);
        that.supplySpecs = function (resourceSpecs) {
            var mainWait = that.options.mainWaitSpec;
            if (!mainWait) {
                indicator.show();
            }
            fluid.each(resourceSpecs, function (spec, key) {
                spec.options.success = cspace.util.composeCallbacks(spec.options.success, key === mainWait ? indicator.show : indicator.update);
            });
            if (!resourceSpecs[mainWait]) {
                indicator.show();
            }
        };
        that.wrapCallback = function (callback) {
            return cspace.util.composeCallbacks(
                indicator.hide, callback
                );
        };
        return that;     
    };

    fluid.defaults("cspace.util.globalLoadingAssociator", {
        indicatorTarget: "#all-content",
        mainWaitSpec: "recordEditor",
        indicatorOptions: {}
    });
    
    cspace.util.refreshComponents = function (that) {
        fluid.each(that.options.components, function (component, name) {
            var subComponent = that[name];
            if (subComponent.refreshView) {
                subComponent.refreshView();
            }
        });
    };
    
    cspace.util.elStylefy = function (str, postfix) {
        return "${" + str + "}." + (postfix || "");
    };
    
})(jQuery, fluid);
