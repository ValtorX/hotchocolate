/*! For license information please see 23.205f6a28.chunk.js.LICENSE.txt */
(this["webpackJsonp@banana-cake-pop/main"]=this["webpackJsonp@banana-cake-pop/main"]||[]).push([[23],{993:function(e,t,n){"use strict";n.r(t),n.d(t,"conf",(function(){return o})),n.d(t,"language",(function(){return s}));var o={comments:{lineComment:"#"}},s={defaultToken:"keyword",ignoreCase:!0,tokenPostfix:".azcli",str:/[^#\s]/,tokenizer:{root:[{include:"@comment"},[/\s-+@str*\s*/,{cases:{"@eos":{token:"key.identifier",next:"@popall"},"@default":{token:"key.identifier",next:"@type"}}}],[/^-+@str*\s*/,{cases:{"@eos":{token:"key.identifier",next:"@popall"},"@default":{token:"key.identifier",next:"@type"}}}]],type:[{include:"@comment"},[/-+@str*\s*/,{cases:{"@eos":{token:"key.identifier",next:"@popall"},"@default":"key.identifier"}}],[/@str+\s*/,{cases:{"@eos":{token:"string",next:"@popall"},"@default":"string"}}]],comment:[[/#.*$/,{cases:{"@eos":{token:"comment",next:"@popall"}}}]]}}}}]);