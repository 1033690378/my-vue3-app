/* empty css             */import{E as i}from"./el-col-0fe7ed6c.js";import{E as p}from"./el-card-4bef427d.js";import{_ as d,a as g,b as m}from"./user-bcad7494.js";import{ac as f,a as u,l as h,w as a,K as w,k as s,q as t,ab as _,ag as v,ah as S}from"./index-4135a0d3.js";import{_ as x}from"./_plugin-vue_export-helper-c27b6911.js";const I={setup(){return{power:f().state.power,getImgSrc:e=>new URL(Object.assign({"../../assets/images/5.jpg":d,"../../assets/images/legend.jpg":g,"../../assets/images/user.jpg":m})[`../../assets/images/${e}.jpg`],self.location).href}}},b=o=>(v("data-v-9d5d5553"),o=o(),S(),o),j={class:"user"},y=["src"],E={class:"user-info"},U={class:"name"},k={class:"role"},B={class:"login-info"},C=b(()=>s("p",null,[_("上次登录时间："),s("span",null,"2023-6-10")],-1));function N(o,r,c,e,V,q){const n=p,l=i;return u(),h(l,{style:{"margin-top":"20px"}},{default:a(()=>[w(n,{class:"home"},{default:a(()=>[s("div",j,[s("img",{src:e.getImgSrc(e.power==0?"legend":"user"),alt:"个人头像"},null,8,y),s("div",E,[s("p",U,t(e.power==0?"Admin":"User"),1),s("p",k,t(e.power==0?"超级管理员":"管理员"),1)])]),s("div",B,[C,s("p",null,[_("上次登录地点："),s("span",null,t(e.power==0?"广州":"中山"),1)])])]),_:1})]),_:1})}const T=x(I,[["render",N],["__scopeId","data-v-9d5d5553"]]);export{T as default};