import{b as h,g as o,a6 as n,d as m,j as g,A as c,u as _,aS as p,a9 as $,a as N,l as C,w as j,e as x,n as v,f,B as O,m as w,_ as E,s as S}from"./index-428d8faa.js";const k=Symbol("rowContextKey"),B=h({tag:{type:String,default:"div"},span:{type:Number,default:24},offset:{type:Number,default:0},pull:{type:Number,default:0},push:{type:Number,default:0},xs:{type:o([Number,Object]),default:()=>n({})},sm:{type:o([Number,Object]),default:()=>n({})},md:{type:o([Number,Object]),default:()=>n({})},lg:{type:o([Number,Object]),default:()=>n({})},xl:{type:o([Number,Object]),default:()=>n({})}}),K=m({name:"ElCol"}),P=m({...K,props:B,setup(b){const t=b,{gutter:u}=g(k,{gutter:c(()=>0)}),a=_("col"),d=c(()=>{const e={};return u.value&&(e.paddingLeft=e.paddingRight=`${u.value/2}px`),e}),i=c(()=>{const e=[];return["span","offset","pull","push"].forEach(s=>{const l=t[s];p(l)&&(s==="span"?e.push(a.b(`${t[s]}`)):l>0&&e.push(a.b(`${s}-${t[s]}`)))}),["xs","sm","md","lg","xl"].forEach(s=>{p(t[s])?e.push(a.b(`${s}-${t[s]}`)):$(t[s])&&Object.entries(t[s]).forEach(([l,r])=>{e.push(l!=="span"?a.b(`${s}-${l}-${r}`):a.b(`${s}-${r}`))})}),u.value&&e.push(a.is("guttered")),[a.b(),e]});return(e,y)=>(N(),C(w(e.tag),{class:v(f(i)),style:O(f(d))},{default:j(()=>[x(e.$slots,"default")]),_:3},8,["class","style"]))}});var A=E(P,[["__file","/home/runner/work/element-plus/element-plus/packages/components/col/src/col.vue"]]);const L=S(A);export{L as E,k as r};
