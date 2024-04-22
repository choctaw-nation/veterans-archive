!function(){"use strict";var e={338:function(e,t,n){var r=n(795);t.H=r.createRoot,r.hydrateRoot},795:function(e){e.exports=window.ReactDOM}},t={};function n(r){var i=t[r];if(void 0!==i)return i.exports;var a=t[r]={exports:{}};return e[r](a,a.exports,n),a.exports}n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,{a:t}),t},n.d=function(e,t){for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){function e(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function t(t,n){if(t){if("string"==typeof t)return e(t,n);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?e(t,n):void 0}}function r(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,i,a,s,o=[],c=!0,l=!1;try{if(a=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;c=!1}else for(;!(c=(r=a.call(n)).done)&&(o.push(r.value),o.length!==t);c=!0);}catch(e){l=!0,i=e}finally{try{if(!c&&null!=n.return&&(s=n.return(),Object(s)!==s))return}finally{if(l)throw i}}return o}}(e,n)||t(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var i=window.React,a=n(338),s=(0,i.memo)((function(e){var t=e.children,n=e.classes,r=e.innerClass,a="btn-container position-relative justify-content-center align-items-center p-1 d-inline-flex ".concat(n?"".concat(n):"");return(0,i.createElement)("div",{className:a},(0,i.createElement)("div",{className:"btn btn-lower position-absolute top-0 w-100 h-100 z-1 ".concat(r?"".concat(r):"")}),t)}));function o(e){var t=e.searchTerm,n=e.setSearchTerm,r=e.isLoading,a=e.children,o=e.searchInputRef;return(0,i.createElement)("form",{className:"col",action:"/veterans"},(0,i.createElement)("div",{className:"row"},(0,i.createElement)("div",{className:"col"},(0,i.createElement)("label",{htmlFor:"search",className:"form-label"},(0,i.createElement)("h1",{className:"fw-light display-1 text-uppercase text-light-green"},"Find a veteran")))),(0,i.createElement)("div",{className:"row align-items-center row-gap-2"},(0,i.createElement)("div",{className:"col-lg-auto flex-grow-1"},(0,i.createElement)("input",{ref:o,type:"text",className:"form-control flex-grow-1 flex-shrink-0",id:"search",name:"s",value:t,onChange:function(e){n(e.target.value);var t=new URLSearchParams(window.location.search);t.set("s",e.target.value),window.history.pushState({},"","".concat(window.location.pathname,"?").concat(t.toString()))},placeholder:"Try searching by name, rank, hometown, or more"})),(0,i.createElement)("div",{className:"col-lg-auto d-flex flex-wrap flex-sm-nowrap gap-2"},(0,i.createElement)(s,{innerClass:"btn-outline-light"},(0,i.createElement)("input",{type:"submit",value:"Search",disabled:r,className:"btn text-light btn-outline-light text-uppercase display-6 fs-5 z-2 w-100 border-0"})))),(0,i.createElement)("div",{className:"row my-3 row-gap-3",id:"filters-container"},a))}var c=(0,i.memo)((function(e){var t=e.direction,n=void 0===t?"start":t,r=e.color,a=e.classes;return(0,i.createElement)("div",{className:"divider divider-".concat(r," ").concat(a||"")},(0,i.createElement)("div",{className:"divider__line ".concat("end"===n?"order-last":"")}),(0,i.createElement)("div",{className:"divider__dots-container"},(0,i.createElement)("div",{className:"divider__dot"}),(0,i.createElement)("div",{className:"divider__dot"})))})),l=(0,i.memo)((function(e){var t,n,r,a,o=e.post,l=o.featuredImage,u=o.permalink,h=o.vetData,d=h.home_areas,f=h.dates_of_service,m=o.vetIcon,g=function(e){var t=e.title,n=e.vetData,r=n.middle_name,i=n.nickname,a=n.maiden_name,s=n.suffix,o=t.split(" "),c=[o[0]];return i&&c.push('"'.concat(i,'"')),r&&c.push(r),a&&c.push("(".concat(a,")")),c.push(o[1]),s&&c.push(s),c.filter((function(e){return e})).join(" ")}(o),p=[{label:"Dates of Service",value:null==f?void 0:f.map((function(e){return"".concat(e.service_start," - ").concat(e.service_end||"")})).join(", ")},{label:"Hometown",value:(t=d,r=null==t?void 0:t.map((function(e){return Object.values({city:e.city,county:!!e.county&&"".concat(e.county," County"),state:e.state})})),a=null==r?void 0:r.flat(),(null==a||null===(n=a.filter((function(e){return e})))||void 0===n?void 0:n.join(", "))||null)}];return(0,i.createElement)("div",{className:"card shadow h-100"},o.featuredImage&&(0,i.createElement)("a",{href:u},(0,i.createElement)("div",{className:"ratio ratio-1x1 card-img-top",dangerouslySetInnerHTML:{__html:l}})),(0,i.createElement)("div",{className:"card-body d-flex flex-column"},(0,i.createElement)(c,{direction:"end",color:"green",classes:"mb-3"}),(0,i.createElement)("a",{href:u,className:"card-title h4 text-uppercase text-dark-blue mb-4"},g),(0,i.createElement)("div",{className:"card-text-py-2 mb-2"},(0,i.createElement)("div",{className:"ms-4 at-a-glance"},p.map((function(e,t){var n=e.label,r=e.value;return r&&n?(0,i.createElement)("div",{className:"mb-3",key:t},(0,i.createElement)("p",{className:"text-uppercase text-dark-blue fs-5 mb-0 display-6"},n),(0,i.createElement)("p",null,r)):null}))))),(0,i.createElement)("div",{className:"card-footer bg-dark-blue "},(0,i.createElement)("div",{className:"row row-cols-auto justify-content-between align-items-center row-gap-3",style:{minHeight:75}},(0,i.createElement)("div",{className:"col"},(0,i.createElement)(s,{classes:"btn-outline-primary",innerClass:"btn-outline-primary"},(0,i.createElement)("a",{href:u,className:"btn btn-outline-primary text-uppercase text-white display-6 fs-5 border-0 z-2"},"More Info"))),m&&(0,i.createElement)("div",{className:"col",dangerouslySetInnerHTML:{__html:m}}))))}));function u(e,t,n,r,i,a,s){try{var o=e[a](s),c=o.value}catch(e){return void n(e)}o.done?t(c):Promise.resolve(c).then(r,i)}var h=window.regeneratorRuntime,d=n.n(h),f=window.wp.apiFetch,m=n.n(f);function g(){var e;return e=d().mark((function e(){var t;return d().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m()({path:"veterans-archive/v1/veterans",headers:{"Content-Type":"application/json"}});case 2:if(t=e.sent){e.next=7;break}throw new Error("No response");case 7:return e.abrupt("return",t);case 8:case"end":return e.stop()}}),e)})),g=function(){var t=this,n=arguments;return new Promise((function(r,i){var a=e.apply(t,n);function s(e){u(a,r,i,s,o,"next",e)}function o(e){u(a,r,i,s,o,"throw",e)}s(void 0)}))},g.apply(this,arguments)}function p(n){return function(t){if(Array.isArray(t))return e(t)}(n)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(n)||t(n)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function v(e){return Array.isArray?Array.isArray(e):"[object Array]"===M(e)}function y(e){return"string"==typeof e}function b(e){return"number"==typeof e}function w(e){return"object"==typeof e}function x(e){return null!=e}function E(e){return!e.trim().length}function M(e){return null==e?void 0===e?"[object Undefined]":"[object Null]":Object.prototype.toString.call(e)}const S=e=>`Missing ${e} property in key`,_=e=>`Property 'weight' in key '${e}' must be a positive integer`,L=Object.prototype.hasOwnProperty;class N{constructor(e){this._keys=[],this._keyMap={};let t=0;e.forEach((e=>{let n=k(e);this._keys.push(n),this._keyMap[n.id]=n,t+=n.weight})),this._keys.forEach((e=>{e.weight/=t}))}get(e){return this._keyMap[e]}keys(){return this._keys}toJSON(){return JSON.stringify(this._keys)}}function k(e){let t=null,n=null,r=null,i=1,a=null;if(y(e)||v(e))r=e,t=I(e),n=C(e);else{if(!L.call(e,"name"))throw new Error(S("name"));const s=e.name;if(r=s,L.call(e,"weight")&&(i=e.weight,i<=0))throw new Error(_(s));t=I(s),n=C(s),a=e.getFn}return{path:t,id:n,weight:i,src:r,getFn:a}}function I(e){return v(e)?e:e.split(".")}function C(e){return v(e)?e.join("."):e}var O={isCaseSensitive:!1,includeScore:!1,keys:[],shouldSort:!0,sortFn:(e,t)=>e.score===t.score?e.idx<t.idx?-1:1:e.score<t.score?-1:1,includeMatches:!1,findAllMatches:!1,minMatchCharLength:1,location:0,threshold:.6,distance:100,useExtendedSearch:!1,getFn:function(e,t){let n=[],r=!1;const i=(e,t,a)=>{if(x(e))if(t[a]){const s=e[t[a]];if(!x(s))return;if(a===t.length-1&&(y(s)||b(s)||function(e){return!0===e||!1===e||function(e){return w(e)&&null!==e}(e)&&"[object Boolean]"==M(e)}(s)))n.push(function(e){return null==e?"":function(e){if("string"==typeof e)return e;let t=e+"";return"0"==t&&1/e==-1/0?"-0":t}(e)}(s));else if(v(s)){r=!0;for(let e=0,n=s.length;e<n;e+=1)i(s[e],t,a+1)}else t.length&&i(s,t,a+1)}else n.push(e)};return i(e,y(t)?t.split("."):t,0),r?n:n[0]},ignoreLocation:!1,ignoreFieldNorm:!1,fieldNormWeight:1};const j=/[^ ]+/g;class F{constructor({getFn:e=O.getFn,fieldNormWeight:t=O.fieldNormWeight}={}){this.norm=function(e=1,t=3){const n=new Map,r=Math.pow(10,t);return{get(t){const i=t.match(j).length;if(n.has(i))return n.get(i);const a=1/Math.pow(i,.5*e),s=parseFloat(Math.round(a*r)/r);return n.set(i,s),s},clear(){n.clear()}}}(t,3),this.getFn=e,this.isCreated=!1,this.setIndexRecords()}setSources(e=[]){this.docs=e}setIndexRecords(e=[]){this.records=e}setKeys(e=[]){this.keys=e,this._keysMap={},e.forEach(((e,t)=>{this._keysMap[e.id]=t}))}create(){!this.isCreated&&this.docs.length&&(this.isCreated=!0,y(this.docs[0])?this.docs.forEach(((e,t)=>{this._addString(e,t)})):this.docs.forEach(((e,t)=>{this._addObject(e,t)})),this.norm.clear())}add(e){const t=this.size();y(e)?this._addString(e,t):this._addObject(e,t)}removeAt(e){this.records.splice(e,1);for(let t=e,n=this.size();t<n;t+=1)this.records[t].i-=1}getValueForItemAtKeyId(e,t){return e[this._keysMap[t]]}size(){return this.records.length}_addString(e,t){if(!x(e)||E(e))return;let n={v:e,i:t,n:this.norm.get(e)};this.records.push(n)}_addObject(e,t){let n={i:t,$:{}};this.keys.forEach(((t,r)=>{let i=t.getFn?t.getFn(e):this.getFn(e,t.path);if(x(i))if(v(i)){let e=[];const t=[{nestedArrIndex:-1,value:i}];for(;t.length;){const{nestedArrIndex:n,value:r}=t.pop();if(x(r))if(y(r)&&!E(r)){let t={v:r,i:n,n:this.norm.get(r)};e.push(t)}else v(r)&&r.forEach(((e,n)=>{t.push({nestedArrIndex:n,value:e})}))}n.$[r]=e}else if(y(i)&&!E(i)){let e={v:i,n:this.norm.get(i)};n.$[r]=e}})),this.records.push(n)}toJSON(){return{keys:this.keys,records:this.records}}}function A(e,t,{getFn:n=O.getFn,fieldNormWeight:r=O.fieldNormWeight}={}){const i=new F({getFn:n,fieldNormWeight:r});return i.setKeys(e.map(k)),i.setSources(t),i.create(),i}function R(e,{errors:t=0,currentLocation:n=0,expectedLocation:r=0,distance:i=O.distance,ignoreLocation:a=O.ignoreLocation}={}){const s=t/e.length;if(a)return s;const o=Math.abs(r-n);return i?s+o/i:o?1:s}const D=32;function $(e){let t={};for(let n=0,r=e.length;n<r;n+=1){const i=e.charAt(n);t[i]=(t[i]||0)|1<<r-n-1}return t}class P{constructor(e,{location:t=O.location,threshold:n=O.threshold,distance:r=O.distance,includeMatches:i=O.includeMatches,findAllMatches:a=O.findAllMatches,minMatchCharLength:s=O.minMatchCharLength,isCaseSensitive:o=O.isCaseSensitive,ignoreLocation:c=O.ignoreLocation}={}){if(this.options={location:t,threshold:n,distance:r,includeMatches:i,findAllMatches:a,minMatchCharLength:s,isCaseSensitive:o,ignoreLocation:c},this.pattern=o?e:e.toLowerCase(),this.chunks=[],!this.pattern.length)return;const l=(e,t)=>{this.chunks.push({pattern:e,alphabet:$(e),startIndex:t})},u=this.pattern.length;if(u>D){let e=0;const t=u%D,n=u-t;for(;e<n;)l(this.pattern.substr(e,D),e),e+=D;if(t){const e=u-D;l(this.pattern.substr(e),e)}}else l(this.pattern,0)}searchIn(e){const{isCaseSensitive:t,includeMatches:n}=this.options;if(t||(e=e.toLowerCase()),this.pattern===e){let t={isMatch:!0,score:0};return n&&(t.indices=[[0,e.length-1]]),t}const{location:r,distance:i,threshold:a,findAllMatches:s,minMatchCharLength:o,ignoreLocation:c}=this.options;let l=[],u=0,h=!1;this.chunks.forEach((({pattern:t,alphabet:d,startIndex:f})=>{const{isMatch:m,score:g,indices:p}=function(e,t,n,{location:r=O.location,distance:i=O.distance,threshold:a=O.threshold,findAllMatches:s=O.findAllMatches,minMatchCharLength:o=O.minMatchCharLength,includeMatches:c=O.includeMatches,ignoreLocation:l=O.ignoreLocation}={}){if(t.length>D)throw new Error("Pattern length exceeds max of 32.");const u=t.length,h=e.length,d=Math.max(0,Math.min(r,h));let f=a,m=d;const g=o>1||c,p=g?Array(h):[];let v;for(;(v=e.indexOf(t,m))>-1;){let e=R(t,{currentLocation:v,expectedLocation:d,distance:i,ignoreLocation:l});if(f=Math.min(e,f),m=v+u,g){let e=0;for(;e<u;)p[v+e]=1,e+=1}}m=-1;let y=[],b=1,w=u+h;const x=1<<u-1;for(let r=0;r<u;r+=1){let a=0,o=w;for(;a<o;)R(t,{errors:r,currentLocation:d+o,expectedLocation:d,distance:i,ignoreLocation:l})<=f?a=o:w=o,o=Math.floor((w-a)/2+a);w=o;let c=Math.max(1,d-o+1),v=s?h:Math.min(d+o,h)+u,E=Array(v+2);E[v+1]=(1<<r)-1;for(let a=v;a>=c;a-=1){let s=a-1,o=n[e.charAt(s)];if(g&&(p[s]=+!!o),E[a]=(E[a+1]<<1|1)&o,r&&(E[a]|=(y[a+1]|y[a])<<1|1|y[a+1]),E[a]&x&&(b=R(t,{errors:r,currentLocation:s,expectedLocation:d,distance:i,ignoreLocation:l}),b<=f)){if(f=b,m=s,m<=d)break;c=Math.max(1,2*d-m)}}if(R(t,{errors:r+1,currentLocation:d,expectedLocation:d,distance:i,ignoreLocation:l})>f)break;y=E}const E={isMatch:m>=0,score:Math.max(.001,b)};if(g){const e=function(e=[],t=O.minMatchCharLength){let n=[],r=-1,i=-1,a=0;for(let s=e.length;a<s;a+=1){let s=e[a];s&&-1===r?r=a:s||-1===r||(i=a-1,i-r+1>=t&&n.push([r,i]),r=-1)}return e[a-1]&&a-r>=t&&n.push([r,a-1]),n}(p,o);e.length?c&&(E.indices=e):E.isMatch=!1}return E}(e,t,d,{location:r+f,distance:i,threshold:a,findAllMatches:s,minMatchCharLength:o,includeMatches:n,ignoreLocation:c});m&&(h=!0),u+=g,m&&p&&(l=[...l,...p])}));let d={isMatch:h,score:h?u/this.chunks.length:1};return h&&n&&(d.indices=l),d}}class T{constructor(e){this.pattern=e}static isMultiMatch(e){return W(e,this.multiRegex)}static isSingleMatch(e){return W(e,this.singleRegex)}search(){}}function W(e,t){const n=e.match(t);return n?n[1]:null}class z extends T{constructor(e,{location:t=O.location,threshold:n=O.threshold,distance:r=O.distance,includeMatches:i=O.includeMatches,findAllMatches:a=O.findAllMatches,minMatchCharLength:s=O.minMatchCharLength,isCaseSensitive:o=O.isCaseSensitive,ignoreLocation:c=O.ignoreLocation}={}){super(e),this._bitapSearch=new P(e,{location:t,threshold:n,distance:r,includeMatches:i,findAllMatches:a,minMatchCharLength:s,isCaseSensitive:o,ignoreLocation:c})}static get type(){return"fuzzy"}static get multiRegex(){return/^"(.*)"$/}static get singleRegex(){return/^(.*)$/}search(e){return this._bitapSearch.searchIn(e)}}class H extends T{constructor(e){super(e)}static get type(){return"include"}static get multiRegex(){return/^'"(.*)"$/}static get singleRegex(){return/^'(.*)$/}search(e){let t,n=0;const r=[],i=this.pattern.length;for(;(t=e.indexOf(this.pattern,n))>-1;)n=t+i,r.push([t,n-1]);const a=!!r.length;return{isMatch:a,score:a?0:1,indices:r}}}const K=[class extends T{constructor(e){super(e)}static get type(){return"exact"}static get multiRegex(){return/^="(.*)"$/}static get singleRegex(){return/^=(.*)$/}search(e){const t=e===this.pattern;return{isMatch:t,score:t?0:1,indices:[0,this.pattern.length-1]}}},H,class extends T{constructor(e){super(e)}static get type(){return"prefix-exact"}static get multiRegex(){return/^\^"(.*)"$/}static get singleRegex(){return/^\^(.*)$/}search(e){const t=e.startsWith(this.pattern);return{isMatch:t,score:t?0:1,indices:[0,this.pattern.length-1]}}},class extends T{constructor(e){super(e)}static get type(){return"inverse-prefix-exact"}static get multiRegex(){return/^!\^"(.*)"$/}static get singleRegex(){return/^!\^(.*)$/}search(e){const t=!e.startsWith(this.pattern);return{isMatch:t,score:t?0:1,indices:[0,e.length-1]}}},class extends T{constructor(e){super(e)}static get type(){return"inverse-suffix-exact"}static get multiRegex(){return/^!"(.*)"\$$/}static get singleRegex(){return/^!(.*)\$$/}search(e){const t=!e.endsWith(this.pattern);return{isMatch:t,score:t?0:1,indices:[0,e.length-1]}}},class extends T{constructor(e){super(e)}static get type(){return"suffix-exact"}static get multiRegex(){return/^"(.*)"\$$/}static get singleRegex(){return/^(.*)\$$/}search(e){const t=e.endsWith(this.pattern);return{isMatch:t,score:t?0:1,indices:[e.length-this.pattern.length,e.length-1]}}},class extends T{constructor(e){super(e)}static get type(){return"inverse-exact"}static get multiRegex(){return/^!"(.*)"$/}static get singleRegex(){return/^!(.*)$/}search(e){const t=-1===e.indexOf(this.pattern);return{isMatch:t,score:t?0:1,indices:[0,e.length-1]}}},z],U=K.length,q=/ +(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/,B=new Set([z.type,H.type]);const J=[];function V(e,t){for(let n=0,r=J.length;n<r;n+=1){let r=J[n];if(r.condition(e,t))return new r(e,t)}return new P(e,t)}const Q="$and",G="$path",X=e=>!(!e[Q]&&!e.$or),Y=e=>({[Q]:Object.keys(e).map((t=>({[t]:e[t]})))});function Z(e,t,{auto:n=!0}={}){const r=e=>{let i=Object.keys(e);const a=(e=>!!e[G])(e);if(!a&&i.length>1&&!X(e))return r(Y(e));if((e=>!v(e)&&w(e)&&!X(e))(e)){const r=a?e[G]:i[0],s=a?e.$val:e[r];if(!y(s))throw new Error((e=>`Invalid value for key ${e}`)(r));const o={keyId:C(r),pattern:s};return n&&(o.searcher=V(s,t)),o}let s={children:[],operator:i[0]};return i.forEach((t=>{const n=e[t];v(n)&&n.forEach((e=>{s.children.push(r(e))}))})),s};return X(e)||(e=Y(e)),r(e)}function ee(e,t){const n=e.matches;t.matches=[],x(n)&&n.forEach((e=>{if(!x(e.indices)||!e.indices.length)return;const{indices:n,value:r}=e;let i={indices:n,value:r};e.key&&(i.key=e.key.src),e.idx>-1&&(i.refIndex=e.idx),t.matches.push(i)}))}function te(e,t){t.score=e.score}class ne{constructor(e,t={},n){this.options={...O,...t},this.options.useExtendedSearch,this._keyStore=new N(this.options.keys),this.setCollection(e,n)}setCollection(e,t){if(this._docs=e,t&&!(t instanceof F))throw new Error("Incorrect 'index' type");this._myIndex=t||A(this.options.keys,this._docs,{getFn:this.options.getFn,fieldNormWeight:this.options.fieldNormWeight})}add(e){x(e)&&(this._docs.push(e),this._myIndex.add(e))}remove(e=(()=>!1)){const t=[];for(let n=0,r=this._docs.length;n<r;n+=1){const i=this._docs[n];e(i,n)&&(this.removeAt(n),n-=1,r-=1,t.push(i))}return t}removeAt(e){this._docs.splice(e,1),this._myIndex.removeAt(e)}getIndex(){return this._myIndex}search(e,{limit:t=-1}={}){const{includeMatches:n,includeScore:r,shouldSort:i,sortFn:a,ignoreFieldNorm:s}=this.options;let o=y(e)?y(this._docs[0])?this._searchStringList(e):this._searchObjectList(e):this._searchLogical(e);return function(e,{ignoreFieldNorm:t=O.ignoreFieldNorm}){e.forEach((e=>{let n=1;e.matches.forEach((({key:e,norm:r,score:i})=>{const a=e?e.weight:null;n*=Math.pow(0===i&&a?Number.EPSILON:i,(a||1)*(t?1:r))})),e.score=n}))}(o,{ignoreFieldNorm:s}),i&&o.sort(a),b(t)&&t>-1&&(o=o.slice(0,t)),function(e,t,{includeMatches:n=O.includeMatches,includeScore:r=O.includeScore}={}){const i=[];return n&&i.push(ee),r&&i.push(te),e.map((e=>{const{idx:n}=e,r={item:t[n],refIndex:n};return i.length&&i.forEach((t=>{t(e,r)})),r}))}(o,this._docs,{includeMatches:n,includeScore:r})}_searchStringList(e){const t=V(e,this.options),{records:n}=this._myIndex,r=[];return n.forEach((({v:e,i:n,n:i})=>{if(!x(e))return;const{isMatch:a,score:s,indices:o}=t.searchIn(e);a&&r.push({item:e,idx:n,matches:[{score:s,value:e,norm:i,indices:o}]})})),r}_searchLogical(e){const t=Z(e,this.options),n=(e,t,r)=>{if(!e.children){const{keyId:n,searcher:i}=e,a=this._findMatches({key:this._keyStore.get(n),value:this._myIndex.getValueForItemAtKeyId(t,n),searcher:i});return a&&a.length?[{idx:r,item:t,matches:a}]:[]}const i=[];for(let a=0,s=e.children.length;a<s;a+=1){const s=e.children[a],o=n(s,t,r);if(o.length)i.push(...o);else if(e.operator===Q)return[]}return i},r=this._myIndex.records,i={},a=[];return r.forEach((({$:e,i:r})=>{if(x(e)){let s=n(t,e,r);s.length&&(i[r]||(i[r]={idx:r,item:e,matches:[]},a.push(i[r])),s.forEach((({matches:e})=>{i[r].matches.push(...e)})))}})),a}_searchObjectList(e){const t=V(e,this.options),{keys:n,records:r}=this._myIndex,i=[];return r.forEach((({$:e,i:r})=>{if(!x(e))return;let a=[];n.forEach(((n,r)=>{a.push(...this._findMatches({key:n,value:e[r],searcher:t}))})),a.length&&i.push({idx:r,item:e,matches:a})})),i}_findMatches({key:e,value:t,searcher:n}){if(!x(t))return[];let r=[];if(v(t))t.forEach((({v:t,i:i,n:a})=>{if(!x(t))return;const{isMatch:s,score:o,indices:c}=n.searchIn(t);s&&r.push({score:o,key:e,value:t,idx:i,norm:a,indices:c})}));else{const{v:i,n:a}=t,{isMatch:s,score:o,indices:c}=n.searchIn(i);s&&r.push({score:o,key:e,value:i,norm:a,indices:c})}return r}}ne.version="7.0.0",ne.createIndex=A,ne.parseIndex=function(e,{getFn:t=O.getFn,fieldNormWeight:n=O.fieldNormWeight}={}){const{keys:r,records:i}=e,a=new F({getFn:t,fieldNormWeight:n});return a.setKeys(r),a.setIndexRecords(i),a},ne.config=O,ne.parseQuery=Z,function(...e){J.push(...e)}(class{constructor(e,{isCaseSensitive:t=O.isCaseSensitive,includeMatches:n=O.includeMatches,minMatchCharLength:r=O.minMatchCharLength,ignoreLocation:i=O.ignoreLocation,findAllMatches:a=O.findAllMatches,location:s=O.location,threshold:o=O.threshold,distance:c=O.distance}={}){this.query=null,this.options={isCaseSensitive:t,includeMatches:n,minMatchCharLength:r,findAllMatches:a,ignoreLocation:i,location:s,threshold:o,distance:c},this.pattern=t?e:e.toLowerCase(),this.query=function(e,t={}){return e.split("|").map((e=>{let n=e.trim().split(q).filter((e=>e&&!!e.trim())),r=[];for(let e=0,i=n.length;e<i;e+=1){const i=n[e];let a=!1,s=-1;for(;!a&&++s<U;){const e=K[s];let n=e.isMultiMatch(i);n&&(r.push(new e(n,t)),a=!0)}if(!a)for(s=-1;++s<U;){const e=K[s];let n=e.isSingleMatch(i);if(n){r.push(new e(n,t));break}}}return r}))}(this.pattern,this.options)}static condition(e,t){return t.useExtendedSearch}searchIn(e){const t=this.query;if(!t)return{isMatch:!1,score:1};const{includeMatches:n,isCaseSensitive:r}=this.options;e=r?e:e.toLowerCase();let i=0,a=[],s=0;for(let r=0,o=t.length;r<o;r+=1){const o=t[r];a.length=0,i=0;for(let t=0,r=o.length;t<r;t+=1){const r=o[t],{isMatch:c,indices:l,score:u}=r.search(e);if(!c){s=0,i=0,a.length=0;break}if(i+=1,s+=u,n){const e=r.constructor.type;B.has(e)?a=[...a,...l]:a.push(l)}}if(i){let e={isMatch:!0,score:s/i};return n&&(e.indices=a),e}}return{isMatch:!1,score:1}}});var re=[{name:"title",getFn:function(e){return e.title},weight:2},{name:"datesOfService",getFn:function(e){var t;return null!==(t=e.vetData)&&void 0!==t&&t.dates_of_service?e.vetData.dates_of_service.map((function(e){var t,n=[];return n.push(null===(t=e.service_end)||void 0===t?void 0:t.toString()),n.push(e.service_start.toString()),n})).flat():""}},{name:"rank",getFn:function(e){var t;return null===(t=e.vetData)||void 0===t?void 0:t.highest_achieved_rank}},{name:"home",getFn:function(e){var t,n;return null!==(t=e.vetData)&&void 0!==t&&t.home_areas?p(null===(n=e.vetData)||void 0===n?void 0:n.home_areas.map((function(e){return p(Object.values(e))})).flat()):""}},{name:"decorations",getFn:function(e){var t,n;return null!==(t=e.vetData)&&void 0!==t&&null!==(t=t.decorations)&&void 0!==t&&t.decorations?null===(n=e.vetData)||void 0===n||null===(n=n.decorations)||void 0===n?void 0:n.decorations.map((function(e){return e.name})):""}},{name:"statesideAssignment",getFn:function(e){var t;return null===(t=e.vetData)||void 0===t?void 0:t.stateside_assignments},weight:.3},{name:"jobs",getFn:function(e){var t;return null===(t=e.vetData)||void 0===t?void 0:t.jobs},weight:.3},{name:"overseasDuty",getFn:function(e){var t;return null===(t=e.vetData)||void 0===t?void 0:t.overseas_duty},weight:.3},{name:"militaryUnits",getFn:function(e){var t;return null===(t=e.vetData)||void 0===t?void 0:t.military_units},weight:.5},{name:"nickname",getFn:function(e){var t;return null===(t=e.vetData)||void 0===t?void 0:t.nickname},weight:.7},{name:"maidanName",getFn:function(e){var t;return null===(t=e.vetData)||void 0===t?void 0:t.maiden_name},weight:.7},{name:"advancedTraining",getFn:function(e){var t;return null===(t=e.vetData)||void 0===t?void 0:t.advanced_training},weight:.3}];function ie(e,t){return e.filter((function(e){var n,r,i,a,s,o;return!(""!==t.branches&&(null===(n=e.vetData)||void 0===n||!n.branches_of_service||null!==(r=e.vetData)&&void 0!==r&&null!==(r=r.branches_of_service)&&void 0!==r&&r.every((function(e){return e.slug!==t.branches})))||""!==t.wars&&(null===(i=e.vetData)||void 0===i||!i.wars||null!==(a=e.vetData)&&void 0!==a&&null!==(a=a.wars)&&void 0!==a&&a.every((function(e){return e.slug!==t.wars})))||""!==t.decorations&&(null===(s=e.vetData)||void 0===s||null===(s=s.decorations)||void 0===s||!s.decorations||null!==(o=e.vetData)&&void 0!==o&&null!==(o=o.decorations)&&void 0!==o&&null!==(o=o.decorations)&&void 0!==o&&o.every((function(e){return e.slug!==t.decorations}))))}))}function ae(){return(0,i.createElement)("div",{className:"spinner-border text-primary",role:"status"},(0,i.createElement)("span",{className:"visually-hidden"},"Loading..."))}function se(e){return se="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},se(e)}function oe(e,t,n){return r=function(e,t){if("object"!=se(e)||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,"string");if("object"!=se(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(t),(t="symbol"==se(r)?r:r+"")in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e;var r}function ce(e){var t=e.options,n=e.selected,r=e.setSelected,a=e.ariaLabel;return(0,i.createElement)(s,{classes:"btn-ouline-light h-100",innerClass:"btn-outline-light h-100"},(0,i.createElement)("select",{className:"form-select btn btn-outline-light h-100 fs-5 z-2 w-100 border-0","aria-label":a,value:n,onChange:function(e){r(e.target.value)}},t.map((function(e,t){var n=e.value,r=e.label;return(0,i.createElement)("option",{value:n,key:t},r)}))))}function le(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function ue(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?le(Object(n),!0).forEach((function(t){oe(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):le(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var he,de=(0,i.memo)((function(e){var t=e.selected,n=e.setSelected,r=e.searchInputRef,a=window.cnoSiteData.vetData.searchFilters,o=a.branches,c=a.wars,l=a.decorations,u=[{id:"branches",label:"Select a branch",values:[{label:"SERVICE BRANCH",value:""}].concat(p(o.map((function(e){return{label:e.name,value:e.slug}}))))},{id:"decorations",label:"Select a decoration",values:[{label:"SELECT A DECORATION",value:""}].concat(p(l.map((function(e){return{label:e.name,value:e.slug}}))))},{id:"wars",label:"Select a conflict",values:[{label:"CONFLICTS",value:""}].concat(p(c.map((function(e){return{label:e.name,value:e.slug}}))))}];var h=Object.values(t).some((function(e){return e}));return(0,i.createElement)(i.Fragment,null,u.map((function(e,r){return(0,i.createElement)("div",{className:"col-auto flex-grow-0",key:r},(0,i.createElement)(ce,{options:e.values,selected:t[e.id],setSelected:function(t){!function(e,t){n((function(n){return ue(ue({},n),{},oe({},t,e))}))}(t,e.id)},ariaLabel:e.label}))})),(0,i.createElement)("div",{className:"col-auto flex-grow-0"},h&&(0,i.createElement)(s,{classes:"btn-outline-light",innerClass:"btn-outline-light"},(0,i.createElement)("button",{className:"btn btn-outline-light z-2 border-0 w-100 text-uppercase fs-5",onClick:function(e){e.preventDefault(),n({branches:"",wars:"",decorations:""}),r.current.focus()}},"Reset Filters"))))})),fe=document.getElementById("search");fe&&(0,a.H)(fe).render((0,i.createElement)((function(e){var t,n=e.appLoad,a=r((0,i.useState)(n),2),s=a[0],c=a[1],u=r((0,i.useState)(n?null:window.cnoSiteData.vetData),2),h=u[0],d=u[1],f=r((0,i.useState)({branches:"",wars:"",decorations:""}),2),m=f[0],p=f[1],v=r((0,i.useState)((t=new URLSearchParams(window.location.search)).has("s")?t.get("s"):""),2),y=v[0],b=v[1],w=function(e,t,n){var a=r((0,i.useState)(n.veterans||window.cnoSiteData.vetData.veterans),1)[0],s=r((0,i.useState)(a),2),o=s[0],c=s[1],l=r((0,i.useState)(!1),2),u=l[0],h=l[1];return(0,i.useEffect)((function(){if(a&&0!==(null==a?void 0:a.length)){var n=[],r=Object.values(t).some((function(e){return""!==e}));if(e||r)if(e||!r){if(e){h(!0);var i=setTimeout((function(){var i=new ne(a,{minMatchCharLength:3,keys:re,threshold:.3}).search(e);if(n=i.map((function(e){return e.item})),r){var s=ie(n,t);c(s)}else c(n);h(!1)}),750);return function(){clearTimeout(i)}}}else c(ie(a,t));else c(a)}}),[e,a,t]),{searchResults:o,isLoading:u,veterans:a,setSearchResults:c}}(y,m,h),x=w.searchResults,E=w.isLoading,M=(0,i.useRef)(null);return(0,i.useEffect)((function(){h||(c(!0),function(){return g.apply(this,arguments)}().then((function(e){d(e),c(!1)})).finally((function(){return c(!1)})))}),[s,h]),(0,i.createElement)(i.Fragment,null,(0,i.createElement)("section",{className:"bg-dark-blue py-3"},(0,i.createElement)("div",{className:"container"},(0,i.createElement)(o,{isLoading:s||E,searchTerm:y,setSearchTerm:b,searchInputRef:M},(0,i.createElement)(de,{setSelected:p,selected:m,searchInputRef:M})))),(0,i.createElement)("div",{className:"container my-5 py-5"},E||s?(0,i.createElement)(ae,null):0!==(null==x?void 0:x.length)&&x?(0,i.createElement)("div",{className:"row row-cols-1 row-cols-md-2 row-cols-lg-3 row-gap-4"},x.length>0&&x.map((function(e){return(0,i.createElement)("div",{className:"col",key:e.id},(0,i.createElement)(l,{post:e}))})),0===x.length&&(0,i.createElement)("div",{className:"col flex-grow-1"},(0,i.createElement)("p",null,"No results found. Trying searching for something else or changing your filters."))):(0,i.createElement)("p",null,"No veterans found")))}),{appLoad:null===(he=window.cnoSiteData)||void 0===he||!he.vetData}))}()}();