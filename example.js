var $ = require('NodObjC');

$.framework('Foundation');
$.framework('ScriptingBridge');
$.framework('AppKit');

// Setup the recommended NSAutoreleasePool instance
var pool = $.NSAutoreleasePool('alloc')('init');

// NSStrings and JavaScript Strings are distinct objects, you must create an
// NSString from a JS String when an Objective-C class method requires one.
var string = $.NSString('stringWithUTF8String', 'com.google.Chrome');

var chrome = $.SBApplication('applicationWithBundleIdentifier', string);

chrome = chrome('windows')('objectAtIndex', 0)('tabs');

var windowCount = chrome('count');

for (var i = 0; i < windowCount; i++) {
  console.log(chrome('objectAtIndex', i)('URL'));
  console.log(chrome('objectAtIndex', i)('executeJavascript', $.NSString('stringWithUTF8String','alert("hi")')));
}

pool('drain');
