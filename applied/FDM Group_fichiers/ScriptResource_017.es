﻿var spanWithSpacePattern="<span[^>]*>(&nbsp;| )</span>",spanWithSpace=new RegExp(spanWithSpacePattern,"ig"),spanEmptyPattern2="<span[^>]*></span>",spanEmpty=new RegExp(spanEmptyPattern2,"ig"),pSpaceOrEmptyPattern="<p[^>]*>[ ]?</p>",pSpaceOrEmpty=new RegExp(pSpaceOrEmptyPattern,"ig"),pEmptyTagsPattern="<p[^>]*><[^>]*>[ ]?</[^>]*></p>",pEmptyTags=new RegExp(pEmptyTagsPattern,"ig"),defaultFontFamily="Arial",defaultFontSize="14pt";function editor_OnClientPasteHtml(e,t){var n=t.get_commandName(),a=t.get_value();switch(n){case"Paste":a=(a=(a=(a=a.replace(spanWithSpace,"&nbsp;")).replace(spanEmpty,"")).replace(pSpaceOrEmpty,"<p>&nbsp;</p>")).replace(pEmptyTags,"<p>&nbsp;</p>")}t.set_value(a)}function editor_OnClientLoad(e,t){$Eploy(document).ready((function(){var t,n=document.all?e.get_document().body:e.get_document();$telerik.addExternalHandler(n,"click",(function(t){SetFontDropDownOnClick(e)})),e.attachEventHandler("onkeydown",(function(t){setTimeout((function(){$Eploy("#"+$Eploy("#"+e.get_id()).attr("data-hiddenfield")).val("1").trigger("change")}),0)})),"undefined"==typeof MyFilter&&(MyFilter=function(){MyFilter.initializeBase(this),this.set_isDom(!0),this.set_enabled(!0),this.set_name("RelativeHrefs"),this.set_description("Does not make the href of an a into a absolute url")},MyFilter.prototype={getHtmlContent:function(e){return $telerik.$(e).find("a").each((function(e,t){var n=$telerik.$(t).attr("data-href");n&&$telerik.$(t).removeAttr("data-href").attr("href",n)})),e},getDesignContent:function(e){return $telerik.$(e).find("a").each((function(e,t){var n=t.getAttribute("href");n&&$telerik.$(t).attr("data-href",n)})),e}},MyFilter.registerClass("MyFilter",Telerik.Web.UI.Editor.Filter)),t=Telerik.Web.UI.Editor.Utils,Telerik.Web.UI.Editor.TrackerBase.prototype.removeZeroWidthNodes=function(){for(var e=this,n=e.nodes,a=new RegExp("^["+e._zeroWidthCharacter+"]+$"),i=e.nodeValuePairs=[],r=0;r<n.length;r++){var o=n[r];if(t.isTextNode(o)&&!e._isNodeRemoved(o)){var p=o.nodeValue;if(a.test(p)){i.push({node:o,value:o.nodeValue});var l=t.getBlockParent(o),d=l&&t.isNodeEmptyRecursive(l);o.nodeValue=d?" ":""}else e.removeFirstZeroWidthChar(o)}}},e.get_filtersManager().add(new MyFilter),$Eploy("#"+e.get_id()).trigger("EditorOnReady")}))}function editor_OnClientCommandExecuted(e,t){if("function"==typeof t.get_commandName){var n=t.get_commandName();"FontName"==n?defaultFontFamily=t.get_value():"RealFontSize"==n&&(defaultFontSize=t.get_value())}}function editor_OnClientSubmit(e,t){var n=e.get_html(!0);"&nbsp;"==(n=ReplaceSpan(n))&&(n=""),n||SetEditorHTML(e,n)}function editor_OnClientSelectionChange(e,t){if(!e.get_document().queryCommandValue("FontName")){var n=$telerik.getCurrentStyle(e.getSelectedElement(),"fontFamily");if(n){var a=e.getToolByName("FontName");a&&window.setTimeout((function(){a.set_value(n)}),0)}}var i=e.getToolByName("RealFontSize");i&&setTimeout((function(){var e=i.get_value();if(-1!=e.indexOf("px")){var t=Math.round(.75*parseInt(e))+"pt";i.set_value(t)}}),0)}function ReplaceSpan(e){return e=(e=(e=(e=e.replace(spanWithSpace,"&nbsp;")).replace(spanEmpty,"")).replace(pSpaceOrEmpty,"<p>&nbsp;</p>")).replace(pEmptyTags,"<p>&nbsp;</p>")}function GetEditorHTML(e){return e.get_html(!0)}function SetEditorHTML(e,t){e.set_html(t)}function PasteEditorHTML(e,t){e.pasteHtml(t)}function SetFontDropDownOnClick(e){var t=e.get_html(!0);""!=t&&(t=ReplaceSpan(t)),t||(SetEditorHTML(e,t),e.fire("FontName",{value:defaultFontFamily}),e.fire("RealFontSize",{value:defaultFontSize}))}