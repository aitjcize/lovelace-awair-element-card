var bt=Object.defineProperty;var St=Object.getOwnPropertyDescriptor;var g=(r,t,e,s)=>{for(var o=s>1?void 0:s?St(t,e):t,i=r.length-1,n;i>=0;i--)(n=r[i])&&(o=(s?n(t,e,o):n(o))||o);return s&&o&&bt(t,e,o),o};var z=globalThis,G=z.ShadowRoot&&(z.ShadyCSS===void 0||z.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Z=Symbol(),at=new WeakMap,N=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==Z)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(G&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=at.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&at.set(e,t))}return t}toString(){return this.cssText}},lt=r=>new N(typeof r=="string"?r:r+"",void 0,Z),L=(r,...t)=>{let e=r.length===1?r[0]:t.reduce((s,o,i)=>s+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+r[i+1],r[0]);return new N(e,r,Z)},ct=(r,t)=>{if(G)r.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let s=document.createElement("style"),o=z.litNonce;o!==void 0&&s.setAttribute("nonce",o),s.textContent=e.cssText,r.appendChild(s)}},J=G?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return lt(e)})(r):r;var{is:Ct,defineProperty:wt,getOwnPropertyDescriptor:Rt,getOwnPropertyNames:Ot,getOwnPropertySymbols:Pt,getPrototypeOf:Nt}=Object,v=globalThis,ht=v.trustedTypes,Lt=ht?ht.emptyScript:"",Tt=v.reactiveElementPolyfillSupport,T=(r,t)=>r,U={toAttribute(r,t){switch(t){case Boolean:r=r?Lt:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},B=(r,t)=>!Ct(r,t),dt={attribute:!0,type:String,converter:U,reflect:!1,useDefault:!1,hasChanged:B};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),v.litPropertyMetadata??(v.litPropertyMetadata=new WeakMap);var _=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=dt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),o=this.getPropertyDescriptor(t,s,e);o!==void 0&&wt(this.prototype,t,o)}}static getPropertyDescriptor(t,e,s){let{get:o,set:i}=Rt(this.prototype,t)??{get(){return this[e]},set(n){this[e]=n}};return{get:o,set(n){let c=o?.call(this);i?.call(this,n),this.requestUpdate(t,c,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??dt}static _$Ei(){if(this.hasOwnProperty(T("elementProperties")))return;let t=Nt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(T("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(T("properties"))){let e=this.properties,s=[...Ot(e),...Pt(e)];for(let o of s)this.createProperty(o,e[o])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,o]of e)this.elementProperties.set(s,o)}this._$Eh=new Map;for(let[e,s]of this.elementProperties){let o=this._$Eu(e,s);o!==void 0&&this._$Eh.set(o,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let o of s)e.unshift(J(o))}else t!==void 0&&e.push(J(t));return e}static _$Eu(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ct(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){let s=this.constructor.elementProperties.get(t),o=this.constructor._$Eu(t,s);if(o!==void 0&&s.reflect===!0){let i=(s.converter?.toAttribute!==void 0?s.converter:U).toAttribute(e,s.type);this._$Em=t,i==null?this.removeAttribute(o):this.setAttribute(o,i),this._$Em=null}}_$AK(t,e){let s=this.constructor,o=s._$Eh.get(t);if(o!==void 0&&this._$Em!==o){let i=s.getPropertyOptions(o),n=typeof i.converter=="function"?{fromAttribute:i.converter}:i.converter?.fromAttribute!==void 0?i.converter:U;this._$Em=o;let c=n.fromAttribute(e,i.type);this[o]=c??this._$Ej?.get(o)??c,this._$Em=null}}requestUpdate(t,e,s){if(t!==void 0){let o=this.constructor,i=this[t];if(s??(s=o.getPropertyOptions(t)),!((s.hasChanged??B)(i,e)||s.useDefault&&s.reflect&&i===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:o,wrapped:i},n){s&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,n??e??this[t]),i!==!0||n!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),o===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(let[o,i]of this._$Ep)this[o]=i;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[o,i]of s){let{wrapped:n}=i,c=this[o];n!==!0||this._$AL.has(o)||c===void 0||this.C(o,void 0,i,c)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};_.elementStyles=[],_.shadowRootOptions={mode:"open"},_[T("elementProperties")]=new Map,_[T("finalized")]=new Map,Tt?.({ReactiveElement:_}),(v.reactiveElementVersions??(v.reactiveElementVersions=[])).push("2.1.1");var H=globalThis,F=H.trustedTypes,pt=F?F.createPolicy("lit-html",{createHTML:r=>r}):void 0,$t="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,yt="?"+E,Ut=`<${yt}>`,S=document,D=()=>S.createComment(""),k=r=>r===null||typeof r!="object"&&typeof r!="function",rt=Array.isArray,Mt=r=>rt(r)||typeof r?.[Symbol.iterator]=="function",Q=`[ 	
\f\r]`,M=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ut=/-->/g,mt=/>/g,x=RegExp(`>|${Q}(?:([^\\s"'>=/]+)(${Q}*=${Q}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ft=/'/g,gt=/"/g,vt=/^(?:script|style|textarea|title)$/i,it=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),A=it(1),Yt=it(2),Kt=it(3),C=Symbol.for("lit-noChange"),u=Symbol.for("lit-nothing"),_t=new WeakMap,b=S.createTreeWalker(S,129);function Et(r,t){if(!rt(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return pt!==void 0?pt.createHTML(t):t}var Ht=(r,t)=>{let e=r.length-1,s=[],o,i=t===2?"<svg>":t===3?"<math>":"",n=M;for(let c=0;c<e;c++){let l=r[c],d,p,h=-1,f=0;for(;f<l.length&&(n.lastIndex=f,p=n.exec(l),p!==null);)f=n.lastIndex,n===M?p[1]==="!--"?n=ut:p[1]!==void 0?n=mt:p[2]!==void 0?(vt.test(p[2])&&(o=RegExp("</"+p[2],"g")),n=x):p[3]!==void 0&&(n=x):n===x?p[0]===">"?(n=o??M,h=-1):p[1]===void 0?h=-2:(h=n.lastIndex-p[2].length,d=p[1],n=p[3]===void 0?x:p[3]==='"'?gt:ft):n===gt||n===ft?n=x:n===ut||n===mt?n=M:(n=x,o=void 0);let y=n===x&&r[c+1].startsWith("/>")?" ":"";i+=n===M?l+Ut:h>=0?(s.push(d),l.slice(0,h)+$t+l.slice(h)+E+y):l+E+(h===-2?c:y)}return[Et(r,i+(r[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]},j=class r{constructor({strings:t,_$litType$:e},s){let o;this.parts=[];let i=0,n=0,c=t.length-1,l=this.parts,[d,p]=Ht(t,e);if(this.el=r.createElement(d,s),b.currentNode=this.el.content,e===2||e===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(o=b.nextNode())!==null&&l.length<c;){if(o.nodeType===1){if(o.hasAttributes())for(let h of o.getAttributeNames())if(h.endsWith($t)){let f=p[n++],y=o.getAttribute(h).split(E),W=/([.?@])?(.*)/.exec(f);l.push({type:1,index:i,name:W[2],strings:y,ctor:W[1]==="."?tt:W[1]==="?"?et:W[1]==="@"?st:O}),o.removeAttribute(h)}else h.startsWith(E)&&(l.push({type:6,index:i}),o.removeAttribute(h));if(vt.test(o.tagName)){let h=o.textContent.split(E),f=h.length-1;if(f>0){o.textContent=F?F.emptyScript:"";for(let y=0;y<f;y++)o.append(h[y],D()),b.nextNode(),l.push({type:2,index:++i});o.append(h[f],D())}}}else if(o.nodeType===8)if(o.data===yt)l.push({type:2,index:i});else{let h=-1;for(;(h=o.data.indexOf(E,h+1))!==-1;)l.push({type:7,index:i}),h+=E.length-1}i++}}static createElement(t,e){let s=S.createElement("template");return s.innerHTML=t,s}};function R(r,t,e=r,s){if(t===C)return t;let o=s!==void 0?e._$Co?.[s]:e._$Cl,i=k(t)?void 0:t._$litDirective$;return o?.constructor!==i&&(o?._$AO?.(!1),i===void 0?o=void 0:(o=new i(r),o._$AT(r,e,s)),s!==void 0?(e._$Co??(e._$Co=[]))[s]=o:e._$Cl=o),o!==void 0&&(t=R(r,o._$AS(r,t.values),o,s)),t}var X=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:s}=this._$AD,o=(t?.creationScope??S).importNode(e,!0);b.currentNode=o;let i=b.nextNode(),n=0,c=0,l=s[0];for(;l!==void 0;){if(n===l.index){let d;l.type===2?d=new q(i,i.nextSibling,this,t):l.type===1?d=new l.ctor(i,l.name,l.strings,this,t):l.type===6&&(d=new ot(i,this,t)),this._$AV.push(d),l=s[++c]}n!==l?.index&&(i=b.nextNode(),n++)}return b.currentNode=S,o}p(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},q=class r{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,o){this.type=2,this._$AH=u,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=R(this,t,e),k(t)?t===u||t==null||t===""?(this._$AH!==u&&this._$AR(),this._$AH=u):t!==this._$AH&&t!==C&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Mt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==u&&k(this._$AH)?this._$AA.nextSibling.data=t:this.T(S.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:s}=t,o=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=j.createElement(Et(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===o)this._$AH.p(e);else{let i=new X(o,this),n=i.u(this.options);i.p(e),this.T(n),this._$AH=i}}_$AC(t){let e=_t.get(t.strings);return e===void 0&&_t.set(t.strings,e=new j(t)),e}k(t){rt(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,o=0;for(let i of t)o===e.length?e.push(s=new r(this.O(D()),this.O(D()),this,this.options)):s=e[o],s._$AI(i),o++;o<e.length&&(this._$AR(s&&s._$AB.nextSibling,o),e.length=o)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let s=t.nextSibling;t.remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},O=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,o,i){this.type=1,this._$AH=u,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=i,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=u}_$AI(t,e=this,s,o){let i=this.strings,n=!1;if(i===void 0)t=R(this,t,e,0),n=!k(t)||t!==this._$AH&&t!==C,n&&(this._$AH=t);else{let c=t,l,d;for(t=i[0],l=0;l<i.length-1;l++)d=R(this,c[s+l],e,l),d===C&&(d=this._$AH[l]),n||(n=!k(d)||d!==this._$AH[l]),d===u?t=u:t!==u&&(t+=(d??"")+i[l+1]),this._$AH[l]=d}n&&!o&&this.j(t)}j(t){t===u?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},tt=class extends O{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===u?void 0:t}},et=class extends O{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==u)}},st=class extends O{constructor(t,e,s,o,i){super(t,e,s,o,i),this.type=5}_$AI(t,e=this){if((t=R(this,t,e,0)??u)===C)return;let s=this._$AH,o=t===u&&s!==u||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,i=t!==u&&(s===u||o);o&&this.element.removeEventListener(this.name,this,s),i&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},ot=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){R(this,t)}};var Dt=H.litHtmlPolyfillSupport;Dt?.(j,q),(H.litHtmlVersions??(H.litHtmlVersions=[])).push("3.3.1");var At=(r,t,e)=>{let s=e?.renderBefore??t,o=s._$litPart$;if(o===void 0){let i=e?.renderBefore??null;s._$litPart$=o=new q(t.insertBefore(D(),i),i,void 0,e??{})}return o._$AI(r),o};var V=globalThis,m=class extends _{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;let t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=At(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return C}};m._$litElement$=!0,m.finalized=!0,V.litElementHydrateSupport?.({LitElement:m});var kt=V.litElementPolyfillSupport;kt?.({LitElement:m});(V.litElementVersions??(V.litElementVersions=[])).push("4.2.1");var Y=r=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(r,t)}):customElements.define(r,t)};var jt={attribute:!0,type:String,converter:U,reflect:!1,hasChanged:B},qt=(r=jt,t,e)=>{let{kind:s,metadata:o}=e,i=globalThis.litPropertyMetadata.get(o);if(i===void 0&&globalThis.litPropertyMetadata.set(o,i=new Map),s==="setter"&&((r=Object.create(r)).wrapped=!0),i.set(e.name,r),s==="accessor"){let{name:n}=e;return{set(c){let l=t.get.call(this);t.set.call(this,c),this.requestUpdate(n,l,r)},init(c){return c!==void 0&&this.C(n,void 0,r,c),c}}}if(s==="setter"){let{name:n}=e;return function(c){let l=this[n];t.call(this,c),this.requestUpdate(n,l,r)}}throw Error("Unsupported decorator location: "+s)};function P(r){return(t,e)=>typeof e=="object"?qt(r,t,e):((s,o,i)=>{let n=o.hasOwnProperty(i);return o.constructor.createProperty(i,s),n?Object.getOwnPropertyDescriptor(o,i):void 0})(r,t,e)}function I(r){return P({...r,state:!0,attribute:!1})}var w=class extends m{constructor(){super(...arguments);this._config={type:"custom:awair-element-card",sensors:{}}}setConfig(e){this._config={...e,sensors:e.sensors||{}}}_configChanged(){let e=new Event("config-changed",{bubbles:!0,composed:!0});e.detail={config:this._config},this.dispatchEvent(e)}_setTitle(e){this._config={...this._config,title:e},this._configChanged()}_setSensor(e,s){let o={...this._config.sensors};s?o[e]=s:delete o[e],this._config={...this._config,sensors:o},this._configChanged()}_getEntity(e){let s=this._config.sensors[e];return typeof s=="string"?s:s?.entity||""}render(){return A`
      <div class="row">
        <ha-textfield 
          label="Title" 
          .value=${this._config.title||""}
          @input=${e=>this._setTitle(e.target.value)}
          style="flex: 1">
        </ha-textfield>
      </div>
      
      <div class="section">
        <h3>Sensors (predefined labels, units, and thresholds)</h3>
        
        <div class="sensor-row">
          <span class="sensor-label">Temperature</span>
          <ha-selector
            .hass=${this.hass}
            .selector=${{entity:{}}}
            .value=${this._getEntity("temperature")}
            @value-changed=${e=>this._setSensor("temperature",e.detail.value)}
          ></ha-selector>
        </div>
        
        <div class="sensor-row">
          <span class="sensor-label">Humidity</span>
          <ha-selector
            .hass=${this.hass}
            .selector=${{entity:{}}}
            .value=${this._getEntity("humidity")}
            @value-changed=${e=>this._setSensor("humidity",e.detail.value)}
          ></ha-selector>
        </div>
        
        <div class="sensor-row">
          <span class="sensor-label">CO₂</span>
          <ha-selector
            .hass=${this.hass}
            .selector=${{entity:{}}}
            .value=${this._getEntity("co2")}
            @value-changed=${e=>this._setSensor("co2",e.detail.value)}
          ></ha-selector>
        </div>
        
        <div class="sensor-row">
          <span class="sensor-label">TVOC</span>
          <ha-selector
            .hass=${this.hass}
            .selector=${{entity:{}}}
            .value=${this._getEntity("tvoc")}
            @value-changed=${e=>this._setSensor("tvoc",e.detail.value)}
          ></ha-selector>
        </div>
        
        <div class="sensor-row">
          <span class="sensor-label">PM2.5</span>
          <ha-selector
            .hass=${this.hass}
            .selector=${{entity:{}}}
            .value=${this._getEntity("pm25")}
            @value-changed=${e=>this._setSensor("pm25",e.detail.value)}
          ></ha-selector>
        </div>
      </div>
    `}};w.styles=L`
    .row {
      display: flex;
      gap: 8px;
      margin: 8px 0;
      align-items: center;
    }
    .section {
      border-top: 1px solid var(--divider-color);
      margin-top: 16px;
      padding-top: 16px;
    }
    .sensor-row {
      display: grid;
      grid-template-columns: 120px 1fr;
      gap: 12px;
      margin: 12px 0;
      align-items: center;
    }
    .sensor-label {
      font-weight: 500;
      color: var(--primary-text-color);
    }
    h3 {
      margin: 0 0 16px 0;
      font-size: 16px;
    }
  `,g([P({attribute:!1})],w.prototype,"hass",2),g([I()],w.prototype,"_config",2),w=g([Y("awair-element-card-editor")],w);console.info("%c AWAIR-ELEMENT-CARD %c 0.1.2 ","background-color: #4CAF50; color: white; font-weight: bold;","background-color: transparent; color: #4CAF50; font-weight: bold;");var a={GREEN:"#4CAF50",YELLOW:"#FFC107",ORANGE:"#FF9800",RED:"#F44336",PURPLE:"#9C27B0"},Vt=[a.GREEN,a.YELLOW,a.ORANGE,a.RED,a.PURPLE],nt=5;var xt={[a.GREEN]:1,[a.YELLOW]:2,[a.ORANGE]:3,[a.RED]:4,[a.PURPLE]:5},It={temperature:{label:"Temp",unit:"°C",precision:1,thresholds:[{max:8,color:a.PURPLE},{max:16,color:a.RED},{max:18,color:a.ORANGE},{max:20,color:a.YELLOW},{max:25,color:a.GREEN},{max:27,color:a.YELLOW},{max:29,color:a.ORANGE},{max:34,color:a.RED},{max:100,color:a.PURPLE}]},humidity:{label:"Humidity",unit:"%",precision:0,thresholds:[{max:14,color:a.PURPLE},{max:23,color:a.RED},{max:30,color:a.ORANGE},{max:40,color:a.YELLOW},{max:50,color:a.GREEN},{max:60,color:a.YELLOW},{max:65,color:a.ORANGE},{max:80,color:a.RED},{max:100,color:a.PURPLE}]},co2:{label:"CO₂",unit:"ppm",precision:0,thresholds:[{max:600,color:a.GREEN},{max:1e3,color:a.YELLOW},{max:2e3,color:a.ORANGE},{max:4500,color:a.RED},{max:1e4,color:a.PURPLE}]},tvoc:{label:"TVOC",unit:"ppb",precision:0,thresholds:[{max:300,color:a.GREEN},{max:500,color:a.YELLOW},{max:3e3,color:a.ORANGE},{max:25e3,color:a.RED},{max:1e5,color:a.PURPLE}]},pm25:{label:"PM2.5",unit:"µg/m³",precision:0,thresholds:[{max:12,color:a.GREEN},{max:35,color:a.YELLOW},{max:55,color:a.ORANGE},{max:150,color:a.RED},{max:500,color:a.PURPLE}]}},$=class extends m{constructor(){super(...arguments);this._sensors=[]}static getConfigElement(){return document.createElement("awair-element-card-editor")}static getStubConfig(){return{title:"Air Quality",sensors:{}}}setConfig(e){if(!e.sensors)throw new Error("'sensors' configuration is required");this._config=e,this._sensors=this._processSensors(e.sensors)}_processSensors(e){let s=[],o=["temperature","humidity","co2","tvoc","pm25"];for(let i of o){let n=e[i];if(!n)continue;let c=It[i];typeof n=="string"?s.push({type:i,entity:n,...c}):s.push({type:i,entity:n.entity,label:n.label??c.label,unit:n.unit??c.unit,precision:n.precision??c.precision,thresholds:n.thresholds??c.thresholds})}return s}_getLevelForValue(e,s){if(e==null||Number.isNaN(Number(e)))return{color:"var(--divider-color)",level:0};let o=Number(e);for(let c of s)if(o<=c.max){let l=xt[c.color]||1;return{color:c.color,level:l}}let i=s[s.length-1],n=xt[i.color]||nt;return{color:i.color,level:n}}_formatValue(e,s){return e==null||e==="unknown"||Number.isNaN(Number(e))?"—":Number(e).toFixed(s)}_showMoreInfo(e){let s=new Event("hass-more-info",{bubbles:!0,composed:!0});s.detail={entityId:e},this.dispatchEvent(s)}render(){return!this.hass||!this._config||!this._sensors.length?A``:A`
      <ha-card>
        ${this._config.title?A`<div class="title">${this._config.title}</div>`:""}
        <div class="grid">
          ${this._sensors.map(e=>{let s=this.hass.states[e.entity],o=s?Number(s.state):null,{color:i,level:n}=this._getLevelForValue(o,e.thresholds);return A`
              <div class="item">
                <div class="dots">
                  ${Array.from({length:nt}).map((c,l)=>{let d=nt-1-l,p=d<n,h=Vt[d];return A`
                      <div 
                        class="dot ${p?"on":""}" 
                        style="background: ${p?h:"var(--divider-color)"}">
                      </div>
                    `})}
                </div>
                <div class="row" @click=${()=>this._showMoreInfo(e.entity)}>
                  <div class="value">${this._formatValue(o,e.precision)}</div>
                  <div class="unit">${e.unit}</div>
                </div>
                <div class="label">${e.label}</div>
              </div>
            `})}
        </div>
      </ha-card>
    `}};$.styles=L`
    ha-card {
      padding: 12px;
    }
    .title {
      font-weight: 600;
      margin-bottom: 8px;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 8px 16px;
    }
    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .dots {
      display: grid;
      grid-template-rows: repeat(5, 8px);
      gap: 4px;
      justify-items: center;
      margin-bottom: 6px;
    }
    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--divider-color);
      opacity: 0.4;
    }
    .dot.on {
      opacity: 1;
    }
    .label {
      font-size: 12px;
      color: var(--secondary-text-color);
    }
    .value {
      font-size: 18px;
      font-weight: 600;
      line-height: 1.2;
    }
    .unit {
      font-size: 11px;
      color: var(--secondary-text-color);
      margin-left: 4px;
    }
    .row {
      display: flex;
      align-items: baseline;
      gap: 4px;
      cursor: pointer;
      user-select: none;
    }
    .row:hover .value {
      text-decoration: underline;
    }
  `,g([P({attribute:!1})],$.prototype,"hass",2),g([I()],$.prototype,"_config",2),g([I()],$.prototype,"_sensors",2),$=g([Y("awair-element-card")],$);window.customCards=window.customCards||[];window.customCards.push({type:"awair-element-card",name:"Awair Element Card",description:"Awair Element–style air quality card with official thresholds",version:"0.1.2",preview:!0});var Ie=$;export{$ as AwairElementCard,Ie as default};
//# sourceMappingURL=awair-element-card.js.map
