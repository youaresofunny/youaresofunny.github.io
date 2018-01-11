webpackJsonp([0,2],[function(e,t,n){"use strict";n.d(t,"d",function(){return r}),n.d(t,"e",function(){return u}),n.d(t,"f",function(){return c}),n.d(t,"c",function(){return a}),n.d(t,"a",function(){return s}),n.d(t,"b",function(){return o});var r="WS_CONNECTED",u="WS_DISCONNECTED",c="WS_ERROR",a="GET_USER",s="GET_ASSETS",o="GET_DEFAULT_ASSETS"},function(e,t,n){"use strict";var r=n(4),u=(n.n(r),n(27));n.d(t,"b",function(){return u}),n.d(t,"c",function(){return c}),n.d(t,"a",function(){return a});var c=function(e){return r.Apis.setRpcConnectionStatusCallback(e),r.Apis.instance("wss://bitshares.openledger.info/ws",!0).init_promise},a=function(e){return new Promise(function(t,n){r.Apis.instance().db_api().exec("lookup_asset_symbols",[e]).then(function(e){t(e)}).catch(function(e){n(e)})})}},,,,,,,,,,,function(e,t,n){"use strict";var r=n(3),u=n(40),c=(n.n(u),n(16)),a=n(17),s=n(23);n.d(t,"a",function(){return o}),n.i(u.sync)(s.a,a.a);var o=new r.a(Object.assign({router:a.a,store:s.a},c.a))},function(e,t,n){"use strict";var r=n(33),u=n.n(r);window.Promise=window.Promise||u.a},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(32),u=n.n(r);u.a.install({onUpdateReady:function(){console.log("update ready"),u.a.applyUpdate()},onUpdated:function(){console.log("updated"),location.reload()}})},,function(e,t,n){"use strict";t.a={beforeMount:function(){var e=this;this.$store.dispatch("initApis",function(){return e.$store.dispatch("getDefaultAssets")})},render:function(){var e=arguments[0];return e("div",{attrs:{id:"app"}},[this.connected?e("router-view",null,[]):e("h4",null,["Connecting"])])},computed:{connected:function(){return this.$store.state.apis.connected}}}},function(e,t,n){"use strict";var r=n(3),u=n(39),c=n(35),a=n.n(c),s=n(36),o=n.n(s);r.a.use(u.a),t.a=new u.a({mode:"history",routes:[{name:"home",path:"/",component:a.a},{name:"user",path:"/user/:nickname",component:o.a}]})},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(1),u=n(0);n.d(t,"initApis",function(){return c});var c=function(e,t){var n=e.commit,c=(e.store,function(e){switch(e){case"closed":n(u.e);break;case"error":n(u.f)}});r.c(c).then(function(e){n(u.d),t()})}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),u=n(1);n.d(t,"getAssets",function(){return c}),n.d(t,"getDefaultAssets",function(){return a});var c=function(e,t){var n=e.commit;u.a(t).then(function(e){n(r.a,e)})},a=function(e){var t=e.commit,n=["BTS","OPEN.EOS","USD","OPEN.OMG","CNY"];u.a(n).then(function(e){t(r.b,e)})}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),u=n(1);n.d(t,"getUser",function(){return c});var c=function(e,t){var n=e.commit;u.b.Get(t).then(function(e){console.log("GET RESULTS FROM WS"),n(r.c,e[0][1])})}},function(e,t,n){"use strict";function r(e){var t=e.assets;if(t)return function(e){return t[e]?t[e].symbol:"Not loaded yet"}}Object.defineProperty(t,"__esModule",{value:!0}),t.getAssetById=r},function(e,t,n){"use strict";function r(e){var t=e.account;if(t)return t.name}function u(e){var t=e.account;if(t)return t}function c(e){var t=e.balances;if(t)return t}Object.defineProperty(t,"__esModule",{value:!0}),t.getUserName=r,t.getAccountObject=u,t.getBalances=c},function(e,t,n){"use strict";var r=n(3),u=n(10),c=n(24),a=n(26),s=n(25);r.a.use(u.b);var o=new u.b.Store({modules:{apis:c.a,user:a.a,assets:s.a}});t.a=o},function(e,t,n){"use strict";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var u,c=n(0),a=n(18),s={connected:!1,instance:null},o=(u={},r(u,c.d,function(e){e.connected=!0}),r(u,c.e,function(e){e.connected=!1,e.instance=null}),r(u,c.f,function(e){e.connected=!1,e.instance=null}),u);t.a={state:s,actions:a,mutations:o}},function(e,t,n){"use strict";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var u,c=n(0),a=n(19),s=n(21),o={assets:null},i=function(e){var t={};return e.forEach(function(e){t[e.id]=e}),t},f=(u={},r(u,c.a,function(e,t){e.assets=i(t)}),r(u,c.b,function(e,t){e.assets=i(t)}),u);t.a={state:o,actions:a,mutations:f,getters:s}},function(e,t,n){"use strict";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var u=n(0),c=n(20),a=n(22),s={account:null,balances:[]},o=r({},u.c,function(e,t){e.account=t.account,e.balances=t.balances,console.log("USER GET",e)});t.a={state:s,actions:c,getters:a,mutations:o}},function(e,t,n){"use strict";function r(e){return new Promise(function(t,n){u.Apis.instance().db_api().exec("get_full_accounts",[[e],!1]).then(function(e){t(e)}).catch(function(e){n(e)})})}Object.defineProperty(t,"__esModule",{value:!0});var u=n(4);n.n(u);t.Get=r},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){return{username:""}}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(10);t.default={beforeMount:function(){this.$store.dispatch("getUser",this.$route.params.nickname)},computed:Object.assign({},n.i(r.a)(["getUserName","getAccountObject","getBalances","getAssetById"]))}},,,,,,function(e,t,n){var r=n(9)(n(28),n(38),null,null);e.exports=r.exports},function(e,t,n){var r=n(9)(n(29),n(37),null,null);e.exports=r.exports},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"page"},[n("router-link",{attrs:{to:"/"}},[e._v("back")]),e._v(" "),this.$store.state.user.account?n("div",[n("h4",[e._v(e._s(e.getUserName)+" ["+e._s(e.getAccountObject.id)+"]")]),e._v(" "),this.$store.state.user.balances?n("div",e._l(e.getBalances,function(t){return n("ul",[t.balance?n("li",[e._v(e._s(e.getAssetById(t.asset_type))+" "+e._s(t.balance))]):e._e()])})):e._e()]):e._e()],1)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"page"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.username,expression:"username"}],attrs:{placeholder:"Enter username"},domProps:{value:e.username},on:{input:function(t){t.target.composing||(e.username=t.target.value)}}}),e._v(" "),n("router-link",{attrs:{to:{name:"user",params:{nickname:e.username}}}},[e._v("VIEW")])],1)},staticRenderFns:[]}},,,function(e,t){},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=(n(13),n(12));n(14),r.a.$mount("#app")}],[42]);
//# sourceMappingURL=client.a089c539.js.map