function $(id){ return document.getElementById(id); }
function selectRole(role){
  $('role-selection').classList.add('hidden');
  if(role === 'queen') $('queen-interface').classList.remove('hidden');
  else $('serse7-interface').classList.remove('hidden');
}

// Load and save data
let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
let giftBalance = parseFloat(localStorage.getItem('giftBalance') || '0');
let usedLong = JSON.parse(localStorage.getItem('usedLong') || '[]');

function save(){
  localStorage.setItem('tasks', JSON.stringify(tasks));
  localStorage.setItem('giftBalance', giftBalance);
  localStorage.setItem('usedLong', JSON.stringify(usedLong));
}

function renderTasks(){
  $('tasks-list').innerHTML = '';
  tasks.forEach((t,i)=>{
    let li=document.createElement('li');
    li.textContent = t;
    let btn=document.createElement('button');
    btn.textContent='✔';
    btn.onclick=()=>{ completeTask(i); };
    li.appendChild(btn);
    $('tasks-list').appendChild(li);
  });
}
function addTask(){
  let v=$('task-input').value.trim();
  if(v){ tasks.push(v); $('task-input').value=''; renderTasks(); save(); }
}
function completeTask(i){
  tasks.splice(i,1);
  giftBalance += 1;
  save();
  renderTasks(); renderGifts();
}
function renderGifts(){
  $('gift-balance').textContent = giftBalance.toFixed(2);
  let html='';
  [['أكل',5],['كاش',10],['شي ان',20]].forEach(g=>{
    let ratio = Math.min(100, (giftBalance/g[1])*100);
    html += `<div>${g[0]}: ${ratio.toFixed(0)}%</div>`;
  });
  $('gifts-progress').innerHTML = html;
}
function requestGift(){
  let request = prompt('اكتب طلب الهدية مع رسالة:');
  if(request){
    let ul = $('gift-requests');
    let li = document.createElement('li');
    li.textContent = request;
    ul.appendChild(li);
    save();
  }
}
function showLongMessage(){
  const msgs = [
    "أنتِ الأجمل في حياتي وأجمل ما حدث لي...",
    "كل يوم يمر يزداد حبي لكِ...",
    "أنتِ بطلة قلبي ونور حياتي...",
    "لا كلمات توفيكِ حقكِ..."
  ];
  let idx = msgs.findIndex(m=>!usedLong.includes(m));
  if(idx === -1) return alert('لا رسائل متبقية اليوم');
  let msg = msgs[idx];
  usedLong.push(msg);
  $('long-message').textContent = msg;
  $('long-message').classList.remove('hidden');
  save();
}
window.onload = ()=>{
  renderTasks();
  renderGifts();
};