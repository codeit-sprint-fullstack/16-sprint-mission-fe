import {
  validateEmail,
  validatePassword,
  validatePasswordConfirm,
  setupPasswordToggle,
} from "../form.js";

import { USER_DATA } from "../userData.js";
import { setupModal } from "../modal.js";

const signupForm = document.querySelector(".signup-form");

const emailInput = document.querySelector("#email");
const nicknameInput = document.querySelector("#nickname");
const passwordInput = document.querySelector("#password");
const passwordConfirmInput =
  document.querySelector("#password-confirm");

const emailError = document.querySelector("#email-error");
const passwordError =
  document.querySelector("#password-error");
const passwordConfirmError =
  document.querySelector("#password-confirm-error");

const passwordInputBoxes =
  document.querySelectorAll(".password-input-box");

const passwordToggles =
  document.querySelectorAll(".password-toggle");

const passwordInputBox = passwordInputBoxes[0];
const passwordConfirmInputBox = passwordInputBoxes[1];

const signupButton =
  document.querySelector(".signup-button");

  const modalElement =
  document.querySelector("#error-modal");

const errorModal = setupModal(modalElement);

function checkEmail() {
  const errorMessage = validateEmail(emailInput.value);
  const hasError = errorMessage !== "";

  emailError.textContent = errorMessage;

  emailInput.classList.toggle("input-error", hasError);
  emailError.classList.toggle("visible", hasError);
}

function checkPassword() {
  const errorMessage =
    validatePassword(passwordInput.value);

  const hasError = errorMessage !== "";

  passwordError.textContent = errorMessage;

  passwordInputBox.classList.toggle(
    "input-error",
    hasError
  );

  passwordError.classList.toggle("visible", hasError);
}

function checkPasswordConfirm() {
  const errorMessage = validatePasswordConfirm(
    passwordInput.value,
    passwordConfirmInput.value
  );

  const hasError = errorMessage !== "";

  passwordConfirmError.textContent = errorMessage;

  passwordConfirmInputBox.classList.toggle(
    "input-error",
    hasError
  );

  passwordConfirmError.classList.toggle(
    "visible",
    hasError
  );
}

function updateSignupButton() {
  const isEmailValid =
    validateEmail(emailInput.value) === "";

  const isNicknameValid =
    nicknameInput.value.trim() !== "";

  const isPasswordValid =
    validatePassword(passwordInput.value) === "";

  const isPasswordConfirmValid =
    validatePasswordConfirm(
      passwordInput.value,
      passwordConfirmInput.value
    ) === "";

  signupButton.disabled = !(
    isEmailValid &&
    isNicknameValid &&
    isPasswordValid &&
    isPasswordConfirmValid
  );
}

function handleSignup(event) {
  event.preventDefault();

  const email = emailInput.value.trim();

  const isEmailUsed = USER_DATA.some((userData) => {
    return userData.email === email;
  });

  if (isEmailUsed) {
    errorModal.openModal("사용 중인 이메일입니다");
    return;
  }

  window.location.href = "/login";
}

emailInput.addEventListener("focusout", checkEmail);
passwordInput.addEventListener("focusout", checkPassword);

passwordConfirmInput.addEventListener(
  "focusout",
  checkPasswordConfirm
);

emailInput.addEventListener("input", updateSignupButton);
nicknameInput.addEventListener(
  "input",
  updateSignupButton
);

passwordInput.addEventListener(
  "input",
  updateSignupButton
);

passwordConfirmInput.addEventListener(
  "input",
  updateSignupButton
);

signupForm.addEventListener("submit", handleSignup);

setupPasswordToggle(
  passwordInput,
  passwordToggles[0]
);

setupPasswordToggle(
  passwordConfirmInput,
  passwordToggles[1]
);