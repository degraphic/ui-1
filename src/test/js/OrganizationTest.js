/*
Copyright 2010 University of Toronto

Licensed under the Educational Community License (ECL), Version 2.0. 
You may not use this file except in compliance with this License.

You may obtain a copy of the ECL 2.0 License at
https://source.collectionspace.org/collection-space/LICENSE.txt
*/

/*global jqUnit, jQuery, cspace, start, stop*/
"use strict";

(function ($) {
    
    var pageBuilder;

    var organizationTests = new jqUnit.TestCase("Organization Tests", function () {
        cspace.util.isTest = true;
        organizationTests.fetchTemplate("../../main/webapp/html/organization.html", ".fl-container-1024");
    });
    
    var setupOrganization = function (options) {
        options = $.extend(true, {
            configURL: "../../main/webapp/html/config/organization.json",
            pageBuilder: {
                options: {
                    uispecUrl: "../../main/webapp/html/uispecs/organization/uispec.json",
                    pageSpec: {
                        header: {
                            href: "../../main/webapp/html/header.html"
                        },
                        tabs: {
                            href: "../../main/webapp/html/tabsTemplate.html"
                        },
                        titleBar: {
                            href: "../../main/webapp/html/organizationTitleBar.html"
                        },
                        recordEditor: {
                            href: "../../main/webapp/html/organizationTemplate.html"
                        },
                        sidebar: {
                            href: "../../main/webapp/html/right-sidebar.html"
                        },
                        footer: {
                            href: "../../main/webapp/html/footer.html"
                        }
                    }
                }
            },
            depOpts: {
                sidebar: {
                    options: {
                        relatedRecordsList: {
                            options: {
                                relationManager: {
                                    options: {
                                        searchToRelateDialog: {
                                            options: {
                                                templates: {
                                                    dialog: "../../main/webapp/html/searchToRelate.html"
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                recordEditor: {
                    options: {
                        confirmation: {
                            options: {
                                confirmationTemplateUrl: "../../main/webapp/html/Confirmation.html"
                            }
                        }
                    }
                }
            }
        }, options);
        pageBuilder = cspace.recordSetup(options, "../../main/webapp/html/config/organization.json").pageBuilder;
    };
    
    organizationTests.test("Initialization", function () {
        var options = {
            pageBuilder: {
                options: {
                    listeners: {
                        pageReady: function () {
                            jqUnit.assertValue("Organization should have a record editor", pageBuilder.components.recordEditor);
                            jqUnit.assertValue("Organization should have a side bar", pageBuilder.components.sidebar);
                            jqUnit.assertValue("Organization should have a title bar", pageBuilder.components.titleBar);
                            jqUnit.assertValue("Organization should have tabs", pageBuilder.components.tabs);
                            start();
                        }
                    }
                }
            }
        };
        setupOrganization(options);
        stop();
    });

    organizationTests.test("Repeatable fields: existence", function () {
        var options = {
            pageBuilder: {
                options: {
                    csid: "987.654.321",
                    dataContext: {
                        options: {
                            baseUrl: "../../main/webapp/html/data"
                        }
                    }
                }
            },
            depOpts: {
                recordEditor: {
                    options: {
                        listeners: {
                            afterRender: function () {
                                jqUnit.assertEquals("The Group field is repeatable, and has the correct number of entries", 
                                    2, $(".csc-organization-groups").length);
                                jqUnit.assertEquals("The Function field is repeatable, and has the correct number of entries", 
                                    1, $(".csc-organization-functions").length);
                                start();
                            }
                        }
                    }
                }
            }
        };
        setupOrganization(options);
        stop();        
    });    
}(jQuery));

