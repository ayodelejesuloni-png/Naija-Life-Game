const defaults={cash:10000000,energy:100,mood:100,day:1,location:"Home",xp:0,level:1,property:false,inventory:["📱 Phone"]};
const state=Object.assign({},defaults);const $=id=>document.getElementById(id);const money=n=>"₦"+Math.max(0,Math.round(n)).toLocaleString("en-NG");
function render(){["cash","energy","mood","day","location","level"].forEach(k=>$(k).textContent=k==="cash"?money(state[k]):k==="energy"||k==="mood"?state[k]+"%":state[k]);$("xpText").textContent=state.xp+" / "+state.level*100;$("xpBar").style.width=Math.min(100,state.xp/(state.level*100)*100)+"%";$("missionStatus").textContent=state.cash>=500000?"Mission complete!":"₦"+Math.min(state.cash,500000).toLocaleString("en-NG")+" / ₦500,000"}
function log(msg){const li=document.createElement("li");li.textContent=msg;$("log").prepend(li);while($("log").children.length>8)$("log").lastChild.remove();$("message").textContent=msg}
function gainXP(n){state.xp+=n;while(state.xp>=state.level*100){state.xp-=state.level*100;state.level++;log("🎉 Level up! You are now Level "+state.level+".");}}
function spend(n){if(state.cash<n){log("Not enough cash for that move.");return false}state.cash-=n;return true}
function act(type){
if(type==="work"){if(state.energy<15)return log("You are too tired. Sleep or relax first.");state.cash+=250000;state.energy-=15;state.mood=Math.max(0,state.mood-3);state.location="Office";gainXP(20);log("You completed a work shift and earned ₦250,000.");}
if(type==="business"){if(state.energy<20)return log("Rest first before running your business.");const gain=120000+Math.floor(Math.random()*331000);state.cash+=gain;state.energy-=20;state.location="Business District";gainXP(30);log("Business day complete. Profit: "+money(gain)+".");}
if(type==="job"){if(state.energy<10)return log("You need more energy for a side hustle.");state.cash+=80000;state.energy-=10;state.location="City Road";gainXP(15);log("Side hustle complete. You earned ₦80,000.");}
if(type==="market"){if(!spend(20000))return;state.energy=Math.max(0,state.energy-8);state.location="Market";gainXP(5);state.inventory.push("🛍️ Market goods");log("You visited the market and spent ₦20,000.");}
if(type==="transport"){if(!spend(15000))return;state.energy=Math.max(0,state.energy-5);state.location="City Road";gainXP(5);log("You moved around town. Transport cost ₦15,000.");}
if(type==="bank"){state.location="Bank";log("Bank visit: your current balance is "+money(state.cash)+".");}
if(type==="property"){if(state.property)return log("You already own your starter property.");if(state.cash<3000000)return log("You need ₦3,000,000 to buy the starter house.");state.cash-=3000000;state.property=true;state.location="New Home";state.inventory.push("🔑 House keys");gainXP(80);log("🏠 Congratulations! You bought a starter house for ₦3,000,000.");}
if(type==="inventory"){state.location="Home";log("🎒 Inventory: "+state.inventory.join(", ")+".");}
if(type==="relax"){state.energy=Math.min(100,state.energy+10);state.mood=Math.min(100,state.mood+12);state.location="Home";log("You relaxed at home. Mood and energy improved.");}
if(type==="sleep"){state.day++;state.energy=100;state.mood=Math.min(100,state.mood+5);state.location="Home";log("You slept well. Day "+state.day+" has started.");}
render()}
document.querySelectorAll("[data-action]").forEach(b=>b.addEventListener("click",()=>act(b.dataset.action)));
$("saveBtn").onclick=()=>{localStorage.setItem("naijaLifeSave",JSON.stringify(state));log("Game saved on this device.");};
$("resetBtn").onclick=()=>{if(confirm("Reset your Naija Life save?")){Object.assign(state,JSON.parse(JSON.stringify(defaults)));localStorage.removeItem("naijaLifeSave");$("log").innerHTML="";log("New life started with ₦10,000,000.");render()}};
const saved=localStorage.getItem("naijaLifeSave");if(saved)Object.assign(state,JSON.parse(saved));render();log("Welcome to V0.2! Your mission is to earn ₦500,000.");
