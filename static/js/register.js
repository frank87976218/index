let users = JSON.parse(localStorage.getItem("users"));
const account = document.getElementById("account");
const password = document.getElementById("password");
const email = document.getElementById("email");
const btn = document.getElementById("btn");
// getElementsByClassName返回的是一個列表而不是像ID一樣單獨DOM故要取值
const main2 = document.getElementsByClassName("main2")[0];

if (!users){
    users = {
        "root":{
            "account": "root",
            "password": "123456",
            "email": "frank87976218@gmail.com"
        }
    }
}  

function clearUsers(){    
    localStorage.removeItem("users");
    // 刪除users物件全部屬性
    Object.keys(users).forEach(key => delete users[key]);    
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
