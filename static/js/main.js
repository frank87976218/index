let users = JSON.parse(localStorage.getItem("users"));
const account = document.getElementById("account");
const password = document.getElementById("password");
const email = document.getElementById("email");
const btn = document.getElementById("btn");
// getElementsByClassName返回的是一個列表而不是像ID一樣單獨DOM故要取值
const main2 = document.getElementsByClassName("main2")[0];
let loginSuccess = false;

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
        const jsonUsers = JSON.stringify(users);
        localStorage.setItem("users", jsonUsers); 
    }
    console.log(users);
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
    const jsonUsers = JSON.stringify(users);
    localStorage.setItem("users", jsonUsers);   
}

//插入警告標語
function warring(addWhere, content){    
    let warring = document.createElement("div");
    warring.id = "warring";
    warring.style.color = "red";
    warring.style.margin = "0px 5px";
    warring.textContent = content;
    addWhere.appendChild(warring); 
}

// 登入按鈕
function login(){
    if (account.value === "" || password.value === ""){        
        let excistingWarring = document.querySelector("#warring");        
        if (!excistingWarring) {   
            warring(main2, "帳號或密碼不能為空");            
        }else{
            excistingWarring.textContent = "帳號或密碼不能為空";
        }           
        account.value = "";
        password.value = "";               
    }else{
        // 如果帳號密碼都有輸入,for迴圈比對帳號密碼資訊
        for(var key in users){            
            if (account.value === users[key].account && password.value === users[key].password){                
                console.log("登入成功");
                // 登入成功後跳轉首頁
                location.href = "index.html";
                loginSuccess = True;
                break;                
            }                       
        }                       
        let excistingWarring = document.querySelector("#warring");
        if (!loginSuccess){               
            if (!excistingWarring) {      
                warring(main2, "帳號或密碼錯誤");                                
            }else{                    
                excistingWarring.textContent = "帳號或密碼錯誤";
            }
        } 
        account.value = "";
        password.value = "";  
    }
}

// 註冊按鈕
function register(){
    if (account.value === "" || password.value === ""){        
        let excistingWarring = document.querySelector("#warring");        
        if (!excistingWarring) {   
            warring(main2, "帳號或密碼不能為空");            
        }else{
            excistingWarring.textContent = "帳號或密碼不能為空";
        }           
        account.value = "";
        password.value = "";               
    }else{
        users[account.value] = {
            "account": account.value,
            "password": password.value,
            "email": email.value
        }        
        const jsonUsers = JSON.stringify(users);
        localStorage.setItem("users", jsonUsers);      
        account.value = "";
        password.value = "";
        email.value = "";
        location.href = "login.html";
    }
}
