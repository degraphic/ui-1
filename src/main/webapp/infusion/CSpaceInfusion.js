if(!this.JSON){JSON=function(){function f(n){return n<10?"0"+n:n}Date.prototype.toJSON=function(){return this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z"};var m={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"};function stringify(value,whitelist){var a,i,k,l,r=/["\\\x00-\x1f\x7f-\x9f]/g,v;switch(typeof value){case"string":return r.test(value)?'"'+value.replace(r,function(a){var c=m[a];if(c){return c}c=a.charCodeAt();return"\\u00"+Math.floor(c/16).toString(16)+(c%16).toString(16)})+'"':'"'+value+'"';case"number":return isFinite(value)?String(value):"null";case"boolean":case"null":return String(value);case"object":if(!value){return"null"}if(typeof value.toJSON==="function"){return stringify(value.toJSON())}a=[];if(typeof value.length==="number"&&!(value.propertyIsEnumerable("length"))){l=value.length;for(i=0;i<l;i+=1){a.push(stringify(value[i],whitelist)||"null")}return"["+a.join(",")+"]"}if(whitelist){l=whitelist.length;for(i=0;i<l;i+=1){k=whitelist[i];if(typeof k==="string"){v=stringify(value[k],whitelist);if(v){a.push(stringify(k)+":"+v)}}}}else{for(k in value){if(typeof k==="string"){v=stringify(value[k],whitelist);if(v){a.push(stringify(k)+":"+v)}}}}return"{"+a.join(",")+"}"}}return{stringify:stringify,parse:function(text,filter){var j;function walk(k,v){var i,n;if(v&&typeof v==="object"){for(i in v){if(Object.prototype.hasOwnProperty.apply(v,[i])){n=walk(i,v[i]);if(n!==undefined){v[i]=n}}}}return filter(k,v)}if(/^[\],:{}\s]*$/.test(text.replace(/\\./g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(:?[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");return typeof filter==="function"?walk("",j):j}throw new SyntaxError("parseJSON")}}}()};/*
 * jQuery JavaScript Library v1.4.2
 * http://jquery.com/
 *
 * Copyright 2010, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 * Copyright 2010, The Dojo Foundation
 * Released under the MIT, BSD, and GPL Licenses.
 *
 * Date: Sat Feb 13 22:33:48 2010 -0500
 */
(function(window,undefined){var jQuery=function(selector,context){return new jQuery.fn.init(selector,context)},_jQuery=window.jQuery,_$=window.$,document=window.document,rootjQuery,quickExpr=/^[^<]*(<[\w\W]+>)[^>]*$|^#([\w-]+)$/,isSimple=/^.[^:#\[\.,]*$/,rnotwhite=/\S/,rtrim=/^(\s|\u00A0)+|(\s|\u00A0)+$/g,rsingleTag=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,userAgent=navigator.userAgent,browserMatch,readyBound=false,readyList=[],DOMContentLoaded,toString=Object.prototype.toString,hasOwnProperty=Object.prototype.hasOwnProperty,push=Array.prototype.push,slice=Array.prototype.slice,indexOf=Array.prototype.indexOf;jQuery.fn=jQuery.prototype={init:function(selector,context){var match,elem,ret,doc;if(!selector){return this}if(selector.nodeType){this.context=this[0]=selector;this.length=1;return this}if(selector==="body"&&!context){this.context=document;this[0]=document.body;this.selector="body";this.length=1;return this}if(typeof selector==="string"){match=quickExpr.exec(selector);if(match&&(match[1]||!context)){if(match[1]){doc=(context?context.ownerDocument||context:document);ret=rsingleTag.exec(selector);if(ret){if(jQuery.isPlainObject(context)){selector=[document.createElement(ret[1])];jQuery.fn.attr.call(selector,context,true)}else{selector=[doc.createElement(ret[1])]}}else{ret=buildFragment([match[1]],[doc]);selector=(ret.cacheable?ret.fragment.cloneNode(true):ret.fragment).childNodes}return jQuery.merge(this,selector)}else{elem=document.getElementById(match[2]);if(elem){if(elem.id!==match[2]){return rootjQuery.find(selector)}this.length=1;this[0]=elem}this.context=document;this.selector=selector;return this}}else{if(!context&&/^\w+$/.test(selector)){this.selector=selector;this.context=document;selector=document.getElementsByTagName(selector);return jQuery.merge(this,selector)}else{if(!context||context.jquery){return(context||rootjQuery).find(selector)}else{return jQuery(context).find(selector)}}}}else{if(jQuery.isFunction(selector)){return rootjQuery.ready(selector)}}if(selector.selector!==undefined){this.selector=selector.selector;this.context=selector.context}return jQuery.makeArray(selector,this)},selector:"",jquery:"1.4.2",length:0,size:function(){return this.length},toArray:function(){return slice.call(this,0)},get:function(num){return num==null?this.toArray():(num<0?this.slice(num)[0]:this[num])},pushStack:function(elems,name,selector){var ret=jQuery();if(jQuery.isArray(elems)){push.apply(ret,elems)}else{jQuery.merge(ret,elems)}ret.prevObject=this;ret.context=this.context;if(name==="find"){ret.selector=this.selector+(this.selector?" ":"")+selector}else{if(name){ret.selector=this.selector+"."+name+"("+selector+")"}}return ret},each:function(callback,args){return jQuery.each(this,callback,args)},ready:function(fn){jQuery.bindReady();if(jQuery.isReady){fn.call(document,jQuery)}else{if(readyList){readyList.push(fn)}}return this},eq:function(i){return i===-1?this.slice(i):this.slice(i,+i+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(slice.apply(this,arguments),"slice",slice.call(arguments).join(","))},map:function(callback){return this.pushStack(jQuery.map(this,function(elem,i){return callback.call(elem,i,elem)}))},end:function(){return this.prevObject||jQuery(null)},push:push,sort:[].sort,splice:[].splice};jQuery.fn.init.prototype=jQuery.fn;jQuery.extend=jQuery.fn.extend=function(){var target=arguments[0]||{},i=1,length=arguments.length,deep=false,options,name,src,copy;if(typeof target==="boolean"){deep=target;target=arguments[1]||{};i=2}if(typeof target!=="object"&&!jQuery.isFunction(target)){target={}}if(length===i){target=this;--i}for(;i<length;i++){if((options=arguments[i])!=null){for(name in options){src=target[name];copy=options[name];if(target===copy){continue}if(deep&&copy&&(jQuery.isPlainObject(copy)||jQuery.isArray(copy))){var clone=src&&(jQuery.isPlainObject(src)||jQuery.isArray(src))?src:jQuery.isArray(copy)?[]:{};target[name]=jQuery.extend(deep,clone,copy)}else{if(copy!==undefined){target[name]=copy}}}}}return target};jQuery.extend({noConflict:function(deep){window.$=_$;if(deep){window.jQuery=_jQuery}return jQuery},isReady:false,ready:function(){if(!jQuery.isReady){if(!document.body){return setTimeout(jQuery.ready,13)}jQuery.isReady=true;if(readyList){var fn,i=0;while((fn=readyList[i++])){fn.call(document,jQuery)}readyList=null}if(jQuery.fn.triggerHandler){jQuery(document).triggerHandler("ready")}}},bindReady:function(){if(readyBound){return }readyBound=true;if(document.readyState==="complete"){return jQuery.ready()}if(document.addEventListener){document.addEventListener("DOMContentLoaded",DOMContentLoaded,false);window.addEventListener("load",jQuery.ready,false)}else{if(document.attachEvent){document.attachEvent("onreadystatechange",DOMContentLoaded);window.attachEvent("onload",jQuery.ready);var toplevel=false;try{toplevel=window.frameElement==null}catch(e){}if(document.documentElement.doScroll&&toplevel){doScrollCheck()}}}},isFunction:function(obj){return toString.call(obj)==="[object Function]"},isArray:function(obj){return toString.call(obj)==="[object Array]"},isPlainObject:function(obj){if(!obj||toString.call(obj)!=="[object Object]"||obj.nodeType||obj.setInterval){return false}if(obj.constructor&&!hasOwnProperty.call(obj,"constructor")&&!hasOwnProperty.call(obj.constructor.prototype,"isPrototypeOf")){return false}var key;for(key in obj){}return key===undefined||hasOwnProperty.call(obj,key)},isEmptyObject:function(obj){for(var name in obj){return false}return true},error:function(msg){throw msg},parseJSON:function(data){if(typeof data!=="string"||!data){return null}data=jQuery.trim(data);if(/^[\],:{}\s]*$/.test(data.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){return window.JSON&&window.JSON.parse?window.JSON.parse(data):(new Function("return "+data))()}else{jQuery.error("Invalid JSON: "+data)}},noop:function(){},globalEval:function(data){if(data&&rnotwhite.test(data)){var head=document.getElementsByTagName("head")[0]||document.documentElement,script=document.createElement("script");script.type="text/javascript";if(jQuery.support.scriptEval){script.appendChild(document.createTextNode(data))}else{script.text=data}head.insertBefore(script,head.firstChild);head.removeChild(script)}},nodeName:function(elem,name){return elem.nodeName&&elem.nodeName.toUpperCase()===name.toUpperCase()},each:function(object,callback,args){var name,i=0,length=object.length,isObj=length===undefined||jQuery.isFunction(object);if(args){if(isObj){for(name in object){if(callback.apply(object[name],args)===false){break}}}else{for(;i<length;){if(callback.apply(object[i++],args)===false){break}}}}else{if(isObj){for(name in object){if(callback.call(object[name],name,object[name])===false){break}}}else{for(var value=object[0];i<length&&callback.call(value,i,value)!==false;value=object[++i]){}}}return object},trim:function(text){return(text||"").replace(rtrim,"")},makeArray:function(array,results){var ret=results||[];if(array!=null){if(array.length==null||typeof array==="string"||jQuery.isFunction(array)||(typeof array!=="function"&&array.setInterval)){push.call(ret,array)}else{jQuery.merge(ret,array)}}return ret},inArray:function(elem,array){if(array.indexOf){return array.indexOf(elem)}for(var i=0,length=array.length;i<length;i++){if(array[i]===elem){return i}}return -1},merge:function(first,second){var i=first.length,j=0;if(typeof second.length==="number"){for(var l=second.length;j<l;j++){first[i++]=second[j]}}else{while(second[j]!==undefined){first[i++]=second[j++]}}first.length=i;return first},grep:function(elems,callback,inv){var ret=[];for(var i=0,length=elems.length;i<length;i++){if(!inv!==!callback(elems[i],i)){ret.push(elems[i])}}return ret},map:function(elems,callback,arg){var ret=[],value;for(var i=0,length=elems.length;i<length;i++){value=callback(elems[i],i,arg);if(value!=null){ret[ret.length]=value}}return ret.concat.apply([],ret)},guid:1,proxy:function(fn,proxy,thisObject){if(arguments.length===2){if(typeof proxy==="string"){thisObject=fn;fn=thisObject[proxy];proxy=undefined}else{if(proxy&&!jQuery.isFunction(proxy)){thisObject=proxy;proxy=undefined}}}if(!proxy&&fn){proxy=function(){return fn.apply(thisObject||this,arguments)}}if(fn){proxy.guid=fn.guid=fn.guid||proxy.guid||jQuery.guid++}return proxy},uaMatch:function(ua){ua=ua.toLowerCase();var match=/(webkit)[ \/]([\w.]+)/.exec(ua)||/(opera)(?:.*version)?[ \/]([\w.]+)/.exec(ua)||/(msie) ([\w.]+)/.exec(ua)||!/compatible/.test(ua)&&/(mozilla)(?:.*? rv:([\w.]+))?/.exec(ua)||[];return{browser:match[1]||"",version:match[2]||"0"}},browser:{}});browserMatch=jQuery.uaMatch(userAgent);if(browserMatch.browser){jQuery.browser[browserMatch.browser]=true;jQuery.browser.version=browserMatch.version}if(jQuery.browser.webkit){jQuery.browser.safari=true}if(indexOf){jQuery.inArray=function(elem,array){return indexOf.call(array,elem)}}rootjQuery=jQuery(document);if(document.addEventListener){DOMContentLoaded=function(){document.removeEventListener("DOMContentLoaded",DOMContentLoaded,false);jQuery.ready()}}else{if(document.attachEvent){DOMContentLoaded=function(){if(document.readyState==="complete"){document.detachEvent("onreadystatechange",DOMContentLoaded);jQuery.ready()}}}}function doScrollCheck(){if(jQuery.isReady){return }try{document.documentElement.doScroll("left")}catch(error){setTimeout(doScrollCheck,1);return }jQuery.ready()}function evalScript(i,elem){if(elem.src){jQuery.ajax({url:elem.src,async:false,dataType:"script"})}else{jQuery.globalEval(elem.text||elem.textContent||elem.innerHTML||"")}if(elem.parentNode){elem.parentNode.removeChild(elem)}}function access(elems,key,value,exec,fn,pass){var length=elems.length;if(typeof key==="object"){for(var k in key){access(elems,k,key[k],exec,fn,value)}return elems}if(value!==undefined){exec=!pass&&exec&&jQuery.isFunction(value);for(var i=0;i<length;i++){fn(elems[i],key,exec?value.call(elems[i],i,fn(elems[i],key)):value,pass)}return elems}return length?fn(elems[0],key):undefined}function now(){return(new Date).getTime()}(function(){jQuery.support={};var root=document.documentElement,script=document.createElement("script"),div=document.createElement("div"),id="script"+now();div.style.display="none";div.innerHTML="   <link/><table></table><a href='/a' style='color:red;float:left;opacity:.55;'>a</a><input type='checkbox'/>";var all=div.getElementsByTagName("*"),a=div.getElementsByTagName("a")[0];if(!all||!all.length||!a){return }jQuery.support={leadingWhitespace:div.firstChild.nodeType===3,tbody:!div.getElementsByTagName("tbody").length,htmlSerialize:!!div.getElementsByTagName("link").length,style:/red/.test(a.getAttribute("style")),hrefNormalized:a.getAttribute("href")==="/a",opacity:/^0.55$/.test(a.style.opacity),cssFloat:!!a.style.cssFloat,checkOn:div.getElementsByTagName("input")[0].value==="on",optSelected:document.createElement("select").appendChild(document.createElement("option")).selected,parentNode:div.removeChild(div.appendChild(document.createElement("div"))).parentNode===null,deleteExpando:true,checkClone:false,scriptEval:false,noCloneEvent:true,boxModel:null};script.type="text/javascript";try{script.appendChild(document.createTextNode("window."+id+"=1;"))}catch(e){}root.insertBefore(script,root.firstChild);if(window[id]){jQuery.support.scriptEval=true;delete window[id]}try{delete script.test}catch(e){jQuery.support.deleteExpando=false}root.removeChild(script);if(div.attachEvent&&div.fireEvent){div.attachEvent("onclick",function click(){jQuery.support.noCloneEvent=false;div.detachEvent("onclick",click)});div.cloneNode(true).fireEvent("onclick")}div=document.createElement("div");div.innerHTML="<input type='radio' name='radiotest' checked='checked'/>";var fragment=document.createDocumentFragment();fragment.appendChild(div.firstChild);jQuery.support.checkClone=fragment.cloneNode(true).cloneNode(true).lastChild.checked;jQuery(function(){var div=document.createElement("div");div.style.width=div.style.paddingLeft="1px";document.body.appendChild(div);jQuery.boxModel=jQuery.support.boxModel=div.offsetWidth===2;document.body.removeChild(div).style.display="none";div=null});var eventSupported=function(eventName){var el=document.createElement("div");eventName="on"+eventName;var isSupported=(eventName in el);if(!isSupported){el.setAttribute(eventName,"return;");isSupported=typeof el[eventName]==="function"}el=null;return isSupported};jQuery.support.submitBubbles=eventSupported("submit");jQuery.support.changeBubbles=eventSupported("change");root=script=div=all=a=null})();jQuery.props={"for":"htmlFor","class":"className",readonly:"readOnly",maxlength:"maxLength",cellspacing:"cellSpacing",rowspan:"rowSpan",colspan:"colSpan",tabindex:"tabIndex",usemap:"useMap",frameborder:"frameBorder"};var expando="jQuery"+now(),uuid=0,windowData={};jQuery.extend({cache:{},expando:expando,noData:{embed:true,object:true,applet:true},data:function(elem,name,data){if(elem.nodeName&&jQuery.noData[elem.nodeName.toLowerCase()]){return }elem=elem==window?windowData:elem;var id=elem[expando],cache=jQuery.cache,thisCache;if(!id&&typeof name==="string"&&data===undefined){return null}if(!id){id=++uuid}if(typeof name==="object"){elem[expando]=id;thisCache=cache[id]=jQuery.extend(true,{},name)}else{if(!cache[id]){elem[expando]=id;cache[id]={}}}thisCache=cache[id];if(data!==undefined){thisCache[name]=data}return typeof name==="string"?thisCache[name]:thisCache},removeData:function(elem,name){if(elem.nodeName&&jQuery.noData[elem.nodeName.toLowerCase()]){return }elem=elem==window?windowData:elem;var id=elem[expando],cache=jQuery.cache,thisCache=cache[id];if(name){if(thisCache){delete thisCache[name];if(jQuery.isEmptyObject(thisCache)){jQuery.removeData(elem)}}}else{if(jQuery.support.deleteExpando){delete elem[jQuery.expando]}else{if(elem.removeAttribute){elem.removeAttribute(jQuery.expando)}}delete cache[id]}}});jQuery.fn.extend({data:function(key,value){if(typeof key==="undefined"&&this.length){return jQuery.data(this[0])}else{if(typeof key==="object"){return this.each(function(){jQuery.data(this,key)})}}var parts=key.split(".");parts[1]=parts[1]?"."+parts[1]:"";if(value===undefined){var data=this.triggerHandler("getData"+parts[1]+"!",[parts[0]]);if(data===undefined&&this.length){data=jQuery.data(this[0],key)}return data===undefined&&parts[1]?this.data(parts[0]):data}else{return this.trigger("setData"+parts[1]+"!",[parts[0],value]).each(function(){jQuery.data(this,key,value)})}},removeData:function(key){return this.each(function(){jQuery.removeData(this,key)})}});jQuery.extend({queue:function(elem,type,data){if(!elem){return }type=(type||"fx")+"queue";var q=jQuery.data(elem,type);if(!data){return q||[]}if(!q||jQuery.isArray(data)){q=jQuery.data(elem,type,jQuery.makeArray(data))}else{q.push(data)}return q},dequeue:function(elem,type){type=type||"fx";var queue=jQuery.queue(elem,type),fn=queue.shift();if(fn==="inprogress"){fn=queue.shift()}if(fn){if(type==="fx"){queue.unshift("inprogress")}fn.call(elem,function(){jQuery.dequeue(elem,type)})}}});jQuery.fn.extend({queue:function(type,data){if(typeof type!=="string"){data=type;type="fx"}if(data===undefined){return jQuery.queue(this[0],type)}return this.each(function(i,elem){var queue=jQuery.queue(this,type,data);if(type==="fx"&&queue[0]!=="inprogress"){jQuery.dequeue(this,type)}})},dequeue:function(type){return this.each(function(){jQuery.dequeue(this,type)})},delay:function(time,type){time=jQuery.fx?jQuery.fx.speeds[time]||time:time;type=type||"fx";return this.queue(type,function(){var elem=this;setTimeout(function(){jQuery.dequeue(elem,type)},time)})},clearQueue:function(type){return this.queue(type||"fx",[])}});var rclass=/[\n\t]/g,rspace=/\s+/,rreturn=/\r/g,rspecialurl=/href|src|style/,rtype=/(button|input)/i,rfocusable=/(button|input|object|select|textarea)/i,rclickable=/^(a|area)$/i,rradiocheck=/radio|checkbox/;jQuery.fn.extend({attr:function(name,value){return access(this,name,value,true,jQuery.attr)},removeAttr:function(name,fn){return this.each(function(){jQuery.attr(this,name,"");if(this.nodeType===1){this.removeAttribute(name)}})},addClass:function(value){if(jQuery.isFunction(value)){return this.each(function(i){var self=jQuery(this);self.addClass(value.call(this,i,self.attr("class")))})}if(value&&typeof value==="string"){var classNames=(value||"").split(rspace);for(var i=0,l=this.length;i<l;i++){var elem=this[i];if(elem.nodeType===1){if(!elem.className){elem.className=value}else{var className=" "+elem.className+" ",setClass=elem.className;for(var c=0,cl=classNames.length;c<cl;c++){if(className.indexOf(" "+classNames[c]+" ")<0){setClass+=" "+classNames[c]}}elem.className=jQuery.trim(setClass)}}}}return this},removeClass:function(value){if(jQuery.isFunction(value)){return this.each(function(i){var self=jQuery(this);self.removeClass(value.call(this,i,self.attr("class")))})}if((value&&typeof value==="string")||value===undefined){var classNames=(value||"").split(rspace);for(var i=0,l=this.length;i<l;i++){var elem=this[i];if(elem.nodeType===1&&elem.className){if(value){var className=(" "+elem.className+" ").replace(rclass," ");for(var c=0,cl=classNames.length;c<cl;c++){className=className.replace(" "+classNames[c]+" "," ")}elem.className=jQuery.trim(className)}else{elem.className=""}}}}return this},toggleClass:function(value,stateVal){var type=typeof value,isBool=typeof stateVal==="boolean";if(jQuery.isFunction(value)){return this.each(function(i){var self=jQuery(this);self.toggleClass(value.call(this,i,self.attr("class"),stateVal),stateVal)})}return this.each(function(){if(type==="string"){var className,i=0,self=jQuery(this),state=stateVal,classNames=value.split(rspace);while((className=classNames[i++])){state=isBool?state:!self.hasClass(className);self[state?"addClass":"removeClass"](className)}}else{if(type==="undefined"||type==="boolean"){if(this.className){jQuery.data(this,"__className__",this.className)}this.className=this.className||value===false?"":jQuery.data(this,"__className__")||""}}})},hasClass:function(selector){var className=" "+selector+" ";for(var i=0,l=this.length;i<l;i++){if((" "+this[i].className+" ").replace(rclass," ").indexOf(className)>-1){return true}}return false},val:function(value){if(value===undefined){var elem=this[0];if(elem){if(jQuery.nodeName(elem,"option")){return(elem.attributes.value||{}).specified?elem.value:elem.text}if(jQuery.nodeName(elem,"select")){var index=elem.selectedIndex,values=[],options=elem.options,one=elem.type==="select-one";if(index<0){return null}for(var i=one?index:0,max=one?index+1:options.length;i<max;i++){var option=options[i];if(option.selected){value=jQuery(option).val();if(one){return value}values.push(value)}}return values}if(rradiocheck.test(elem.type)&&!jQuery.support.checkOn){return elem.getAttribute("value")===null?"on":elem.value}return(elem.value||"").replace(rreturn,"")}return undefined}var isFunction=jQuery.isFunction(value);return this.each(function(i){var self=jQuery(this),val=value;if(this.nodeType!==1){return }if(isFunction){val=value.call(this,i,self.val())}if(typeof val==="number"){val+=""}if(jQuery.isArray(val)&&rradiocheck.test(this.type)){this.checked=jQuery.inArray(self.val(),val)>=0}else{if(jQuery.nodeName(this,"select")){var values=jQuery.makeArray(val);jQuery("option",this).each(function(){this.selected=jQuery.inArray(jQuery(this).val(),values)>=0});if(!values.length){this.selectedIndex=-1}}else{this.value=val}}})}});jQuery.extend({attrFn:{val:true,css:true,html:true,text:true,data:true,width:true,height:true,offset:true},attr:function(elem,name,value,pass){if(!elem||elem.nodeType===3||elem.nodeType===8){return undefined}if(pass&&name in jQuery.attrFn){return jQuery(elem)[name](value)}var notxml=elem.nodeType!==1||!jQuery.isXMLDoc(elem),set=value!==undefined;name=notxml&&jQuery.props[name]||name;if(elem.nodeType===1){var special=rspecialurl.test(name);if(name==="selected"&&!jQuery.support.optSelected){var parent=elem.parentNode;if(parent){parent.selectedIndex;if(parent.parentNode){parent.parentNode.selectedIndex}}}if(name in elem&&notxml&&!special){if(set){if(name==="type"&&rtype.test(elem.nodeName)&&elem.parentNode){jQuery.error("type property can't be changed")}elem[name]=value}if(jQuery.nodeName(elem,"form")&&elem.getAttributeNode(name)){return elem.getAttributeNode(name).nodeValue}if(name==="tabIndex"){var attributeNode=elem.getAttributeNode("tabIndex");return attributeNode&&attributeNode.specified?attributeNode.value:rfocusable.test(elem.nodeName)||rclickable.test(elem.nodeName)&&elem.href?0:undefined}return elem[name]}if(!jQuery.support.style&&notxml&&name==="style"){if(set){elem.style.cssText=""+value}return elem.style.cssText}if(set){elem.setAttribute(name,""+value)}var attr=!jQuery.support.hrefNormalized&&notxml&&special?elem.getAttribute(name,2):elem.getAttribute(name);return attr===null?undefined:attr}return jQuery.style(elem,name,value)}});var rnamespaces=/\.(.*)$/,fcleanup=function(nm){return nm.replace(/[^\w\s\.\|`]/g,function(ch){return"\\"+ch})};jQuery.event={add:function(elem,types,handler,data){if(elem.nodeType===3||elem.nodeType===8){return }if(elem.setInterval&&(elem!==window&&!elem.frameElement)){elem=window}var handleObjIn,handleObj;if(handler.handler){handleObjIn=handler;handler=handleObjIn.handler}if(!handler.guid){handler.guid=jQuery.guid++}var elemData=jQuery.data(elem);if(!elemData){return }var events=elemData.events=elemData.events||{},eventHandle=elemData.handle,eventHandle;if(!eventHandle){elemData.handle=eventHandle=function(){return typeof jQuery!=="undefined"&&!jQuery.event.triggered?jQuery.event.handle.apply(eventHandle.elem,arguments):undefined}}eventHandle.elem=elem;types=types.split(" ");var type,i=0,namespaces;while((type=types[i++])){handleObj=handleObjIn?jQuery.extend({},handleObjIn):{handler:handler,data:data};if(type.indexOf(".")>-1){namespaces=type.split(".");type=namespaces.shift();handleObj.namespace=namespaces.slice(0).sort().join(".")}else{namespaces=[];handleObj.namespace=""}handleObj.type=type;handleObj.guid=handler.guid;var handlers=events[type],special=jQuery.event.special[type]||{};if(!handlers){handlers=events[type]=[];if(!special.setup||special.setup.call(elem,data,namespaces,eventHandle)===false){if(elem.addEventListener){elem.addEventListener(type,eventHandle,false)}else{if(elem.attachEvent){elem.attachEvent("on"+type,eventHandle)}}}}if(special.add){special.add.call(elem,handleObj);if(!handleObj.handler.guid){handleObj.handler.guid=handler.guid}}handlers.push(handleObj);jQuery.event.global[type]=true}elem=null},global:{},remove:function(elem,types,handler,pos){if(elem.nodeType===3||elem.nodeType===8){return }var ret,type,fn,i=0,all,namespaces,namespace,special,eventType,handleObj,origType,elemData=jQuery.data(elem),events=elemData&&elemData.events;if(!elemData||!events){return }if(types&&types.type){handler=types.handler;types=types.type}if(!types||typeof types==="string"&&types.charAt(0)==="."){types=types||"";for(type in events){jQuery.event.remove(elem,type+types)}return }types=types.split(" ");while((type=types[i++])){origType=type;handleObj=null;all=type.indexOf(".")<0;namespaces=[];if(!all){namespaces=type.split(".");type=namespaces.shift();namespace=new RegExp("(^|\\.)"+jQuery.map(namespaces.slice(0).sort(),fcleanup).join("\\.(?:.*\\.)?")+"(\\.|$)")}eventType=events[type];if(!eventType){continue}if(!handler){for(var j=0;j<eventType.length;j++){handleObj=eventType[j];if(all||namespace.test(handleObj.namespace)){jQuery.event.remove(elem,origType,handleObj.handler,j);eventType.splice(j--,1)}}continue}special=jQuery.event.special[type]||{};for(var j=pos||0;j<eventType.length;j++){handleObj=eventType[j];if(handler.guid===handleObj.guid){if(all||namespace.test(handleObj.namespace)){if(pos==null){eventType.splice(j--,1)}if(special.remove){special.remove.call(elem,handleObj)}}if(pos!=null){break}}}if(eventType.length===0||pos!=null&&eventType.length===1){if(!special.teardown||special.teardown.call(elem,namespaces)===false){removeEvent(elem,type,elemData.handle)}ret=null;delete events[type]}}if(jQuery.isEmptyObject(events)){var handle=elemData.handle;if(handle){handle.elem=null}delete elemData.events;delete elemData.handle;if(jQuery.isEmptyObject(elemData)){jQuery.removeData(elem)}}},trigger:function(event,data,elem){var type=event.type||event,bubbling=arguments[3];if(!bubbling){event=typeof event==="object"?event[expando]?event:jQuery.extend(jQuery.Event(type),event):jQuery.Event(type);if(type.indexOf("!")>=0){event.type=type=type.slice(0,-1);event.exclusive=true}if(!elem){event.stopPropagation();if(jQuery.event.global[type]){jQuery.each(jQuery.cache,function(){if(this.events&&this.events[type]){jQuery.event.trigger(event,data,this.handle.elem)}})}}if(!elem||elem.nodeType===3||elem.nodeType===8){return undefined}event.result=undefined;event.target=elem;data=jQuery.makeArray(data);data.unshift(event)}event.currentTarget=elem;var handle=jQuery.data(elem,"handle");if(handle){handle.apply(elem,data)}var parent=elem.parentNode||elem.ownerDocument;try{if(!(elem&&elem.nodeName&&jQuery.noData[elem.nodeName.toLowerCase()])){if(elem["on"+type]&&elem["on"+type].apply(elem,data)===false){event.result=false}}}catch(e){}if(!event.isPropagationStopped()&&parent){jQuery.event.trigger(event,data,parent,true)}else{if(!event.isDefaultPrevented()){var target=event.target,old,isClick=jQuery.nodeName(target,"a")&&type==="click",special=jQuery.event.special[type]||{};if((!special._default||special._default.call(elem,event)===false)&&!isClick&&!(target&&target.nodeName&&jQuery.noData[target.nodeName.toLowerCase()])){try{if(target[type]){old=target["on"+type];if(old){target["on"+type]=null}jQuery.event.triggered=true;target[type]()}}catch(e){}if(old){target["on"+type]=old}jQuery.event.triggered=false}}}},handle:function(event){var all,handlers,namespaces,namespace,events;event=arguments[0]=jQuery.event.fix(event||window.event);event.currentTarget=this;all=event.type.indexOf(".")<0&&!event.exclusive;if(!all){namespaces=event.type.split(".");event.type=namespaces.shift();namespace=new RegExp("(^|\\.)"+namespaces.slice(0).sort().join("\\.(?:.*\\.)?")+"(\\.|$)")}var events=jQuery.data(this,"events"),handlers=events[event.type];if(events&&handlers){handlers=handlers.slice(0);for(var j=0,l=handlers.length;j<l;j++){var handleObj=handlers[j];if(all||namespace.test(handleObj.namespace)){event.handler=handleObj.handler;event.data=handleObj.data;event.handleObj=handleObj;var ret=handleObj.handler.apply(this,arguments);if(ret!==undefined){event.result=ret;if(ret===false){event.preventDefault();event.stopPropagation()}}if(event.isImmediatePropagationStopped()){break}}}}return event.result},props:"altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),fix:function(event){if(event[expando]){return event}var originalEvent=event;event=jQuery.Event(originalEvent);for(var i=this.props.length,prop;i;){prop=this.props[--i];event[prop]=originalEvent[prop]}if(!event.target){event.target=event.srcElement||document}if(event.target.nodeType===3){event.target=event.target.parentNode}if(!event.relatedTarget&&event.fromElement){event.relatedTarget=event.fromElement===event.target?event.toElement:event.fromElement}if(event.pageX==null&&event.clientX!=null){var doc=document.documentElement,body=document.body;event.pageX=event.clientX+(doc&&doc.scrollLeft||body&&body.scrollLeft||0)-(doc&&doc.clientLeft||body&&body.clientLeft||0);event.pageY=event.clientY+(doc&&doc.scrollTop||body&&body.scrollTop||0)-(doc&&doc.clientTop||body&&body.clientTop||0)}if(!event.which&&((event.charCode||event.charCode===0)?event.charCode:event.keyCode)){event.which=event.charCode||event.keyCode}if(!event.metaKey&&event.ctrlKey){event.metaKey=event.ctrlKey}if(!event.which&&event.button!==undefined){event.which=(event.button&1?1:(event.button&2?3:(event.button&4?2:0)))}return event},guid:100000000,proxy:jQuery.proxy,special:{ready:{setup:jQuery.bindReady,teardown:jQuery.noop},live:{add:function(handleObj){jQuery.event.add(this,handleObj.origType,jQuery.extend({},handleObj,{handler:liveHandler}))},remove:function(handleObj){var remove=true,type=handleObj.origType.replace(rnamespaces,"");jQuery.each(jQuery.data(this,"events").live||[],function(){if(type===this.origType.replace(rnamespaces,"")){remove=false;return false}});if(remove){jQuery.event.remove(this,handleObj.origType,liveHandler)}}},beforeunload:{setup:function(data,namespaces,eventHandle){if(this.setInterval){this.onbeforeunload=eventHandle}return false},teardown:function(namespaces,eventHandle){if(this.onbeforeunload===eventHandle){this.onbeforeunload=null}}}}};var removeEvent=document.removeEventListener?function(elem,type,handle){elem.removeEventListener(type,handle,false)}:function(elem,type,handle){elem.detachEvent("on"+type,handle)};jQuery.Event=function(src){if(!this.preventDefault){return new jQuery.Event(src)}if(src&&src.type){this.originalEvent=src;this.type=src.type}else{this.type=src}this.timeStamp=now();this[expando]=true};function returnFalse(){return false}function returnTrue(){return true}jQuery.Event.prototype={preventDefault:function(){this.isDefaultPrevented=returnTrue;var e=this.originalEvent;if(!e){return }if(e.preventDefault){e.preventDefault()}e.returnValue=false},stopPropagation:function(){this.isPropagationStopped=returnTrue;var e=this.originalEvent;if(!e){return }if(e.stopPropagation){e.stopPropagation()}e.cancelBubble=true},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=returnTrue;this.stopPropagation()},isDefaultPrevented:returnFalse,isPropagationStopped:returnFalse,isImmediatePropagationStopped:returnFalse};var withinElement=function(event){var parent=event.relatedTarget;try{while(parent&&parent!==this){parent=parent.parentNode}if(parent!==this){event.type=event.data;jQuery.event.handle.apply(this,arguments)}}catch(e){}},delegate=function(event){event.type=event.data;jQuery.event.handle.apply(this,arguments)};jQuery.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(orig,fix){jQuery.event.special[orig]={setup:function(data){jQuery.event.add(this,fix,data&&data.selector?delegate:withinElement,orig)},teardown:function(data){jQuery.event.remove(this,fix,data&&data.selector?delegate:withinElement)}}});if(!jQuery.support.submitBubbles){jQuery.event.special.submit={setup:function(data,namespaces){if(this.nodeName.toLowerCase()!=="form"){jQuery.event.add(this,"click.specialSubmit",function(e){var elem=e.target,type=elem.type;if((type==="submit"||type==="image")&&jQuery(elem).closest("form").length){return trigger("submit",this,arguments)}});jQuery.event.add(this,"keypress.specialSubmit",function(e){var elem=e.target,type=elem.type;if((type==="text"||type==="password")&&jQuery(elem).closest("form").length&&e.keyCode===13){return trigger("submit",this,arguments)}})}else{return false}},teardown:function(namespaces){jQuery.event.remove(this,".specialSubmit")}}}if(!jQuery.support.changeBubbles){var formElems=/textarea|input|select/i,changeFilters,getVal=function(elem){var type=elem.type,val=elem.value;if(type==="radio"||type==="checkbox"){val=elem.checked}else{if(type==="select-multiple"){val=elem.selectedIndex>-1?jQuery.map(elem.options,function(elem){return elem.selected}).join("-"):""}else{if(elem.nodeName.toLowerCase()==="select"){val=elem.selectedIndex}}}return val},testChange=function testChange(e){var elem=e.target,data,val;if(!formElems.test(elem.nodeName)||elem.readOnly){return }data=jQuery.data(elem,"_change_data");val=getVal(elem);if(e.type!=="focusout"||elem.type!=="radio"){jQuery.data(elem,"_change_data",val)}if(data===undefined||val===data){return }if(data!=null||val){e.type="change";return jQuery.event.trigger(e,arguments[1],elem)}};jQuery.event.special.change={filters:{focusout:testChange,click:function(e){var elem=e.target,type=elem.type;if(type==="radio"||type==="checkbox"||elem.nodeName.toLowerCase()==="select"){return testChange.call(this,e)}},keydown:function(e){var elem=e.target,type=elem.type;if((e.keyCode===13&&elem.nodeName.toLowerCase()!=="textarea")||(e.keyCode===32&&(type==="checkbox"||type==="radio"))||type==="select-multiple"){return testChange.call(this,e)}},beforeactivate:function(e){var elem=e.target;jQuery.data(elem,"_change_data",getVal(elem))}},setup:function(data,namespaces){if(this.type==="file"){return false}for(var type in changeFilters){jQuery.event.add(this,type+".specialChange",changeFilters[type])}return formElems.test(this.nodeName)},teardown:function(namespaces){jQuery.event.remove(this,".specialChange");return formElems.test(this.nodeName)}};changeFilters=jQuery.event.special.change.filters}function trigger(type,elem,args){args[0].type=type;return jQuery.event.handle.apply(elem,args)}if(document.addEventListener){jQuery.each({focus:"focusin",blur:"focusout"},function(orig,fix){jQuery.event.special[fix]={setup:function(){this.addEventListener(orig,handler,true)},teardown:function(){this.removeEventListener(orig,handler,true)}};function handler(e){e=jQuery.event.fix(e);e.type=fix;return jQuery.event.handle.call(this,e)}})}jQuery.each(["bind","one"],function(i,name){jQuery.fn[name]=function(type,data,fn){if(typeof type==="object"){for(var key in type){this[name](key,data,type[key],fn)}return this}if(jQuery.isFunction(data)){fn=data;data=undefined}var handler=name==="one"?jQuery.proxy(fn,function(event){jQuery(this).unbind(event,handler);return fn.apply(this,arguments)}):fn;if(type==="unload"&&name!=="one"){this.one(type,data,fn)}else{for(var i=0,l=this.length;i<l;i++){jQuery.event.add(this[i],type,handler,data)}}return this}});jQuery.fn.extend({unbind:function(type,fn){if(typeof type==="object"&&!type.preventDefault){for(var key in type){this.unbind(key,type[key])}}else{for(var i=0,l=this.length;i<l;i++){jQuery.event.remove(this[i],type,fn)}}return this},delegate:function(selector,types,data,fn){return this.live(types,data,fn,selector)},undelegate:function(selector,types,fn){if(arguments.length===0){return this.unbind("live")}else{return this.die(types,null,fn,selector)}},trigger:function(type,data){return this.each(function(){jQuery.event.trigger(type,data,this)})},triggerHandler:function(type,data){if(this[0]){var event=jQuery.Event(type);event.preventDefault();event.stopPropagation();jQuery.event.trigger(event,data,this[0]);return event.result}},toggle:function(fn){var args=arguments,i=1;while(i<args.length){jQuery.proxy(fn,args[i++])}return this.click(jQuery.proxy(fn,function(event){var lastToggle=(jQuery.data(this,"lastToggle"+fn.guid)||0)%i;jQuery.data(this,"lastToggle"+fn.guid,lastToggle+1);event.preventDefault();return args[lastToggle].apply(this,arguments)||false}))},hover:function(fnOver,fnOut){return this.mouseenter(fnOver).mouseleave(fnOut||fnOver)}});var liveMap={focus:"focusin",blur:"focusout",mouseenter:"mouseover",mouseleave:"mouseout"};jQuery.each(["live","die"],function(i,name){jQuery.fn[name]=function(types,data,fn,origSelector){var type,i=0,match,namespaces,preType,selector=origSelector||this.selector,context=origSelector?this:jQuery(this.context);if(jQuery.isFunction(data)){fn=data;data=undefined}types=(types||"").split(" ");while((type=types[i++])!=null){match=rnamespaces.exec(type);namespaces="";if(match){namespaces=match[0];type=type.replace(rnamespaces,"")}if(type==="hover"){types.push("mouseenter"+namespaces,"mouseleave"+namespaces);continue}preType=type;if(type==="focus"||type==="blur"){types.push(liveMap[type]+namespaces);type=type+namespaces}else{type=(liveMap[type]||type)+namespaces}if(name==="live"){context.each(function(){jQuery.event.add(this,liveConvert(type,selector),{data:data,selector:selector,handler:fn,origType:type,origHandler:fn,preType:preType})})}else{context.unbind(liveConvert(type,selector),fn)}}return this}});function liveHandler(event){var stop,elems=[],selectors=[],args=arguments,related,match,handleObj,elem,j,i,l,data,events=jQuery.data(this,"events");if(event.liveFired===this||!events||!events.live||event.button&&event.type==="click"){return }event.liveFired=this;var live=events.live.slice(0);for(j=0;j<live.length;j++){handleObj=live[j];if(handleObj.origType.replace(rnamespaces,"")===event.type){selectors.push(handleObj.selector)}else{live.splice(j--,1)}}match=jQuery(event.target).closest(selectors,event.currentTarget);for(i=0,l=match.length;i<l;i++){for(j=0;j<live.length;j++){handleObj=live[j];if(match[i].selector===handleObj.selector){elem=match[i].elem;related=null;if(handleObj.preType==="mouseenter"||handleObj.preType==="mouseleave"){related=jQuery(event.relatedTarget).closest(handleObj.selector)[0]}if(!related||related!==elem){elems.push({elem:elem,handleObj:handleObj})}}}}for(i=0,l=elems.length;i<l;i++){match=elems[i];event.currentTarget=match.elem;event.data=match.handleObj.data;event.handleObj=match.handleObj;if(match.handleObj.origHandler.apply(match.elem,args)===false){stop=false;break}}return stop}function liveConvert(type,selector){return"live."+(type&&type!=="*"?type+".":"")+selector.replace(/\./g,"`").replace(/ /g,"&")}jQuery.each(("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error").split(" "),function(i,name){jQuery.fn[name]=function(fn){return fn?this.bind(name,fn):this.trigger(name)};if(jQuery.attrFn){jQuery.attrFn[name]=true}});if(window.attachEvent&&!window.addEventListener){window.attachEvent("onunload",function(){for(var id in jQuery.cache){if(jQuery.cache[id].handle){try{jQuery.event.remove(jQuery.cache[id].handle.elem)}catch(e){}}}});
/*
 * Sizzle CSS Selector Engine - v1.0
 *  Copyright 2009, The Dojo Foundation
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://sizzlejs.com/
 */
}(function(){var chunker=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,done=0,toString=Object.prototype.toString,hasDuplicate=false,baseHasDuplicate=true;[0,0].sort(function(){baseHasDuplicate=false;return 0});var Sizzle=function(selector,context,results,seed){results=results||[];var origContext=context=context||document;if(context.nodeType!==1&&context.nodeType!==9){return[]}if(!selector||typeof selector!=="string"){return results}var parts=[],m,set,checkSet,extra,prune=true,contextXML=isXML(context),soFar=selector;while((chunker.exec(""),m=chunker.exec(soFar))!==null){soFar=m[3];parts.push(m[1]);if(m[2]){extra=m[3];break}}if(parts.length>1&&origPOS.exec(selector)){if(parts.length===2&&Expr.relative[parts[0]]){set=posProcess(parts[0]+parts[1],context)}else{set=Expr.relative[parts[0]]?[context]:Sizzle(parts.shift(),context);while(parts.length){selector=parts.shift();if(Expr.relative[selector]){selector+=parts.shift()}set=posProcess(selector,set)}}}else{if(!seed&&parts.length>1&&context.nodeType===9&&!contextXML&&Expr.match.ID.test(parts[0])&&!Expr.match.ID.test(parts[parts.length-1])){var ret=Sizzle.find(parts.shift(),context,contextXML);context=ret.expr?Sizzle.filter(ret.expr,ret.set)[0]:ret.set[0]}if(context){var ret=seed?{expr:parts.pop(),set:makeArray(seed)}:Sizzle.find(parts.pop(),parts.length===1&&(parts[0]==="~"||parts[0]==="+")&&context.parentNode?context.parentNode:context,contextXML);set=ret.expr?Sizzle.filter(ret.expr,ret.set):ret.set;if(parts.length>0){checkSet=makeArray(set)}else{prune=false}while(parts.length){var cur=parts.pop(),pop=cur;if(!Expr.relative[cur]){cur=""}else{pop=parts.pop()}if(pop==null){pop=context}Expr.relative[cur](checkSet,pop,contextXML)}}else{checkSet=parts=[]}}if(!checkSet){checkSet=set}if(!checkSet){Sizzle.error(cur||selector)}if(toString.call(checkSet)==="[object Array]"){if(!prune){results.push.apply(results,checkSet)}else{if(context&&context.nodeType===1){for(var i=0;checkSet[i]!=null;i++){if(checkSet[i]&&(checkSet[i]===true||checkSet[i].nodeType===1&&contains(context,checkSet[i]))){results.push(set[i])}}}else{for(var i=0;checkSet[i]!=null;i++){if(checkSet[i]&&checkSet[i].nodeType===1){results.push(set[i])}}}}}else{makeArray(checkSet,results)}if(extra){Sizzle(extra,origContext,results,seed);Sizzle.uniqueSort(results)}return results};Sizzle.uniqueSort=function(results){if(sortOrder){hasDuplicate=baseHasDuplicate;results.sort(sortOrder);if(hasDuplicate){for(var i=1;i<results.length;i++){if(results[i]===results[i-1]){results.splice(i--,1)}}}}return results};Sizzle.matches=function(expr,set){return Sizzle(expr,null,null,set)};Sizzle.find=function(expr,context,isXML){var set,match;if(!expr){return[]}for(var i=0,l=Expr.order.length;i<l;i++){var type=Expr.order[i],match;if((match=Expr.leftMatch[type].exec(expr))){var left=match[1];match.splice(1,1);if(left.substr(left.length-1)!=="\\"){match[1]=(match[1]||"").replace(/\\/g,"");set=Expr.find[type](match,context,isXML);if(set!=null){expr=expr.replace(Expr.match[type],"");break}}}}if(!set){set=context.getElementsByTagName("*")}return{set:set,expr:expr}};Sizzle.filter=function(expr,set,inplace,not){var old=expr,result=[],curLoop=set,match,anyFound,isXMLFilter=set&&set[0]&&isXML(set[0]);while(expr&&set.length){for(var type in Expr.filter){if((match=Expr.leftMatch[type].exec(expr))!=null&&match[2]){var filter=Expr.filter[type],found,item,left=match[1];anyFound=false;match.splice(1,1);if(left.substr(left.length-1)==="\\"){continue}if(curLoop===result){result=[]}if(Expr.preFilter[type]){match=Expr.preFilter[type](match,curLoop,inplace,result,not,isXMLFilter);if(!match){anyFound=found=true}else{if(match===true){continue}}}if(match){for(var i=0;(item=curLoop[i])!=null;i++){if(item){found=filter(item,match,i,curLoop);var pass=not^!!found;if(inplace&&found!=null){if(pass){anyFound=true}else{curLoop[i]=false}}else{if(pass){result.push(item);anyFound=true}}}}}if(found!==undefined){if(!inplace){curLoop=result}expr=expr.replace(Expr.match[type],"");if(!anyFound){return[]}break}}}if(expr===old){if(anyFound==null){Sizzle.error(expr)}else{break}}old=expr}return curLoop};Sizzle.error=function(msg){throw"Syntax error, unrecognized expression: "+msg};var Expr=Sizzle.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(elem){return elem.getAttribute("href")}},relative:{"+":function(checkSet,part){var isPartStr=typeof part==="string",isTag=isPartStr&&!/\W/.test(part),isPartStrNotTag=isPartStr&&!isTag;if(isTag){part=part.toLowerCase()}for(var i=0,l=checkSet.length,elem;i<l;i++){if((elem=checkSet[i])){while((elem=elem.previousSibling)&&elem.nodeType!==1){}checkSet[i]=isPartStrNotTag||elem&&elem.nodeName.toLowerCase()===part?elem||false:elem===part}}if(isPartStrNotTag){Sizzle.filter(part,checkSet,true)}},">":function(checkSet,part){var isPartStr=typeof part==="string";if(isPartStr&&!/\W/.test(part)){part=part.toLowerCase();for(var i=0,l=checkSet.length;i<l;i++){var elem=checkSet[i];if(elem){var parent=elem.parentNode;checkSet[i]=parent.nodeName.toLowerCase()===part?parent:false}}}else{for(var i=0,l=checkSet.length;i<l;i++){var elem=checkSet[i];if(elem){checkSet[i]=isPartStr?elem.parentNode:elem.parentNode===part}}if(isPartStr){Sizzle.filter(part,checkSet,true)}}},"":function(checkSet,part,isXML){var doneName=done++,checkFn=dirCheck;if(typeof part==="string"&&!/\W/.test(part)){var nodeCheck=part=part.toLowerCase();checkFn=dirNodeCheck}checkFn("parentNode",part,doneName,checkSet,nodeCheck,isXML)},"~":function(checkSet,part,isXML){var doneName=done++,checkFn=dirCheck;if(typeof part==="string"&&!/\W/.test(part)){var nodeCheck=part=part.toLowerCase();checkFn=dirNodeCheck}checkFn("previousSibling",part,doneName,checkSet,nodeCheck,isXML)}},find:{ID:function(match,context,isXML){if(typeof context.getElementById!=="undefined"&&!isXML){var m=context.getElementById(match[1]);return m?[m]:[]}},NAME:function(match,context){if(typeof context.getElementsByName!=="undefined"){var ret=[],results=context.getElementsByName(match[1]);for(var i=0,l=results.length;i<l;i++){if(results[i].getAttribute("name")===match[1]){ret.push(results[i])}}return ret.length===0?null:ret}},TAG:function(match,context){return context.getElementsByTagName(match[1])}},preFilter:{CLASS:function(match,curLoop,inplace,result,not,isXML){match=" "+match[1].replace(/\\/g,"")+" ";if(isXML){return match}for(var i=0,elem;(elem=curLoop[i])!=null;i++){if(elem){if(not^(elem.className&&(" "+elem.className+" ").replace(/[\t\n]/g," ").indexOf(match)>=0)){if(!inplace){result.push(elem)}}else{if(inplace){curLoop[i]=false}}}}return false},ID:function(match){return match[1].replace(/\\/g,"")},TAG:function(match,curLoop){return match[1].toLowerCase()},CHILD:function(match){if(match[1]==="nth"){var test=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(match[2]==="even"&&"2n"||match[2]==="odd"&&"2n+1"||!/\D/.test(match[2])&&"0n+"+match[2]||match[2]);match[2]=(test[1]+(test[2]||1))-0;match[3]=test[3]-0}match[0]=done++;return match},ATTR:function(match,curLoop,inplace,result,not,isXML){var name=match[1].replace(/\\/g,"");if(!isXML&&Expr.attrMap[name]){match[1]=Expr.attrMap[name]}if(match[2]==="~="){match[4]=" "+match[4]+" "}return match},PSEUDO:function(match,curLoop,inplace,result,not){if(match[1]==="not"){if((chunker.exec(match[3])||"").length>1||/^\w/.test(match[3])){match[3]=Sizzle(match[3],null,null,curLoop)}else{var ret=Sizzle.filter(match[3],curLoop,inplace,true^not);if(!inplace){result.push.apply(result,ret)}return false}}else{if(Expr.match.POS.test(match[0])||Expr.match.CHILD.test(match[0])){return true}}return match},POS:function(match){match.unshift(true);return match}},filters:{enabled:function(elem){return elem.disabled===false&&elem.type!=="hidden"},disabled:function(elem){return elem.disabled===true},checked:function(elem){return elem.checked===true},selected:function(elem){elem.parentNode.selectedIndex;return elem.selected===true},parent:function(elem){return !!elem.firstChild},empty:function(elem){return !elem.firstChild},has:function(elem,i,match){return !!Sizzle(match[3],elem).length},header:function(elem){return/h\d/i.test(elem.nodeName)},text:function(elem){return"text"===elem.type},radio:function(elem){return"radio"===elem.type},checkbox:function(elem){return"checkbox"===elem.type},file:function(elem){return"file"===elem.type},password:function(elem){return"password"===elem.type},submit:function(elem){return"submit"===elem.type},image:function(elem){return"image"===elem.type},reset:function(elem){return"reset"===elem.type},button:function(elem){return"button"===elem.type||elem.nodeName.toLowerCase()==="button"},input:function(elem){return/input|select|textarea|button/i.test(elem.nodeName)}},setFilters:{first:function(elem,i){return i===0},last:function(elem,i,match,array){return i===array.length-1},even:function(elem,i){return i%2===0},odd:function(elem,i){return i%2===1},lt:function(elem,i,match){return i<match[3]-0},gt:function(elem,i,match){return i>match[3]-0},nth:function(elem,i,match){return match[3]-0===i},eq:function(elem,i,match){return match[3]-0===i}},filter:{PSEUDO:function(elem,match,i,array){var name=match[1],filter=Expr.filters[name];if(filter){return filter(elem,i,match,array)}else{if(name==="contains"){return(elem.textContent||elem.innerText||getText([elem])||"").indexOf(match[3])>=0}else{if(name==="not"){var not=match[3];for(var i=0,l=not.length;i<l;i++){if(not[i]===elem){return false}}return true}else{Sizzle.error("Syntax error, unrecognized expression: "+name)}}}},CHILD:function(elem,match){var type=match[1],node=elem;switch(type){case"only":case"first":while((node=node.previousSibling)){if(node.nodeType===1){return false}}if(type==="first"){return true}node=elem;case"last":while((node=node.nextSibling)){if(node.nodeType===1){return false}}return true;case"nth":var first=match[2],last=match[3];if(first===1&&last===0){return true}var doneName=match[0],parent=elem.parentNode;if(parent&&(parent.sizcache!==doneName||!elem.nodeIndex)){var count=0;for(node=parent.firstChild;node;node=node.nextSibling){if(node.nodeType===1){node.nodeIndex=++count}}parent.sizcache=doneName}var diff=elem.nodeIndex-last;if(first===0){return diff===0}else{return(diff%first===0&&diff/first>=0)}}},ID:function(elem,match){return elem.nodeType===1&&elem.getAttribute("id")===match},TAG:function(elem,match){return(match==="*"&&elem.nodeType===1)||elem.nodeName.toLowerCase()===match},CLASS:function(elem,match){return(" "+(elem.className||elem.getAttribute("class"))+" ").indexOf(match)>-1},ATTR:function(elem,match){var name=match[1],result=Expr.attrHandle[name]?Expr.attrHandle[name](elem):elem[name]!=null?elem[name]:elem.getAttribute(name),value=result+"",type=match[2],check=match[4];return result==null?type==="!=":type==="="?value===check:type==="*="?value.indexOf(check)>=0:type==="~="?(" "+value+" ").indexOf(check)>=0:!check?value&&result!==false:type==="!="?value!==check:type==="^="?value.indexOf(check)===0:type==="$="?value.substr(value.length-check.length)===check:type==="|="?value===check||value.substr(0,check.length+1)===check+"-":false},POS:function(elem,match,i,array){var name=match[2],filter=Expr.setFilters[name];if(filter){return filter(elem,i,match,array)}}}};var origPOS=Expr.match.POS;for(var type in Expr.match){Expr.match[type]=new RegExp(Expr.match[type].source+/(?![^\[]*\])(?![^\(]*\))/.source);Expr.leftMatch[type]=new RegExp(/(^(?:.|\r|\n)*?)/.source+Expr.match[type].source.replace(/\\(\d+)/g,function(all,num){return"\\"+(num-0+1)}))}var makeArray=function(array,results){array=Array.prototype.slice.call(array,0);if(results){results.push.apply(results,array);return results}return array};try{Array.prototype.slice.call(document.documentElement.childNodes,0)[0].nodeType}catch(e){makeArray=function(array,results){var ret=results||[];if(toString.call(array)==="[object Array]"){Array.prototype.push.apply(ret,array)}else{if(typeof array.length==="number"){for(var i=0,l=array.length;i<l;i++){ret.push(array[i])}}else{for(var i=0;array[i];i++){ret.push(array[i])}}}return ret}}var sortOrder;if(document.documentElement.compareDocumentPosition){sortOrder=function(a,b){if(!a.compareDocumentPosition||!b.compareDocumentPosition){if(a==b){hasDuplicate=true}return a.compareDocumentPosition?-1:1}var ret=a.compareDocumentPosition(b)&4?-1:a===b?0:1;if(ret===0){hasDuplicate=true}return ret}}else{if("sourceIndex" in document.documentElement){sortOrder=function(a,b){if(!a.sourceIndex||!b.sourceIndex){if(a==b){hasDuplicate=true}return a.sourceIndex?-1:1}var ret=a.sourceIndex-b.sourceIndex;if(ret===0){hasDuplicate=true}return ret}}else{if(document.createRange){sortOrder=function(a,b){if(!a.ownerDocument||!b.ownerDocument){if(a==b){hasDuplicate=true}return a.ownerDocument?-1:1}var aRange=a.ownerDocument.createRange(),bRange=b.ownerDocument.createRange();aRange.setStart(a,0);aRange.setEnd(a,0);bRange.setStart(b,0);bRange.setEnd(b,0);var ret=aRange.compareBoundaryPoints(Range.START_TO_END,bRange);if(ret===0){hasDuplicate=true}return ret}}}}function getText(elems){var ret="",elem;for(var i=0;elems[i];i++){elem=elems[i];if(elem.nodeType===3||elem.nodeType===4){ret+=elem.nodeValue}else{if(elem.nodeType!==8){ret+=getText(elem.childNodes)}}}return ret}(function(){var form=document.createElement("div"),id="script"+(new Date).getTime();form.innerHTML="<a name='"+id+"'/>";var root=document.documentElement;root.insertBefore(form,root.firstChild);if(document.getElementById(id)){Expr.find.ID=function(match,context,isXML){if(typeof context.getElementById!=="undefined"&&!isXML){var m=context.getElementById(match[1]);return m?m.id===match[1]||typeof m.getAttributeNode!=="undefined"&&m.getAttributeNode("id").nodeValue===match[1]?[m]:undefined:[]}};Expr.filter.ID=function(elem,match){var node=typeof elem.getAttributeNode!=="undefined"&&elem.getAttributeNode("id");return elem.nodeType===1&&node&&node.nodeValue===match}}root.removeChild(form);root=form=null})();(function(){var div=document.createElement("div");div.appendChild(document.createComment(""));if(div.getElementsByTagName("*").length>0){Expr.find.TAG=function(match,context){var results=context.getElementsByTagName(match[1]);if(match[1]==="*"){var tmp=[];for(var i=0;results[i];i++){if(results[i].nodeType===1){tmp.push(results[i])}}results=tmp}return results}}div.innerHTML="<a href='#'></a>";if(div.firstChild&&typeof div.firstChild.getAttribute!=="undefined"&&div.firstChild.getAttribute("href")!=="#"){Expr.attrHandle.href=function(elem){return elem.getAttribute("href",2)}}div=null})();if(document.querySelectorAll){(function(){var oldSizzle=Sizzle,div=document.createElement("div");div.innerHTML="<p class='TEST'></p>";if(div.querySelectorAll&&div.querySelectorAll(".TEST").length===0){return }Sizzle=function(query,context,extra,seed){context=context||document;if(!seed&&context.nodeType===9&&!isXML(context)){try{return makeArray(context.querySelectorAll(query),extra)}catch(e){}}return oldSizzle(query,context,extra,seed)};for(var prop in oldSizzle){Sizzle[prop]=oldSizzle[prop]}div=null})()}(function(){var div=document.createElement("div");div.innerHTML="<div class='test e'></div><div class='test'></div>";if(!div.getElementsByClassName||div.getElementsByClassName("e").length===0){return }div.lastChild.className="e";if(div.getElementsByClassName("e").length===1){return }Expr.order.splice(1,0,"CLASS");Expr.find.CLASS=function(match,context,isXML){if(typeof context.getElementsByClassName!=="undefined"&&!isXML){return context.getElementsByClassName(match[1])}};div=null})();function dirNodeCheck(dir,cur,doneName,checkSet,nodeCheck,isXML){for(var i=0,l=checkSet.length;i<l;i++){var elem=checkSet[i];if(elem){elem=elem[dir];var match=false;while(elem){if(elem.sizcache===doneName){match=checkSet[elem.sizset];break}if(elem.nodeType===1&&!isXML){elem.sizcache=doneName;elem.sizset=i}if(elem.nodeName.toLowerCase()===cur){match=elem;break}elem=elem[dir]}checkSet[i]=match}}}function dirCheck(dir,cur,doneName,checkSet,nodeCheck,isXML){for(var i=0,l=checkSet.length;i<l;i++){var elem=checkSet[i];if(elem){elem=elem[dir];var match=false;while(elem){if(elem.sizcache===doneName){match=checkSet[elem.sizset];break}if(elem.nodeType===1){if(!isXML){elem.sizcache=doneName;elem.sizset=i}if(typeof cur!=="string"){if(elem===cur){match=true;break}}else{if(Sizzle.filter(cur,[elem]).length>0){match=elem;break}}}elem=elem[dir]}checkSet[i]=match}}}var contains=document.compareDocumentPosition?function(a,b){return !!(a.compareDocumentPosition(b)&16)}:function(a,b){return a!==b&&(a.contains?a.contains(b):true)};var isXML=function(elem){var documentElement=(elem?elem.ownerDocument||elem:0).documentElement;return documentElement?documentElement.nodeName!=="HTML":false};var posProcess=function(selector,context){var tmpSet=[],later="",match,root=context.nodeType?[context]:context;while((match=Expr.match.PSEUDO.exec(selector))){later+=match[0];selector=selector.replace(Expr.match.PSEUDO,"")}selector=Expr.relative[selector]?selector+"*":selector;for(var i=0,l=root.length;i<l;i++){Sizzle(selector,root[i],tmpSet)}return Sizzle.filter(later,tmpSet)};jQuery.find=Sizzle;jQuery.expr=Sizzle.selectors;jQuery.expr[":"]=jQuery.expr.filters;jQuery.unique=Sizzle.uniqueSort;jQuery.text=getText;jQuery.isXMLDoc=isXML;jQuery.contains=contains;return ;window.Sizzle=Sizzle})();var runtil=/Until$/,rparentsprev=/^(?:parents|prevUntil|prevAll)/,rmultiselector=/,/,slice=Array.prototype.slice;var winnow=function(elements,qualifier,keep){if(jQuery.isFunction(qualifier)){return jQuery.grep(elements,function(elem,i){return !!qualifier.call(elem,i,elem)===keep})}else{if(qualifier.nodeType){return jQuery.grep(elements,function(elem,i){return(elem===qualifier)===keep})}else{if(typeof qualifier==="string"){var filtered=jQuery.grep(elements,function(elem){return elem.nodeType===1});if(isSimple.test(qualifier)){return jQuery.filter(qualifier,filtered,!keep)}else{qualifier=jQuery.filter(qualifier,filtered)}}}}return jQuery.grep(elements,function(elem,i){return(jQuery.inArray(elem,qualifier)>=0)===keep})};jQuery.fn.extend({find:function(selector){var ret=this.pushStack("","find",selector),length=0;for(var i=0,l=this.length;i<l;i++){length=ret.length;jQuery.find(selector,this[i],ret);if(i>0){for(var n=length;n<ret.length;n++){for(var r=0;r<length;r++){if(ret[r]===ret[n]){ret.splice(n--,1);break}}}}}return ret},has:function(target){var targets=jQuery(target);return this.filter(function(){for(var i=0,l=targets.length;i<l;i++){if(jQuery.contains(this,targets[i])){return true}}})},not:function(selector){return this.pushStack(winnow(this,selector,false),"not",selector)},filter:function(selector){return this.pushStack(winnow(this,selector,true),"filter",selector)},is:function(selector){return !!selector&&jQuery.filter(selector,this).length>0},closest:function(selectors,context){if(jQuery.isArray(selectors)){var ret=[],cur=this[0],match,matches={},selector;if(cur&&selectors.length){for(var i=0,l=selectors.length;i<l;i++){selector=selectors[i];if(!matches[selector]){matches[selector]=jQuery.expr.match.POS.test(selector)?jQuery(selector,context||this.context):selector}}while(cur&&cur.ownerDocument&&cur!==context){for(selector in matches){match=matches[selector];if(match.jquery?match.index(cur)>-1:jQuery(cur).is(match)){ret.push({selector:selector,elem:cur});delete matches[selector]}}cur=cur.parentNode}}return ret}var pos=jQuery.expr.match.POS.test(selectors)?jQuery(selectors,context||this.context):null;return this.map(function(i,cur){while(cur&&cur.ownerDocument&&cur!==context){if(pos?pos.index(cur)>-1:jQuery(cur).is(selectors)){return cur}cur=cur.parentNode}return null})},index:function(elem){if(!elem||typeof elem==="string"){return jQuery.inArray(this[0],elem?jQuery(elem):this.parent().children())}return jQuery.inArray(elem.jquery?elem[0]:elem,this)},add:function(selector,context){var set=typeof selector==="string"?jQuery(selector,context||this.context):jQuery.makeArray(selector),all=jQuery.merge(this.get(),set);return this.pushStack(isDisconnected(set[0])||isDisconnected(all[0])?all:jQuery.unique(all))},andSelf:function(){return this.add(this.prevObject)}});function isDisconnected(node){return !node||!node.parentNode||node.parentNode.nodeType===11}jQuery.each({parent:function(elem){var parent=elem.parentNode;return parent&&parent.nodeType!==11?parent:null},parents:function(elem){return jQuery.dir(elem,"parentNode")},parentsUntil:function(elem,i,until){return jQuery.dir(elem,"parentNode",until)},next:function(elem){return jQuery.nth(elem,2,"nextSibling")},prev:function(elem){return jQuery.nth(elem,2,"previousSibling")},nextAll:function(elem){return jQuery.dir(elem,"nextSibling")},prevAll:function(elem){return jQuery.dir(elem,"previousSibling")},nextUntil:function(elem,i,until){return jQuery.dir(elem,"nextSibling",until)},prevUntil:function(elem,i,until){return jQuery.dir(elem,"previousSibling",until)},siblings:function(elem){return jQuery.sibling(elem.parentNode.firstChild,elem)},children:function(elem){return jQuery.sibling(elem.firstChild)},contents:function(elem){return jQuery.nodeName(elem,"iframe")?elem.contentDocument||elem.contentWindow.document:jQuery.makeArray(elem.childNodes)}},function(name,fn){jQuery.fn[name]=function(until,selector){var ret=jQuery.map(this,fn,until);if(!runtil.test(name)){selector=until}if(selector&&typeof selector==="string"){ret=jQuery.filter(selector,ret)}ret=this.length>1?jQuery.unique(ret):ret;if((this.length>1||rmultiselector.test(selector))&&rparentsprev.test(name)){ret=ret.reverse()}return this.pushStack(ret,name,slice.call(arguments).join(","))}});jQuery.extend({filter:function(expr,elems,not){if(not){expr=":not("+expr+")"}return jQuery.find.matches(expr,elems)},dir:function(elem,dir,until){var matched=[],cur=elem[dir];while(cur&&cur.nodeType!==9&&(until===undefined||cur.nodeType!==1||!jQuery(cur).is(until))){if(cur.nodeType===1){matched.push(cur)}cur=cur[dir]}return matched},nth:function(cur,result,dir,elem){result=result||1;var num=0;for(;cur;cur=cur[dir]){if(cur.nodeType===1&&++num===result){break}}return cur},sibling:function(n,elem){var r=[];for(;n;n=n.nextSibling){if(n.nodeType===1&&n!==elem){r.push(n)}}return r}});var rinlinejQuery=/ jQuery\d+="(?:\d+|null)"/g,rleadingWhitespace=/^\s+/,rxhtmlTag=/(<([\w:]+)[^>]*?)\/>/g,rselfClosing=/^(?:area|br|col|embed|hr|img|input|link|meta|param)$/i,rtagName=/<([\w:]+)/,rtbody=/<tbody/i,rhtml=/<|&#?\w+;/,rnocache=/<script|<object|<embed|<option|<style/i,rchecked=/checked\s*(?:[^=]|=\s*.checked.)/i,fcloseTag=function(all,front,tag){return rselfClosing.test(tag)?all:front+"></"+tag+">"},wrapMap={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]};wrapMap.optgroup=wrapMap.option;wrapMap.tbody=wrapMap.tfoot=wrapMap.colgroup=wrapMap.caption=wrapMap.thead;wrapMap.th=wrapMap.td;if(!jQuery.support.htmlSerialize){wrapMap._default=[1,"div<div>","</div>"]}jQuery.fn.extend({text:function(text){if(jQuery.isFunction(text)){return this.each(function(i){var self=jQuery(this);self.text(text.call(this,i,self.text()))})}if(typeof text!=="object"&&text!==undefined){return this.empty().append((this[0]&&this[0].ownerDocument||document).createTextNode(text))}return jQuery.text(this)},wrapAll:function(html){if(jQuery.isFunction(html)){return this.each(function(i){jQuery(this).wrapAll(html.call(this,i))})}if(this[0]){var wrap=jQuery(html,this[0].ownerDocument).eq(0).clone(true);if(this[0].parentNode){wrap.insertBefore(this[0])}wrap.map(function(){var elem=this;while(elem.firstChild&&elem.firstChild.nodeType===1){elem=elem.firstChild}return elem}).append(this)}return this},wrapInner:function(html){if(jQuery.isFunction(html)){return this.each(function(i){jQuery(this).wrapInner(html.call(this,i))})}return this.each(function(){var self=jQuery(this),contents=self.contents();if(contents.length){contents.wrapAll(html)}else{self.append(html)}})},wrap:function(html){return this.each(function(){jQuery(this).wrapAll(html)})},unwrap:function(){return this.parent().each(function(){if(!jQuery.nodeName(this,"body")){jQuery(this).replaceWith(this.childNodes)}}).end()},append:function(){return this.domManip(arguments,true,function(elem){if(this.nodeType===1){this.appendChild(elem)}})},prepend:function(){return this.domManip(arguments,true,function(elem){if(this.nodeType===1){this.insertBefore(elem,this.firstChild)}})},before:function(){if(this[0]&&this[0].parentNode){return this.domManip(arguments,false,function(elem){this.parentNode.insertBefore(elem,this)})}else{if(arguments.length){var set=jQuery(arguments[0]);set.push.apply(set,this.toArray());return this.pushStack(set,"before",arguments)}}},after:function(){if(this[0]&&this[0].parentNode){return this.domManip(arguments,false,function(elem){this.parentNode.insertBefore(elem,this.nextSibling)})}else{if(arguments.length){var set=this.pushStack(this,"after",arguments);set.push.apply(set,jQuery(arguments[0]).toArray());return set}}},remove:function(selector,keepData){for(var i=0,elem;(elem=this[i])!=null;i++){if(!selector||jQuery.filter(selector,[elem]).length){if(!keepData&&elem.nodeType===1){jQuery.cleanData(elem.getElementsByTagName("*"));jQuery.cleanData([elem])}if(elem.parentNode){elem.parentNode.removeChild(elem)}}}return this},empty:function(){for(var i=0,elem;(elem=this[i])!=null;i++){if(elem.nodeType===1){jQuery.cleanData(elem.getElementsByTagName("*"))}while(elem.firstChild){elem.removeChild(elem.firstChild)}}return this},clone:function(events){var ret=this.map(function(){if(!jQuery.support.noCloneEvent&&!jQuery.isXMLDoc(this)){var html=this.outerHTML,ownerDocument=this.ownerDocument;if(!html){var div=ownerDocument.createElement("div");div.appendChild(this.cloneNode(true));html=div.innerHTML}return jQuery.clean([html.replace(rinlinejQuery,"").replace(/=([^="'>\s]+\/)>/g,'="$1">').replace(rleadingWhitespace,"")],ownerDocument)[0]}else{return this.cloneNode(true)}});if(events===true){cloneCopyEvent(this,ret);cloneCopyEvent(this.find("*"),ret.find("*"))}return ret},html:function(value){if(value===undefined){return this[0]&&this[0].nodeType===1?this[0].innerHTML.replace(rinlinejQuery,""):null}else{if(typeof value==="string"&&!rnocache.test(value)&&(jQuery.support.leadingWhitespace||!rleadingWhitespace.test(value))&&!wrapMap[(rtagName.exec(value)||["",""])[1].toLowerCase()]){value=value.replace(rxhtmlTag,fcloseTag);try{for(var i=0,l=this.length;i<l;i++){if(this[i].nodeType===1){jQuery.cleanData(this[i].getElementsByTagName("*"));this[i].innerHTML=value}}}catch(e){this.empty().append(value)}}else{if(jQuery.isFunction(value)){this.each(function(i){var self=jQuery(this),old=self.html();self.empty().append(function(){return value.call(this,i,old)})})}else{this.empty().append(value)}}}return this},replaceWith:function(value){if(this[0]&&this[0].parentNode){if(jQuery.isFunction(value)){return this.each(function(i){var self=jQuery(this),old=self.html();self.replaceWith(value.call(this,i,old))})}if(typeof value!=="string"){value=jQuery(value).detach()}return this.each(function(){var next=this.nextSibling,parent=this.parentNode;jQuery(this).remove();if(next){jQuery(next).before(value)}else{jQuery(parent).append(value)}})}else{return this.pushStack(jQuery(jQuery.isFunction(value)?value():value),"replaceWith",value)}},detach:function(selector){return this.remove(selector,true)},domManip:function(args,table,callback){var results,first,value=args[0],scripts=[],fragment,parent;if(!jQuery.support.checkClone&&arguments.length===3&&typeof value==="string"&&rchecked.test(value)){return this.each(function(){jQuery(this).domManip(args,table,callback,true)})}if(jQuery.isFunction(value)){return this.each(function(i){var self=jQuery(this);args[0]=value.call(this,i,table?self.html():undefined);self.domManip(args,table,callback)})}if(this[0]){parent=value&&value.parentNode;if(jQuery.support.parentNode&&parent&&parent.nodeType===11&&parent.childNodes.length===this.length){results={fragment:parent}}else{results=buildFragment(args,this,scripts)}fragment=results.fragment;if(fragment.childNodes.length===1){first=fragment=fragment.firstChild}else{first=fragment.firstChild}if(first){table=table&&jQuery.nodeName(first,"tr");for(var i=0,l=this.length;i<l;i++){callback.call(table?root(this[i],first):this[i],i>0||results.cacheable||this.length>1?fragment.cloneNode(true):fragment)}}if(scripts.length){jQuery.each(scripts,evalScript)}}return this;function root(elem,cur){return jQuery.nodeName(elem,"table")?(elem.getElementsByTagName("tbody")[0]||elem.appendChild(elem.ownerDocument.createElement("tbody"))):elem}}});function cloneCopyEvent(orig,ret){var i=0;ret.each(function(){if(this.nodeName!==(orig[i]&&orig[i].nodeName)){return }var oldData=jQuery.data(orig[i++]),curData=jQuery.data(this,oldData),events=oldData&&oldData.events;if(events){delete curData.handle;curData.events={};for(var type in events){for(var handler in events[type]){jQuery.event.add(this,type,events[type][handler],events[type][handler].data)}}}})}function buildFragment(args,nodes,scripts){var fragment,cacheable,cacheresults,doc=(nodes&&nodes[0]?nodes[0].ownerDocument||nodes[0]:document);if(args.length===1&&typeof args[0]==="string"&&args[0].length<512&&doc===document&&!rnocache.test(args[0])&&(jQuery.support.checkClone||!rchecked.test(args[0]))){cacheable=true;cacheresults=jQuery.fragments[args[0]];if(cacheresults){if(cacheresults!==1){fragment=cacheresults}}}if(!fragment){fragment=doc.createDocumentFragment();jQuery.clean(args,doc,fragment,scripts)}if(cacheable){jQuery.fragments[args[0]]=cacheresults?fragment:1}return{fragment:fragment,cacheable:cacheable}}jQuery.fragments={};jQuery.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(name,original){jQuery.fn[name]=function(selector){var ret=[],insert=jQuery(selector),parent=this.length===1&&this[0].parentNode;if(parent&&parent.nodeType===11&&parent.childNodes.length===1&&insert.length===1){insert[original](this[0]);return this}else{for(var i=0,l=insert.length;i<l;i++){var elems=(i>0?this.clone(true):this).get();jQuery.fn[original].apply(jQuery(insert[i]),elems);ret=ret.concat(elems)}return this.pushStack(ret,name,insert.selector)}}});jQuery.extend({clean:function(elems,context,fragment,scripts){context=context||document;if(typeof context.createElement==="undefined"){context=context.ownerDocument||context[0]&&context[0].ownerDocument||document}var ret=[];for(var i=0,elem;(elem=elems[i])!=null;i++){if(typeof elem==="number"){elem+=""}if(!elem){continue}if(typeof elem==="string"&&!rhtml.test(elem)){elem=context.createTextNode(elem)}else{if(typeof elem==="string"){elem=elem.replace(rxhtmlTag,fcloseTag);var tag=(rtagName.exec(elem)||["",""])[1].toLowerCase(),wrap=wrapMap[tag]||wrapMap._default,depth=wrap[0],div=context.createElement("div");div.innerHTML=wrap[1]+elem+wrap[2];while(depth--){div=div.lastChild}if(!jQuery.support.tbody){var hasBody=rtbody.test(elem),tbody=tag==="table"&&!hasBody?div.firstChild&&div.firstChild.childNodes:wrap[1]==="<table>"&&!hasBody?div.childNodes:[];for(var j=tbody.length-1;j>=0;--j){if(jQuery.nodeName(tbody[j],"tbody")&&!tbody[j].childNodes.length){tbody[j].parentNode.removeChild(tbody[j])}}}if(!jQuery.support.leadingWhitespace&&rleadingWhitespace.test(elem)){div.insertBefore(context.createTextNode(rleadingWhitespace.exec(elem)[0]),div.firstChild)}elem=div.childNodes}}if(elem.nodeType){ret.push(elem)}else{ret=jQuery.merge(ret,elem)}}if(fragment){for(var i=0;ret[i];i++){if(scripts&&jQuery.nodeName(ret[i],"script")&&(!ret[i].type||ret[i].type.toLowerCase()==="text/javascript")){scripts.push(ret[i].parentNode?ret[i].parentNode.removeChild(ret[i]):ret[i])}else{if(ret[i].nodeType===1){ret.splice.apply(ret,[i+1,0].concat(jQuery.makeArray(ret[i].getElementsByTagName("script"))))}fragment.appendChild(ret[i])}}}return ret},cleanData:function(elems){var data,id,cache=jQuery.cache,special=jQuery.event.special,deleteExpando=jQuery.support.deleteExpando;for(var i=0,elem;(elem=elems[i])!=null;i++){id=elem[jQuery.expando];if(id){data=cache[id];if(data.events){for(var type in data.events){if(special[type]){jQuery.event.remove(elem,type)}else{removeEvent(elem,type,data.handle)}}}if(deleteExpando){delete elem[jQuery.expando]}else{if(elem.removeAttribute){elem.removeAttribute(jQuery.expando)}}delete cache[id]}}}});var rexclude=/z-?index|font-?weight|opacity|zoom|line-?height/i,ralpha=/alpha\([^)]*\)/,ropacity=/opacity=([^)]*)/,rfloat=/float/i,rdashAlpha=/-([a-z])/ig,rupper=/([A-Z])/g,rnumpx=/^-?\d+(?:px)?$/i,rnum=/^-?\d/,cssShow={position:"absolute",visibility:"hidden",display:"block"},cssWidth=["Left","Right"],cssHeight=["Top","Bottom"],getComputedStyle=document.defaultView&&document.defaultView.getComputedStyle,styleFloat=jQuery.support.cssFloat?"cssFloat":"styleFloat",fcamelCase=function(all,letter){return letter.toUpperCase()};jQuery.fn.css=function(name,value){return access(this,name,value,true,function(elem,name,value){if(value===undefined){return jQuery.curCSS(elem,name)}if(typeof value==="number"&&!rexclude.test(name)){value+="px"}jQuery.style(elem,name,value)})};jQuery.extend({style:function(elem,name,value){if(!elem||elem.nodeType===3||elem.nodeType===8){return undefined}if((name==="width"||name==="height")&&parseFloat(value)<0){value=undefined}var style=elem.style||elem,set=value!==undefined;if(!jQuery.support.opacity&&name==="opacity"){if(set){style.zoom=1;var opacity=parseInt(value,10)+""==="NaN"?"":"alpha(opacity="+value*100+")";var filter=style.filter||jQuery.curCSS(elem,"filter")||"";style.filter=ralpha.test(filter)?filter.replace(ralpha,opacity):opacity}return style.filter&&style.filter.indexOf("opacity=")>=0?(parseFloat(ropacity.exec(style.filter)[1])/100)+"":""}if(rfloat.test(name)){name=styleFloat}name=name.replace(rdashAlpha,fcamelCase);if(set){style[name]=value}return style[name]},css:function(elem,name,force,extra){if(name==="width"||name==="height"){var val,props=cssShow,which=name==="width"?cssWidth:cssHeight;function getWH(){val=name==="width"?elem.offsetWidth:elem.offsetHeight;if(extra==="border"){return }jQuery.each(which,function(){if(!extra){val-=parseFloat(jQuery.curCSS(elem,"padding"+this,true))||0}if(extra==="margin"){val+=parseFloat(jQuery.curCSS(elem,"margin"+this,true))||0}else{val-=parseFloat(jQuery.curCSS(elem,"border"+this+"Width",true))||0}})}if(elem.offsetWidth!==0){getWH()}else{jQuery.swap(elem,props,getWH)}return Math.max(0,Math.round(val))}return jQuery.curCSS(elem,name,force)},curCSS:function(elem,name,force){var ret,style=elem.style,filter;if(!jQuery.support.opacity&&name==="opacity"&&elem.currentStyle){ret=ropacity.test(elem.currentStyle.filter||"")?(parseFloat(RegExp.$1)/100)+"":"";return ret===""?"1":ret}if(rfloat.test(name)){name=styleFloat}if(!force&&style&&style[name]){ret=style[name]}else{if(getComputedStyle){if(rfloat.test(name)){name="float"}name=name.replace(rupper,"-$1").toLowerCase();var defaultView=elem.ownerDocument.defaultView;if(!defaultView){return null}var computedStyle=defaultView.getComputedStyle(elem,null);if(computedStyle){ret=computedStyle.getPropertyValue(name)}if(name==="opacity"&&ret===""){ret="1"}}else{if(elem.currentStyle){var camelCase=name.replace(rdashAlpha,fcamelCase);ret=elem.currentStyle[name]||elem.currentStyle[camelCase];if(!rnumpx.test(ret)&&rnum.test(ret)){var left=style.left,rsLeft=elem.runtimeStyle.left;elem.runtimeStyle.left=elem.currentStyle.left;style.left=camelCase==="fontSize"?"1em":(ret||0);ret=style.pixelLeft+"px";style.left=left;elem.runtimeStyle.left=rsLeft}}}}return ret},swap:function(elem,options,callback){var old={};for(var name in options){old[name]=elem.style[name];elem.style[name]=options[name]}callback.call(elem);for(var name in options){elem.style[name]=old[name]}}});if(jQuery.expr&&jQuery.expr.filters){jQuery.expr.filters.hidden=function(elem){var width=elem.offsetWidth,height=elem.offsetHeight,skip=elem.nodeName.toLowerCase()==="tr";return width===0&&height===0&&!skip?true:width>0&&height>0&&!skip?false:jQuery.curCSS(elem,"display")==="none"};jQuery.expr.filters.visible=function(elem){return !jQuery.expr.filters.hidden(elem)}}var jsc=now(),rscript=/<script(.|\s)*?\/script>/gi,rselectTextarea=/select|textarea/i,rinput=/color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week/i,jsre=/=\?(&|$)/,rquery=/\?/,rts=/(\?|&)_=.*?(&|$)/,rurl=/^(\w+:)?\/\/([^\/?#]+)/,r20=/%20/g,_load=jQuery.fn.load;jQuery.fn.extend({load:function(url,params,callback){if(typeof url!=="string"){return _load.call(this,url)}else{if(!this.length){return this}}var off=url.indexOf(" ");if(off>=0){var selector=url.slice(off,url.length);url=url.slice(0,off)}var type="GET";if(params){if(jQuery.isFunction(params)){callback=params;params=null}else{if(typeof params==="object"){params=jQuery.param(params,jQuery.ajaxSettings.traditional);type="POST"}}}var self=this;jQuery.ajax({url:url,type:type,dataType:"html",data:params,complete:function(res,status){if(status==="success"||status==="notmodified"){self.html(selector?jQuery("<div />").append(res.responseText.replace(rscript,"")).find(selector):res.responseText)}if(callback){self.each(callback,[res.responseText,status,res])}}});return this},serialize:function(){return jQuery.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?jQuery.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||rselectTextarea.test(this.nodeName)||rinput.test(this.type))}).map(function(i,elem){var val=jQuery(this).val();return val==null?null:jQuery.isArray(val)?jQuery.map(val,function(val,i){return{name:elem.name,value:val}}):{name:elem.name,value:val}}).get()}});jQuery.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(i,o){jQuery.fn[o]=function(f){return this.bind(o,f)}});jQuery.extend({get:function(url,data,callback,type){if(jQuery.isFunction(data)){type=type||callback;callback=data;data=null}return jQuery.ajax({type:"GET",url:url,data:data,success:callback,dataType:type})},getScript:function(url,callback){return jQuery.get(url,null,callback,"script")},getJSON:function(url,data,callback){return jQuery.get(url,data,callback,"json")},post:function(url,data,callback,type){if(jQuery.isFunction(data)){type=type||callback;callback=data;data={}}return jQuery.ajax({type:"POST",url:url,data:data,success:callback,dataType:type})},ajaxSetup:function(settings){jQuery.extend(jQuery.ajaxSettings,settings)},ajaxSettings:{url:location.href,global:true,type:"GET",contentType:"application/x-www-form-urlencoded",processData:true,async:true,xhr:window.XMLHttpRequest&&(window.location.protocol!=="file:"||!window.ActiveXObject)?function(){return new window.XMLHttpRequest()}:function(){try{return new window.ActiveXObject("Microsoft.XMLHTTP")}catch(e){}},accepts:{xml:"application/xml, text/xml",html:"text/html",script:"text/javascript, application/javascript",json:"application/json, text/javascript",text:"text/plain",_default:"*/*"}},lastModified:{},etag:{},ajax:function(origSettings){var s=jQuery.extend(true,{},jQuery.ajaxSettings,origSettings);var jsonp,status,data,callbackContext=origSettings&&origSettings.context||s,type=s.type.toUpperCase();if(s.data&&s.processData&&typeof s.data!=="string"){s.data=jQuery.param(s.data,s.traditional)}if(s.dataType==="jsonp"){if(type==="GET"){if(!jsre.test(s.url)){s.url+=(rquery.test(s.url)?"&":"?")+(s.jsonp||"callback")+"=?"}}else{if(!s.data||!jsre.test(s.data)){s.data=(s.data?s.data+"&":"")+(s.jsonp||"callback")+"=?"}}s.dataType="json"}if(s.dataType==="json"&&(s.data&&jsre.test(s.data)||jsre.test(s.url))){jsonp=s.jsonpCallback||("jsonp"+jsc++);if(s.data){s.data=(s.data+"").replace(jsre,"="+jsonp+"$1")}s.url=s.url.replace(jsre,"="+jsonp+"$1");s.dataType="script";window[jsonp]=window[jsonp]||function(tmp){data=tmp;success();complete();window[jsonp]=undefined;try{delete window[jsonp]}catch(e){}if(head){head.removeChild(script)}}}if(s.dataType==="script"&&s.cache===null){s.cache=false}if(s.cache===false&&type==="GET"){var ts=now();var ret=s.url.replace(rts,"$1_="+ts+"$2");s.url=ret+((ret===s.url)?(rquery.test(s.url)?"&":"?")+"_="+ts:"")}if(s.data&&type==="GET"){s.url+=(rquery.test(s.url)?"&":"?")+s.data}if(s.global&&!jQuery.active++){jQuery.event.trigger("ajaxStart")}var parts=rurl.exec(s.url),remote=parts&&(parts[1]&&parts[1]!==location.protocol||parts[2]!==location.host);if(s.dataType==="script"&&type==="GET"&&remote){var head=document.getElementsByTagName("head")[0]||document.documentElement;var script=document.createElement("script");script.src=s.url;if(s.scriptCharset){script.charset=s.scriptCharset}if(!jsonp){var done=false;script.onload=script.onreadystatechange=function(){if(!done&&(!this.readyState||this.readyState==="loaded"||this.readyState==="complete")){done=true;success();complete();script.onload=script.onreadystatechange=null;if(head&&script.parentNode){head.removeChild(script)}}}}head.insertBefore(script,head.firstChild);return undefined}var requestDone=false;var xhr=s.xhr();if(!xhr){return }if(s.username){xhr.open(type,s.url,s.async,s.username,s.password)}else{xhr.open(type,s.url,s.async)}try{if(s.data||origSettings&&origSettings.contentType){xhr.setRequestHeader("Content-Type",s.contentType)}if(s.ifModified){if(jQuery.lastModified[s.url]){xhr.setRequestHeader("If-Modified-Since",jQuery.lastModified[s.url])}if(jQuery.etag[s.url]){xhr.setRequestHeader("If-None-Match",jQuery.etag[s.url])}}if(!remote){xhr.setRequestHeader("X-Requested-With","XMLHttpRequest")}xhr.setRequestHeader("Accept",s.dataType&&s.accepts[s.dataType]?s.accepts[s.dataType]+", */*":s.accepts._default)}catch(e){}if(s.beforeSend&&s.beforeSend.call(callbackContext,xhr,s)===false){if(s.global&&!--jQuery.active){jQuery.event.trigger("ajaxStop")}xhr.abort();return false}if(s.global){trigger("ajaxSend",[xhr,s])}var onreadystatechange=xhr.onreadystatechange=function(isTimeout){if(!xhr||xhr.readyState===0||isTimeout==="abort"){if(!requestDone){complete()}requestDone=true;if(xhr){xhr.onreadystatechange=jQuery.noop}}else{if(!requestDone&&xhr&&(xhr.readyState===4||isTimeout==="timeout")){requestDone=true;xhr.onreadystatechange=jQuery.noop;status=isTimeout==="timeout"?"timeout":!jQuery.httpSuccess(xhr)?"error":s.ifModified&&jQuery.httpNotModified(xhr,s.url)?"notmodified":"success";var errMsg;if(status==="success"){try{data=jQuery.httpData(xhr,s.dataType,s)}catch(err){status="parsererror";errMsg=err}}if(status==="success"||status==="notmodified"){if(!jsonp){success()}}else{jQuery.handleError(s,xhr,status,errMsg)}complete();if(isTimeout==="timeout"){xhr.abort()}if(s.async){xhr=null}}}};try{var oldAbort=xhr.abort;xhr.abort=function(){if(xhr){oldAbort.call(xhr)}onreadystatechange("abort")}}catch(e){}if(s.async&&s.timeout>0){setTimeout(function(){if(xhr&&!requestDone){onreadystatechange("timeout")}},s.timeout)}try{xhr.send(type==="POST"||type==="PUT"||type==="DELETE"?s.data:null)}catch(e){jQuery.handleError(s,xhr,null,e);complete()}if(!s.async){onreadystatechange()}function success(){if(s.success){s.success.call(callbackContext,data,status,xhr)}if(s.global){trigger("ajaxSuccess",[xhr,s])}}function complete(){if(s.complete){s.complete.call(callbackContext,xhr,status)}if(s.global){trigger("ajaxComplete",[xhr,s])}if(s.global&&!--jQuery.active){jQuery.event.trigger("ajaxStop")}}function trigger(type,args){(s.context?jQuery(s.context):jQuery.event).trigger(type,args)}return xhr},handleError:function(s,xhr,status,e){if(s.error){s.error.call(s.context||s,xhr,status,e)}if(s.global){(s.context?jQuery(s.context):jQuery.event).trigger("ajaxError",[xhr,s,e])}},active:0,httpSuccess:function(xhr){try{return !xhr.status&&location.protocol==="file:"||(xhr.status>=200&&xhr.status<300)||xhr.status===304||xhr.status===1223||xhr.status===0}catch(e){}return false},httpNotModified:function(xhr,url){var lastModified=xhr.getResponseHeader("Last-Modified"),etag=xhr.getResponseHeader("Etag");if(lastModified){jQuery.lastModified[url]=lastModified}if(etag){jQuery.etag[url]=etag}return xhr.status===304||xhr.status===0},httpData:function(xhr,type,s){var ct=xhr.getResponseHeader("content-type")||"",xml=type==="xml"||!type&&ct.indexOf("xml")>=0,data=xml?xhr.responseXML:xhr.responseText;if(xml&&data.documentElement.nodeName==="parsererror"){jQuery.error("parsererror")}if(s&&s.dataFilter){data=s.dataFilter(data,type)}if(typeof data==="string"){if(type==="json"||!type&&ct.indexOf("json")>=0){data=jQuery.parseJSON(data)}else{if(type==="script"||!type&&ct.indexOf("javascript")>=0){jQuery.globalEval(data)}}}return data},param:function(a,traditional){var s=[];if(traditional===undefined){traditional=jQuery.ajaxSettings.traditional}if(jQuery.isArray(a)||a.jquery){jQuery.each(a,function(){add(this.name,this.value)})}else{for(var prefix in a){buildParams(prefix,a[prefix])}}return s.join("&").replace(r20,"+");function buildParams(prefix,obj){if(jQuery.isArray(obj)){jQuery.each(obj,function(i,v){if(traditional||/\[\]$/.test(prefix)){add(prefix,v)}else{buildParams(prefix+"["+(typeof v==="object"||jQuery.isArray(v)?i:"")+"]",v)}})}else{if(!traditional&&obj!=null&&typeof obj==="object"){jQuery.each(obj,function(k,v){buildParams(prefix+"["+k+"]",v)})}else{add(prefix,obj)}}}function add(key,value){value=jQuery.isFunction(value)?value():value;s[s.length]=encodeURIComponent(key)+"="+encodeURIComponent(value)}}});var elemdisplay={},rfxtypes=/toggle|show|hide/,rfxnum=/^([+-]=)?([\d+-.]+)(.*)$/,timerId,fxAttrs=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]];jQuery.fn.extend({show:function(speed,callback){if(speed||speed===0){return this.animate(genFx("show",3),speed,callback)}else{for(var i=0,l=this.length;i<l;i++){var old=jQuery.data(this[i],"olddisplay");this[i].style.display=old||"";if(jQuery.css(this[i],"display")==="none"){var nodeName=this[i].nodeName,display;if(elemdisplay[nodeName]){display=elemdisplay[nodeName]}else{var elem=jQuery("<"+nodeName+" />").appendTo("body");display=elem.css("display");if(display==="none"){display="block"}elem.remove();elemdisplay[nodeName]=display}jQuery.data(this[i],"olddisplay",display)}}for(var j=0,k=this.length;j<k;j++){this[j].style.display=jQuery.data(this[j],"olddisplay")||""}return this}},hide:function(speed,callback){if(speed||speed===0){return this.animate(genFx("hide",3),speed,callback)}else{for(var i=0,l=this.length;i<l;i++){var old=jQuery.data(this[i],"olddisplay");if(!old&&old!=="none"){jQuery.data(this[i],"olddisplay",jQuery.css(this[i],"display"))}}for(var j=0,k=this.length;j<k;j++){this[j].style.display="none"}return this}},_toggle:jQuery.fn.toggle,toggle:function(fn,fn2){var bool=typeof fn==="boolean";if(jQuery.isFunction(fn)&&jQuery.isFunction(fn2)){this._toggle.apply(this,arguments)}else{if(fn==null||bool){this.each(function(){var state=bool?fn:jQuery(this).is(":hidden");jQuery(this)[state?"show":"hide"]()})}else{this.animate(genFx("toggle",3),fn,fn2)}}return this},fadeTo:function(speed,to,callback){return this.filter(":hidden").css("opacity",0).show().end().animate({opacity:to},speed,callback)},animate:function(prop,speed,easing,callback){var optall=jQuery.speed(speed,easing,callback);if(jQuery.isEmptyObject(prop)){return this.each(optall.complete)}return this[optall.queue===false?"each":"queue"](function(){var opt=jQuery.extend({},optall),p,hidden=this.nodeType===1&&jQuery(this).is(":hidden"),self=this;for(p in prop){var name=p.replace(rdashAlpha,fcamelCase);if(p!==name){prop[name]=prop[p];delete prop[p];p=name}if(prop[p]==="hide"&&hidden||prop[p]==="show"&&!hidden){return opt.complete.call(this)}if((p==="height"||p==="width")&&this.style){opt.display=jQuery.css(this,"display");opt.overflow=this.style.overflow}if(jQuery.isArray(prop[p])){(opt.specialEasing=opt.specialEasing||{})[p]=prop[p][1];prop[p]=prop[p][0]}}if(opt.overflow!=null){this.style.overflow="hidden"}opt.curAnim=jQuery.extend({},prop);jQuery.each(prop,function(name,val){var e=new jQuery.fx(self,opt,name);if(rfxtypes.test(val)){e[val==="toggle"?hidden?"show":"hide":val](prop)}else{var parts=rfxnum.exec(val),start=e.cur(true)||0;if(parts){var end=parseFloat(parts[2]),unit=parts[3]||"px";if(unit!=="px"){self.style[name]=(end||1)+unit;start=((end||1)/e.cur(true))*start;self.style[name]=start+unit}if(parts[1]){end=((parts[1]==="-="?-1:1)*end)+start}e.custom(start,end,unit)}else{e.custom(start,val,"")}}});return true})},stop:function(clearQueue,gotoEnd){var timers=jQuery.timers;if(clearQueue){this.queue([])}this.each(function(){for(var i=timers.length-1;i>=0;i--){if(timers[i].elem===this){if(gotoEnd){timers[i](true)}timers.splice(i,1)}}});if(!gotoEnd){this.dequeue()}return this}});jQuery.each({slideDown:genFx("show",1),slideUp:genFx("hide",1),slideToggle:genFx("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"}},function(name,props){jQuery.fn[name]=function(speed,callback){return this.animate(props,speed,callback)}});jQuery.extend({speed:function(speed,easing,fn){var opt=speed&&typeof speed==="object"?speed:{complete:fn||!fn&&easing||jQuery.isFunction(speed)&&speed,duration:speed,easing:fn&&easing||easing&&!jQuery.isFunction(easing)&&easing};opt.duration=jQuery.fx.off?0:typeof opt.duration==="number"?opt.duration:jQuery.fx.speeds[opt.duration]||jQuery.fx.speeds._default;opt.old=opt.complete;opt.complete=function(){if(opt.queue!==false){jQuery(this).dequeue()}if(jQuery.isFunction(opt.old)){opt.old.call(this)}};return opt},easing:{linear:function(p,n,firstNum,diff){return firstNum+diff*p},swing:function(p,n,firstNum,diff){return((-Math.cos(p*Math.PI)/2)+0.5)*diff+firstNum}},timers:[],fx:function(elem,options,prop){this.options=options;this.elem=elem;this.prop=prop;if(!options.orig){options.orig={}}}});jQuery.fx.prototype={update:function(){if(this.options.step){this.options.step.call(this.elem,this.now,this)}(jQuery.fx.step[this.prop]||jQuery.fx.step._default)(this);if((this.prop==="height"||this.prop==="width")&&this.elem.style){this.elem.style.display="block"}},cur:function(force){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null)){return this.elem[this.prop]}var r=parseFloat(jQuery.css(this.elem,this.prop,force));return r&&r>-10000?r:parseFloat(jQuery.curCSS(this.elem,this.prop))||0},custom:function(from,to,unit){this.startTime=now();this.start=from;this.end=to;this.unit=unit||this.unit||"px";this.now=this.start;this.pos=this.state=0;var self=this;function t(gotoEnd){return self.step(gotoEnd)}t.elem=this.elem;if(t()&&jQuery.timers.push(t)&&!timerId){timerId=setInterval(jQuery.fx.tick,13)}},show:function(){this.options.orig[this.prop]=jQuery.style(this.elem,this.prop);this.options.show=true;this.custom(this.prop==="width"||this.prop==="height"?1:0,this.cur());jQuery(this.elem).show()},hide:function(){this.options.orig[this.prop]=jQuery.style(this.elem,this.prop);this.options.hide=true;this.custom(this.cur(),0)},step:function(gotoEnd){var t=now(),done=true;if(gotoEnd||t>=this.options.duration+this.startTime){this.now=this.end;this.pos=this.state=1;this.update();this.options.curAnim[this.prop]=true;for(var i in this.options.curAnim){if(this.options.curAnim[i]!==true){done=false}}if(done){if(this.options.display!=null){this.elem.style.overflow=this.options.overflow;var old=jQuery.data(this.elem,"olddisplay");this.elem.style.display=old?old:this.options.display;if(jQuery.css(this.elem,"display")==="none"){this.elem.style.display="block"}}if(this.options.hide){jQuery(this.elem).hide()}if(this.options.hide||this.options.show){for(var p in this.options.curAnim){jQuery.style(this.elem,p,this.options.orig[p])}}this.options.complete.call(this.elem)}return false}else{var n=t-this.startTime;this.state=n/this.options.duration;var specialEasing=this.options.specialEasing&&this.options.specialEasing[this.prop];var defaultEasing=this.options.easing||(jQuery.easing.swing?"swing":"linear");this.pos=jQuery.easing[specialEasing||defaultEasing](this.state,n,0,1,this.options.duration);this.now=this.start+((this.end-this.start)*this.pos);this.update()}return true}};jQuery.extend(jQuery.fx,{tick:function(){var timers=jQuery.timers;for(var i=0;i<timers.length;i++){if(!timers[i]()){timers.splice(i--,1)}}if(!timers.length){jQuery.fx.stop()}},stop:function(){clearInterval(timerId);timerId=null},speeds:{slow:600,fast:200,_default:400},step:{opacity:function(fx){jQuery.style(fx.elem,"opacity",fx.now)},_default:function(fx){if(fx.elem.style&&fx.elem.style[fx.prop]!=null){fx.elem.style[fx.prop]=(fx.prop==="width"||fx.prop==="height"?Math.max(0,fx.now):fx.now)+fx.unit}else{fx.elem[fx.prop]=fx.now}}}});if(jQuery.expr&&jQuery.expr.filters){jQuery.expr.filters.animated=function(elem){return jQuery.grep(jQuery.timers,function(fn){return elem===fn.elem}).length}}function genFx(type,num){var obj={};jQuery.each(fxAttrs.concat.apply([],fxAttrs.slice(0,num)),function(){obj[this]=type});return obj}if("getBoundingClientRect" in document.documentElement){jQuery.fn.offset=function(options){var elem=this[0];if(options){return this.each(function(i){jQuery.offset.setOffset(this,options,i)})}if(!elem||!elem.ownerDocument){return null}if(elem===elem.ownerDocument.body){return jQuery.offset.bodyOffset(elem)}var box=elem.getBoundingClientRect(),doc=elem.ownerDocument,body=doc.body,docElem=doc.documentElement,clientTop=docElem.clientTop||body.clientTop||0,clientLeft=docElem.clientLeft||body.clientLeft||0,top=box.top+(self.pageYOffset||jQuery.support.boxModel&&docElem.scrollTop||body.scrollTop)-clientTop,left=box.left+(self.pageXOffset||jQuery.support.boxModel&&docElem.scrollLeft||body.scrollLeft)-clientLeft;return{top:top,left:left}}}else{jQuery.fn.offset=function(options){var elem=this[0];if(options){return this.each(function(i){jQuery.offset.setOffset(this,options,i)})}if(!elem||!elem.ownerDocument){return null}if(elem===elem.ownerDocument.body){return jQuery.offset.bodyOffset(elem)}jQuery.offset.initialize();var offsetParent=elem.offsetParent,prevOffsetParent=elem,doc=elem.ownerDocument,computedStyle,docElem=doc.documentElement,body=doc.body,defaultView=doc.defaultView,prevComputedStyle=defaultView?defaultView.getComputedStyle(elem,null):elem.currentStyle,top=elem.offsetTop,left=elem.offsetLeft;while((elem=elem.parentNode)&&elem!==body&&elem!==docElem){if(jQuery.offset.supportsFixedPosition&&prevComputedStyle.position==="fixed"){break}computedStyle=defaultView?defaultView.getComputedStyle(elem,null):elem.currentStyle;top-=elem.scrollTop;left-=elem.scrollLeft;if(elem===offsetParent){top+=elem.offsetTop;left+=elem.offsetLeft;if(jQuery.offset.doesNotAddBorder&&!(jQuery.offset.doesAddBorderForTableAndCells&&/^t(able|d|h)$/i.test(elem.nodeName))){top+=parseFloat(computedStyle.borderTopWidth)||0;left+=parseFloat(computedStyle.borderLeftWidth)||0}prevOffsetParent=offsetParent,offsetParent=elem.offsetParent}if(jQuery.offset.subtractsBorderForOverflowNotVisible&&computedStyle.overflow!=="visible"){top+=parseFloat(computedStyle.borderTopWidth)||0;left+=parseFloat(computedStyle.borderLeftWidth)||0}prevComputedStyle=computedStyle}if(prevComputedStyle.position==="relative"||prevComputedStyle.position==="static"){top+=body.offsetTop;left+=body.offsetLeft}if(jQuery.offset.supportsFixedPosition&&prevComputedStyle.position==="fixed"){top+=Math.max(docElem.scrollTop,body.scrollTop);left+=Math.max(docElem.scrollLeft,body.scrollLeft)}return{top:top,left:left}}}jQuery.offset={initialize:function(){var body=document.body,container=document.createElement("div"),innerDiv,checkDiv,table,td,bodyMarginTop=parseFloat(jQuery.curCSS(body,"marginTop",true))||0,html="<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";jQuery.extend(container.style,{position:"absolute",top:0,left:0,margin:0,border:0,width:"1px",height:"1px",visibility:"hidden"});container.innerHTML=html;body.insertBefore(container,body.firstChild);innerDiv=container.firstChild;checkDiv=innerDiv.firstChild;td=innerDiv.nextSibling.firstChild.firstChild;this.doesNotAddBorder=(checkDiv.offsetTop!==5);this.doesAddBorderForTableAndCells=(td.offsetTop===5);checkDiv.style.position="fixed",checkDiv.style.top="20px";this.supportsFixedPosition=(checkDiv.offsetTop===20||checkDiv.offsetTop===15);checkDiv.style.position=checkDiv.style.top="";innerDiv.style.overflow="hidden",innerDiv.style.position="relative";this.subtractsBorderForOverflowNotVisible=(checkDiv.offsetTop===-5);this.doesNotIncludeMarginInBodyOffset=(body.offsetTop!==bodyMarginTop);body.removeChild(container);body=container=innerDiv=checkDiv=table=td=null;jQuery.offset.initialize=jQuery.noop},bodyOffset:function(body){var top=body.offsetTop,left=body.offsetLeft;jQuery.offset.initialize();if(jQuery.offset.doesNotIncludeMarginInBodyOffset){top+=parseFloat(jQuery.curCSS(body,"marginTop",true))||0;left+=parseFloat(jQuery.curCSS(body,"marginLeft",true))||0}return{top:top,left:left}},setOffset:function(elem,options,i){if(/static/.test(jQuery.curCSS(elem,"position"))){elem.style.position="relative"}var curElem=jQuery(elem),curOffset=curElem.offset(),curTop=parseInt(jQuery.curCSS(elem,"top",true),10)||0,curLeft=parseInt(jQuery.curCSS(elem,"left",true),10)||0;if(jQuery.isFunction(options)){options=options.call(elem,i,curOffset)}var props={top:(options.top-curOffset.top)+curTop,left:(options.left-curOffset.left)+curLeft};if("using" in options){options.using.call(elem,props)}else{curElem.css(props)}}};jQuery.fn.extend({position:function(){if(!this[0]){return null}var elem=this[0],offsetParent=this.offsetParent(),offset=this.offset(),parentOffset=/^body|html$/i.test(offsetParent[0].nodeName)?{top:0,left:0}:offsetParent.offset();offset.top-=parseFloat(jQuery.curCSS(elem,"marginTop",true))||0;offset.left-=parseFloat(jQuery.curCSS(elem,"marginLeft",true))||0;parentOffset.top+=parseFloat(jQuery.curCSS(offsetParent[0],"borderTopWidth",true))||0;parentOffset.left+=parseFloat(jQuery.curCSS(offsetParent[0],"borderLeftWidth",true))||0;return{top:offset.top-parentOffset.top,left:offset.left-parentOffset.left}},offsetParent:function(){return this.map(function(){var offsetParent=this.offsetParent||document.body;while(offsetParent&&(!/^body|html$/i.test(offsetParent.nodeName)&&jQuery.css(offsetParent,"position")==="static")){offsetParent=offsetParent.offsetParent}return offsetParent})}});jQuery.each(["Left","Top"],function(i,name){var method="scroll"+name;jQuery.fn[method]=function(val){var elem=this[0],win;if(!elem){return null}if(val!==undefined){return this.each(function(){win=getWindow(this);if(win){win.scrollTo(!i?val:jQuery(win).scrollLeft(),i?val:jQuery(win).scrollTop())}else{this[method]=val}})}else{win=getWindow(elem);return win?("pageXOffset" in win)?win[i?"pageYOffset":"pageXOffset"]:jQuery.support.boxModel&&win.document.documentElement[method]||win.document.body[method]:elem[method]}}});function getWindow(elem){return("scrollTo" in elem&&elem.document)?elem:elem.nodeType===9?elem.defaultView||elem.parentWindow:false}jQuery.each(["Height","Width"],function(i,name){var type=name.toLowerCase();jQuery.fn["inner"+name]=function(){return this[0]?jQuery.css(this[0],type,false,"padding"):null};jQuery.fn["outer"+name]=function(margin){return this[0]?jQuery.css(this[0],type,false,margin?"margin":"border"):null};jQuery.fn[type]=function(size){var elem=this[0];if(!elem){return size==null?null:this}if(jQuery.isFunction(size)){return this.each(function(i){var self=jQuery(this);self[type](size.call(this,i,self[type]()))})}return("scrollTo" in elem&&elem.document)?elem.document.compatMode==="CSS1Compat"&&elem.document.documentElement["client"+name]||elem.document.body["client"+name]:(elem.nodeType===9)?Math.max(elem.documentElement["client"+name],elem.body["scroll"+name],elem.documentElement["scroll"+name],elem.body["offset"+name],elem.documentElement["offset"+name]):size===undefined?jQuery.css(elem,type):this.css(type,typeof size==="string"?size:size+"px")}});window.jQuery=window.$=jQuery})(window);/*
 * jQuery UI 1.8
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI
 */
jQuery.ui||(function($){$.ui={version:"1.8",plugin:{add:function(module,option,set){var proto=$.ui[module].prototype;for(var i in set){proto.plugins[i]=proto.plugins[i]||[];proto.plugins[i].push([option,set[i]])}},call:function(instance,name,args){var set=instance.plugins[name];if(!set||!instance.element[0].parentNode){return }for(var i=0;i<set.length;i++){if(instance.options[set[i][0]]){set[i][1].apply(instance.element,args)}}}},contains:function(a,b){return document.compareDocumentPosition?a.compareDocumentPosition(b)&16:a!==b&&a.contains(b)},hasScroll:function(el,a){if($(el).css("overflow")=="hidden"){return false}var scroll=(a&&a=="left")?"scrollLeft":"scrollTop",has=false;if(el[scroll]>0){return true}el[scroll]=1;has=(el[scroll]>0);el[scroll]=0;return has},isOverAxis:function(x,reference,size){return(x>reference)&&(x<(reference+size))},isOver:function(y,x,top,left,height,width){return $.ui.isOverAxis(y,top,height)&&$.ui.isOverAxis(x,left,width)},keyCode:{BACKSPACE:8,CAPS_LOCK:20,COMMA:188,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38}};$.fn.extend({_focus:$.fn.focus,focus:function(delay,fn){return typeof delay==="number"?this.each(function(){var elem=this;setTimeout(function(){$(elem).focus();(fn&&fn.call(elem))},delay)}):this._focus.apply(this,arguments)},enableSelection:function(){return this.attr("unselectable","off").css("MozUserSelect","").unbind("selectstart.ui")},disableSelection:function(){return this.attr("unselectable","on").css("MozUserSelect","none").bind("selectstart.ui",function(){return false})},scrollParent:function(){var scrollParent;if(($.browser.msie&&(/(static|relative)/).test(this.css("position")))||(/absolute/).test(this.css("position"))){scrollParent=this.parents().filter(function(){return(/(relative|absolute|fixed)/).test($.curCSS(this,"position",1))&&(/(auto|scroll)/).test($.curCSS(this,"overflow",1)+$.curCSS(this,"overflow-y",1)+$.curCSS(this,"overflow-x",1))}).eq(0)}else{scrollParent=this.parents().filter(function(){return(/(auto|scroll)/).test($.curCSS(this,"overflow",1)+$.curCSS(this,"overflow-y",1)+$.curCSS(this,"overflow-x",1))}).eq(0)}return(/fixed/).test(this.css("position"))||!scrollParent.length?$(document):scrollParent},zIndex:function(zIndex){if(zIndex!==undefined){return this.css("zIndex",zIndex)}if(this.length){var elem=$(this[0]),position,value;while(elem.length&&elem[0]!==document){position=elem.css("position");if(position=="absolute"||position=="relative"||position=="fixed"){value=parseInt(elem.css("zIndex"));if(!isNaN(value)&&value!=0){return value}}elem=elem.parent()}}return 0}});$.extend($.expr[":"],{data:function(elem,i,match){return !!$.data(elem,match[3])},focusable:function(element){var nodeName=element.nodeName.toLowerCase(),tabIndex=$.attr(element,"tabindex");return(/input|select|textarea|button|object/.test(nodeName)?!element.disabled:"a"==nodeName||"area"==nodeName?element.href||!isNaN(tabIndex):!isNaN(tabIndex))&&!$(element)["area"==nodeName?"parents":"closest"](":hidden").length},tabbable:function(element){var tabIndex=$.attr(element,"tabindex");return(isNaN(tabIndex)||tabIndex>=0)&&$(element).is(":focusable")}})})(jQuery);/*
 * jQuery UI Widget 1.8
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Widget
 */
(function($){var _remove=$.fn.remove;$.fn.remove=function(selector,keepData){return this.each(function(){if(!keepData){if(!selector||$.filter(selector,[this]).length){$("*",this).add(this).each(function(){$(this).triggerHandler("remove")})}}return _remove.call($(this),selector,keepData)})};$.widget=function(name,base,prototype){var namespace=name.split(".")[0],fullName;name=name.split(".")[1];fullName=namespace+"-"+name;if(!prototype){prototype=base;base=$.Widget}$.expr[":"][fullName]=function(elem){return !!$.data(elem,name)};$[namespace]=$[namespace]||{};$[namespace][name]=function(options,element){if(arguments.length){this._createWidget(options,element)}};var basePrototype=new base();basePrototype.options=$.extend({},basePrototype.options);$[namespace][name].prototype=$.extend(true,basePrototype,{namespace:namespace,widgetName:name,widgetEventPrefix:$[namespace][name].prototype.widgetEventPrefix||name,widgetBaseClass:fullName},prototype);$.widget.bridge(name,$[namespace][name])};$.widget.bridge=function(name,object){$.fn[name]=function(options){var isMethodCall=typeof options==="string",args=Array.prototype.slice.call(arguments,1),returnValue=this;options=!isMethodCall&&args.length?$.extend.apply(null,[true,options].concat(args)):options;if(isMethodCall&&options.substring(0,1)==="_"){return returnValue}if(isMethodCall){this.each(function(){var instance=$.data(this,name),methodValue=instance&&$.isFunction(instance[options])?instance[options].apply(instance,args):instance;if(methodValue!==instance&&methodValue!==undefined){returnValue=methodValue;return false}})}else{this.each(function(){var instance=$.data(this,name);if(instance){if(options){instance.option(options)}instance._init()}else{$.data(this,name,new object(options,this))}})}return returnValue}};$.Widget=function(options,element){if(arguments.length){this._createWidget(options,element)}};$.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",options:{disabled:false},_createWidget:function(options,element){this.element=$(element).data(this.widgetName,this);this.options=$.extend(true,{},this.options,$.metadata&&$.metadata.get(element)[this.widgetName],options);var self=this;this.element.bind("remove."+this.widgetName,function(){self.destroy()});this._create();this._init()},_create:function(){},_init:function(){},destroy:function(){this.element.unbind("."+this.widgetName).removeData(this.widgetName);this.widget().unbind("."+this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass+"-disabled "+this.namespace+"-state-disabled")},widget:function(){return this.element},option:function(key,value){var options=key,self=this;if(arguments.length===0){return $.extend({},self.options)}if(typeof key==="string"){if(value===undefined){return this.options[key]}options={};options[key]=value}$.each(options,function(key,value){self._setOption(key,value)});return self},_setOption:function(key,value){this.options[key]=value;if(key==="disabled"){this.widget()[value?"addClass":"removeClass"](this.widgetBaseClass+"-disabled "+this.namespace+"-state-disabled").attr("aria-disabled",value)}return this},enable:function(){return this._setOption("disabled",false)},disable:function(){return this._setOption("disabled",true)},_trigger:function(type,event,data){var callback=this.options[type];event=$.Event(event);event.type=(type===this.widgetEventPrefix?type:this.widgetEventPrefix+type).toLowerCase();data=data||{};if(event.originalEvent){for(var i=$.event.props.length,prop;i;){prop=$.event.props[--i];event[prop]=event.originalEvent[prop]}}this.element.trigger(event,data);return !($.isFunction(callback)&&callback.call(this.element[0],event,data)===false||event.isDefaultPrevented())}}})(jQuery);/*
 * jQuery UI Mouse 1.8
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Mouse
 *
 * Depends:
 *	jquery.ui.widget.js
 */(function ($) {
    $.widget("ui.mouse", {
        options: {
            cancel: ":input,option",
            distance: 1,
            delay: 0
        },
        _mouseInit: function () {
            var self = this;
            this.element.bind("mousedown." + this.widgetName, function (event) {
                return self._mouseDown(event)
            }).bind("click." + this.widgetName, function (event) {
                if (self._preventClickEvent) {
                    self._preventClickEvent = false;
                    event.stopImmediatePropagation();
                    return false
                }
            });
            this.started = false
        },
        _mouseDestroy: function () {
            this.element.unbind("." + this.widgetName)
        },
        _mouseDown: function (event) {
            event.originalEvent = event.originalEvent || {};
            if (event.originalEvent.mouseHandled) {
                return
            }(this._mouseStarted && this._mouseUp(event));
            this._mouseDownEvent = event;
            var self = this,
                btnIsLeft = (event.which == 1),
                elIsCancel = (typeof this.options.cancel == "string" ? $(event.target).parents().add(event.target).filter(this.options.cancel).length : false);
            if (!btnIsLeft || elIsCancel || !this._mouseCapture(event)) {
                return true
            }
            this.mouseDelayMet = !this.options.delay;
            if (!this.mouseDelayMet) {
                this._mouseDelayTimer = setTimeout(function () {
                    self.mouseDelayMet = true
                }, this.options.delay)
            }
            if (this._mouseDistanceMet(event) && this._mouseDelayMet(event)) {
                this._mouseStarted = (this._mouseStart(event) !== false);
                if (!this._mouseStarted) {
                    event.preventDefault();
                    return true
                }
            }
            this._mouseMoveDelegate = function (event) {
                return self._mouseMove(event)
            };
            this._mouseUpDelegate = function (event) {
                return self._mouseUp(event)
            };
            $(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate);
            ($.browser.safari || event.preventDefault());
            event.originalEvent.mouseHandled = true;
            return true
        },
        _mouseMove: function (event) {
            if ($.browser.msie && !event.button) {
                return this._mouseUp(event)
            }
            if (this._mouseStarted) {
                this._mouseDrag(event);
                return event.preventDefault()
            }
            if (this._mouseDistanceMet(event) && this._mouseDelayMet(event)) {
                this._mouseStarted = (this._mouseStart(this._mouseDownEvent, event) !== false);
                (this._mouseStarted ? this._mouseDrag(event) : this._mouseUp(event))
            }
            return !this._mouseStarted
        },
        _mouseUp: function (event) {
            $(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
            if (this._mouseStarted) {
                this._mouseStarted = false;
                this._preventClickEvent = (event.target == this._mouseDownEvent.target);
                this._mouseStop(event)
            }
            return false
        },
        _mouseDistanceMet: function (event) {
            return (Math.max(Math.abs(this._mouseDownEvent.pageX - event.pageX), Math.abs(this._mouseDownEvent.pageY - event.pageY)) >= this.options.distance)
        },
        _mouseDelayMet: function (event) {
            return this.mouseDelayMet
        },
        _mouseStart: function (event) {},
        _mouseDrag: function (event) {},
        _mouseStop: function (event) {},
        _mouseCapture: function (event) {
            return true
        }
    })
})(jQuery);
(function ($) {
    $.ui = $.ui || {};
    var horizontalPositions = /left|center|right/,
        horizontalDefault = "center",
        verticalPositions = /top|center|bottom/,
        verticalDefault = "center",
        _position = $.fn.position,
        _offset = $.fn.offset;
    $.fn.position = function (options) {
        if (!options || !options.of) {
            return _position.apply(this, arguments)
        }
        options = $.extend({}, options);
        var target = $(options.of),
            collision = (options.collision || "flip").split(" "),
            offset = options.offset ? options.offset.split(" ") : [0, 0],
            targetWidth, targetHeight, basePosition;
        if (options.of.nodeType === 9) {
            targetWidth = target.width();
            targetHeight = target.height();
            basePosition = {
                top: 0,
                left: 0
            }
        } else {
            if (options.of.scrollTo && options.of.document) {
                targetWidth = target.width();
                targetHeight = target.height();
                basePosition = {
                    top: target.scrollTop(),
                    left: target.scrollLeft()
                }
            } else {
                if (options.of.preventDefault) {
                    options.at = "left top";
                    targetWidth = targetHeight = 0;
                    basePosition = {
                        top: options.of.pageY,
                        left: options.of.pageX
                    }
                } else {
                    targetWidth = target.outerWidth();
                    targetHeight = target.outerHeight();
                    basePosition = target.offset()
                }
            }
        }
        $.each(["my", "at"], function () {
            var pos = (options[this] || "").split(" ");
            if (pos.length === 1) {
                pos = horizontalPositions.test(pos[0]) ? pos.concat([verticalDefault]) : verticalPositions.test(pos[0]) ? [horizontalDefault].concat(pos) : [horizontalDefault, verticalDefault]
            }
            pos[0] = horizontalPositions.test(pos[0]) ? pos[0] : horizontalDefault;
            pos[1] = verticalPositions.test(pos[1]) ? pos[1] : verticalDefault;
            options[this] = pos
        });
        if (collision.length === 1) {
            collision[1] = collision[0]
        }
        offset[0] = parseInt(offset[0], 10) || 0;
        if (offset.length === 1) {
            offset[1] = offset[0]
        }
        offset[1] = parseInt(offset[1], 10) || 0;
        if (options.at[0] === "right") {
            basePosition.left += targetWidth
        } else {
            if (options.at[0] === horizontalDefault) {
                basePosition.left += targetWidth / 2
            }
        }
        if (options.at[1] === "bottom") {
            basePosition.top += targetHeight
        } else {
            if (options.at[1] === verticalDefault) {
                basePosition.top += targetHeight / 2
            }
        }
        basePosition.left += offset[0];
        basePosition.top += offset[1];
        return this.each(function () {
            var elem = $(this),
                elemWidth = elem.outerWidth(),
                elemHeight = elem.outerHeight(),
                position = $.extend({}, basePosition);
            if (options.my[0] === "right") {
                position.left -= elemWidth
            } else {
                if (options.my[0] === horizontalDefault) {
                    position.left -= elemWidth / 2
                }
            }
            if (options.my[1] === "bottom") {
                position.top -= elemHeight
            } else {
                if (options.my[1] === verticalDefault) {
                    position.top -= elemHeight / 2
                }
            }
            $.each(["left", "top"], function (i, dir) {
                if ($.ui.position[collision[i]]) {
                    $.ui.position[collision[i]][dir](position, {
                        targetWidth: targetWidth,
                        targetHeight: targetHeight,
                        elemWidth: elemWidth,
                        elemHeight: elemHeight,
                        offset: offset,
                        my: options.my,
                        at: options.at
                    })
                }
            });
            if ($.fn.bgiframe) {
                elem.bgiframe()
            }
            elem.offset($.extend(position, {
                using: options.using
            }))
        })
    };
    $.ui.position = {
        fit: {
            left: function (position, data) {
                var win = $(window),
                    over = position.left + data.elemWidth - win.width() - win.scrollLeft();
                position.left = over > 0 ? position.left - over : Math.max(0, position.left)
            },
            top: function (position, data) {
                var win = $(window),
                    over = position.top + data.elemHeight - win.height() - win.scrollTop();
                position.top = over > 0 ? position.top - over : Math.max(0, position.top)
            }
        },
        flip: {
            left: function (position, data) {
                if (data.at[0] === "center") {
                    return
                }
                var win = $(window),
                    over = position.left + data.elemWidth - win.width() - win.scrollLeft(),
                    myOffset = data.my[0] === "left" ? -data.elemWidth : data.my[0] === "right" ? data.elemWidth : 0,
                    offset = -2 * data.offset[0];
                position.left += position.left < 0 ? myOffset + data.targetWidth + offset : over > 0 ? myOffset - data.targetWidth + offset : 0
            },
            top: function (position, data) {
                if (data.at[1] === "center") {
                    return
                }
                var win = $(window),
                    over = position.top + data.elemHeight - win.height() - win.scrollTop(),
                    myOffset = data.my[1] === "top" ? -data.elemHeight : data.my[1] === "bottom" ? data.elemHeight : 0,
                    atOffset = data.at[1] === "top" ? data.targetHeight : -data.targetHeight,
                    offset = -2 * data.offset[1];
                position.top += position.top < 0 ? myOffset + data.targetHeight + offset : over > 0 ? myOffset + atOffset + offset : 0
            }
        }
    };
    if (!$.offset.setOffset) {
        $.offset.setOffset = function (elem, options) {
            if (/static/.test($.curCSS(elem, "position"))) {
                elem.style.position = "relative"
            }
            var curElem = $(elem),
                curOffset = curElem.offset(),
                curTop = parseInt($.curCSS(elem, "top", true), 10) || 0,
                curLeft = parseInt($.curCSS(elem, "left", true), 10) || 0,
                props = {
                    top: (options.top - curOffset.top) + curTop,
                    left: (options.left - curOffset.left) + curLeft
                };
            if ("using" in options) {
                options.using.call(elem, props)
            } else {
                curElem.css(props)
            }
        };
        $.fn.offset = function (options) {
            var elem = this[0];
            if (!elem || !elem.ownerDocument) {
                return null
            }
            if (options) {
                return this.each(function () {
                    $.offset.setOffset(this, options)
                })
            }
            return _offset.call(this)
        }
    }
}(jQuery));
(function ($) {
    $.each({
        focus: "focusin",
        blur: "focusout"
    }, function (original, fix) {
        $.event.special[fix] = {
            setup: function () {
                if ($.browser.msie) {
                    return false
                }
                this.addEventListener(original, $.event.special[fix].handler, true)
            },
            teardown: function () {
                if ($.browser.msie) {
                    return false
                }
                this.removeEventListener(original, $.event.special[fix].handler, true)
            },
            handler: function (e) {
                arguments[0] = $.event.fix(e);
                arguments[0].type = fix;
                return $.event.handle.apply(this, arguments)
            }
        }
    });
    $.extend($.fn, {
        delegate: function (type, delegate, handler) {
            return this.bind(type, function (event) {
                var target = $(event.target);
                if (target.is(delegate)) {
                    return handler.apply(target, arguments)
                }
            })
        },
        triggerEvent: function (type, target) {
            return this.triggerHandler(type, [jQuery.event.fix({
                type: type,
                target: target
            })])
        }
    })
})(jQuery);
var fluid_1_2 = fluid_1_2 || {};
var fluid = fluid || fluid_1_2;
(function ($, fluid) {
    fluid.version = "Infusion 1.3-SNAPSHOT";
    fluid.environment = {
        fluid: fluid
    };
    var globalObject = window || {};
    fluid.fail = function (message) {
        fluid.setLogging(true);
        fluid.log(message.message ? message.message : message);
        throw new Error(message)
    };
    fluid.wrap = function (obj) {
        return ((!obj || obj.jquery) ? obj : $(obj))
    };
    fluid.unwrap = function (obj) {
        return obj && obj.jquery && obj.length === 1 ? obj[0] : obj
    };
    fluid.keyForValue = function (obj, value) {
        return fluid.find(obj, function (thisValue, key) {
            if (value === thisValue) {
                return key
            }
        })
    };
    fluid.findKeyInObject = fluid.keyForValue;
    fluid.clear = function (target) {
        if (target instanceof Array) {
            target.length = 0
        } else {
            for (var i in target) {
                delete target[i]
            }
        }
    };
    fluid.identity = function (arg) {
        return arg
    };
    fluid.container = function (containerSpec, fallible) {
        var container = fluid.wrap(containerSpec);
        if (fallible && !container || container.length === 0) {
            return null
        }
        if (!container || !container.jquery || container.length !== 1) {
            if (typeof(containerSpec) !== "string") {
                containerSpec = container.selector
            }
            var count = container.length !== undefined ? container.length : 0;
            fluid.fail({
                name: "NotOne",
                message: count > 1 ? "More than one (" + count + ") container elements were " : "No container element was found for selector " + containerSpec
            })
        }
        return container
    };
    fluid.dumpEl = fluid.identity;
    fluid.renderTimestamp = fluid.identity;
    var defaultsStore = {};
    var globalDefaultsStore = {};
    fluid.defaults = function () {
        var offset = 0;
        var store = defaultsStore;
        if (typeof arguments[0] === "boolean") {
            store = globalDefaultsStore;
            offset = 1
        }
        var componentName = arguments[offset];
        var defaultsObject = arguments[offset + 1];
        if (defaultsObject !== undefined) {
            store[componentName] = defaultsObject;
            return defaultsObject
        }
        return store[componentName]
    };
    fluid.createDomBinder = function (container, selectors) {
        var cache = {},
            that = {};

        function cacheKey(name, thisContainer) {
            return fluid.allocateSimpleId(thisContainer) + "-" + name
        }
        function record(name, thisContainer, result) {
            cache[cacheKey(name, thisContainer)] = result
        }
        that.locate = function (name, localContainer) {
            var selector, thisContainer, togo;
            selector = selectors[name];
            thisContainer = localContainer ? localContainer : container;
            if (!thisContainer) {
                fluid.fail("DOM binder invoked for selector " + name + " without container")
            }
            if (!selector) {
                return thisContainer
            }
            if (typeof(selector) === "function") {
                togo = $(selector.call(null, fluid.unwrap(thisContainer)))
            } else {
                togo = $(selector, thisContainer)
            }
            if (togo.get(0) === document) {
                togo = []
            }
            if (!togo.selector) {
                togo.selector = selector;
                togo.context = thisContainer
            }
            togo.selectorName = name;
            record(name, thisContainer, togo);
            return togo
        };
        that.fastLocate = function (name, localContainer) {
            var thisContainer = localContainer ? localContainer : container;
            var key = cacheKey(name, thisContainer);
            var togo = cache[key];
            return togo ? togo : that.locate(name, localContainer)
        };
        that.clear = function () {
            cache = {}
        };
        that.refresh = function (names, localContainer) {
            var thisContainer = localContainer ? localContainer : container;
            if (typeof names === "string") {
                names = [names]
            }
            if (thisContainer.length === undefined) {
                thisContainer = [thisContainer]
            }
            for (var i = 0; i < names.length; ++i) {
                for (var j = 0; j < thisContainer.length; ++j) {
                    that.locate(names[i], thisContainer[j])
                }
            }
        };
        that.resolvePathSegment = that.locate;
        return that
    };
    fluid.isArrayable = function (totest) {
        return typeof(totest) !== "string" && typeof(totest.length) === "number"
    };
    fluid.mergeListeners = function (events, listeners) {
        if (listeners) {
            for (var key in listeners) {
                var value = listeners[key];
                var keydot = key.indexOf(".");
                var namespace;
                if (keydot !== -1) {
                    namespace = key.substring(keydot + 1);
                    key = key.substring(0, keydot)
                }
                if (!events[key]) {
                    events[key] = fluid.event.getEventFirer()
                }
                var firer = events[key];
                if (typeof(value) === "function") {
                    firer.addListener(value, namespace)
                } else {
                    if (value && fluid.isArrayable(value)) {
                        for (var i = 0; i < value.length; ++i) {
                            firer.addListener(value[i], namespace)
                        }
                    }
                }
            }
        }
    };
    fluid.instantiateFirers = function (that, options) {
        that.events = {};
        if (options.events) {
            for (var event in options.events) {
                var eventType = options.events[event];
                that.events[event] = fluid.event.getEventFirer(eventType === "unicast", eventType === "preventable")
            }
        }
        fluid.mergeListeners(that.events, options.listeners)
    };
    fluid.computeNickName = function (typeName) {
        var segs = fluid.model.parseEL(typeName);
        return segs[segs.length - 1]
    };
    fluid.mergeComponentOptions = function (that, componentName, userOptions) {
        var defaults = fluid.defaults(componentName);
        if (fluid.expandOptions) {
            defaults = fluid.expandOptions(fluid.copy(defaults))
        }
        that.options = fluid.merge(defaults ? defaults.mergePolicy : null, {}, defaults, userOptions)
    };
    fluid.expectFilledSelector = function (result, message) {
        if (result && result.length === 0 && result.jquery) {
            fluid.fail(message + ': selector "' + result.selector + '" with name ' + result.selectorName + " returned no results in context " + fluid.dumpEl(result.context))
        }
    };
    fluid.initView = function (componentName, container, userOptions) {
        fluid.expectFilledSelector(container, 'Error instantiating component with name "' + componentName);
        container = fluid.container(container, true);
        if (!container) {
            return null
        }
        var that = fluid.initLittleComponent(componentName, userOptions);
        that.container = container;
        fluid.initDomBinder(that);
        fluid.instantiateFirers(that, that.options);
        return that
    };
    fluid.COMPONENT_OPTIONS = {
        type: "fluid.marker",
        value: "COMPONENT_OPTIONS"
    };
    fluid.VALUE = {
        type: "fluid.marker",
        value: "VALUE"
    };
    fluid.isMarker = function (totest, type) {
        if (typeof(totest) !== "object" || totest.type !== "fluid.marker") {
            return false
        }
        if (!type) {
            return true
        }
        return totest.value === type || totest.value === type.value
    };
    fluid.emptySubcomponent = function (options) {
        var that = {};
        options = $.makeArray(options);
        var empty = function () {};
        for (var i = 0; i < options.length; ++i) {
            that[options[i]] = empty
        }
        return that
    };
    fluid.initLittleComponent = function (name, options) {
        var that = {
            typeName: name,
            id: fluid.allocateGuid()
        };
        fluid.mergeComponentOptions(that, name, options);
        that.nickName = that.options.nickName ? that.options.nickName : fluid.computeNickName(that.typeName);
        return that
    };
    fluid.initSubcomponent = function (that, className, args) {
        return fluid.initSubcomponents(that, className, args)[0]
    };
    fluid.initSubcomponentImpl = function (that, entry, args) {
        var togo;
        if (typeof(entry) !== "function") {
            var entryType = typeof(entry) === "string" ? entry : entry.type;
            var globDef = fluid.defaults(true, entryType);
            fluid.merge("reverse", that.options, globDef);
            togo = entryType === "fluid.emptySubcomponent" ? fluid.emptySubcomponent(entry.options) : fluid.invokeGlobalFunction(entryType, args)
        } else {
            togo = entry.apply(null, args)
        }
        var returnedOptions = togo ? togo.returnedOptions : null;
        if (returnedOptions) {
            fluid.merge(that.options.mergePolicy, that.options, returnedOptions);
            if (returnedOptions.listeners) {
                fluid.mergeListeners(that.events, returnedOptions.listeners)
            }
        }
        return togo
    };
    fluid.initSubcomponents = function (that, className, args) {
        var entry = that.options[className];
        if (!entry) {
            return
        }
        var entries = $.makeArray(entry);
        var optindex = -1;
        var togo = [];
        args = $.makeArray(args);
        for (var i = 0; i < args.length; ++i) {
            if (args[i] === fluid.COMPONENT_OPTIONS) {
                optindex = i
            }
        }
        for (i = 0; i < entries.length; ++i) {
            entry = entries[i];
            if (optindex !== -1) {
                args[optindex] = entry.options
            }
            togo[i] = fluid.initSubcomponentImpl(that, entry, args)
        }
        return togo
    };
    fluid.initDomBinder = function (that) {
        that.dom = fluid.createDomBinder(that.container, that.options.selectors);
        that.locate = that.dom.locate
    };
    fluid.isPrimitive = function (value) {
        var valueType = typeof(value);
        return !value || valueType === "string" || valueType === "boolean" || valueType === "number" || valueType === "function"
    };

    function mergeImpl(policy, basePath, target, source, thisPolicy) {
        if (typeof(thisPolicy) === "function") {
            thisPolicy.apply(null, target, source);
            return target
        }
        if (thisPolicy === "replace") {
            fluid.clear(target)
        }
        for (var name in source) {
            var path = (basePath ? basePath + "." : "") + name;
            var newPolicy = policy && typeof(policy) !== "string" ? policy[path] : policy;
            var thisTarget = target[name];
            var thisSource = source[name];
            var primitiveTarget = fluid.isPrimitive(thisTarget);
            if (thisSource !== undefined) {
                if (thisSource !== null && typeof thisSource === "object" && !thisSource.nodeType && !thisSource.jquery && thisSource !== fluid.VALUE && newPolicy !== "preserve") {
                    if (primitiveTarget) {
                        target[name] = thisTarget = thisSource instanceof Array ? [] : {}
                    }
                    mergeImpl(policy, path, thisTarget, thisSource, newPolicy)
                } else {
                    if (typeof(newPolicy) === "function") {
                        newPolicy.call(null, target, source, name)
                    } else {
                        if (thisTarget === null || thisTarget === undefined || thisPolicy !== "reverse") {
                            target[name] = thisSource
                        }
                    }
                }
            }
        }
        return target
    }
    fluid.merge = function (policy, target) {
        var path = "";
        for (var i = 2; i < arguments.length; ++i) {
            var source = arguments[i];
            if (source !== null && source !== undefined) {
                mergeImpl(policy, path, target, source, policy ? policy[""] : null)
            }
        }
        if (policy && typeof(policy) !== "string") {
            for (var key in policy) {
                var elrh = policy[key];
                if (typeof(elrh) === "string" && elrh !== "replace") {
                    var oldValue = fluid.model.getBeanValue(target, key);
                    if (oldValue === null || oldValue === undefined) {
                        var value = fluid.model.getBeanValue(target, elrh);
                        fluid.model.setBeanValue(target, key, value)
                    }
                }
            }
        }
        return target
    };
    fluid.freshContainer = function (tocopy) {
        return fluid.isArrayable(tocopy) ? [] : {}
    };
    fluid.copy = function (tocopy) {
        if (fluid.isPrimitive(tocopy)) {
            return tocopy
        }
        return $.extend(true, fluid.freshContainer(tocopy), tocopy)
    };
    fluid.getGlobalValue = function (path, env) {
        if (path) {
            env = env || fluid.environment;
            return fluid.model.getBeanValue(globalObject, path, env)
        }
    };
    fluid.invokeGlobalFunction = function (functionPath, args, environment) {
        var func = fluid.getGlobalValue(functionPath, environment);
        if (!func) {
            fluid.fail("Error invoking global function: " + functionPath + " could not be located")
        } else {
            return func.apply(null, args)
        }
    };
    fluid.registerGlobalFunction = function (functionPath, func, env) {
        env = env || fluid.environment;
        fluid.model.setBeanValue(globalObject, functionPath, func, env)
    };
    fluid.registerGlobal = fluid.registerGlobalFunction;
    fluid.registerNamespace = function (naimspace, env) {
        env = env || fluid.environment;
        var existing = fluid.getGlobalValue(naimspace, env);
        if (!existing) {
            existing = {};
            fluid.registerGlobal(naimspace, existing, env)
        }
        return existing
    };
    fluid.event = {};
    var fluid_guid = 1;
    fluid.allocateGuid = function () {
        return fluid_guid++
    };
    fluid.event.identifyListener = function (listener) {
        if (!listener.$$guid) {
            listener.$$guid = fluid.allocateGuid()
        }
        return listener.$$guid
    };
    fluid.event.getEventFirer = function (unicast, preventable) {
        var listeners = {};

        function fireToListeners(listeners, args, wrapper) {
            for (var i in listeners) {
                var lisrec = listeners[i];
                var listener = lisrec.listener;
                if (lisrec.predicate && !lisrec.predicate(listener, args)) {
                    continue
                }
                try {
                    var ret = (wrapper ? wrapper(listener) : listener).apply(null, args);
                    if (preventable && ret === false) {
                        return false
                    }
                } catch (e) {
                    fluid.log("FireEvent received exception " + e.message + " e " + e + " firing to listener " + i);
                    throw (e)
                }
            }
        }
        return {
            addListener: function (listener, namespace, predicate) {
                if (!listener) {
                    return
                }
                if (unicast) {
                    namespace = "unicast"
                }
                if (!namespace) {
                    namespace = fluid.event.identifyListener(listener)
                }
                listeners[namespace] = {
                    listener: listener,
                    predicate: predicate
                }
            },
            removeListener: function (listener) {
                if (typeof(listener) === "string") {
                    delete listeners[listener]
                } else {
                    if (listener.$$guid) {
                        delete listeners[listener.$$guid]
                    }
                }
            },
            fireToListeners: function (listeners, args, wrapper) {
                return fireToListeners(listeners, args, wrapper)
            },
            fire: function () {
                return fireToListeners(listeners, arguments)
            }
        }
    };
    fluid.model = {};
    fluid.model.copyModel = function (target, source) {
        fluid.clear(target);
        $.extend(true, target, source)
    };
    fluid.model.parseEL = function (EL) {
        return String(EL).split(".")
    };
    fluid.model.composePath = function (prefix, suffix) {
        return prefix === "" ? suffix : (suffix === "" ? prefix : prefix + "." + suffix)
    };
    fluid.model.composeSegments = function () {
        return $.makeArray(arguments).join(".")
    };
    fluid.model.resolvePathSegment = function (root, segment, create) {
        if (root.resolvePathSegment) {
            return root.resolvePathSegment(segment)
        }
        if (root[segment] === undefined && create) {
            root[segment] = {}
        }
        return root[segment]
    };
    fluid.model.getPenultimate = function (root, EL, environment, create) {
        var segs = fluid.model.parseEL(EL);
        for (var i = 0; i < segs.length - 1; ++i) {
            if (!root) {
                return {
                    root: root
                }
            }
            var segment = segs[i];
            if (environment && environment[segment]) {
                root = environment[segment];
                environment = null
            } else {
                root = fluid.model.resolvePathSegment(root, segment, create)
            }
        }
        return {
            root: root,
            last: segs[segs.length - 1]
        }
    };
    fluid.model.setBeanValue = function (root, EL, newValue, environment) {
        var pen = fluid.model.getPenultimate(root, EL, environment, true);
        pen.root[pen.last] = newValue
    };
    fluid.model.getBeanValue = function (root, EL, environment) {
        if (EL === "" || EL === null || EL === undefined) {
            return root
        }
        var pen = fluid.model.getPenultimate(root, EL, environment);
        return pen.root ? pen.root[pen.last] : pen.root
    };
    var logging;
    fluid.setLogging = function (enabled) {
        if (typeof enabled === "boolean") {
            logging = enabled
        } else {
            logging = false
        }
    };
    fluid.log = function (str) {
        if (logging) {
            str = fluid.renderTimestamp(new Date()) + ":  " + str;
            if (typeof(console) !== "undefined") {
                if (console.debug) {
                    console.debug(str)
                } else {
                    console.log(str)
                }
            } else {
                if (typeof(YAHOO) !== "undefined") {
                    YAHOO.log(str)
                } else {
                    if (typeof(opera) !== "undefined") {
                        opera.postError(str)
                    }
                }
            }
        }
    };
    fluid.findAncestor = function (element, test) {
        element = fluid.unwrap(element);
        while (element) {
            if (test(element)) {
                return element
            }
            element = element.parentNode
        }
    };
    fluid.jById = function (id, dokkument) {
        dokkument = dokkument && dokkument.nodeType === 9 ? dokkument : document;
        var element = fluid.byId(id, dokkument);
        var togo = element ? $(element) : [];
        togo.selector = "#" + id;
        togo.context = dokkument;
        return togo
    };
    fluid.byId = function (id, dokkument) {
        dokkument = dokkument && dokkument.nodeType === 9 ? dokkument : document;
        var el = dokkument.getElementById(id);
        if (el) {
            if (el.getAttribute("id") !== id) {
                fluid.fail("Problem in document structure - picked up element " + fluid.dumpEl(el) + " for id " + id + " without this id - most likely the element has a name which conflicts with this id")
            }
            return el
        } else {
            return null
        }
    };
    fluid.getId = function (element) {
        return fluid.unwrap(element).getAttribute("id")
    };
    fluid.allocateSimpleId = function (element) {
        element = fluid.unwrap(element);
        if (!element.id) {
            element.id = "fluid-id-" + fluid.allocateGuid()
        }
        return element.id
    };

    function transformInternal(source, togo, key, args) {
        var transit = source[key];
        for (var j = 0; j < args.length - 1; ++j) {
            transit = args[j + 1](transit, key)
        }
        togo[key] = transit
    }
    fluid.transform = function (source) {
        var togo = fluid.freshContainer(source);
        if (fluid.isArrayable(source)) {
            for (var i = 0; i < source.length; ++i) {
                transformInternal(source, togo, i, arguments)
            }
        } else {
            for (var key in source) {
                transformInternal(source, togo, key, arguments)
            }
        }
        return togo
    };
    fluid.each = function (source, func) {
        if (fluid.isArrayable(source)) {
            for (var i = 0; i < source.length; ++i) {
                func(source[i], i)
            }
        } else {
            for (var key in source) {
                func(source[key], key)
            }
        }
    };
    fluid.find = function (source, func, deflt) {
        if (fluid.isArrayable(source)) {
            for (var i = 0; i < source.length; ++i) {
                var disp = func(source[i], i);
                if (disp !== undefined) {
                    return disp
                }
            }
        } else {
            for (var key in source) {
                var disp = func(source[key], key);
                if (disp !== undefined) {
                    return disp
                }
            }
        }
        return deflt
    };
    fluid.accumulate = function (list, fn, arg) {
        for (var i = 0; i < list.length; ++i) {
            arg = fn(list[i], arg, i)
        }
        return arg
    };
    fluid.remove_if = function (list, fn) {
        for (var i = 0; i < list.length; ++i) {
            if (fn(list[i], i)) {
                list.splice(i, 1);
                --i
            }
        }
        return list
    };
    fluid.stringTemplate = function (template, values) {
        var newString = template;
        for (var key in values) {
            var searchStr = "%" + key;
            newString = newString.replace(searchStr, values[key])
        }
        return newString
    }
})(jQuery, fluid_1_2);
var fluid_1_2 = fluid_1_2 || {};
(function ($, fluid) {
    fluid.dom = fluid.dom || {};
    var getNextNode = function (iterator) {
        if (iterator.node.firstChild) {
            iterator.node = iterator.node.firstChild;
            iterator.depth += 1;
            return iterator
        }
        while (iterator.node) {
            if (iterator.node.nextSibling) {
                iterator.node = iterator.node.nextSibling;
                return iterator
            }
            iterator.node = iterator.node.parentNode;
            iterator.depth -= 1
        }
        return iterator
    };
    fluid.dom.iterateDom = function (node, acceptor, allNodes) {
        var currentNode = {
            node: node,
            depth: 0
        };
        var prevNode = node;
        var condition;
        while (currentNode.node !== null && currentNode.depth >= 0 && currentNode.depth < fluid.dom.iterateDom.DOM_BAIL_DEPTH) {
            condition = null;
            if (currentNode.node.nodeType === 1 || allNodes) {
                condition = acceptor(currentNode.node, currentNode.depth)
            }
            if (condition) {
                if (condition === "delete") {
                    currentNode.node.parentNode.removeChild(currentNode.node);
                    currentNode.node = prevNode
                } else {
                    if (condition === "stop") {
                        return currentNode.node
                    }
                }
            }
            prevNode = currentNode.node;
            currentNode = getNextNode(currentNode)
        }
    };
    fluid.dom.iterateDom.DOM_BAIL_DEPTH = 256;
    fluid.dom.isContainer = function (container, containee) {
        for (; containee; containee = containee.parentNode) {
            if (container === containee) {
                return true
            }
        }
        return false
    };
    fluid.dom.getElementText = function (element) {
        var nodes = element.childNodes;
        var text = "";
        for (var i = 0; i < nodes.length; ++i) {
            var child = nodes[i];
            if (child.nodeType == 3) {
                text = text + child.nodeValue
            }
        }
        return text
    }
})(jQuery, fluid_1_2);
fluid_1_2 = fluid_1_2 || {};
(function ($, fluid) {
    var unUnicode = /(\\u[\dabcdef]{4}|\\x[\dabcdef]{2})/g;
    fluid.unescapeProperties = function (string) {
        string = string.replace(unUnicode, function (match) {
            var code = match.substring(2);
            var parsed = parseInt(code, 16);
            return String.fromCharCode(parsed)
        });
        var pos = 0;
        while (true) {
            var backpos = string.indexOf("\\", pos);
            if (backpos === -1) {
                break
            }
            if (backpos === string.length - 1) {
                return [string.substring(0, string.length - 1), true]
            }
            var replace = string.charAt(backpos + 1);
            if (replace === "n") {
                replace = "\n"
            }
            if (replace === "r") {
                replace = "\r"
            }
            if (replace === "t") {
                replace = "\t"
            }
            string = string.substring(0, backpos) + replace + string.substring(backpos + 2);
            pos = backpos + 1
        }
        return [string, false]
    };
    var breakPos = /[^\\][\s:=]/;
    fluid.parseJavaProperties = function (text) {
        var togo = {};
        text = text.replace(/\r\n/g, "\n");
        text = text.replace(/\r/g, "\n");
        lines = text.split("\n");
        var contin, key, valueComp, valueRaw, valueEsc;
        for (var i = 0; i < lines.length; ++i) {
            var line = $.trim(lines[i]);
            if (!line || line.charAt(0) === "#" || line.charAt(0) === "!") {
                continue
            }
            if (!contin) {
                valueComp = "";
                var breakpos = line.search(breakPos);
                if (breakpos === -1) {
                    key = line;
                    valueRaw = ""
                } else {
                    key = $.trim(line.substring(0, breakpos + 1));
                    valueRaw = $.trim(line.substring(breakpos + 2));
                    if (valueRaw.charAt(0) === ":" || valueRaw.charAt(0) === "=") {
                        valueRaw = $.trim(valueRaw.substring(1))
                    }
                }
                key = fluid.unescapeProperties(key)[0];
                valueEsc = fluid.unescapeProperties(valueRaw)
            } else {
                valueEsc = fluid.unescapeProperties(line)
            }
            contin = valueEsc[1];
            if (!valueEsc[1]) {
                togo[key] = valueComp + valueEsc[0]
            } else {
                valueComp += valueEsc[0]
            }
        }
        return togo
    };
    fluid.formatMessage = function (messageString, args) {
        if (!args) {
            return messageString
        }
        if (typeof(args) === "string") {
            args = [args]
        }
        for (var i = 0; i < args.length; ++i) {
            messageString = messageString.replace("{" + i + "}", args[i])
        }
        return messageString
    }
})(jQuery, fluid_1_2);
var fluid_1_2 = fluid_1_2 || {};
var fluid = fluid || fluid_1_2;
(function ($, fluid) {
    fluid.renderTimestamp = function (date) {
        var zeropad = function (num, width) {
            if (!width) {
                width = 2
            }
            var numstr = (num == undefined ? "" : num.toString());
            return "00000".substring(5 - width + numstr.length) + numstr
        };
        return zeropad(date.getHours()) + ":" + zeropad(date.getMinutes()) + ":" + zeropad(date.getSeconds()) + "." + zeropad(date.getMilliseconds(), 3)
    };

    function generate(c, count) {
        var togo = "";
        for (var i = 0; i < count; ++i) {
            togo += c
        }
        return togo
    }
    function printImpl(obj, small, options) {
        var big = small + options.indentChars;
        if (obj === null) {
            return "null"
        } else {
            if (fluid.isPrimitive(obj)) {
                return JSON.stringify(obj)
            } else {
                var j = [];
                if (fluid.isArrayable(obj)) {
                    if (obj.length === 0) {
                        return "[]"
                    }
                    for (var i = 0; i < obj.length; ++i) {
                        j[i] = printImpl(obj[i], big, options)
                    }
                    return "[\n" + big + j.join(",\n" + big) + "\n" + small + "]"
                } else {
                    var i = 0;
                    fluid.each(obj, function (value, key) {
                        j[i++] = JSON.stringify(key) + ": " + printImpl(value, big, options)
                    });
                    return "{\n" + big + j.join(",\n" + big) + "\n" + small + "}"
                }
            }
        }
    }
    fluid.prettyPrintJSON = function (obj, options) {
        options = $.extend({
            indent: 4
        }, options);
        options.indentChars = generate(" ", options.indent);
        return printImpl(obj, "", options)
    };
    fluid.dumpEl = function (element) {
        var togo;
        if (!element) {
            return "null"
        }
        if (element.nodeType === 3 || element.nodeType === 8) {
            return "[data: " + element.data + "]"
        }
        if (element.nodeType === 9) {
            return "[document: location " + element.location + "]"
        }
        if (!element.nodeType && fluid.isArrayable(element)) {
            togo = "[";
            for (var i = 0; i < element.length; ++i) {
                togo += fluid.dumpEl(element[i]);
                if (i < element.length - 1) {
                    togo += ", "
                }
            }
            return togo + "]"
        }
        element = $(element);
        togo = element.get(0).tagName;
        if (element.attr("id")) {
            togo += "#" + element.attr("id")
        }
        if (element.attr("class")) {
            togo += "." + element.attr("class")
        }
        return togo
    }
})(jQuery, fluid_1_2);
fluid_1_2 = fluid_1_2 || {};
(function ($, fluid) {
    fluid.VALUE = {};
    fluid.BINDING_ROOT_KEY = "fluid-binding-root";
    fluid.findData = function (elem, name) {
        while (elem) {
            var data = $.data(elem, name);
            if (data) {
                return data
            }
            elem = elem.parentNode
        }
    };
    fluid.bindFossils = function (node, data, fossils) {
        $.data(node, fluid.BINDING_ROOT_KEY, {
            data: data,
            fossils: fossils
        })
    };
    fluid.boundPathForNode = function (node, fossils) {
        node = fluid.unwrap(node);
        var key = node.name || node.id;
        var record = fossils[key];
        return record ? record.EL : null
    };
    fluid.findForm = function (node) {
        return fluid.findAncestor(node, function (element) {
            return element.nodeName.toLowerCase() === "form"
        })
    };
    fluid.value = function (nodeIn, newValue) {
        var node = fluid.unwrap(nodeIn);
        var multiple = false;
        if (node.nodeType === undefined && node.length > 1) {
            node = node[0];
            multiple = true
        }
        if ("input" !== node.nodeName.toLowerCase() || !/radio|checkbox/.test(node.type)) {
            return $(node).val(newValue)
        }
        var name = node.name;
        if (name === undefined) {
            fluid.fail("Cannot acquire value from node " + fluid.dumpEl(node) + " which does not have name attribute set")
        }
        var elements;
        if (multiple) {
            elements = nodeIn
        } else {
            elements = document.getElementsByName(name);
            var scope = fluid.findForm(node);
            elements = $.grep(elements, function (element) {
                if (element.name !== name) {
                    return false
                }
                return !scope || fluid.dom.isContainer(scope, element)
            })
        }
        if (newValue !== undefined) {
            if (typeof(newValue) === "boolean") {
                newValue = (newValue ? "true" : "false")
            }
            $.each(elements, function () {
                this.checked = (newValue instanceof Array ? $.inArray(this.value, newValue) !== -1 : newValue === this.value)
            })
        } else {
            var checked = $.map(elements, function (element) {
                return element.checked ? element.value : null
            });
            return node.type === "radio" ? checked[0] : checked
        }
    };
    fluid.applyChange = function (node, newValue, applier) {
        node = fluid.unwrap(node);
        if (newValue === undefined) {
            newValue = fluid.value(node)
        }
        if (node.nodeType === undefined && node.length > 0) {
            node = node[0]
        }
        var root = fluid.findData(node, fluid.BINDING_ROOT_KEY);
        if (!root) {
            fluid.fail("Bound data could not be discovered in any node above " + fluid.dumpEl(node))
        }
        var name = node.name;
        var fossil = root.fossils[name];
        if (!fossil) {
            fluid.fail("No fossil discovered for name " + name + " in fossil record above " + fluid.dumpEl(node))
        }
        if (typeof(fossil.oldvalue) === "boolean") {
            newValue = newValue[0] ? true : false
        }
        var EL = root.fossils[name].EL;
        if (applier) {
            applier.fireChangeRequest({
                path: EL,
                value: newValue,
                source: node.id
            })
        } else {
            fluid.model.setBeanValue(root.data, EL, newValue)
        }
    };
    fluid.pathUtil = {};
    var getPathSegmentImpl = function (accept, path, i) {
        var segment = null;
        if (accept) {
            segment = ""
        }
        var escaped = false;
        var limit = path.length;
        for (; i < limit; ++i) {
            var c = path.charAt(i);
            if (!escaped) {
                if (c === ".") {
                    break
                } else {
                    if (c === "\\") {
                        escaped = true
                    } else {
                        if (segment !== null) {
                            segment += c
                        }
                    }
                }
            } else {
                escaped = false;
                if (segment !== null) {
                    accept += c
                }
            }
        }
        if (segment !== null) {
            accept[0] = segment
        }
        return i
    };
    var globalAccept = [];
    fluid.pathUtil.getPathSegment = function (path, i) {
        getPathSegmentImpl(globalAccept, path, i);
        return globalAccept[0]
    };
    fluid.pathUtil.getHeadPath = function (path) {
        return fluid.pathUtil.getPathSegment(path, 0)
    };
    fluid.pathUtil.getFromHeadPath = function (path) {
        var firstdot = getPathSegmentImpl(null, path, 0);
        return firstdot === path.length ? null : path.substring(firstdot + 1)
    };

    function lastDotIndex(path) {
        return path.lastIndexOf(".")
    }
    fluid.pathUtil.getToTailPath = function (path) {
        var lastdot = lastDotIndex(path);
        return lastdot == -1 ? null : path.substring(0, lastdot)
    };
    fluid.pathUtil.getTailPath = function (path) {
        var lastdot = lastDotIndex(path);
        return fluid.pathUtil.getPathSegment(path, lastdot + 1)
    };
    var composeSegment = function (prefix, toappend) {
        for (var i = 0; i < toappend.length; ++i) {
            var c = toappend.charAt(i);
            if (c === "." || c === "\\" || c === "}") {
                prefix += "\\"
            }
            prefix += c
        }
        return prefix
    };
    fluid.pathUtil.composePath = function (prefix, suffix) {
        if (prefix.length !== 0) {
            prefix += "."
        }
        return composeSegment(prefix, suffix)
    };
    fluid.pathUtil.matchPath = function (spec, path) {
        var togo = "";
        while (true) {
            if (!spec || path === "") {
                break
            }
            if (!path) {
                return null
            }
            var spechead = fluid.pathUtil.getHeadPath(spec);
            var pathhead = fluid.pathUtil.getHeadPath(path);
            if (spechead !== "*" && spechead !== pathhead) {
                return null
            }
            togo = fluid.pathUtil.composePath(togo, pathhead);
            spec = fluid.pathUtil.getFromHeadPath(spec);
            path = fluid.pathUtil.getFromHeadPath(path)
        }
        return togo
    };
    fluid.model.isNullChange = function (model, request) {
        if (request.type === "ADD") {
            var existing = fluid.model.getBeanValue(model, request.path);
            if (existing === request.value) {
                return true
            }
        }
    };
    fluid.model.applyChangeRequest = function (model, request) {
        var pen = fluid.model.getPenultimate(model, request.path);
        if (request.type === "ADD" || request.type === "MERGE") {
            if (pen.last === "" || request.type === "MERGE") {
                if (request.type === "ADD") {
                    fluid.clear(pen.root)
                }
                $.extend(true, pen.last === "" ? pen.root : pen.root[pen.last], request.value)
            } else {
                pen.root[pen.last] = request.value
            }
        } else {
            if (request.type === "DELETE") {
                if (pen.last === "") {
                    fluid.clear(pen.root)
                } else {
                    delete pen.root[pen.last]
                }
            }
        }
    };

    function bindRequestChange(that) {
        that.requestChange = function (path, value, type) {
            var changeRequest = {
                path: path,
                value: value,
                type: type
            };
            that.fireChangeRequest(changeRequest)
        }
    }
    fluid.makeChangeApplier = function (model, options) {
        options = options || {};
        var baseEvents = {
            guards: fluid.event.getEventFirer(false, true),
            postGuards: fluid.event.getEventFirer(false, true),
            modelChanged: fluid.event.getEventFirer(false, false)
        };
        var that = {
            model: model
        };

        function makeGuardWrapper(cullUnchanged) {
            if (!cullUnchanged) {
                return null
            }
            var togo = function (guard) {
                return function (model, changeRequest, internalApplier) {
                    var oldRet = guard(model, changeRequest, internalApplier);
                    if (oldRet === false) {
                        return false
                    } else {
                        if (fluid.model.isNullChange(model, changeRequest)) {
                            togo.culled = true;
                            return false
                        }
                    }
                }
            };
            return togo
        }
        function wrapListener(listener, spec) {
            var pathSpec = spec;
            var transactional = false;
            var priority = Number.MAX_VALUE;
            if (typeof(spec) !== "string") {
                pathSpec = spec.path;
                transactional = spec.transactional;
                if (spec.priority !== undefined) {
                    priority = spec.priority
                }
            } else {
                if (pathSpec.charAt(0) === "!") {
                    transactional = true;
                    pathSpec = pathSpec.substring(1)
                }
            }
            return function (changePath, fireSpec, accum) {
                var guid = fluid.event.identifyListener(listener);
                var exist = fireSpec.guids[guid];
                if (!exist) {
                    var match = fluid.pathUtil.matchPath(pathSpec, changePath);
                    if (match !== null) {
                        var record = {
                            changePath: changePath,
                            pathSpec: pathSpec,
                            listener: listener,
                            priority: priority,
                            transactional: transactional
                        };
                        if (accum) {
                            record.accumulate = [accum]
                        }
                        fireSpec.guids[guid] = record;
                        var collection = transactional ? "transListeners" : "listeners";
                        fireSpec[collection].push(record);
                        fireSpec.all.push(record)
                    }
                } else {
                    if (accum) {
                        if (!exist.accumulate) {
                            exist.accumulate = []
                        }
                        exist.accumulate.push(accum)
                    }
                }
            }
        }
        function fireFromSpec(name, fireSpec, args, category, wrapper) {
            return baseEvents[name].fireToListeners(fireSpec[category], args, wrapper)
        }
        function fireComparator(recA, recB) {
            return recA.priority - recB.priority
        }
        function prepareFireEvent(name, changePath, fireSpec, accum) {
            baseEvents[name].fire(changePath, fireSpec, accum);
            fireSpec.all.sort(fireComparator);
            fireSpec.listeners.sort(fireComparator);
            fireSpec.transListeners.sort(fireComparator)
        }
        function makeFireSpec() {
            return {
                guids: {},
                all: [],
                listeners: [],
                transListeners: []
            }
        }
        function getFireSpec(name, changePath) {
            var fireSpec = makeFireSpec();
            prepareFireEvent(name, changePath, fireSpec);
            return fireSpec
        }
        function fireEvent(name, changePath, args, wrapper) {
            var fireSpec = getFireSpec(name, changePath);
            return fireFromSpec(name, fireSpec, args, "all", wrapper)
        }
        function adaptListener(that, name) {
            that[name] = {
                addListener: function (spec, listener, namespace) {
                    baseEvents[name].addListener(wrapListener(listener, spec), namespace)
                },
                removeListener: function (listener) {
                    baseEvents[name].removeListener(listener)
                }
            }
        }
        adaptListener(that, "guards");
        adaptListener(that, "postGuards");
        adaptListener(that, "modelChanged");

        function preFireChangeRequest(changeRequest) {
            if (!changeRequest.type) {
                changeRequest.type = "ADD"
            }
        }
        var bareApplier = {
            fireChangeRequest: function (changeRequest) {
                that.fireChangeRequest(changeRequest, true)
            }
        };
        bindRequestChange(bareApplier);
        that.fireChangeRequest = function (changeRequest, defeatGuards) {
            preFireChangeRequest(changeRequest);
            var guardFireSpec = defeatGuards ? null : getFireSpec("guards", changeRequest.path);
            if (guardFireSpec && guardFireSpec.transListeners.length > 0) {
                var ation = that.initiate();
                ation.fireChangeRequest(changeRequest, guardFireSpec);
                ation.commit()
            } else {
                if (!defeatGuards) {
                    var prevent = fireFromSpec("guards", guardFireSpec, [model, changeRequest, bareApplier], "listeners");
                    if (prevent === false) {
                        return false
                    }
                }
                var oldModel = model;
                if (!options.thin) {
                    oldModel = {};
                    fluid.model.copyModel(oldModel, model)
                }
                fluid.model.applyChangeRequest(model, changeRequest);
                fireEvent("modelChanged", changeRequest.path, [model, oldModel, [changeRequest]])
            }
        };
        bindRequestChange(that);

        function fireAgglomerated(eventName, formName, changes, args, accpos) {
            var fireSpec = makeFireSpec();
            for (var i = 0; i < changes.length; ++i) {
                prepareFireEvent(eventName, changes[i].path, fireSpec, changes[i])
            }
            for (var i = 0; i < fireSpec[formName].length; ++i) {
                var spec = fireSpec[formName][i];
                if (accpos) {
                    args[accpos] = spec.accumulate
                }
                var ret = spec.listener.apply(null, args);
                if (ret === false) {
                    return false
                }
            }
        }
        that.initiate = function (newModel) {
            var cancelled = false;
            var changes = [];
            if (options.thin) {
                newModel = model
            } else {
                newModel = newModel || {};
                fluid.model.copyModel(newModel, model)
            }
            var internalApplier = {
                fireChangeRequest: function (changeRequest) {
                    preFireChangeRequest(changeRequest);
                    fluid.model.applyChangeRequest(newModel, changeRequest);
                    changes.push(changeRequest)
                }
            };
            bindRequestChange(internalApplier);
            var ation = {
                commit: function () {
                    var oldModel;
                    if (cancelled) {
                        return false
                    }
                    var ret = fireAgglomerated("postGuards", "transListeners", changes, [newModel, null, internalApplier], 1);
                    if (ret === false) {
                        return false
                    }
                    if (options.thin) {
                        oldModel = model
                    } else {
                        oldModel = {};
                        fluid.model.copyModel(oldModel, model);
                        fluid.clear(model);
                        fluid.model.copyModel(model, newModel)
                    }
                    fireAgglomerated("modelChanged", "all", changes, [model, oldModel, null], 2)
                },
                fireChangeRequest: function (changeRequest) {
                    preFireChangeRequest(changeRequest);
                    if (options.cullUnchanged && fluid.model.isNullChange(model, changeRequest)) {
                        return
                    }
                    var wrapper = makeGuardWrapper(options.cullUnchanged);
                    var prevent = fireEvent("guards", changeRequest.path, [newModel, changeRequest, internalApplier], wrapper);
                    if (prevent === false && !(wrapper && wrapper.culled)) {
                        cancelled = true
                    }
                    if (!cancelled) {
                        if (!(wrapper && wrapper.culled)) {
                            fluid.model.applyChangeRequest(newModel, changeRequest);
                            changes.push(changeRequest)
                        }
                    }
                }
            };
            bindRequestChange(ation);
            return ation
        };
        return that
    };
    fluid.makeSuperApplier = function () {
        var subAppliers = [];
        var that = {};
        that.addSubApplier = function (path, subApplier) {
            subAppliers.push({
                path: path,
                subApplier: subApplier
            })
        };
        that.fireChangeRequest = function (request) {
            for (var i = 0; i < subAppliers.length; ++i) {
                var path = subAppliers[i].path;
                if (request.path.indexOf(path) === 0) {
                    var subpath = request.path.substring(path.length + 1);
                    var subRequest = fluid.copy(request);
                    subRequest.path = subpath;
                    subAppliers[i].subApplier.fireChangeRequest(subRequest)
                }
            }
        };
        bindRequestChange(that);
        return that
    };
    fluid.attachModel = function (baseModel, path, model) {
        var segs = fluid.model.parseEL(path);
        for (var i = 0; i < segs.length - 1; ++i) {
            var seg = segs[i];
            var subModel = baseModel[seg];
            if (!subModel) {
                baseModel[seg] = subModel = {}
            }
            baseModel = subModel
        }
        baseModel[segs[segs.length - 1]] = model
    };
    fluid.assembleModel = function (modelSpec) {
        var model = {};
        var superApplier = fluid.makeSuperApplier();
        var togo = {
            model: model,
            applier: superApplier
        };
        for (var path in modelSpec) {
            var rec = modelSpec[path];
            fluid.attachModel(model, path, rec.model);
            if (rec.applier) {
                superApplier.addSubApplier(path, rec.applier)
            }
        }
        return togo
    }
})(jQuery, fluid_1_2);
var fluid_1_2 = fluid_1_2 || {};
var fluid = fluid || fluid_1_2;
(function ($, fluid) {
    fluid.thatistBridge = function (name, peer) {
        var togo = function (funcname) {
            var segs = funcname.split(".");
            var move = peer;
            for (var i = 0; i < segs.length; ++i) {
                move = move[segs[i]]
            }
            var args = [this];
            if (arguments.length === 2) {
                args = args.concat($.makeArray(arguments[1]))
            }
            var ret = move.apply(null, args);
            this.that = function () {
                return ret
            };
            var type = typeof(ret);
            return !ret || type === "string" || type === "number" || type === "boolean" || ret && ret.length !== undefined ? ret : this
        };
        $.fn[name] = togo;
        return togo
    };
    fluid.thatistBridge("fluid", fluid);
    fluid.thatistBridge("fluid_1_2", fluid_1_2);
    var NAMESPACE_KEY = "fluid-keyboard-a11y";
    var getData = function (target, key) {
        var data = $(target).data(NAMESPACE_KEY);
        return data ? data[key] : undefined
    };
    var setData = function (target, key, value) {
        $(target).each(function () {
            var data = $.data(this, NAMESPACE_KEY) || {};
            data[key] = value;
            $.data(this, NAMESPACE_KEY, data)
        })
    };
    var lastFocusedElement = "disabled";
    if ($.event.special.focusin) {
        lastFocusedElement = null;
        $(document).bind("focusin", function (event) {
            lastFocusedElement = event.target
        })
    }
    fluid.getLastFocusedElement = function () {
        if (lastFocusedElement === "disabled") {
            fluid.fail("Focus manager not enabled - please include jquery.delegate.js or equivalent for support of 'focusin' event")
        }
        return lastFocusedElement
    };
    var normalizeTabindexName = function () {
        return $.browser.msie ? "tabIndex" : "tabindex"
    };
    var canHaveDefaultTabindex = function (elements) {
        if (elements.length <= 0) {
            return false
        }
        return $(elements[0]).is("a, input, button, select, area, textarea, object")
    };
    var getValue = function (elements) {
        if (elements.length <= 0) {
            return undefined
        }
        if (!fluid.tabindex.hasAttr(elements)) {
            return canHaveDefaultTabindex(elements) ? Number(0) : undefined
        }
        var value = elements.attr(normalizeTabindexName());
        return Number(value)
    };
    var setValue = function (elements, toIndex) {
        return elements.each(function (i, item) {
            $(item).attr(normalizeTabindexName(), toIndex)
        })
    };
    fluid.tabindex = function (target, toIndex) {
        target = $(target);
        if (toIndex !== null && toIndex !== undefined) {
            return setValue(target, toIndex)
        } else {
            return getValue(target)
        }
    };
    fluid.tabindex.remove = function (target) {
        target = $(target);
        return target.each(function (i, item) {
            $(item).removeAttr(normalizeTabindexName())
        })
    };
    fluid.tabindex.hasAttr = function (target) {
        target = $(target);
        if (target.length <= 0) {
            return false
        }
        var togo = target.map(function () {
            var attributeNode = this.getAttributeNode(normalizeTabindexName());
            return attributeNode ? attributeNode.specified : false
        });
        return togo.length === 1 ? togo[0] : togo
    };
    fluid.tabindex.has = function (target) {
        target = $(target);
        return fluid.tabindex.hasAttr(target) || canHaveDefaultTabindex(target)
    };
    var ENABLEMENT_KEY = "enablement";
    fluid.enabled = function (target, state) {
        target = $(target);
        if (state === undefined) {
            return getData(target, ENABLEMENT_KEY) !== false
        } else {
            $("*", target).each(function () {
                if (getData(this, ENABLEMENT_KEY) !== undefined) {
                    setData(this, ENABLEMENT_KEY, state)
                } else {
                    if (/select|textarea|input/i.test(this.nodeName)) {
                        $(this).attr("disabled", !state)
                    }
                }
            });
            setData(target, ENABLEMENT_KEY, state)
        }
    };
    fluid.a11y = $.a11y || {};
    fluid.a11y.orientation = {
        HORIZONTAL: 0,
        VERTICAL: 1,
        BOTH: 2
    };
    var UP_DOWN_KEYMAP = {
        next: $.ui.keyCode.DOWN,
        previous: $.ui.keyCode.UP
    };
    var LEFT_RIGHT_KEYMAP = {
        next: $.ui.keyCode.RIGHT,
        previous: $.ui.keyCode.LEFT
    };
    var unwrap = function (element) {
        return element.jquery ? element[0] : element
    };
    var makeElementsTabFocussable = function (elements) {
        elements.each(function (idx, item) {
            item = $(item);
            if (!item.fluid("tabindex.has") || item.fluid("tabindex") < 0) {
                item.fluid("tabindex", 0)
            }
        })
    };
    fluid.tabbable = function (target) {
        target = $(target);
        makeElementsTabFocussable(target)
    };
    var CONTEXT_KEY = "selectionContext";
    var NO_SELECTION = -32768;
    var cleanUpWhenLeavingContainer = function (selectionContext) {
        if (selectionContext.activeItemIndex !== NO_SELECTION) {
            if (selectionContext.options.onLeaveContainer) {
                selectionContext.options.onLeaveContainer(selectionContext.selectables[selectionContext.activeItemIndex])
            } else {
                if (selectionContext.options.onUnselect) {
                    selectionContext.options.onUnselect(selectionContext.selectables[selectionContext.activeItemIndex])
                }
            }
        }
        if (!selectionContext.options.rememberSelectionState) {
            selectionContext.activeItemIndex = NO_SELECTION
        }
    };
    var drawSelection = function (elementToSelect, handler) {
        if (handler) {
            handler(elementToSelect)
        }
    };
    var eraseSelection = function (selectedElement, handler) {
        if (handler && selectedElement) {
            handler(selectedElement)
        }
    };
    var unselectElement = function (selectedElement, selectionContext) {
        eraseSelection(selectedElement, selectionContext.options.onUnselect)
    };
    var selectElement = function (elementToSelect, selectionContext) {
        unselectElement(selectionContext.selectedElement(), selectionContext);
        elementToSelect = unwrap(elementToSelect);
        var newIndex = selectionContext.selectables.index(elementToSelect);
        if (newIndex === -1) {
            return
        }
        selectionContext.activeItemIndex = newIndex;
        drawSelection(elementToSelect, selectionContext.options.onSelect)
    };
    var selectableFocusHandler = function (selectionContext) {
        return function (evt) {
            $(evt.target).fluid("tabindex", 0);
            selectElement(evt.target, selectionContext);
            return evt.stopPropagation()
        }
    };
    var selectableBlurHandler = function (selectionContext) {
        return function (evt) {
            $(evt.target).fluid("tabindex", selectionContext.options.selectablesTabindex);
            unselectElement(evt.target, selectionContext);
            return evt.stopPropagation()
        }
    };
    var reifyIndex = function (sc_that) {
        var elements = sc_that.selectables;
        if (sc_that.activeItemIndex >= elements.length) {
            sc_that.activeItemIndex = 0
        }
        if (sc_that.activeItemIndex < 0 && sc_that.activeItemIndex !== NO_SELECTION) {
            sc_that.activeItemIndex = elements.length - 1
        }
        if (sc_that.activeItemIndex >= 0) {
            $(elements[sc_that.activeItemIndex]).focus()
        }
    };
    var prepareShift = function (selectionContext) {
        var selElm = selectionContext.selectedElement();
        if (selElm) {
            selElm.blur()
        }
        unselectElement(selectionContext.selectedElement(), selectionContext);
        if (selectionContext.activeItemIndex === NO_SELECTION) {
            selectionContext.activeItemIndex = -1
        }
    };
    var focusNextElement = function (selectionContext) {
        prepareShift(selectionContext);
        ++selectionContext.activeItemIndex;
        reifyIndex(selectionContext)
    };
    var focusPreviousElement = function (selectionContext) {
        prepareShift(selectionContext);
        --selectionContext.activeItemIndex;
        reifyIndex(selectionContext)
    };
    var arrowKeyHandler = function (selectionContext, keyMap, userHandlers) {
        return function (evt) {
            if (evt.which === keyMap.next) {
                focusNextElement(selectionContext);
                evt.preventDefault()
            } else {
                if (evt.which === keyMap.previous) {
                    focusPreviousElement(selectionContext);
                    evt.preventDefault()
                }
            }
        }
    };
    var getKeyMapForDirection = function (direction) {
        var keyMap;
        if (direction === fluid.a11y.orientation.HORIZONTAL) {
            keyMap = LEFT_RIGHT_KEYMAP
        } else {
            if (direction === fluid.a11y.orientation.VERTICAL) {
                keyMap = UP_DOWN_KEYMAP
            }
        }
        return keyMap
    };
    var tabKeyHandler = function (selectionContext) {
        return function (evt) {
            if (evt.which !== $.ui.keyCode.TAB) {
                return
            }
            cleanUpWhenLeavingContainer(selectionContext);
            if (evt.shiftKey) {
                selectionContext.focusIsLeavingContainer = true
            }
        }
    };
    var containerFocusHandler = function (selectionContext) {
        return function (evt) {
            var shouldOrig = selectionContext.options.autoSelectFirstItem;
            var shouldSelect = typeof(shouldOrig) === "function" ? shouldOrig() : shouldOrig;
            if (selectionContext.focusIsLeavingContainer) {
                shouldSelect = false
            }
            if (shouldSelect && evt.target === selectionContext.container.get(0)) {
                if (selectionContext.activeItemIndex === NO_SELECTION) {
                    selectionContext.activeItemIndex = 0
                }
                $(selectionContext.selectables[selectionContext.activeItemIndex]).focus()
            }
            return evt.stopPropagation()
        }
    };
    var containerBlurHandler = function (selectionContext) {
        return function (evt) {
            selectionContext.focusIsLeavingContainer = false;
            return evt.stopPropagation()
        }
    };
    var makeElementsSelectable = function (container, defaults, userOptions) {
        var options = $.extend(true, {}, defaults, userOptions);
        var keyMap = getKeyMapForDirection(options.direction);
        var selectableElements = options.selectableElements ? options.selectableElements : container.find(options.selectableSelector);
        var that = {
            container: container,
            activeItemIndex: NO_SELECTION,
            selectables: selectableElements,
            focusIsLeavingContainer: false,
            options: options
        };
        that.selectablesUpdated = function (focusedItem) {
            if (typeof(that.options.selectablesTabindex) === "number") {
                that.selectables.fluid("tabindex", that.options.selectablesTabindex)
            }
            that.selectables.unbind("focus." + NAMESPACE_KEY);
            that.selectables.unbind("blur." + NAMESPACE_KEY);
            that.selectables.bind("focus." + NAMESPACE_KEY, selectableFocusHandler(that));
            that.selectables.bind("blur." + NAMESPACE_KEY, selectableBlurHandler(that));
            if (keyMap && that.options.noBubbleListeners) {
                that.selectables.unbind("keydown." + NAMESPACE_KEY);
                that.selectables.bind("keydown." + NAMESPACE_KEY, arrowKeyHandler(that, keyMap))
            }
            if (focusedItem) {
                selectElement(focusedItem, that)
            } else {
                reifyIndex(that)
            }
        };
        that.refresh = function () {
            if (!that.options.selectableSelector) {
                throw ("Cannot refresh selectable context which was not initialised by a selector")
            }
            that.selectables = container.find(options.selectableSelector);
            that.selectablesUpdated()
        };
        that.selectedElement = function () {
            return that.activeItemIndex < 0 ? null : that.selectables[that.activeItemIndex]
        };
        if (keyMap && !that.options.noBubbleListeners) {
            container.keydown(arrowKeyHandler(that, keyMap))
        }
        container.keydown(tabKeyHandler(that));
        container.focus(containerFocusHandler(that));
        container.blur(containerBlurHandler(that));
        that.selectablesUpdated();
        return that
    };
    fluid.selectable = function (target, options) {
        target = $(target);
        var that = makeElementsSelectable(target, fluid.selectable.defaults, options);
        setData(target, CONTEXT_KEY, that);
        return that
    };
    fluid.selectable.select = function (target, toSelect) {
        $(toSelect).focus()
    };
    fluid.selectable.selectNext = function (target) {
        target = $(target);
        focusNextElement(getData(target, CONTEXT_KEY))
    };
    fluid.selectable.selectPrevious = function (target) {
        target = $(target);
        focusPreviousElement(getData(target, CONTEXT_KEY))
    };
    fluid.selectable.currentSelection = function (target) {
        target = $(target);
        var that = getData(target, CONTEXT_KEY);
        return $(that.selectedElement())
    };
    fluid.selectable.defaults = {
        direction: fluid.a11y.orientation.VERTICAL,
        selectablesTabindex: -1,
        autoSelectFirstItem: true,
        rememberSelectionState: true,
        selectableSelector: ".selectable",
        selectableElements: null,
        onSelect: null,
        onUnselect: null,
        onLeaveContainer: null
    };
    var checkForModifier = function (binding, evt) {
        if (!binding.modifier) {
            return true
        }
        var modifierKey = binding.modifier;
        var isCtrlKeyPresent = modifierKey && evt.ctrlKey;
        var isAltKeyPresent = modifierKey && evt.altKey;
        var isShiftKeyPresent = modifierKey && evt.shiftKey;
        return isCtrlKeyPresent || isAltKeyPresent || isShiftKeyPresent
    };
    var makeActivationHandler = function (binding) {
        return function (evt) {
            var target = evt.target;
            if (!fluid.enabled(evt.target)) {
                return
            }
            var code = evt.which ? evt.which : evt.keyCode;
            if (code === binding.key && binding.activateHandler && checkForModifier(binding, evt)) {
                var event = $.Event("fluid-activate");
                $(evt.target).trigger(event, [binding.activateHandler]);
                if (event.isDefaultPrevented()) {
                    evt.preventDefault()
                }
            }
        }
    };
    var makeElementsActivatable = function (elements, onActivateHandler, defaultKeys, options) {
        var bindings = [];
        $(defaultKeys).each(function (index, key) {
            bindings.push({
                modifier: null,
                key: key,
                activateHandler: onActivateHandler
            })
        });
        if (options && options.additionalBindings) {
            bindings = bindings.concat(options.additionalBindings)
        }
        setData(elements, ENABLEMENT_KEY, true);
        for (var i = 0; i < bindings.length; ++i) {
            var binding = bindings[i];
            elements.keydown(makeActivationHandler(binding))
        }
        elements.bind("fluid-activate", function (evt, handler) {
            handler = handler || onActivateHandler;
            return handler ? handler(evt) : null
        })
    };
    fluid.activatable = function (target, fn, options) {
        target = $(target);
        makeElementsActivatable(target, fn, fluid.activatable.defaults.keys, options)
    };
    fluid.activate = function (target) {
        $(target).trigger("fluid-activate")
    };
    fluid.activatable.defaults = {
        keys: [$.ui.keyCode.ENTER, $.ui.keyCode.SPACE]
    }
})(jQuery, fluid_1_2);
var fluid_1_2 = fluid_1_2 || {};
(function ($, fluid) {
    var inCreationMarker = "__CURRENTLY_IN_CREATION__";
    var findMatchingComponent = function (that, visitor, except) {
        for (var name in that) {
            var component = that[name];
            if (!component || component === except || !component.typeName) {
                continue
            }
            if (visitor(component, name)) {
                return true
            }
            findMatchingComponent(component, visitor)
        }
    };
    var visitComponents = function (thatStack, visitor) {
        var lastDead;
        for (var i = thatStack.length - 1; i >= 0; --i) {
            var that = thatStack[i];
            if (that.options && that.options.fireBreak) {
                return
            }
            if (that.typeName) {
                if (visitor(that, "")) {
                    return
                }
            }
            if (findMatchingComponent(that, visitor, lastDead)) {
                return
            }
            lastDead = that
        }
    };

    function getValueGingerly(thatStack, component, segs, ind) {
        var thisSeg = segs[ind];
        var atval = thisSeg === "" ? component : fluid.model.resolvePathSegment(component, thisSeg);
        if (atval !== undefined) {
            if (atval[inCreationMarker] && atval !== thatStack[0]) {
                fluid.fail("Component of type " + atval.typeName + " cannot be used for lookup of path " + segs.join(".") + " since it is still in creation. Please reorganise your dependencies so that they no longer contain circular references")
            }
        } else {
            if (component.options && component.options.components && component.options.components[thisSeg]) {
                fluid.initDependent(component, thisSeg, thatStack);
                atval = fluid.model.resolvePathSegment(component, thisSeg)
            }
        }
        if (ind === segs.length - 1) {
            return atval
        } else {
            return getValueGingerly(thatStack, atval, segs, ind + 1)
        }
    }
    function makeStackFetcher(thatStack) {
        var fetcher = function (parsed) {
            var context = parsed.context;
            var foundComponent;
            visitComponents(thatStack, function (component, name) {
                if (context === name || context === component.typeName || context === component.nickName) {
                    foundComponent = component;
                    return true
                }
            });
            if (!foundComponent) {
                fluid.fail("No context matched for name " + context + " from root of type " + thatStack[0].typeName)
            }
            return getValueGingerly(thatStack, foundComponent, fluid.model.parseEL(parsed.path), 0)
        };
        return fetcher
    }
    function makeStackResolverOptions(thatStack) {
        return $.extend({}, fluid.defaults("fluid.resolveEnvironment"), {
            fetcher: makeStackFetcher(thatStack)
        })
    }
    function resolveRvalue(thatStack, arg, initArgs, componentOptions) {
        var options = makeStackResolverOptions(thatStack);
        var directModel = thatStack[0].model;
        if (fluid.isMarker(arg, fluid.COMPONENT_OPTIONS)) {
            arg = fluid.resolveEnvironment(componentOptions, directModel, options)
        } else {
            if (typeof(arg) === "string" && arg.charAt(0) === "@") {
                var argpos = arg.substring(1);
                arg = initArgs[argpos]
            } else {
                arg = fluid.resolveEnvironment(arg, directModel, options)
            }
        }
        return arg
    }
    fluid.embodyDemands = function (thatStack, demandspec, initArgs, options) {
        var demands = $.makeArray(demandspec.args);
        if (demands.length === 0 && thatStack.length > 0) {
            demands = [fluid.COMPONENT_OPTIONS]
        }
        var args = [];
        if (demands) {
            for (var i = 0; i < demands.length; ++i) {
                var arg = demands[i];
                if (typeof(arg) === "object" && !fluid.isMarker(arg)) {
                    var resolvedOptions = {};
                    for (var key in arg) {
                        var ref = arg[key];
                        var rvalue = resolveRvalue(thatStack, ref, initArgs, options);
                        fluid.model.setBeanValue(resolvedOptions, key, rvalue)
                    }
                    args[i] = resolvedOptions
                } else {
                    var resolvedArg = resolveRvalue(thatStack, arg, initArgs, options) || {};
                    resolvedArg.typeName = demandspec.funcName;
                    args[i] = resolvedArg
                }
            }
        } else {
            args = initArgs ? initArgs : []
        }
        var togo = {
            args: args,
            funcName: demandspec.funcName
        };
        return togo
    };
    var dependentStore = {};

    function searchDemands(demandingName, contextNames) {
        var exist = dependentStore[demandingName] || [];
        outer: for (var i = 0; i < exist.length; ++i) {
            var rec = exist[i];
            for (var j = 0; j < contextNames.length; ++j) {
                if (rec.contexts[j] !== contextNames[j]) {
                    continue outer
                }
            }
            return rec.spec
        }
    }
    fluid.demands = function (demandingName, contextName, spec) {
        var contextNames = $.makeArray(contextName).sort();
        if (!spec) {
            return searchDemands(demandingName, contextNames)
        } else {
            if (spec.length) {
                spec = {
                    args: spec
                }
            }
        }
        var exist = dependentStore[demandingName];
        if (!exist) {
            exist = [];
            dependentStore[demandingName] = exist
        }
        exist.push({
            contexts: contextNames,
            spec: spec
        })
    };
    fluid.getEnvironmentalThatStack = function () {
        return [fluid.staticEnvironment]
    };
    fluid.locateDemands = function (demandingNames, thatStack) {
        var searchStack = fluid.getEnvironmentalThatStack().concat(thatStack);
        var contextNames = {};
        visitComponents(searchStack, function (component) {
            contextNames[component.typeName] = true
        });
        var matches = [];
        for (var i = 0; i < demandingNames.length; ++i) {
            var rec = dependentStore[demandingNames[i]] || [];
            for (var j = 0; j < rec.length; ++j) {
                var spec = rec[j];
                var record = {
                    spec: spec.spec,
                    intersect: 0,
                    uncess: 0
                };
                for (var k = 0; k < spec.contexts.length; ++k) {
                    ++record[contextNames[spec.contexts[k]] ? "intersect" : "uncess"]
                }
                matches.push(record)
            }
        }
        matches.sort(function (speca, specb) {
            var p1 = specb.intersect - speca.intersect;
            return p1 === 0 ? speca.uncess - specb.uncess : p1
        });
        return matches.length === 0 || matches[0].intersect === 0 ? null : matches[0].spec
    };
    fluid.determineDemands = function (thatStack, funcNames) {
        var that = thatStack[thatStack.length - 1];
        funcNames = $.makeArray(funcNames);
        var demandspec = fluid.locateDemands(funcNames, thatStack);
        if (!demandspec) {
            demandspec = {}
        }
        var newFuncName = funcNames[0];
        if (demandspec.funcName) {
            newFuncName = demandspec.funcName
        }
        var mergeArgs = [];
        if (demandspec.parent) {
            var parent = searchDemands(funcNames[0], $.makeArray(demandspec.parent).sort());
            if (parent) {
                mergeArgs = parent.args
            }
        }
        var args = [];
        fluid.merge(null, args, $.makeArray(mergeArgs), $.makeArray(demandspec.args));
        return {
            funcName: newFuncName,
            args: args
        }
    };
    fluid.resolveDemands = function (thatStack, funcNames, initArgs, options) {
        var demandspec = fluid.determineDemands(thatStack, funcNames);
        return fluid.embodyDemands(thatStack, demandspec, initArgs, options)
    };
    fluid.makeArray = function (arg) {
        if (arg === null || arg === undefined) {
            return []
        } else {
            return $.makeArray(arg)
        }
    };
    fluid.invoke = function (functionName, args, that, environment) {
        args = fluid.makeArray(args);
        var invokeSpec = fluid.resolveDemands(fluid.getEnvironmentalThatStack().concat(fluid.makeArray(that)), functionName, args, args[0]);
        return fluid.invokeGlobalFunction(invokeSpec.funcName, invokeSpec.args, environment)
    };
    fluid.makeFreeInvoker = function (functionName, environment) {
        var demandSpec = fluid.determineDemands([fluid.staticEnvironment], functionName);
        return function () {
            var invokeSpec = fluid.embodyDemands(fluid.staticEnvironment, demandSpec, arguments);
            return fluid.invokeGlobalFunction(invokeSpec.funcName, invokeSpec.args, environment)
        }
    };
    fluid.makeInvoker = function (thatStack, demandspec, functionName, environment) {
        demandspec = demandspec || fluid.determineDemands(thatStack, functionName);
        thatStack = $.makeArray(thatStack);
        return function () {
            var invokeSpec = fluid.embodyDemands(thatStack, demandspec, arguments);
            return fluid.invokeGlobalFunction(invokeSpec.funcName, invokeSpec.args, environment)
        }
    };
    fluid.addBoiledListener = function (thatStack, eventName, listener, namespace, predicate) {
        thatStack = $.makeArray(thatStack);
        var topThat = thatStack[thatStack.length - 1];
        topThat.events[eventName].addListener(function (args) {
            var resolved = fluid.resolveDemands(thatStack, eventName, args);
            listener.apply(null, resolved.args)
        }, namespace, predicate)
    };
    fluid.expandOptions = function (args, thatStack) {
        if (fluid.isPrimitive(args)) {
            return args
        }
        thatStack = thatStack || fluid.getEnvironmentalThatStack();
        var expandOptions = makeStackResolverOptions(thatStack);
        expandOptions.noValue = true;
        expandOptions.noCopy = true;
        var components = args.components;
        delete args.components;
        var expanded = fluid.expander.expandLight(args, expandOptions);
        if (components !== undefined) {
            expanded.components = components
        }
        return expanded
    };
    fluid.initDependent = function (that, name, thatStack) {
        if (!that) {
            return
        }
        var component = that.options.components[name];
        var invokeSpec = fluid.resolveDemands(thatStack, [component.type, name], [], component.options);
        invokeSpec.args = fluid.expandOptions(invokeSpec.args, thatStack);
        var instance = fluid.initSubcomponentImpl(that, {
            type: invokeSpec.funcName
        }, invokeSpec.args);
        if (instance) {
            that[name] = instance
        }
    };
    fluid.initDependents = function (that) {
        var options = that.options;
        that[inCreationMarker] = true;
        var root = fluid.threadLocal();
        var thatStack = root["fluid.initDependents"];
        if (!thatStack) {
            thatStack = [that];
            root["fluid.initDependents"] = thatStack
        } else {
            thatStack.push(that)
        }
        try {
            var components = options.components || {};
            for (var name in components) {
                fluid.initDependent(that, name, thatStack)
            }
            var invokers = options.invokers || {};
            for (var name in invokers) {
                var invokerec = invokers[name];
                var funcName = typeof(invokerec) === "string" ? invokerec : null;
                that[name] = fluid.makeInvoker(thatStack, funcName ? null : invokerec, funcName)
            }
        } finally {
            thatStack.pop();
            delete that[inCreationMarker]
        }
    };
    fluid.typeTag = function (name) {
        return {
            typeName: name
        }
    };
    fluid.standardComponent = function (name) {
        return function (container, options) {
            var that = fluid.initView(name, container, options);
            fluid.initDependents(that);
            return that
        }
    };
    fluid.littleComponent = function (name) {
        return function (options) {
            var that = fluid.initLittleComponent(name, options);
            fluid.initDependents(that);
            return that
        }
    };
    fluid.makeComponents = function (components, env) {
        if (!env) {
            env = fluid.environment
        }
        for (var name in components) {
            fluid.model.setBeanValue({}, name, fluid.invokeGlobalFunction(components[name], [name], env), env)
        }
    };
    fluid.staticEnvironment = fluid.typeTag("fluid.staticEnvironment");
    fluid.staticEnvironment.environmentClass = fluid.typeTag("fluid.browser");
    fluid.demands("fluid.threadLocal", "fluid.browser", {
        funcName: "fluid.singleThreadLocal"
    });
    var singleThreadLocal = {};
    fluid.singleThreadLocal = function () {
        return singleThreadLocal
    };
    fluid.threadLocal = fluid.makeFreeInvoker("fluid.threadLocal");
    fluid.withEnvironment = function (envAdd, func) {
        var root = fluid.threadLocal();
        try {
            $.extend(root, envAdd);
            return func()
        } finally {
            for (var key in envAdd) {
                delete root[key]
            }
        }
    };
    fluid.extractEL = function (string, options) {
        if (options.ELstyle === "ALL") {
            return string
        } else {
            if (options.ELstyle.length === 1) {
                if (string.charAt(0) === options.ELstyle) {
                    return string.substring(1)
                }
            } else {
                if (options.ELstyle === "${}") {
                    var i1 = string.indexOf("${");
                    var i2 = string.lastIndexOf("}");
                    if (i1 === 0 && i2 !== -1) {
                        return string.substring(2, i2)
                    }
                }
            }
        }
    };
    fluid.extractELWithContext = function (string, options) {
        var EL = fluid.extractEL(string, options);
        if (EL && EL.charAt(0) === "{") {
            return fluid.parseContextReference(EL, 0)
        }
        return EL ? {
            path: EL
        } : EL
    };
    fluid.extractContextualPath = function (string, options, env) {
        var parsed = fluid.extractELWithContext(string, options);
        if (parsed) {
            if (parsed.context) {
                var fetched = env[parsed.context];
                if (typeof(fetched) !== "string") {
                    fluid.fail("Could not look up context path named " + parsed.context + " to string value")
                }
                return fluid.model.composePath(fetched, parsed.path)
            } else {
                return parsed.path
            }
        }
    };
    fluid.parseContextReference = function (reference, index, delimiter) {
        var endcpos = reference.indexOf("}", index + 1);
        if (endcpos === -1) {
            fluid.fail("Malformed context reference without }")
        }
        var context = reference.substring(index + 1, endcpos);
        var endpos = delimiter ? reference.indexOf(delimiter, endcpos + 1) : reference.length;
        var path = reference.substring(endcpos + 1, endpos);
        if (path.charAt(0) === ".") {
            path = path.substring(1)
        }
        return {
            context: context,
            path: path,
            endpos: endpos
        }
    };
    fluid.fetchContextReference = function (parsed, directModel, env) {
        var base = parsed.context ? env[parsed.context] : directModel;
        if (!base) {
            return base
        }
        return fluid.model.getBeanValue(base, parsed.path)
    };
    fluid.resolveContextValue = function (string, options) {
        if (options.bareContextRefs && string.charAt(0) === "{") {
            var parsed = fluid.parseContextReference(string, 0);
            return options.fetcher(parsed)
        } else {
            if (options.ELstyle && options.ELstyle !== "${}") {
                var parsed = fluid.extractELWithContext(string, options);
                if (parsed) {
                    return options.fetcher(parsed)
                }
            }
        }
        while (typeof(string) === "string") {
            var i1 = string.indexOf("${");
            var i2 = string.indexOf("}", i1 + 2);
            var all = (i1 === 0 && i2 === string.length - 1);
            if (i1 !== -1 && i2 !== -1) {
                var parsed;
                if (string.charAt(i1 + 2) === "{") {
                    parsed = fluid.parseContextReference(string, i1 + 2, "}");
                    i2 = parsed.endpos
                } else {
                    parsed = {
                        path: string.substring(i1 + 2, i2)
                    }
                }
                var subs = options.fetcher(parsed);
                if (subs === undefined || subs === null) {
                    return subs
                }
                string = all ? subs : string.substring(0, i1) + subs + string.substring(i2 + 1)
            } else {
                break
            }
        }
        return string
    };

    function resolveEnvironmentImpl(obj, options) {
        function recurse(arg) {
            return resolveEnvironmentImpl(arg, options)
        }
        if (typeof(obj) === "string" && !options.noValue) {
            return fluid.resolveContextValue(obj, options)
        } else {
            if (fluid.isPrimitive(obj) || obj.nodeType !== undefined || obj.jquery) {
                return obj
            } else {
                if (options.filter) {
                    return options.filter(obj, recurse, options)
                } else {
                    return (options.noCopy ? fluid.each : fluid.transform)(obj, function (value, key) {
                        return resolveEnvironmentImpl(value, options)
                    })
                }
            }
        }
    }
    fluid.defaults("fluid.resolveEnvironment", {
        ELstyle: "${}",
        bareContextRefs: true
    });
    fluid.resolveEnvironment = function (obj, directModel, userOptions) {
        directModel = directModel || {};
        var options = fluid.merge(null, {}, fluid.defaults("fluid.resolveEnvironment"), userOptions);
        if (!options.fetcher) {
            var env = fluid.threadLocal();
            options.fetcher = function (parsed) {
                return fluid.fetchContextReference(parsed, directModel, env)
            }
        }
        return resolveEnvironmentImpl(obj, options)
    };
    fluid.registerNamespace("fluid.expander");
    fluid.expander.makeDefaultFetchOptions = function (successdisposer, failid, options) {
        return $.extend(true, {
            dataType: "text"
        }, options, {
            success: function (response, environmentdisposer) {
                var json = JSON.parse(response);
                environmentdisposer(successdisposer(json))
            },
            error: function (response, textStatus) {
                fluid.log("Error fetching " + failid + ": " + textStatus)
            }
        })
    };
    fluid.expander.makeFetchExpander = function (options) {
        return {
            expander: {
                type: "fluid.expander.deferredFetcher",
                href: options.url,
                options: fluid.expander.makeDefaultFetchOptions(options.disposer, options.url, options.options),
                resourceSpecCollector: "{resourceSpecCollector}",
                fetchKey: options.fetchKey
            }
        }
    };
    fluid.expander.deferredFetcher = function (target, source) {
        var expander = source.expander;
        var spec = fluid.copy(expander);
        var collector = fluid.resolveEnvironment(expander.resourceSpecCollector);
        delete spec.type;
        delete spec.resourceSpecCollector;
        delete spec.fetchKey;
        var environmentdisposer = function (disposed) {
            $.extend(target, disposed)
        };
        spec.options.success = function (response) {
            expander.options.success(response, environmentdisposer)
        };
        var key = expander.fetchKey || fluid.allocateGuid();
        collector[key] = spec;
        return target
    };
    fluid.expander.deferredCall = function (target, source) {
        var expander = source.expander;
        var args = (!expander.args || fluid.isArrayable(expander.args)) ? expander.args : $.makeArray(expander.args);
        return fluid.invokeGlobalFunction(expander.func, args)
    };
    fluid.deferredCall = fluid.expander.deferredCall;
    fluid.deferredInvokeCall = function (target, source) {
        var expander = source.expander;
        var args = (!expander.args || fluid.isArrayable(expander.args)) ? expander.args : $.makeArray(expander.args);
        return fluid.invoke(expander.func, args)
    };
    fluid.expander.noexpand = function (target, source) {
        return $.extend(target, source.expander.tree)
    };
    fluid.noexpand = fluid.expander.noexpand;
    fluid.expander.lightFilter = function (obj, recurse, options) {
        var togo;
        if (fluid.isArrayable(obj)) {
            togo = (options.noCopy ? fluid.each : fluid.transform)(obj, function (value) {
                return recurse(value)
            })
        } else {
            togo = options.noCopy ? obj : {};
            for (var key in obj) {
                var value = obj[key];
                var expander;
                if (key === "expander" && !(options.expandOnly && options.expandOnly[value.type])) {
                    expander = fluid.getGlobalValue(value.type);
                    if (expander) {
                        return expander.call(null, togo, obj)
                    }
                }
                if (key !== "expander" || !expander) {
                    togo[key] = recurse(value)
                }
            }
        }
        return options.noCopy ? obj : togo
    };
    fluid.expander.expandLight = function (source, expandOptions) {
        var options = $.extend({}, expandOptions);
        options.filter = fluid.expander.lightFilter;
        return fluid.resolveEnvironment(source, options.model, options)
    }
})(jQuery, fluid_1_2);
(function ($) {
    $("head").append("<style type='text/css'>.fl-progEnhance-basic, .fl-ProgEnhance-basic { display: none; }</style>")
})(jQuery);
XMLP = function (strXML) {
    this.m_xml = strXML;
    this.m_iP = 0;
    this.m_iState = XMLP._STATE_PROLOG;
    this.m_stack = [];
    this.m_attributes = {};
    this.m_emitSynthetic = false
};
XMLP.closedTags = {
    abbr: true,
    br: true,
    col: true,
    img: true,
    input: true,
    link: true,
    meta: true,
    param: true,
    hr: true,
    area: true,
    embed: true
};
XMLP._NONE = 0;
XMLP._ELM_B = 1;
XMLP._ELM_E = 2;
XMLP._ELM_EMP = 3;
XMLP._ATT = 4;
XMLP._TEXT = 5;
XMLP._ENTITY = 6;
XMLP._PI = 7;
XMLP._CDATA = 8;
XMLP._COMMENT = 9;
XMLP._DTD = 10;
XMLP._ERROR = 11;
XMLP._CONT_XML = 0;
XMLP._CONT_ALT = 1;
XMLP._ATT_NAME = 0;
XMLP._ATT_VAL = 1;
XMLP._STATE_PROLOG = 1;
XMLP._STATE_DOCUMENT = 2;
XMLP._STATE_MISC = 3;
XMLP._errs = [];
XMLP._errs[XMLP.ERR_CLOSE_PI = 0] = "PI: missing closing sequence";
XMLP._errs[XMLP.ERR_CLOSE_DTD = 1] = "DTD: missing closing sequence";
XMLP._errs[XMLP.ERR_CLOSE_COMMENT = 2] = "Comment: missing closing sequence";
XMLP._errs[XMLP.ERR_CLOSE_CDATA = 3] = "CDATA: missing closing sequence";
XMLP._errs[XMLP.ERR_CLOSE_ELM = 4] = "Element: missing closing sequence";
XMLP._errs[XMLP.ERR_CLOSE_ENTITY = 5] = "Entity: missing closing sequence";
XMLP._errs[XMLP.ERR_PI_TARGET = 6] = "PI: target is required";
XMLP._errs[XMLP.ERR_ELM_EMPTY = 7] = "Element: cannot be both empty and closing";
XMLP._errs[XMLP.ERR_ELM_NAME = 8] = 'Element: name must immediatly follow "<"';
XMLP._errs[XMLP.ERR_ELM_LT_NAME = 9] = 'Element: "<" not allowed in element names';
XMLP._errs[XMLP.ERR_ATT_VALUES = 10] = "Attribute: values are required and must be in quotes";
XMLP._errs[XMLP.ERR_ATT_LT_NAME = 11] = 'Element: "<" not allowed in attribute names';
XMLP._errs[XMLP.ERR_ATT_LT_VALUE = 12] = 'Attribute: "<" not allowed in attribute values';
XMLP._errs[XMLP.ERR_ATT_DUP = 13] = "Attribute: duplicate attributes not allowed";
XMLP._errs[XMLP.ERR_ENTITY_UNKNOWN = 14] = "Entity: unknown entity";
XMLP._errs[XMLP.ERR_INFINITELOOP = 15] = "Infinite loop";
XMLP._errs[XMLP.ERR_DOC_STRUCTURE = 16] = "Document: only comments, processing instructions, or whitespace allowed outside of document element";
XMLP._errs[XMLP.ERR_ELM_NESTING = 17] = "Element: must be nested correctly";
XMLP.prototype._checkStructure = function (iEvent) {
    var stack = this.m_stack;
    if (XMLP._STATE_PROLOG == this.m_iState) {
        this.m_iState = XMLP._STATE_DOCUMENT
    }
    if (XMLP._STATE_DOCUMENT === this.m_iState) {
        if ((XMLP._ELM_B == iEvent) || (XMLP._ELM_EMP == iEvent)) {
            this.m_stack[stack.length] = this.getName()
        }
        if ((XMLP._ELM_E == iEvent) || (XMLP._ELM_EMP == iEvent)) {
            if (stack.length === 0) {
                return XMLP._NONE
            }
            var strTop = stack[stack.length - 1];
            this.m_stack.length--;
            if (strTop === null || strTop !== this.getName()) {
                return this._setErr(XMLP.ERR_ELM_NESTING)
            }
        }
    }
    return iEvent
};
XMLP.prototype.getColumnNumber = function () {
    return SAXStrings.getColumnNumber(this.m_xml, this.m_iP)
};
XMLP.prototype.getContent = function () {
    return (this.m_cSrc == XMLP._CONT_XML) ? this.m_xml : this.m_cAlt
};
XMLP.prototype.getContentBegin = function () {
    return this.m_cB
};
XMLP.prototype.getContentEnd = function () {
    return this.m_cE
};
XMLP.prototype.getLineNumber = function () {
    return SAXStrings.getLineNumber(this.m_xml, this.m_iP)
};
XMLP.prototype.getName = function () {
    return this.m_name
};
XMLP.prototype.next = function () {
    return this._checkStructure(this._parse())
};
XMLP.prototype._parse = function () {
    var iP = this.m_iP;
    var xml = this.m_xml;
    if (iP === xml.length) {
        return XMLP._NONE
    }
    var c = xml.charAt(iP);
    if (c === "<") {
        var c2 = xml.charAt(iP + 1);
        if (c2 === "?") {
            return this._parsePI(iP + 2)
        } else {
            if (c2 === "!") {
                if (iP === xml.indexOf("<!DOCTYPE", iP)) {
                    return this._parseDTD(iP + 9)
                } else {
                    if (iP === xml.indexOf("<!--", iP)) {
                        return this._parseComment(iP + 4)
                    } else {
                        if (iP === xml.indexOf("<![CDATA[", iP)) {
                            return this._parseCDATA(iP + 9)
                        }
                    }
                }
            } else {
                return this._parseElement(iP + 1)
            }
        }
    } else {
        return this._parseText(iP)
    }
};
(function () {
    nameRegex = /([^\s\/>]+)/g;
    attrStartRegex = /\s*([\w:_][\w:_\-\.]*)/gm;
    attrValRegex = /\"([^\"]*)\"\s*/gm;
    attrValIERegex = /([^\>\s]+)\s*/gm;
    closeRegex = /\s*<\//g;
    XMLP.prototype._parseElement = function (iB) {
        var iE, iDE, iRet;
        var iType, strN, iLast;
        iDE = iE = this.m_xml.indexOf(">", iB);
        if (iE == -1) {
            return this._setErr(XMLP.ERR_CLOSE_ELM)
        }
        if (this.m_xml.charAt(iB) == "/") {
            iType = XMLP._ELM_E;
            iB++
        } else {
            iType = XMLP._ELM_B
        }
        if (this.m_xml.charAt(iE - 1) == "/") {
            if (iType == XMLP._ELM_E) {
                return this._setErr(XMLP.ERR_ELM_EMPTY)
            }
            iType = XMLP._ELM_EMP;
            iDE--
        }
        nameRegex.lastIndex = iB;
        var nameMatch = nameRegex.exec(this.m_xml);
        if (!nameMatch) {
            return this._setErr(XMLP.ERR_ELM_NAME)
        }
        strN = nameMatch[1].toLowerCase();
        if ("li" === strN && iType !== XMLP._ELM_E && this.m_stack.length > 0 && this.m_stack[this.m_stack.length - 1] === "li" && !this.m_emitSynthetic) {
            this.m_name = "li";
            this.m_emitSynthetic = true;
            return XMLP._ELM_E
        }
        this.m_attributes = {};
        this.m_cAlt = "";
        if (nameRegex.lastIndex < iDE) {
            this.m_iP = nameRegex.lastIndex;
            while (this.m_iP < iDE) {
                attrStartRegex.lastIndex = this.m_iP;
                var attrMatch = attrStartRegex.exec(this.m_xml);
                if (!attrMatch) {
                    return this._setErr(XMLP.ERR_ATT_VALUES)
                }
                var attrname = attrMatch[1].toLowerCase();
                var attrval;
                if (this.m_xml.charCodeAt(attrStartRegex.lastIndex) === 61) {
                    var valRegex = this.m_xml.charCodeAt(attrStartRegex.lastIndex + 1) === 34 ? attrValRegex : attrValIERegex;
                    valRegex.lastIndex = attrStartRegex.lastIndex + 1;
                    attrMatch = valRegex.exec(this.m_xml);
                    if (!attrMatch) {
                        return this._setErr(XMLP.ERR_ATT_VALUES)
                    }
                    attrval = attrMatch[1]
                } else {
                    attrval = attrname;
                    valRegex = attrStartRegex
                }
                if (!this.m_attributes[attrname]) {
                    this.m_attributes[attrname] = attrval
                } else {
                    return this._setErr(XMLP.ERR_ATT_DUP)
                }
                this.m_iP = valRegex.lastIndex
            }
        }
        if (strN.indexOf("<") != -1) {
            return this._setErr(XMLP.ERR_ELM_LT_NAME)
        }
        this.m_name = strN;
        this.m_iP = iE + 1;
        if (XMLP.closedTags[strN]) {
            closeRegex.lastIndex = iE + 1;
            var closeMatch = closeRegex.exec;
            if (closeMatch) {
                var matchclose = this.m_xml.indexOf(strN, closeMatch.lastIndex);
                if (matchclose === closeMatch.lastIndex) {
                    return iType
                } else {
                    return XMLP._ELM_EMP
                }
            }
        }
        this.m_emitSynthetic = false;
        return iType
    }
})();
XMLP.prototype._parseCDATA = function (iB) {
    var iE = this.m_xml.indexOf("]]>", iB);
    if (iE == -1) {
        return this._setErr(XMLP.ERR_CLOSE_CDATA)
    }
    this._setContent(XMLP._CONT_XML, iB, iE);
    this.m_iP = iE + 3;
    return XMLP._CDATA
};
XMLP.prototype._parseComment = function (iB) {
    var iE = this.m_xml.indexOf("-->", iB);
    if (iE == -1) {
        return this._setErr(XMLP.ERR_CLOSE_COMMENT)
    }
    this._setContent(XMLP._CONT_XML, iB - 4, iE + 3);
    this.m_iP = iE + 3;
    return XMLP._COMMENT
};
XMLP.prototype._parseDTD = function (iB) {
    var iE, strClose, iInt, iLast;
    iE = this.m_xml.indexOf(">", iB);
    if (iE == -1) {
        return this._setErr(XMLP.ERR_CLOSE_DTD)
    }
    iInt = this.m_xml.indexOf("[", iB);
    strClose = ((iInt != -1) && (iInt < iE)) ? "]>" : ">";
    while (true) {
        if (iE == iLast) {
            return this._setErr(XMLP.ERR_INFINITELOOP)
        }
        iLast = iE;
        iE = this.m_xml.indexOf(strClose, iB);
        if (iE == -1) {
            return this._setErr(XMLP.ERR_CLOSE_DTD)
        }
        if (this.m_xml.substring(iE - 1, iE + 2) != "]]>") {
            break
        }
    }
    this.m_iP = iE + strClose.length;
    return XMLP._DTD
};
XMLP.prototype._parsePI = function (iB) {
    var iE, iTB, iTE, iCB, iCE;
    iE = this.m_xml.indexOf("?>", iB);
    if (iE == -1) {
        return this._setErr(XMLP.ERR_CLOSE_PI)
    }
    iTB = SAXStrings.indexOfNonWhitespace(this.m_xml, iB, iE);
    if (iTB == -1) {
        return this._setErr(XMLP.ERR_PI_TARGET)
    }
    iTE = SAXStrings.indexOfWhitespace(this.m_xml, iTB, iE);
    if (iTE == -1) {
        iTE = iE
    }
    iCB = SAXStrings.indexOfNonWhitespace(this.m_xml, iTE, iE);
    if (iCB == -1) {
        iCB = iE
    }
    iCE = SAXStrings.lastIndexOfNonWhitespace(this.m_xml, iCB, iE);
    if (iCE == -1) {
        iCE = iE - 1
    }
    this.m_name = this.m_xml.substring(iTB, iTE);
    this._setContent(XMLP._CONT_XML, iCB, iCE + 1);
    this.m_iP = iE + 2;
    return XMLP._PI
};
XMLP.prototype._parseText = function (iB) {
    var iE = this.m_xml.indexOf("<", iB);
    if (iE == -1) {
        iE = this.m_xml.length
    }
    this._setContent(XMLP._CONT_XML, iB, iE);
    this.m_iP = iE;
    return XMLP._TEXT
};
XMLP.prototype._setContent = function (iSrc) {
    var args = arguments;
    if (XMLP._CONT_XML == iSrc) {
        this.m_cAlt = null;
        this.m_cB = args[1];
        this.m_cE = args[2]
    } else {
        this.m_cAlt = args[1];
        this.m_cB = 0;
        this.m_cE = args[1].length
    }
    this.m_cSrc = iSrc
};
XMLP.prototype._setErr = function (iErr) {
    var strErr = XMLP._errs[iErr];
    this.m_cAlt = strErr;
    this.m_cB = 0;
    this.m_cE = strErr.length;
    this.m_cSrc = XMLP._CONT_ALT;
    return XMLP._ERROR
};
SAXStrings = {};
SAXStrings.WHITESPACE = " \t\n\r";
SAXStrings.QUOTES = "\"'";
SAXStrings.getColumnNumber = function (strD, iP) {
    if (!strD) {
        return -1
    }
    iP = iP || strD.length;
    var arrD = strD.substring(0, iP).split("\n");
    arrD.length--;
    var iLinePos = arrD.join("\n").length;
    return iP - iLinePos
};
SAXStrings.getLineNumber = function (strD, iP) {
    if (!strD) {
        return -1
    }
    iP = iP || strD.length;
    return strD.substring(0, iP).split("\n").length
};
SAXStrings.indexOfNonWhitespace = function (strD, iB, iE) {
    if (!strD) {
        return -1
    }
    iB = iB || 0;
    iE = iE || strD.length;
    for (var i = iB; i < iE; ++i) {
        var c = strD.charAt(i);
        if (c !== " " && c !== "\t" && c !== "\n" && c !== "\r") {
            return i
        }
    }
    return -1
};
SAXStrings.indexOfWhitespace = function (strD, iB, iE) {
    if (!strD) {
        return -1
    }
    iB = iB || 0;
    iE = iE || strD.length;
    for (var i = iB; i < iE; i++) {
        if (SAXStrings.WHITESPACE.indexOf(strD.charAt(i)) != -1) {
            return i
        }
    }
    return -1
};
SAXStrings.lastIndexOfNonWhitespace = function (strD, iB, iE) {
    if (!strD) {
        return -1
    }
    iB = iB || 0;
    iE = iE || strD.length;
    for (var i = iE - 1; i >= iB; i--) {
        if (SAXStrings.WHITESPACE.indexOf(strD.charAt(i)) == -1) {
            return i
        }
    }
    return -1
};
SAXStrings.replace = function (strD, iB, iE, strF, strR) {
    if (!strD) {
        return ""
    }
    iB = iB || 0;
    iE = iE || strD.length;
    return strD.substring(iB, iE).split(strF).join(strR)
};
fluid_1_2 = fluid_1_2 || {};
(function ($, fluid) {
    fluid.parseTemplate = function (template, baseURL, scanStart, cutpoints_in, opts) {
        opts = opts || {};
        if (!template) {
            fluid.fail("empty template supplied to fluid.parseTemplate")
        }
        var t;
        var parser;
        var tagstack;
        var lumpindex = 0;
        var nestingdepth = 0;
        var justended = false;
        var defstart = -1;
        var defend = -1;
        var parseOptions = opts;
        var baseURL;
        var debugMode = false;
        var cutpoints = [];
        var simpleClassCutpoints = {};
        var cutstatus = [];
        XMLLump = function (lumpindex, nestingdepth) {
            return {
                nestingdepth: nestingdepth,
                lumpindex: lumpindex,
                parent: t
            }
        };

        function isSimpleClassCutpoint(tree) {
            return tree.length === 1 && tree[0].predList.length === 1 && tree[0].predList[0].clazz
        }
        function init(baseURLin, debugModeIn, cutpointsIn) {
            t.rootlump = XMLLump(0, -1);
            tagstack = [t.rootlump];
            lumpindex = 0;
            nestingdepth = 0;
            justended = false;
            defstart = -1;
            defend = -1;
            baseURL = baseURLin;
            debugMode = debugModeIn;
            if (cutpointsIn) {
                for (var i = 0; i < cutpointsIn.length; ++i) {
                    var tree = fluid.parseSelector(cutpointsIn[i].selector);
                    var clazz = isSimpleClassCutpoint(tree);
                    if (clazz) {
                        simpleClassCutpoints[clazz] = cutpointsIn[i].id
                    } else {
                        cutstatus.push([]);
                        cutpoints.push($.extend({}, cutpointsIn[i], {
                            tree: tree
                        }))
                    }
                }
            }
        }
        function findTopContainer() {
            for (var i = tagstack.length - 1; i >= 0; --i) {
                var lump = tagstack[i];
                if (lump.rsfID !== undefined) {
                    return lump
                }
            }
            return t.rootlump
        }
        function newLump() {
            var togo = XMLLump(lumpindex, nestingdepth);
            if (debugMode) {
                togo.line = parser.getLineNumber();
                togo.column = parser.getColumnNumber()
            }
            t.lumps[lumpindex] = togo;
            ++lumpindex;
            return togo
        }
        function addLump(mmap, ID, lump) {
            var list = mmap[ID];
            if (!list) {
                list = [];
                mmap[ID] = list
            }
            list[list.length] = lump
        }
        function checkContribute(ID, lump) {
            if (ID.indexOf("scr=contribute-") !== -1) {
                var scr = ID.substring("scr=contribute-".length);
                addLump(t.collectmap, scr, lump)
            }
        }
        function debugLump(lump) {
            return "<" + lump.tagname + ">"
        }
        function hasCssClass(clazz, totest) {
            if (!totest) {
                return false
            }
            return (" " + totest + " ").indexOf(" " + clazz + " ") !== -1
        }
        function matchNode(term, headlump, headclazz) {
            if (term.predList) {
                for (var i = 0; i < term.predList.length; ++i) {
                    var pred = term.predList[i];
                    if (pred.id && headlump.attributemap.id !== pred.id) {
                        return false
                    }
                    if (pred.clazz && !hasCssClass(pred.clazz, headclazz)) {
                        return false
                    }
                    if (pred.tag && headlump.tagname !== pred.tag) {
                        return false
                    }
                }
                return true
            }
        }
        function tagStartCut(headlump) {
            var togo = undefined;
            var headclazz = headlump.attributemap["class"];
            if (headclazz) {
                var split = headclazz.split(" ");
                for (var i = 0; i < split.length; ++i) {
                    var simpleCut = simpleClassCutpoints[$.trim(split[i])];
                    if (simpleCut) {
                        return simpleCut
                    }
                }
            }
            for (var i = 0; i < cutpoints.length; ++i) {
                var cut = cutpoints[i];
                var cutstat = cutstatus[i];
                var nextterm = cutstat.length;
                if (nextterm < cut.tree.length) {
                    var term = cut.tree[nextterm];
                    if (nextterm > 0) {
                        if (cut.tree[nextterm - 1].child && cutstat[nextterm - 1] !== headlump.nestingdepth - 1) {
                            continue
                        }
                    }
                    var isMatch = matchNode(term, headlump, headclazz);
                    if (isMatch) {
                        cutstat[cutstat.length] = headlump.nestingdepth;
                        if (cutstat.length === cut.tree.length) {
                            if (togo !== undefined) {
                                fluid.fail("Cutpoint specification error - node " + debugLump(headlump) + " has already matched with rsf:id of " + togo)
                            }
                            if (cut.id === undefined || cut.id === null) {
                                fluid.fail("Error in cutpoints list - entry at position " + i + " does not have an id set")
                            }
                            togo = cut.id
                        }
                    }
                }
            }
            return togo
        }
        function tagEndCut() {
            if (cutpoints) {
                for (var i = 0; i < cutpoints.length; ++i) {
                    var cutstat = cutstatus[i];
                    if (cutstat.length > 0 && cutstat[cutstat.length - 1] === nestingdepth) {
                        cutstat.length--
                    }
                }
            }
        }
        function processTagStart(isempty, text) {
            ++nestingdepth;
            if (justended) {
                justended = false;
                var backlump = newLump();
                backlump.nestingdepth--
            }
            if (t.firstdocumentindex === -1) {
                t.firstdocumentindex = lumpindex
            }
            var headlump = newLump();
            var stacktop = tagstack[tagstack.length - 1];
            headlump.uplump = stacktop;
            var tagname = parser.getName();
            headlump.tagname = tagname;
            var attrs = headlump.attributemap = parser.m_attributes;
            var ID = attrs[fluid.ID_ATTRIBUTE];
            if (ID === undefined) {
                ID = tagStartCut(headlump)
            }
            for (var attrname in attrs) {
                var attrval = attrs[attrname];
                if (ID === undefined) {
                    if (/href|src|codebase|action/.test(attrname)) {
                        ID = "scr=rewrite-url"
                    } else {
                        if (ID === undefined && /for|headers/.test(attrname)) {
                            ID = "scr=null"
                        }
                    }
                }
            }
            if (ID) {
                if (ID.charCodeAt(0) === 126) {
                    ID = ID.substring(1);
                    headlump.elide = true
                }
                checkContribute(ID, headlump);
                headlump.rsfID = ID;
                var downreg = findTopContainer();
                if (!downreg.downmap) {
                    downreg.downmap = {}
                }
                while (downreg) {
                    if (downreg.downmap) {
                        addLump(downreg.downmap, ID, headlump)
                    }
                    downreg = downreg.uplump
                }
                addLump(t.globalmap, ID, headlump);
                var colpos = ID.indexOf(":");
                if (colpos !== -1) {
                    var prefix = ID.substring(0, colpos);
                    if (!stacktop.finallump) {
                        stacktop.finallump = {}
                    }
                    stacktop.finallump[prefix] = headlump
                }
            }
            headlump.text = "<" + tagname + fluid.dumpAttributes(attrs) + (isempty && !ID ? "/>" : ">");
            tagstack[tagstack.length] = headlump;
            if (isempty) {
                if (ID) {
                    processTagEnd()
                } else {
                    --nestingdepth;
                    tagstack.length--
                }
            }
        }
        function processTagEnd() {
            tagEndCut();
            var endlump = newLump();
            --nestingdepth;
            endlump.text = "</" + parser.getName() + ">";
            var oldtop = tagstack[tagstack.length - 1];
            oldtop.close_tag = t.lumps[lumpindex - 1];
            tagstack.length--;
            justended = true
        }
        function processDefaultTag() {
            if (defstart !== -1) {
                if (t.firstdocumentindex === -1) {
                    t.firstdocumentindex = lumpindex
                }
                var text = parser.getContent().substr(defstart, defend - defstart);
                justended = false;
                var newlump = newLump();
                newlump.text = text;
                defstart = -1
            }
        }
        t = fluid.XMLViewTemplate();
        init(baseURL, opts.debugMode, cutpoints_in);
        var idpos = template.indexOf(fluid.ID_ATTRIBUTE);
        if (scanStart) {
            var brackpos = template.indexOf(">", idpos);
            parser = new XMLP(template.substring(brackpos + 1))
        } else {
            parser = new XMLP(template)
        }
        parseloop: while (true) {
            var iEvent = parser.next();
            switch (iEvent) {
            case XMLP._ELM_B:
                processDefaultTag();
                processTagStart(false, "");
                break;
            case XMLP._ELM_E:
                processDefaultTag();
                processTagEnd();
                break;
            case XMLP._ELM_EMP:
                processDefaultTag();
                processTagStart(true, "");
                break;
            case XMLP._PI:
            case XMLP._DTD:
                defstart = -1;
                continue;
            case XMLP._TEXT:
            case XMLP._ENTITY:
            case XMLP._CDATA:
            case XMLP._COMMENT:
                if (defstart === -1) {
                    defstart = parser.m_cB
                }
                defend = parser.m_cE;
                break;
            case XMLP._ERROR:
                fluid.setLogging(true);
                var message = "Error parsing template: " + parser.m_cAlt + " at line " + parser.getLineNumber();
                fluid.log(message);
                fluid.log("Just read: " + parser.m_xml.substring(parser.m_iP - 30, parser.m_iP));
                fluid.log("Still to read: " + parser.m_xml.substring(parser.m_iP, parser.m_iP + 30));
                fluid.fail(message);
                break parseloop;
            case XMLP._NONE:
                break parseloop
            }
        }
        processDefaultTag();
        var excess = tagstack.length - 1;
        if (excess) {
            fluid.fail("Error parsing template - unclosed tag(s) of depth " + (excess) + ": " + fluid.transform(tagstack.splice(1, excess), function (lump) {
                return debugLump(lump)
            }).join(", "))
        }
        return t
    };
    fluid.debugLump = function (lump) {
        var togo = lump.text;
        togo += " at ";
        togo += "lump line " + lump.line + " column " + lump.column + " index " + lump.lumpindex;
        togo += lump.parent.href === null ? "" : " in file " + lump.parent.href;
        return togo
    };
    fluid.ID_ATTRIBUTE = "rsf:id";
    fluid.getPrefix = function (id) {
        var colpos = id.indexOf(":");
        return colpos === -1 ? id : id.substring(0, colpos)
    };
    fluid.SplitID = function (id) {
        var that = {};
        var colpos = id.indexOf(":");
        if (colpos === -1) {
            that.prefix = id
        } else {
            that.prefix = id.substring(0, colpos);
            that.suffix = id.substring(colpos + 1)
        }
        return that
    };
    fluid.XMLViewTemplate = function () {
        return {
            globalmap: {},
            collectmap: {},
            lumps: [],
            firstdocumentindex: -1
        }
    };
    var composeCallbacks = function (internal, external) {
        return external ?
        function () {
            try {
                external.apply(null, arguments)
            } catch (e) {
                fluid.log("Exception applying external fetchResources callback: " + e)
            }
            internal.apply(null, arguments)
        } : internal
    };
    var composePolicy = function (target, source, key) {
        target[key] = composeCallbacks(target[key], source[key])
    };
    fluid.defaults("fluid.fetchResources", {
        mergePolicy: {
            success: composePolicy,
            error: composePolicy,
            url: "reverse"
        }
    });

    function timeSuccessCallback(resourceSpec) {
        if (resourceSpec.timeSuccess && resourceSpec.options && resourceSpec.options.success) {
            var success = resourceSpec.options.success;
            resourceSpec.options.success = function () {
                var startTime = new Date();
                var ret = success.apply(null, arguments);
                fluid.log("External callback for URL " + resourceSpec.href + " completed - callback time: " + (new Date().getTime() - startTime.getTime()) + "ms");
                return ret
            }
        }
    }
    var resourceCache = {};

    function canonUrl(url) {
        return url
    }
    var fetchResourcesImpl = function (specStructure, callback) {
        var resourceCallback = function (thisSpec) {
            function completeRequest() {
                thisSpec.queued = false;
                thisSpec.completeTime = new Date();
                fluid.log("Request to URL " + thisSpec.href + " completed - total elapsed time: " + (thisSpec.completeTime.getTime() - thisSpec.initTime.getTime()) + "ms");
                fetchResourcesImpl(specStructure, callback)
            }
            return {
                success: function (response) {
                    thisSpec.resourceText = response;
                    thisSpec.resourceKey = thisSpec.href;
                    if (thisSpec.forceCache) {
                        var canon = canonUrl(thisSpec.href);
                        var cached = resourceCache[canon];
                        if (cached.$$firer$$) {
                            resourceCache[canon] = response;
                            cached.fire(response)
                        }
                    }
                    completeRequest()
                },
                error: function (response, textStatus, errorThrown) {
                    thisSpec.fetchError = {
                        status: response.status,
                        textStatus: response.textStatus,
                        errorThrown: errorThrown
                    };
                    completeRequest()
                }
            }
        };
        var complete = true;
        var allSync = true;
        var resourceSpecs = specStructure.specs;
        for (var key in resourceSpecs) {
            var resourceSpec = resourceSpecs[key];
            if (!resourceSpec.options || resourceSpec.options.async) {
                allSync = false
            }
            if (resourceSpec.url && !resourceSpec.href) {
                resourceSpec.href = resourceSpec.url
            }
            if (resourceSpec.href && !resourceSpec.completeTime) {
                if (!resourceSpec.queued) {
                    var thisCallback = resourceCallback(resourceSpec);
                    var options = {
                        url: resourceSpec.href,
                        success: thisCallback.success,
                        error: thisCallback.error
                    };
                    timeSuccessCallback(resourceSpec);
                    fluid.merge(fluid.defaults("fluid.fetchResources").mergePolicy, options, resourceSpec.options);
                    resourceSpec.queued = true;
                    resourceSpec.initTime = new Date();
                    fluid.log("Request with key " + key + " queued for " + resourceSpec.href);
                    var canon = canonUrl(resourceSpec.href);
                    if (resourceSpec.forceCache) {
                        var cached = resourceCache[canon];
                        if (!cached) {
                            fluid.log("First request for cached resource with url " + canon);
                            cached = fluid.event.getEventFirer();
                            cached.$$firer$$ = true;
                            resourceCache[canon] = cached;
                            options.cache = false;
                            $.ajax(options)
                        } else {
                            if (!cached.$$firer$$) {
                                options.success(cached)
                            } else {
                                fluid.log("Request for cached resource which is in flight: url " + canon);
                                cached.addListener(function (response) {
                                    options.success(cached)
                                })
                            }
                        }
                    } else {
                        $.ajax(options)
                    }
                }
                if (resourceSpec.queued) {
                    complete = false
                }
            } else {
                if (resourceSpec.nodeId && !resourceSpec.resourceText) {
                    var node = document.getElementById(resourceSpec.nodeId);
                    resourceSpec.resourceText = fluid.dom.getElementText(node);
                    resourceSpec.resourceKey = resourceSpec.nodeId
                }
            }
        }
        if (complete && callback && !specStructure.callbackCalled) {
            specStructure.callbackCalled = true;
            if ($.browser.mozilla && !allSync) {
                setTimeout(function () {
                    callback(resourceSpecs)
                }, 1)
            } else {
                callback(resourceSpecs)
            }
        }
    };
    fluid.fetchResources = function (resourceSpecs, callback) {
        return fetchResourcesImpl({
            specs: resourceSpecs
        }, callback)
    };
    fluid.primeCacheFromResources = function (componentName) {
        var resources = fluid.defaults(componentName).resources;
        var expanded = fluid.expandOptions(fluid.copy(resources));
        fluid.fetchResources(expanded)
    };
    fluid.XMLEncode = function (text) {
        return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    };
    fluid.dumpAttributes = function (attrcopy) {
        var togo = "";
        for (var attrname in attrcopy) {
            var attrvalue = attrcopy[attrname];
            if (attrvalue !== null && attrvalue !== undefined) {
                togo += " " + attrname + '="' + attrvalue + '"'
            }
        }
        return togo
    };
    fluid.aggregateMMap = function (target, source) {
        for (var key in source) {
            var targhas = target[key];
            if (!targhas) {
                target[key] = []
            }
            target[key] = target[key].concat(source[key])
        }
    };
    fluid.parseTemplates = function (resourceSpec, templateList, opts) {
        var togo = [];
        opts = opts || {};
        togo.globalmap = {};
        for (var i = 0; i < templateList.length; ++i) {
            var resource = resourceSpec[templateList[i]];
            var lastslash = resource.href.lastIndexOf("/");
            var baseURL = lastslash === -1 ? "" : resource.href.substring(0, lastslash + 1);
            var template = fluid.parseTemplate(resource.resourceText, baseURL, opts.scanStart && i === 0, resource.cutpoints, opts);
            if (i === 0) {
                fluid.aggregateMMap(togo.globalmap, template.globalmap)
            }
            template.href = resource.href;
            template.baseURL = baseURL;
            template.resourceKey = resource.resourceKey;
            togo[i] = template;
            fluid.aggregateMMap(togo.globalmap, template.rootlump.downmap)
        }
        return togo
    };
    var chars = "(?:[\\w\u0128-\uFFFF*_-]|\\\\.)";
    var quickChild = new RegExp("^>\\s*(" + chars + "+)");
    var quickID = new RegExp("^(" + chars + "+)(#)(" + chars + "+)");
    var selSeg = new RegExp("^s*([#.]?)(" + chars + "*)");
    var quickClass = new RegExp("([#.]?)(" + chars + "+)", "g");
    var childSeg = new RegExp("\\s*(>)?\\s*", "g");
    var whiteSpace = new RegExp("^\\w*$");
    fluid.parseSelector = function (selstring) {
        var togo = [];
        selstring = $.trim(selstring);
        quickClass.lastIndex = 0;
        var lastIndex = 0;
        while (true) {
            var atNode = [];
            while (true) {
                var segMatch = quickClass.exec(selstring);
                if (!segMatch || segMatch.index !== lastIndex) {
                    break
                }
                var thisNode = {};
                var text = segMatch[2];
                if (segMatch[1] === "") {
                    thisNode.tag = text
                } else {
                    if (segMatch[1] === "#") {
                        thisNode.id = text
                    } else {
                        if (segMatch[1] === ".") {
                            thisNode.clazz = text
                        }
                    }
                }
                atNode[atNode.length] = thisNode;
                lastIndex = quickClass.lastIndex
            }
            childSeg.lastIndex = lastIndex;
            var fullAtNode = {
                predList: atNode
            };
            var childMatch = childSeg.exec(selstring);
            if (!childMatch || childMatch.index !== lastIndex) {
                var remainder = selstring.substring(lastIndex);
                fluid.fail("Error in selector string - can not match child selector expression at " + remainder)
            }
            if (childMatch[1] === ">") {
                fullAtNode.child = true
            }
            togo[togo.length] = fullAtNode;
            if (childSeg.lastIndex >= selstring.length) {
                break
            }
            lastIndex = childSeg.lastIndex;
            quickClass.lastIndex = childSeg.lastIndex
        }
        return togo
    }
})(jQuery, fluid_1_2);
fluid_1_2 = fluid_1_2 || {};
(function ($, fluid) {
    function debugPosition(component) {
        return "as child of " + (component.parent.fullID ? "component with full ID " + component.parent.fullID : "root")
    }
    fluid.arrayToHash = function (array) {
        var togo = {};
        fluid.each(array, function (el) {
            togo[el] = true
        });
        return togo
    };

    function computeFullID(component) {
        var togo = "";
        var move = component;
        if (component.children === undefined) {
            togo = component.ID + (component.localID !== undefined ? component.localID : "");
            move = component.parent
        }
        while (move.parent) {
            var parent = move.parent;
            if (move.fullID !== undefined) {
                togo = move.fullID + togo;
                return togo
            }
            if (move.noID === undefined) {
                var ID = move.ID;
                if (ID === undefined) {
                    fluid.fail("Error in component tree - component found with no ID " + debugPosition(parent) + ": please check structure")
                }
                var colpos = ID.indexOf(":");
                var prefix = colpos === -1 ? ID : ID.substring(0, colpos);
                togo = prefix + ":" + (move.localID === undefined ? "" : move.localID) + ":" + togo
            }
            move = parent
        }
        return togo
    }
    var renderer = {};
    renderer.isBoundPrimitive = function (value) {
        return fluid.isPrimitive(value) || value instanceof Array && (value.length === 0 || typeof(value[0]) === "string")
    };

    function processChild(value, key) {
        if (renderer.isBoundPrimitive(value)) {
            return {
                componentType: "UIBound",
                value: value,
                ID: key
            }
        } else {
            var unzip = unzipComponent(value);
            if (unzip.ID) {
                return {
                    ID: key,
                    componentType: "UIContainer",
                    children: [unzip]
                }
            } else {
                unzip.ID = key;
                return unzip
            }
        }
    }
    function fixChildren(children) {
        if (!(children instanceof Array)) {
            var togo = [];
            for (var key in children) {
                var value = children[key];
                if (value instanceof Array) {
                    for (var i = 0; i < value.length; ++i) {
                        var processed = processChild(value[i], key);
                        togo[togo.length] = processed
                    }
                } else {
                    togo[togo.length] = processChild(value, key)
                }
            }
            return togo
        } else {
            return children
        }
    }
    function fixupValue(uibound, model) {
        if (uibound.value === undefined && uibound.valuebinding !== undefined) {
            if (!model) {
                fluid.fail("Cannot perform value fixup for valuebinding " + uibound.valuebinding + " since no model was supplied to rendering")
            }
            uibound.value = fluid.model.getBeanValue(model, uibound.valuebinding)
        }
    }
    function upgradeBound(holder, property, model) {
        if (holder[property] !== undefined) {
            if (renderer.isBoundPrimitive(holder[property])) {
                holder[property] = {
                    value: holder[property]
                }
            } else {
                if (holder[property].messagekey) {
                    holder[property].componentType = "UIMessage"
                }
            }
        } else {
            holder[property] = {
                value: null
            }
        }
        fixupValue(holder[property], model)
    }
    renderer.duckMap = {
        children: "UIContainer",
        value: "UIBound",
        valuebinding: "UIBound",
        messagekey: "UIMessage",
        markup: "UIVerbatim",
        selection: "UISelect",
        target: "UILink",
        choiceindex: "UISelectChoice",
        functionname: "UIInitBlock"
    };
    var boundMap = {
        UISelect: ["selection", "optionlist", "optionnames"],
        UILink: ["target", "linktext"],
        UIVerbatim: ["markup"]
    };
    renderer.boundMap = fluid.transform(boundMap, fluid.arrayToHash);
    renderer.inferComponentType = function (component) {
        for (var key in renderer.duckMap) {
            if (component[key] !== undefined) {
                return renderer.duckMap[key]
            }
        }
    };
    renderer.applyComponentType = function (component) {
        component.componentType = renderer.inferComponentType(component);
        if (component.componentType === undefined && component.ID !== undefined) {
            component.componentType = "UIBound"
        }
    };

    function unzipComponent(component, model) {
        if (component) {
            renderer.applyComponentType(component)
        }
        if (!component || component.componentType === undefined) {
            var decorators = component.decorators;
            if (decorators) {
                delete component.decorators
            }
            component = {
                componentType: "UIContainer",
                children: component
            };
            component.decorators = decorators
        }
        var cType = component.componentType;
        if (cType === "UIContainer") {
            component.children = fixChildren(component.children)
        } else {
            map = renderer.boundMap[cType];
            if (map) {
                fluid.each(map, function (value, key) {
                    upgradeBound(component, key, model)
                })
            }
        }
        return component
    }
    function fixupTree(tree, model) {
        if (tree.componentType === undefined) {
            tree = unzipComponent(tree, model)
        }
        if (tree.componentType !== "UIContainer" && !tree.parent) {
            tree = {
                children: [tree]
            }
        }
        if (tree.children) {
            tree.childmap = {};
            for (var i = 0; i < tree.children.length; ++i) {
                var child = tree.children[i];
                if (child.componentType === undefined) {
                    child = unzipComponent(child, model);
                    tree.children[i] = child
                }
                child.parent = tree;
                if (child.ID === undefined) {
                    fluid.fail("Error in component tree: component found with no ID " + debugPosition(child))
                }
                tree.childmap[child.ID] = child;
                var colpos = child.ID.indexOf(":");
                if (colpos === -1) {} else {
                    var prefix = child.ID.substring(0, colpos);
                    var childlist = tree.childmap[prefix];
                    if (!childlist) {
                        childlist = [];
                        tree.childmap[prefix] = childlist
                    }
                    if (child.localID === undefined && childlist.length !== 0) {
                        child.localID = childlist.length
                    }
                    childlist[childlist.length] = child
                }
                child.fullID = computeFullID(child);
                var componentType = child.componentType;
                if (componentType == "UISelect") {
                    child.selection.fullID = child.fullID + "-selection"
                } else {
                    if (componentType == "UIInitBlock") {
                        var call = child.functionname + "(";
                        for (var j = 0; j < child.arguments.length; ++j) {
                            if (child.arguments[j] instanceof fluid.ComponentReference) {
                                child.arguments[j] = child.parent.fullID + child.arguments[j].reference
                            }
                            call += JSON.stringify(child.arguments[j]);
                            if (j < child.arguments.length - 1) {
                                call += ", "
                            }
                        }
                        child.markup = {
                            value: call + ")\n"
                        };
                        child.componentType = "UIVerbatim"
                    } else {
                        if (componentType == "UIBound") {
                            fixupValue(child, model)
                        }
                    }
                }
                fixupTree(child, model)
            }
        }
        return tree
    }
    fluid.NULL_STRING = "\u25a9null\u25a9";
    var LINK_ATTRIBUTES = {
        a: "href",
        link: "href",
        img: "src",
        frame: "src",
        script: "src",
        style: "src",
        input: "src",
        embed: "src",
        form: "action",
        applet: "codebase",
        object: "codebase"
    };
    fluid.renderer = function (templates, tree, options, fossilsIn) {
        options = options || {};
        tree = tree || {};
        debugMode = options.debugMode;
        if (!options.messageLocator && options.messageSource) {
            options.messageLocator = fluid.resolveMessageSource(options.messageSource)
        }
        options.document = options.document || document;
        var directFossils = fossilsIn || {};
        var globalmap = {};
        var branchmap = {};
        var rewritemap = {};
        var seenset = {};
        var collected = {};
        var out = "";
        var renderOptions = options;
        var decoratorQueue = [];
        var renderedbindings = {};
        var that = {};

        function getRewriteKey(template, parent, id) {
            return template.resourceKey + parent.fullID + id
        }
        function resolveInScope(searchID, defprefix, scope, child) {
            var deflump;
            var scopelook = scope ? scope[searchID] : null;
            if (scopelook) {
                for (var i = 0; i < scopelook.length; ++i) {
                    var scopelump = scopelook[i];
                    if (!deflump && scopelump.rsfID == defprefix) {
                        deflump = scopelump
                    }
                    if (scopelump.rsfID == searchID) {
                        return scopelump
                    }
                }
            }
            return deflump
        }
        function resolveCall(sourcescope, child) {
            var searchID = child.jointID ? child.jointID : child.ID;
            var split = fluid.SplitID(searchID);
            var defprefix = split.prefix + ":";
            var match = resolveInScope(searchID, defprefix, sourcescope.downmap, child);
            if (match) {
                return match
            }
            if (child.children) {
                match = resolveInScope(searchID, defprefix, globalmap, child);
                if (match) {
                    return match
                }
            }
            return null
        }
        function noteCollected(template) {
            if (!seenset[template.href]) {
                fluid.aggregateMMap(collected, template.collectmap);
                seenset[template.href] = true
            }
        }
        function resolveRecurse(basecontainer, parentlump) {
            for (var i = 0; i < basecontainer.children.length; ++i) {
                var branch = basecontainer.children[i];
                if (branch.children) {
                    var resolved = resolveCall(parentlump, branch);
                    if (resolved) {
                        branchmap[branch.fullID] = resolved;
                        var id = resolved.attributemap.id;
                        if (id !== undefined) {
                            rewritemap[getRewriteKey(parentlump.parent, basecontainer, id)] = branch.fullID
                        }
                        noteCollected(resolved.parent);
                        resolveRecurse(branch, resolved)
                    }
                }
            }
            if (parentlump.downmap) {
                for (var id in parentlump.downmap) {
                    var lumps = parentlump.downmap[id];
                    for (var i = 0; i < lumps.length; ++i) {
                        var lump = lumps[i];
                        var lumpid = lump.attributemap.id;
                        if (lumpid !== undefined && lump.rsfID !== undefined) {
                            var resolved = fetchComponent(basecontainer, lump.rsfID);
                            if (resolved !== null) {
                                var resolveID = resolved.fullID;
                                if (resolved.componentType === "UISelect") {
                                    resolveID = resolveID + "-selection"
                                }
                                rewritemap[getRewriteKey(parentlump.parent, basecontainer, lumpid)] = resolveID
                            }
                        }
                    }
                }
            }
        }
        function resolveBranches(globalmapp, basecontainer, parentlump) {
            branchmap = {};
            rewritemap = {};
            seenset = {};
            collected = {};
            globalmap = globalmapp;
            branchmap[basecontainer.fullID] = parentlump;
            resolveRecurse(basecontainer, parentlump)
        }
        function dumpBranchHead(branch, targetlump) {
            if (targetlump.elide) {
                return
            }
            var attrcopy = {};
            $.extend(true, attrcopy, targetlump.attributemap);
            adjustForID(attrcopy, branch);
            outDecorators(branch, attrcopy);
            out += "<" + targetlump.tagname + " ";
            out += fluid.dumpAttributes(attrcopy);
            out += ">"
        }
        function dumpTillLump(lumps, start, limit) {
            for (; start < limit; ++start) {
                var text = lumps[start].text;
                if (text) {
                    out += lumps[start].text
                }
            }
        }
        function dumpScan(lumps, renderindex, basedepth, closeparent, insideleaf) {
            var start = renderindex;
            while (true) {
                if (renderindex === lumps.length) {
                    break
                }
                var lump = lumps[renderindex];
                if (lump.nestingdepth < basedepth) {
                    break
                }
                if (lump.rsfID !== undefined) {
                    if (!insideleaf) {
                        break
                    }
                    if (insideleaf && lump.nestingdepth > basedepth + (closeparent ? 0 : 1)) {
                        fluid.log("Error in component tree - leaf component found to contain further components - at " + lump.toString())
                    } else {
                        break
                    }
                }++renderindex
            }
            if (!closeparent && (renderindex == lumps.length || !lumps[renderindex].rsfID)) {
                --renderindex
            }
            dumpTillLump(lumps, start, renderindex);
            return renderindex
        }
        var trc = {};

        function openTag() {
            if (!trc.iselide) {
                out += "<" + trc.uselump.tagname
            }
        }
        function closeTag() {
            if (!trc.iselide) {
                out += "</" + trc.uselump.tagname + ">"
            }
        }
        function renderUnchanged() {
            dumpTillLump(trc.uselump.parent.lumps, trc.uselump.lumpindex + 1, trc.close.lumpindex + (trc.iselide ? 0 : 1))
        }
        function replaceAttributes() {
            if (!trc.iselide) {
                out += fluid.dumpAttributes(trc.attrcopy)
            }
            dumpTemplateBody()
        }
        function isSelfClose() {
            return trc.endopen.lumpindex === trc.close.lumpindex && XMLP.closedTags[trc.uselump.tagname]
        }
        function replaceAttributesOpen() {
            if (trc.iselide) {
                replaceAttributes()
            } else {
                out += fluid.dumpAttributes(trc.attrcopy);
                var selfClose = isSelfClose();
                out += selfClose ? "/>" : ">";
                trc.nextpos = selfClose ? trc.close.lumpindex + 1 : trc.endopen.lumpindex
            }
        }
        function dumpTemplateBody() {
            if (isSelfClose()) {
                if (!trc.iselide) {
                    out += "/>"
                }
            } else {
                if (!trc.iselide) {
                    out += ">"
                }
                dumpTillLump(trc.uselump.parent.lumps, trc.endopen.lumpindex, trc.close.lumpindex + (trc.iselide ? 0 : 1))
            }
        }
        function rewriteLeaf(value) {
            if (isValue(value)) {
                replaceBody(value)
            } else {
                replaceAttributes()
            }
        }
        function rewriteLeafOpen(value) {
            if (trc.iselide) {
                rewriteLeaf(trc.value)
            } else {
                if (isValue(value)) {
                    replaceBody(value)
                } else {
                    replaceAttributesOpen()
                }
            }
        }
        function replaceBody(value) {
            out += fluid.dumpAttributes(trc.attrcopy);
            if (!trc.iselide) {
                out += ">"
            }
            out += fluid.XMLEncode(value.toString());
            closeTag()
        }
        function isValue(value) {
            return value !== null && value !== undefined && !isPlaceholder(value)
        }
        function isPlaceholder(value) {
            return false
        }
        function rewriteUrl(template, url) {
            if (renderOptions.urlRewriter) {
                var rewritten = renderOptions.urlRewriter(url);
                if (rewritten) {
                    return rewritten
                }
            }
            if (!renderOptions.rebaseURLs) {
                return url
            }
            var protpos = url.indexOf(":/");
            if (url.charAt(0) === "/" || protpos !== -1 && protpos < 7) {
                return url
            } else {
                return renderOptions.baseURL + url
            }
        }
        function dumpHiddenField(todump) {
            out += '<input type="hidden" ';
            var isvirtual = todump.virtual;
            var outattrs = {};
            outattrs[isvirtual ? "id" : "name"] = todump.name;
            outattrs.value = todump.value;
            out += fluid.dumpAttributes(outattrs);
            out += " />\n"
        }
        function applyAutoBind(torender, finalID) {
            if (!finalID) {
                return
            }
            var tagname = trc.uselump.tagname;
            var applier = renderOptions.applier;

            function applyFunc() {
                fluid.applyChange(fluid.byId(finalID), undefined, applier)
            }
            if (renderOptions.autoBind && /input|select|textarea/.test(tagname) && !renderedbindings[finalID]) {
                var decorators = [{
                    jQuery: ["change", applyFunc]
                }];
                if ($.browser.msie && tagname === "input" && /radio|checkbox/.test(trc.attrcopy.type)) {
                    decorators.push({
                        jQuery: ["click", applyFunc]
                    })
                }
                if ($.browser.safari && tagname === "input" && trc.attrcopy.type === "radio") {
                    decorators.push({
                        jQuery: ["keyup", applyFunc]
                    })
                }
                outDecoratorsImpl(torender, decorators, trc.attrcopy, finalID)
            }
        }
        function dumpBoundFields(torender, parent) {
            if (torender) {
                var holder = parent ? parent : torender;
                if (directFossils && holder.valuebinding) {
                    var fossilKey = holder.submittingname || torender.finalID;
                    directFossils[fossilKey] = {
                        name: fossilKey,
                        EL: holder.valuebinding,
                        oldvalue: holder.value
                    };
                    applyAutoBind(torender, torender.finalID)
                }
                if (torender.fossilizedbinding) {
                    dumpHiddenField(torender.fossilizedbinding)
                }
                if (torender.fossilizedshaper) {
                    dumpHiddenField(torender.fossilizedshaper)
                }
            }
        }
        function dumpSelectionBindings(uiselect) {
            if (!renderedbindings[uiselect.selection.fullID]) {
                renderedbindings[uiselect.selection.fullID] = true;
                dumpBoundFields(uiselect.selection);
                dumpBoundFields(uiselect.optionlist);
                dumpBoundFields(uiselect.optionnames)
            }
        }
        function isSelectedValue(torender, value) {
            var selection = torender.selection;
            return selection.value && typeof(selection.value) !== "string" && typeof(selection.value.length) === "number" ? $.inArray(value, selection.value, value) !== -1 : selection.value === value
        }
        function getRelativeComponent(component, relativeID) {
            component = component.parent;
            while (relativeID.indexOf("..::") === 0) {
                relativeID = relativeID.substring(4);
                component = component.parent
            }
            return component.childmap[relativeID]
        }
        function adjustForID(attrcopy, component, late, forceID) {
            if (!late) {
                delete attrcopy["rsf:id"]
            }
            if (component.finalID !== undefined) {
                attrcopy.id = component.finalID
            } else {
                if (forceID !== undefined) {
                    attrcopy.id = forceID
                } else {
                    if (attrcopy.id || late) {
                        attrcopy.id = component.fullID
                    }
                }
            }
            var count = 1;
            var baseid = attrcopy.id;
            while (renderOptions.document.getElementById(attrcopy.id)) {
                attrcopy.id = baseid + "-" + (count++)
            }
            component.finalID = attrcopy.id;
            return attrcopy.id
        }
        function assignSubmittingName(attrcopy, component, parent) {
            var submitting = parent || component;
            adjustForID(attrcopy, component, true, component.fullID);
            if (submitting.submittingname === undefined && submitting.willinput !== false) {
                submitting.submittingname = submitting.finalID || submitting.fullID
            }
            return submitting.submittingname
        }
        function explodeDecorators(decorators) {
            var togo = [];
            if (decorators.type) {
                togo[0] = decorators
            } else {
                for (var key in decorators) {
                    if (key === "$") {
                        key = "jQuery"
                    }
                    var value = decorators[key];
                    var decorator = {
                        type: key
                    };
                    if (key === "jQuery") {
                        decorator.func = value[0];
                        decorator.args = value.slice(1)
                    } else {
                        if (key === "addClass" || key === "removeClass") {
                            decorator.classes = value
                        } else {
                            if (key === "attrs") {
                                decorator.attributes = value
                            } else {
                                if (key === "identify") {
                                    decorator.key = value
                                }
                            }
                        }
                    }
                    togo[togo.length] = decorator
                }
            }
            return togo
        }
        function outDecoratorsImpl(torender, decorators, attrcopy, finalID) {
            renderOptions.idMap = renderOptions.idMap || {};
            for (var i = 0; i < decorators.length; ++i) {
                var decorator = decorators[i];
                var type = decorator.type;
                if (!type) {
                    var explodedDecorators = explodeDecorators(decorator);
                    outDecoratorsImpl(torender, explodedDecorators, attrcopy, finalID);
                    continue
                }
                if (type === "$") {
                    type = decorator.type = "jQuery"
                }
                if (type === "jQuery" || type === "event" || type === "fluid") {
                    var id = adjustForID(attrcopy, torender, true, finalID);
                    decorator.id = id;
                    decoratorQueue[decoratorQueue.length] = decorator
                } else {
                    if (type === "attrs") {
                        $.extend(true, attrcopy, decorator.attributes)
                    } else {
                        if (type === "addClass" || type === "removeClass") {
                            var fakeNode = {
                                nodeType: 1,
                                className: attrcopy["class"] || ""
                            };
                            $(fakeNode)[type](decorator.classes);
                            attrcopy["class"] = fakeNode.className
                        } else {
                            if (type === "identify") {
                                var id = adjustForID(attrcopy, torender, true, finalID);
                                renderOptions.idMap[decorator.key] = id
                            } else {
                                if (type !== "null") {
                                    fluid.log("Unrecognised decorator of type " + type + " found at component of ID " + finalID)
                                }
                            }
                        }
                    }
                }
            }
        }
        function outDecorators(torender, attrcopy) {
            if (!torender.decorators) {
                return
            }
            if (torender.decorators.length === undefined) {
                torender.decorators = explodeDecorators(torender.decorators)
            }
            outDecoratorsImpl(torender, torender.decorators, attrcopy)
        }
        function resolveArgs(args) {
            if (!args) {
                return args
            }
            return fluid.transform(args, function (arg, index) {
                upgradeBound(args, index, renderOptions.model);
                return args[index].value
            })
        }
        function degradeMessage(torender) {
            if (torender.componentType === "UIMessage") {
                torender.componentType = "UIBound";
                if (!renderOptions.messageLocator) {
                    torender.value = "[No messageLocator is configured in options - please consult documentation on options.messageSource]"
                } else {
                    upgradeBound(torender, "messagekey", renderOptions.model);
                    var resArgs = resolveArgs(torender.args);
                    torender.value = renderOptions.messageLocator(torender.messagekey.value, resArgs)
                }
            }
        }
        function renderComponent(torender) {
            var attrcopy = trc.attrcopy;
            var lumps = trc.uselump.parent.lumps;
            var lumpindex = trc.uselump.lumpindex;
            degradeMessage(torender);
            var componentType = torender.componentType;
            var tagname = trc.uselump.tagname;
            outDecorators(torender, attrcopy);

            function makeFail(torender, end) {
                fluid.fail("Error in component tree - UISelectChoice with id " + torender.fullID + end)
            }
            if (componentType === "UIBound" || componentType === "UISelectChoice") {
                var parent;
                if (torender.choiceindex !== undefined) {
                    if (torender.parentRelativeID !== undefined) {
                        parent = getRelativeComponent(torender, torender.parentRelativeID);
                        if (!parent) {
                            makeFail(torender, " has parentRelativeID of " + torender.parentRelativeID + " which cannot be resolved")
                        }
                    } else {
                        makeFail(torender, " does not have parentRelativeID set")
                    }
                    assignSubmittingName(attrcopy, torender, parent.selection);
                    dumpSelectionBindings(parent)
                }
                var submittingname = parent ? parent.selection.submittingname : torender.submittingname;
                if (!parent && torender.valuebinding) {
                    submittingname = assignSubmittingName(attrcopy, torender)
                }
                if (tagname === "input" || tagname === "textarea") {
                    if (submittingname !== undefined) {
                        attrcopy.name = submittingname
                    }
                }
                dumpBoundFields(torender, parent ? parent.selection : null);
                if (typeof(torender.value) === "boolean" || attrcopy.type === "radio" || attrcopy.type === "checkbox") {
                    var underlyingValue;
                    var directValue = torender.value;
                    if (torender.choiceindex !== undefined) {
                        if (!parent.optionlist.value) {
                            fluid.fail("Error in component tree - selection control with full ID " + parent.fullID + " has no values")
                        }
                        underlyingValue = parent.optionlist.value[torender.choiceindex];
                        directValue = isSelectedValue(parent, underlyingValue)
                    }
                    if (isValue(directValue)) {
                        if (directValue) {
                            attrcopy.checked = "checked"
                        } else {
                            delete attrcopy.checked
                        }
                    }
                    attrcopy.value = underlyingValue ? underlyingValue : "true";
                    rewriteLeaf(null)
                } else {
                    if (torender.value instanceof Array) {
                        renderUnchanged()
                    } else {
                        var value = parent ? parent[tagname === "textarea" || tagname === "input" ? "optionlist" : "optionnames"].value[torender.choiceindex] : torender.value;
                        if (tagname === "textarea") {
                            if (isPlaceholder(value) && torender.willinput) {
                                value = ""
                            }
                            rewriteLeaf(value)
                        } else {
                            if (tagname === "input") {
                                if (torender.willinput || isValue(value)) {
                                    attrcopy.value = value
                                }
                                rewriteLeaf(null)
                            } else {
                                delete attrcopy.name;
                                rewriteLeafOpen(value)
                            }
                        }
                    }
                }
            } else {
                if (componentType === "UISelect") {
                    var ishtmlselect = tagname === "select";
                    var ismultiple = false;
                    if (torender.selection.value instanceof Array) {
                        ismultiple = true;
                        if (ishtmlselect) {
                            attrcopy.multiple = "multiple"
                        }
                    }
                    var oldid = attrcopy.id;
                    assignSubmittingName(attrcopy, torender.selection);
                    if (oldid !== undefined) {
                        attrcopy.id = oldid
                    }
                    if (ishtmlselect) {
                        if (torender.selection.willinput !== false) {
                            attrcopy.name = torender.selection.submittingname
                        }
                        applyAutoBind(torender, attrcopy.id)
                    }
                    out += fluid.dumpAttributes(attrcopy);
                    if (ishtmlselect) {
                        out += ">";
                        var values = torender.optionlist.value;
                        var names = torender.optionnames === null || torender.optionnames === undefined || !torender.optionnames.value ? values : torender.optionnames.value;
                        if (!names || !names.length) {
                            fluid.fail("Error in component tree - UISelect component with fullID " + torender.fullID + " does not have optionnames set")
                        }
                        for (var i = 0; i < names.length; ++i) {
                            out += '<option value="';
                            var value = values[i];
                            if (value === null) {
                                value = fluid.NULL_STRING
                            }
                            out += fluid.XMLEncode(value);
                            if (isSelectedValue(torender, value)) {
                                out += '" selected="selected'
                            }
                            out += '">';
                            out += fluid.XMLEncode(names[i]);
                            out += "</option>\n"
                        }
                        closeTag()
                    } else {
                        dumpTemplateBody()
                    }
                    dumpSelectionBindings(torender)
                } else {
                    if (componentType === "UILink") {
                        var attrname = LINK_ATTRIBUTES[tagname];
                        if (attrname) {
                            degradeMessage(torender.target);
                            var target = torender.target.value;
                            if (!isValue(target)) {
                                target = attrcopy[attrname]
                            }
                            target = rewriteUrl(trc.uselump.parent, target);
                            attrcopy[attrname] = target
                        }
                        var value;
                        if (torender.linktext) {
                            degradeMessage(torender.linktext);
                            var value = torender.linktext.value
                        }
                        if (!isValue(value)) {
                            replaceAttributesOpen()
                        } else {
                            rewriteLeaf(value)
                        }
                    } else {
                        if (torender.markup !== undefined) {
                            degradeMessage(torender.markup);
                            var rendered = torender.markup.value;
                            if (rendered === null) {
                                out += fluid.dumpAttributes(attrcopy);
                                out += ">";
                                renderUnchanged()
                            } else {
                                if (!trc.iselide) {
                                    out += fluid.dumpAttributes(attrcopy);
                                    out += ">"
                                }
                                out += rendered;
                                closeTag()
                            }
                        } else {}
                    }
                }
            }
        }
        function rewriteIDRelation(context) {
            var attrname;
            var attrval = trc.attrcopy["for"];
            if (attrval !== undefined) {
                attrname = "for"
            } else {
                attrval = trc.attrcopy.headers;
                if (attrval !== undefined) {
                    attrname = "headers"
                }
            }
            if (!attrname) {
                return
            }
            var tagname = trc.uselump.tagname;
            if (attrname === "for" && tagname !== "label") {
                return
            }
            if (attrname === "headers" && tagname !== "td" && tagname !== "th") {
                return
            }
            var rewritten = rewritemap[getRewriteKey(trc.uselump.parent, context, attrval)];
            if (rewritten !== undefined) {
                trc.attrcopy[attrname] = rewritten
            }
        }
        function renderComment(message) {
            out += ("<!-- " + fluid.XMLEncode(message) + "-->")
        }
        function renderDebugMessage(message) {
            out += '<span style="background-color:#FF466B;color:white;padding:1px;">';
            out += message;
            out += "</span><br/>"
        }
        function reportPath(branch) {
            var path = branch.fullID;
            return !path ? "component tree root" : "full path " + path
        }
        function renderComponentSystem(context, torendero, lump) {
            var lumpindex = lump.lumpindex;
            var lumps = lump.parent.lumps;
            var nextpos = -1;
            var outerendopen = lumps[lumpindex + 1];
            var outerclose = lump.close_tag;
            nextpos = outerclose.lumpindex + 1;
            var payloadlist = lump.downmap ? lump.downmap["payload-component"] : null;
            var payload = payloadlist ? payloadlist[0] : null;
            var iselide = lump.rsfID.charCodeAt(0) === 126;
            var endopen = outerendopen;
            var close = outerclose;
            var uselump = lump;
            var attrcopy = {};
            $.extend(true, attrcopy, (payload === null ? lump : payload).attributemap);
            trc.attrcopy = attrcopy;
            trc.uselump = uselump;
            trc.endopen = endopen;
            trc.close = close;
            trc.nextpos = nextpos;
            trc.iselide = iselide;
            rewriteIDRelation(context);
            if (torendero === null) {
                if (lump.rsfID.indexOf("scr=") === (iselide ? 1 : 0)) {
                    var scrname = lump.rsfID.substring(4 + (iselide ? 1 : 0));
                    if (scrname === "ignore") {
                        nextpos = trc.close.lumpindex + 1
                    } else {
                        if (scrname === "rewrite-url") {
                            torendero = {
                                componentType: "UILink",
                                target: {}
                            }
                        } else {
                            openTag();
                            replaceAttributesOpen();
                            nextpos = trc.endopen.lumpindex
                        }
                    }
                }
            }
            if (torendero !== null) {
                if (payload) {
                    trc.endopen = lumps[payload.lumpindex + 1];
                    trc.close = payload.close_tag;
                    trc.uselump = payload;
                    dumpTillLump(lumps, lumpindex, payload.lumpindex);
                    lumpindex = payload.lumpindex
                }
                adjustForID(attrcopy, torendero);
                openTag();
                renderComponent(torendero);
                if (payload !== null) {
                    if (trc.nextpos === nextpos) {
                        dumpTillLump(lumps, trc.close.lumpindex + 1, outerclose.lumpindex + 1)
                    }
                }
                nextpos = trc.nextpos
            }
            return nextpos
        }
        function renderContainer(child, targetlump) {
            var t2 = targetlump.parent;
            var firstchild = t2.lumps[targetlump.lumpindex + 1];
            if (child.children !== undefined) {
                dumpBranchHead(child, targetlump)
            } else {
                renderComponentSystem(child.parent, child, targetlump)
            }
            renderRecurse(child, targetlump, firstchild)
        }
        function fetchComponent(basecontainer, id, lump) {
            if (id.indexOf("msg=") === 0) {
                var key = id.substring(4);
                return {
                    componentType: "UIMessage",
                    messagekey: key
                }
            }
            while (basecontainer) {
                var togo = basecontainer.childmap[id];
                if (togo) {
                    return togo
                }
                basecontainer = basecontainer.parent
            }
            return null
        }
        function fetchComponents(basecontainer, id) {
            var togo;
            while (basecontainer) {
                togo = basecontainer.childmap[id];
                if (togo) {
                    break
                }
                basecontainer = basecontainer.parent
            }
            return togo
        }
        function findChild(sourcescope, child) {
            var split = fluid.SplitID(child.ID);
            var headlumps = sourcescope.downmap[child.ID];
            if (!headlumps) {
                headlumps = sourcescope.downmap[split.prefix + ":"]
            }
            return headlumps ? headlumps[0] : null
        }
        function renderRecurse(basecontainer, parentlump, baselump) {
            var renderindex = baselump.lumpindex;
            var basedepth = parentlump.nestingdepth;
            var t1 = parentlump.parent;
            if (debugMode) {
                var rendered = {}
            }
            while (true) {
                renderindex = dumpScan(t1.lumps, renderindex, basedepth, !parentlump.elide, false);
                if (renderindex === t1.lumps.length) {
                    break
                }
                var lump = t1.lumps[renderindex];
                var id = lump.rsfID;
                if (lump.nestingdepth < basedepth || id === undefined) {
                    break
                }
                if (id.charCodeAt(0) === 126) {
                    id = id.substring(1)
                }
                if (id.indexOf(":") !== -1) {
                    var prefix = fluid.getPrefix(id);
                    var children = fetchComponents(basecontainer, prefix);
                    var finallump = lump.uplump.finallump[prefix];
                    var closefinal = finallump.close_tag;
                    if (children) {
                        for (var i = 0; i < children.length; ++i) {
                            var child = children[i];
                            if (child.children) {
                                if (debugMode) {
                                    rendered[child.fullID] = true
                                }
                                var targetlump = branchmap[child.fullID];
                                if (targetlump) {
                                    if (debugMode) {
                                        renderComment("Branching for " + child.fullID + " from " + fluid.debugLump(lump) + " to " + fluid.debugLump(targetlump))
                                    }
                                    renderContainer(child, targetlump);
                                    if (debugMode) {
                                        renderComment("Branch returned for " + child.fullID + fluid.debugLump(lump) + " to " + fluid.debugLump(targetlump))
                                    }
                                } else {
                                    if (debugMode) {
                                        renderDebugMessage("No matching template branch found for branch container with full ID " + child.fullID + " rendering from parent template branch " + fluid.debugLump(baselump))
                                    }
                                }
                            } else {
                                var targetlump = findChild(parentlump, child);
                                if (!targetlump) {
                                    if (debugMode) {
                                        renderDebugMessage("Repetitive leaf with full ID " + child.fullID + " could not be rendered from parent template branch " + fluid.debugLump(baselump))
                                    }
                                    continue
                                }
                                var renderend = renderComponentSystem(basecontainer, child, targetlump);
                                var wasopentag = renderend < t1.lumps.lengtn && t1.lumps[renderend].nestingdepth >= targetlump.nestingdepth;
                                var newbase = child.children ? child : basecontainer;
                                if (wasopentag) {
                                    renderRecurse(newbase, targetlump, t1.lumps[renderend]);
                                    renderend = targetlump.close_tag.lumpindex + 1
                                }
                                if (i !== children.length - 1) {
                                    if (renderend < closefinal.lumpindex) {
                                        dumpScan(t1.lumps, renderend, targetlump.nestingdepth - 1, false, false)
                                    }
                                } else {
                                    dumpScan(t1.lumps, renderend, targetlump.nestingdepth, true, false)
                                }
                            }
                        }
                    } else {
                        if (debugMode) {
                            renderDebugMessage("No branch container with prefix " + prefix + ": found in container " + reportPath(basecontainer) + " rendering at template position " + fluid.debugLump(baselump) + ", skipping")
                        }
                    }
                    renderindex = closefinal.lumpindex + 1;
                    if (debugMode) {
                        renderComment("Stack returned from branch for ID " + id + " to " + fluid.debugLump(baselump) + ": skipping from " + fluid.debugLump(lump) + " to " + fluid.debugLump(closefinal))
                    }
                } else {
                    var component;
                    if (id) {
                        component = fetchComponent(basecontainer, id, lump);
                        if (debugMode && component) {
                            rendered[component.fullID] = true
                        }
                    }
                    if (component && component.children !== undefined) {
                        renderContainer(component);
                        renderindex = lump.close_tag.lumpindex + 1
                    } else {
                        renderindex = renderComponentSystem(basecontainer, component, lump)
                    }
                }
                if (renderindex === t1.lumps.length) {
                    break
                }
            }
            if (debugMode) {
                var children = basecontainer.children;
                for (var key = 0; key < children.length; ++key) {
                    var child = children[key];
                    if (!rendered[child.fullID]) {
                        renderDebugMessage("Component " + child.componentType + " with full ID " + child.fullID + " could not be found within template " + fluid.debugLump(baselump))
                    }
                }
            }
        }
        function renderCollect(collump) {
            dumpTillLump(collump.parent.lumps, collump.lumpindex, collump.close_tag.lumpindex + 1)
        }
        function renderCollects() {
            for (var key in collected) {
                var collist = collected[key];
                for (var i = 0; i < collist.length; ++i) {
                    renderCollect(collist[i])
                }
            }
        }
        function processDecoratorQueue() {
            for (var i = 0; i < decoratorQueue.length; ++i) {
                var decorator = decoratorQueue[i];
                var node = fluid.byId(decorator.id, renderOptions.document);
                if (!node) {
                    fluid.fail("Error during rendering - component with id " + decorator.id + " which has a queued decorator was not found in the output markup")
                }
                if (decorator.type === "jQuery") {
                    var jnode = $(node);
                    jnode[decorator.func].apply(jnode, $.makeArray(decorator.args))
                } else {
                    if (decorator.type === "fluid") {
                        var args = decorator.args;
                        if (!args) {
                            if (!decorator.container) {
                                decorator.container = node
                            }
                            args = [decorator.container, decorator.options]
                        }
                        var that = fluid.invokeGlobalFunction(decorator.func, args, fluid);
                        decorator.that = that
                    } else {
                        if (decorator.type === "event") {
                            node[decorator.event] = decorator.handler
                        }
                    }
                }
            }
        }
        that.renderTemplates = function () {
            tree = fixupTree(tree, options.model);
            var template = templates[0];
            resolveBranches(templates.globalmap, tree, template.rootlump);
            renderedbindings = {};
            renderCollects();
            renderRecurse(tree, template.rootlump, template.lumps[template.firstdocumentindex]);
            return out
        };
        that.processDecoratorQueue = function () {
            processDecoratorQueue()
        };
        return that
    };
    jQuery.extend(true, fluid.renderer, renderer);
    fluid.ComponentReference = function (reference) {
        this.reference = reference
    };
    fluid.explode = function (hash, basepath) {
        var togo = [];
        for (var key in hash) {
            var binding = basepath === undefined ? key : basepath + "." + key;
            togo[togo.length] = {
                ID: key,
                value: hash[key],
                valuebinding: binding
            }
        }
        return togo
    };
    fluid.explodeSelectionToInputs = function (optionlist, opts) {
        return fluid.transform(optionlist, function (option, index) {
            return {
                ID: opts.rowID,
                children: [{
                    ID: opts.inputID,
                    parentRelativeID: "..::" + opts.selectID,
                    choiceindex: index
                },
                {
                    ID: opts.labelID,
                    parentRelativeID: "..::" + opts.selectID,
                    choiceindex: index
                }]
            }
        })
    };
    fluid.messageLocator = function (messageBase, resolveFunc) {
        resolveFunc = resolveFunc || fluid.stringTemplate;
        return function (messagecodes, args) {
            if (typeof(messagecodes) === "string") {
                messagecodes = [messagecodes]
            }
            for (var i = 0; i < messagecodes.length; ++i) {
                var code = messagecodes[i];
                var message = messageBase[code];
                if (message === undefined) {
                    continue
                }
                return resolveFunc(message, args)
            }
            return "[Message string for key " + messagecodes[0] + " not found]"
        }
    };
    fluid.resolveMessageSource = function (messageSource) {
        if (messageSource.type === "data") {
            if (messageSource.url === undefined) {
                return fluid.messageLocator(messageSource.messages, messageSource.resolveFunc)
            } else {}
        }
    };
    fluid.renderTemplates = function (templates, tree, options, fossilsIn) {
        var renderer = fluid.renderer(templates, tree, options, fossilsIn);
        var rendered = renderer.renderTemplates();
        return rendered
    };
    fluid.reRender = function (templates, node, tree, options) {
        options = options || {};
        node = fluid.unwrap(node);
        var lastFocusedElement = fluid.getLastFocusedElement ? fluid.getLastFocusedElement() : null;
        var lastId;
        if (lastFocusedElement && fluid.dom.isContainer(node, lastFocusedElement)) {
            lastId = lastFocusedElement.id
        }
        if ($.browser.msie) {
            $(node).empty()
        } else {
            node.innerHTML = ""
        }
        var fossils = options.fossils || {};
        var renderer = fluid.renderer(templates, tree, options, fossils);
        var rendered = renderer.renderTemplates();
        if (options.renderRaw) {
            rendered = fluid.XMLEncode(rendered);
            rendered = rendered.replace(/\n/g, "<br/>")
        }
        if (options.model) {
            fluid.bindFossils(node, options.model, fossils)
        }
        if ($.browser.msie) {
            $(node).html(rendered)
        } else {
            node.innerHTML = rendered
        }
        renderer.processDecoratorQueue();
        if (lastId) {
            var element = fluid.byId(lastId);
            if (element) {
                $(element).focus()
            }
        }
        return templates
    };

    function findNodeValue(rootNode) {
        var node = fluid.dom.iterateDom(rootNode, function (node) {
            return node.nodeType === 8 || node.nodeType === 4 ? "stop" : null
        }, true);
        var value = node.nodeValue;
        if (value.indexOf("[CDATA[") === 0) {
            return value.substring(6, value.length - 2)
        } else {
            return value
        }
    }
    fluid.extractTemplate = function (node, armouring) {
        if (!armouring) {
            return node.innerHTML
        } else {
            return findNodeValue(node)
        }
    };
    fluid.render = function (source, target, tree, options) {
        options = options || {};
        var template = source;
        if (typeof(source) === "object") {
            template = fluid.extractTemplate(fluid.unwrap(source.node), source.armouring)
        }
        target = fluid.unwrap(target);
        var resourceSpec = {
            base: {
                resourceText: template,
                href: ".",
                resourceKey: ".",
                cutpoints: options.cutpoints
            }
        };
        var templates = fluid.parseTemplates(resourceSpec, ["base"], options);
        return fluid.reRender(templates, target, tree, options)
    };
    fluid.selfRender = function (node, tree, options) {
        options = options || {};
        return fluid.render({
            node: node,
            armouring: options.armouring
        }, node, tree, options)
    }
})(jQuery, fluid_1_2);
fluid_1_2 = fluid_1_2 || {};
(function ($, fluid) {
    if (!fluid.renderer) {
        fluid.fail("fluidRenderer.js is a necessary dependency of RendererUtilities")
    }
    fluid.registerNamespace("fluid.renderer.selection");
    fluid.expect = function (name, members, target) {
        fluid.transform($.makeArray(members), function (key) {
            if (!target[key]) {
                fluid.fail(name + " missing required parameter " + key)
            }
        })
    };
    fluid.iota = function (count, first) {
        first = first || 0;
        var togo = [];
        for (var i = 0; i < count; ++i) {
            togo[togo.length] = first++
        }
        return togo
    };
    fluid.renderer.createRendererFunction = function (container, selectors, options, model, fossils) {
        function modelise(opts, defs) {
            return $.extend({}, defs, opts, model ? {
                model: model
            } : null)
        }
        options = options || {};
        container = $(container);
        var source = options.templateSource ? options.templateSource : {
            node: container
        };
        var rendererOptions = modelise(options.rendererOptions);
        rendererOptions.fossils = fossils || {};
        var expanderOptions = modelise(options.expanderOptions, {
            ELstyle: "$()"
        });
        var expander = options.noExpand ? null : fluid.renderer.makeProtoExpander(expanderOptions);
        var templates = null;
        return function (tree) {
            if (expander) {
                tree = expander(tree)
            }
            var cutpointFn = options.cutpointGenerator || "fluid.renderer.selectorsToCutpoints";
            rendererOptions.cutpoints = rendererOptions.cutpoints || fluid.invokeGlobalFunction(cutpointFn, [selectors, options]);
            if (templates) {
                fluid.clear(rendererOptions.fossils);
                fluid.reRender(templates, container, tree, rendererOptions)
            } else {
                if (typeof(source) === "function") {
                    source = source()
                }
                templates = fluid.render(source, container, tree, rendererOptions)
            }
        }
    };
    fluid.initRendererComponent = function (componentName, container, options) {
        var that = fluid.initView(componentName, container, options);
        that.model = that.options.model || {};
        fluid.fetchResources(that.options.resources);
        var rendererOptions = that.options.rendererOptions || {};
        if (!rendererOptions.messageSource && that.options.strings) {
            rendererOptions.messageSource = {
                type: "data",
                messages: that.options.strings
            }
        }
        var renderer = {
            fossils: {},
            boundPathForNode: function (node) {
                return fluid.boundPathForNode(node, renderer.fossils)
            }
        };
        var rendererFnOptions = $.extend({}, that.options.rendererFnOptions, {
            rendererOptions: rendererOptions,
            repeatingSelectors: that.options.repeatingSelectors,
            selectorsToIgnore: that.options.selectorsToIgnore
        });
        if (that.options.resources.template) {
            rendererFnOptions.templateSource = function () {
                return that.options.resources.template.resourceText
            }
        }
        var rendererFn = fluid.renderer.createRendererFunction(container, that.options.selectors, rendererFnOptions, that.model, renderer.fossils);
        that.render = renderer.render = rendererFn;
        that.renderer = renderer;
        return that
    };
    var removeSelectors = function (selectors, selectorsToIgnore) {
        if (selectorsToIgnore) {
            $.each(selectorsToIgnore, function (index, selectorToIgnore) {
                delete selectors[selectorToIgnore]
            })
        }
        return selectors
    };
    var markRepeated = function (selector, repeatingSelectors) {
        if (repeatingSelectors) {
            $.each(repeatingSelectors, function (index, repeatingSelector) {
                if (selector === repeatingSelector) {
                    selector = selector + ":"
                }
            })
        }
        return selector
    };
    fluid.renderer.selectorsToCutpoints = function (selectors, options) {
        var togo = [];
        options = options || {};
        selectors = fluid.copy(selectors);
        if (options.selectorsToIgnore) {
            selectors = removeSelectors(selectors, options.selectorsToIgnore)
        }
        for (var selector in selectors) {
            togo.push({
                id: markRepeated(selector, options.repeatingSelectors),
                selector: selectors[selector]
            })
        }
        return togo
    };
    fluid.renderer.mergeComponents = function (target, source) {
        for (var key in source) {
            target[key] = source[key]
        }
        return target
    };
    fluid.renderer.selection.inputs = function (options, container, key, config) {
        fluid.expect("Selection to inputs expander", ["selectID", "inputID", "labelID", "rowID"], options);
        var selection = config.expander(options.tree);
        var rows = fluid.transform(selection.optionlist.value, function (option, index) {
            var togo = {};
            var element = {
                parentRelativeID: "..::" + options.selectID,
                choiceindex: index
            };
            togo[options.inputID] = element;
            togo[options.labelID] = fluid.copy(element);
            return togo
        });
        var togo = {};
        togo[options.selectID] = selection;
        togo[options.rowID] = {
            children: rows
        };
        togo = config.expander(togo);
        return togo
    };
    fluid.renderer.repeat = function (options, container, key, config) {
        fluid.expect("Repetition expander", ["controlledBy", "tree"], options);
        var path = fluid.extractContextualPath(options.controlledBy, {
            ELstyle: "ALL"
        }, fluid.threadLocal());
        var list = fluid.model.getBeanValue(config.model, path);
        var togo = {};
        if (!list || list.length === 0) {
            return options.ifEmpty ? config.expander(options.ifEmpty) : togo
        }
        fluid.log("fluid.repeat controlledBy " + options.controlledBy);
        fluid.log("Argument tree: " + JSON.stringify(options.tree));
        var expanded = fluid.transform(list, function (element, i) {
            var EL = fluid.model.composePath(path, i);
            var envAdd = {};
            if (options.pathAs) {
                envAdd[options.pathAs] = EL
            }
            if (options.valueAs) {
                envAdd[options.valueAs] = fluid.model.getBeanValue(config.model, EL)
            }
            var expandrow = fluid.withEnvironment(envAdd, function () {
                return config.expander(options.tree)
            });
            return fluid.isArrayable(expandrow) ? {
                children: expandrow
            } : expandrow
        });
        fluid.log("Expanded to " + JSON.stringify(expanded));
        var repeatID = options.repeatID;
        if (repeatID.indexOf(":") === -1) {
            repeatID = repeatID + ":"
        }
        fluid.each(expanded, function (entry) {
            entry.ID = repeatID
        });
        return expanded
    };
    fluid.renderer.makeProtoExpander = function (expandOptions) {
        var options = $.extend({
            ELstyle: "${}"
        }, expandOptions);
        var IDescape = options.IDescape || "\\";

        function fetchEL(string) {
            var env = fluid.threadLocal();
            return fluid.extractContextualPath(string, options, env)
        }
        function expandBound(value, concrete) {
            if (value.messagekey !== undefined) {
                return {
                    componentType: "UIMessage",
                    messagekey: value.messagekey,
                    args: expandLight(value.args)
                }
            }
            var proto;
            if (!fluid.isPrimitive(value) && !fluid.isArrayable(value)) {
                proto = value;
                if (proto.decorators) {
                    proto.decorators = expandLight(proto.decorators)
                }
                value = proto.value;
                delete proto.value
            } else {
                proto = {}
            }
            var EL = typeof(value) === "string" ? fetchEL(value) : null;
            if (EL) {
                proto.valuebinding = EL
            } else {
                proto.value = value
            }
            if (options.model && proto.valuebinding && proto.value === undefined) {
                proto.value = fluid.model.getBeanValue(options.model, proto.valuebinding)
            }
            if (concrete) {
                proto.componentType = "UIBound"
            }
            return proto
        }
        options.filter = fluid.expander.lightFilter;
        var expandLight = function (source) {
            return fluid.resolveEnvironment(source, options.model, options)
        };
        var expandEntry = function (entry) {
            var comp = [];
            expandCond(entry, comp);
            return {
                children: comp
            }
        };
        var expandExternal = function (entry) {
            var singleTarget;
            var target = [];
            var pusher = function (comp) {
                singleTarget = comp
            };
            expandLeafOrCond(entry, target, pusher);
            return singleTarget || target
        };
        var expandConfig = {
            model: options.model,
            expander: expandExternal
        };
        var expandLeaf = function (leaf, componentType) {
            var togo = {
                componentType: componentType
            };
            var map = fluid.renderer.boundMap[componentType] || {};
            for (var key in leaf) {
                if (/decorators|args/.test(key)) {
                    togo[key] = expandLight(leaf[key]);
                    continue
                } else {
                    if (map[key]) {
                        togo[key] = expandBound(leaf[key])
                    } else {
                        togo[key] = leaf[key]
                    }
                }
            }
            return togo
        };
        var expandChildren = function (entry, pusher) {
            var children = entry.children;
            for (var i = 0; i < children.length; ++i) {
                var target = [];
                var comp = {
                    children: target
                };
                var child = children[i];
                var childPusher = function (comp) {
                    target[target.length] = comp
                };
                expandLeafOrCond(child, target, childPusher);
                if (comp.children.length === 1 && !comp.children[0].ID) {
                    comp = comp.children[0]
                }
                pusher(comp)
            }
        };

        function detectBareBound(entry) {
            return fluid.find(entry, function (value, key) {
                return key === "decorators"
            }) !== false
        }
        var expandLeafOrCond = function (entry, target, pusher) {
            var componentType = fluid.renderer.inferComponentType(entry);
            if (!componentType && (fluid.isPrimitive(entry) || detectBareBound(entry))) {
                componentType = "UIBound"
            }
            if (componentType) {
                pusher(componentType === "UIBound" ? expandBound(entry, true) : expandLeaf(entry, componentType))
            } else {
                if (!target) {
                    fluid.fail("Illegal cond->cond transition")
                }
                expandCond(entry, target)
            }
        };
        var expandCond = function (proto, target) {
            for (var key in proto) {
                var entry = proto[key];
                if (key.charAt(0) === IDescape) {
                    key = key.substring(1)
                }
                if (key === "expander") {
                    var expander = entry;
                    var expanded = fluid.invokeGlobalFunction(expander.type, [expander, proto, key, expandConfig]);
                    fluid.each(expanded, function (el) {
                        target[target.length] = el
                    })
                } else {
                    if (entry) {
                        var condPusher = function (comp) {
                            comp.ID = key;
                            target[target.length] = comp
                        };
                        var comp;
                        if (entry.children) {
                            if (key.indexOf(":") === -1) {
                                key = key + ":"
                            }
                            expandChildren(entry, condPusher)
                        } else {
                            if (fluid.renderer.isBoundPrimitive(entry)) {
                                condPusher(expandBound(entry, true))
                            } else {
                                expandLeafOrCond(entry, null, condPusher)
                            }
                        }
                    }
                }
            }
        };
        return expandEntry
    }
})(jQuery, fluid_1_2);
(function ($) {
    var helper = {},
        current, title, tID, IE = $.browser.msie && /MSIE\s(5\.5|6\.)/.test(navigator.userAgent),
        track = false;
    $.tooltip = {
        blocked: false,
        defaults: {
            delay: 200,
            showURL: true,
            extraClass: "",
            top: 15,
            left: 15,
            id: "tooltip"
        },
        block: function () {
            $.tooltip.blocked = !$.tooltip.blocked
        }
    };
    $.fn.extend({
        tooltip: function (settings) {
            settings = $.extend({}, $.tooltip.defaults, settings);
            createHelper(settings);
            return this.each(function () {
                $.data(this, "tooltip-settings", settings);
                this.tooltipText = this.title;
                $(this).removeAttr("title");
                this.alt = ""
            }).hover(save, hide).click(hide)
        },
        fixPNG: IE ?
        function () {
            return this.each(function () {
                var image = $(this).css("backgroundImage");
                if (image.match(/^url\(["']?(.*\.png)["']?\)$/i)) {
                    image = RegExp.$1;
                    $(this).css({
                        backgroundImage: "none",
                        filter: "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, sizingMethod=crop, src='" + image + "')"
                    }).each(function () {
                        var position = $(this).css("position");
                        if (position != "absolute" && position != "relative") {
                            $(this).css("position", "relative")
                        }
                    })
                }
            })
        } : function () {
            return this
        },
        unfixPNG: IE ?
        function () {
            return this.each(function () {
                $(this).css({
                    filter: "",
                    backgroundImage: ""
                })
            })
        } : function () {
            return this
        },
        hideWhenEmpty: function () {
            return this.each(function () {
                $(this)[$(this).html() ? "show" : "hide"]()
            })
        },
        url: function () {
            return this.attr("href") || this.attr("src")
        }
    });

    function createHelper(settings) {
        if (helper.parent) {
            return
        }
        helper.parent = $('<div id="' + settings.id + '"><h3></h3><div class="body"></div><div class="url"></div></div>').appendTo(document.body).hide();
        if ($.fn.bgiframe) {
            helper.parent.bgiframe()
        }
        helper.title = $("h3", helper.parent);
        helper.body = $("div.body", helper.parent);
        helper.url = $("div.url", helper.parent)
    }
    function settings(element) {
        return $.data(element, "tooltip-settings")
    }
    function handle(event) {
        if (settings(this).delay) {
            tID = setTimeout(show, settings(this).delay)
        } else {
            show()
        }
        track = !! settings(this).track;
        $(document.body).bind("mousemove", update);
        update(event)
    }
    function save() {
        if ($.tooltip.blocked || this == current || (!this.tooltipText && !settings(this).bodyHandler)) {
            return
        }
        current = this;
        title = this.tooltipText;
        if (settings(this).bodyHandler) {
            helper.title.hide();
            var bodyContent = settings(this).bodyHandler.call(this);
            if (bodyContent.nodeType || bodyContent.jquery) {
                helper.body.empty().append(bodyContent)
            } else {
                helper.body.html(bodyContent)
            }
            helper.body.show()
        } else {
            if (settings(this).showBody) {
                var parts = title.split(settings(this).showBody);
                helper.title.html(parts.shift()).show();
                helper.body.empty();
                for (var i = 0, part; part = parts[i]; i++) {
                    if (i > 0) {
                        helper.body.append("<br/>")
                    }
                    helper.body.append(part)
                }
                helper.body.hideWhenEmpty()
            } else {
                helper.title.html(title).show();
                helper.body.hide()
            }
        }
        if (settings(this).showURL && $(this).url()) {
            helper.url.html($(this).url().replace("http://", "")).show()
        } else {
            helper.url.hide()
        }
        helper.parent.addClass(settings(this).extraClass);
        if (settings(this).fixPNG) {
            helper.parent.fixPNG()
        }
        handle.apply(this, arguments)
    }
    function show() {
        tID = null;
        helper.parent.show();
        update()
    }
    function update(event) {
        if ($.tooltip.blocked) {
            return
        }
        if (!track && helper.parent.is(":visible")) {
            $(document.body).unbind("mousemove", update)
        }
        if (current == null || !settings(current)) {
            return
        }
        helper.parent.removeClass("viewport-right").removeClass("viewport-bottom");
        var left = helper.parent[0].offsetLeft;
        var top = helper.parent[0].offsetTop;
        if (event) {
            left = event.pageX + settings(current).left;
            top = event.pageY + settings(current).top;
            helper.parent.css({
                left: left + "px",
                top: top + "px"
            })
        }
        var v = viewport(),
            h = helper.parent[0];
        if (v.x + v.cx < h.offsetLeft + h.offsetWidth) {
            left -= h.offsetWidth + 20 + settings(current).left;
            helper.parent.css({
                left: left + "px"
            }).addClass("viewport-right")
        }
        if (v.y + v.cy < h.offsetTop + h.offsetHeight) {
            top -= h.offsetHeight + 20 + settings(current).top;
            helper.parent.css({
                top: top + "px"
            }).addClass("viewport-bottom")
        }
    }
    function viewport() {
        return {
            x: $(window).scrollLeft(),
            y: $(window).scrollTop(),
            cx: $(window).width(),
            cy: $(window).height()
        }
    }
    function hide(event) {
        if ($.tooltip.blocked) {
            return
        }
        if (tID) {
            clearTimeout(tID)
        }
        current = null;
        helper.parent.hide().removeClass(settings(this).extraClass);
        if (settings(this).fixPNG) {
            helper.parent.unfixPNG()
        }
    }
    $.fn.Tooltip = $.fn.tooltip
})(jQuery);
fluid_1_2 = fluid_1_2 || {};
(function ($, fluid) {
    var STATE_INITIAL = "state_initial",
        STATE_CHANGED = "state_changed",
        STATE_REVERTED = "state_reverted";

    function defaultRenderer(that, targetContainer) {
        var str = that.options.strings;
        var markup = "<span class='flc-undo'><a href='#' class='flc-undo-undoControl'>" + str.undo + "</a><a href='#' class='flc-undo-redoControl'>" + str.redo + "</a></span>";
        var markupNode = $(markup).attr({
            role: "region",
            "aria-live": "polite",
            "aria-relevant": "all"
        });
        targetContainer.append(markupNode);
        return markupNode
    }
    function refreshView(that) {
        if (that.state === STATE_INITIAL) {
            that.locate("undoContainer").hide();
            that.locate("redoContainer").hide()
        } else {
            if (that.state === STATE_CHANGED) {
                that.locate("undoContainer").show();
                that.locate("redoContainer").hide()
            } else {
                if (that.state === STATE_REVERTED) {
                    that.locate("undoContainer").hide();
                    that.locate("redoContainer").show()
                }
            }
        }
    }
    var bindHandlers = function (that) {
        that.locate("undoControl").click(function () {
            if (that.state !== STATE_REVERTED) {
                fluid.model.copyModel(that.extremalModel, that.component.model);
                that.component.updateModel(that.initialModel, that);
                that.state = STATE_REVERTED;
                refreshView(that);
                that.locate("redoControl").focus()
            }
            return false
        });
        that.locate("redoControl").click(function () {
            if (that.state !== STATE_CHANGED) {
                that.component.updateModel(that.extremalModel, that);
                that.state = STATE_CHANGED;
                refreshView(that);
                that.locate("undoControl").focus()
            }
            return false
        });
        return {
            modelChanged: function (newModel, oldModel, source) {
                if (source !== that) {
                    that.state = STATE_CHANGED;
                    fluid.model.copyModel(that.initialModel, oldModel);
                    refreshView(that)
                }
            }
        }
    };
    fluid.undoDecorator = function (component, userOptions) {
        var that = fluid.initLittleComponent("undo", userOptions);
        that.container = that.options.renderer(that, component.container);
        fluid.initDomBinder(that);
        fluid.tabindex(that.locate("undoControl"), 0);
        fluid.tabindex(that.locate("redoControl"), 0);
        that.component = component;
        that.initialModel = {};
        that.extremalModel = {};
        fluid.model.copyModel(that.initialModel, component.model);
        fluid.model.copyModel(that.extremalModel, component.model);
        that.state = STATE_INITIAL;
        refreshView(that);
        var listeners = bindHandlers(that);
        that.returnedOptions = {
            listeners: listeners
        };
        return that
    };
    fluid.defaults("undo", {
        selectors: {
            undoContainer: ".flc-undo-undoControl",
            undoControl: ".flc-undo-undoControl",
            redoContainer: ".flc-undo-redoControl",
            redoControl: ".flc-undo-redoControl"
        },
        strings: {
            undo: "undo edit",
            redo: "redo edit"
        },
        renderer: defaultRenderer
    })
})(jQuery, fluid_1_2);
fluid_1_2 = fluid_1_2 || {};
(function ($, fluid) {
    function sendKey(control, event, virtualCode, charCode) {
        var kE = document.createEvent("KeyEvents");
        kE.initKeyEvent(event, 1, 1, null, 0, 0, 0, 0, virtualCode, charCode);
        control.dispatchEvent(kE)
    }
    fluid.setCaretToEnd = function (control, value) {
        var pos = value ? value.length : 0;
        try {
            control.focus();
            if (control.setSelectionRange) {
                control.setSelectionRange(pos, pos);
                if ($.browser.mozilla && pos > 0) {
                    sendKey(control, "keypress", 92, 92);
                    sendKey(control, "keydown", 8, 0);
                    sendKey(control, "keypress", 8, 0)
                }
            } else {
                if (control.createTextRange) {
                    var range = control.createTextRange();
                    range.move("character", pos);
                    range.select()
                }
            }
        } catch (e) {}
    };
    fluid.deadMansBlur = function (control, exclusions, handler) {
        var blurPending = false;
        $(control).blur(function () {
            blurPending = true;
            setTimeout(function () {
                if (blurPending) {
                    handler(control)
                }
            }, 150)
        });
        var canceller = function () {
            blurPending = false
        };
        exclusions.focus(canceller);
        exclusions.click(canceller)
    };
    var renderEditContainer = function (that, really) {
        that.editContainer = that.locate("editContainer");
        that.editField = that.locate("edit");
        if (that.editContainer.length !== 1) {
            if (that.editField.length === 1) {
                that.editContainer = that.editField
            } else {
                if (that.editContainer.length > 1) {
                    fluid.fail("InlineEdit did not find a unique container for selector " + that.options.selectors.editContainer + ": " + fluid.dumpEl(that.editContainer))
                }
            }
        }
        if (that.editContainer.length === 1 && !that.editField) {
            that.editField = that.locate("edit", that.editContainer)
        }
        if (!really) {
            return
        }
        var editElms = that.options.editModeRenderer(that);
        if (editElms) {
            that.editContainer = editElms.container;
            that.editField = editElms.field
        }
        if (that.editField.length === 0) {
            fluid.fail("InlineEdit improperly initialised - editField could not be located (selector " + that.options.selectors.edit + ")")
        }
    };
    var switchToViewMode = function (that) {
        that.editContainer.hide();
        that.viewEl.show()
    };
    var cancel = function (that) {
        if (that.isEditing()) {
            setTimeout(function () {
                that.editView.value(that.model.value)
            }, 1);
            switchToViewMode(that);
            that.events.afterFinishEdit.fire(that.model.value, that.model.value, that.editField[0], that.viewEl[0])
        }
    };
    var finish = function (that) {
        var newValue = that.editView.value();
        var oldValue = that.model.value;
        var viewNode = that.viewEl[0];
        var editNode = that.editField[0];
        var ret = that.events.onFinishEdit.fire(newValue, oldValue, editNode, viewNode);
        if (ret === false) {
            return
        }
        that.updateModelValue(newValue);
        that.events.afterFinishEdit.fire(newValue, oldValue, editNode, viewNode);
        switchToViewMode(that)
    };
    var bindEditFinish = function (that) {
        if (that.options.submitOnEnter === undefined) {
            that.options.submitOnEnter = "textarea" !== fluid.unwrap(that.editField).nodeName.toLowerCase()
        }
        function keyCode(evt) {
            return evt.keyCode ? evt.keyCode : (evt.which ? evt.which : 0)
        }
        var escHandler = function (evt) {
            var code = keyCode(evt);
            if (code === $.ui.keyCode.ESCAPE) {
                cancel(that);
                return false
            }
        };
        var finishHandler = function (evt) {
            var code = keyCode(evt);
            if (code !== $.ui.keyCode.ENTER) {
                return true
            }
            finish(that);
            that.viewEl.focus();
            return false
        };
        if (that.options.submitOnEnter) {
            that.editContainer.keypress(finishHandler)
        }
        that.editContainer.keydown(escHandler)
    };
    var bindBlurHandler = function (that) {
        if (that.options.blurHandlerBinder) {
            that.options.blurHandlerBinder(that)
        } else {
            var blurHandler = function (evt) {
                if (that.isEditing()) {
                    finish(that)
                }
                return false
            };
            that.editField.blur(blurHandler)
        }
    };
    var initializeEditView = function (that, initial) {
        if (!that.editInitialized) {
            renderEditContainer(that, !that.options.lazyEditView || !initial);
            if (!that.options.lazyEditView || !initial) {
                that.editView = fluid.initSubcomponent(that, "editView", that.editField);
                $.extend(true, that.editView, fluid.initSubcomponent(that, "editAccessor", that.editField));
                bindEditFinish(that);
                bindBlurHandler(that);
                that.editView.refreshView(that);
                that.editInitialized = true
            }
        }
    };
    var edit = function (that) {
        initializeEditView(that, false);
        var viewEl = that.viewEl;
        var displayText = that.displayView.value();
        that.updateModelValue(that.model.value === "" ? "" : displayText);
        if (that.options.applyEditPadding) {
            that.editField.width(Math.max(viewEl.width() + that.options.paddings.edit, that.options.paddings.minimumEdit))
        }
        viewEl.removeClass(that.options.styles.invitation);
        viewEl.removeClass(that.options.styles.focus);
        viewEl.hide();
        that.editContainer.show();
        if (that.tooltipEnabled()) {
            $("#" + that.options.tooltipId).hide()
        }
        setTimeout(function () {
            that.editField.focus();
            fluid.setCaretToEnd(that.editField[0], that.editView.value());
            if (that.options.selectOnEdit) {
                that.editField[0].select()
            }
        }, 0);
        that.events.afterBeginEdit.fire()
    };
    var clearEmptyViewStyles = function (textEl, defaultViewStyle, originalViewPadding) {
        textEl.removeClass(defaultViewStyle);
        textEl.css("padding-right", originalViewPadding)
    };
    var showDefaultViewText = function (that) {
        that.displayView.value(that.options.defaultViewText);
        that.viewEl.css("padding-right", that.existingPadding);
        that.viewEl.addClass(that.options.styles.defaultViewStyle)
    };
    var showNothing = function (that) {
        that.displayView.value("");
        if ($.browser.msie) {
            if (that.viewEl.css("display") === "inline") {
                that.viewEl.css("display", "inline-block")
            }
        }
    };
    var showEditedText = function (that) {
        that.displayView.value(that.model.value);
        clearEmptyViewStyles(that.viewEl, that.options.styles.defaultViewStyle, that.existingPadding)
    };
    var refreshView = function (that, source) {
        that.displayView.refreshView(that, source);
        if (that.editView) {
            that.editView.refreshView(that, source)
        }
    };
    var initModel = function (that, value) {
        that.model.value = value;
        that.refreshView()
    };
    var updateModelValue = function (that, newValue, source) {
        var comparator = that.options.modelComparator;
        var unchanged = comparator ? comparator(that.model.value, newValue) : that.model.value === newValue;
        if (!unchanged) {
            var oldModel = $.extend(true, {}, that.model);
            that.model.value = newValue;
            that.events.modelChanged.fire(that.model, oldModel, source);
            that.refreshView(source)
        }
    };
    var bindHoverHandlers = function (viewEl, invitationStyle) {
        var over = function (evt) {
            viewEl.addClass(invitationStyle)
        };
        var out = function (evt) {
            viewEl.removeClass(invitationStyle)
        };
        viewEl.hover(over, out)
    };
    var makeEditHandler = function (that) {
        return function () {
            var prevent = that.events.onBeginEdit.fire();
            if (prevent === false) {
                return false
            }
            edit(that);
            return true
        }
    };

    function makeEditTriggerGuard(that) {
        var viewEl = fluid.unwrap(that.viewEl);
        return function (event) {
            var outer = fluid.findAncestor(event.target, function (elem) {
                if (/input|select|textarea|button|a/i.test(elem.nodeName) || elem === viewEl) {
                    return true
                }
            });
            if (outer === viewEl) {
                that.edit();
                return false
            }
        }
    }
    var bindMouseHandlers = function (that) {
        bindHoverHandlers(that.viewEl, that.options.styles.invitation);
        that.viewEl.click(makeEditTriggerGuard(that))
    };
    var bindHighlightHandler = function (viewEl, focusStyle, invitationStyle) {
        var focusOn = function () {
            viewEl.addClass(focusStyle);
            viewEl.addClass(invitationStyle)
        };
        var focusOff = function () {
            viewEl.removeClass(focusStyle);
            viewEl.removeClass(invitationStyle)
        };
        viewEl.focus(focusOn);
        viewEl.blur(focusOff)
    };
    var bindKeyboardHandlers = function (that) {
        fluid.tabbable(that.viewEl);
        var guard = makeEditTriggerGuard(that);
        fluid.activatable(that.viewEl, function (event) {
            return guard(event)
        })
    };
    var aria = function (viewEl, editContainer) {
        viewEl.attr("role", "button")
    };
    var defaultEditModeRenderer = function (that) {
        if (that.editContainer.length > 0 && that.editField.length > 0) {
            return {
                container: that.editContainer,
                field: that.editField
            }
        }
        var editModeTemplate = "<span><input type='text' class='flc-inlineEdit-edit fl-inlineEdit-edit'/></span>";
        var editContainer = $(editModeTemplate);
        var editField = $("input", editContainer);
        var componentContainerId = that.container.attr("id");
        if (componentContainerId) {
            var editContainerId = componentContainerId + "-edit-container";
            var editFieldId = componentContainerId + "-edit";
            editContainer.attr("id", editContainerId);
            editField.attr("id", editFieldId)
        }
        that.viewEl.after(editContainer);
        return {
            container: editContainer,
            field: editField
        }
    };
    var makeIsEditing = function (that) {
        var isEditing = false;
        that.events.onBeginEdit.addListener(function () {
            isEditing = true
        });
        that.events.afterFinishEdit.addListener(function () {
            isEditing = false
        });
        return function () {
            return isEditing
        }
    };
    var setupInlineEdit = function (componentContainer, that) {
        var padding = that.viewEl.css("padding-right");
        that.existingPadding = padding ? parseFloat(padding) : 0;
        initModel(that, that.displayView.value());
        bindMouseHandlers(that);
        bindKeyboardHandlers(that);
        bindHighlightHandler(that.viewEl, that.options.styles.focus, that.options.styles.invitation);
        aria(that.viewEl);
        if (that.editContainer) {
            that.editContainer.hide()
        }
        var initTooltip = function () {
            if (that.tooltipEnabled()) {
                that.viewEl.tooltip({
                    delay: that.options.tooltipDelay,
                    extraClass: that.options.styles.tooltip,
                    bodyHandler: function () {
                        return that.options.tooltipText
                    },
                    id: that.options.tooltipId
                })
            }
        };
        $(initTooltip);
        that.decorators = fluid.initSubcomponents(that, "componentDecorators", [that, fluid.COMPONENT_OPTIONS])
    };
    var setupInlineEdits = function (editables, options) {
        var editors = [];
        editables.each(function (idx, editable) {
            editors.push(fluid.inlineEdit($(editable), options))
        });
        return editors
    };
    fluid.inlineEdit = function (componentContainer, userOptions) {
        var that = fluid.initView("inlineEdit", componentContainer, userOptions);
        that.viewEl = that.locate("text");
        that.displayView = fluid.initSubcomponent(that, "displayView", that.viewEl);
        $.extend(true, that.displayView, fluid.initSubcomponent(that, "displayAccessor", that.viewEl));
        that.model = {
            value: ""
        };
        that.edit = makeEditHandler(that);
        that.isEditing = makeIsEditing(that);
        that.finish = function () {
            finish(that)
        };
        that.cancel = function () {
            cancel(that)
        };
        that.tooltipEnabled = function () {
            return that.options.useTooltip && $.fn.tooltip
        };
        that.refreshView = function (source) {
            refreshView(that, source)
        };
        that.updateModelValue = function (newValue, source) {
            updateModelValue(that, newValue, source)
        };
        that.updateModel = function (newModel, source) {
            updateModelValue(that, newModel.value, source)
        };
        initializeEditView(that, true);
        setupInlineEdit(componentContainer, that);
        return that
    };
    fluid.inlineEdit.standardAccessor = function (element) {
        var nodeName = element.nodeName.toLowerCase();
        var func = "input" === nodeName || "textarea" === nodeName ? "val" : "text";
        return {
            value: function (newValue) {
                return $(element)[func](newValue)
            }
        }
    };
    fluid.inlineEdit.richTextViewAccessor = function (element) {
        return {
            value: function (newValue) {
                return $(element).html(newValue)
            }
        }
    };
    fluid.inlineEdit.standardDisplayView = function (viewEl) {
        var that = {
            refreshView: function (componentThat, source) {
                if (componentThat.model.value) {
                    showEditedText(componentThat)
                } else {
                    if (componentThat.options.defaultViewText) {
                        showDefaultViewText(componentThat)
                    } else {
                        showNothing(componentThat)
                    }
                }
                if (($.trim(componentThat.viewEl.text()).length === 0) && (componentThat.existingPadding < componentThat.options.paddings.minimumView)) {
                    componentThat.viewEl.css("padding-right", componentThat.options.paddings.minimumView)
                }
            }
        };
        return that
    };
    fluid.inlineEdit.standardEditView = function (editField) {
        var that = {
            refreshView: function (componentThat, source) {
                if (!source || componentThat.editField && componentThat.editField.index(source) === -1) {
                    componentThat.editView.value(componentThat.model.value)
                }
            }
        };
        $.extend(true, that, fluid.inlineEdit.standardAccessor(editField));
        return that
    };
    fluid.inlineEdits = function (componentContainer, options) {
        options = options || {};
        var selectors = $.extend({}, fluid.defaults("inlineEdits").selectors, options.selectors);
        var container = fluid.container(componentContainer);
        var editables = $(selectors.editables, container);
        return setupInlineEdits(editables, options)
    };
    fluid.defaults("inlineEdit", {
        selectors: {
            text: ".flc-inlineEdit-text",
            editContainer: ".flc-inlineEdit-editContainer",
            edit: ".flc-inlineEdit-edit"
        },
        styles: {
            text: "fl-inlineEdit-text",
            edit: "fl-inlineEdit-edit",
            invitation: "fl-inlineEdit-invitation",
            defaultViewStyle: "fl-inlineEdit-invitation-text",
            tooltip: "fl-inlineEdit-tooltip",
            focus: "fl-inlineEdit-focus"
        },
        events: {
            modelChanged: null,
            onBeginEdit: "preventable",
            afterBeginEdit: null,
            onFinishEdit: "preventable",
            afterFinishEdit: null,
            afterInitEdit: null
        },
        paddings: {
            edit: 10,
            minimumEdit: 80,
            minimumView: 60
        },
        applyEditPadding: true,
        blurHandlerBinder: null,
        submitOnEnter: undefined,
        modelComparator: null,
        displayAccessor: {
            type: "fluid.inlineEdit.standardAccessor"
        },
        displayView: {
            type: "fluid.inlineEdit.standardDisplayView"
        },
        editAccessor: {
            type: "fluid.inlineEdit.standardAccessor"
        },
        editView: {
            type: "fluid.inlineEdit.standardEditView"
        },
        editModeRenderer: defaultEditModeRenderer,
        lazyEditView: false,
        defaultViewText: "Click here to edit",
        tooltipText: "Click item to edit",
        tooltipId: "tooltip",
        useTooltip: true,
        tooltipDelay: 1000,
        selectOnEdit: false
    });
    fluid.defaults("inlineEdits", {
        selectors: {
            editables: ".flc-inlineEditable"
        }
    })
})(jQuery, fluid_1_2);
fluid_1_2 = fluid_1_2 || {};
(function ($, fluid) {
    fluid.inlineEdit.makeViewAccessor = function (editorGetFn, setValueFn, getValueFn) {
        return function (editField) {
            return {
                value: function (newValue) {
                    var editor = editorGetFn(editField);
                    if (!editor) {
                        if (newValue) {
                            $(editField).val(newValue)
                        }
                        return ""
                    }
                    if (newValue) {
                        setValueFn(editField, editor, newValue)
                    } else {
                        return getValueFn(editor)
                    }
                }
            }
        }
    };
    var configureInlineEdit = function (configurationName, container, options) {
        var defaults = fluid.defaults(configurationName);
        var assembleOptions = fluid.merge(defaults ? defaults.mergePolicy : null, {}, defaults, options);
        return fluid.inlineEdit(container, assembleOptions)
    };
    fluid.inlineEdit.normalizeHTML = function (value) {
        var togo = $.trim(value.replace(/\s+/g, " "));
        togo = togo.replace(/\s+<\//g, "</");
        togo = togo.replace(/\<(\S+)[^\>\s]*\>/g, function (match) {
            return match.toLowerCase()
        });
        return togo
    };
    fluid.inlineEdit.htmlComparator = function (el1, el2) {
        return fluid.inlineEdit.normalizeHTML(el1) === fluid.inlineEdit.normalizeHTML(el2)
    };
    fluid.inlineEdit.tinyMCE = function (container, options) {
        var inlineEditor = configureInlineEdit("fluid.inlineEdit.tinyMCE", container, options);
        tinyMCE.init(inlineEditor.options.tinyMCE);
        return inlineEditor
    };
    fluid.inlineEdit.tinyMCE.getEditor = function (editField) {
        return tinyMCE.get(editField.id)
    };
    fluid.inlineEdit.tinyMCE.setValue = function (editField, editor, value) {
        $(editField).val(value);
        editor.setContent(value, {
            format: "raw"
        })
    };
    fluid.inlineEdit.tinyMCE.getValue = function (editor) {
        return editor.getContent()
    };
    var flTinyMCE = fluid.inlineEdit.tinyMCE;
    flTinyMCE.viewAccessor = fluid.inlineEdit.makeViewAccessor(flTinyMCE.getEditor, flTinyMCE.setValue, flTinyMCE.getValue);
    fluid.inlineEdit.tinyMCE.blurHandlerBinder = function (that) {
        function focusEditor(editor) {
            setTimeout(function () {
                tinyMCE.execCommand("mceFocus", false, that.editField[0].id);
                if ($.browser.mozilla && $.browser.version.substring(0, 3) === "1.8") {
                    return
                }
                editor.selection.select(editor.getBody(), 1);
                editor.selection.collapse(0)
            }, 10)
        }
        that.events.afterInitEdit.addListener(function (editor) {
            focusEditor(editor);
            var editorBody = editor.getBody();
            fluid.deadMansBlur(that.editField, $(editorBody), function () {
                that.cancel()
            })
        });
        that.events.afterBeginEdit.addListener(function () {
            var editor = tinyMCE.get(that.editField[0].id);
            if (editor) {
                focusEditor(editor)
            }
        })
    };
    fluid.inlineEdit.tinyMCE.editModeRenderer = function (that) {
        var options = that.options.tinyMCE;
        options.elements = fluid.allocateSimpleId(that.editField);
        var oldinit = options.init_instance_callback;
        options.init_instance_callback = function (instance) {
            that.events.afterInitEdit.fire(instance);
            if (oldinit) {
                oldinit()
            }
        };
        tinyMCE.init(options)
    };
    fluid.defaults("fluid.inlineEdit.tinyMCE", {
        tinyMCE: {
            mode: "exact",
            theme: "simple"
        },
        useTooltip: true,
        selectors: {
            edit: "textarea"
        },
        styles: {
            invitation: "fl-inlineEdit-richText-invitation"
        },
        displayAccessor: {
            type: "fluid.inlineEdit.richTextViewAccessor"
        },
        editAccessor: {
            type: "fluid.inlineEdit.tinyMCE.viewAccessor"
        },
        lazyEditView: true,
        modelComparator: fluid.inlineEdit.htmlComparator,
        blurHandlerBinder: fluid.inlineEdit.tinyMCE.blurHandlerBinder,
        editModeRenderer: fluid.inlineEdit.tinyMCE.editModeRenderer
    });
    fluid.inlineEdit.FCKEditor = function (container, options) {
        return configureInlineEdit("fluid.inlineEdit.FCKEditor", container, options)
    };
    fluid.inlineEdit.FCKEditor.getEditor = function (editField) {
        var editor = typeof(FCKeditorAPI) === "undefined" ? null : FCKeditorAPI.GetInstance(editField.id);
        return editor
    };
    fluid.inlineEdit.FCKEditor.complete = fluid.event.getEventFirer();
    fluid.inlineEdit.FCKEditor.complete.addListener(function (editor) {
        var editField = editor.LinkedField;
        var that = $.data(editField, "fluid.inlineEdit.FCKEditor");
        if (that && that.events) {
            that.events.afterInitEdit.fire(editor)
        }
    });
    fluid.inlineEdit.FCKEditor.blurHandlerBinder = function (that) {
        function focusEditor(editor) {
            editor.Focus()
        }
        that.events.afterInitEdit.addListener(function (editor) {
            focusEditor(editor)
        });
        that.events.afterBeginEdit.addListener(function () {
            var editor = fluid.inlineEdit.FCKEditor.getEditor(that.editField[0]);
            if (editor) {
                focusEditor(editor)
            }
        })
    };
    fluid.inlineEdit.FCKEditor.editModeRenderer = function (that) {
        var id = fluid.allocateSimpleId(that.editField);
        $.data(fluid.unwrap(that.editField), "fluid.inlineEdit.FCKEditor", that);
        var oFCKeditor = new FCKeditor(id);
        var opcopy = fluid.copy(that.options.FCKEditor);
        opcopy.BasePath = opcopy.BasePath + "editor/";
        $.extend(true, oFCKeditor.Config, opcopy);
        $.extend(true, oFCKeditor, that.options.FCKEditor);
        oFCKeditor.Config.fluidInstance = that;
        oFCKeditor.ReplaceTextarea()
    };
    fluid.inlineEdit.FCKEditor.setValue = function (editField, editor, value) {
        editor.SetHTML(value)
    };
    fluid.inlineEdit.FCKEditor.getValue = function (editor) {
        return editor.GetHTML()
    };
    var flFCKEditor = fluid.inlineEdit.FCKEditor;
    flFCKEditor.viewAccessor = fluid.inlineEdit.makeViewAccessor(flFCKEditor.getEditor, flFCKEditor.setValue, flFCKEditor.getValue);
    fluid.defaults("fluid.inlineEdit.FCKEditor", {
        selectors: {
            edit: "textarea"
        },
        styles: {
            invitation: "fl-inlineEdit-richText-invitation"
        },
        displayAccessor: {
            type: "fluid.inlineEdit.richTextViewAccessor"
        },
        editAccessor: {
            type: "fluid.inlineEdit.FCKEditor.viewAccessor"
        },
        lazyEditView: true,
        modelComparator: fluid.inlineEdit.htmlComparator,
        blurHandlerBinder: fluid.inlineEdit.FCKEditor.blurHandlerBinder,
        editModeRenderer: fluid.inlineEdit.FCKEditor.editModeRenderer,
        FCKEditor: {
            BasePath: "fckeditor/"
        }
    });
    fluid.inlineEdit.CKEditor = function (container, options) {
        return configureInlineEdit("fluid.inlineEdit.CKEditor", container, options)
    };
    fluid.inlineEdit.CKEditor.getEditor = function (editField) {
        return CKEDITOR.instances[editField.id]
    };
    fluid.inlineEdit.CKEditor.setValue = function (editField, editor, value) {
        editor.setData(value)
    };
    fluid.inlineEdit.CKEditor.getValue = function (editor) {
        return editor.getData()
    };
    var flCKEditor = fluid.inlineEdit.CKEditor;
    flCKEditor.viewAccessor = fluid.inlineEdit.makeViewAccessor(flCKEditor.getEditor, flCKEditor.setValue, flCKEditor.getValue);
    fluid.inlineEdit.CKEditor.focus = function (editor) {
        setTimeout(function () {
            editor.focus()
        }, 0)
    };
    fluid.inlineEdit.CKEditor.normalizeHTML = function (value) {
        var togo = fluid.inlineEdit.normalizeHTML(value);
        var angpos = togo.indexOf(">");
        if (angpos !== -1 && angpos < togo.length - 1) {
            if (togo.charAt(angpos + 1) !== " ") {
                togo = togo.substring(0, angpos + 1) + " " + togo.substring(angpos + 1)
            }
        }
        return togo
    };
    fluid.inlineEdit.CKEditor.htmlComparator = function (el1, el2) {
        return fluid.inlineEdit.CKEditor.normalizeHTML(el1) === fluid.inlineEdit.CKEditor.normalizeHTML(el2)
    };
    fluid.inlineEdit.CKEditor.blurHandlerBinder = function (that) {
        that.events.afterInitEdit.addListener(fluid.inlineEdit.CKEditor.focus);
        that.events.afterBeginEdit.addListener(function () {
            var editor = fluid.inlineEdit.CKEditor.getEditor(that.editField[0]);
            if (editor) {
                fluid.inlineEdit.CKEditor.focus(editor)
            }
        })
    };
    fluid.inlineEdit.CKEditor.editModeRenderer = function (that) {
        var id = fluid.allocateSimpleId(that.editField);
        $.data(fluid.unwrap(that.editField), "fluid.inlineEdit.CKEditor", that);
        var editor = CKEDITOR.replace(id, that.options.CKEditor);
        editor.on("instanceReady", function (e) {
            fluid.inlineEdit.CKEditor.focus(e.editor);
            that.events.afterInitEdit.fire(e.editor)
        })
    };
    fluid.defaults("fluid.inlineEdit.CKEditor", {
        selectors: {
            edit: "textarea"
        },
        styles: {
            invitation: "fl-inlineEdit-richText-invitation"
        },
        displayAccessor: {
            type: "fluid.inlineEdit.richTextViewAccessor"
        },
        editAccessor: {
            type: "fluid.inlineEdit.CKEditor.viewAccessor"
        },
        lazyEditView: true,
        modelComparator: fluid.inlineEdit.CKEditor.htmlComparator,
        blurHandlerBinder: fluid.inlineEdit.CKEditor.blurHandlerBinder,
        editModeRenderer: fluid.inlineEdit.CKEditor.editModeRenderer,
        CKEditor: {}
    });
    fluid.inlineEdit.dropdown = function (container, options) {
        return configureInlineEdit("fluid.inlineEdit.dropdown", container, options)
    };
    fluid.inlineEdit.dropdown.editModeRenderer = function (that) {
        var id = fluid.allocateSimpleId(that.editField);
        that.editField.selectbox({
            finishHandler: function () {
                that.finish()
            }
        });
        return {
            container: that.editContainer,
            field: $("input.selectbox", that.editContainer)
        }
    };
    fluid.inlineEdit.dropdown.blurHandlerBinder = function (that) {
        fluid.deadMansBlur(that.editField, $("div.selectbox-wrapper li", that.editContainer), function () {
            that.cancel()
        })
    };
    fluid.defaults("fluid.inlineEdit.dropdown", {
        applyEditPadding: false,
        blurHandlerBinder: fluid.inlineEdit.dropdown.blurHandlerBinder,
        editModeRenderer: fluid.inlineEdit.dropdown.editModeRenderer
    })
})(jQuery, fluid_1_2);

function FCKeditor_OnComplete(editorInstance) {
    fluid.inlineEdit.FCKEditor.complete.fire(editorInstance)
};
(function ($) {
    $.fn.bgIframe = $.fn.bgiframe = function (s) {
        if ($.browser.msie && parseInt($.browser.version) <= 6) {
            s = $.extend({
                top: "auto",
                left: "auto",
                width: "auto",
                height: "auto",
                opacity: true,
                src: "javascript:false;"
            }, s || {});
            var prop = function (n) {
                return n && n.constructor == Number ? n + "px" : n
            },
                html = '<iframe class="bgiframe"frameborder="0"tabindex="-1"src="' + s.src + '"style="display:block;position:absolute;z-index:-1;' + (s.opacity !== false ? "filter:Alpha(Opacity='0');" : "") + "top:" + (s.top == "auto" ? "expression(((parseInt(this.parentNode.currentStyle.borderTopWidth)||0)*-1)+'px')" : prop(s.top)) + ";left:" + (s.left == "auto" ? "expression(((parseInt(this.parentNode.currentStyle.borderLeftWidth)||0)*-1)+'px')" : prop(s.left)) + ";width:" + (s.width == "auto" ? "expression(this.parentNode.offsetWidth+'px')" : prop(s.width)) + ";height:" + (s.height == "auto" ? "expression(this.parentNode.offsetHeight+'px')" : prop(s.height)) + ';"/>';
            return this.each(function () {
                if ($("> iframe.bgiframe", this).length == 0) {
                    this.insertBefore(document.createElement(html), this.firstChild)
                }
            })
        }
        return this
    };
    if (!$.browser.version) {
        $.browser.version = navigator.userAgent.toLowerCase().match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)[1]
    }
})(jQuery);
fluid_1_2 = fluid_1_2 || {};
(function ($, fluid) {
    function updateStyles(pageListThat, newModel, oldModel) {
        if (!pageListThat.pageLinks) {
            return
        }
        if (oldModel.pageIndex !== undefined) {
            var oldLink = pageListThat.pageLinks.eq(oldModel.pageIndex);
            oldLink.removeClass(pageListThat.options.styles.currentPage)
        }
        var pageLink = pageListThat.pageLinks.eq(newModel.pageIndex);
        pageLink.addClass(pageListThat.options.styles.currentPage)
    }
    function bindLinkClick(link, events, eventArg) {
        link.unbind("click.fluid.pager");
        link.bind("click.fluid.pager", function () {
            events.initiatePageChange.fire(eventArg)
        })
    }
    function computePageCount(model) {
        model.pageCount = Math.max(1, Math.floor((model.totalRange - 1) / model.pageSize) + 1)
    }
    fluid.pager = function () {
        return fluid.pagerImpl.apply(null, arguments)
    };
    fluid.pager.computePageLimit = function (model) {
        return Math.min(model.totalRange, (model.pageIndex + 1) * model.pageSize)
    };
    fluid.pager.directPageList = function (container, events, options) {
        var that = fluid.initView("fluid.pager.directPageList", container, options);
        that.pageLinks = that.locate("pageLinks");
        for (var i = 0; i < that.pageLinks.length; ++i) {
            var pageLink = that.pageLinks.eq(i);
            bindLinkClick(pageLink, events, {
                pageIndex: i
            })
        }
        events.onModelChange.addListener(function (newModel, oldModel) {
            updateStyles(that, newModel, oldModel)
        });
        that.defaultModel = {
            pageIndex: undefined,
            pageSize: 1,
            totalRange: that.pageLinks.length
        };
        return that
    };
    fluid.iota = function (count, first) {
        first = first || 0;
        var togo = [];
        for (var i = 0; i < count; ++i) {
            togo[togo.length] = first++
        }
        return togo
    };
    fluid.pager.everyPageStrategy = fluid.iota;
    fluid.pager.gappedPageStrategy = function (locality, midLocality) {
        if (!locality) {
            locality = 3
        }
        if (!midLocality) {
            midLocality = locality
        }
        return function (count, first, mid) {
            var togo = [];
            var j = 0;
            var lastSkip = false;
            for (var i = 0; i < count; ++i) {
                if (i < locality || (count - i - 1) < locality || (i >= mid - midLocality && i <= mid + midLocality)) {
                    togo[j++] = i;
                    lastSkip = false
                } else {
                    if (!lastSkip) {
                        togo[j++] = -1;
                        lastSkip = true
                    }
                }
            }
            return togo
        }
    };
    fluid.pager.renderedPageList = function (container, events, pagerBarOptions, options, strings) {
        options = $.extend(true, pagerBarOptions, options);
        var that = fluid.initView("fluid.pager.renderedPageList", container, options);
        options = that.options;
        var renderOptions = {
            cutpoints: [{
                id: "page-link:link",
                selector: pagerBarOptions.selectors.pageLinks
            },
            {
                id: "page-link:skip",
                selector: pagerBarOptions.selectors.pageLinkSkip
            },
            {
                id: "page-link:disabled",
                selector: pagerBarOptions.selectors.pageLinkDisabled
            }]
        };
        if (options.linkBody) {
            renderOptions.cutpoints[renderOptions.cutpoints.length] = {
                id: "payload-component",
                selector: options.linkBody
            }
        }
        function pageToComponent(current) {
            return function (page) {
                return page === -1 ? {
                    ID: "page-link:skip"
                } : {
                    ID: page === current ? "page-link:link" : "page-link:link",
                    localID: page + 1,
                    value: page + 1,
                    pageIndex: page,
                    decorators: [{
                        type: "jQuery",
                        func: "click",
                        args: function () {
                            events.initiatePageChange.fire({
                                pageIndex: page
                            })
                        }
                    },
                    {
                        type: page === current ? "addClass" : "null",
                        classes: that.options.styles.currentPage
                    }]
                }
            }
        }
        var root = that.locate("root");
        fluid.expectFilledSelector(root, "Error finding root template for fluid.pager.renderedPageList");
        var template = fluid.selfRender(root, {}, renderOptions);
        events.onModelChange.addListener(function (newModel, oldModel) {
            var pages = that.options.pageStrategy(newModel.pageCount, 0, newModel.pageIndex);
            var pageTree = fluid.transform(pages, pageToComponent(newModel.pageIndex));
            if (pageTree.length > 1) {
                pageTree[pageTree.length - 1].value = pageTree[pageTree.length - 1].value + strings.last
            }
            events.onRenderPageLinks.fire(pageTree, newModel);
            fluid.reRender(template, root, pageTree, renderOptions);
            updateStyles(that, newModel, oldModel)
        });
        return that
    };
    fluid.defaults("fluid.pager.renderedPageList", {
        selectors: {
            root: ".flc-pager-links"
        },
        linkBody: "a",
        pageStrategy: fluid.pager.everyPageStrategy
    });
    var updatePreviousNext = function (that, options, newModel) {
        if (newModel.pageIndex === 0) {
            that.previous.addClass(options.styles.disabled)
        } else {
            that.previous.removeClass(options.styles.disabled)
        }
        if (newModel.pageIndex === newModel.pageCount - 1) {
            that.next.addClass(options.styles.disabled)
        } else {
            that.next.removeClass(options.styles.disabled)
        }
    };
    fluid.pager.previousNext = function (container, events, options) {
        var that = fluid.initView("fluid.pager.previousNext", container, options);
        that.previous = that.locate("previous");
        bindLinkClick(that.previous, events, {
            relativePage: -1
        });
        that.next = that.locate("next");
        bindLinkClick(that.next, events, {
            relativePage: +1
        });
        events.onModelChange.addListener(function (newModel, oldModel, overallThat) {
            updatePreviousNext(that, options, newModel)
        });
        return that
    };
    fluid.pager.pagerBar = function (events, container, options, strings) {
        var that = fluid.initView("fluid.pager.pagerBar", container, options);
        that.pageList = fluid.initSubcomponent(that, "pageList", [container, events, that.options, fluid.COMPONENT_OPTIONS, strings]);
        that.previousNext = fluid.initSubcomponent(that, "previousNext", [container, events, that.options, fluid.COMPONENT_OPTIONS, strings]);
        return that
    };
    fluid.defaults("fluid.pager.pagerBar", {
        previousNext: {
            type: "fluid.pager.previousNext"
        },
        pageList: {
            type: "fluid.pager.directPageList"
        },
        selectors: {
            pageLinks: ".flc-pager-pageLink",
            pageLinkSkip: ".flc-pager-pageLink-skip",
            pageLinkDisabled: ".flc-pager-pageLink-disabled",
            previous: ".flc-pager-previous",
            next: ".flc-pager-next"
        },
        styles: {
            currentPage: "fl-pager-currentPage",
            disabled: "fl-pager-disabled"
        }
    });

    function getColumnDefs(that) {
        return that.options.columnDefs
    }
    fluid.pager.findColumnDef = function (columnDefs, key) {
        var columnDef = $.grep(columnDefs, function (def) {
            return def.key === key
        })[0];
        return columnDef
    };

    function getRoots(target, overallThat, index) {
        var cellRoot = (overallThat.options.dataOffset ? overallThat.options.dataOffset + "." : "");
        target.shortRoot = index;
        target.longRoot = cellRoot + target.shortRoot
    }
    function expandPath(EL, shortRoot, longRoot) {
        if (EL.charAt(0) === "*") {
            return longRoot + EL.substring(1)
        } else {
            return EL.replace("*", shortRoot)
        }
    }
    fluid.pager.fetchValue = function (that, dataModel, index, valuebinding, roots) {
        getRoots(roots, that, index);
        var path = expandPath(valuebinding, roots.shortRoot, roots.longRoot);
        return fluid.model.getBeanValue(dataModel, path)
    };
    fluid.pager.basicSorter = function (overallThat, model) {
        var dataModel = overallThat.options.dataModel;
        var roots = {};
        var columnDefs = getColumnDefs(overallThat);
        var columnDef = fluid.pager.findColumnDef(columnDefs, model.sortKey);
        var sortrecs = [];
        for (var i = 0; i < model.totalRange; ++i) {
            sortrecs[i] = {
                index: i,
                value: fluid.pager.fetchValue(overallThat, dataModel, i, columnDef.valuebinding, roots)
            }
        }
        function sortfunc(arec, brec) {
            var a = arec.value;
            var b = brec.value;
            return a === b ? 0 : (a > b ? model.sortDir : -model.sortDir)
        }
        sortrecs.sort(sortfunc);
        return fluid.transform(sortrecs, function (row) {
            return row.index
        })
    };
    fluid.pager.directModelFilter = function (model, pagerModel, perm) {
        var togo = [];
        var limit = fluid.pager.computePageLimit(pagerModel);
        for (var i = pagerModel.pageIndex * pagerModel.pageSize; i < limit; ++i) {
            var index = perm ? perm[i] : i;
            togo[togo.length] = {
                index: index,
                row: model[index]
            }
        }
        return togo
    };

    function expandVariables(value, opts) {
        var togo = "";
        var index = 0;
        while (true) {
            var nextindex = value.indexOf("${", index);
            if (nextindex === -1) {
                togo += value.substring(index);
                break
            } else {
                togo += value.substring(index, nextindex);
                var endi = value.indexOf("}", nextindex + 2);
                var EL = value.substring(nextindex + 2, endi);
                if (EL === "VALUE") {
                    EL = opts.EL
                } else {
                    EL = expandPath(EL, opts.shortRoot, opts.longRoot)
                }
                var val = fluid.model.getBeanValue(opts.dataModel, EL);
                togo += val;
                index = endi + 1
            }
        }
        return togo
    }
    function expandPaths(target, tree, opts) {
        for (var i in tree) {
            var val = tree[i];
            if (val === fluid.VALUE) {
                if (i === "valuebinding") {
                    target[i] = opts.EL
                } else {
                    target[i] = {
                        valuebinding: opts.EL
                    }
                }
            } else {
                if (i === "valuebinding") {
                    target[i] = expandPath(tree[i], opts)
                } else {
                    if (typeof(val) === "object") {
                        target[i] = val.length !== undefined ? [] : {};
                        expandPaths(target[i], val, opts)
                    } else {
                        if (typeof(val) === "string") {
                            target[i] = expandVariables(val, opts)
                        } else {
                            target[i] = tree[i]
                        }
                    }
                }
            }
        }
        return target
    }
    function iDforColumn(columnDef, opts) {
        var options = opts.options;
        var EL = columnDef.valuebinding;
        var key = columnDef.key;
        if (!EL) {
            fluid.fail("Error in definition for column with key " + key + ": valuebinding is not set")
        }
        opts.EL = expandPath(EL, opts.shortRoot, opts.longRoot);
        if (!key) {
            var segs = fluid.model.parseEL(EL);
            key = segs[segs.length - 1]
        }
        var ID = (options.keyPrefix ? options.keyPrefix : "") + key;
        return ID
    }
    function expandColumnDefs(filteredRow, opts) {
        var tree = fluid.transform(opts.columnDefs, function (columnDef) {
            var ID = iDforColumn(columnDef, opts);
            var togo;
            if (!columnDef.components) {
                return {
                    ID: ID,
                    valuebinding: opts.EL
                }
            } else {
                if (typeof columnDef.components === "function") {
                    togo = columnDef.components(filteredRow.row, filteredRow.index)
                } else {
                    togo = columnDef.components
                }
            }
            togo = expandPaths({}, togo, opts);
            togo.ID = ID;
            return togo
        });
        return tree
    }
    function fetchModel(overallThat) {
        return fluid.model.getBeanValue(overallThat.options.dataModel, overallThat.options.dataOffset)
    }
    function bigHeaderForKey(key, opts) {
        var id = opts.options.renderOptions.idMap["header:" + key];
        var smallHeader = fluid.jById(id);
        if (smallHeader.length === 0) {
            return null
        }
        var headerSortStylisticOffset = opts.overallOptions.selectors.headerSortStylisticOffset;
        var bigHeader = fluid.findAncestor(smallHeader, function (element) {
            return $(element).is(headerSortStylisticOffset)
        });
        return bigHeader
    }
    function setSortHeaderClass(styles, element, sort) {
        element = $(element);
        element.removeClass(styles.ascendingHeader);
        element.removeClass(styles.descendingHeader);
        if (sort !== 0) {
            element.addClass(sort === 1 ? styles.ascendingHeader : styles.descendingHeader)
        }
    }
    function isCurrentColumnSortable(columnDefs, model) {
        var columnDef = model.sortKey ? fluid.pager.findColumnDef(columnDefs, model.sortKey) : null;
        return columnDef ? columnDef.sortable : false
    }
    function setModelSortHeaderClass(newModel, opts) {
        var styles = opts.overallOptions.styles;
        var sort = isCurrentColumnSortable(opts.columnDefs, newModel) ? newModel.sortDir : 0;
        setSortHeaderClass(styles, bigHeaderForKey(newModel.sortKey, opts), sort)
    }
    function fireModelChange(that, newModel, forceUpdate) {
        computePageCount(newModel);
        if (newModel.pageIndex >= newModel.pageCount) {
            newModel.pageIndex = newModel.pageCount - 1
        }
        if (forceUpdate || newModel.pageIndex !== that.model.pageIndex || newModel.pageSize !== that.model.pageSize || newModel.sortKey !== that.model.sortKey || newModel.sortDir !== that.model.sortDir) {
            var sorted = isCurrentColumnSortable(getColumnDefs(that), newModel) ? that.options.sorter(that, newModel) : null;
            that.permutation = sorted;
            that.events.onModelChange.fire(newModel, that.model, that);
            fluid.model.copyModel(that.model, newModel)
        }
    }
    function generateColumnClick(overallThat, columnDef, opts) {
        return function () {
            if (columnDef.sortable === true) {
                var model = overallThat.model;
                var newModel = fluid.copy(model);
                var styles = overallThat.options.styles;
                var oldKey = model.sortKey;
                if (columnDef.key !== model.sortKey) {
                    newModel.sortKey = columnDef.key;
                    newModel.sortDir = 1;
                    var oldBig = bigHeaderForKey(oldKey, opts);
                    if (oldBig) {
                        setSortHeaderClass(styles, oldBig, 0)
                    }
                } else {
                    if (newModel.sortKey === columnDef.key) {
                        newModel.sortDir = -1 * newModel.sortDir
                    } else {
                        return false
                    }
                }
                newModel.pageIndex = 0;
                fireModelChange(overallThat, newModel, true);
                setModelSortHeaderClass(newModel, opts)
            }
            return false
        }
    }
    function fetchHeaderDecorators(decorators, columnDef) {
        return decorators[columnDef.sortable ? "sortableHeader" : "unsortableHeader"]
    }
    function generateHeader(overallThat, newModel, columnDefs, opts) {
        return {
            children: fluid.transform(columnDefs, function (columnDef) {
                return {
                    ID: iDforColumn(columnDef, opts),
                    value: columnDef.label,
                    decorators: [{
                        jQuery: ["click", generateColumnClick(overallThat, columnDef, opts)]
                    },
                    {
                        identify: "header:" + columnDef.key
                    }].concat(fetchHeaderDecorators(opts.overallOptions.decorators, columnDef))
                }
            })
        }
    }
    fluid.pager.selfRender = function (overallThat, inOptions) {
        var that = fluid.initView("fluid.pager.selfRender", overallThat.container, inOptions);
        var options = that.options;
        options.renderOptions.idMap = options.renderOptions.idMap || {};
        var idMap = options.renderOptions.idMap;
        var root = that.locate("root");
        var template = fluid.selfRender(root, {}, options.renderOptions);
        root.addClass(options.styles.root);
        var columnDefs = getColumnDefs(overallThat);
        var expOpts = {
            options: options,
            columnDefs: columnDefs,
            overallOptions: overallThat.options,
            dataModel: overallThat.options.dataModel,
            idMap: idMap
        };
        var directModel = fetchModel(overallThat);
        return {
            returnedOptions: {
                listeners: {
                    onModelChange: function (newModel, oldModel) {
                        var filtered = overallThat.options.modelFilter(directModel, newModel, overallThat.permutation);
                        var tree = fluid.transform(filtered, function (filteredRow) {
                            var roots = getRoots(expOpts, overallThat, filteredRow.index);
                            if (columnDefs === "explode") {
                                return fluid.explode(filteredRow.row, roots.longRoot)
                            } else {
                                if (columnDefs.length) {
                                    return expandColumnDefs(filteredRow, expOpts)
                                }
                            }
                        });
                        var fullTree = {};
                        fullTree[options.row] = tree;
                        if (typeof(columnDefs) === "object") {
                            fullTree[options.header] = generateHeader(overallThat, newModel, columnDefs, expOpts)
                        }
                        options.renderOptions = options.renderOptions || {};
                        options.renderOptions.model = expOpts.dataModel;
                        fluid.reRender(template, root, fullTree, options.renderOptions);
                        setModelSortHeaderClass(newModel, expOpts)
                    }
                }
            }
        }
    };
    fluid.defaults("fluid.pager.selfRender", {
        selectors: {
            root: ".flc-pager-body-template"
        },
        styles: {
            root: "fl-pager"
        },
        keyStrategy: "id",
        keyPrefix: "",
        row: "row:",
        header: "header:",
        renderOptions: {}
    });
    fluid.pager.summary = function (dom, options) {
        var node = dom.locate("summary");
        return {
            returnedOptions: {
                listeners: {
                    onModelChange: function (newModel, oldModel) {
                        var text = fluid.stringTemplate(options.message, {
                            first: newModel.pageIndex * newModel.pageSize + 1,
                            last: fluid.pager.computePageLimit(newModel),
                            total: newModel.totalRange
                        });
                        if (node.length > 0) {
                            node.text(text)
                        }
                    }
                }
            }
        }
    };
    fluid.pager.directPageSize = function (that) {
        var node = that.locate("pageSize");
        if (node.length > 0) {
            that.events.onModelChange.addListener(function (newModel, oldModel) {
                if (node.val() !== newModel.pageSize) {
                    node.val(newModel.pageSize)
                }
            });
            node.change(function () {
                that.events.initiatePageSizeChange.fire(node.val())
            })
        }
        return that
    };
    fluid.pager.rangeAnnotator = function (that, options) {
        var roots = {};
        that.events.onRenderPageLinks.addListener(function (tree, newModel) {
            var column = that.options.annotateColumnRange;
            var dataModel = that.options.dataModel;
            var columnDefs = getColumnDefs(that);
            if (!column || !dataModel || !columnDefs) {
                return
            }
            var columnDef = fluid.pager.findColumnDef(columnDefs, column);

            function fetchValue(index) {
                index = that.permutation ? that.permutation[index] : index;
                return fluid.pager.fetchValue(that, dataModel, index, columnDef.valuebinding, roots)
            }
            var tModel = {};
            fluid.model.copyModel(tModel, newModel);
            fluid.transform(tree, function (cell) {
                if (cell.ID === "page-link:link") {
                    var page = cell.pageIndex;
                    var start = page * tModel.pageSize;
                    tModel.pageIndex = page;
                    var limit = fluid.pager.computePageLimit(tModel);
                    var iValue = fetchValue(start);
                    var lValue = fetchValue(limit - 1);
                    var text = "<b>" + iValue + "</b><br/>&mdash;<br/><b>" + lValue + "</b>";
                    var decorator = {
                        type: "jQuery",
                        func: "tooltip",
                        args: {
                            delay: that.options.tooltipDelay,
                            extraClass: that.options.styles.tooltip,
                            bodyHandler: function () {
                                return text
                            },
                            showURL: false,
                            id: that.options.tooltipId
                        }
                    };
                    cell.decorators.push(decorator)
                }
            })
        })
    };
    fluid.pagerImpl = function (container, options) {
        var that = fluid.initView("fluid.pager", container, options);
        var pageIndexConformer = function (model, changeRequest) {
            if (changeRequest.value < 0) {
                changeRequest.value = 0
            }
        };
        that.events.initiatePageChange.addListener(function (arg) {
            var newModel = fluid.copy(that.model);
            if (arg.relativePage !== undefined) {
                newModel.pageIndex = that.model.pageIndex + arg.relativePage
            } else {
                newModel.pageIndex = arg.pageIndex
            }
            if (newModel.pageIndex === undefined || newModel.pageIndex < 0) {
                newModel.pageIndex = 0
            }
            fireModelChange(that, newModel, arg.forceUpdate)
        });
        that.events.initiatePageSizeChange.addListener(function (arg) {
            var newModel = fluid.copy(that.model);
            newModel.pageSize = arg;
            fireModelChange(that, newModel)
        });
        var pagerBarElement = that.locate("pagerBar");
        if (pagerBarElement.length > 0) {
            that.pagerBar = fluid.initSubcomponent(that, "pagerBar", [that.events, pagerBarElement, fluid.COMPONENT_OPTIONS, that.options.strings])
        }
        var pagerBarSecondaryElement = that.locate("pagerBarSecondary");
        if (pagerBarSecondaryElement.length > 0) {
            that.pagerBarSecondary = fluid.initSubcomponent(that, "pagerBar", [that.events, pagerBarSecondaryElement, fluid.COMPONENT_OPTIONS, that.options.strings])
        }
        that.bodyRenderer = fluid.initSubcomponent(that, "bodyRenderer", [that, fluid.COMPONENT_OPTIONS]);
        that.summary = fluid.initSubcomponent(that, "summary", [that.dom, fluid.COMPONENT_OPTIONS]);
        that.pageSize = fluid.initSubcomponent(that, "pageSize", [that]);
        that.rangeAnnotator = fluid.initSubcomponent(that, "rangeAnnotator", [that, fluid.COMPONENT_OPTIONS]);
        that.model = fluid.copy(that.options.model);
        var dataModel = fetchModel(that);
        if (dataModel) {
            that.model.totalRange = dataModel.length
        }
        if (that.model.totalRange === undefined) {
            if (!that.pagerBar) {
                fluid.fail("Error in Pager configuration - cannot determine total range,  since not configured in model.totalRange and no PagerBar is configured")
            }
            that.model = that.pagerBar.pageList.defaultModel
        }
        that.applier = fluid.makeChangeApplier(that.model);
        that.events.initiatePageChange.fire({
            pageIndex: that.model.pageIndex ? that.model.pageIndex : 0,
            forceUpdate: true
        });
        return that
    };
    fluid.defaults("fluid.pager", {
        mergePolicy: {
            dataModel: "preserve",
            model: "preserve"
        },
        pagerBar: {
            type: "fluid.pager.pagerBar",
            options: null
        },
        summary: {
            type: "fluid.pager.summary",
            options: {
                message: "%first-%last of %total items"
            }
        },
        pageSize: {
            type: "fluid.pager.directPageSize"
        },
        modelFilter: fluid.pager.directModelFilter,
        sorter: fluid.pager.basicSorter,
        bodyRenderer: {
            type: "fluid.emptySubcomponent"
        },
        model: {
            pageIndex: undefined,
            pageSize: 10,
            totalRange: undefined
        },
        dataModel: undefined,
        dataOffset: "",
        columnDefs: "explode",
        annotateColumnRange: undefined,
        tooltipDelay: 300,
        tooltipId: "tooltip",
        rangeAnnotator: {
            type: "fluid.pager.rangeAnnotator"
        },
        selectors: {
            pagerBar: ".flc-pager-top",
            pagerBarSecondary: ".flc-pager-bottom",
            summary: ".flc-pager-summary",
            pageSize: ".flc-pager-page-size",
            headerSortStylisticOffset: ".flc-pager-sort-header"
        },
        styles: {
            tooltip: "fl-pager-tooltip",
            ascendingHeader: "fl-pager-asc",
            descendingHeader: "fl-pager-desc"
        },
        decorators: {
            sortableHeader: [],
            unsortableHeader: []
        },
        strings: {
            last: " (last)"
        },
        events: {
            initiatePageChange: null,
            initiatePageSizeChange: null,
            onModelChange: null,
            onRenderPageLinks: null
        }
    })
})(jQuery, fluid_1_2);
(function ($) {
    $.widget("ui.draggable", $.ui.mouse, {
        widgetEventPrefix: "drag",
        options: {
            addClasses: true,
            appendTo: "parent",
            axis: false,
            connectToSortable: false,
            containment: false,
            cursor: "auto",
            cursorAt: false,
            grid: false,
            handle: false,
            helper: "original",
            iframeFix: false,
            opacity: false,
            refreshPositions: false,
            revert: false,
            revertDuration: 500,
            scope: "default",
            scroll: true,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            snap: false,
            snapMode: "both",
            snapTolerance: 20,
            stack: false,
            zIndex: false
        },
        _create: function () {
            if (this.options.helper == "original" && !(/^(?:r|a|f)/).test(this.element.css("position"))) {
                this.element[0].style.position = "relative"
            }(this.options.addClasses && this.element.addClass("ui-draggable"));
            (this.options.disabled && this.element.addClass("ui-draggable-disabled"));
            this._mouseInit()
        },
        destroy: function () {
            if (!this.element.data("draggable")) {
                return
            }
            this.element.removeData("draggable").unbind(".draggable").removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled");
            this._mouseDestroy();
            return this
        },
        _mouseCapture: function (event) {
            var o = this.options;
            if (this.helper || o.disabled || $(event.target).is(".ui-resizable-handle")) {
                return false
            }
            this.handle = this._getHandle(event);
            if (!this.handle) {
                return false
            }
            return true
        },
        _mouseStart: function (event) {
            var o = this.options;
            this.helper = this._createHelper(event);
            this._cacheHelperProportions();
            if ($.ui.ddmanager) {
                $.ui.ddmanager.current = this
            }
            this._cacheMargins();
            this.cssPosition = this.helper.css("position");
            this.scrollParent = this.helper.scrollParent();
            this.offset = this.positionAbs = this.element.offset();
            this.offset = {
                top: this.offset.top - this.margins.top,
                left: this.offset.left - this.margins.left
            };
            $.extend(this.offset, {
                click: {
                    left: event.pageX - this.offset.left,
                    top: event.pageY - this.offset.top
                },
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            });
            this.originalPosition = this.position = this._generatePosition(event);
            this.originalPageX = event.pageX;
            this.originalPageY = event.pageY;
            (o.cursorAt && this._adjustOffsetFromHelper(o.cursorAt));
            if (o.containment) {
                this._setContainment()
            }
            if (this._trigger("start", event) === false) {
                this._clear();
                return false
            }
            this._cacheHelperProportions();
            if ($.ui.ddmanager && !o.dropBehaviour) {
                $.ui.ddmanager.prepareOffsets(this, event)
            }
            this.helper.addClass("ui-draggable-dragging");
            this._mouseDrag(event, true);
            return true
        },
        _mouseDrag: function (event, noPropagation) {
            this.position = this._generatePosition(event);
            this.positionAbs = this._convertPositionTo("absolute");
            if (!noPropagation) {
                var ui = this._uiHash();
                if (this._trigger("drag", event, ui) === false) {
                    this._mouseUp({});
                    return false
                }
                this.position = ui.position
            }
            if (!this.options.axis || this.options.axis != "y") {
                this.helper[0].style.left = this.position.left + "px"
            }
            if (!this.options.axis || this.options.axis != "x") {
                this.helper[0].style.top = this.position.top + "px"
            }
            if ($.ui.ddmanager) {
                $.ui.ddmanager.drag(this, event)
            }
            return false
        },
        _mouseStop: function (event) {
            var dropped = false;
            if ($.ui.ddmanager && !this.options.dropBehaviour) {
                dropped = $.ui.ddmanager.drop(this, event)
            }
            if (this.dropped) {
                dropped = this.dropped;
                this.dropped = false
            }
            if (!this.element[0] || !this.element[0].parentNode) {
                return false
            }
            if ((this.options.revert == "invalid" && !dropped) || (this.options.revert == "valid" && dropped) || this.options.revert === true || ($.isFunction(this.options.revert) && this.options.revert.call(this.element, dropped))) {
                var self = this;
                $(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function () {
                    if (self._trigger("stop", event) !== false) {
                        self._clear()
                    }
                })
            } else {
                if (this._trigger("stop", event) !== false) {
                    this._clear()
                }
            }
            return false
        },
        cancel: function () {
            if (this.helper.is(".ui-draggable-dragging")) {
                this._mouseUp({})
            } else {
                this._clear()
            }
            return this
        },
        _getHandle: function (event) {
            var handle = !this.options.handle || !$(this.options.handle, this.element).length ? true : false;
            $(this.options.handle, this.element).find("*").andSelf().each(function () {
                if (this == event.target) {
                    handle = true
                }
            });
            return handle
        },
        _createHelper: function (event) {
            var o = this.options;
            var helper = $.isFunction(o.helper) ? $(o.helper.apply(this.element[0], [event])) : (o.helper == "clone" ? this.element.clone() : this.element);
            if (!helper.parents("body").length) {
                helper.appendTo((o.appendTo == "parent" ? this.element[0].parentNode : o.appendTo))
            }
            if (helper[0] != this.element[0] && !(/(fixed|absolute)/).test(helper.css("position"))) {
                helper.css("position", "absolute")
            }
            return helper
        },
        _adjustOffsetFromHelper: function (obj) {
            if (typeof obj == "string") {
                obj = obj.split(" ")
            }
            if ($.isArray(obj)) {
                obj = {
                    left: +obj[0],
                    top: +obj[1] || 0
                }
            }
            if ("left" in obj) {
                this.offset.click.left = obj.left + this.margins.left
            }
            if ("right" in obj) {
                this.offset.click.left = this.helperProportions.width - obj.right + this.margins.left
            }
            if ("top" in obj) {
                this.offset.click.top = obj.top + this.margins.top
            }
            if ("bottom" in obj) {
                this.offset.click.top = this.helperProportions.height - obj.bottom + this.margins.top
            }
        },
        _getParentOffset: function () {
            this.offsetParent = this.helper.offsetParent();
            var po = this.offsetParent.offset();
            if (this.cssPosition == "absolute" && this.scrollParent[0] != document && $.ui.contains(this.scrollParent[0], this.offsetParent[0])) {
                po.left += this.scrollParent.scrollLeft();
                po.top += this.scrollParent.scrollTop()
            }
            if ((this.offsetParent[0] == document.body) || (this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == "html" && $.browser.msie)) {
                po = {
                    top: 0,
                    left: 0
                }
            }
            return {
                top: po.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: po.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function () {
            if (this.cssPosition == "relative") {
                var p = this.element.position();
                return {
                    top: p.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: p.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            } else {
                return {
                    top: 0,
                    left: 0
                }
            }
        },
        _cacheMargins: function () {
            this.margins = {
                left: (parseInt(this.element.css("marginLeft"), 10) || 0),
                top: (parseInt(this.element.css("marginTop"), 10) || 0)
            }
        },
        _cacheHelperProportions: function () {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function () {
            var o = this.options;
            if (o.containment == "parent") {
                o.containment = this.helper[0].parentNode
            }
            if (o.containment == "document" || o.containment == "window") {
                this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, $(o.containment == "document" ? document : window).width() - this.helperProportions.width - this.margins.left, ($(o.containment == "document" ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]
            }
            if (!(/^(document|window|parent)$/).test(o.containment) && o.containment.constructor != Array) {
                var ce = $(o.containment)[0];
                if (!ce) {
                    return
                }
                var co = $(o.containment).offset();
                var over = ($(ce).css("overflow") != "hidden");
                this.containment = [co.left + (parseInt($(ce).css("borderLeftWidth"), 10) || 0) + (parseInt($(ce).css("paddingLeft"), 10) || 0) - this.margins.left, co.top + (parseInt($(ce).css("borderTopWidth"), 10) || 0) + (parseInt($(ce).css("paddingTop"), 10) || 0) - this.margins.top, co.left + (over ? Math.max(ce.scrollWidth, ce.offsetWidth) : ce.offsetWidth) - (parseInt($(ce).css("borderLeftWidth"), 10) || 0) - (parseInt($(ce).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, co.top + (over ? Math.max(ce.scrollHeight, ce.offsetHeight) : ce.offsetHeight) - (parseInt($(ce).css("borderTopWidth"), 10) || 0) - (parseInt($(ce).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top]
            } else {
                if (o.containment.constructor == Array) {
                    this.containment = o.containment
                }
            }
        },
        _convertPositionTo: function (d, pos) {
            if (!pos) {
                pos = this.position
            }
            var mod = d == "absolute" ? 1 : -1;
            var o = this.options,
                scroll = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && $.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
                scrollIsRootNode = (/(html|body)/i).test(scroll[0].tagName);
            return {
                top: (pos.top + this.offset.relative.top * mod + this.offset.parent.top * mod - ($.browser.safari && $.browser.version < 526 && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : (scrollIsRootNode ? 0 : scroll.scrollTop())) * mod)),
                left: (pos.left + this.offset.relative.left * mod + this.offset.parent.left * mod - ($.browser.safari && $.browser.version < 526 && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : scrollIsRootNode ? 0 : scroll.scrollLeft()) * mod))
            }
        },
        _generatePosition: function (event) {
            var o = this.options,
                scroll = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && $.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
                scrollIsRootNode = (/(html|body)/i).test(scroll[0].tagName);
            var pageX = event.pageX;
            var pageY = event.pageY;
            if (this.originalPosition) {
                if (this.containment) {
                    if (event.pageX - this.offset.click.left < this.containment[0]) {
                        pageX = this.containment[0] + this.offset.click.left
                    }
                    if (event.pageY - this.offset.click.top < this.containment[1]) {
                        pageY = this.containment[1] + this.offset.click.top
                    }
                    if (event.pageX - this.offset.click.left > this.containment[2]) {
                        pageX = this.containment[2] + this.offset.click.left
                    }
                    if (event.pageY - this.offset.click.top > this.containment[3]) {
                        pageY = this.containment[3] + this.offset.click.top
                    }
                }
                if (o.grid) {
                    var top = this.originalPageY + Math.round((pageY - this.originalPageY) / o.grid[1]) * o.grid[1];
                    pageY = this.containment ? (!(top - this.offset.click.top < this.containment[1] || top - this.offset.click.top > this.containment[3]) ? top : (!(top - this.offset.click.top < this.containment[1]) ? top - o.grid[1] : top + o.grid[1])) : top;
                    var left = this.originalPageX + Math.round((pageX - this.originalPageX) / o.grid[0]) * o.grid[0];
                    pageX = this.containment ? (!(left - this.offset.click.left < this.containment[0] || left - this.offset.click.left > this.containment[2]) ? left : (!(left - this.offset.click.left < this.containment[0]) ? left - o.grid[0] : left + o.grid[0])) : left
                }
            }
            return {
                top: (pageY - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ($.browser.safari && $.browser.version < 526 && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : (scrollIsRootNode ? 0 : scroll.scrollTop())))),
                left: (pageX - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ($.browser.safari && $.browser.version < 526 && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : scrollIsRootNode ? 0 : scroll.scrollLeft())))
            }
        },
        _clear: function () {
            this.helper.removeClass("ui-draggable-dragging");
            if (this.helper[0] != this.element[0] && !this.cancelHelperRemoval) {
                this.helper.remove()
            }
            this.helper = null;
            this.cancelHelperRemoval = false
        },
        _trigger: function (type, event, ui) {
            ui = ui || this._uiHash();
            $.ui.plugin.call(this, type, [event, ui]);
            if (type == "drag") {
                this.positionAbs = this._convertPositionTo("absolute")
            }
            return $.Widget.prototype._trigger.call(this, type, event, ui)
        },
        plugins: {},
        _uiHash: function (event) {
            return {
                helper: this.helper,
                position: this.position,
                originalPosition: this.originalPosition,
                offset: this.positionAbs
            }
        }
    });
    $.extend($.ui.draggable, {
        version: "1.8"
    });
    $.ui.plugin.add("draggable", "connectToSortable", {
        start: function (event, ui) {
            var inst = $(this).data("draggable"),
                o = inst.options,
                uiSortable = $.extend({}, ui, {
                    item: inst.element
                });
            inst.sortables = [];
            $(o.connectToSortable).each(function () {
                var sortable = $.data(this, "sortable");
                if (sortable && !sortable.options.disabled) {
                    inst.sortables.push({
                        instance: sortable,
                        shouldRevert: sortable.options.revert
                    });
                    sortable._refreshItems();
                    sortable._trigger("activate", event, uiSortable)
                }
            })
        },
        stop: function (event, ui) {
            var inst = $(this).data("draggable"),
                uiSortable = $.extend({}, ui, {
                    item: inst.element
                });
            $.each(inst.sortables, function () {
                if (this.instance.isOver) {
                    this.instance.isOver = 0;
                    inst.cancelHelperRemoval = true;
                    this.instance.cancelHelperRemoval = false;
                    if (this.shouldRevert) {
                        this.instance.options.revert = true
                    }
                    this.instance._mouseStop(event);
                    this.instance.options.helper = this.instance.options._helper;
                    if (inst.options.helper == "original") {
                        this.instance.currentItem.css({
                            top: "auto",
                            left: "auto"
                        })
                    }
                } else {
                    this.instance.cancelHelperRemoval = false;
                    this.instance._trigger("deactivate", event, uiSortable)
                }
            })
        },
        drag: function (event, ui) {
            var inst = $(this).data("draggable"),
                self = this;
            var checkPos = function (o) {
                var dyClick = this.offset.click.top,
                    dxClick = this.offset.click.left;
                var helperTop = this.positionAbs.top,
                    helperLeft = this.positionAbs.left;
                var itemHeight = o.height,
                    itemWidth = o.width;
                var itemTop = o.top,
                    itemLeft = o.left;
                return $.ui.isOver(helperTop + dyClick, helperLeft + dxClick, itemTop, itemLeft, itemHeight, itemWidth)
            };
            $.each(inst.sortables, function (i) {
                this.instance.positionAbs = inst.positionAbs;
                this.instance.helperProportions = inst.helperProportions;
                this.instance.offset.click = inst.offset.click;
                if (this.instance._intersectsWith(this.instance.containerCache)) {
                    if (!this.instance.isOver) {
                        this.instance.isOver = 1;
                        this.instance.currentItem = $(self).clone().appendTo(this.instance.element).data("sortable-item", true);
                        this.instance.options._helper = this.instance.options.helper;
                        this.instance.options.helper = function () {
                            return ui.helper[0]
                        };
                        event.target = this.instance.currentItem[0];
                        this.instance._mouseCapture(event, true);
                        this.instance._mouseStart(event, true, true);
                        this.instance.offset.click.top = inst.offset.click.top;
                        this.instance.offset.click.left = inst.offset.click.left;
                        this.instance.offset.parent.left -= inst.offset.parent.left - this.instance.offset.parent.left;
                        this.instance.offset.parent.top -= inst.offset.parent.top - this.instance.offset.parent.top;
                        inst._trigger("toSortable", event);
                        inst.dropped = this.instance.element;
                        inst.currentItem = inst.element;
                        this.instance.fromOutside = inst
                    }
                    if (this.instance.currentItem) {
                        this.instance._mouseDrag(event)
                    }
                } else {
                    if (this.instance.isOver) {
                        this.instance.isOver = 0;
                        this.instance.cancelHelperRemoval = true;
                        this.instance.options.revert = false;
                        this.instance._trigger("out", event, this.instance._uiHash(this.instance));
                        this.instance._mouseStop(event, true);
                        this.instance.options.helper = this.instance.options._helper;
                        this.instance.currentItem.remove();
                        if (this.instance.placeholder) {
                            this.instance.placeholder.remove()
                        }
                        inst._trigger("fromSortable", event);
                        inst.dropped = false
                    }
                }
            })
        }
    });
    $.ui.plugin.add("draggable", "cursor", {
        start: function (event, ui) {
            var t = $("body"),
                o = $(this).data("draggable").options;
            if (t.css("cursor")) {
                o._cursor = t.css("cursor")
            }
            t.css("cursor", o.cursor)
        },
        stop: function (event, ui) {
            var o = $(this).data("draggable").options;
            if (o._cursor) {
                $("body").css("cursor", o._cursor)
            }
        }
    });
    $.ui.plugin.add("draggable", "iframeFix", {
        start: function (event, ui) {
            var o = $(this).data("draggable").options;
            $(o.iframeFix === true ? "iframe" : o.iframeFix).each(function () {
                $('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({
                    width: this.offsetWidth + "px",
                    height: this.offsetHeight + "px",
                    position: "absolute",
                    opacity: "0.001",
                    zIndex: 1000
                }).css($(this).offset()).appendTo("body")
            })
        },
        stop: function (event, ui) {
            $("div.ui-draggable-iframeFix").each(function () {
                this.parentNode.removeChild(this)
            })
        }
    });
    $.ui.plugin.add("draggable", "opacity", {
        start: function (event, ui) {
            var t = $(ui.helper),
                o = $(this).data("draggable").options;
            if (t.css("opacity")) {
                o._opacity = t.css("opacity")
            }
            t.css("opacity", o.opacity)
        },
        stop: function (event, ui) {
            var o = $(this).data("draggable").options;
            if (o._opacity) {
                $(ui.helper).css("opacity", o._opacity)
            }
        }
    });
    $.ui.plugin.add("draggable", "scroll", {
        start: function (event, ui) {
            var i = $(this).data("draggable");
            if (i.scrollParent[0] != document && i.scrollParent[0].tagName != "HTML") {
                i.overflowOffset = i.scrollParent.offset()
            }
        },
        drag: function (event, ui) {
            var i = $(this).data("draggable"),
                o = i.options,
                scrolled = false;
            if (i.scrollParent[0] != document && i.scrollParent[0].tagName != "HTML") {
                if (!o.axis || o.axis != "x") {
                    if ((i.overflowOffset.top + i.scrollParent[0].offsetHeight) - event.pageY < o.scrollSensitivity) {
                        i.scrollParent[0].scrollTop = scrolled = i.scrollParent[0].scrollTop + o.scrollSpeed
                    } else {
                        if (event.pageY - i.overflowOffset.top < o.scrollSensitivity) {
                            i.scrollParent[0].scrollTop = scrolled = i.scrollParent[0].scrollTop - o.scrollSpeed
                        }
                    }
                }
                if (!o.axis || o.axis != "y") {
                    if ((i.overflowOffset.left + i.scrollParent[0].offsetWidth) - event.pageX < o.scrollSensitivity) {
                        i.scrollParent[0].scrollLeft = scrolled = i.scrollParent[0].scrollLeft + o.scrollSpeed
                    } else {
                        if (event.pageX - i.overflowOffset.left < o.scrollSensitivity) {
                            i.scrollParent[0].scrollLeft = scrolled = i.scrollParent[0].scrollLeft - o.scrollSpeed
                        }
                    }
                }
            } else {
                if (!o.axis || o.axis != "x") {
                    if (event.pageY - $(document).scrollTop() < o.scrollSensitivity) {
                        scrolled = $(document).scrollTop($(document).scrollTop() - o.scrollSpeed)
                    } else {
                        if ($(window).height() - (event.pageY - $(document).scrollTop()) < o.scrollSensitivity) {
                            scrolled = $(document).scrollTop($(document).scrollTop() + o.scrollSpeed)
                        }
                    }
                }
                if (!o.axis || o.axis != "y") {
                    if (event.pageX - $(document).scrollLeft() < o.scrollSensitivity) {
                        scrolled = $(document).scrollLeft($(document).scrollLeft() - o.scrollSpeed)
                    } else {
                        if ($(window).width() - (event.pageX - $(document).scrollLeft()) < o.scrollSensitivity) {
                            scrolled = $(document).scrollLeft($(document).scrollLeft() + o.scrollSpeed)
                        }
                    }
                }
            }
            if (scrolled !== false && $.ui.ddmanager && !o.dropBehaviour) {
                $.ui.ddmanager.prepareOffsets(i, event)
            }
        }
    });
    $.ui.plugin.add("draggable", "snap", {
        start: function (event, ui) {
            var i = $(this).data("draggable"),
                o = i.options;
            i.snapElements = [];
            $(o.snap.constructor != String ? (o.snap.items || ":data(draggable)") : o.snap).each(function () {
                var $t = $(this);
                var $o = $t.offset();
                if (this != i.element[0]) {
                    i.snapElements.push({
                        item: this,
                        width: $t.outerWidth(),
                        height: $t.outerHeight(),
                        top: $o.top,
                        left: $o.left
                    })
                }
            })
        },
        drag: function (event, ui) {
            var inst = $(this).data("draggable"),
                o = inst.options;
            var d = o.snapTolerance;
            var x1 = ui.offset.left,
                x2 = x1 + inst.helperProportions.width,
                y1 = ui.offset.top,
                y2 = y1 + inst.helperProportions.height;
            for (var i = inst.snapElements.length - 1; i >= 0; i--) {
                var l = inst.snapElements[i].left,
                    r = l + inst.snapElements[i].width,
                    t = inst.snapElements[i].top,
                    b = t + inst.snapElements[i].height;
                if (!((l - d < x1 && x1 < r + d && t - d < y1 && y1 < b + d) || (l - d < x1 && x1 < r + d && t - d < y2 && y2 < b + d) || (l - d < x2 && x2 < r + d && t - d < y1 && y1 < b + d) || (l - d < x2 && x2 < r + d && t - d < y2 && y2 < b + d))) {
                    if (inst.snapElements[i].snapping) {
                        (inst.options.snap.release && inst.options.snap.release.call(inst.element, event, $.extend(inst._uiHash(), {
                            snapItem: inst.snapElements[i].item
                        })))
                    }
                    inst.snapElements[i].snapping = false;
                    continue
                }
                if (o.snapMode != "inner") {
                    var ts = Math.abs(t - y2) <= d;
                    var bs = Math.abs(b - y1) <= d;
                    var ls = Math.abs(l - x2) <= d;
                    var rs = Math.abs(r - x1) <= d;
                    if (ts) {
                        ui.position.top = inst._convertPositionTo("relative", {
                            top: t - inst.helperProportions.height,
                            left: 0
                        }).top - inst.margins.top
                    }
                    if (bs) {
                        ui.position.top = inst._convertPositionTo("relative", {
                            top: b,
                            left: 0
                        }).top - inst.margins.top
                    }
                    if (ls) {
                        ui.position.left = inst._convertPositionTo("relative", {
                            top: 0,
                            left: l - inst.helperProportions.width
                        }).left - inst.margins.left
                    }
                    if (rs) {
                        ui.position.left = inst._convertPositionTo("relative", {
                            top: 0,
                            left: r
                        }).left - inst.margins.left
                    }
                }
                var first = (ts || bs || ls || rs);
                if (o.snapMode != "outer") {
                    var ts = Math.abs(t - y1) <= d;
                    var bs = Math.abs(b - y2) <= d;
                    var ls = Math.abs(l - x1) <= d;
                    var rs = Math.abs(r - x2) <= d;
                    if (ts) {
                        ui.position.top = inst._convertPositionTo("relative", {
                            top: t,
                            left: 0
                        }).top - inst.margins.top
                    }
                    if (bs) {
                        ui.position.top = inst._convertPositionTo("relative", {
                            top: b - inst.helperProportions.height,
                            left: 0
                        }).top - inst.margins.top
                    }
                    if (ls) {
                        ui.position.left = inst._convertPositionTo("relative", {
                            top: 0,
                            left: l
                        }).left - inst.margins.left
                    }
                    if (rs) {
                        ui.position.left = inst._convertPositionTo("relative", {
                            top: 0,
                            left: r - inst.helperProportions.width
                        }).left - inst.margins.left
                    }
                }
                if (!inst.snapElements[i].snapping && (ts || bs || ls || rs || first)) {
                    (inst.options.snap.snap && inst.options.snap.snap.call(inst.element, event, $.extend(inst._uiHash(), {
                        snapItem: inst.snapElements[i].item
                    })))
                }
                inst.snapElements[i].snapping = (ts || bs || ls || rs || first)
            }
        }
    });
    $.ui.plugin.add("draggable", "stack", {
        start: function (event, ui) {
            var o = $(this).data("draggable").options;
            var group = $.makeArray($(o.stack)).sort(function (a, b) {
                return (parseInt($(a).css("zIndex"), 10) || 0) - (parseInt($(b).css("zIndex"), 10) || 0)
            });
            if (!group.length) {
                return
            }
            var min = parseInt(group[0].style.zIndex) || 0;
            $(group).each(function (i) {
                this.style.zIndex = min + i
            });
            this[0].style.zIndex = min + group.length
        }
    });
    $.ui.plugin.add("draggable", "zIndex", {
        start: function (event, ui) {
            var t = $(ui.helper),
                o = $(this).data("draggable").options;
            if (t.css("zIndex")) {
                o._zIndex = t.css("zIndex")
            }
            t.css("zIndex", o.zIndex)
        },
        stop: function (event, ui) {
            var o = $(this).data("draggable").options;
            if (o._zIndex) {
                $(ui.helper).css("zIndex", o._zIndex)
            }
        }
    })
})(jQuery);
(function ($) {
    var uiDialogClasses = "ui-dialog ui-widget ui-widget-content ui-corner-all ";
    $.widget("ui.dialog", {
        options: {
            autoOpen: true,
            buttons: {},
            closeOnEscape: true,
            closeText: "close",
            dialogClass: "",
            draggable: true,
            hide: null,
            height: "auto",
            maxHeight: false,
            maxWidth: false,
            minHeight: 150,
            minWidth: 150,
            modal: false,
            position: "center",
            resizable: true,
            show: null,
            stack: true,
            title: "",
            width: 300,
            zIndex: 1000
        },
        _create: function () {
            this.originalTitle = this.element.attr("title");
            var self = this,
                options = self.options,
                title = options.title || self.originalTitle || "&#160;",
                titleId = $.ui.dialog.getTitleId(self.element),
                uiDialog = (self.uiDialog = $("<div></div>")).appendTo(document.body).hide().addClass(uiDialogClasses + options.dialogClass).css({
                    zIndex: options.zIndex
                }).attr("tabIndex", -1).css("outline", 0).keydown(function (event) {
                    if (options.closeOnEscape && event.keyCode && event.keyCode === $.ui.keyCode.ESCAPE) {
                        self.close(event);
                        event.preventDefault()
                    }
                }).attr({
                    role: "dialog",
                    "aria-labelledby": titleId
                }).mousedown(function (event) {
                    self.moveToTop(false, event)
                }),
                uiDialogContent = self.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(uiDialog),
                uiDialogTitlebar = (self.uiDialogTitlebar = $("<div></div>")).addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(uiDialog),
                uiDialogTitlebarClose = $('<a href="#"></a>').addClass("ui-dialog-titlebar-close ui-corner-all").attr("role", "button").hover(function () {
                    uiDialogTitlebarClose.addClass("ui-state-hover")
                }, function () {
                    uiDialogTitlebarClose.removeClass("ui-state-hover")
                }).focus(function () {
                    uiDialogTitlebarClose.addClass("ui-state-focus")
                }).blur(function () {
                    uiDialogTitlebarClose.removeClass("ui-state-focus")
                }).click(function (event) {
                    self.close(event);
                    return false
                }).appendTo(uiDialogTitlebar),
                uiDialogTitlebarCloseText = (self.uiDialogTitlebarCloseText = $("<span></span>")).addClass("ui-icon ui-icon-closethick").text(options.closeText).appendTo(uiDialogTitlebarClose),
                uiDialogTitle = $("<span></span>").addClass("ui-dialog-title").attr("id", titleId).html(title).prependTo(uiDialogTitlebar);
            if ($.isFunction(options.beforeclose) && !$.isFunction(options.beforeClose)) {
                options.beforeClose = options.beforeclose
            }
            uiDialogTitlebar.find("*").add(uiDialogTitlebar).disableSelection();
            if (options.draggable && $.fn.draggable) {
                self._makeDraggable()
            }
            if (options.resizable && $.fn.resizable) {
                self._makeResizable()
            }
            self._createButtons(options.buttons);
            self._isOpen = false;
            if ($.fn.bgiframe) {
                uiDialog.bgiframe()
            }
        },
        _init: function () {
            if (this.options.autoOpen) {
                this.open()
            }
        },
        destroy: function () {
            var self = this;
            if (self.overlay) {
                self.overlay.destroy()
            }
            self.uiDialog.hide();
            self.element.unbind(".dialog").removeData("dialog").removeClass("ui-dialog-content ui-widget-content").hide().appendTo("body");
            self.uiDialog.remove();
            if (self.originalTitle) {
                self.element.attr("title", self.originalTitle)
            }
            return self
        },
        widget: function () {
            return this.uiDialog
        },
        close: function (event) {
            var self = this,
                maxZ;
            if (false === self._trigger("beforeClose", event)) {
                return
            }
            if (self.overlay) {
                self.overlay.destroy()
            }
            self.uiDialog.unbind("keypress.ui-dialog");
            self._isOpen = false;
            if (self.options.hide) {
                self.uiDialog.hide(self.options.hide, function () {
                    self._trigger("close", event)
                })
            } else {
                self.uiDialog.hide();
                self._trigger("close", event)
            }
            $.ui.dialog.overlay.resize();
            if (self.options.modal) {
                maxZ = 0;
                $(".ui-dialog").each(function () {
                    if (this !== self.uiDialog[0]) {
                        maxZ = Math.max(maxZ, $(this).css("z-index"))
                    }
                });
                $.ui.dialog.maxZ = maxZ
            }
            return self
        },
        isOpen: function () {
            return this._isOpen
        },
        moveToTop: function (force, event) {
            var self = this,
                options = self.options,
                saveScroll;
            if ((options.modal && !force) || (!options.stack && !options.modal)) {
                return self._trigger("focus", event)
            }
            if (options.zIndex > $.ui.dialog.maxZ) {
                $.ui.dialog.maxZ = options.zIndex
            }
            if (self.overlay) {
                $.ui.dialog.maxZ += 1;
                self.overlay.$el.css("z-index", $.ui.dialog.overlay.maxZ = $.ui.dialog.maxZ)
            }
            saveScroll = {
                scrollTop: self.element.attr("scrollTop"),
                scrollLeft: self.element.attr("scrollLeft")
            };
            $.ui.dialog.maxZ += 1;
            self.uiDialog.css("z-index", $.ui.dialog.maxZ);
            self.element.attr(saveScroll);
            self._trigger("focus", event);
            return self
        },
        open: function () {
            if (this._isOpen) {
                return
            }
            var self = this,
                options = self.options,
                uiDialog = self.uiDialog;
            self.overlay = options.modal ? new $.ui.dialog.overlay(self) : null;
            if (uiDialog.next().length) {
                uiDialog.appendTo("body")
            }
            self._size();
            self._position(options.position);
            uiDialog.show(options.show);
            self.moveToTop(true);
            if (options.modal) {
                uiDialog.bind("keypress.ui-dialog", function (event) {
                    if (event.keyCode !== $.ui.keyCode.TAB) {
                        return
                    }
                    var tabbables = $(":tabbable", this),
                        first = tabbables.filter(":first"),
                        last = tabbables.filter(":last");
                    if (event.target === last[0] && !event.shiftKey) {
                        first.focus(1);
                        return false
                    } else {
                        if (event.target === first[0] && event.shiftKey) {
                            last.focus(1);
                            return false
                        }
                    }
                })
            }
            $([]).add(uiDialog.find(".ui-dialog-content :tabbable:first")).add(uiDialog.find(".ui-dialog-buttonpane :tabbable:first")).add(uiDialog).filter(":first").focus();
            self._trigger("open");
            self._isOpen = true;
            return self
        },
        _createButtons: function (buttons) {
            var self = this,
                hasButtons = false,
                uiDialogButtonPane = $("<div></div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix");
            self.uiDialog.find(".ui-dialog-buttonpane").remove();
            if (typeof buttons === "object" && buttons !== null) {
                $.each(buttons, function () {
                    return !(hasButtons = true)
                })
            }
            if (hasButtons) {
                $.each(buttons, function (name, fn) {
                    var button = $('<button type="button"></button>').text(name).click(function () {
                        fn.apply(self.element[0], arguments)
                    }).appendTo(uiDialogButtonPane);
                    if ($.fn.button) {
                        button.button()
                    }
                });
                uiDialogButtonPane.appendTo(self.uiDialog)
            }
        },
        _makeDraggable: function () {
            var self = this,
                options = self.options,
                doc = $(document),
                heightBeforeDrag;

            function filteredUi(ui) {
                return {
                    position: ui.position,
                    offset: ui.offset
                }
            }
            self.uiDialog.draggable({
                cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
                handle: ".ui-dialog-titlebar",
                containment: "document",
                start: function (event, ui) {
                    heightBeforeDrag = options.height === "auto" ? "auto" : $(this).height();
                    $(this).height($(this).height()).addClass("ui-dialog-dragging");
                    self._trigger("dragStart", event, filteredUi(ui))
                },
                drag: function (event, ui) {
                    self._trigger("drag", event, filteredUi(ui))
                },
                stop: function (event, ui) {
                    options.position = [ui.position.left - doc.scrollLeft(), ui.position.top - doc.scrollTop()];
                    $(this).removeClass("ui-dialog-dragging").height(heightBeforeDrag);
                    self._trigger("dragStop", event, filteredUi(ui));
                    $.ui.dialog.overlay.resize()
                }
            })
        },
        _makeResizable: function (handles) {
            handles = (handles === undefined ? this.options.resizable : handles);
            var self = this,
                options = self.options,
                position = self.uiDialog.css("position"),
                resizeHandles = (typeof handles === "string" ? handles : "n,e,s,w,se,sw,ne,nw");

            function filteredUi(ui) {
                return {
                    originalPosition: ui.originalPosition,
                    originalSize: ui.originalSize,
                    position: ui.position,
                    size: ui.size
                }
            }
            self.uiDialog.resizable({
                cancel: ".ui-dialog-content",
                containment: "document",
                alsoResize: self.element,
                maxWidth: options.maxWidth,
                maxHeight: options.maxHeight,
                minWidth: options.minWidth,
                minHeight: self._minHeight(),
                handles: resizeHandles,
                start: function (event, ui) {
                    $(this).addClass("ui-dialog-resizing");
                    self._trigger("resizeStart", event, filteredUi(ui))
                },
                resize: function (event, ui) {
                    self._trigger("resize", event, filteredUi(ui))
                },
                stop: function (event, ui) {
                    $(this).removeClass("ui-dialog-resizing");
                    options.height = $(this).height();
                    options.width = $(this).width();
                    self._trigger("resizeStop", event, filteredUi(ui));
                    $.ui.dialog.overlay.resize()
                }
            }).css("position", position).find(".ui-resizable-se").addClass("ui-icon ui-icon-grip-diagonal-se")
        },
        _minHeight: function () {
            var options = this.options;
            if (options.height === "auto") {
                return options.minHeight
            } else {
                return Math.min(options.minHeight, options.height)
            }
        },
        _position: function (position) {
            var myAt = [],
                offset = [0, 0],
                isVisible;
            position = position || $.ui.dialog.prototype.options.position;
            if (typeof position === "string" || (typeof position === "object" && "0" in position)) {
                myAt = position.split ? position.split(" ") : [position[0], position[1]];
                if (myAt.length === 1) {
                    myAt[1] = myAt[0]
                }
                $.each(["left", "top"], function (i, offsetPosition) {
                    if (+myAt[i] === myAt[i]) {
                        offset[i] = myAt[i];
                        myAt[i] = offsetPosition
                    }
                })
            } else {
                if (typeof position === "object") {
                    if ("left" in position) {
                        myAt[0] = "left";
                        offset[0] = position.left
                    } else {
                        if ("right" in position) {
                            myAt[0] = "right";
                            offset[0] = -position.right
                        }
                    }
                    if ("top" in position) {
                        myAt[1] = "top";
                        offset[1] = position.top
                    } else {
                        if ("bottom" in position) {
                            myAt[1] = "bottom";
                            offset[1] = -position.bottom
                        }
                    }
                }
            }
            isVisible = this.uiDialog.is(":visible");
            if (!isVisible) {
                this.uiDialog.show()
            }
            this.uiDialog.css({
                top: 0,
                left: 0
            }).position({
                my: myAt.join(" "),
                at: myAt.join(" "),
                offset: offset.join(" "),
                of: window,
                collision: "fit",
                using: function (pos) {
                    var topOffset = $(this).css(pos).offset().top;
                    if (topOffset < 0) {
                        $(this).css("top", pos.top - topOffset)
                    }
                }
            });
            if (!isVisible) {
                this.uiDialog.hide()
            }
        },
        _setOption: function (key, value) {
            var self = this,
                uiDialog = self.uiDialog,
                isResizable = uiDialog.is(":data(resizable)"),
                resize = false;
            switch (key) {
            case "beforeclose":
                key = "beforeClose";
                break;
            case "buttons":
                self._createButtons(value);
                break;
            case "closeText":
                self.uiDialogTitlebarCloseText.text("" + value);
                break;
            case "dialogClass":
                uiDialog.removeClass(self.options.dialogClass).addClass(uiDialogClasses + value);
                break;
            case "disabled":
                if (value) {
                    uiDialog.addClass("ui-dialog-disabled")
                } else {
                    uiDialog.removeClass("ui-dialog-disabled")
                }
                break;
            case "draggable":
                if (value) {
                    self._makeDraggable()
                } else {
                    uiDialog.draggable("destroy")
                }
                break;
            case "height":
                resize = true;
                break;
            case "maxHeight":
                if (isResizable) {
                    uiDialog.resizable("option", "maxHeight", value)
                }
                resize = true;
                break;
            case "maxWidth":
                if (isResizable) {
                    uiDialog.resizable("option", "maxWidth", value)
                }
                resize = true;
                break;
            case "minHeight":
                if (isResizable) {
                    uiDialog.resizable("option", "minHeight", value)
                }
                resize = true;
                break;
            case "minWidth":
                if (isResizable) {
                    uiDialog.resizable("option", "minWidth", value)
                }
                resize = true;
                break;
            case "position":
                self._position(value);
                break;
            case "resizable":
                if (isResizable && !value) {
                    uiDialog.resizable("destroy")
                }
                if (isResizable && typeof value === "string") {
                    uiDialog.resizable("option", "handles", value)
                }
                if (!isResizable && value !== false) {
                    self._makeResizable(value)
                }
                break;
            case "title":
                $(".ui-dialog-title", self.uiDialogTitlebar).html("" + (value || "&#160;"));
                break;
            case "width":
                resize = true;
                break
            }
            $.Widget.prototype._setOption.apply(self, arguments);
            if (resize) {
                self._size()
            }
        },
        _size: function () {
            var options = this.options,
                nonContentHeight;
            this.element.css("width", "auto").hide();
            nonContentHeight = this.uiDialog.css({
                height: "auto",
                width: options.width
            }).height();
            this.element.css(options.height === "auto" ? {
                minHeight: Math.max(options.minHeight - nonContentHeight, 0),
                height: "auto"
            } : {
                minHeight: 0,
                height: Math.max(options.height - nonContentHeight, 0)
            }).show();
            if (this.uiDialog.is(":data(resizable)")) {
                this.uiDialog.resizable("option", "minHeight", this._minHeight())
            }
        }
    });
    $.extend($.ui.dialog, {
        version: "1.8",
        uuid: 0,
        maxZ: 0,
        getTitleId: function ($el) {
            var id = $el.attr("id");
            if (!id) {
                this.uuid += 1;
                id = this.uuid
            }
            return "ui-dialog-title-" + id
        },
        overlay: function (dialog) {
            this.$el = $.ui.dialog.overlay.create(dialog)
        }
    });
    $.extend($.ui.dialog.overlay, {
        instances: [],
        oldInstances: [],
        maxZ: 0,
        events: $.map("focus,mousedown,mouseup,keydown,keypress,click".split(","), function (event) {
            return event + ".dialog-overlay"
        }).join(" "),
        create: function (dialog) {
            if (this.instances.length === 0) {
                setTimeout(function () {
                    if ($.ui.dialog.overlay.instances.length) {
                        $(document).bind($.ui.dialog.overlay.events, function (event) {
                            return ($(event.target).zIndex() >= $.ui.dialog.overlay.maxZ)
                        })
                    }
                }, 1);
                $(document).bind("keydown.dialog-overlay", function (event) {
                    if (dialog.options.closeOnEscape && event.keyCode && event.keyCode === $.ui.keyCode.ESCAPE) {
                        dialog.close(event);
                        event.preventDefault()
                    }
                });
                $(window).bind("resize.dialog-overlay", $.ui.dialog.overlay.resize)
            }
            var $el = (this.oldInstances.pop() || $("<div></div>").addClass("ui-widget-overlay")).appendTo(document.body).css({
                width: this.width(),
                height: this.height()
            });
            if ($.fn.bgiframe) {
                $el.bgiframe()
            }
            this.instances.push($el);
            return $el
        },
        destroy: function ($el) {
            this.oldInstances.push(this.instances.splice($.inArray($el, this.instances), 1)[0]);
            if (this.instances.length === 0) {
                $([document, window]).unbind(".dialog-overlay")
            }
            $el.remove();
            var maxZ = 0;
            $.each(this.instances, function () {
                maxZ = Math.max(maxZ, this.css("z-index"))
            });
            this.maxZ = maxZ
        },
        height: function () {
            var scrollHeight, offsetHeight;
            if ($.browser.msie && $.browser.version < 7) {
                scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
                offsetHeight = Math.max(document.documentElement.offsetHeight, document.body.offsetHeight);
                if (scrollHeight < offsetHeight) {
                    return $(window).height() + "px"
                } else {
                    return scrollHeight + "px"
                }
            } else {
                return $(document).height() + "px"
            }
        },
        width: function () {
            var scrollWidth, offsetWidth;
            if ($.browser.msie && $.browser.version < 7) {
                scrollWidth = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth);
                offsetWidth = Math.max(document.documentElement.offsetWidth, document.body.offsetWidth);
                if (scrollWidth < offsetWidth) {
                    return $(window).width() + "px"
                } else {
                    return scrollWidth + "px"
                }
            } else {
                return $(document).width() + "px"
            }
        },
        resize: function () {
            var $overlays = $([]);
            $.each($.ui.dialog.overlay.instances, function () {
                $overlays = $overlays.add(this)
            });
            $overlays.css({
                width: 0,
                height: 0
            }).css({
                width: $.ui.dialog.overlay.width(),
                height: $.ui.dialog.overlay.height()
            })
        }
    });
    $.extend($.ui.dialog.overlay.prototype, {
        destroy: function () {
            $.ui.dialog.overlay.destroy(this.$el)
        }
    })
}(jQuery));
(function ($) {
    $.widget("ui.accordion", {
        options: {
            active: 0,
            animated: "slide",
            autoHeight: true,
            clearStyle: false,
            collapsible: false,
            event: "click",
            fillSpace: false,
            header: "> li > :first-child,> :not(li):even",
            icons: {
                header: "ui-icon-triangle-1-e",
                headerSelected: "ui-icon-triangle-1-s"
            },
            navigation: false,
            navigationFilter: function () {
                return this.href.toLowerCase() == location.href.toLowerCase()
            }
        },
        _create: function () {
            var o = this.options,
                self = this;
            this.running = 0;
            this.element.addClass("ui-accordion ui-widget ui-helper-reset");
            if (this.element[0].nodeName == "UL") {
                this.element.children("li").addClass("ui-accordion-li-fix")
            }
            this.headers = this.element.find(o.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all").bind("mouseenter.accordion", function () {
                $(this).addClass("ui-state-hover")
            }).bind("mouseleave.accordion", function () {
                $(this).removeClass("ui-state-hover")
            }).bind("focus.accordion", function () {
                $(this).addClass("ui-state-focus")
            }).bind("blur.accordion", function () {
                $(this).removeClass("ui-state-focus")
            });
            this.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom");
            if (o.navigation) {
                var current = this.element.find("a").filter(o.navigationFilter);
                if (current.length) {
                    var header = current.closest(".ui-accordion-header");
                    if (header.length) {
                        this.active = header
                    } else {
                        this.active = current.closest(".ui-accordion-content").prev()
                    }
                }
            }
            this.active = this._findActive(this.active || o.active).toggleClass("ui-state-default").toggleClass("ui-state-active").toggleClass("ui-corner-all").toggleClass("ui-corner-top");
            this.active.next().addClass("ui-accordion-content-active");
            this._createIcons();
            if ($.browser.msie) {
                this.element.find("a").css("zoom", "1")
            }
            this.resize();
            this.element.attr("role", "tablist");
            this.headers.attr("role", "tab").bind("keydown", function (event) {
                return self._keydown(event)
            }).next().attr("role", "tabpanel");
            this.headers.not(this.active || "").attr("aria-expanded", "false").attr("tabIndex", "-1").next().hide();
            if (!this.active.length) {
                this.headers.eq(0).attr("tabIndex", "0")
            } else {
                this.active.attr("aria-expanded", "true").attr("tabIndex", "0")
            }
            if (!$.browser.safari) {
                this.headers.find("a").attr("tabIndex", "-1")
            }
            if (o.event) {
                this.headers.bind((o.event) + ".accordion", function (event) {
                    self._clickHandler.call(self, event, this);
                    event.preventDefault()
                })
            }
        },
        _createIcons: function () {
            var o = this.options;
            if (o.icons) {
                $("<span/>").addClass("ui-icon " + o.icons.header).prependTo(this.headers);
                this.active.find(".ui-icon").toggleClass(o.icons.header).toggleClass(o.icons.headerSelected);
                this.element.addClass("ui-accordion-icons")
            }
        },
        _destroyIcons: function () {
            this.headers.children(".ui-icon").remove();
            this.element.removeClass("ui-accordion-icons")
        },
        destroy: function () {
            var o = this.options;
            this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role").unbind(".accordion").removeData("accordion");
            this.headers.unbind(".accordion").removeClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("tabindex");
            this.headers.find("a").removeAttr("tabindex");
            this._destroyIcons();
            var contents = this.headers.next().css("display", "").removeAttr("role").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active");
            if (o.autoHeight || o.fillHeight) {
                contents.css("height", "")
            }
            return this
        },
        _setOption: function (key, value) {
            $.Widget.prototype._setOption.apply(this, arguments);
            if (key == "active") {
                this.activate(value)
            }
            if (key == "icons") {
                this._destroyIcons();
                if (value) {
                    this._createIcons()
                }
            }
        },
        _keydown: function (event) {
            var o = this.options,
                keyCode = $.ui.keyCode;
            if (o.disabled || event.altKey || event.ctrlKey) {
                return
            }
            var length = this.headers.length;
            var currentIndex = this.headers.index(event.target);
            var toFocus = false;
            switch (event.keyCode) {
            case keyCode.RIGHT:
            case keyCode.DOWN:
                toFocus = this.headers[(currentIndex + 1) % length];
                break;
            case keyCode.LEFT:
            case keyCode.UP:
                toFocus = this.headers[(currentIndex - 1 + length) % length];
                break;
            case keyCode.SPACE:
            case keyCode.ENTER:
                this._clickHandler({
                    target: event.target
                }, event.target);
                event.preventDefault()
            }
            if (toFocus) {
                $(event.target).attr("tabIndex", "-1");
                $(toFocus).attr("tabIndex", "0");
                toFocus.focus();
                return false
            }
            return true
        },
        resize: function () {
            var o = this.options,
                maxHeight;
            if (o.fillSpace) {
                if ($.browser.msie) {
                    var defOverflow = this.element.parent().css("overflow");
                    this.element.parent().css("overflow", "hidden")
                }
                maxHeight = this.element.parent().height();
                if ($.browser.msie) {
                    this.element.parent().css("overflow", defOverflow)
                }
                this.headers.each(function () {
                    maxHeight -= $(this).outerHeight(true)
                });
                this.headers.next().each(function () {
                    $(this).height(Math.max(0, maxHeight - $(this).innerHeight() + $(this).height()))
                }).css("overflow", "auto")
            } else {
                if (o.autoHeight) {
                    maxHeight = 0;
                    this.headers.next().each(function () {
                        maxHeight = Math.max(maxHeight, $(this).height())
                    }).height(maxHeight)
                }
            }
            return this
        },
        activate: function (index) {
            this.options.active = index;
            var active = this._findActive(index)[0];
            this._clickHandler({
                target: active
            }, active);
            return this
        },
        _findActive: function (selector) {
            return selector ? typeof selector == "number" ? this.headers.filter(":eq(" + selector + ")") : this.headers.not(this.headers.not(selector)) : selector === false ? $([]) : this.headers.filter(":eq(0)")
        },
        _clickHandler: function (event, target) {
            var o = this.options;
            if (o.disabled) {
                return
            }
            if (!event.target) {
                if (!o.collapsible) {
                    return
                }
                this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").find(".ui-icon").removeClass(o.icons.headerSelected).addClass(o.icons.header);
                this.active.next().addClass("ui-accordion-content-active");
                var toHide = this.active.next(),
                    data = {
                        options: o,
                        newHeader: $([]),
                        oldHeader: o.active,
                        newContent: $([]),
                        oldContent: toHide
                    },
                    toShow = (this.active = $([]));
                this._toggle(toShow, toHide, data);
                return
            }
            var clicked = $(event.currentTarget || target);
            var clickedIsActive = clicked[0] == this.active[0];
            o.active = o.collapsible && clickedIsActive ? false : $(".ui-accordion-header", this.element).index(clicked);
            if (this.running || (!o.collapsible && clickedIsActive)) {
                return
            }
            this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").find(".ui-icon").removeClass(o.icons.headerSelected).addClass(o.icons.header);
            if (!clickedIsActive) {
                clicked.removeClass("ui-state-default ui-corner-all").addClass("ui-state-active ui-corner-top").find(".ui-icon").removeClass(o.icons.header).addClass(o.icons.headerSelected);
                clicked.next().addClass("ui-accordion-content-active")
            }
            var toShow = clicked.next(),
                toHide = this.active.next(),
                data = {
                    options: o,
                    newHeader: clickedIsActive && o.collapsible ? $([]) : clicked,
                    oldHeader: this.active,
                    newContent: clickedIsActive && o.collapsible ? $([]) : toShow,
                    oldContent: toHide
                },
                down = this.headers.index(this.active[0]) > this.headers.index(clicked[0]);
            this.active = clickedIsActive ? $([]) : clicked;
            this._toggle(toShow, toHide, data, clickedIsActive, down);
            return
        },
        _toggle: function (toShow, toHide, data, clickedIsActive, down) {
            var o = this.options,
                self = this;
            this.toShow = toShow;
            this.toHide = toHide;
            this.data = data;
            var complete = function () {
                if (!self) {
                    return
                }
                return self._completed.apply(self, arguments)
            };
            this._trigger("changestart", null, this.data);
            this.running = toHide.size() === 0 ? toShow.size() : toHide.size();
            if (o.animated) {
                var animOptions = {};
                if (o.collapsible && clickedIsActive) {
                    animOptions = {
                        toShow: $([]),
                        toHide: toHide,
                        complete: complete,
                        down: down,
                        autoHeight: o.autoHeight || o.fillSpace
                    }
                } else {
                    animOptions = {
                        toShow: toShow,
                        toHide: toHide,
                        complete: complete,
                        down: down,
                        autoHeight: o.autoHeight || o.fillSpace
                    }
                }
                if (!o.proxied) {
                    o.proxied = o.animated
                }
                if (!o.proxiedDuration) {
                    o.proxiedDuration = o.duration
                }
                o.animated = $.isFunction(o.proxied) ? o.proxied(animOptions) : o.proxied;
                o.duration = $.isFunction(o.proxiedDuration) ? o.proxiedDuration(animOptions) : o.proxiedDuration;
                var animations = $.ui.accordion.animations,
                    duration = o.duration,
                    easing = o.animated;
                if (easing && !animations[easing] && !$.easing[easing]) {
                    easing = "slide"
                }
                if (!animations[easing]) {
                    animations[easing] = function (options) {
                        this.slide(options, {
                            easing: easing,
                            duration: duration || 700
                        })
                    }
                }
                animations[easing](animOptions)
            } else {
                if (o.collapsible && clickedIsActive) {
                    toShow.toggle()
                } else {
                    toHide.hide();
                    toShow.show()
                }
                complete(true)
            }
            toHide.prev().attr("aria-expanded", "false").attr("tabIndex", "-1").blur();
            toShow.prev().attr("aria-expanded", "true").attr("tabIndex", "0").focus()
        },
        _completed: function (cancel) {
            var o = this.options;
            this.running = cancel ? 0 : --this.running;
            if (this.running) {
                return
            }
            if (o.clearStyle) {
                this.toShow.add(this.toHide).css({
                    height: "",
                    overflow: ""
                })
            }
            this.toHide.removeClass("ui-accordion-content-active");
            this._trigger("change", null, this.data)
        }
    });
    $.extend($.ui.accordion, {
        version: "1.8",
        animations: {
            slide: function (options, additions) {
                options = $.extend({
                    easing: "swing",
                    duration: 300
                }, options, additions);
                if (!options.toHide.size()) {
                    options.toShow.animate({
                        height: "show"
                    }, options);
                    return
                }
                if (!options.toShow.size()) {
                    options.toHide.animate({
                        height: "hide"
                    }, options);
                    return
                }
                var overflow = options.toShow.css("overflow"),
                    percentDone = 0,
                    showProps = {},
                    hideProps = {},
                    fxAttrs = ["height", "paddingTop", "paddingBottom"],
                    originalWidth;
                var s = options.toShow;
                originalWidth = s[0].style.width;
                s.width(parseInt(s.parent().width(), 10) - parseInt(s.css("paddingLeft"), 10) - parseInt(s.css("paddingRight"), 10) - (parseInt(s.css("borderLeftWidth"), 10) || 0) - (parseInt(s.css("borderRightWidth"), 10) || 0));
                $.each(fxAttrs, function (i, prop) {
                    hideProps[prop] = "hide";
                    var parts = ("" + $.css(options.toShow[0], prop)).match(/^([\d+-.]+)(.*)$/);
                    showProps[prop] = {
                        value: parts[1],
                        unit: parts[2] || "px"
                    }
                });
                options.toShow.css({
                    height: 0,
                    overflow: "hidden"
                }).show();
                options.toHide.filter(":hidden").each(options.complete).end().filter(":visible").animate(hideProps, {
                    step: function (now, settings) {
                        if (settings.prop == "height") {
                            percentDone = (settings.end - settings.start === 0) ? 0 : (settings.now - settings.start) / (settings.end - settings.start)
                        }
                        options.toShow[0].style[settings.prop] = (percentDone * showProps[settings.prop].value) + showProps[settings.prop].unit
                    },
                    duration: options.duration,
                    easing: options.easing,
                    complete: function () {
                        if (!options.autoHeight) {
                            options.toShow.css("height", "")
                        }
                        options.toShow.css("width", originalWidth);
                        options.toShow.css({
                            overflow: overflow
                        });
                        options.complete()
                    }
                })
            },
            bounceslide: function (options) {
                this.slide(options, {
                    easing: options.down ? "easeOutBounce" : "swing",
                    duration: options.down ? 1000 : 200
                })
            }
        }
    })
})(jQuery);
(function ($) {
    var numPages = 5;
    $.widget("ui.slider", $.ui.mouse, {
        widgetEventPrefix: "slide",
        options: {
            animate: false,
            distance: 0,
            max: 100,
            min: 0,
            orientation: "horizontal",
            range: false,
            step: 1,
            value: 0,
            values: null
        },
        _create: function () {
            var self = this,
                o = this.options;
            this._keySliding = false;
            this._mouseSliding = false;
            this._animateOff = true;
            this._handleIndex = null;
            this._detectOrientation();
            this._mouseInit();
            this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget ui-widget-content ui-corner-all");
            if (o.disabled) {
                this.element.addClass("ui-slider-disabled ui-disabled")
            }
            this.range = $([]);
            if (o.range) {
                if (o.range === true) {
                    this.range = $("<div></div>");
                    if (!o.values) {
                        o.values = [this._valueMin(), this._valueMin()]
                    }
                    if (o.values.length && o.values.length != 2) {
                        o.values = [o.values[0], o.values[0]]
                    }
                } else {
                    this.range = $("<div></div>")
                }
                this.range.appendTo(this.element).addClass("ui-slider-range");
                if (o.range == "min" || o.range == "max") {
                    this.range.addClass("ui-slider-range-" + o.range)
                }
                this.range.addClass("ui-widget-header")
            }
            if ($(".ui-slider-handle", this.element).length == 0) {
                $('<a href="#"></a>').appendTo(this.element).addClass("ui-slider-handle")
            }
            if (o.values && o.values.length) {
                while ($(".ui-slider-handle", this.element).length < o.values.length) {
                    $('<a href="#"></a>').appendTo(this.element).addClass("ui-slider-handle")
                }
            }
            this.handles = $(".ui-slider-handle", this.element).addClass("ui-state-default ui-corner-all");
            this.handle = this.handles.eq(0);
            this.handles.add(this.range).filter("a").click(function (event) {
                event.preventDefault()
            }).hover(function () {
                if (!o.disabled) {
                    $(this).addClass("ui-state-hover")
                }
            }, function () {
                $(this).removeClass("ui-state-hover")
            }).focus(function () {
                if (!o.disabled) {
                    $(".ui-slider .ui-state-focus").removeClass("ui-state-focus");
                    $(this).addClass("ui-state-focus")
                } else {
                    $(this).blur()
                }
            }).blur(function () {
                $(this).removeClass("ui-state-focus")
            });
            this.handles.each(function (i) {
                $(this).data("index.ui-slider-handle", i)
            });
            this.handles.keydown(function (event) {
                var ret = true;
                var index = $(this).data("index.ui-slider-handle");
                if (self.options.disabled) {
                    return
                }
                switch (event.keyCode) {
                case $.ui.keyCode.HOME:
                case $.ui.keyCode.END:
                case $.ui.keyCode.PAGE_UP:
                case $.ui.keyCode.PAGE_DOWN:
                case $.ui.keyCode.UP:
                case $.ui.keyCode.RIGHT:
                case $.ui.keyCode.DOWN:
                case $.ui.keyCode.LEFT:
                    ret = false;
                    if (!self._keySliding) {
                        self._keySliding = true;
                        $(this).addClass("ui-state-active");
                        self._start(event, index)
                    }
                    break
                }
                var curVal, newVal, step = self._step();
                if (self.options.values && self.options.values.length) {
                    curVal = newVal = self.values(index)
                } else {
                    curVal = newVal = self.value()
                }
                switch (event.keyCode) {
                case $.ui.keyCode.HOME:
                    newVal = self._valueMin();
                    break;
                case $.ui.keyCode.END:
                    newVal = self._valueMax();
                    break;
                case $.ui.keyCode.PAGE_UP:
                    newVal = curVal + ((self._valueMax() - self._valueMin()) / numPages);
                    break;
                case $.ui.keyCode.PAGE_DOWN:
                    newVal = curVal - ((self._valueMax() - self._valueMin()) / numPages);
                    break;
                case $.ui.keyCode.UP:
                case $.ui.keyCode.RIGHT:
                    if (curVal == self._valueMax()) {
                        return
                    }
                    newVal = curVal + step;
                    break;
                case $.ui.keyCode.DOWN:
                case $.ui.keyCode.LEFT:
                    if (curVal == self._valueMin()) {
                        return
                    }
                    newVal = curVal - step;
                    break
                }
                self._slide(event, index, newVal);
                return ret
            }).keyup(function (event) {
                var index = $(this).data("index.ui-slider-handle");
                if (self._keySliding) {
                    self._keySliding = false;
                    self._stop(event, index);
                    self._change(event, index);
                    $(this).removeClass("ui-state-active")
                }
            });
            this._refreshValue();
            this._animateOff = false
        },
        destroy: function () {
            this.handles.remove();
            this.range.remove();
            this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all").removeData("slider").unbind(".slider");
            this._mouseDestroy();
            return this
        },
        _mouseCapture: function (event) {
            var o = this.options;
            if (o.disabled) {
                return false
            }
            this.elementSize = {
                width: this.element.outerWidth(),
                height: this.element.outerHeight()
            };
            this.elementOffset = this.element.offset();
            var position = {
                x: event.pageX,
                y: event.pageY
            };
            var normValue = this._normValueFromMouse(position);
            var distance = this._valueMax() - this._valueMin() + 1,
                closestHandle;
            var self = this,
                index;
            this.handles.each(function (i) {
                var thisDistance = Math.abs(normValue - self.values(i));
                if (distance > thisDistance) {
                    distance = thisDistance;
                    closestHandle = $(this);
                    index = i
                }
            });
            if (o.range == true && this.values(1) == o.min) {
                closestHandle = $(this.handles[++index])
            }
            this._start(event, index);
            this._mouseSliding = true;
            self._handleIndex = index;
            closestHandle.addClass("ui-state-active").focus();
            var offset = closestHandle.offset();
            var mouseOverHandle = !$(event.target).parents().andSelf().is(".ui-slider-handle");
            this._clickOffset = mouseOverHandle ? {
                left: 0,
                top: 0
            } : {
                left: event.pageX - offset.left - (closestHandle.width() / 2),
                top: event.pageY - offset.top - (closestHandle.height() / 2) - (parseInt(closestHandle.css("borderTopWidth"), 10) || 0) - (parseInt(closestHandle.css("borderBottomWidth"), 10) || 0) + (parseInt(closestHandle.css("marginTop"), 10) || 0)
            };
            normValue = this._normValueFromMouse(position);
            this._slide(event, index, normValue);
            this._animateOff = true;
            return true
        },
        _mouseStart: function (event) {
            return true
        },
        _mouseDrag: function (event) {
            var position = {
                x: event.pageX,
                y: event.pageY
            };
            var normValue = this._normValueFromMouse(position);
            this._slide(event, this._handleIndex, normValue);
            return false
        },
        _mouseStop: function (event) {
            this.handles.removeClass("ui-state-active");
            this._mouseSliding = false;
            this._stop(event, this._handleIndex);
            this._change(event, this._handleIndex);
            this._handleIndex = null;
            this._clickOffset = null;
            this._animateOff = false;
            return false
        },
        _detectOrientation: function () {
            this.orientation = this.options.orientation == "vertical" ? "vertical" : "horizontal"
        },
        _normValueFromMouse: function (position) {
            var pixelTotal, pixelMouse;
            if ("horizontal" == this.orientation) {
                pixelTotal = this.elementSize.width;
                pixelMouse = position.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)
            } else {
                pixelTotal = this.elementSize.height;
                pixelMouse = position.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)
            }
            var percentMouse = (pixelMouse / pixelTotal);
            if (percentMouse > 1) {
                percentMouse = 1
            }
            if (percentMouse < 0) {
                percentMouse = 0
            }
            if ("vertical" == this.orientation) {
                percentMouse = 1 - percentMouse
            }
            var valueTotal = this._valueMax() - this._valueMin(),
                valueMouse = percentMouse * valueTotal,
                valueMouseModStep = valueMouse % this.options.step,
                normValue = this._valueMin() + valueMouse - valueMouseModStep;
            if (valueMouseModStep > (this.options.step / 2)) {
                normValue += this.options.step
            }
            return parseFloat(normValue.toFixed(5))
        },
        _start: function (event, index) {
            var uiHash = {
                handle: this.handles[index],
                value: this.value()
            };
            if (this.options.values && this.options.values.length) {
                uiHash.value = this.values(index);
                uiHash.values = this.values()
            }
            this._trigger("start", event, uiHash)
        },
        _slide: function (event, index, newVal) {
            var handle = this.handles[index];
            if (this.options.values && this.options.values.length) {
                var otherVal = this.values(index ? 0 : 1);
                if ((this.options.values.length == 2 && this.options.range === true) && ((index == 0 && newVal > otherVal) || (index == 1 && newVal < otherVal))) {
                    newVal = otherVal
                }
                if (newVal != this.values(index)) {
                    var newValues = this.values();
                    newValues[index] = newVal;
                    var allowed = this._trigger("slide", event, {
                        handle: this.handles[index],
                        value: newVal,
                        values: newValues
                    });
                    var otherVal = this.values(index ? 0 : 1);
                    if (allowed !== false) {
                        this.values(index, newVal, true)
                    }
                }
            } else {
                if (newVal != this.value()) {
                    var allowed = this._trigger("slide", event, {
                        handle: this.handles[index],
                        value: newVal
                    });
                    if (allowed !== false) {
                        this.value(newVal)
                    }
                }
            }
        },
        _stop: function (event, index) {
            var uiHash = {
                handle: this.handles[index],
                value: this.value()
            };
            if (this.options.values && this.options.values.length) {
                uiHash.value = this.values(index);
                uiHash.values = this.values()
            }
            this._trigger("stop", event, uiHash)
        },
        _change: function (event, index) {
            if (!this._keySliding && !this._mouseSliding) {
                var uiHash = {
                    handle: this.handles[index],
                    value: this.value()
                };
                if (this.options.values && this.options.values.length) {
                    uiHash.value = this.values(index);
                    uiHash.values = this.values()
                }
                this._trigger("change", event, uiHash)
            }
        },
        value: function (newValue) {
            if (arguments.length) {
                this.options.value = this._trimValue(newValue);
                this._refreshValue();
                this._change(null, 0)
            }
            return this._value()
        },
        values: function (index, newValue) {
            if (arguments.length > 1) {
                this.options.values[index] = this._trimValue(newValue);
                this._refreshValue();
                this._change(null, index)
            }
            if (arguments.length) {
                if ($.isArray(arguments[0])) {
                    var vals = this.options.values,
                        newValues = arguments[0];
                    for (var i = 0, l = vals.length; i < l; i++) {
                        vals[i] = this._trimValue(newValues[i]);
                        this._change(null, i)
                    }
                    this._refreshValue()
                } else {
                    if (this.options.values && this.options.values.length) {
                        return this._values(index)
                    } else {
                        return this.value()
                    }
                }
            } else {
                return this._values()
            }
        },
        _setOption: function (key, value) {
            var i, valsLength = 0;
            if (jQuery.isArray(this.options.values)) {
                valsLength = this.options.values.length
            }
            $.Widget.prototype._setOption.apply(this, arguments);
            switch (key) {
            case "disabled":
                if (value) {
                    this.handles.filter(".ui-state-focus").blur();
                    this.handles.removeClass("ui-state-hover");
                    this.handles.attr("disabled", "disabled");
                    this.element.addClass("ui-disabled")
                } else {
                    this.handles.removeAttr("disabled");
                    this.element.removeClass("ui-disabled")
                }
            case "orientation":
                this._detectOrientation();
                this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation);
                this._refreshValue();
                break;
            case "value":
                this._animateOff = true;
                this._refreshValue();
                this._change(null, 0);
                this._animateOff = false;
                break;
            case "values":
                this._animateOff = true;
                this._refreshValue();
                for (i = 0; i < valsLength; i++) {
                    this._change(null, i)
                }
                this._animateOff = false;
                break
            }
        },
        _step: function () {
            var step = this.options.step;
            return step
        },
        _value: function () {
            var val = this.options.value;
            val = this._trimValue(val);
            return val
        },
        _values: function (index) {
            if (arguments.length) {
                var val = this.options.values[index];
                val = this._trimValue(val);
                return val
            } else {
                var vals = this.options.values.slice();
                for (var i = 0, l = vals.length; i < l; i++) {
                    vals[i] = this._trimValue(vals[i])
                }
                return vals
            }
        },
        _trimValue: function (val) {
            if (val < this._valueMin()) {
                val = this._valueMin()
            }
            if (val > this._valueMax()) {
                val = this._valueMax()
            }
            return val
        },
        _valueMin: function () {
            var valueMin = this.options.min;
            return valueMin
        },
        _valueMax: function () {
            var valueMax = this.options.max;
            return valueMax
        },
        _refreshValue: function () {
            var oRange = this.options.range,
                o = this.options,
                self = this;
            var animate = (!this._animateOff) ? o.animate : false;
            if (this.options.values && this.options.values.length) {
                var vp0, vp1;
                this.handles.each(function (i, j) {
                    var valPercent = (self.values(i) - self._valueMin()) / (self._valueMax() - self._valueMin()) * 100;
                    var _set = {};
                    _set[self.orientation == "horizontal" ? "left" : "bottom"] = valPercent + "%";
                    $(this).stop(1, 1)[animate ? "animate" : "css"](_set, o.animate);
                    if (self.options.range === true) {
                        if (self.orientation == "horizontal") {
                            (i == 0) && self.range.stop(1, 1)[animate ? "animate" : "css"]({
                                left: valPercent + "%"
                            }, o.animate);
                            (i == 1) && self.range[animate ? "animate" : "css"]({
                                width: (valPercent - lastValPercent) + "%"
                            }, {
                                queue: false,
                                duration: o.animate
                            })
                        } else {
                            (i == 0) && self.range.stop(1, 1)[animate ? "animate" : "css"]({
                                bottom: (valPercent) + "%"
                            }, o.animate);
                            (i == 1) && self.range[animate ? "animate" : "css"]({
                                height: (valPercent - lastValPercent) + "%"
                            }, {
                                queue: false,
                                duration: o.animate
                            })
                        }
                    }
                    lastValPercent = valPercent
                })
            } else {
                var value = this.value(),
                    valueMin = this._valueMin(),
                    valueMax = this._valueMax(),
                    valPercent = valueMax != valueMin ? (value - valueMin) / (valueMax - valueMin) * 100 : 0;
                var _set = {};
                _set[self.orientation == "horizontal" ? "left" : "bottom"] = valPercent + "%";
                this.handle.stop(1, 1)[animate ? "animate" : "css"](_set, o.animate);
                (oRange == "min") && (this.orientation == "horizontal") && this.range.stop(1, 1)[animate ? "animate" : "css"]({
                    width: valPercent + "%"
                }, o.animate);
                (oRange == "max") && (this.orientation == "horizontal") && this.range[animate ? "animate" : "css"]({
                    width: (100 - valPercent) + "%"
                }, {
                    queue: false,
                    duration: o.animate
                });
                (oRange == "min") && (this.orientation == "vertical") && this.range.stop(1, 1)[animate ? "animate" : "css"]({
                    height: valPercent + "%"
                }, o.animate);
                (oRange == "max") && (this.orientation == "vertical") && this.range[animate ? "animate" : "css"]({
                    height: (100 - valPercent) + "%"
                }, {
                    queue: false,
                    duration: o.animate
                })
            }
        }
    });
    $.extend($.ui.slider, {
        version: "1.8"
    })
})(jQuery);