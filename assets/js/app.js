
const Q=window.AZ104_QUESTIONS||[]; const topics=[...new Set(Q.map(x=>x.topic))];
function isVisualQ(q){return !!(q.visual || q.visualImage || (q.visualImages&&q.visualImages.length) || /HOTSPOT|DRAG\s*DROP|EXHIBIT|HOT AREA|SELECT AND PLACE/i.test(q.question||''));}
const NORMAL_Q=Q.filter(q=>!isVisualQ(q));
const VISUAL_Q=Q.filter(isVisualQ);
function safeVisuals(q){return (q.visualImages?.length?q.visualImages:(q.visualImage?[q.visualImage]:[])).filter(src=>!/answer|correct|marked/i.test(src));}
function topicCount(arr,t){return arr.filter(q=>q.topic===t).length;}
const MOCKS_PER_TOPIC=[3,3,2,3,1];
function splitTopicPool(topic){
  const pool=NORMAL_Q.filter(q=>q.topic===topic);
  const topicIndex=topics.indexOf(topic);
  const mockCount=MOCKS_PER_TOPIC[topicIndex]||1;
  const base=Math.floor(pool.length/mockCount), extra=pool.length%mockCount;
  let offset=0;
  return Array.from({length:mockCount},(_,i)=>{
    const size=base+(i<extra?1:0);
    const part=pool.slice(offset,offset+size);
    offset+=size;
    return part;
  });
}

const $=s=>document.querySelector(s); const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
function shuffle(a){a=[...a];for(let i=a.length-1;i;i--){let j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
let state=null,timer=null;
let isSubmitting=false;
// Paste your deployed Google Apps Script Web App URL here after following GOOGLE_SHEETS_SETUP.md.
const RESULT_ENDPOINT='https://script.google.com/macros/s/AKfycbxAi-fbSnfFk-sAPhiJspYVQq9yuYH6iCwX4OKIKGmIe_KK0vBNttuDnz0vaekkISnJ/exec';
let student=JSON.parse(localStorage.getItem('az104_student')||'null');
function studentForm(){
  shell(`<section class="hero"><span class="badge">Student Details</span><h1>Before you start</h1><p>Enter your name and email once. These details will be attached to your mock-test results.</p><div class="card student-card"><label>Full Name</label><input id="studentName" class="textinput" value="${esc(student?.name||'')}" placeholder="e.g. Rahul Patil"><label>Email</label><input id="studentEmail" class="textinput" type="email" value="${esc(student?.email||'')}" placeholder="e.g. rahul@gmail.com"><div class="toolbar"><button class="btn" onclick="saveStudent()">Continue</button></div><p class="muted">Your result is sent only when you submit a mock test.</p></div></section>`)
}
function saveStudent(){
  const name=$('#studentName').value.trim(),email=$('#studentEmail').value.trim();
  if(name.length<2)return alert('Please enter your full name.');
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))return alert('Please enter a valid email address.');
  student={name,email};localStorage.setItem('az104_student',JSON.stringify(student));home();
}
function changeStudent(){studentForm()}
async function sendResult(payload){
  if(!RESULT_ENDPOINT) return {saved:false,reason:'endpoint-not-configured'};
  try{
    await fetch(RESULT_ENDPOINT,{method:'POST',mode:'no-cors',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(payload)});
    return {saved:true};
  }catch(e){console.error('Result submission failed',e);return {saved:false,reason:'network'};}
}
function shell(content){document.body.innerHTML=`<div class="wrap"><div class="brand"><b>AZ-104 Practice Hub</b><span class="owner">Maintained by Manav Jagtap</span></div>${content}</div><footer class="footer">AZ-104 Practice Hub • Maintained by Manav Jagtap • Educational practice project</footer>`}
function home(){clearInterval(timer);if(!student){studentForm();return;}shell(`<div class="studentbar">Signed in as <b>${esc(student.name)}</b> • ${esc(student.email)} <button class="linkbtn" onclick="changeStudent()">Change</button></div><section class="hero"><span class="badge">Microsoft Azure Administrator • ${Q.length.toLocaleString()} source records</span><h1>AZ-104 Practice Hub</h1><p>Questions are split into two clean pools: Normal (Single Select + Multi-select) and Visual (HOTSPOT, Drag & Drop, Exhibit/Table/Image-based). Topic mocks use only the Normal pool.</p><div class="stats"><div class="stat"><strong>${Q.length}</strong>Total</div><div class="stat"><strong>${NORMAL_Q.length}</strong>Normal</div><div class="stat"><strong>${VISUAL_Q.length}</strong>Visual</div><div class="stat"><strong>5</strong>Topics</div></div></section>
<section class="splitgrid"><div class="card splitcard"><span class="badge">Section 1</span><h2>Normal Questions</h2><p class="muted">Single Select + Multi-select only</p><div class="countlist">${topics.map(t=>`<div><span>${esc(t)}</span><strong>${topicCount(NORMAL_Q,t)}</strong></div>`).join('')}<div class="totalrow"><span>Total Normal Questions</span><strong>${NORMAL_Q.length}</strong></div></div><div class="toolbar"><button class="btn" onclick="normalBank()">View Normal Questions</button></div></div>
<div class="card splitcard"><span class="badge">Section 2</span><h2>Visual Questions</h2><p class="muted">HOTSPOT + Drag & Drop + Exhibit/Table/Image-based</p><div class="countlist">${topics.map(t=>`<div><span>${esc(t)}</span><strong>${topicCount(VISUAL_Q,t)}</strong></div>`).join('')}<div class="totalrow"><span>Total Visual Questions</span><strong>${VISUAL_Q.length}</strong></div></div><div class="toolbar"><button class="btn secondary" onclick="visualPractice()">View Visual Questions</button></div></div></section>
<h2 class="sectiontitle">Normal Topic Mocks</h2><div class="grid" id="cards"></div>`);let c=$('#cards');topics.forEach((t,ti)=>{let pools=splitTopicPool(t);pools.forEach((pool,mi)=>{let examSize=Math.min(50,pool.length);c.innerHTML+=`<div class="card"><span class="badge">${pool.length} assigned questions</span><h3>${esc(t)} — Mock ${mi+1}</h3><p class="muted">Random ${examSize} from this mock pool • ${examSize} marks • 60 minutes</p><button class="btn" onclick='start(${JSON.stringify(t)},${mi})'>Start Mock ${mi+1}</button></div>`})});c.innerHTML+=`<div class="card"><span class="badge">${NORMAL_Q.length} normal questions</span><h3>Overall AZ-104 Mock</h3><p class="muted">Random 50 • 50 marks • 60 minutes</p><button class="btn good" onclick="start(null)">Start Overall Mock</button></div>`}
function start(topic,mockIndex=null){
  let pool,examName;
  if(topic && mockIndex!==null){
    const pools=splitTopicPool(topic);
    pool=pools[mockIndex]||[];
    examName=`${topic} — Mock ${mockIndex+1}`;
  }else{
    pool=topic ? NORMAL_Q.filter(x=>x.topic===topic) : NORMAL_Q;
    examName=topic||'Overall AZ-104 Mock';
  }
  let qs=shuffle(pool).slice(0,Math.min(50,pool.length));
  state={topic,mockIndex,examName,qs,i:0,answers:{},review:{},secs:3600,startedAt:Date.now()};
  isSubmitting=false;
  renderExam(); timer=setInterval(()=>{state.secs--;let e=$('#time');if(e)e.textContent=fmt(state.secs);if(state.secs<=0)finalSubmit()},1000)
}
function fmt(s){return `${String(Math.max(0,Math.floor(s/60))).padStart(2,'0')}:${String(Math.max(0,s%60)).padStart(2,'0')}`}
function renderExam(){if(!state||state.submitted)return;let q=state.qs[state.i],a=state.answers[q.id];document.body.innerHTML=`<div class="topbar"><div class="topinner"><b>AZ-104 • ${esc(state.examName||state.topic||'Overall Mock')}</b><div><span id="time">${fmt(state.secs)}</span> &nbsp; <button class="btn secondary" onclick="confirmSubmit()">Submit</button></div></div></div><div class="wrap exam"><main class="card qcard"><div class="source">Question ${state.i+1}/${state.qs.length} • ${esc(q.source)} • Source Q${q.qno}</div><h2>Question ${state.i+1}</h2><div class="qtext">${esc(q.question)}</div>
${q.visualImages?.length?`<div class="visualWrap mockVisual">${q.visualImages.map((src,i)=>`<img class="visualQ" src="${src}" alt="Question visual ${i+1} for ${esc(q.id)}">`).join('')}<div class="source">Question visuals • source answer hidden</div></div>`:(q.visualImage?`<div class="visualWrap mockVisual"><img class="visualQ" src="${q.visualImage}" alt="Question visual"><div class="source">Question visual • answer hidden</div></div>`:'')}
<div id="opts">${optionsHtml(q,a)}</div><div class="toolbar"><button class="btn secondary" onclick="prev()">← Previous</button><button class="btn secondary" onclick="toggleReview()">${state.review[q.id]?'✓ Marked':'Mark for review'}</button><button class="btn" onclick="next()">Next →</button></div></main><aside class="card side"><h3>Question Palette</h3><div class="palette">${state.qs.map((x,i)=>`<button class="pbtn ${i===state.i?'current':''} ${state.answers[x.id]!==undefined?'done':''} ${state.review[x.id]?'review':''}" onclick="go(${i})">${i+1}</button>`).join('')}</div><p class="muted">Outlined = current<br>Green border = answered<br>Gold bar = review</p></aside></div>`}
function optionsHtml(q,a){if(!q.options?.length)return q.visualImage
 ? `<div class="visual-mock-note"><strong>Visual response</strong><p>Review the visual above. This source item does not yet expose a machine-readable click/drag target, so it will never be falsely marked correct.</p></div>`
 : `<div class="visual-mock-note"><strong>Source-format question</strong><p>This source item has no separate visual asset in this build.</p></div>`;let multi=Array.isArray(q.answer);return q.options.map((o,i)=>`<button class="option ${(multi?(a||[]).includes(i):a===i)?'selected':''}" onclick="choose(${i},${multi})"><b>${String.fromCharCode(65+i)}.</b> ${esc(o)}</button>`).join('')}
function choose(i,multi){if(!state||state.submitted)return;let q=state.qs[state.i];if(multi){let a=state.answers[q.id]||[];a=a.includes(i)?a.filter(x=>x!==i):[...a,i];state.answers[q.id]=a}else state.answers[q.id]=i;renderExam()}
function next(){if(!state||state.submitted)return;if(state.i<state.qs.length-1)state.i++;renderExam()} function prev(){if(!state||state.submitted)return;if(state.i>0)state.i--;renderExam()} function go(i){if(!state||state.submitted)return;state.i=i;renderExam()} function toggleReview(){if(!state||state.submitted)return;let id=state.qs[state.i].id;state.review[id]=!state.review[id];renderExam()}

function isAnsweredValue(a){
  return Array.isArray(a) ? a.length>0 : a!==undefined && a!==null && a!=='';
}
function hasValidKey(q){
  return Array.isArray(q.answer) ? q.answer.length>0 : Number.isInteger(q.answer);
}

function same(a,b){
  if(a===undefined || a===null || b===undefined || b===null) return false;
  if(Array.isArray(b)){
    if(!Array.isArray(a) || a.length===0) return false;
    return [...a].sort((x,y)=>x-y).join(',')===[...b].sort((x,y)=>x-y).join(',');
  }
  return a===b;
}
function ansText(q,a){if(a===undefined)return 'Unanswered';let ar=Array.isArray(a)?a:[a];return ar.map(i=>q.options?.[i]?String.fromCharCode(65+i)+'. '+q.options[i]:String.fromCharCode(65+i)).join('; ')}
function confirmSubmit(){
  if(!state||state.submitted||isSubmitting) return;
  let answered=state.qs.filter(q=>isAnsweredValue(state.answers[q.id])).length;
  let left=state.qs.length-answered;
  if(left>0){
    if(!window.confirm(`You have answered ${answered} of ${state.qs.length} questions.\n${left} questions are unanswered.\n\nAre you sure you want to submit?`)) return;
  }
  finalSubmit();
}
async function finalSubmit(){
  if(isSubmitting||!state||state.submitted) return;
  isSubmitting=true;
  state.submitted=true;
  clearInterval(timer);
  timer=null;
  let correct=0,answered=0;
  state.qs.forEach(q=>{
    let a=state.answers[q.id];
    if(isAnsweredValue(a)) answered++;
    if(isAnsweredValue(a) && hasValidKey(q) && same(a,q.answer)) correct++;
  });
  let total=state.qs.length, wrong=answered-correct, unanswered=total-answered;
  let pct=total?Math.round(correct/total*100):0;
  const timeTaken=Math.max(0,3600-state.secs);
  const resultPayload={attemptId:(crypto.randomUUID?crypto.randomUUID():Date.now()+'-'+Math.random().toString(16).slice(2)),submittedAt:new Date().toISOString(),name:student?.name||'',email:student?.email||'',exam:state.examName||state.topic||'Overall AZ-104 Mock',score:correct,total,percentage:pct,correct,wrong,unanswered,timeTakenSeconds:timeTaken,timeTakenMinutes:Math.ceil(timeTaken/60)};
  const resultSavePromise=sendResult(resultPayload);
  resultSavePromise.catch(()=>{});
  shell(`<section class="hero resultHero"><span class="badge">Mock completed</span><h1>${correct}/${total}</h1><p>${pct}% score</p>
  <div class="stats">
    <div class="stat"><strong>${correct}</strong>Correct</div>
    <div class="stat"><strong>${wrong}</strong>Wrong</div>
    <div class="stat"><strong>${unanswered}</strong>Unanswered</div>
    <div class="stat"><strong>${Object.values(state.review).filter(Boolean).length}</strong>Marked Review</div>
  </div>
  <div class="toolbar"><button class="btn" onclick="home()">Dashboard</button><button class="btn secondary" onclick="reviewResult()">Review Answers</button></div></section>`)
}
function reviewResult(){shell(`<div class="toolbar"><button class="btn" onclick="home()">Dashboard</button></div><h1>Answer Review</h1>${state.qs.map((q,i)=>{let a=state.answers[q.id],ok=same(a,q.answer);return `<div class="card resultRow"><div class="source">#${i+1} • ${esc(q.source)} • Q${q.qno} • ${esc(q.topic)}</div><h3>${esc(q.question).slice(0,700)}</h3>${q.visualImages?.length?`<div class="visualWrap">${q.visualImages.map(src=>`<img class="visualQ" src="${src}" alt="Question visual">`).join('')}</div>`:(q.visualImage?`<div class="visualWrap"><img class="visualQ" src="${q.visualImage}" alt="Question visual"></div>`:'')}<p class="${ok?'goodtxt':'badtxt'}"><b>Your answer:</b> ${esc(ansText(q,a))}</p><p class="goodtxt"><b>Source answer:</b> ${esc(ansText(q,q.answer))}</p>${q.verifiedCorrection?`<p class="warntxt"><b>Verified correction:</b> ${esc(q.verifiedCorrection.answer)} — ${esc(q.verifiedCorrection.reason)}</p>`:''}<p class="muted">${esc(q.explanation||'No text explanation extracted from source.')}</p></div>`}).join('')}`)}
function normalBank(){shell(`<div class="toolbar"><button class="btn" onclick="home()">Dashboard</button><select id="filter" class="select" onchange="renderNormalBank()"><option value="">All topics (${NORMAL_Q.length})</option>${topics.map(t=>`<option value="${esc(t)}">${esc(t)} (${topicCount(NORMAL_Q,t)})</option>`).join('')}</select></div><h1>Normal Question Bank</h1><p class="muted">Single Select + Multi-select only • ${NORMAL_Q.length} questions</p><div id="bank"></div>`);renderNormalBank()}
function renderNormalBank(){let f=$('#filter')?.value||'',arr=f?NORMAL_Q.filter(x=>x.topic===f):NORMAL_Q;$('#bank').innerHTML=arr.map(q=>`<details class="card" style="margin:10px 0"><summary><b>${esc(q.source)} • Q${q.qno}</b> — ${esc(q.question).slice(0,130)}...</summary><div class="qtext" style="margin-top:14px">${esc(q.question)}</div>${(q.options||[]).map((o,i)=>`<p>${String.fromCharCode(65+i)}. ${esc(o)}</p>`).join('')}<p class="goodtxt"><b>Source answer:</b> ${esc(ansText(q,q.answer))}</p><p class="muted">${esc(q.explanation||'No text explanation extracted from source.')}</p></details>`).join('')}
function bank(){normalBank()}
function visualPractice(){const V=VISUAL_Q;shell(`<section class="hero"><span class="badge">Section 2 • Visual Question Bank</span><h1>Visual Questions</h1><p>HOTSPOT, Drag & Drop, Exhibit/Table/Image-based • ${V.length} questions</p><div class="stats">${topics.map(t=>`<div class="stat"><strong>${topicCount(V,t)}</strong>${esc(t)}</div>`).join('')}</div><div class="toolbar"><button class="btn secondary" onclick="home()">← Dashboard</button><select id="vtopic" class="select" onchange="renderVisualList(this.value)"><option value="">All visual questions (${V.length})</option>${topics.map(t=>`<option value="${esc(t)}">${esc(t)} (${topicCount(V,t)})</option>`).join('')}</select></div></section><div id="visualList"></div>`);window.__VISUALS=V;renderVisualList('')}
function renderVisualList(topic){const V=(window.__VISUALS||[]).filter(q=>!topic||q.topic===topic);$('#visualList').innerHTML=`<div class="bank">${V.map((q,i)=>`<article class="bankq"><div class="source">${esc(q.topic)} • ${esc(q.source||'')} • Source Q${q.qno||''}</div><h3>${i+1}. ${esc((q.question||'').replace(/Correct Answer:/ig,'')).slice(0,1100)}</h3>${safeVisuals(q).map(src=>`<div class="visualWrap"><img class="visualQ" src="${src}" alt="Question visual"></div>`).join('')}${q.options?.length?`<div class="opts">${q.options.map((o,j)=>`<div class="opt"><span>${String.fromCharCode(65+j)}</span>${esc(o)}</div>`).join('')}</div>`:`<p class="muted">Visual/source-format answer area.</p>`}<details><summary>Show source answer / explanation</summary><p><strong>Answer:</strong> ${esc(q.answerRaw||ansText(q,q.answer)||'Not machine-readable yet')}</p><p>${esc(q.explanation||'')}</p></details></article>`).join('')}</div>`}

home();
