(function(){
var Q=[
[["fee","fees"],"How are seller fees calculated?","Each platform charges its own fees. For example, Etsy charges a $0.20 listing fee plus 6.5% of the sale price, and eBay charges a final value fee that varies by category. Enter your item price in the calculator and it applies the published rates."],
[["profit"],"How is my profit calculated?","Profit = sale price minus platform fees, minus shipping costs, minus product cost. The calculators show this breakdown so you can see where the money goes."],
[["ship","weight","dimensional"],"What is dimensional weight?","Carriers charge by the greater of actual weight and dimensional weight. Dimensional weight = (length x width x height) / divisor. The divisor is 139 for UPS and FedEx, and 139 for USPS in most cases. The dimensional weight calculator does this math for you."],
[["source","stand"],"Where do the fee rates come from?","Every fee page shows a Stand date (October 2026) and a source link to the platform's own fee page. If a rate is unverified, the page says so. Always confirm the rate on the platform's own fee page before you price."],
[["estimate","accurate","exact"],"Are the results exact?","No. Results are estimates and general information only. Platforms change fees, and your contract terms may differ. Always confirm the final fee on the platform's own fee page."],
[["contact","email"],"How do I contact SellerCalc?","Use the form on the Contact page, or email armanzaheer808@gmail.com. If you spot a fee error, include the platform, the rate you see, and a link to the platform page where you saw it."],
[["use"],"How do I use a calculator?","Enter your own numbers and the result updates instantly. Use the result as a guide, then confirm the final fee on the platform's own page."],
];
function el(t,c,h){var e=document.createElement(t);if(c)e.className=c;if(h!==undefined)e.innerHTML=h;return e;}
var btn=el("button","chatbtn","SellerCalc Bot");
var panel=el("div","chatpanel"); panel.style.display="none";
panel.appendChild(el("div","chathead","SellerCalc Help <span>FAQ bot, not AI chat. Nothing you type leaves your browser</span>"));
var body=el("div","chatbody"); var quick=el("div","chatquick");
Q.forEach(function(q){var b=el("button","chatq",q[1]); b.type="button"; b.onclick=function(){ask(q);}; quick.appendChild(b);});
body.appendChild(quick); var log=el("div","chatlog"); body.appendChild(log);
var inp=el("input"); inp.placeholder="Type your question..."; inp.setAttribute("aria-label","Type your question");
var send=el("button","chatsend","Send"); send.type="button";
function say(who,txt){var d=el("div","chatmsg"); var b=document.createElement("b"); b.textContent=who+": "; d.appendChild(b); d.appendChild(document.createTextNode(txt)); log.appendChild(d); log.scrollTop=log.scrollHeight;}
function ask(q){say("You",q[1]); say("Bot",q[2]+" These are estimates, not financial or tax advice.");}
function answerFree(t){
  t=t.toLowerCase();
  for(var i=0;i<Q.length;i++){ for(var k=0;k<Q[i][0].length;k++){ if(t.indexOf(Q[i][0][k])>-1){ ask(Q[i]); return; } } }
  if(t.indexOf("hello")>-1){ say("You",inp.value); say("Bot","Hello! Pick a question from the list above."); return; }
  say("You",inp.value); say("Bot","This question is not covered by the FAQ bot. Try typing fees, profit, shipping, sources, estimates, contact or use, or reach us from the Contact page.");
}
send.onclick=function(){ if(!inp.value.trim()) return; answerFree(inp.value); inp.value=""; };
inp.addEventListener("keydown",function(e){ if(e.key==="Enter"){ send.click(); } });
body.appendChild(inp); body.appendChild(send); panel.appendChild(body);
btn.onclick=function(){ var open = panel.style.display==="none"; panel.style.display = open ? "block" : "none"; var tb=document.getElementById("topBtn"); if(tb) tb.style.display = open ? "none" : ""; };
document.body.appendChild(btn); document.body.appendChild(panel);
say("Bot","Hello! I am SellerCalc's FAQ bot. Pick a question from the list above.");
})();
