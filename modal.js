export function setupModal(modalElement) {
  const messageElement =
    modalElement.querySelector(".modal-message");

  const confirmButton =
    modalElement.querySelector(".modal-confirm-button");

  function openModal(message) {
    messageElement.textContent = message;
    modalElement.hidden = false;
  }

  function closeModal() {
    modalElement.hidden = true;
  }

  confirmButton.addEventListener("click", closeModal);

  return {
    openModal,
    closeModal,
  };
}