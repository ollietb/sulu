define(["type/default"],function(a){"use strict";return function(b,c){var d={},e={initializeSub:function(){App.off("husky.datagrid."+this.options.instanceName+".item.select"),App.off("husky.datagrid."+this.options.instanceName+".item.deselect"),App.on("husky.datagrid."+this.options.instanceName+".item.select",this.itemHandler.bind(this)),App.on("husky.datagrid."+this.options.instanceName+".item.deselect",this.itemHandler.bind(this))},itemHandler:function(){App.emit("sulu.preview.update",b,this.getValue()),App.emit("sulu.content.changed")},setValue:function(a){a=a.map(function(a){return a.id?a.id:a}),App.dom.data(b,"selected",a)},getValue:function(){return App.dom.data(b,"selected")},needsValidation:function(){return!1},validate:function(){return!0}};return new a(b,d,c,"categoryList",e)}});