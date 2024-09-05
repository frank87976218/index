//解析瀏覽器的json物件並轉回js物件做使用
let users = JSON.parse(localStorage.getItem("users"));

const account = document.getElementById("account");
const password = document.getElementById("password");
const email = document.getElementById("email");
const btn = document.getElementById("btn");
// getElementsByClassName回傳的是一個列表而不是單一DOM
const main2 = document.getElementsByClassName("main2")[0];
//註冊帳號是否存在
let accountExist = false;

start();

function start(){
    if (!users){
        users = {
            "root":{
                "account": "root",
                "password": "123456",
                "email": "frank87976218@gmail.com"
            }
        }
    }
    console.log(users);
}

function save(){
    const jsonUsers = JSON.stringify(users);
    localStorage.setItem("users", jsonUsers); 
}

//清除所有帳號
function clearUsers(){    
    localStorage.removeItem("users");
    // 刪除users物件全部屬性
    Object.keys(users).forEach(key => delete users[key]); 
    users = {
        "root":{
            "account": "root",
            "password": "123456",
            "email": "frank87976218@gmail.com"
        }
    }
    save();
    warring(main2, "成功重設帳號");
}

//插入警告標語,需要傳入加入哪個class的標籤,以及訊息
function warring(addToWhichClass, content){   
    let excistingWarring = document.querySelector("#warring")
    //抓取標籤,如果不存在就會創建警告標籤
    if (!excistingWarring) {
        //創建標籤warring並加入子物件到class名為"參數1"的標籤,訊息為"參數2"
        let warring = document.createElement("div");
        warring.id = "warring";
        warring.style.color = "red";
        warring.style.margin = "0px 5px";
        warring.textContent = content; 
        addToWhichClass.appendChild(warring);
    }else{
        //如果抓取到ID為warring的標籤,就替換其中的文字就好
        let warring = document.getElementById("warring");
        warring.textContent = content;   
    } 
}

// 登入按鈕
function login(){
    //帳號密碼其中一個為空白時發出警告
    if (account.value === "" || password.value === ""){
        warring(main2, "帳號或密碼不能為空");   
        account.value = "";
        password.value = "";               
    }else{
        // 帳號密碼皆有值時,for迴圈比對帳號密碼資訊
        for(const key in users){
            //逐個比對輸入是否與帳號密碼都相等            
            if (account.value === users[key].account && password.value === users[key].password){                
                console.log("登入成功");        
                localStorage.setItem("loginSuccess", true);
                // 登入成功後跳轉首頁
                location.href = "loading.html";
                loginSuccess = true;
                //停止迴圈繼續不必要的比對帳密
                break;                
            }                       
        }
        let loginSuccess = localStorage.getItem("loginSuccess") 
        if (loginSuccess === "false"){
            warring(main2, "帳號或密碼錯誤");    
        } 
        account.value = "";
        password.value = "";  
    }
}

// 註冊按鈕
function register(){
    if (account.value === "" || password.value === ""){ 
        warring(main2, "帳號或密碼不能為空"); 
        account.value = "";
        password.value = "";               
    }else{
        for (const key in users){
            if (users[account.value] === users[key]){
                warring(main2, "此帳號已被註冊");
                accountExist = true;                
                break
            }else{ 
                accountExist = false;
            }             
        }
        if (!accountExist){
            users[account.value] = {
                "account": account.value,
                "password": password.value,
                "email": email.value
            }
            save();     
            account.value = "";
            password.value = "";
            email.value = "";
            localStorage.setItem("registerSuccess", true);
            let registerSuccess = localStorage.getItem("registerSuccess")
            if (registerSuccess === "true"){            
                location.href = "loading.html";
            }  
        }              
    }
}

