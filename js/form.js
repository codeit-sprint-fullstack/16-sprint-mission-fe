// ===== DOM 캐싱 =====
const form = document.querySelector('form');

// ===== 이벤트 핸들러 바인딩 =====
// 비밀번호 보기 토글
form.addEventListener('click', event => {
  const isToggleBtn = event.target.classList.contains('password-toggle-btn');

  if(!isToggleBtn) return;

  const inputBox = event.target.closest('div');
  const input = inputBox.querySelector('input');
  
  input.type = input.type === 'password' ? 'text' : 'password';
  inputBox.classList.toggle('on');
});

// 로그인, 회원가입 버튼 활성화
form.addEventListener('change', event => {
  const inputs = form.querySelectorAll('input');
  const inputsValues = [...inputs].map(input => input.value.trim());
  const isSubmitOk = inputsValues.every(value => value !== '');
  
  const submitBtn = form.querySelector('.submit-btn');

  isSubmitOk ? submitBtn.disabled = false : submitBtn.disabled = true;
});