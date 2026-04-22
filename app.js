let user = JSON.parse(localStorage.getItem("user")) || null;

setTimeout(()=>{
  document.getElementById("loader").style.display="none";
  document.getElementById("app").classList.remove("hidden");

  if(user){
    updateBalance();
    showPage("home");
  } else {
    showAuth();
  }
},1000);

/* AUTH */
function showAuth(){
  document.getElementById("content").innerHTML=`
    <div class="card">
      <h3>Login / Signup</h3>
      <input id="username" placeholder="Username">
      <input id="password" type="password" placeholder="Password">
      <button onclick="login()">Login</button>
      <button onclick="signup()">Signup</button>
    </div>
  `;
}

function signup(){
  let u = username.value;
  let p = password.value;

  user = {
    username:u,
    password:p,
    balance:50,
    referral:"REF"+Math.floor(Math.random()*10000)
  };

  localStorage.setItem("user",JSON.stringify(user));
  alert("₹50 bonus added!");
  updateBalance();
  showPage("home");
}

function login(){
  if(user && user.username===username.value && user.password===password.value){
    showPage("home");
  } else {
    alert("Wrong details");
  }
}

/* NAV */
function showPage(page){

  if(page==="home"){
    content.innerHTML=`
      <div class="card">
        <h3>Welcome ${user.username}</h3>
        <p>Balance: ₹${user.balance}</p>
        <button onclick="showPage('wallet')">Deposit</button>
        <button onclick="withdraw()">Withdraw</button>
      </div>
    `;
  }

  if(page==="games"){
    content.innerHTML=`
      <div class="card">
        <h3>Games</h3>
        <button onclick="aviatorGame()">Aviator</button>
        <button onclick="colorGame()">Color</button>
        <button onclick="slotGame()">Slot</button>
        <button onclick="spinGame()">Spin</button>
        <button onclick="diceGame()">Dice</button>
      </div>
    `;
  }

  if(page==="wallet"){
    content.innerHTML=`
      <div class="card">
        <h3>Deposit</h3>
        <img src="assets/qr.png" width="100%">
        <input id="amount" placeholder="Enter amount">
        <button onclick="deposit()">Submit</button>
      </div>
    `;
  }

  if(page==="profile"){
    content.innerHTML=`
      <div class="card">
        <h3>${user.username}</h3>
        <p>Referral: ${user.referral}</p>
        <button onclick="logout()">Logout</button>
      </div>
    `;
  }
}

/* WALLET */
function updateBalance(){
  balance.innerText="₹"+user.balance;
  localStorage.setItem("user",JSON.stringify(user));
}

function deposit(){
  let amt = parseInt(amount.value);
  if(amt<15 || amt>50000 || amt%5!==0){
    alert("Invalid amount");
    return;
  }
  alert("Pay using QR & wait for approval");
}

function withdraw(){
  let amt = parseInt(prompt("Enter amount"));
  if(amt<500 || amt>5000 || amt%100!==0){
    alert("Invalid");
    return;
  }
  if(user.balance>=amt){
    user.balance-=amt;
    updateBalance();
    alert("Withdraw request sent");
  }
}

function logout(){
  localStorage.removeItem("user");
  location.reload();
}