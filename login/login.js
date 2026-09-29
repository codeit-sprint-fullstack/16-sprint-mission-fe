import {
  validateEmail,
  validatePassword,
  setupPasswordToggle,
} from "../form.js";

import { USER_DATA } from "../userData.js";
import { setupModal } from "../modal.js";

const emailInput = document.querySelector("#email");
const emailError = document.querySelector("#email-error");
const passwordInput = document.querySelector("#password");
const passwordInputBox = document.querySelector(".password-input-box");
const passwordError = document.querySelector("#password-error");
const loginButton = document.querySelector(".login-button");

const loginForm = document.querySelector(".login-form");
const modalElement = document.querySelector("#error-modal");
const errorModal = setupModal(modalElement);

const passwordToggle =
  document.querySelector(".password-toggle");

function checkEmail() {
  const errorMessage = validateEmail(emailInput.value);
  const hasError = errorMessage !== "";

  emailError.textContent = errorMessage;

  emailInput.classList.toggle("input-error", hasError);
  emailError.classList.toggle("visible", hasError);
}

function checkPassword() {
  const errorMessage = validatePassword(passwordInput.value);
  const hasError = errorMessage !== "";

  passwordError.textContent = errorMessage;

  passwordInputBox.classList.toggle("input-error", hasError);
  passwordError.classList.toggle("visible", hasError);
}

function updateLoginButton() {
  const isEmailValid = validateEmail(emailInput.value) === "";
  const isPasswordValid = validatePassword(passwordInput.value) === "";

  loginButton.disabled = !(isEmailValid && isPasswordValid);
}

function handleLogin(event) {
  event.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  const user = USER_DATA.find((userData) => {
    return userData.email === email;
  });

  if (!user || user.password !== password) {
    errorModal.openModal("비밀번호가 일치하지 않습니다.");
    return;
  }

  window.location.href = "/items";
}

emailInput.addEventListener("focusout", checkEmail);
passwordInput.addEventListener("focusout", checkPassword);

emailInput.addEventListener("input", updateLoginButton);
passwordInput.addEventListener("input", updateLoginButton);

loginForm.addEventListener("submit", handleLogin);

setupPasswordToggle(
  passwordInput,
  passwordToggle
);