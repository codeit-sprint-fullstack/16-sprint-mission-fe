// PASSWORD TOGGLE
const toggleBtn = document.querySelectorAll('form > div a')

function togglePassword(){
  event.preventDefault()

  const btnBox = this.parentElement
  const passwordInput = btnBox.getElementsByTagName('input')[0]

  if(passwordInput.type === 'password'){
    passwordInput.type = 'text'
  }else{
    passwordInput.type = 'password'
  }
  btnBox.classList.toggle('on')
}

toggleBtn.forEach((element) => {
  element.addEventListener('click', togglePassword)
})


// SUBMIT BUTTON ENABLED
const myForm = document.getElementsByTagName('form')[0]
const inputs = myForm.querySelectorAll('input')
const submitBtn = myForm.querySelector('.submit-btn')

function formChecker(){
  let inputsValue = []

  for(let i = 0; i <= inputs.length - 1; i++){
    inputsValue[i] = inputs[i].value
  }

  if(inputsValue.every(val => val !== '')){
    submitBtn.disabled = false
  }else{
    submitBtn.disabled = true
  }
}

inputs.forEach((element) => {
  element.addEventListener('keyup', formChecker)
})