function aviatorGame(){
  let bet = parseInt(prompt("Bet amount"));
  if(!bet || user.balance<bet) return;

  let multi=1;
  let crash=(Math.random()*5+1).toFixed(2);

  let i=setInterval(()=>{
    multi+=0.1;
    content.innerHTML=`
      <div class="card">
        <h2>${multi.toFixed(2)}x</h2>
        <button onclick="cashout(${bet},${multi})">Cashout</button>
      </div>
    `;

    if(multi>=crash){
      clearInterval(i);
      user.balance-=bet;
      updateBalance();
      alert("Crashed ❌");
      showPage("games");
    }
  },200);
}

function cashout(b,m){
  user.balance+=Math.floor(b*m);
  updateBalance();
  alert("Win 🎉");
  showPage("games");
}

function colorGame(){
  let bet=parseInt(prompt("Bet"));
  let choice=prompt("red/green");

  let r=Math.random()>0.5?"red":"green";

  if(choice===r){
    user.balance+=bet;
  } else {
    user.balance-=bet;
  }
  updateBalance();
  alert("Result: "+r);
}

function slotGame(){
  let bet=parseInt(prompt("Bet"));
  let s=["🍒","🍋","💎"];
  let a=s[Math.floor(Math.random()*3)];
  let b=s[Math.floor(Math.random()*3)];
  let c=s[Math.floor(Math.random()*3)];

  if(a===b && b===c){
    user.balance+=bet*3;
  } else {
    user.balance-=bet;
  }

  updateBalance();
  alert(a+" "+b+" "+c);
}

function spinGame(){
  let bet=parseInt(prompt("Bet"));
  let m=[0,2,3,5];
  let r=m[Math.floor(Math.random()*m.length)];

  if(r>0){
    user.balance+=bet*r;
  } else {
    user.balance-=bet;
  }

  updateBalance();
  alert("Multiplier: "+r);
}

function diceGame(){
  let bet=parseInt(prompt("Bet"));
  let g=parseInt(prompt("1-6"));

  let d=Math.floor(Math.random()*6)+1;

  if(g===d){
    user.balance+=bet*5;
  } else {
    user.balance-=bet;
  }

  updateBalance();
  alert("Dice: "+d);
}