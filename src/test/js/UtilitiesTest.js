/*
Copyright 2010 University of Toronto

Licensed under the Educational Community License (ECL), Version 2.0. 
ou may not use this file except in compliance with this License.

You may obtain a copy of the ECL 2.0 License at
https://source.collectionspace.org/collection-space/LICENSE.txt
*/

/*global jqUnit, jQuery, cspace, fluid, start, stop, ok, expect*/
"use strict";

var utilitiesTester = function ($) {
    
    var uispec, expectedBase, schema;
    
    var repeatable = {
        decorators: [
            {
                func: "cspace.makeRepeatable",
                type: "fluid",
                options: {
                    "elPath": "fields.responsibleDepartments",
                    "protoTree": {
                        ".csc-object-identification-other-number": "${fields.otherNumbers.0.otherNumber}",
                        ".csc-object-identification-other-number-type": {
                            optionnames: [
                                "Lender",
                                "Obsolete"
                            ],
                            optionlist: [
                                "lender",
                                "obsolete"
                            ],
                            selection: "${fields.otherNumbers.0.otherNumberType}" 
                        }
                    }
                }
            }
        ]
    };
    
    var nestedRepeatable = {
        decorators: [
            {
                func: "cspace.makeRepeatable",
                type: "fluid",
                options: {
                    "elPath": "fields.responsibleDepartments",
                    "protoTree": {
                        ".csc-object-identification-other-number": "${fields.otherNumbers.0.otherNumber.0.nestedNumber}",
                        ".csc-object-identification-other-number-type": {
                            optionnames: [
                                "Lender",
                                "Obsolete"
                            ],
                            optionlist: [
                                "lender",
                                "obsolete" 
                            ],
                            selection: "${fields.otherNumbers.0.otherNumber.0.nestedNumberType}"
                        }
                    }
                }
            }
        ]
    };
    
    var schemaForPerms = schema = {
        "loanout": {
            "type": "object",
            "properties": {
                "fields": {
                    "type": "object",
                    "properties": {
                        "role": {
                            "type": "object",
                            "properties": {
                                "account": {
                                    "type": "object"
                                },
                                "role": {
                                    "type": "array",
                                    "default": [{
                                        "roleName": "ROLE_ADMINISTRATOR",
                                        "roleId": "1",
                                        "roleGroup": "Museum staff",
                                        "roleAssigned": true
                                    }]
                                }
                            }
                        }
                    }
                }
            }
        },
        "acquisition": {
            "type": "object",
            "properties": {
                "fields": {
                    "type": "object",
                    "properties": {
                        "role": {
                            "type": "object",
                            "properties": {
                                "account": {
                                    "type": "object"
                                },
                                "role": {
                                    "type": "array",
                                    "default": [{
                                        "roleName": "ROLE_ADMINISTRATOR",
                                        "roleId": "1",
                                        "roleGroup": "Museum staff",
                                        "roleAssigned": true
                                    }]
                                }
                            }
                        }
                    }
                }
            }
        },
        "recordlist": {
            "default": ["person", "intake", "location", "loanin", "loanout", "contact", "acquisition", "organization", "objects", "movement", "objectexit"],
            "type": "array"
        }
    };
    
    var readOnlyMovementSpec = {
        "recordEditor": {
            ".csc-movement-movementNote": "${fields.movementNote}",
            ".csc-movement-plannedRemovalDate": "${fields.plannedRemovalDate}",
            ".csc-movement-currentLocation": "${fields.currentLocation}",
            ".csc-movement-movementContact": {
                "value": "${fields.movementContact}",
                "decorators": [{
                    "func": "cspace.util.urnToStringFieldConverter",
                    "type": "fluid"   
                }]
            },
            ".csc-movement-locationDate": "${fields.locationDate}",
            ".csc-movement-currentLocationFitness": {
                "value": "${fields.currentLocationFitness}", 
                "decorators": [{
                    "func": "cspace.util.nameForValueFinder",
                    "type": "fluid",
                    "options": {
                        "list": [
                            "",
                            "dangerous",
                            "suitable",
                            "temporary",
                            "unsuitable"
                        ],
                        "names": [
                            "Please select a value",
                            "Dangerous",
                            "Suitable",
                            "Temporary",
                            "Unsuitable"
                        ]
                    }
                }]
            },
            ".csc-movement-normalLocation": "${fields.normalLocation}",
            ".csc-movement-movementMethods": {
                "decorators": [
                    {
                        "func": "cspace.makeRepeatable",
                        "type": "fluid",
                        "options": {
                            "elPath": "fields.movementMethods",
                            "protoTree": {
                                "expander": {
                                    "tree": {
                                        "expander": {
                                            "repeatID": "repeat:",
                                            "tree": {
                                                ".csc-movement-movementMethods": {
                                                    "value": "${{row}.movementMethod}",
                                                    "decorators": [{
                                                        "func": "cspace.util.nameForValueFinder",
                                                        "type": "fluid",
                                                        "options": {
                                                            "list": [
                                                                "",
                                                                "forklift",
                                                                "handcarried",
                                                                "trolley"
                                                            ],
                                                            "names": [
                                                                "Please select a value",
                                                                "Forklift",
                                                                "Handcarried",
                                                                "Trolley"
                                                            ]
                                                        }
                                                    }]
                                                }
                                            },
                                            "type": "fluid.renderer.repeat",
                                            "pathAs": "row",
                                            "controlledBy": "fields.movementMethods"
                                        }
                                    },
                                    "type": "fluid.noexpand"
                                }
                            }
                        }
                    }
                ]
            },  
            ".csc-movement-currentLocationNote": "${fields.currentLocationNote}",
            ".csc-movement-movementReferenceNumber": "${fields.movementReferenceNumber}",
            ".csc-movement-reasonForMove": {
                "value": "${fields.reasonForMove}", 
                "decorators": [{
                    "func": "cspace.util.nameForValueFinder",
                    "type": "fluid",
                    "options": {
                        "list": [
                            "",
                            "conservation",
                            "exhibition",
                            "inventory",
                            "loan",
                            "newstoragelocation",
                            "photography",
                            "research"
                        ],
                        "names": [
                            "Please select a value",
                            "Conservation",
                            "Exhibition",
                            "Inventory",
                            "Loan",
                            "New Storage Location",
                            "Photography",
                            "Research"
                        ]
                    }
                }]
            },
            ".csc-movement-removalDate": "${fields.removalDate}"
        }
    }
    
    var readOnlyAcquisitionSpec = {
        "recordEditor": {
            ".csc-acquisition-object-purchase-price-currency": {
                "value": "${fields.objectPurchasePriceCurrency}", 
                "decorators": [{
                    "func": "cspace.util.nameForValueFinder",
                    "type": "fluid",
                    "options": {
                        "list": [
                            "",
                            "danishkrone",
                            "swedishkrona",
                            "usd",
                            "canadiandollar",
                            "gbp",
                            "eur",
                            "swissfranc"
                        ],
                        "names": [
                            "Please select a value",
                            "Danish Krone",
                            "Swedish Krona",
                            "US Dollar",
                            "Canadian Dollar",
                            "Pound Sterling",
                            "Euro",
                            "Swiss Franc"
                        ]
                    }
                }]
            },
            ".csc-acquisition-original-object-purchase-price-value": "${fields.originalObjectPurchasePriceValue}",
            ".csc-acquisition-acquisitionFunding": {
                "decorators": [{
                    "type": "fluid",
                    "func": "cspace.makeRepeatable",
                    "options": {
                        "protoTree": {
                            "expander": {
                                "tree": {
                                    "expander": {
                                        "repeatID": "repeat:",
                                        "tree": {
                                            ".csc-acquisition-acquisitionFundingCurrency": {
                                                "value": "${{row}.acquisitionFundingCurrency}", 
                                                "decorators": [{
                                                    "func": "cspace.util.nameForValueFinder",
                                                    "type": "fluid",
                                                    "options": {
                                                        "list": [
                                                            "",
                                                            "danishkrone",
                                                            "swedishkrona",
                                                            "usd",
                                                            "canadiandollar",
                                                            "gbp",
                                                            "eur",
                                                            "swissfranc"
                                                        ],
                                                        "names": [
                                                            "Please select a value",
                                                            "Danish Krone",
                                                            "Swedish Krona",
                                                            "US Dollar",
                                                            "Canadian Dollar",
                                                            "Pound Sterling",
                                                            "Euro",
                                                            "Swiss Franc"
                                                        ]
                                                    }
                                                }]
                                            },
                                            ".csc-acquisition-acquisitionFundingValue": "${{row}.acquisitionFundingValue}",
                                            ".csc-acquisition-acquisitionFundingSource": {
                                                "value": "${{row}.acquisitionFundingSource}",
                                                "decorators": [{
                                                    "func": "cspace.util.urnToStringFieldConverter",
                                                    "type": "fluid"   
                                                }]
                                            },
                                            ".csc-acquisition-acquisitionFundingSourceProvisos": "${{row}.acquisitionFundingSourceProvisos}"
                                        },
                                        "type": "fluid.renderer.repeat",
                                        "pathAs": "row",
                                        "controlledBy": "fields.acquisitionFunding"
                                    }
                                },
                                "type": "fluid.noexpand"
                            }
                        },
                        "elPath": "fields.acquisitionFunding"
                    }
                }]
            },
            ".csc-acquisition-acquisition-reason": "${fields.acquisitionReason}",
            ".csc-acquisition-object-purchase-price-value": "${fields.objectPurchasePriceValue}",        
            ".csc-acquisition-acquisition-provisos": "${fields.acquisitionProvisos}",
            ".csc-acquisition-owner": {
                "decorators": [
                    {
                        "func": "cspace.makeRepeatable",
                        "type": "fluid",
                        "options": {
                            "elPath": "fields.owners",
                            "protoTree": {
                                "expander": {
                                    "tree": {
                                        "expander": {
                                            "repeatID": "repeat:",
                                            "tree": {
                                                ".csc-acquisition-owner": {
                                                    "value": "${{row}.owner}",
                                                    "decorators": [{
                                                        "func": "cspace.util.urnToStringFieldConverter",
                                                        "type": "fluid"   
                                                    }]
                                                }
                                            },
                                            "type": "fluid.renderer.repeat",
                                            "pathAs": "row",
                                            "controlledBy": "fields.owners"
                                        }
                                    },
                                    "type": "fluid.noexpand"
                                }
                            }
                        }
                    }
                ]
            },
            ".csc-acquisition-object-offer-price-value": "${fields.objectOfferPriceValue}",
            ".csc-acquisition-numberPatternChooser-reference-number": "${fields.acquisitionReferenceNumber}",
            ".csc-acquisition-object-offer-price-currency": {
                "value": "${fields.objectOfferPriceCurrency}", 
                "decorators": [{
                    "func": "cspace.util.nameForValueFinder",
                    "type": "fluid",
                    "options": {
                        "list": [
                            "",
                            "danishkrone",
                            "swedishkrona",
                            "usd",
                            "canadiandollar",
                            "gbp",
                            "eur",
                            "swissfranc"
                        ],
                        "names": [
                            "Please select a value",
                            "Danish Krone",
                            "Swedish Krona",
                            "US Dollar",
                            "Canadian Dollar",
                            "Pound Sterling",
                            "Euro",
                            "Swiss Franc"
                        ]
                    }
                }]
            },
            ".csc-acquisition-object-purchase-offer-price-currency": {
                "value": "${fields.objectPurchaseOfferPriceCurrency}", 
                "decorators": [{
                    "func": "cspace.util.nameForValueFinder",
                    "type": "fluid",
                    "options": {
                        "list": [
                            "",
                            "danishkrone",
                            "swedishkrona",
                            "usd",
                            "canadiandollar",
                            "gbp",
                            "eur",
                            "swissfranc"
                        ],
                        "names": [
                            "Please select a value",
                            "Danish Krone",
                            "Swedish Krona",
                            "US Dollar",
                            "Canadian Dollar",
                            "Pound Sterling",
                            "Euro",
                            "Swiss Franc"
                        ]
                    }
                }]
            },
            ".csc-object-identification-object-nametitle": "${fields.ownersource}",
            ".csc-acquisition-original-object-purchase-price-currency": {
                "value": "${fields.originalObjectPurchasePriceCurrency}", 
                "decorators": [{
                    "func": "cspace.util.nameForValueFinder",
                    "type": "fluid",
                    "options": {
                        "list": [
                            "",
                            "danishkrone",
                            "swedishkrona",
                            "usd",
                            "canadiandollar",
                            "gbp",
                            "eur",
                            "swissfranc"
                        ],
                        "names": [
                            "Please select a value",
                            "Danish Krone",
                            "Swedish Krona",
                            "US Dollar",
                            "Canadian Dollar",
                            "Pound Sterling",
                            "Euro",
                            "Swiss Franc"
                        ]
                    }
                }]
            },
            ".csc-acquisition-acquisition-method": {
                "value": "${fields.acquisitionMethod}", 
                "decorators": [{
                    "func": "cspace.util.nameForValueFinder",
                    "type": "fluid",
                    "options": {
                        "list": [
                            "gift",
                            "purchase",
                            "exchange",
                            "transfer",
                            "treasure"
                        ],
                        "names": [
                            "Gift",
                            "Purchase",
                            "Exchange",
                            "Transfer",
                            "Treasure"
                        ]
                    }
                }]
            },
            ".csc-acquisition-accession-date": "${fields.accessionDate}",
            ".csc-acquisition-acquisitionSource": {
                "decorators": [
                    {
                        "func": "cspace.makeRepeatable",
                        "type": "fluid",
                        "options": {
                            "elPath": "fields.acquisitionSources",
                            "protoTree": {
                                "expander": {
                                    "tree": {
                                        "expander": {
                                            "repeatID": "repeat:",
                                            "tree": {
                                                ".csc-acquisition-acquisitionSource": {
                                                    "value": "${{row}.acquisitionSource}",
                                                    "decorators": [{
                                                        "func": "cspace.util.urnToStringFieldConverter",
                                                        "type": "fluid"   
                                                    }]
                                                }
                                            },
                                            "type": "fluid.renderer.repeat",
                                            "pathAs": "row",
                                            "controlledBy": "fields.acquisitionSources"
                                        }
                                    },
                                    "type": "fluid.noexpand"
                                }
                            }
                        }
                    }
                ]
            },
            ".csc-acquisition-group-purchase-price-currency": {
                "value": "${fields.groupPurchasePriceCurrency}", 
                "decorators": [{
                    "func": "cspace.util.nameForValueFinder",
                    "type": "fluid",
                    "options": {
                        "list": [
                            "",
                            "danishkrone",
                            "swedishkrona",
                            "usd",
                            "canadiandollar",
                            "gbp",
                            "eur",
                            "swissfranc"
                        ],
                        "names": [
                            "Please select a value",
                            "Danish Krone",
                            "Swedish Krona",
                            "US Dollar",
                            "Canadian Dollar",
                            "Pound Sterling",
                            "Euro",
                            "Swiss Franc"
                        ]
                    }
                }]
            },
            ".csc-acquisition-group-purchase-price-value": "${fields.groupPurchasePriceValue}",
            ".csc-acquisition-acquisition-note": "${fields.acquisitionNote}",
            ".csc-acquisition-acquisitionAuthorizer": {
                "value": "${fields.acquisitionAuthorizer}",
                "decorators": [{
                    "func": "cspace.util.urnToStringFieldConverter",
                    "type": "fluid"   
                }]
            },
            ".csc-acquisition-acquisitionAuthorizerDate": "${fields.acquisitionAuthorizerDate}",
            ".csc-acquisition-object-purchase-offer-price-value": "${fields.objectPurchaseOfferPriceValue}",
            ".csc-acquisition-transfer-of-title-number": "${fields.transferOfTitleNumber}",
            ".csc-acquisition-acquisitionDates": {
                "decorators": [
                    {
                        "func": "cspace.makeRepeatable",
                        "type": "fluid",
                        "options": {
                            "elPath": "fields.acquisitionDates",
                            "protoTree": {
                                "expander": {
                                    "tree": {
                                        "expander": {
                                            "repeatID": "repeat:",
                                            "tree": {
                                                ".csc-acquisition-date": "${{row}.acquisitionDate}"
                                            },
                                            "type": "fluid.renderer.repeat",
                                            "pathAs": "row",
                                            "controlledBy": "fields.acquisitionDates"
                                        }
                                    },
                                    "type": "fluid.noexpand"
                                }
                            }
                        }
                    }
                ]
            },
            ".csc-acquisition-fieldCollectionEventName": {
                "decorators": [
                    {
                        "func": "cspace.makeRepeatable",
                        "type": "fluid",
                        "options": {
                            "elPath": "fields.fieldCollectionEventNames",
                            "protoTree": {
                                "expander": {
                                    "tree": {
                                        "expander": {
                                            "repeatID": "repeat:",
                                            "tree": {
                                                ".csc-acquisition-fieldCollectionEventName": "${{row}.fieldCollectionEventName}"
                                            },
                                            "type": "fluid.renderer.repeat",
                                            "pathAs": "row",
                                            "controlledBy": "fields.fieldCollectionEventNames"
                                        }
                                    },
                                    "type": "fluid.noexpand"
                                }
                            }
                        }
                    }
                ]
            }
        },
    }
    
    var utilitiesTest = new jqUnit.TestCase("Utilities Tests", function () {
        cspace.util.isTest = true;
        uispec = {
            recordEditor: {}
        };        
        expectedBase = {            
            fields: {                
                otherNumbers: []
            }
        };
        schema = {
            "fields": {
                "type": "object",
                "properties": {
                    "role": {
                        "type": "object",
                        "properties": {
                            "account": {
                                "type": "object"
                            },
                            "role": {
                                "type": "array",
                                "default": [{
                                    "roleName": "ROLE_ADMINISTRATOR",
                                    "roleId": "1",
                                    "roleGroup": "Museum staff",
                                    "roleAssigned": true
                                }]
                            }
                        }
                    }
                }
            }
        };
    });
    
    var setExpectedSchemaBasedModel = function () {
        expectedBase.fields = {
            role: {
                account: {},
                role: [{
                    "roleName": "ROLE_ADMINISTRATOR",
                    "roleId": "1",
                    "roleGroup": "Museum staff",
                    "roleAssigned": true
                }]
            }
        };
    };
    
    var perms = {
        "person": ["create", "read", "update", "delete", "list"],
        "loanout": ["create", "read", "update", "delete", "list"],
        "loanin": ["read", "list"],
        "acquisition": [],
        "organization": ["create", "read", "update", "delete", "list"],
        "movement": ["create", "read", "update", "delete", "list"],
        "objectexit": ["create", "read", "update", "delete", "list"],
        "objects": ["create", "read", "update", "delete", "list"]
    };
    
    utilitiesTest.test("Full model from schema with getBeanValue", function () {        
        setExpectedSchemaBasedModel();
        var model = cspace.util.getBeanValue({}, "new", {
            "new": {
                type: "object",
                properties: schema
            }
        });
        jqUnit.assertDeepEq("Given a schema, model is build with proper structure and defaults", 
            expectedBase, model);
    });
    
    utilitiesTest.test("Model from schema with getBeanValue", function () {        
        setExpectedSchemaBasedModel();
        var model = cspace.util.getBeanValue({}, "fields", schema);
        jqUnit.assertDeepEq("Given a schema, model is build with proper structure and defaults", 
            expectedBase.fields, model);
    });
    
    utilitiesTest.test("Model from schema with getBeanValue empty array", function () {        
        setExpectedSchemaBasedModel();
        schema.fields.properties.role.properties.role = {
            type: "array"
        };
        expectedBase.fields.role.role = [];
        var model = cspace.util.getBeanValue({}, "fields", schema);
        jqUnit.assertDeepEq("Given a schema, model is build with proper structure and defaults", 
            expectedBase.fields, model);
    });
    
    utilitiesTest.test("Model from schema with getBeanValue with nesting", function () {
        schema.fields.properties.role.properties.newRoleArray = {
            type: "array",
            items: {
                type: "object",
                properties: {
                    nestedRole: {
                        type: "array",
                        "default": [{
                            roleName: "ROLE_ADMINISTRATOR",
                            roleId: "1",
                            roleGroup: "Museum staff",
                            roleAssigned: true
                        }]
                    }
                }
            }
        };
        setExpectedSchemaBasedModel();
        expectedBase.fields.role.newRoleArray = [{
            nestedRole: [{
                roleName: "ROLE_ADMINISTRATOR",
                roleId: "1",
                roleGroup: "Museum staff",
                roleAssigned: true
            }]
        }];
        var model = cspace.util.getBeanValue({}, "fields", schema);
        jqUnit.assertDeepEq("Given a schema, model is build with proper structure and defaults", 
            expectedBase.fields, model);
    });
    
    utilitiesTest.test("Create a model from schema with simple defaults", function () {
        schema.fields.properties.newProperty = {
            type: "string",
            "default": "This is a default"
        };
        setExpectedSchemaBasedModel();        
        expectedBase.fields.newProperty = "This is a default";
        var model = cspace.util.getBeanValue({}, "fields", schema);
        jqUnit.assertDeepEq("Given a schema, model is build with proper structure and defaults", 
            expectedBase.fields, model);
    });
    
    utilitiesTest.test("Get a model with schema and existing model", function () {
        var model = {
            fields: {
                role: {
                    role: []
                }
            }
        }; 
        var fields = cspace.util.getBeanValue(model, "fields", schema);
        jqUnit.assertDeepEq("Given a schema, model is build with proper structure and defaults", 
            model.fields, fields);
    });
    
    utilitiesTest.test("Create a model from schema with string fields", function () {
        schema.fields.properties.newProperty = {
            type: "string"
        };
        schema.fields.properties.newPropertyWithDefault = {
            type: "string",
            "default": "blabla"
        };
        setExpectedSchemaBasedModel();
        expectedBase.fields.newPropertyWithDefault = "blabla";
        var model = cspace.util.getBeanValue({}, "fields", schema);
        jqUnit.assertDeepEq("Given a schema, model is build with proper structure and defaults", 
            expectedBase.fields, model);
    });
    
    utilitiesTest.test("GetBeanValue inside the default in schema", function () {        
        setExpectedSchemaBasedModel();
        schema.fields.properties.role["default"] = {
            role: [{
                roleId: 1
            }]
        };
        var roleId = cspace.util.getBeanValue({}, "fields.role.role.0.roleId", schema);
        jqUnit.assertEquals("The correct value should be drawn from default", 1, roleId);
    });
    
    utilitiesTest.test("cspace.util.buildUrl", function () {        
        var args = [[
            "fetch", "base", "someType", "123", ""
        ], [
            "fetch", "base/", "someType", "123", ""
        ], [
            "fetch", "base/", "someType", "123", ".json"
        ], [
            "fetch", "base/", "someType"
        ], [
            "addRelations", "base/"
        ], [
            "addRelations", "base/", "ignore_stuff"
        ]];
        var expected = [
            "base/someType/123",
            "base/someType/123",
            "base/someType/123.json",
            "base/someType/",
            "base/relationships/",
            "base/relationships/"
        ];
        for (var i in args) {
            jqUnit.assertEquals("Built url value is equal to the expected", 
                expected[i], cspace.util.buildUrl.apply(null, args[i]));
        }
    });

    utilitiesTest.test("cspace.util.UISpecToReadOnly Movement", function() {
        //expect(1);
        fluid.fetchResources({ 
            uispecs: {
                href: "../../main/webapp/html/uispecs/movement/uispec.json",
                options: {
                    dataType: "json"
                }               
            }
         }, function (fetched) {
             var convertedUISpec = cspace.util.resolveReadOnlyUISpec(fetched.uispecs.resourceText.recordEditor, true);
             jqUnit.assertDeepEq("Checking whether converted UISpec looks as expected", readOnlyMovementSpec.recordEditor, convertedUISpec);
             start();
         });
         stop();
    });
    
    
    utilitiesTest.test("cspace.util.UISpecToReadOnly Acquisition", function() {
        //expect(1);
        fluid.fetchResources({ 
            uispecs: {
                href: "../../main/webapp/html/uispecs/acquisition/uispec.json",
                options: {
                    dataType: "json"
                }               
            }
         }, function (fetched) {
             var convertedUISpec = cspace.util.resolveReadOnlyUISpec(fetched.uispecs.resourceText.recordEditor, true);
             jqUnit.assertDeepEq("Checking whether converted UISpec looks as expected", readOnlyAcquisitionSpec.recordEditor, convertedUISpec);
             start();
         });
         stop();
    });
        
    utilitiesTest.test("cspace.util.getDefaultSchemaURL", function () {
        cspace.util.getDefaultSchemaURL("intake");
        jqUnit.assertEquals("Default URL should be", "../../main/webapp/html/uischema/intake.json", 
            fluid.invoke("cspace.util.getDefaultSchemaURL", "intake"));
    });
    
    utilitiesTest.test("cspace.util.urnToStringFieldConverter", function () {
        var selector = ".urnToStringTest";
        cspace.util.urnToStringFieldConverter(selector);
        jqUnit.assertEquals("Deurned text should be", "The Big Lebowsky", $(selector).text());
    });
    
    utilitiesTest.test("cspace.util.nameForValueFinder", function () {
        var selector = ".nameForValueFinderTest";
        cspace.util.nameForValueFinder(selector, {
            list: ["foo", "test"],
            names: ["FOO NAME", "TEST NAME"]
        });
        jqUnit.assertEquals("Value should be converted to the following text", "TEST NAME", $(selector).text());
    });
};

(function () {
    utilitiesTester(jQuery);
}());