define([],function(){"use strict";var a={eventNamespace:"sulu.snippets",resultKey:"snippets",snippetType:null,dataAttribute:"snippets",dataDefault:[],actionIcon:"fa-file-text-o",hidePositionElement:!0,hideConfigButton:!0,locale:null,navigateEvent:"sulu.router.navigate",translations:{noContentSelected:"snippet-content.nosnippets-selected",addSnippets:"snippet-content.add"}},b={data:function(a){return['<div class="grid">','   <div class="grid-row search-row">','       <div class="grid-col-8"/>','       <div class="grid-col-4" id="',a.ids.search,'"/>',"   </div>",'   <div class="grid-row">','       <div class="grid-col-12" id="',a.ids.snippetList,'"/>',"   </div>","</div>"].join("")},contentItem:function(a,b){return['<a href="#" class="link" data-id="',a,'">','   <span class="value">',b,"</span>","</a>"].join("")}},c=function(a){return"#"+this.options.ids[a]},d=function(){this.sandbox.on("husky.overlay.snippet-content."+this.options.instanceName+".add.initialized",e.bind(this)),this.sandbox.on("husky.overlay.snippet-content."+this.options.instanceName+".add.opened",f.bind(this))},e=function(){var a=this.getData();this.sandbox.start([{name:"search@husky",options:{appearance:"white small",instanceName:this.options.instanceName+"-search",el:c.call(this,"search")}},{name:"datagrid@husky",options:{url:this.options.url,preselected:a,resultKey:this.options.resultKey,sortable:!1,columnOptionsInstanceName:"",el:c.call(this,"snippetList"),searchInstanceName:this.options.instanceName+"-search",paginationOptions:{dropdown:{limit:99999}},viewOptions:{table:{selectItem:{type:"checkbox"},removeRow:!1,editable:!1,validation:!1,addRowTop:!1,showHead:!0,contentContainer:"#content",highlightSelected:!0}},matchings:[{content:"Title",width:"100%",name:"title",editable:!0,sortable:!0,type:"title",validation:{required:!1}}]}}])},f=function(){var a=this.getData()||[];this.sandbox.emit("husky.datagrid.selected.update",a)},g=function(){this.sandbox.dom.on(this.$el,"click",function(){return!1}.bind(this),".search-icon"),this.sandbox.dom.on(this.$el,"keydown",function(a){return 13===event.keyCode?(a.preventDefault(),a.stopPropagation(),!1):void 0}.bind(this),".search-input"),this.sandbox.dom.on(this.$el,"click",function(a){var b=this.sandbox.dom.data(a.currentTarget,"id");return this.sandbox.emit(this.options.navigateEvent,"snippet/snippets/"+this.options.locale+"/edit:"+b),!1}.bind(this),"a.link"),this.sandbox.on(this.DATA_RETRIEVED(),j.bind(this))},h=function(){var a=this.sandbox.dom.createElement("<div/>");this.sandbox.dom.append(this.$el,a),this.sandbox.start([{name:"overlay@husky",options:{triggerEl:this.$addButton,cssClass:"snippet-content-overlay",el:a,removeOnClose:!1,container:this.$el,instanceName:"snippet-content."+this.options.instanceName+".add",skin:"medium",slides:[{title:this.sandbox.translate(this.options.translations.addSnippets),cssClass:"snippet-content-overlay-add",data:b.data(this.options),okCallback:i.bind(this)}]}}])},i=function(){this.sandbox.emit("husky.datagrid.items.get-selected",function(a){this.setData(a)}.bind(this))},j=function(a){for(var b=this.getData(),c=[],d=0;d<b.length;++d)k(a,b[d])&&c.push(b[d]);this.setData(c,!1)},k=function(a,b){for(var c=0;c<a.length;++c)if(a[c].id===b)return!0;return!1};return{type:"itembox",initialize:function(){this.options=this.sandbox.util.extend(!0,{},a,this.options),this.options.ids={container:"snippet-content-"+this.options.instanceName+"-container",addButton:"snippet-content-"+this.options.instanceName+"-add",configButton:"snippet-content-"+this.options.instanceName+"-config",content:"snippet-content-"+this.options.instanceName+"-content",snippetList:"snippet-content-"+this.options.instanceName+"-column-navigation",search:"snippet-content-"+this.options.instanceName+"-search"},d.call(this),this.render(),h.call(this),g.call(this)},getUrl:function(a){var b=-1===this.options.url.indexOf("?")?"?":"&";return[this.options.url,b,this.options.idsParameter,"=",(a||[]).join(",")].join("")},getItemContent:function(a){return b.contentItem(a.id,a.title)},sortHandler:function(a){this.setData(a,!1)},removeHandler:function(a){for(var b=this.getData(),c=-1,d=b.length;++c<d;)if(a===b[c]){b.splice(c,1);break}this.setData(b,!1)}}});