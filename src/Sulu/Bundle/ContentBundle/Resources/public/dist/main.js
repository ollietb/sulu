require.config({paths:{sulucontent:"../../sulucontent/dist",sulucontentcss:"../../sulucontent/css","services/sulucontent/user-settings-manager":"../../sulucontent/dist/services/user-settings-manager","type/resourceLocator":"../../sulucontent/dist/validation/types/resourceLocator","type/textEditor":"../../sulucontent/dist/validation/types/textEditor","type/smartContent":"../../sulucontent/dist/validation/types/smartContent","type/internalLinks":"../../sulucontent/dist/validation/types/internalLinks","type/singleInternalLink":"../../sulucontent/dist/validation/types/singleInternalLink","type/block":"../../sulucontent/dist/validation/types/block","type/toggler":"../../sulucontent/dist/validation/types/toggler","type/teaser-selection":"../../sulucontent/dist/validation/types/teaserSelection","extensions/sulu-buttons-contentbundle":"../../sulucontent/dist/extensions/sulu-buttons","extensions/seo-tab":"../../sulucontent/dist/extensions/seo-tab","extensions/excerpt-tab":"../../sulucontent/dist/extensions/excerpt-tab"}}),define(["config","services/sulucontent/user-settings-manager","extensions/sulu-buttons-contentbundle","extensions/seo-tab","extensions/excerpt-tab","sulucontent/ckeditor/internal-link","css!sulucontentcss/main"],function(a,b,c,d,e,f){return{name:"Sulu Content Bundle",initialize:function(g){"use strict";d.initialize(g),e.initialize(g);var h=g.sandbox,i=a.get("sulu_content.texteditor_toolbar");h.sulu.buttons.push(c.getButtons()),g.components.addSource("sulucontent","/bundles/sulucontent/dist/components"),a.set("sulusearch.page.options",{image:!1}),h.urlManager.setUrl("page",function(a){return"content/contents/<%= webspace %>/<%= locale %>/edit:<%= id %>/content"},function(a){return{id:a.id,webspace:a.properties.webspace_key,url:a.url,locale:a.locale}},function(a){return 0===a.indexOf("page_")?"page":void 0}),h.mvc.routes.push({route:"content/contents/:webspace",callback:function(a){var c=b.getContentLocale(a);h.emit("sulu.router.navigate","content/contents/"+a+"/"+c)}}),h.mvc.routes.push({route:"content/contents/:webspace/:language",callback:function(a,b){return'<div data-aura-component="content@sulucontent" data-aura-webspace="'+a+'" data-aura-language="'+b+'" data-aura-display="column" data-aura-preview="false"/>'}}),h.mvc.routes.push({route:"content/contents/:webspace/:language/add::id/:content",callback:function(a,b,c,d){return'<div data-aura-component="content@sulucontent" data-aura-webspace="'+a+'" data-aura-language="'+b+'" data-aura-content="'+d+'" data-aura-parent="'+c+'"/>'}}),h.mvc.routes.push({route:"content/contents/:webspace/:language/add/:content",callback:function(a,b,c){return'<div data-aura-component="content@sulucontent" data-aura-webspace="'+a+'" data-aura-language="'+b+'" data-aura-content="'+c+'"/>'}}),h.mvc.routes.push({route:"content/contents/:webspace/edit::id/:content",callback:function(a,c,d){var e=b.getContentLocale(a);h.emit("sulu.router.navigate","content/contents/"+a+"/"+e+"/edit:"+c+"/"+d)}}),h.mvc.routes.push({route:"content/contents/:webspace/:language/edit::id/:content",callback:function(a,b,c,d){return'<div data-aura-component="content@sulucontent" data-aura-webspace="'+a+'" data-aura-language="'+b+'" data-aura-content="'+d+'" data-aura-id="'+c+'" data-aura-preview="true"/>'}}),h.mvc.routes.push({route:"content/webspace/settings::id/:content",callback:function(a){return'<div data-aura-component="webspace/settings@sulucontent" data-aura-id="'+a+'" data-aura-webspace="'+a+'" />'}}),h.ckeditor.addPlugin("internalLink",new f(g.sandboxes.create("plugin-internal-link"))),h.ckeditor.addToolbarButton("links","InternalLink","arrow-down"),i&&i.userToolbar&&h.ckeditor.setToolbar(i.userToolbar)}}});