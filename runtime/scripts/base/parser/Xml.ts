/*
 Copyright 2011-2013 Abdulla Abdurakhmanov
 Original sources are available at https://code.google.com/p/x2js/
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at
 http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.

 https://github.com/abdolence/x2js

 */

let DOMNodeTypes = {
    ELEMENT_NODE: 1,
    TEXT_NODE: 3,
    CDATA_SECTION_NODE: 4,
    COMMENT_NODE: 8,
    DOCUMENT_NODE: 9
};

/**
 *
x2js - XML to JSON and vice versa for JavaScript

This library provides XML to JSON (JavaScript Objects) and vice versa javascript conversion functions. The library is very small and has no any dependencies.
API functions
new X2JS() - to create your own instance to access all library functionality
new X2JS(config) - to create your own instance with additional config
<instance>.xml2json - Convert XML specified as DOM Object to JSON
<instance>.json2xml - Convert JSON to XML DOM Object
<instance>.xml_str2json - Convert XML specified as string to JSON
<instance>.json2xml_str - Convert JSON to XML string
<instance>.asArray - Utility function to work with a JSON field always in array form
<instance>.asDateTime - Utility function to convert the specified parameter from XML DateTime to JS Date
<instance>.asXmlDateTime - Utility function to convert the specified parameter to XML DateTime from JS Date or timestamp
 */
export class UXml {
    VERSION: string = "1.2.0";
    config: any = {
        escapeMode: undefined,
        attributePrefix: undefined,
        arrayAccessForm: undefined,
        emptyNodeForm: undefined,
        enableToStringFunc: undefined,
        arrayAccessFormPaths: undefined,
        skipEmptyTextNodesForObj: undefined,
        stripWhitespaces: undefined,
        datetimeAccessFormPaths: undefined,
        useDoubleQuotes: undefined,
        xmlElementsFilter: undefined,
        jsonPropertiesFilter: undefined,
        keepCData: undefined,
    };

    /**
     * @param config
            .escapeMode : true|false - Escaping XML characters. Default is true from v1.1.0+
            .attributePrefix : "<string>" - Prefix for XML attributes in JSon model. Default is "_"
            .arrayAccessForm : "none"|"property" - The array access form (none|property). Use this property if you want X2JS generates additional property _asArray to access in array form for any XML element. Default is none from v1.1.0+
            .emptyNodeForm : "text"|"object" - Handling empty nodes (text|object) mode. When X2JS found empty node like it will be transformed to test : '' for 'text' mode, or to Object for 'object' mode. Default is 'text'
            .enableToStringFunc : true|false - Enable/disable an auxiliary function in generated JSON objects to print text nodes with text/cdata. Default is true
            .arrayAccessFormPaths : [] - Array access paths - use this option to configure paths to XML elements always in "array form". You can configure beforehand paths to all your array elements based on XSD or your knowledge. Every path could be a simple string (like 'parent.child1.child2'), a regex (like /.*.child2/), or a custom function. Default is empty
            .skipEmptyTextNodesForObj : true|false - Skip empty text tags for nodes with children. Default is true.
            .stripWhitespaces : true|false - Strip whitespaces (trimming text nodes). Default is true.
            .datetimeAccessFormPaths : [] - DateTime access paths. Use this option to configure paths to XML elements for XML datetime elements. You can configure beforehand paths to all your datetime elements based on XSD or your knowledge. Every path could be a simple string (like 'parent.child1.child2'), a regex (like /.*.child2/), or a custom function. Default is empty.
            .useDoubleQuotes : true|false - Use double quotes for output XML formatting. Default is false.
            .xmlElementsFilter : [] - Filter incoming XML elements. You can pass a stringified path (like 'parent.child1.child2'), regexp or function
            .jsonPropertiesFilter : [] - Filter JSON properties for output XML. You can pass a stringified path (like 'parent.child1.child2'), regexp or function
            .keepCData : true|false - If this property defined as false and an XML element has only CData node it will be converted to text without additional property "__cdata". Default is false.

     */
    constructor(config?: any) {
        this.config = config || {};
        this.initConfigDefaults();
        this.initRequiredPolyfills();
    }

    private initConfigDefaults() {
        if (this.config.escapeMode === undefined) {
            this.config.escapeMode = true;
        }

        this.config.attributePrefix = this.config.attributePrefix || "_";
        this.config.arrayAccessForm = this.config.arrayAccessForm || "none";
        this.config.emptyNodeForm = this.config.emptyNodeForm || "text";

        if (this.config.enableToStringFunc === undefined) {
            this.config.enableToStringFunc = true;
        }

        this.config.arrayAccessFormPaths = this.config.arrayAccessFormPaths || [];

        if (this.config.skipEmptyTextNodesForObj === undefined) {
            this.config.skipEmptyTextNodesForObj = true;
        }

        if (this.config.stripWhitespaces === undefined) {
            this.config.stripWhitespaces = true;
        }

        this.config.datetimeAccessFormPaths = this.config.datetimeAccessFormPaths || [];

        if (this.config.useDoubleQuotes === undefined) {
            this.config.useDoubleQuotes = false;
        }

        this.config.xmlElementsFilter = this.config.xmlElementsFilter || [];
        this.config.jsonPropertiesFilter = this.config.jsonPropertiesFilter || [];

        if (this.config.keepCData === undefined) {
            this.config.keepCData = false;
        }
    }

    private initRequiredPolyfills() {

    }

    private getNodeLocalName(node) {
        let nodeLocalName = node.localName;
        if (nodeLocalName == null) // Yeah, this is IE!!
            nodeLocalName = node.baseName;
        if (nodeLocalName == null || nodeLocalName == "") // =="" is IE too
            nodeLocalName = node.nodeName;
        return nodeLocalName;
    }

    private getNodePrefix(node) {
        return node.prefix;
    }

    private escapeXmlChars(str) {
        if (typeof (str) == "string")
            return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
        else
            return str;
    }

    private unescapeXmlChars(str) {
        return str.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&amp;/g, '&');
    }

    private checkInStdFiltersArrayForm(stdFiltersArrayForm, obj, name, path) {
        let idx = 0;
        for (; idx < stdFiltersArrayForm.length; idx++) {
            let filterPath = stdFiltersArrayForm[idx];
            if (typeof filterPath === "string") {
                if (filterPath == path)
                    break;
            }
            else
                if (filterPath instanceof RegExp) {
                    if (filterPath.test(path))
                        break;
                }
                else
                    if (typeof filterPath === "function") {
                        if (filterPath(obj, name, path))
                            break;
                    }
        }
        return idx != stdFiltersArrayForm.length;
    }

    private toArrayAccessForm(obj, childName, path) {
        switch (this.config.arrayAccessForm) {
            case "property":
                if (!(obj[childName] instanceof Array))
                    obj[childName + "_asArray"] = [obj[childName]];
                else
                    obj[childName + "_asArray"] = obj[childName];
                break;
            /*case "none":
                break;*/
        }

        if (!(obj[childName] instanceof Array) && this.config.arrayAccessFormPaths.length > 0) {
            if (this.checkInStdFiltersArrayForm(this.config.arrayAccessFormPaths, obj, childName, path)) {
                obj[childName] = [obj[childName]];
            }
        }
    }

    private fromXmlDateTime(prop) {
        // Implementation based up on http://stackoverflow.com/questions/8178598/xml-datetime-to-javascript-date-object
        // Improved to support full spec and optional parts
        var bits = prop.split(/[-T:+Z]/g);

        var d = new Date(bits[0], bits[1] - 1, bits[2]);
        var secondBits = bits[5].split("\.");
        d.setHours(bits[3], bits[4], secondBits[0]);
        if (secondBits.length > 1)
            d.setMilliseconds(secondBits[1]);

        // Get supplied time zone offset in minutes
        if (bits[6] && bits[7]) {
            var offsetMinutes = bits[6] * 60 + Number(bits[7]);
            var sign = /\d\d-\d\d:\d\d$/.test(prop) ? '-' : '+';

            // Apply the sign
            offsetMinutes = 0 + (sign == '-' ? -1 * offsetMinutes : offsetMinutes);

            // Apply offset and local timezone
            d.setMinutes(d.getMinutes() - offsetMinutes - d.getTimezoneOffset())
        }
        else
            if (prop.indexOf("Z", prop.length - 1) !== -1) {
                d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds()));
            }

        // d is now a local time equivalent to the supplied time
        return d;
    }

    private checkFromXmlDateTimePaths(value, childName, fullPath) {
        if (this.config.datetimeAccessFormPaths.length > 0) {
            var path = fullPath.split("\.#")[0];
            if (this.checkInStdFiltersArrayForm(this.config.datetimeAccessFormPaths, value, childName, path)) {
                return this.fromXmlDateTime(value);
            }
            else
                return value;
        }
        else
            return value;
    }

    private checkXmlElementsFilter(obj, childType, childName, childPath) {
        if (childType == DOMNodeTypes.ELEMENT_NODE && this.config.xmlElementsFilter.length > 0) {
            return this.checkInStdFiltersArrayForm(this.config.xmlElementsFilter, obj, childName, childPath);
        }
        else
            return true;
    }

    private parseDOMChildren(node, path?) {
        if (node.nodeType == DOMNodeTypes.DOCUMENT_NODE) {
            var result = new Object;
            var nodeChildren = node.childNodes;
            // Alternative for firstElementChild which is not supported in some environments
            for (var cidx = 0; cidx < nodeChildren.length; cidx++) {
                var child = nodeChildren.item(cidx);
                if (child.nodeType == DOMNodeTypes.ELEMENT_NODE) {
                    var childName = this.getNodeLocalName(child);
                    result[childName] = this.parseDOMChildren(child, childName);
                }
            }
            return result;
        }
        else
            if (node.nodeType == DOMNodeTypes.ELEMENT_NODE) {
                let result: any = {};
                result.__cnt = 0;

                var nodeChildren = node.childNodes;

                // Children nodes
                for (var cidx = 0; cidx < nodeChildren.length; cidx++) {
                    var child = nodeChildren.item(cidx); // nodeChildren[cidx];
                    var childName = this.getNodeLocalName(child);

                    if (child.nodeType != DOMNodeTypes.COMMENT_NODE) {
                        var childPath = path + "." + childName;
                        if (this.checkXmlElementsFilter(result, child.nodeType, childName, childPath)) {
                            result.__cnt++;
                            if (result[childName] == null) {
                                result[childName] = this.parseDOMChildren(child, childPath);
                                this.toArrayAccessForm(result, childName, childPath);
                            }
                            else {
                                if (result[childName] != null) {
                                    if (!(result[childName] instanceof Array)) {
                                        result[childName] = [result[childName]];
                                        this.toArrayAccessForm(result, childName, childPath);
                                    }
                                }
                                (result[childName])[result[childName].length] = this.parseDOMChildren(child, childPath);
                            }
                        }
                    }
                }

                // Attributes
                for (var aidx = 0; aidx < node.attributes.length; aidx++) {
                    var attr = node.attributes.item(aidx); // [aidx];
                    result.__cnt++;
                    result[this.config.attributePrefix + attr.name] = attr.value;
                }

                // Node namespace prefix
                var nodePrefix = this.getNodePrefix(node);
                if (nodePrefix != null && nodePrefix != "") {
                    result.__cnt++;
                    result.__prefix = nodePrefix;
                }

                if (result["#text"] != null) {
                    result.__text = result["#text"];
                    if (result.__text instanceof Array) {
                        result.__text = result.__text.join("\n");
                    }
                    //if(config.escapeMode)
                    //	result.__text = unescapeXmlChars(result.__text);
                    if (this.config.stripWhitespaces)
                        result.__text = result.__text.trim();
                    delete result["#text"];
                    if (this.config.arrayAccessForm == "property")
                        delete result["#text_asArray"];
                    result.__text = this.checkFromXmlDateTimePaths(result.__text, childName, path + "." + childName);
                }
                if (result["#cdata-section"] != null) {
                    result.__cdata = result["#cdata-section"];
                    delete result["#cdata-section"];
                    if (this.config.arrayAccessForm == "property")
                        delete result["#cdata-section_asArray"];
                }

                if (result.__cnt == 0 && this.config.emptyNodeForm == "text") {
                    result = '';
                }
                else
                    if (result.__cnt == 1 && result.__text != null) {
                        result = result.__text;
                    }
                    else
                        if (result.__cnt == 1 && result.__cdata != null && !this.config.keepCData) {
                            result = result.__cdata;
                        }
                        else
                            if (result.__cnt > 1 && result.__text != null && this.config.skipEmptyTextNodesForObj) {
                                if ((this.config.stripWhitespaces && result.__text == "") || (result.__text.trim() == "")) {
                                    delete result.__text;
                                }
                            }
                delete result.__cnt;

                if (this.config.enableToStringFunc && (result.__text != null || result.__cdata != null)) {
                    result.toString = function () {
                        return (this.__text != null ? this.__text : '') + (this.__cdata != null ? this.__cdata : '');
                    };
                }

                return result;
            }
            else
                if (node.nodeType == DOMNodeTypes.TEXT_NODE || node.nodeType == DOMNodeTypes.CDATA_SECTION_NODE) {
                    return node.nodeValue;
                }
    }

    private startTag(jsonObj, element, attrList, closed) {
        var resultStr = "<" + ((jsonObj != null && jsonObj.__prefix != null) ? (jsonObj.__prefix + ":") : "") + element;
        if (attrList != null) {
            for (var aidx = 0; aidx < attrList.length; aidx++) {
                var attrName = attrList[aidx];
                var attrVal = jsonObj[attrName];
                if (this.config.escapeMode)
                    attrVal = this.escapeXmlChars(attrVal);
                resultStr += " " + attrName.substr(this.config.attributePrefix.length) + "=";
                if (this.config.useDoubleQuotes)
                    resultStr += '"' + attrVal + '"';
                else
                    resultStr += "'" + attrVal + "'";
            }
        }
        if (!closed)
            resultStr += ">";
        else
            resultStr += "/>";
        return resultStr;
    }

    private endTag(jsonObj, elementName) {
        return "</" + (jsonObj.__prefix != null ? (jsonObj.__prefix + ":") : "") + elementName + ">";
    }

    private endsWith(str, suffix) {
        return str.indexOf(suffix, str.length - suffix.length) !== -1;
    }

    private jsonXmlSpecialElem(jsonObj, jsonObjField) {
        if ((this.config.arrayAccessForm == "property" && this.endsWith(jsonObjField.toString(), ("_asArray")))
            || jsonObjField.toString().indexOf(this.config.attributePrefix) == 0
            || jsonObjField.toString().indexOf("__") == 0
            || (jsonObj[jsonObjField] instanceof Function))
            return true;
        else
            return false;
    }

    private jsonXmlElemCount(jsonObj) {
        var elementsCnt = 0;
        if (jsonObj instanceof Object) {
            for (var it in jsonObj) {
                if (this.jsonXmlSpecialElem(jsonObj, it))
                    continue;
                elementsCnt++;
            }
        }
        return elementsCnt;
    }

    private checkJsonObjPropertiesFilter(jsonObj, propertyName, jsonObjPath) {
        return this.config.jsonPropertiesFilter.length == 0
            || jsonObjPath == ""
            || this.checkInStdFiltersArrayForm(this.config.jsonPropertiesFilter, jsonObj, propertyName, jsonObjPath);
    }

    private parseJSONAttributes(jsonObj) {
        var attrList = [];
        if (jsonObj instanceof Object) {
            for (var ait in jsonObj) {
                if (ait.toString().indexOf("__") == -1 && ait.toString().indexOf(this.config.attributePrefix) == 0) {
                    attrList.push(ait);
                }
            }
        }
        return attrList;
    }

    private parseJSONTextAttrs(jsonTxtObj) {
        var result = "";

        if (jsonTxtObj.__cdata != null) {
            result += "<![CDATA[" + jsonTxtObj.__cdata + "]]>";
        }

        if (jsonTxtObj.__text != null) {
            if (this.config.escapeMode)
                result += this.escapeXmlChars(jsonTxtObj.__text);
            else
                result += jsonTxtObj.__text;
        }
        return result;
    }

    private parseJSONTextObject(jsonTxtObj) {
        var result = "";

        if (jsonTxtObj instanceof Object) {
            result += this.parseJSONTextAttrs(jsonTxtObj);
        }
        else
            if (jsonTxtObj != null) {
                if (this.config.escapeMode)
                    result += this.escapeXmlChars(jsonTxtObj);
                else
                    result += jsonTxtObj;
            }

        return result;
    }

    private getJsonPropertyPath(jsonObjPath, jsonPropName) {
        if (jsonObjPath === "") {
            return jsonPropName;
        }
        else
            return jsonObjPath + "." + jsonPropName;
    }

    private parseJSONArray(jsonArrRoot, jsonArrObj, attrList, jsonObjPath) {
        var result = "";
        if (jsonArrRoot.length == 0) {
            result += this.startTag(jsonArrRoot, jsonArrObj, attrList, true);
        }
        else {
            for (var arIdx = 0; arIdx < jsonArrRoot.length; arIdx++) {
                result += this.startTag(jsonArrRoot[arIdx], jsonArrObj, this.parseJSONAttributes(jsonArrRoot[arIdx]), false);
                result += this.parseJSONObject(jsonArrRoot[arIdx], this.getJsonPropertyPath(jsonObjPath, jsonArrObj));
                result += this.endTag(jsonArrRoot[arIdx], jsonArrObj);
            }
        }
        return result;
    }

    private parseJSONObject(jsonObj, jsonObjPath) {
        var result = "";

        var elementsCnt = this.jsonXmlElemCount(jsonObj);

        if (elementsCnt > 0) {
            for (var it in jsonObj) {

                if (this.jsonXmlSpecialElem(jsonObj, it) || (jsonObjPath != "" && !this.checkJsonObjPropertiesFilter(jsonObj, it, this.getJsonPropertyPath(jsonObjPath, it))))
                    continue;

                var subObj = jsonObj[it];

                var attrList = this.parseJSONAttributes(subObj)

                if (subObj == null || subObj == undefined) {
                    result += this.startTag(subObj, it, attrList, true);
                }
                else
                    if (subObj instanceof Object) {

                        if (subObj instanceof Array) {
                            result += this.parseJSONArray(subObj, it, attrList, jsonObjPath);
                        }
                        else if (subObj instanceof Date) {
                            result += this.startTag(subObj, it, attrList, false);
                            result += subObj.toISOString();
                            result += this.endTag(subObj, it);
                        }
                        else {
                            var subObjElementsCnt = this.jsonXmlElemCount(subObj);
                            if (subObjElementsCnt > 0 || subObj.__text != null || subObj.__cdata != null) {
                                result += this.startTag(subObj, it, attrList, false);
                                result += this.parseJSONObject(subObj, this.getJsonPropertyPath(jsonObjPath, it));
                                result += this.endTag(subObj, it);
                            }
                            else {
                                result += this.startTag(subObj, it, attrList, true);
                            }
                        }
                    }
                    else {
                        result += this.startTag(subObj, it, attrList, false);
                        result += this.parseJSONTextObject(subObj);
                        result += this.endTag(subObj, it);
                    }
            }
        }
        result += this.parseJSONTextObject(jsonObj);

        return result;
    }

    public parseXmlString(xmlDocStr) {
        var isIEParser = window.ActiveXObject || "ActiveXObject" in window;
        if (xmlDocStr === undefined) {
            return null;
        }
        var xmlDoc;
        if (window.DOMParser) {
            var parser = new window.DOMParser();
            var parsererrorNS = null;
            // IE9+ now is here
            if (!isIEParser) {
                try {
                    parsererrorNS = parser.parseFromString("INVALID", "text/xml").getElementsByTagName("parsererror")[0].namespaceURI;
                }
                catch (err) {
                    parsererrorNS = null;
                }
            }
            try {
                xmlDoc = parser.parseFromString(xmlDocStr, "text/xml");
                if (parsererrorNS != null && xmlDoc.getElementsByTagNameNS(parsererrorNS, "parsererror").length > 0) {
                    //throw new Error('Error parsing XML: '+xmlDocStr);
                    xmlDoc = null;
                }
            }
            catch (err) {
                xmlDoc = null;
            }
        }
        else {
            // IE :(
            if (xmlDocStr.indexOf("<?") == 0) {
                xmlDocStr = xmlDocStr.substr(xmlDocStr.indexOf("?>") + 2);
            }
            xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
            xmlDoc.async = "false";
            xmlDoc.loadXML(xmlDocStr);
        }
        return xmlDoc;
    };

    public asArray(prop) {
        if (prop === undefined || prop == null)
            return [];
        else
            if (prop instanceof Array)
                return prop;
            else
                return [prop];
    };

    public toXmlDateTime(dt) {
        if (dt instanceof Date)
            return dt.toISOString();
        else
            if (typeof (dt) === 'number')
                return new Date(dt).toISOString();
            else
                return null;
    };

    public asDateTime(prop) {
        if (typeof (prop) == "string") {
            return this.fromXmlDateTime(prop);
        }
        else
            return prop;
    };

    public xml2json(xmlDoc) {
        return this.parseDOMChildren(xmlDoc);
    };

    public xml_str2json(xmlDocStr) {
        var xmlDoc = this.parseXmlString(xmlDocStr);
        if (xmlDoc != null)
            return this.xml2json(xmlDoc);
        else
            return null;
    };

    public json2xml_str(jsonObj) {
        return this.parseJSONObject(jsonObj, "");
    };

    public json2xml(jsonObj) {
        var xmlDocStr = this.json2xml_str(jsonObj);
        return this.parseXmlString(xmlDocStr);
    }

    public getVersion() {
        return this.VERSION;
    }
}

import { Test } from "../core/Test";
Test.test("UXml", [
    () => {
        // Basic Usage
        // XML to JSON
        // Create x2js instance with default config
        let x2js1 = new UXml();
        let xmlText1 = "<MyRoot><test>Success</test><test2><item>val1</item><item>val2</item></test2></MyRoot>";
        let jsonObj1 = x2js1.xml_str2json(xmlText1);
        console.log("jsonObj1:", jsonObj1);
    },
    () => {
        // JSON to XML
        // Create x2js instance with default config
        let x2js2 = new UXml();
        let jsonObj2 = {
            MyRoot: {
                test: 'success',
                test2: {
                    item: ['val1', 'val2']
                }
            }
        };
        let xmlAsStr2 = x2js2.json2xml_str(jsonObj2);
        console.log("xmlAsStr2:", xmlAsStr2);
    },
    () => {
        // Working with arrays
        // Configure XML structure knowledge beforehand
        let x2js3 = new UXml({
            arrayAccessFormPaths: [
                "MyArrays.test.item"
            ]
        });
        let xmlText3 =
            "<MyArrays>" +
            "<test>" +
            "<item>success</item>" +
            "<item>second</item>" +
            "</test>" +
            "</MyArrays>";

        let jsonObj3 = x2js3.xml_str2json(xmlText3);
        console.log(jsonObj3.MyArrays.test.item[0]);
    },
    () => {
        // Or using the utility function
        let x2js4 = new UXml();
        let xmlText4 = "<MyArrays>" +
            "<test><item>success</item><item>second</item></test>" +
            "</MyArrays>";
        let jsonObj4 = x2js4.xml_str2json(xmlText4);
        console.log(x2js4.asArray(jsonObj4.MyArrays.test.item)[0]);
    },
    () => {
        // Working with XML attributes
        // Accessing to XML attributes
        // Create x2js instance with default config
        let x2js5 = new UXml();
        let xmlText5 = "<MyOperation myAttr='SuccessAttrValue'>MyText</MyOperation>";
        let jsonObj5 = x2js5.xml_str2json(xmlText5);
        // Access to attribute
        console.log(jsonObj5.MyOperation._myAttr);
        // Access to text
        console.log(jsonObj5.MyOperation.__text);
        // Or
        console.log(jsonObj5.MyOperation.toString());
    },
    () => {
        // Configuring a custom prefix to attributes
        let x2js6 = new UXml({
            attributePrefix: "$"
        });
        let xmlText6 = "<MyOperation myAttr='SuccessAttrValue'>MyText</MyOperation>";
        let jsonObj6 = x2js6.xml_str2json(xmlText6);
        // Access to attribute
        console.log(jsonObj6.MyOperation.$myAttr);
    },
    () => {
        // Working with XML namespaces
        // Parsing XML with namespaces
        let x2js7 = new UXml({
            attributePrefix: "$"
        });
        let xmlText7 = "<testns:MyOperation xmlns:testns='http://www.example.org'>" +
            "<test>Success</test><test2 myAttr='SuccessAttrValueTest2'>" +
            "<item>ddsfg</item><item>dsdgfdgfd</item><item2>testArrSize</item2></test2></testns:MyOperation>";

        let jsonObj7 = x2js7.xml_str2json(xmlText7);
        console.log(jsonObj7.MyOperation.test);
    },
    () => {
        // Creating JSON (for XML) with namespaces (Option 1)
        let x2js8 = new UXml({
            attributePrefix: "$"
        });
        let testObjC8 = {
            'm:TestAttrRoot': {
                '_tns:m': 'http://www.example.org',
                '_tns:cms': 'http://www.example.org',
                MyChild: 'my_child_value',
                'cms:MyAnotherChild': 'vdfd'
            }
        }
        let xmlDocStr8 = x2js8.json2xml_str(
            testObjC8
        );
        console.log("xmlDocStr", xmlDocStr8);
    },
    () => {
        // Creating JSON (for XML) with namespaces (Option 2)
        // Parse JSON object constructed with another NS-style
        let x2js9 = new UXml({
            attributePrefix: "$"
        });
        let testObjNew9 = {
            TestAttrRoot: {
                __prefix: 'm',
                '_tns:m': 'http://www.example.org',
                '_tns:cms': 'http://www.example.org',
                MyChild: 'my_child_value',
                MyAnotherChild: {
                    __prefix: 'cms',
                    __text: 'vdfd'
                }
            }
        }
        let xmlDocStr9 = x2js9.json2xml_str(testObjNew9);
        console.log("xmlDocStr9:", xmlDocStr9);
    },
    () => {
        // Working with XML DateTime
        // Configuring it beforehand
        let x2js10 = new UXml({
            datetimeAccessFormPaths: [
                "MyDts.testds" /* Configure it beforehand */
            ]
        });
        let xmlText10 = "<MyDts>" +
            "<testds>2002-10-10T12:00:00+04:00</testds>" +
            "</MyDts>";
        let jsonObj10 = x2js10.xml_str2json(xmlText10);
        console.log("jsonObj10:", jsonObj10);

        // Or using the utility function
        let x2js11 = new UXml();
        let xmlText11 = "<MyDts>" +
            "<testds>2002-10-10T12:00:00+04:00</testds>" +
            "</MyDts>";
        let jsonObj11 = x2js11.xml_str2json(xmlText11);
        console.log(x2js11.asDateTime(jsonObj11.MyDts.testds));

        // Networking samples
        // Parsing AJAX XML response (JQuery sample)
        // $.ajax({
        //     type: "GET",
        //     url: "/test",
        //     dataType: "xml",
        //     success: function(xmlDoc) {
        //         let x2js = new UXml();
        //         let jsonObj = x2js.xml2json(xmlDoc);
        //     }
        // });
        // Loading XML and converting to JSON
        // function loadXMLDoc(dname) {
        //     if (window.XMLHttpRequest) {
        //         xhttp = new XMLHttpRequest();
        //     }
        //     else {
        //         xhttp = new ActiveXObject("Microsoft.XMLHTTP");
        //     }
        //     xhttp.open("GET", dname, false);
        //     xhttp.send();
        //     return xhttp.responseXML;
        // }
        // var xmlDoc = loadXMLDoc("test.xml");
        // var x2js = new UXml();
        // var jsonObj = x2js.xml2json(xmlDoc);
    }
]);
