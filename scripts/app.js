(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const l of a)if(l.type==="childList")for(const o of l.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(a){const l={};return a.integrity&&(l.integrity=a.integrity),a.referrerPolicy&&(l.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?l.credentials="include":a.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function n(a){if(a.ep)return;a.ep=!0;const l=e(a);fetch(a.href,l)}})();const ct=!1;var $t=Array.isArray,Kt=Array.prototype.indexOf,Wt=Array.from,zt=Object.defineProperty,vt=Object.getOwnPropertyDescriptor,Gt=Object.getOwnPropertyDescriptors,Jt=Object.getPrototypeOf;const E=2,Et=4,lt=8,at=16,L=32,I=64,$=128,m=256,K=512,y=1024,F=2048,q=4096,W=8192,Q=16384,Qt=32768,Xt=65536,Zt=1<<19,yt=1<<20;function xt(t){return t===this.v}function tr(){throw new Error("https://svelte.dev/e/effect_update_depth_exceeded")}function rr(){throw new Error("https://svelte.dev/e/state_unsafe_local_read")}function er(){throw new Error("https://svelte.dev/e/state_unsafe_mutation")}let ot=!1,nr=!1;function lr(){ot=!0}const ar=2,or="http://www.w3.org/1999/xhtml";let g=null;function _t(t){g=t}function ur(t,r=!1,e){var n=g={p:g,c:null,d:!1,e:null,m:!1,s:t,x:null,l:null};ot&&!r&&(g.l={s:null,u:null,r1:[],r2:bt(!1)}),mr(()=>{n.d=!0})}function ir(t){const r=g;if(r!==null){const o=r.e;if(o!==null){var e=v,n=c;r.e=null;try{for(var a=0;a<o.length;a++){var l=o[a];P(l.effect),R(l.reaction),yr(l.fn)}}finally{P(e),R(n)}}g=r.p,r.m=!0}return{}}function X(){return!ot||g!==null&&g.l===null}const V=new Map;function bt(t,r){var e={f:0,v:t,reactions:null,equals:xt,rv:0,wv:0};return e}function sr(t){return fr(bt(t))}function fr(t){return c!==null&&!S&&(c.f&E)!==0&&(x===null?Fr([t]):x.push(t)),t}function cr(t,r){return c!==null&&!S&&X()&&(c.f&(E|at))!==0&&(x===null||!x.includes(t))&&er(),vr(t,r)}function vr(t,r){if(!t.equals(r)){var e=t.v;Z?V.set(t,r):V.set(t,e),t.v=r,t.wv=It(),Tt(t,F),X()&&v!==null&&(v.f&y)!==0&&(v.f&(L|I))===0&&(w===null?Or([t]):w.push(t))}return r}function Tt(t,r){var e=t.reactions;if(e!==null)for(var n=X(),a=e.length,l=0;l<a;l++){var o=e[l],i=o.f;(i&F)===0&&(!n&&o===v||(T(o,r),(i&(y|m))!==0&&((i&E)!==0?Tt(o,q):it(o))))}}var pt,Nt,St,kt;function _r(){if(pt===void 0){pt=window,Nt=/Firefox/.test(navigator.userAgent);var t=Element.prototype,r=Node.prototype;St=vt(r,"firstChild").get,kt=vt(r,"nextSibling").get,t.__click=void 0,t.__className=void 0,t.__attributes=null,t.__style=void 0,t.__e=void 0,Text.prototype.__t=void 0}}function pr(t=""){return document.createTextNode(t)}function Ft(t){return St.call(t)}function Ot(t){return kt.call(t)}function D(t,r){return Ft(t)}function dt(t,r=1,e=!1){let n=t;for(;r--;)n=Ot(n);return n}function dr(t){var r=E|F,e=c!==null&&(c.f&E)!==0?c:null;return v===null||e!==null&&(e.f&m)!==0?r|=m:v.f|=yt,{ctx:g,deps:null,effects:null,equals:xt,f:r,fn:t,reactions:null,rv:0,v:null,wv:0,parent:e??v}}function At(t){var r=t.effects;if(r!==null){t.effects=null;for(var e=0;e<r.length;e+=1)C(r[e])}}function hr(t){for(var r=t.parent;r!==null;){if((r.f&E)===0)return r;r=r.parent}return null}function gr(t){var r,e=v;P(hr(t));try{At(t),r=Vt(t)}finally{P(e)}return r}function Ct(t){var r=gr(t),e=(k||(t.f&m)!==0)&&t.deps!==null?q:y;T(t,e),t.equals(r)||(t.v=r,t.wv=It())}function wr(t,r){var e=r.last;e===null?r.last=r.first=t:(e.next=t,t.prev=e,r.last=t)}function B(t,r,e,n=!0){var a=v,l={ctx:g,deps:null,nodes_start:null,nodes_end:null,f:t|F,first:null,fn:r,last:null,next:null,parent:a,prev:null,teardown:null,transitions:null,wv:0};if(e)try{ut(l),l.f|=Qt}catch(s){throw C(l),s}else r!==null&&it(l);var o=e&&l.deps===null&&l.first===null&&l.nodes_start===null&&l.teardown===null&&(l.f&(yt|$))===0;if(!o&&n&&(a!==null&&wr(l,a),c!==null&&(c.f&E)!==0)){var i=c;(i.effects??(i.effects=[])).push(l)}return l}function mr(t){const r=B(lt,null,!1);return T(r,y),r.teardown=t,r}function Er(t){const r=B(I,t,!0);return(e={})=>new Promise(n=>{e.outro?Sr(r,()=>{C(r),n(void 0)}):(C(r),n(void 0))})}function yr(t){return B(Et,t,!1)}function xr(t,r=[],e=dr){const n=r.map(e);return br(()=>t(...n.map(st)))}function br(t,r=0){return B(lt|at|r,t,!0)}function Tr(t,r=!0){return B(lt|L,t,!0,r)}function Lt(t){var r=t.teardown;if(r!==null){const e=Z,n=c;ht(!0),R(null);try{r.call(null)}finally{ht(e),R(n)}}}function Mt(t,r=!1){var e=t.first;for(t.first=t.last=null;e!==null;){var n=e.next;(e.f&I)!==0?e.parent=null:C(e,r),e=n}}function Nr(t){for(var r=t.first;r!==null;){var e=r.next;(r.f&L)===0&&C(r),r=e}}function C(t,r=!0){var e=!1;if((r||(t.f&Zt)!==0)&&t.nodes_start!==null){for(var n=t.nodes_start,a=t.nodes_end;n!==null;){var l=n===a?null:Ot(n);n.remove(),n=l}e=!0}Mt(t,r&&!e),J(t,0),T(t,Q);var o=t.transitions;if(o!==null)for(const s of o)s.stop();Lt(t);var i=t.parent;i!==null&&i.first!==null&&Dt(t),t.next=t.prev=t.teardown=t.ctx=t.deps=t.fn=t.nodes_start=t.nodes_end=null}function Dt(t){var r=t.parent,e=t.prev,n=t.next;e!==null&&(e.next=n),n!==null&&(n.prev=e),r!==null&&(r.first===t&&(r.first=n),r.last===t&&(r.last=e))}function Sr(t,r){var e=[];Rt(t,e,!0),kr(e,()=>{C(t),r&&r()})}function kr(t,r){var e=t.length;if(e>0){var n=()=>--e||r();for(var a of t)a.out(n)}else r()}function Rt(t,r,e){if((t.f&W)===0){if(t.f^=W,t.transitions!==null)for(const o of t.transitions)(o.is_global||e)&&r.push(o);for(var n=t.first;n!==null;){var a=n.next,l=(n.f&Xt)!==0||(n.f&L)!==0;Rt(n,r,l?e:!1),n=a}}}let H=!1,et=!1,z=null,A=!1,Z=!1;function ht(t){Z=t}let Y=[];let c=null,S=!1;function R(t){c=t}let v=null;function P(t){v=t}let x=null;function Fr(t){x=t}let d=null,h=0,w=null;function Or(t){w=t}let Pt=1,G=0,k=!1;function It(){return++Pt}function tt(t){var f;var r=t.f;if((r&F)!==0)return!0;if((r&q)!==0){var e=t.deps,n=(r&m)!==0;if(e!==null){var a,l,o=(r&K)!==0,i=n&&v!==null&&!k,s=e.length;if(o||i){var _=t,N=_.parent;for(a=0;a<s;a++)l=e[a],(o||!((f=l==null?void 0:l.reactions)!=null&&f.includes(_)))&&(l.reactions??(l.reactions=[])).push(_);o&&(_.f^=K),i&&N!==null&&(N.f&m)===0&&(_.f^=m)}for(a=0;a<s;a++)if(l=e[a],tt(l)&&Ct(l),l.wv>t.wv)return!0}(!n||v!==null&&!k)&&T(t,y)}return!1}function Ar(t,r){for(var e=r;e!==null;){if((e.f&$)!==0)try{e.fn(t);return}catch{e.f^=$}e=e.parent}throw H=!1,t}function Cr(t){return(t.f&Q)===0&&(t.parent===null||(t.parent.f&$)===0)}function rt(t,r,e,n){if(H){if(e===null&&(H=!1),Cr(r))throw t;return}e!==null&&(H=!0);{Ar(t,r);return}}function qt(t,r,e=!0){var n=t.reactions;if(n!==null)for(var a=0;a<n.length;a++){var l=n[a];(l.f&E)!==0?qt(l,r,!1):r===l&&(e?T(l,F):(l.f&y)!==0&&T(l,q),it(l))}}function Vt(t){var p;var r=d,e=h,n=w,a=c,l=k,o=x,i=g,s=S,_=t.f;d=null,h=0,w=null,k=(_&m)!==0&&(S||!A||c===null),c=(_&(L|I))===0?t:null,x=null,_t(t.ctx),S=!1,G++;try{var N=(0,t.fn)(),f=t.deps;if(d!==null){var u;if(J(t,h),f!==null&&h>0)for(f.length=h+d.length,u=0;u<d.length;u++)f[h+u]=d[u];else t.deps=f=d;if(!k)for(u=h;u<f.length;u++)((p=f[u]).reactions??(p.reactions=[])).push(t)}else f!==null&&h<f.length&&(J(t,h),f.length=h);if(X()&&w!==null&&!S&&f!==null&&(t.f&(E|q|F))===0)for(u=0;u<w.length;u++)qt(w[u],t);return a!==null&&(G++,w!==null&&(n===null?n=w:n.push(...w))),N}finally{d=r,h=e,w=n,c=a,k=l,x=o,_t(i),S=s}}function Lr(t,r){let e=r.reactions;if(e!==null){var n=Kt.call(e,t);if(n!==-1){var a=e.length-1;a===0?e=r.reactions=null:(e[n]=e[a],e.pop())}}e===null&&(r.f&E)!==0&&(d===null||!d.includes(r))&&(T(r,q),(r.f&(m|K))===0&&(r.f^=K),At(r),J(r,0))}function J(t,r){var e=t.deps;if(e!==null)for(var n=r;n<e.length;n++)Lr(t,e[n])}function ut(t){var r=t.f;if((r&Q)===0){T(t,y);var e=v,n=g,a=A;v=t,A=!0;try{(r&at)!==0?Nr(t):Mt(t),Lt(t);var l=Vt(t);t.teardown=typeof l=="function"?l:null,t.wv=Pt;var o=t.deps,i;ct&&nr&&t.f&F}catch(s){rt(s,t,e,n||t.ctx)}finally{A=a,v=e}}}function Mr(){try{tr()}catch(t){if(z!==null)rt(t,z,null);else throw t}}function Dr(){var t=A;try{var r=0;for(A=!0;Y.length>0;){r++>1e3&&Mr();var e=Y,n=e.length;Y=[];for(var a=0;a<n;a++){var l=Pr(e[a]);Rr(l)}}}finally{et=!1,A=t,z=null,V.clear()}}function Rr(t){var r=t.length;if(r!==0)for(var e=0;e<r;e++){var n=t[e];if((n.f&(Q|W))===0)try{tt(n)&&(ut(n),n.deps===null&&n.first===null&&n.nodes_start===null&&(n.teardown===null?Dt(n):n.fn=null))}catch(a){rt(a,n,null,n.ctx)}}}function it(t){et||(et=!0,queueMicrotask(Dr));for(var r=z=t;r.parent!==null;){r=r.parent;var e=r.f;if((e&(I|L))!==0){if((e&y)===0)return;r.f^=y}}Y.push(r)}function Pr(t){for(var r=[],e=t;e!==null;){var n=e.f,a=(n&(L|I))!==0,l=a&&(n&y)!==0;if(!l&&(n&W)===0){if((n&Et)!==0)r.push(e);else if(a)e.f^=y;else{var o=c;try{c=e,tt(e)&&ut(e)}catch(_){rt(_,e,null,e.ctx)}finally{c=o}}var i=e.first;if(i!==null){e=i;continue}}var s=e.parent;for(e=e.next;e===null&&s!==null;)e=s.next,s=s.parent}return r}function st(t){var r=t.f,e=(r&E)!==0;if(c!==null&&!S){x!==null&&x.includes(t)&&rr();var n=c.deps;t.rv<G&&(t.rv=G,d===null&&n!==null&&n[h]===t?h++:d===null?d=[t]:(!k||!d.includes(t))&&d.push(t))}else if(e&&t.deps===null&&t.effects===null){var a=t,l=a.parent;l!==null&&(l.f&m)===0&&(a.f^=m)}return e&&(a=t,tt(a)&&Ct(a)),Z&&V.has(t)?V.get(t):t.v}const Ir=-7169;function T(t,r){t.f=t.f&Ir|r}const qr=["touchstart","touchmove"];function Vr(t){return qr.includes(t)}const Bt=new Set,nt=new Set;function Br(t){for(var r=0;r<t.length;r++)Bt.add(t[r]);for(var e of nt)e(t)}function j(t){var ft;var r=this,e=r.ownerDocument,n=t.type,a=((ft=t.composedPath)==null?void 0:ft.call(t))||[],l=a[0]||t.target,o=0,i=t.__root;if(i){var s=a.indexOf(i);if(s!==-1&&(r===document||r===window)){t.__root=r;return}var _=a.indexOf(r);if(_===-1)return;s<=_&&(o=s)}if(l=a[o]||t.target,l!==r){zt(t,"currentTarget",{configurable:!0,get(){return l||e}});var N=c,f=v;R(null),P(null);try{for(var u,p=[];l!==null;){var b=l.assignedSlot||l.parentNode||l.host||null;try{var O=l["__"+n];if(O!=null&&(!l.disabled||t.target===l))if($t(O)){var[Ht,...Yt]=O;Ht.apply(l,[t,...Yt])}else O.call(l,t)}catch(U){u?p.push(U):u=U}if(t.cancelBubble||b===r||b===null)break;l=b}if(u){for(let U of p)queueMicrotask(()=>{throw U});throw u}}finally{t.__root=r,delete t.currentTarget,R(N),P(f)}}}function Ur(t){var r=document.createElement("template");return r.innerHTML=t,r.content}function jr(t,r){var e=v;e.nodes_start===null&&(e.nodes_start=t,e.nodes_end=r)}function Ut(t,r){var e=(r&ar)!==0,n,a=!t.startsWith("<!>");return()=>{n===void 0&&(n=Ur(a?t:"<!>"+t),n=Ft(n));var l=e||Nt?document.importNode(n,!0):n.cloneNode(!0);return jr(l,l),l}}function jt(t,r){t!==null&&t.before(r)}function Hr(t,r){var e=r==null?"":typeof r=="object"?r+"":r;e!==(t.__t??(t.__t=t.nodeValue))&&(t.__t=e,t.nodeValue=e+"")}function Yr(t,r){return $r(t,r)}const M=new Map;function $r(t,{target:r,anchor:e,props:n={},events:a,context:l,intro:o=!0}){_r();var i=new Set,s=f=>{for(var u=0;u<f.length;u++){var p=f[u];if(!i.has(p)){i.add(p);var b=Vr(p);r.addEventListener(p,j,{passive:b});var O=M.get(p);O===void 0?(document.addEventListener(p,j,{passive:b}),M.set(p,1)):M.set(p,O+1)}}};s(Wt(Bt)),nt.add(s);var _=void 0,N=Er(()=>{var f=e??r.appendChild(pr());return Tr(()=>{if(l){ur({});var u=g;u.c=l}a&&(n.$$events=a),_=t(f,n)||{},l&&ir()}),()=>{var b;for(var u of i){r.removeEventListener(u,j);var p=M.get(u);--p===0?(document.removeEventListener(u,j),M.delete(u)):M.set(u,p)}nt.delete(s),f!==e&&((b=f.parentNode)==null||b.removeChild(f))}});return Kr.set(_,N),_}let Kr=new WeakMap;const Wr=Symbol("is custom element"),zr=Symbol("is html");function gt(t,r,e,n){var a=Gr(t);a[r]!==(a[r]=e)&&(e==null?t.removeAttribute(r):typeof e!="string"&&Jr(t).includes(r)?t[r]=e:t.setAttribute(r,e))}function Gr(t){return t.__attributes??(t.__attributes={[Wr]:t.nodeName.includes("-"),[zr]:t.namespaceURI===or})}var wt=new Map;function Jr(t){var r=wt.get(t.nodeName);if(r)return r;wt.set(t.nodeName,r=[]);for(var e,n=t,a=Element.prototype;a!==n;){e=Gt(n);for(var l in e)e[l].set&&r.push(l);n=Jt(n)}return r}const Qr="5";var mt;typeof window<"u"&&((mt=window.__svelte??(window.__svelte={})).v??(mt.v=new Set)).add(Qr);lr();const Xr="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20aria-hidden='true'%20role='img'%20class='iconify%20iconify--logos'%20width='26.6'%20height='32'%20preserveAspectRatio='xMidYMid%20meet'%20viewBox='0%200%20256%20308'%3e%3cpath%20fill='%23FF3E00'%20d='M239.682%2040.707C211.113-.182%20154.69-12.301%20113.895%2013.69L42.247%2059.356a82.198%2082.198%200%200%200-37.135%2055.056a86.566%2086.566%200%200%200%208.536%2055.576a82.425%2082.425%200%200%200-12.296%2030.719a87.596%2087.596%200%200%200%2014.964%2066.244c28.574%2040.893%2084.997%2053.007%20125.787%2027.016l71.648-45.664a82.182%2082.182%200%200%200%2037.135-55.057a86.601%2086.601%200%200%200-8.53-55.577a82.409%2082.409%200%200%200%2012.29-30.718a87.573%2087.573%200%200%200-14.963-66.244'%3e%3c/path%3e%3cpath%20fill='%23FFF'%20d='M106.889%20270.841c-23.102%206.007-47.497-3.036-61.103-22.648a52.685%2052.685%200%200%201-9.003-39.85a49.978%2049.978%200%200%201%201.713-6.693l1.35-4.115l3.671%202.697a92.447%2092.447%200%200%200%2028.036%2014.007l2.663.808l-.245%202.659a16.067%2016.067%200%200%200%202.89%2010.656a17.143%2017.143%200%200%200%2018.397%206.828a15.786%2015.786%200%200%200%204.403-1.935l71.67-45.672a14.922%2014.922%200%200%200%206.734-9.977a15.923%2015.923%200%200%200-2.713-12.011a17.156%2017.156%200%200%200-18.404-6.832a15.78%2015.78%200%200%200-4.396%201.933l-27.35%2017.434a52.298%2052.298%200%200%201-14.553%206.391c-23.101%206.007-47.497-3.036-61.101-22.649a52.681%2052.681%200%200%201-9.004-39.849a49.428%2049.428%200%200%201%2022.34-33.114l71.664-45.677a52.218%2052.218%200%200%201%2014.563-6.398c23.101-6.007%2047.497%203.036%2061.101%2022.648a52.685%2052.685%200%200%201%209.004%2039.85a50.559%2050.559%200%200%201-1.713%206.692l-1.35%204.116l-3.67-2.693a92.373%2092.373%200%200%200-28.037-14.013l-2.664-.809l.246-2.658a16.099%2016.099%200%200%200-2.89-10.656a17.143%2017.143%200%200%200-18.398-6.828a15.786%2015.786%200%200%200-4.402%201.935l-71.67%2045.674a14.898%2014.898%200%200%200-6.73%209.975a15.9%2015.9%200%200%200%202.709%2012.012a17.156%2017.156%200%200%200%2018.404%206.832a15.841%2015.841%200%200%200%204.402-1.935l27.345-17.427a52.147%2052.147%200%200%201%2014.552-6.397c23.101-6.006%2047.497%203.037%2061.102%2022.65a52.681%2052.681%200%200%201%209.003%2039.848a49.453%2049.453%200%200%201-22.34%2033.12l-71.664%2045.673a52.218%2052.218%200%200%201-14.563%206.398'%3e%3c/path%3e%3c/svg%3e",Zr="/vite.svg",te=(t,r)=>{cr(r,st(r)+1)};var re=Ut("<button> </button>");function ee(t){let r=sr(0);var e=re();e.__click=[te,r];var n=D(e);xr(()=>Hr(n,`count is ${st(r)??""}`)),jt(t,e)}Br(["click"]);var ne=Ut('<main><div><a href="https://vite.dev" target="_blank" rel="noreferrer"><img class="logo svelte-11cv5lq" alt="Vite Logo"></a> <a href="https://svelte.dev" target="_blank" rel="noreferrer"><img class="logo svelte svelte-11cv5lq" alt="Svelte Logo"></a></div> <h1>Vite + Svelte</h1> <div class="card"><!></div> <p>Check out <a href="https://github.com/sveltejs/kit#readme" target="_blank" rel="noreferrer">SvelteKit</a>, the official Svelte app framework powered by Vite!</p> <p class="read-the-docs svelte-11cv5lq">Click on the Vite and Svelte logos to learn more</p></main>');function le(t){var r=ne(),e=D(r),n=D(e),a=D(n);gt(a,"src",Zr);var l=dt(n,2),o=D(l);gt(o,"src",Xr);var i=dt(e,4),s=D(i);ee(s),jt(t,r)}Yr(le,{target:document.getElementById("app")});
//# sourceMappingURL=app.js.map
