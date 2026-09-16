export function validateEmail(value) {
  const email = value.trim();

  if (email === "") {
    return "이메일을 입력해주세요.";
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    return "잘못된 이메일 형식입니다";
  }

  return "";
}

export function validatePassword(value) {
  if (value === "") {
    return "비밀번호를 입력해주세요.";
  }

  if (value.length < 8) {
    return "비밀번호를 8자 이상 입력해주세요.";
  }

  return "";
}

export function validatePasswordConfirm(
  password,
  passwordConfirm
) {
  if (passwordConfirm === "") {
    return "비밀번호를 입력해주세요.";
  }

  if (password !== passwordConfirm) {
    return "비밀번호가 일치하지 않습니다.";
  }

  return "";
}

export function setupPasswordToggle(
  passwordInput,
  toggleButton
) {
  const toggleIcon = toggleButton.querySelector("img");

  function togglePasswordVisibility() {
    const isPasswordHidden =
      passwordInput.type === "password";

    passwordInput.type =
      isPasswordHidden ? "text" : "password";

    toggleIcon.alt =
      isPasswordHidden
        ? "비밀번호 표시 중"
        : "비밀번호 숨김";
  }

  toggleButton.addEventListener(
    "click",
    togglePasswordVisibility
  );
}