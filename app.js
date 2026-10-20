const QUESTIONS = [
  {category:"CONCEPTOS BÁSICOS",q:"¿Cuál es la unidad que se utiliza para medir el consumo de energía eléctrica en un recibo doméstico?",options:["Voltio (V)","Kilowatt-hora (kWh)","Ampere (A)","Ohm (Ω)"],answer:1,explanation:"El kilowatt-hora (kWh) mide la energía utilizada durante un periodo. Es la unidad que normalmente aparece en el recibo de electricidad."},
  {category:"POTENCIA Y CONSUMO",q:"Un aparato de 1,000 watts funciona durante 2 horas. ¿Cuánta energía consume?",options:["0.5 kWh","1 kWh","2 kWh","2,000 kWh"],answer:2,explanation:"1,000 W equivalen a 1 kW. Consumo = potencia (kW) × tiempo (h): 1 × 2 = 2 kWh."},
  {category:"SEGURIDAD ELÉCTRICA",q:"¿Qué debes hacer si observas un cable eléctrico con el aislamiento dañado?",options:["Cubrirlo con papel","Tocarlo para comprobar si tiene corriente","Dejar de usarlo y pedir que una persona calificada lo revise","Echarle agua para enfriarlo"],answer:2,explanation:"No toques el cable ni intentes repararlo energizado. Suspende su uso y solicita una revisión segura por personal calificado."},
  {category:"EFICIENCIA ENERGÉTICA",q:"¿Cuál de estas opciones suele consumir menos electricidad para producir una iluminación similar?",options:["Foco incandescente","Lámpara LED","Dejar dos focos encendidos","Un foco de mayor potencia sin necesidad"],answer:1,explanation:"Las lámparas LED suelen ofrecer la misma iluminación con menos energía que las incandescentes."},
  {category:"HÁBITOS DE CONSUMO",q:"¿Qué acción ayuda a reducir el consumo eléctrico en casa?",options:["Dejar luces encendidas en habitaciones vacías","Abrir el refrigerador frecuentemente","Apagar luces y equipos que no se usan","Ajustar el refrigerador a la temperatura más baja siempre"],answer:2,explanation:"Apagar las luces y los equipos que no se necesitan evita consumo innecesario."},
  {category:"CÁLCULO DE COSTOS",q:"Si consumes 5 kWh y el costo ilustrativo es de $2 MXN por kWh, ¿cuál es el costo de esa energía?",options:["$2 MXN","$5 MXN","$7 MXN","$10 MXN"],answer:3,explanation:"Costo = energía consumida × precio por kWh: 5 × $2 = $10 MXN. El precio es solo un ejemplo y no representa una tarifa oficial."},
  {category:"ENERGÍA RENOVABLE",q:"¿Cuál de estas fuentes genera electricidad aprovechando la radiación del Sol?",options:["Solar fotovoltaica","Carbón","Gasolina en un automóvil","Diésel"],answer:0,explanation:"Los paneles fotovoltaicos convierten la radiación solar en electricidad."},
  {category:"ETIQUETAS Y POTENCIA",q:"En condiciones equivalentes, un equipo de 100 W encendido durante 10 horas consume:",options:["0.1 kWh","1 kWh","10 kWh","100 kWh"],answer:1,explanation:"100 W = 0.1 kW; 0.1 kW × 10 h = 1 kWh."},
  {category:"CONSUMO FANTASMA",q:"¿Qué describe mejor el consumo eléctrico en espera (standby)?",options:["La energía que consume un equipo apagado o en espera pero conectado","La energía que produce un panel solar","La energía que solo se consume durante una tormenta","Un tipo de unidad de voltaje"],answer:0,explanation:"Algunos aparatos siguen usando una pequeña cantidad de energía mientras permanecen conectados en modo de espera."},
  {category:"LECTURA DEL CONSUMO",q:"¿Cuál es una forma útil de comparar el consumo eléctrico de dos periodos?",options:["Comparar únicamente el número de aparatos","Comparar los kWh registrados en periodos de duración similar","Comparar el color del recibo","Contar cuántos interruptores hay"],answer:1,explanation:"Comparar los kWh de periodos equivalentes ayuda a detectar si el consumo aumentó o disminuyó."}
];

const STORAGE_KEY = "retoEnergeticoResults_v1";
let currentIndex = 0, currentName = "", currentAnswers = [], currentScore = 0;
let scoreChart = null, questionChart = null;

const $ = id => document.getElementById(id);
const views = ["quizView","statsView"];
function getResults(){try{return JSON.parse(localStorage.getItem(STORAGE_KEY)||"[]")}catch{return []}}
function saveResults(data){localStorage.setItem(STORAGE_KEY,JSON.stringify(data))}
function showView(id){views.forEach(v=>$(v).classList.toggle("hidden",v!==id));document.querySelectorAll(".tab").forEach(t=>t.classList.toggle("active",t.dataset.view===id));if(id==="statsView")renderStats()}
document.querySelectorAll(".tab").forEach(t=>t.addEventListener("click",()=>showView(t.dataset.view)));

$("startForm").addEventListener("submit",e=>{e.preventDefault();currentName=$("participantName").value.trim();if(!currentName)return;currentIndex=0;currentAnswers=[];currentScore=0;$("startForm").closest(".intro-card").classList.add("hidden");$("resultPanel").classList.add("hidden");$("quizPanel").classList.remove("hidden");renderQuestion()});
function renderQuestion(){
 const item=QUESTIONS[currentIndex];
 $("questionCounter").textContent=`Pregunta ${currentIndex+1} de ${QUESTIONS.length}`;
 $("scoreLive").textContent=`${currentScore} correctas`;
 $("progressBar").style.width=`${(currentIndex/QUESTIONS.length)*100}%`;
 $("questionCategory").textContent=item.category;
 $("questionText").textContent=item.q;
 $("feedback").className="feedback hidden";$("feedback").textContent="";
 $("nextButton").disabled=true;$("nextButton").textContent=currentIndex===QUESTIONS.length-1?"Ver mi resultado →":"Siguiente pregunta →";
 const letters=["A","B","C","D"],box=$("answers");box.innerHTML="";
 item.options.forEach((option,i)=>{const b=document.createElement("button");b.type="button";b.className="answer";b.innerHTML=`<span class="letter">${letters[i]}</span><span></span>`;b.querySelector("span:last-child").textContent=option;b.addEventListener("click",()=>chooseAnswer(i,b));box.appendChild(b)});
}
function chooseAnswer(index,button){
 if(currentAnswers[currentIndex]!==undefined)return;
 const item=QUESTIONS[currentIndex];currentAnswers[currentIndex]=index;
 const isCorrect=index===item.answer;if(isCorrect)currentScore++;
 [...$("answers").children].forEach((b,i)=>{b.disabled=true;if(i===item.answer)b.classList.add("correct");else if(i===index)b.classList.add("incorrect")});
 const feedback=$("feedback");feedback.className=`feedback ${isCorrect?"good":"bad"}`;feedback.textContent=(isCorrect?"¡Correcto! ":"No es correcto. ")+item.explanation;
 $("scoreLive").textContent=`${currentScore} correctas`;$("progressBar").style.width=`${((currentIndex+1)/QUESTIONS.length)*100}%`;$("nextButton").disabled=false;
}
$("nextButton").addEventListener("click",()=>{if(currentAnswers[currentIndex]===undefined)return;if(currentIndex<QUESTIONS.length-1){currentIndex++;renderQuestion()}else finishQuiz()});
function finishQuiz(){
 const percent=Math.round(currentScore/QUESTIONS.length*100);
 const result={id:Date.now().toString(36)+Math.random().toString(36).slice(2,7),name:currentName,when:new Date().toISOString(),correct:currentScore,total:QUESTIONS.length,score:percent,answers:currentAnswers.slice()};
 const all=getResults();all.push(result);saveResults(all);
 $("quizPanel").classList.add("hidden");$("resultPanel").classList.remove("hidden");
 $("finalScore").textContent=percent+"%";$("resultCorrect").textContent=`${currentScore}/${QUESTIONS.length}`;$("resultWrong").textContent=QUESTIONS.length-currentScore;
 $("resultTitle").textContent=percent>=80?"¡Excelente dominio!":percent>=60?"¡Buen avance!":"Sigue practicando";
 $("resultMessage").textContent=`${currentName}, obtuviste ${percent}%. ${percent>=60?"Tu resultado se ha registrado en las estadísticas del grupo.":"Tu resultado se ha registrado. Repasa los conceptos y vuelve a intentarlo cuando quieras."}`;
 $("progressBar").style.width="100%";
}
function resetForNext(){ $("resultPanel").classList.add("hidden");$("quizPanel").classList.add("hidden");$("startForm").closest(".intro-card").classList.remove("hidden");$("participantName").value="";$("participantName").focus() }
$("newParticipant").addEventListener("click",resetForNext);
$("goStats").addEventListener("click",()=>showView("statsView"));
$("startFromStats").addEventListener("click",()=>{showView("quizView");resetForNext()});
function renderStats(){
 const data=getResults();$("emptyStats").classList.toggle("hidden",data.length>0);$("statsContent").classList.toggle("hidden",data.length===0);
 if(!data.length){if(scoreChart){scoreChart.destroy();scoreChart=null}if(questionChart){questionChart.destroy();questionChart=null}return}
 const scores=data.map(r=>Number(r.score)||0),avg=scores.reduce((a,b)=>a+b,0)/scores.length;
 $("statParticipants").textContent=data.length;$("statAverage").textContent=Math.round(avg)+"%";$("statPass").textContent=Math.round(data.filter(r=>r.score>=60).length/data.length*100)+"%";$("statBest").textContent=Math.max(...scores)+"%";
 const ranges=[0,0,0,0,0];scores.forEach(s=>{if(s<20)ranges[0]++;else if(s<40)ranges[1]++;else if(s<60)ranges[2]++;else if(s<80)ranges[3]++;else ranges[4]++});
 if(scoreChart)scoreChart.destroy();
 scoreChart=new Chart($("scoreChart"),{type:"bar",data:{labels:["0–19%","20–39%","40–59%","60–79%","80–100%"],datasets:[{label:"Participantes",data:ranges,backgroundColor:"#b6f36b",borderColor:"#6f9d3f",borderWidth:1,borderRadius:6}]},options:{responsive:true,plugins:{legend:{display:false}},scales:{y:{beginAtZero:true,ticks:{precision:0}}}}});
 const correctByQ=QUESTIONS.map((_,qi)=>data.reduce((sum,r)=>sum+(r.answers&&r.answers[qi]===QUESTIONS[qi].answer?1:0),0));
 const rates=correctByQ.map(n=>Math.round(n/data.length*100));
 if(questionChart)questionChart.destroy();
 questionChart=new Chart($("questionChart"),{type:"bar",data:{labels:QUESTIONS.map((_,i)=>`P${i+1}`),datasets:[{label:"Respuestas correctas (%)",data:rates,backgroundColor:"#17334c",borderRadius:5}]},options:{responsive:true,plugins:{legend:{display:false},tooltip:{callbacks:{label:c=>`${c.raw}% de participantes respondieron correctamente`}}},scales:{y:{beginAtZero:true,max:100,ticks:{callback:v=>v+"%"}}}}});
 const sorted=[...data].sort((a,b)=>new Date(b.when)-new Date(a.when));$("recordCount").textContent=`${data.length} registro${data.length===1?"":"s"}`;
 const tbody=$("resultsTable");tbody.innerHTML="";
 sorted.forEach(r=>{const tr=document.createElement("tr");const date=new Date(r.when).toLocaleString("es-MX",{dateStyle:"short",timeStyle:"short"});const values=[r.name,date,`${r.correct}/${r.total}`,`${r.score}%`];values.forEach(v=>{const td=document.createElement("td");td.textContent=v;tr.appendChild(td)});const status=document.createElement("td");status.innerHTML=`<span class="status ${r.score>=60?"pass":"fail"}">${r.score>=60?"Aprobado":"Por reforzar"}</span>`;tr.appendChild(status);tbody.appendChild(tr)});
}
$("exportCsv").addEventListener("click",()=>{
 const data=getResults();if(!data.length)return alert("Todavía no hay resultados para exportar.");
 const rows=[["Participante","Fecha ISO","Aciertos","Total preguntas","Calificación (%)","Estado"]];
 data.forEach(r=>rows.push([r.name,r.when,r.correct,r.total,r.score,r.score>=60?"Aprobado":"Por reforzar"]));
 const csv="\uFEFF"+rows.map(row=>row.map(v=>`"${String(v??"").replace(/"/g,'""')}"`).join(",")).join("\r\n");
 const blob=new Blob([csv],{type:"text/csv;charset=utf-8;"});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download="resultados_quiz_energia.csv";a.click();URL.revokeObjectURL(url);
});
$("clearData").addEventListener("click",()=>{if(confirm("¿Seguro que quieres borrar permanentemente todos los resultados guardados en este navegador? Esta acción no se puede deshacer.")){localStorage.removeItem(STORAGE_KEY);renderStats()}});
renderStats();
