// main.js

const USER_DATA = [
  { email: 'codeit1@codeit.com', password: "codeit101!" },
  { email: 'codeit2@codeit.com', password: "codeit202!" },
  { email: 'codeit3@codeit.com', password: "codeit303!" },
  { email: 'codeit4@codeit.com', password: "codeit404!" },
  { email: 'codeit5@codeit.com', password: "codeit505!" },
  { email: 'codeit6@codeit.com', password: "codeit606!" },
];

const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('userEmail');
const passwordInput = document.getElementById('userPassword');

if (loginForm) {
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const enteredEmail = emailInput.value.trim();
    const enteredPassword = passwordInput.value.trim();

    const userExists = USER_DATA.some(
      (user) => user.email === enteredEmail && user.password === enteredPassword
    );

    if (!userExists) {
      alert('비밀번호가 일치하지 않습니다.');
    } else {
      alert('로그인 성공!');
    }
  });
}

const signupForm = document.getElementById('signupForm');

if (signupForm) {
  signupForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const signupEmailInput = signupForm.querySelector('#userEmail');
    const signupPasswordInput = signupForm.querySelector('#userPassword');
    const signupConfirmPasswordInput = signupForm.querySelector('#userConfirmPassword');

    const enteredEmail = signupEmailInput.value.trim();
    const enteredPassword = signupPasswordInput.value.trim();
    const enteredConfirmPassword = signupConfirmPasswordInput ? signupConfirmPasswordInput.value.trim() : '';

    const isEmailTaken = USER_DATA.some((user) => user.email === enteredEmail);

    if (isEmailTaken) {
      alert('이미 사용중인 이메일입니다.');
      return;
    }

    if (enteredPassword !== enteredConfirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    alert('회원가입 성공!');
  });
}