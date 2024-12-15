const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);

const navLoginBtn = $('.nav-login');
const navRegisterBtn = $('.nav-register');
const navHomeBtn = $('.nav-home');

navLoginBtn.addEventListener('click', () => displayContent('login'));
navRegisterBtn.addEventListener('click', () => displayContent('register'));
navHomeBtn.addEventListener('click', () => displayContent('/'));

function getData(key) {
    return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : [];
}

function setData(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

const displayContent = (path) => {
    const formLogin = $('.login-form');
    const formRegister = $('.register-form');
    const home = $('.home');
    switch (path) {
        case 'login':
            formLogin.classList.add('show');
            formLogin.classList.remove('hidden');

            formRegister.classList.add('hidden');
            formRegister.classList.remove('show');

            home.classList.add('hidden');
            home.classList.remove('show');

            return;
        case 'register':
            formRegister.classList.add('show');
            formRegister.classList.remove('hidden');

            formLogin.classList.add('hidden');
            formLogin.classList.remove('show');

            home.classList.add('hidden');
            home.classList.remove('show');
            return;
        default:
            home.classList.add('show');
            home.classList.remove('hidden');

            formRegister.classList.add('hidden');
            formRegister.classList.remove('show');

            formLogin.classList.add('hidden');
            formLogin.classList.remove('show');

            if (localStorage.getItem('userId')) {
                const userListDiv = $('.user-list');
                userListDiv.classList.add('show');
                userListDiv.classList.remove('hidden');
                displayUserList();
            }


            return;
    }
}

displayContent("/");


function register() {

    const userList = getData('users');

    const firstnameInput = $('#firstname-register');
    const lastnameInput = $('#lastname-register');
    const emailInput = $('#email-register');
    const passwordInput = $('#password-register');

    const userInfo = {
        id: userList.length === 0 ? 1 : userList.length + 1,
        firstName: firstnameInput.value,
        lastName: lastnameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
    }
    if (!userInfo.firstName || !userInfo.lastName || !userInfo.email || !userInfo.password) {
        alert('Hãy điền đầy đủ thông tin ')
        return;
    }
    for (let user of userList) {
        if (user.email === userInfo.email) {
            alert("Email này đã được đăng ký")
            return;
        }
    }
    alert('Đã đăng ký thành công')
    firstnameInput.value = '';
    lastnameInput.value = '';
    emailInput.value = '';
    passwordInput.value = '';

    userList.push(userInfo);
    setData('users', userList)
}

const registerBtn = $('.registerbtn');
registerBtn.addEventListener('click', register);


function login() {
    const userList = getData('users');

    const emailInput = $('#email-login');
    const passwordInput = $('#password-login');

    const userInfo = {
        email: emailInput.value,
        password: passwordInput.value,
    }
    emailInput.value = '';
    passwordInput.value = '';

    if(!userInfo.email|| !userInfo.password) {
        alert('Hãy nhập đầy đủ thông tin')
        return;
    }

    for (let user of userList) {
        if (user.email === userInfo.email && user.password === userInfo.password) {
            alert(`Xin chào ${user.firstName} ${user.lastName}`);
            setData('userId', user.id);
            displayContent('/');
            return;
        }
    }
    alert('Thông tin tài khoản không chính xác')


}
const loginBtn = $('.login-btn');
loginBtn.addEventListener('click',login);

function displayUserList(data) {

    const userList = data ? data : getData('users');
    const tbody = $('tbody');
    tbody.innerHTML = '';

    for (let user of userList) {
        tbody.innerHTML += `<tr>
            <td>${user.id}</td>
            <td>${user.firstName} ${user.lastName}</td>
            <td>${user.email}</td>
        </tr>`
    }
}

function searchUser() {
    const searchInput = $('.search');
    const userList = getData('users');
    let newUserList = [];

    if (searchInput.value != null) {
        for (let user of userList) {
            if (user.email.includes(searchInput.value) || user.lastName.includes(searchInput.value) || user.firstName.includes(searchInput.value)) {
                newUserList.push(user);
            }
        }
    }

    displayUserList(newUserList);

    // userList.filter(function(user, index) {
    //     return user.email.includes(searchInput.value) || user.lastName.includes(searchInput.value) || user.firstName.includes(searchInput.value);
    // })

}

const searchBtn = $('.search-btn');
searchBtn.addEventListener('click', searchUser)


const posts = [
    {
        id: 1,
        title:'Quả táo',
        content:'Táo rất tốt cho sức khỏe',
        image: './img/pngtree-apple-png-with-ai-generated-png-image_11567285.png',
        created_at: '2018-06-01',
        updated_at: '2018-06-01',
        user_id: 1,
    }
]

function displayPosts(posts) {
    const postsDiv = $('.posts');
    const htmls = posts.map((post) => `
        <div class="card mt-18" > 
            <p class="card-title">${post.title}</p>
            <p class="card-text">${post.content}</p>
            <img src=${post.image} class="card-img-top">
            <p>${post.created_at}</p>
            <p>${post.updated_at}</p>
            <p>${post.user_id}</p>
        </div>
    `).join('');

    postsDiv.innerHTML += htmls;
}

displayPosts(posts);




























