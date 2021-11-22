(this["webpackJsonpsecret-santafier"]=this["webpackJsonpsecret-santafier"]||[]).push([[0],{21:function(e,t,n){},32:function(e,t,n){"use strict";n.r(t);var c=n(1),s=n.n(c),a=n(14),r=n.n(a),i=(n(21),n(7)),l=n(2),d=n(0);function o(e){var t=e.children,n="h-2 w-full shadow-md bg-red-500";return Object(d.jsx)("main",{className:"flex justify-center items-center h-screen bg-green-400",children:Object(d.jsx)("div",{className:"w-full max-w-lg",children:Object(d.jsxs)("div",{className:"h-auto bg-white shadow-lg rounded-lg pt-6 text-white",children:[Object(d.jsx)("div",{className:n}),Object(d.jsx)("div",{className:"h-20 w-full bg-red-500 mt-2 mb-2 flex justify-center items-center shadow-md",children:Object(d.jsx)(i.b,{to:"/",children:Object(d.jsx)("h1",{className:"text-white font-bold font-display text-4xl",children:"SECRET SANTA-FIER"})})}),Object(d.jsx)("div",{className:n}),t]})})})}function j(){var e="h-2 w-full shadow-md bg-red-500";return Object(d.jsxs)(d.Fragment,{children:[Object(d.jsx)("div",{className:"flex justify-center items-center text-xl text-red-500 font-bold h-24",children:Object(d.jsx)("h2",{children:"Create a Group to begin"})}),Object(d.jsx)("div",{className:e}),Object(d.jsx)("div",{className:"h-20 flex flex-row-reverse justify-evenly items-center mt-2 mb-2 bg-red-500 shadow-md",children:Object(d.jsx)(i.b,{to:"/register",children:Object(d.jsx)("button",{className:"transition-all duration-500 hover:bg-white shadow-md font-bold px-2 py-3 rounded-md text-lg hover:text-red-500 border-2 border-white bg-red-500 text-white",children:"Create Group"})})}),Object(d.jsx)("div",{className:e})]})}var u=n(6),b=n.n(u),m=n(8),x=n(3);function h(e){var t=e.heading,n=e.body,c=Object(l.f)();return Object(d.jsx)("div",{className:"fixed flex justify-center items-center inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full",id:"modal",children:Object(d.jsx)("div",{className:" p-5 border rounded-md w-96 shadow-lg bg-white",children:Object(d.jsxs)("div",{className:"mt-3 text-center",children:[Object(d.jsx)("div",{className:"h-2 w-full shadow-md bg-red-500"}),Object(d.jsx)("div",{className:"h-16 w-full bg-red-500 mt-2 mb-2 flex justify-center items-center shadow-md",children:Object(d.jsx)("h3",{class:"text-2xl font-display text-white",children:t})}),Object(d.jsx)("div",{className:"h-2 w-full shadow-md bg-red-500"}),Object(d.jsx)("div",{className:"text-gray-800 font-semibold p-3",children:Object(d.jsx)("p",{children:n})}),Object(d.jsx)("div",{class:"items-center px-4 py-3",children:Object(d.jsx)("button",{id:"ok-btn",class:"px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md shadow-sm transition-all duration-500 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-green-300",onClick:function(e){c.push("/")},children:"Close"})})]})})})}function f(){var e=Object(c.useState)(""),t=Object(x.a)(e,2),n=t[0],s=t[1],a=Object(c.useState)(""),r=Object(x.a)(a,2),i=r[0],l=r[1],o=Object(c.useState)(""),j=Object(x.a)(o,2),u=j[0],f=j[1],O=Object(c.useState)(""),g=Object(x.a)(O,2),p=g[0],v=g[1],y=Object(c.useState)(""),N=Object(x.a)(y,2),w=N[0],S=N[1],C=Object(c.useState)(!1),k=Object(x.a)(C,2),E=k[0],A=k[1],T=Object(c.useState)(1),M=Object(x.a)(T,2),F=M[0],D=M[1],I=Object(c.useState)(""),P=Object(x.a)(I,2),B=P[0],L=P[1],G=Object(c.useState)(!1),J=Object(x.a)(G,2),Y=J[0],R=J[1];function U(){return(U=Object(m.a)(b.a.mark((function e(t){var c,s,a,r,l;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:for(t.preventDefault(),c=Date.parse(p),s=new Date(c).toLocaleString("default",{month:"long",year:"numeric",day:"numeric"}),a=0;a<F;a++)q.push({name:document.getElementById("Member ".concat(a," name")).value,email:document.getElementById("Member ".concat(a," email")).value});return console.log(Y),r={group:{name:n,admin:u,adminEmail:i,exchangeDate:s,spendLimit:w,useAddress:Y},members:q},e.next=8,fetch("/api/group-register",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(r)});case 8:if(l=e.sent,console.log(l.json()),200!==l.status){e.next=13;break}return A(!0),e.abrupt("return",{success:!0});case 13:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var q=[];return Object(c.useEffect)((function(){for(var e=[],t=0;t<F;t++)e.push({name:"Member ".concat(t," name"),email:"Member ".concat(t," email")});L(e.map((function(e){var t=e.name,n=e.email;return Object(d.jsxs)("div",{className:"flex items-center justify-around mb-2",children:[Object(d.jsxs)("div",{children:[Object(d.jsx)("div",{children:Object(d.jsx)("label",{children:"Name"})}),Object(d.jsx)("div",{children:Object(d.jsx)("input",{name:t,id:t,type:"text",className:"bg-gray-100 border-2 rounded-md"})})]}),Object(d.jsxs)("div",{children:[Object(d.jsx)("div",{children:Object(d.jsx)("label",{children:"Email"})}),Object(d.jsx)("div",{children:Object(d.jsx)("input",{name:n,id:n,type:"email",className:"bg-gray-100 border-2 rounded-md"})})]})]},t)})))}),[F]),Object(d.jsxs)(d.Fragment,{children:[!0===E?Object(d.jsx)(h,{heading:"Group Added!",body:"You will get an email when all group members have confirmed."}):null,Object(d.jsxs)("form",{onSubmit:function(e){!function(e){U.apply(this,arguments)}(e)},className:"text-gray-600 font-bold mt-5",children:[Object(d.jsxs)("div",{className:"flex justify-center mb-5",children:[Object(d.jsx)("div",{className:"w-1/3",children:Object(d.jsx)("label",{children:"Name"})}),Object(d.jsx)("div",{children:Object(d.jsx)("input",{type:"text",value:u,onChange:function(e){return f(e.target.value)},className:"bg-gray-100 border-2 rounded-md"})})]}),Object(d.jsxs)("div",{className:"flex justify-center mb-5",children:[Object(d.jsx)("div",{className:"w-1/3",children:Object(d.jsx)("label",{children:"Group Name"})}),Object(d.jsx)("div",{children:Object(d.jsx)("input",{type:"text",value:n,onChange:function(e){return s(e.target.value)},className:"bg-gray-100 border-2 rounded-md"})})]}),Object(d.jsxs)("div",{className:"flex justify-center mb-5",children:[Object(d.jsx)("div",{className:"w-1/3",children:Object(d.jsx)("label",{children:"Email"})}),Object(d.jsx)("div",{children:Object(d.jsx)("input",{value:i,onChange:function(e){return l(e.target.value)},type:"email",className:"bg-gray-100 border-2 rounded-md"})})]}),Object(d.jsxs)("div",{className:"flex justify-center mb-5",children:[Object(d.jsx)("div",{className:"w-1/3",children:Object(d.jsx)("label",{children:"Spending Limit"})}),Object(d.jsx)("div",{children:Object(d.jsx)("input",{value:w,onChange:function(e){return S(e.target.value)},type:"number",className:"bg-gray-100 border-2 rounded-md"})})]}),Object(d.jsxs)("div",{className:"flex justify-center mb-5",children:[Object(d.jsx)("div",{className:"w-1/3",children:Object(d.jsx)("label",{children:"Gift Exchange Date"})}),Object(d.jsx)("div",{children:Object(d.jsx)("input",{value:p,onChange:function(e){return v(e.target.value)},type:"date",className:"bg-gray-100 border-2 rounded-md"})})]}),Object(d.jsxs)("div",{className:"flex justify-center mb-5",children:[Object(d.jsx)("div",{className:"w-1/3",children:Object(d.jsx)("label",{children:"Include Mailing Address?"})}),Object(d.jsx)("div",{children:Object(d.jsx)("input",{onChange:function(e){return R(!Y)},type:"checkbox",className:"h-6 w-6 bg-gray-100 border-2 rounded-md mt-3"})})]}),Object(d.jsxs)("div",{className:"flex flex-col flex-wrap justify-around p-2",children:[B,Object(d.jsx)("div",{className:"flex justify-center mt-2",children:Object(d.jsxs)("div",{className:"flex items-center w-1/5 justify-around",children:[Object(d.jsx)("button",{onClick:function(e){return D(F+1)},type:"button",className:"material-icons-outlined text-white bg-green-400 rounded-md p-1",children:"add"}),Object(d.jsx)("button",{onClick:function(e){return D(F-1)},type:"button",className:"material-icons-outlined text-white bg-red-500 rounded-md p-1",children:"remove"})]})})]}),Object(d.jsx)("div",{className:"flex justify-center p-3 ",children:Object(d.jsx)("button",{className:"btn bg-red-500 px-2 py-1 rounded-md font-display font-bold text-white text-lg",type:"submit",value:"Submit",children:"SUBMIT"})})]})]})}function O(e){var t,n=e.token,s=e.display,a=Object(c.useState)(""),r=Object(x.a)(a,2),i=r[0],l=r[1],o=Object(c.useState)(""),j=Object(x.a)(o,2),u=j[0],f=j[1],O=Object(c.useState)(""),g=Object(x.a)(O,2),p=g[0],v=g[1],y=Object(c.useState)(""),N=Object(x.a)(y,2),w=N[0],S=N[1],C=Object(c.useState)(0),k=Object(x.a)(C,2),E=k[0],A=k[1];function T(){return(T=Object(m.a)(b.a.mark((function e(t){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.next=3,fetch("/api/address",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({token:n,address:"".concat(i," ").concat(u,", ").concat(p," ").concat(w)})});case 3:if(200!==e.sent.status){e.next=9;break}return A(!0),e.abrupt("return");case 9:alert("An error occurred.");case 10:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return t=s?"transition-all h-80 ease-in-out duration-700 bg-red-500 rounded-b-lg w-full p-5 font-bold":"transition-all h-0 opacity-0 ease-in-out duration-700 bg-red-500 rounded-b-lg w-full p-5 font-bold ",Object(d.jsxs)("div",{className:t,children:[E?Object(d.jsx)(h,{heading:"Address Added!",body:"You will get an email once all group members have confirmed."}):null,Object(d.jsxs)("form",{onSubmit:function(e){return T.apply(this,arguments)},className:"w-full flex flex-col items-center",children:[Object(d.jsxs)("div",{className:"flex flex-col",children:[Object(d.jsx)("label",{children:"Street or Box Number"}),Object(d.jsx)("input",{className:"rounded p-1 text-gray-700 font-semibold focus:outline-green",value:i,onChange:function(e){return l(e.target.value)}})]}),Object(d.jsxs)("div",{className:"flex flex-col",children:[Object(d.jsx)("label",{children:"City"}),Object(d.jsx)("input",{className:"rounded p-1 text-gray-700 font-semibold focus:outline-green",value:u,onChange:function(e){return f(e.target.value)}})]}),Object(d.jsxs)("div",{className:"flex flex-col",children:[Object(d.jsx)("label",{children:"State"}),Object(d.jsx)("input",{className:"rounded p-1 text-gray-700 font-semibold focus:outline-green",value:p,onChange:function(e){return v(e.target.value)}})]}),Object(d.jsxs)("div",{className:"flex flex-col",children:[Object(d.jsx)("label",{children:"Postal Code"}),Object(d.jsx)("input",{className:"rounded p-1 text-gray-700 font-semibold focus:outline-green",value:w,type:"tel",onChange:function(e){return S(e.target.value)}}),Object(d.jsx)("div",{className:"w-full flex justify-end",children:Object(d.jsx)("button",{className:"transition-all duration-500 p-2 border-white border-4 mt-3 mr-1 rounded-md text-lg font-bold hover:bg-white hover:text-red-500",value:"Submit",type:"submit",children:"Submit"})})]})]})]})}function g(e){return Object(d.jsx)("button",{onClick:function(t){return e.function(!e.value)},className:"w-36 mt-6 transition-all duration-500 rounded-md bg-red-500 border-2 border-white p-3 font-semibold text-white hover:bg-green-400",children:e.text})}function p(){var e=Object(c.useState)(!1),t=Object(x.a)(e,2),n=t[0],s=t[1],a=Object(c.useState)(!1),r=Object(x.a)(a,2),i=r[0],o=r[1],j=Object(c.useState)(!1),u=Object(x.a)(j,2),f=u[0],p=u[1],v=Object(c.useState)(0),y=Object(x.a)(v,2),N=y[0],w=y[1],S=function(){var e=Object(l.g)().search;return Object(c.useMemo)((function(){return new URLSearchParams(e)}),[e])}().get("token");return console.log(S),Object(c.useEffect)((function(){function e(){return(e=Object(m.a)(b.a.mark((function e(){var t;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/api/verify-email",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({token:S})});case 2:200===(t=e.sent).status?t.json().then((function(e){return o(e.token)})):p(!0);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[S]),console.log(i),Object(d.jsxs)(d.Fragment,{children:[Object(d.jsxs)("div",{className:"flex flex-col items-center justify-center p-10 text-gray-700 font-bold",children:[N?Object(d.jsx)(h,{heading:"Address Added!",body:"You will get an email once all group members have confirmed."}):null,f?Object(d.jsx)(h,{heading:"Oops!",body:"Your token is invalid; please double-check the url you received in your email."}):Object(d.jsx)("h3",{children:"Email verification successful!"}),i?Object(d.jsx)(g,{value:n,function:s,text:"Enter Mailing Address"}):Object(d.jsx)(g,{value:N,function:w,text:"Next"})]}),Object(d.jsx)(O,{token:i,display:n})]})}var v=function(){return Object(d.jsx)(i.a,{children:Object(d.jsx)(o,{children:Object(d.jsxs)(l.c,{children:[Object(d.jsx)(l.a,{exact:!0,path:"/",children:Object(d.jsx)(j,{})}),Object(d.jsx)(l.a,{path:"/register",children:Object(d.jsx)(f,{})}),Object(d.jsx)(l.a,{path:"/group",children:Object(d.jsx)(p,{})})]})})})},y=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,33)).then((function(t){var n=t.getCLS,c=t.getFID,s=t.getFCP,a=t.getLCP,r=t.getTTFB;n(e),c(e),s(e),a(e),r(e)}))};r.a.render(Object(d.jsx)(s.a.StrictMode,{children:Object(d.jsx)(v,{})}),document.getElementById("root")),y()}},[[32,1,2]]]);
//# sourceMappingURL=main.5457451c.chunk.js.map