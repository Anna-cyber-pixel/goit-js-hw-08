import throttle from 'lodash.throttle';

const ref = {
  input: document.querySelector('input'),
  textarea: document.querySelector('textarea'),
  form: document.querySelector('.feedback-form'),
};

lastInputForm();

const formData = {};
ref.form.addEventListener('input', throttle(onInputForm, 500));
function onInputForm(e) {
  formData.email = ref.input.value;
  formData.message = ref.textarea.value;
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

function lastInputForm() {
  const savedFormData = localStorage.getItem('feedback-form-state');
  if (savedFormData) {
    const date = JSON.parse(savedFormData);
    if (date.email) {
      ref.input.value = date.email;
    }
    if (date.message) {
      ref.textarea.value = date.message;
    }
  }
}

ref.form.addEventListener('submit', onSubForm);
function onSubForm(e) {
  console.log(formData);
  e.preventDefault();
  e.currentTarget.reset();
  localStorage.removeItem('feedback-form-state');
}
