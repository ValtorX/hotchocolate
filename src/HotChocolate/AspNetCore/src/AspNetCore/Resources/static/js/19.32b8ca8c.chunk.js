(this["webpackJsonp@banana-cake-pop/main"]=this["webpackJsonp@banana-cake-pop/main"]||[]).push([[19],{1212:function(e,t,n){"use strict";n.r(t);var r=n(26),a=n(121),c=n(80),u=n.n(c),s=n(99),i=n(82),o=n(177),p=n(113),b=n(200),d=n(127),f=n(78),h=n(239),l=n(764);function v(e,t){return x.apply(this,arguments)}function x(){return(x=Object(s.a)(u.a.mark((function e(t,n){var r,a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=!1,e.next=3,Object(l.b)(t,n,{upgrade:function(e,t){r=0===t}});case 3:if(a=e.sent,!r){e.next=9;break}return a.close(),e.next=8,Object(l.a)(t);case 8:return e.abrupt("return",void 0);case 9:return e.abrupt("return",a);case 10:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function m(e,t){var n=Object(d.m)();return t?{created:n,message:e,details:t}:{created:n,message:e}}function j(e,t,n){return O.apply(this,arguments)}function O(){return(O=Object(s.a)(u.a.mark((function e(t,n,r){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n.push(m("Migration failed",r)),e.next=3,Object(b.e)("update-log",Object(i.a)(Object(i.a)({},t),{},{logs:n}));case 3:return e.abrupt("return","migration-failed");case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function k(e,t){return w.apply(this,arguments)}function w(){return(w=Object(s.a)(u.a.mark((function e(t,n){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n.push(m("Migration succeeded")),e.next=3,Object(b.e)("update-log",Object(i.a)(Object(i.a)({},t),{},{logs:n}));case 3:return e.abrupt("return","migrated");case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function g(e,t,n,r,a){return y.apply(this,arguments)}function y(){return(y=Object(s.a)(u.a.mark((function e(t,n,r,a,c){var s,o,p,b,d,l,v,x,j,O,k,w,g,y;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:s=new Set,e.prev=1,c.push(m('Starting entity "'.concat(r,'" migration...'))),o=t.transaction(r,"readonly"),p=!0,b=!1,e.prev=6,l=Object(h.a)(o.store);case 8:return e.next=10,l.next();case 10:return v=e.sent,p=v.done,e.next=14,v.value;case 14:if(x=e.sent,p){e.next=21;break}j=x,s.add(a(j.value));case 18:p=!0,e.next=8;break;case 21:e.next=27;break;case 23:e.prev=23,e.t0=e.catch(6),b=!0,d=e.t0;case 27:if(e.prev=27,e.prev=28,p||null==l.return){e.next=32;break}return e.next=32,l.return();case 32:if(e.prev=32,!b){e.next=35;break}throw d;case 35:return e.finish(32);case 36:return e.finish(27);case 37:return e.next=39,o.done;case 39:O=n.transaction(r,"readwrite"),k=[],w=Object(f.a)(s);try{for(w.s();!(g=w.n()).done;)y=g.value,k.push(O.store.put(y))}catch(u){w.e(u)}finally{w.f()}return k.push(O.done),e.next=46,Promise.all(k);case 46:return c.push(m('Entity "'.concat(r,'" migration succeeded'))),e.abrupt("return",!0);case 50:return e.prev=50,e.t1=e.catch(1),c.push(m('Entity "'.concat(r,'" migration failed'),e.t1 instanceof Error?Object(i.a)({},e.t1):void 0)),e.abrupt("return",!1);case 54:return e.prev=54,s.clear(),e.finish(54);case 57:case"end":return e.stop()}}),e,null,[[1,50,54,57],[6,23,27,37],[28,,32,36]])})))).apply(this,arguments)}var E="preview-14";function S(e){return D.apply(this,arguments)}function D(){return(D=Object(s.a)(u.a.mark((function e(t){var n,r,a,c,s;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={id:E,created:Object(d.m)(),fromVersion:"<= bcp-1.0.0-preview.14",toVersion:t,logs:[]},r=[],e.next=4,Object(b.d)();case 4:return a=e.sent,e.next=7,a.count("app");case 7:if(e.t1=e.sent,e.t0=e.t1>0,!e.t0){e.next=14;break}return e.next=12,a.count("update-log");case 12:e.t2=e.sent,e.t0=e.t2>0;case 14:if(!e.t0){e.next=16;break}return e.abrupt("return","already-migrated");case 16:return e.prev=16,e.next=19,v("bcp-data-preview-1",1);case 19:return c=e.sent,e.next=22,v("bcp-state-preview-1",1);case 22:if(s=e.sent,!c||!s){e.next=50;break}return r.push(m("Starting migration...")),e.next=27,g(c,a,"document",P,r);case 27:if(e.sent){e.next=29;break}return e.abrupt("return",j(n,r));case 29:return e.next=31,g(c,a,"history",I,r);case 31:if(e.sent){e.next=33;break}return e.abrupt("return",j(n,r));case 33:return e.next=35,g(c,a,"node",V,r);case 35:if(e.sent){e.next=37;break}return e.abrupt("return",j(n,r));case 37:return e.next=39,g(c,a,"schema-query-result",H,r);case 39:if(e.sent){e.next=41;break}return e.abrupt("return",j(n,r));case 41:return e.next=43,C(s,a,r);case 43:if(e.sent){e.next=45;break}return e.abrupt("return",j(n,r));case 45:return e.next=47,k(n,r);case 47:return e.abrupt("return",e.sent);case 50:return e.abrupt("return","database-not-found");case 51:e.next=63;break;case 53:if(e.prev=53,e.t3=e.catch(16),!!(e.t3 instanceof Error&&"VersionError"===e.t3.name)){e.next=62;break}return e.next=59,j(n,r,e.t3 instanceof Error?Object(i.a)({},e.t3):void 0);case 59:return e.abrupt("return",e.sent);case 62:return e.abrupt("return","database-higher-version");case 63:case"end":return e.stop()}}),e,null,[[16,53]])})))).apply(this,arguments)}function C(e,t,n){return A.apply(this,arguments)}function A(){return(A=Object(s.a)(u.a.mark((function e(t,n,r){var a,c,s;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,r.push(m("Starting app state migration...")),e.next=4,t.get("state","state");case 4:if(a=e.sent){e.next=7;break}throw new Error("App state not found!");case 7:if(c=n.transaction(["app","document"],"readwrite"),!a.document.activeDocument){e.next=14;break}return e.next=11,c.objectStore("document").get(a.document.activeDocument.id);case 11:e.t0=e.sent,e.next=15;break;case 14:e.t0=void 0;case 15:return s=e.t0,e.next=18,c.objectStore("app").put(N(a,null!==s&&void 0!==s?s:null),p.APP_STATE_KEY);case 18:return e.next=20,c.done;case 20:return r.push(m("App state migration succeeded")),e.abrupt("return",!0);case 24:return e.prev=24,e.t1=e.catch(0),r.push(m("App state migration failed",e.t1 instanceof Error?Object(i.a)({},e.t1):void 0)),e.abrupt("return",!1);case 28:case"end":return e.stop()}}),e,null,[[0,24]])})))).apply(this,arguments)}function N(e,t){var n,r,a=null!==(n=null===(r=e.tab.ids.map((function(t){return e.tab.entities[t]})).find((function(e){return!!(null===e||void 0===e?void 0:e.isPreview)})))||void 0===r?void 0:r.id)&&void 0!==n?n:null,c=e.document,u=(c.openedPreviewDocuments,Object(o.a)(c,["openedPreviewDocuments"])),s=Object(o.a)(e,["document"]);return Object(i.a)(Object(i.a)({},s),{},{document:Object(i.a)(Object(i.a)({},u),{},{activeDocument:t,openedPreviewDocument:a})})}function P(e){return Object(p.calculateDocumentHash)({id:e.id,name:e.name,operationName:e.operationName,body:e.graphQLDocument,variables:e.variables,hash:e.hash,isDraft:e.isDraft,isNew:e.isNew,activeConnectionKind:"http",httpConnection:{endpoint:e.schemaEndpoint,subscriptionEndpoint:e.subscriptionEndpoint,headers:T(e.httpHeaders),includeCookies:"include"===e.credentials,useGet:"GET"===e.httpMethod,useTunnel:!1}})}function T(e){if("string"!==typeof e)return e;try{var t=JSON.parse(e);return Object.keys(t).map((function(e){return{name:e,value:t[e],enabled:!0}}))}catch(n){return}}function I(e){var t=e.failed,n=Object(o.a)(e,["failed"]);return Object(i.a)(Object(i.a)({},n),{},{operationStatus:t?"failed":"succeeded"})}function V(e){var t;return Object(i.a)(Object(i.a)({},e),{},{parentId:null!==(t=e.parentId)&&void 0!==t?t:e.workspaceId,path:e.path.slice(1)})}function H(e){return e}var K="preview-15";function G(e){return J.apply(this,arguments)}function J(){return(J=Object(s.a)(u.a.mark((function e(t){var n,r,a,c,s;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={id:K,created:Object(d.m)(),fromVersion:">= bcp-1.0.0-preview.15 & <= bcp-1.0.0-preview.17",toVersion:t,logs:[]},r=[],e.next=4,Object(b.d)();case 4:return a=e.sent,e.next=7,a.count("app");case 7:if(e.t1=e.sent,e.t0=e.t1>0,!e.t0){e.next=14;break}return e.next=12,a.count("update-log");case 12:e.t2=e.sent,e.t0=e.t2>0;case 14:if(!e.t0){e.next=16;break}return e.abrupt("return","already-migrated");case 16:return e.prev=16,e.next=19,v("bcp-data-preview-1",10);case 19:return c=e.sent,e.next=22,v("bcp-state-preview-1",5);case 22:if(s=e.sent,!c||!s){e.next=54;break}return r.push(m("Starting migration...")),e.next=27,g(c,a,"document",q,r);case 27:if(e.sent){e.next=29;break}return e.abrupt("return",j(n,r));case 29:return e.next=31,g(c,a,"history",Q,r);case 31:if(e.sent){e.next=33;break}return e.abrupt("return",j(n,r));case 33:return e.next=35,g(c,a,"node",Y,r);case 35:if(e.sent){e.next=37;break}return e.abrupt("return",j(n,r));case 37:return e.next=39,g(c,a,"schema-query-result",F,r);case 39:if(e.sent){e.next=41;break}return e.abrupt("return",j(n,r));case 41:return e.next=43,z(c,r);case 43:if(e.sent){e.next=45;break}return e.abrupt("return",j(n,r));case 45:return e.next=47,M(s,a,r);case 47:if(e.sent){e.next=49;break}return e.abrupt("return",j(n,r));case 49:return e.next=51,k(n,r);case 51:return e.abrupt("return",e.sent);case 54:return e.abrupt("return","database-not-found");case 55:e.next=67;break;case 57:if(e.prev=57,e.t3=e.catch(16),!!(e.t3 instanceof Error&&"VersionError"===e.t3.name)){e.next=66;break}return e.next=63,j(n,r,e.t3 instanceof Error?Object(i.a)({},e.t3):void 0);case 63:return e.abrupt("return",e.sent);case 66:return e.abrupt("return","database-higher-version");case 67:case"end":return e.stop()}}),e,null,[[16,57]])})))).apply(this,arguments)}function M(e,t,n){return _.apply(this,arguments)}function _(){return(_=Object(s.a)(u.a.mark((function e(t,n,r){var a,c,o;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,r.push(m("Starting app state migration...")),e.next=4,t.get("state","state");case 4:if(a=e.sent){e.next=7;break}throw new Error("App state not found!");case 7:if(c=n.transaction(["app","document","node"],"readwrite"),!a.document.activeDocument){e.next=14;break}return e.next=11,c.objectStore("document").get(a.document.activeDocument.id).then(function(){var e=Object(s.a)(u.a.mark((function e(t){var n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t){e.next=5;break}return e.next=3,c.objectStore("node").get(t.id);case 3:return n=e.sent,e.abrupt("return",Object(i.a)(Object(i.a)({},t),{},{version:null===n||void 0===n?void 0:n.version}));case 5:return e.abrupt("return",void 0);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 11:e.t0=e.sent,e.next=15;break;case 14:e.t0=void 0;case 15:return o=e.t0,e.next=18,c.objectStore("app").put(U(a,null!==o&&void 0!==o?o:null),p.APP_STATE_KEY);case 18:return e.next=20,c.done;case 20:return r.push(m("App state migration succeeded")),e.abrupt("return",!0);case 24:return e.prev=24,e.t1=e.catch(0),r.push(m("App state migration failed",e.t1 instanceof Error?Object(i.a)({},e.t1):void 0)),e.abrupt("return",!1);case 28:case"end":return e.stop()}}),e,null,[[0,24]])})))).apply(this,arguments)}function U(e,t){var n=e.document,r=Object(o.a)(e,["document"]);return Object(i.a)(Object(i.a)({},r),{},{document:Object(i.a)(Object(i.a)({},n),{},{activeDocument:t,openedPreviewDocuments:void 0})})}function q(e){return"activeConnectionKind"in e?Object(p.calculateDocumentHash)(Object(i.a)(Object(i.a)({},e),{},{httpConnection:e.httpConnection?Object(i.a)(Object(i.a)({},e.httpConnection),{},{headers:L(e.httpConnection.headers)}):e.httpConnection})):Object(p.calculateDocumentHash)({id:e.id,name:e.name,operationName:e.operationName,body:e.graphQLDocument,variables:e.variables,hash:e.hash,isDraft:e.isDraft,isNew:e.isNew,activeConnectionKind:"http",httpConnection:{endpoint:e.schemaEndpoint,subscriptionEndpoint:e.subscriptionEndpoint,headers:L(e.httpHeaders),includeCookies:"include"===e.credentials,useGet:"GET"===e.httpMethod,useTunnel:!1}})}function L(e){if(e){if("string"!==typeof e)return e.map((function(e){var t=e.name;return{name:null!==t&&void 0!==t?t:"",value:e.value,enabled:e.enabled}}));try{var t=JSON.parse(e);return Object.keys(t).map((function(e){return{name:e,value:t[e],enabled:!0}}))}catch(n){return}}}function Q(e){if("failed"in e){var t=e.failed,n=Object(o.a)(e,["failed"]);return Object(i.a)(Object(i.a)({},n),{},{operationStatus:t?"failed":"succeeded"})}return e}function Y(e){var t;return Object(i.a)(Object(i.a)({},e),{},{parentId:null!==(t=e.parentId)&&void 0!==t?t:e.workspaceId,path:e.path.length&&e.path[0]===e.workspaceId?e.path.slice(1):e.path})}function F(e){return e}function z(e,t){return B.apply(this,arguments)}function B(){return(B=Object(s.a)(u.a.mark((function e(t,n){var r;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n.push(m("Starting user session migration...")),e.next=4,t.get("user-session","session");case 4:if(!(r=e.sent)){e.next=8;break}return e.next=8,Object(p.setUserSession)(r);case 8:return n.push(m("User session migration succeeded")),e.abrupt("return",!0);case 12:return e.prev=12,e.t0=e.catch(0),n.push(m("User session migration failed",e.t0 instanceof Error?Object(i.a)({},e.t0):void 0)),e.abrupt("return",!1);case 16:case"end":return e.stop()}}),e,null,[[0,12]])})))).apply(this,arguments)}function R(){return(R=Object(s.a)(u.a.mark((function e(t){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,S(t).then(function(){var e=Object(s.a)(u.a.mark((function e(n){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("database-higher-version"!==n){e.next=3;break}return e.next=3,G(t);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var W=n(1),X=n(32),Z=n(2);t.default=function(e){var t=e.children,n=Object(W.useState)(!0),c=Object(r.a)(n,2),u=c[0],s=c[1];return Object(W.useEffect)((function(){(function(e){return R.apply(this,arguments)})(a.a).then((function(){s(!1)}))}),[s]),u?Object(Z.jsx)(X.a,{}):Object(Z.jsx)(Z.Fragment,{children:t})}}}]);