const userList = localStorage.getItem('users') != null ?  JSON.parse(localStorage.getItem('users')) :[]
    // if (localStorage.getItem('users') == null )  {
    //         userList = []
    // }else {
    //    userList = JSON.parse(localStorage.getItem('users'))
    // }

const register = () => {
    const firstname = document.querySelector('#first-name');
    const lastname = document.querySelector('#last-name');
    const emailRegister = document.querySelector('#email-register');
    const password = document.querySelector('#password-register');

    const userinfo = {
        firstname : firstname.value,
        lastname: lastname.value,
        emailRegister : emailRegister.value,
        password : password.value
};
    if(firstname.value === '' || lastname.value === '' || emailRegister.value === '' || password.value === '') {
        alert("Hãy điền đầy đủ thông tin")
        return;
    }

    for(let user of userList) {
        if (user.emailRegister == emailRegister.value){
            alert('Email này đã được đăng ký')
            return;
        }
    }
    userList.push(userinfo);
    localStorage.setItem('users', JSON.stringify(userList));
}
const btnRegister = document.querySelector('.btn-register');
btnRegister.addEventListener('click', register);

function login(){
  const emailLogin = document.querySelector('#email-login');
  const passwordLogin = document.querySelector('#password-login');

  const userData = {
      emailLogin : emailLogin.value,
      passwordLogin : passwordLogin.value
  }
    for(let user of userList) {
       if(userData.emailLogin == user.emailRegister && userData.passwordLogin == user.password){
           alert( `wellcome to store ${user.firstname} ${user.lastname}`);
           return;
       }
    }
    alert("Tài khoản hoặc Mật khẩu không đúng !!")
}

const btnLogin = document.querySelector('#btn-login');
btnLogin.addEventListener('click', login);

const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);

function getData(key) {
    return JSON.parse(localStorage.getItem(key));
}

function setData(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}






































