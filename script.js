var IMG="ahmed.webp";
// Edit these entries with your real team details (photo: add img:"data:..." or a data URI).
var team=[
 {name:"Ahmed Saleh",img:IMG,summary:"Data Analyst with hands-on experience in Advanced SQL, Python, Power BI, Tableau, and Excel, specializing in data analysis, data manipulation, exploratory data analysis, KPI analysis, data modeling, and data visualization. Experienced in transforming complex datasets into actionable insights, identifying trends, and supporting data-driven business decisions. Skilled in translating business questions and analytical requirements into clear insights, developing interactive dashboards, and communicating findings through effective data storytelling. Strong foundation in data warehousing, ETL, dimensional modeling, and statistical analysis with a passion for analytics and continuous learning.",role:"Add Ahmed’s job title and responsibilities here.",phone:"+20 100 000 0000"},
 {name:"Team Member 2",summary:"Short summary for this team member.",role:"Job title and responsibilities.",phone:"+20 100 000 0001"},
 {name:"Team Member 3",summary:"Short summary for this team member.",role:"Job title and responsibilities.",phone:"+20 100 000 0002"},
 {name:"Team Member 4",summary:"Short summary for this team member.",role:"Job title and responsibilities.",phone:"+20 100 000 0003"},
 {name:"Team Member 5",summary:"Short summary for this team member.",role:"Job title and responsibilities.",phone:"+20 100 000 0004"},
 {name:"Team Member 6",summary:"Short summary for this team member.",role:"Job title and responsibilities.",phone:"+20 100 000 0005"},
 {name:"Team Member 7",summary:"Short summary for this team member.",role:"Job title and responsibilities.",phone:"+20 100 000 0006"},
 {name:"Team Member 8",summary:"Short summary for this team member.",role:"Job title and responsibilities.",phone:"+20 100 000 0007"}
];
var i=0,open=null,busy=false,first=true;
var $=function(s){return document.querySelector(s)};
var stage=$("#stage"),tabs={summary:$("#t-summary"),role:$("#t-role")};
var titles={summary:"Summary",role:"Role",phone:"Contact"};

function fit(){
 var w=innerWidth,h=innerHeight,narrow=w<760;
 var s=narrow?Math.min(w/1380,h/1117):Math.min(w/1728,h/1117);
 var shift=narrow?-(1728/2-(300+1620)/2):0; // centre the content on small screens
 stage.style.transform="translate(calc(-50% + "+shift*s+"px),-50%) scale("+s+")";
}
addEventListener("resize",fit);fit();

function initials(n){return n.split(" ").map(function(w){return w[0]}).slice(-2).join("")}
function esc(t){return t.replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}

function showPortrait(dx){
 var m=team[i],v=document.createElement("div");
 v.className="pv in";v.style.setProperty("--dx",dx);
 v.innerHTML=m.img?'<img alt="'+esc(m.name)+'" src="'+m.img+'" draggable="false">':'<div class="ph" role="img" aria-label="'+esc(m.name)+'">'+initials(m.name)+'</div>';
 $("#par").appendChild(v);
}
function showGreeting(base){
 var g=$("#greet");g.style.setProperty("--base",base+"s");
 g.innerHTML='<span class="ln"><span style="--i:0">Hello,</span></span><span class="ln"><span style="--i:1">I’m '+esc(team[i].name)+'</span></span>';
}
function changeName(){var g=$("#greet");g.style.setProperty("--base",".02s");g.lastElementChild.innerHTML='<span style="--i:0">I’m '+esc(team[i].name)+'</span>'}
function showCount(dy){
 var c=$("#count");c.innerHTML='<span style="--dy:'+dy+'">'+(i+1)+' / '+team.length+'</span>';
}
function renderPanel(){
 var p=$("#panel");
 for(var k in tabs){tabs[k].classList.toggle("on",open===k&&k==="phone"||open===k&&k!=="phone");tabs[k].setAttribute("aria-expanded",open===k)}
 // Summary & Role keep their blue look; only the active one gets the halo
 tabs.summary.classList.toggle("blue",true);tabs.role.classList.toggle("blue",true);
 $("#scrim").classList.toggle("show",!!open);if(!open){p.classList.remove("show");return}
 var m=team[i],body=open==="phone"?'<a href="tel:'+m.phone.replace(/\s/g,"")+'">'+esc(m.phone)+'</a>':'<p>'+esc(m[open])+'</p>';
 p.innerHTML='<button class="x" aria-label="Close">×</button><h2 class="b">'+titles[open]+'</h2><div class="b" style="animation-delay:.07s">'+body+'</div>';
 p.classList.add("show");p.querySelector(".x").onclick=function(){open=null;renderPanel()};
}
function go(d){
 if(busy)return;busy=true;
 var old=$("#par").querySelector(".pv");if(old){old.classList.add("out");old.style.setProperty("--dx",d)}
 setTimeout(function(){
  i=(i+d+team.length)%team.length;
  if(old)old.remove();showPortrait(d);changeName();showCount(d);renderPanel();
  setTimeout(function(){busy=false},500);
 },280);
}
function toggle(k){open=(open===k)?null:k;renderPanel()}
tabs.summary.onclick=function(){toggle("summary")};
tabs.role.onclick=function(){toggle("role")};
$("#scrim").onclick=function(){open=null;renderPanel()};
$("#next").onclick=function(){go(1)};$("#prev").onclick=function(){go(-1)};
addEventListener("keydown",function(e){if(e.key==="ArrowRight")go(1);if(e.key==="ArrowLeft")go(-1);if(e.key==="Escape"){open=null;renderPanel()}});

// swipe
var sx=null;
stage.addEventListener("pointerdown",function(e){sx=e.clientX});
addEventListener("pointerup",function(e){if(sx!==null&&Math.abs(e.clientX-sx)>70)go(e.clientX<sx?1:-1);sx=null});
addEventListener("pointermove",function(e){if(e.pointerType==="touch")return;
 stage.style.setProperty("--mx",(e.clientX/innerWidth-.5)*2);stage.style.setProperty("--my",(e.clientY/innerHeight-.5)*2)});
showPortrait(0);$("#par").lastElementChild.style.animationDelay=".15s";showGreeting(.5);showCount(1);renderPanel();
