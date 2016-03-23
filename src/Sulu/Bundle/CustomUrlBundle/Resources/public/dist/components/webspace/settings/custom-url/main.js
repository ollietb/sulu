define(["text!./skeleton.html","services/sulucustomurl/custom-url-manager"],function(a,b){"use strict";var c={templates:{skeleton:a},translations:{title:"public.title",published:"custom-urls.activated",baseDomain:"custom-urls.base-domain",customUrl:"custom-urls.custom-url",target:"custom-urls.target",locale:"custom-urls.target-locale",canonical:"custom-urls.canonical",redirect:"custom-urls.redirect",noIndex:"custom-urls.no-index",noFollow:"custom-urls.no-follow",successLabel:"labels.success",successMessage:"labels.success.save-desc",created:"public.created",creator:"public.creator",changed:"public.changed",changer:"public.changer",targetTitle:"custom-urls.target-title",noTarget:"custom-urls.no-target"}};return{defaults:c,tabOptions:{title:function(){return this.data.title}},layout:{content:{width:"max",leftSpace:!0,rightSpace:!0}},initialize:function(){this.render()},render:function(){this.html(this.templates.skeleton()),this.startDatagrid()},startDatagrid:function(){this.sandbox.start([{name:"list-toolbar@suluadmin",options:{el:"#webspace-custom-url-list-toolbar",instanceName:"custom-url",hasSearch:!1,template:this.sandbox.sulu.buttons.get({add:{options:{callback:this.edit.bind(this)}},deleteSelected:{options:{callback:this.del.bind(this)}}})}},{name:"datagrid@husky",options:{el:"#webspace-custom-url-list",url:b.generateUrl(this.data,null,null),resultKey:"custom-urls",actionCallback:this.edit.bind(this),pagination:"infinite-scroll",idKey:"uuid",viewOptions:{table:{actionIconColumn:"title"}},matchings:[{attribute:"title",name:"title",content:this.translations.title},{attribute:"published",name:"published",content:this.translations.published,type:"checkbox_readonly"},{attribute:"customUrl",name:"customUrl",content:this.translations.customUrl},{attribute:"targetTitle",name:"targetTitle",content:this.translations.targetTitle,type:function(a){return""===a?this.translations.noTarget:a}.bind(this)},{attribute:"changed",name:"changed",content:this.translations.changed,type:"datetime"},{attribute:"changerFullName",name:"changerFullName",content:this.translations.changer},{attribute:"created",name:"created",content:this.translations.created,type:"datetime"},{attribute:"creatorFullName",name:"creatorFullName",content:this.translations.creator}]}}])},edit:function(a){this.sandbox.start([{name:"webspace/settings/custom-url/overlay@sulucustomurl",options:{el:"#webspace-custom-url-form-overlay",id:a,webspace:this.data,saveCallback:this.save.bind(this),translations:this.translations}}])},del:function(){var a=this.sandbox.util.deepCopy($("#webspace-custom-url-list").data("selected"));this.sandbox.sulu.showDeleteDialog(function(c){c&&b.del(a,this.data).then(function(){for(var b=0,c=a.length;c>b;b++){var d=a[b];this.sandbox.emit("husky.datagrid.record.remove",d)}}.bind(this))}.bind(this))},save:function(a,c){return b.save(a,c,this.data).then(function(b){var c="husky.datagrid.record.add";a&&(c="husky.datagrid.records.change"),this.sandbox.emit(c,b),this.sandbox.emit("sulu.labels.success.show",this.translations.successMessage,this.translations.successLabel)}.bind(this))},loadComponentData:function(){var a=this.sandbox.data.deferred();return a.resolve(this.options.data()),a.promise()}}});