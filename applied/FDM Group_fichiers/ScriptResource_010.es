﻿function openPopover(o){if(void 0===o||void 0===o.opener)throw new Error("openPopover requires an `opts` argument with an `opener` property");void 0!==window.popover?$Eploy(window.popover.opener)[0]!==$Eploy(o.opener)[0]?(window.popover._Close(),window.popover=new Popover(o),window.popover._Init()):window.popover._Close():(window.popover=new Popover(o),window.popover._Init())}function updatePopoverContent(o){void 0!==window.popover&&window.popover.Update(o)}function popoverClose(){void 0!==window.popover?window.popover._Close():void 0!==window.parent.popover&&window.parent.popover._Close()}function popoverPostSave(o){void 0!==window.parent.popover&&window.parent.popover._PostSave(o)}function popoverPreSave(){void 0!==window.parent.popover&&window.parent.popover._PreSave()}function popoverResize(o){void 0!==window.popover?window.popover._resize(o):void 0!==window.parent.popover&&window.parent.popover._resize(o)}function popoverUndoTrapFocus(){void 0!==window.popover?window.popover._UndoTrapFocus():void 0!==window.parent.popover&&window.parent.popover._UndoTrapFocus()}function Popover(o){this.opener=o.opener,this.opts=o,this.type=o.type||"html",this.content=o.content,this.afterClose=o.afterClose,this.width=o.width||"300px",this.height=o.height,this.maxHeight=o.maxHeight,this.zindex=o.zindex,this.transition=o.transition||"",this.$popover=null,this.$iframe=null,this.$container=null,this.appendToDiv=o.appendToDiv,this.ignoreScrollableParent=o.ignoreScrollableParent||!1,this.$parent=null,this.postSave=o.postSave}Popover.prototype._addEvents=function(){$Eploy("body").on("click.popoverClose",function(o){0===$Eploy(o.target).closest(this.$popover).length&&($Eploy(this.opener).is(o.target)||0!==$Eploy(this.opener).has(o.target).length||0===$Eploy(o.target).parents(".its-c-menu").length&&(this._UndoTrapFocus(),this._Close()))}.bind(this)),"html"==this.type&&ITSTrapFocus($Eploy("#Popover"),{namespace:"popover",onESC:function(){popoverUndoTrapFocus(),popoverClose()}})},Popover.prototype._removeEvents=function(){$Eploy("body").off("click.popoverClose"),"iframe"==this.type&&(this.$iframe.off("load.popoverLoad"),ITSTrapFocusUndo($Eploy(this.$iframe.contents().find("html")),{namespace:"popover"}))},Popover.prototype._Close=function(){this._removeEvents(),"html"==this.type&&($Eploy(this.content).appendTo(this.$parent),$Eploy(this.content).hide()),$Eploy(this.$popover).remove(),$Eploy(this.opener).removeClass("is-active"),window.popover=void 0,this.afterClose&&"function"==typeof this.afterClose&&this.afterClose()},Popover.prototype._UndoTrapFocus=function(){ITSTrapFocusUndo($Eploy("#Popover"),{namespace:"popover"}),$Eploy(this.opener).focus()},Popover.prototype._PostSave=function(o){this.postSave&&"function"==typeof this.postSave&&this.postSave(this.opener,o),this._UndoTrapFocus(),this._Close()},Popover.prototype._PreSave=function(){this.$popover.hide()},Popover.prototype._Render=function(){this.$popover=$Eploy('<div id="Popover" class="its-c-popover  its-c-popover--border">'),this.$popover.css("width",this.width),""!==this.zindex&&this.$popover.css("z-index",this.zindex),"iframe"==this.type?(this.$container=$Eploy('<div class="its-c-popover__container  its-c-loader">'),this.$iframe=$Eploy('<iframe src="'+this.content+'" class="its-c-popover__iframe" style="height:0;">'),this.$container.append(this.$iframe)):"ajax"==this.type?this._DrawAjaxPopover():(this.$container=$Eploy('<div class="its-c-popover__container">'),this.$parent=$Eploy(this.content).parent(),$Eploy(this.content).show(),$Eploy(this.content).appendTo(this.$container)),$Eploy(this.opener).addClass("is-active"),this.$popover.append(this.$container),""!==this.transition&&this.$popover.addClass("is-animated"),$Eploy("#Popover").length||(void 0!==this.appendToDiv&&$Eploy(this.appendToDiv).length?($Eploy(this.appendToDiv).append(this.$popover),""!==this.transition&&$Eploy("#Popover").addClass(this.transition)):($Eploy("body").append(this.$popover),""!==this.transition&&$Eploy("#Popover").addClass(this.transition))),this.$popover.on("eploy:tabs:changed",".js-tab-link",function(){popoverUndoTrapFocus(),ITSTrapFocus($Eploy("#Popover"),{namespace:"popover",onESC:function(){popoverUndoTrapFocus(),popoverClose()}})}.bind(this)),this._setPosition()},Popover.prototype._DrawAjaxPopover=function(){var o=this;o.$container=$Eploy('<div class="its-c-popover__container its-c-loader">'),$Eploy.ajax({type:"POST",url:o.opts.ajaxUrl,data:JSON.stringify(o.opts.controlData),contentType:"application/json; charset=utf-8",dataType:"json"}).done((function(e){void 0!==o.maxHeight&&o.$popover.css({"max-height":o.maxHeight,"overflow-y":"auto"}),o.$container.append(e.d),o.$container.removeClass("its-c-loader"),o._setPosition(),ITSTrapFocus($Eploy("#Popover"),{namespace:"popover",onESC:function(){popoverUndoTrapFocus(),popoverClose()}})})).fail((function(o){console.error(o)}))},Popover.prototype._setPosition=function(){const o=new PositioningHandlers({reset:function(o){o.css({top:""}),o.css({left:""})},showBelow:function(o,e,t){o.offset({top:t.offset.top+t.height})},showAbove:function(o,e,t){o.offset({top:t.offset.top+t.height-(e.height+t.height)})},showLeft:function(o,e,t){o.offset({left:t.offset.left-(e.width-t.width)})},showRight:function(o,e,t){o.offset({left:t.offset.left})},showSmallerWidth:function(o,e,t,i){},showSmaller:function(o,e,t,i){}});new ContentPositioner(this.$popover,$Eploy(this.opener),o,{ignoreScrollableParent:this.ignoreScrollableParent,supportsSmaller:!1}).setPosition(),this.$popover.css("display","inline-block")},Popover.prototype._setIframeSize=function(){this.$iframe.on("load.popoverLoad",function(o){var e=this.$iframe.contents().find("html");e.find(".js-popcontainer").css("visibility","visible"),void 0===this.height?this.$popover.css("height",e.outerHeight()+"px"):this.$popover.css("height",this.height),this.$iframe.css("height","100%"),this.$container.removeClass("its-c-loader"),this.$popover.removeClass("its-c-popover--border"),this._setPosition(),ITSTrapFocus($Eploy(e),{namespace:"popover",iframe:!0,onESC:function(){popoverUndoTrapFocus(),popoverClose()}})}.bind(this))},Popover.prototype._resize=function(o){if(void 0===o&&(o=!0),void 0!==this.type&&"iframe"==this.type){var e=this.$iframe.contents().find("html");void 0===this.height?this.$popover.css("height",e.outerHeight()+"px"):this.$popover.css("height",this.height),1==o&&this._setPosition()}},Popover.prototype._Init=function(){try{if(void 0===this.type)throw new Error("Nothing to open!");this._Render(),this._setPosition(),this._addEvents(),"iframe"==this.type&&this._setIframeSize()}catch(o){console.error(o)}};