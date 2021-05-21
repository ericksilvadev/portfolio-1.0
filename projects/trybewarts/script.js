// criar radio buttons

const rate = document.querySelector('.label-rate-container');

function createRate() {
  for (let index = 1; index < 11; index += 1) {
    const div = document.createElement('div');
    const radioBtn = document.createElement('input');
    const label = document.createElement('label');
    label.setAttribute('for', index);
    label.innerHTML = `${index} `;
    label.classList.add('form-check-label');
    div.classList.add('rate-container')
    radioBtn.setAttribute('type', 'radio');
    radioBtn.setAttribute('data-validate-field', 'radio');
    radioBtn.id = index;
    radioBtn.classList.add('form-check-input', 'rate', 'form__radio');
    radioBtn.setAttribute('name', 'rate');
    radioBtn.setAttribute('value', index);
    rate.appendChild(div);
    div.appendChild(radioBtn);
    div.appendChild(label);
  }
}

createRate();

// habilitar botão enviar

const agreement = document.querySelector('#agreement');
const submitBtn = document.querySelector('#submit-btn');

agreement.addEventListener('click', () => {
  if (agreement.hasAttribute('checked')) {
    agreement.removeAttribute('checked');
  } else {
    agreement.setAttribute('checked', '');
  }
});

function activeBtn() {
  if (agreement.hasAttribute('checked')) {
    submitBtn.removeAttribute('disabled');
    submitBtn.classList.add('able');
  } else {
    submitBtn.setAttribute('disabled', '');
    submitBtn.classList.remove('able');
  }
}

agreement.addEventListener('click', activeBtn);

// verificação login

const loginBtn = document.querySelector('.login-btn');
const login = document.querySelector('#login');
const pass = document.querySelector('#password');
const emailValid = /\w{5,15}/;
const passValid = /\w{8,20}/;

loginBtn.addEventListener('click', () => {
  console.log(emailValid.test(login.value), passValid.test(pass.value));
  if (emailValid.test(login.value) && passValid.test(pass.value)) {
    window.alert('Olá, Tryber!');
  } else {
    window.alert('Login ou senha inválidos.');
  }
});

// contador de caracteres textarea

const textarea = document.querySelector('#textarea');
const counterN = 500;
const counterTxt = document.querySelector('.counter');

function counter() {
  const x = counterN - textarea.value.length;
  counterTxt.innerHTML = x;
}

textarea.addEventListener('keyup', counter);

// formulario submit

const getName = document.querySelector('#input-name');
const getLastName = document.querySelector('#input-lastname');
const getEmail = document.querySelector('#input-email');
const getHouse = document.querySelector('#house');
const getFamily = document.querySelectorAll('.family');
const getSubject = document.querySelectorAll('.subject');
const getRateRadio = document.querySelectorAll('.rate');
const form = document.querySelector('.form');

function getFamilySelected() {
  let familyCheck;
  for (let index = 0; index < getFamily.length; index += 1) {
    if (getFamily[index].checked) {
      familyCheck = getFamily[index].value;
    }
  }
  return familyCheck;
}

function getRateSelected() {
  let rateCheck;
  for (let index = 0; index < getRateRadio.length; index += 1) {
    if (getRateRadio[index].checked) {
      rateCheck = getRateRadio[index].value;
    }
  }
  console.log(rateCheck);
  return rateCheck;
}

function getSubjectSelected() {
  let subjectSelected = [];
  for (let index = 0; index < getSubject.length; index += 1) {
    if (getSubject[index].checked) {
      subjectSelected.push(getSubject[index].value);
    }
  }
  subjectSelected = subjectSelected.join(', ');
  console.log(subjectSelected);
  return subjectSelected;
}

// infos align items

function align() {
  form.style.justifyContent = 'space-between';
  form.style.alignItems = 'center';
}

// display infos

const submitForm = () => {
    const subjects = getSubjectSelected();
    console.log(subjects);
    if (subjects.length < 1) {
      return;
    }
    form.innerHTML = '';
    const fullName = `Nome: ${getName.value} ${getLastName.value}`;
    const email = `Email: ${getEmail.value}`;
    const house = `Casa: ${getHouse.value}`;
    const family = `Família: ${getFamilySelected()}`;
    const subject = `Matérias: ${getSubjectSelected()}`;
    const evaluation = `Avaliação: ${getRateSelected()}`;
    const comment = `Observações: ${textarea.value}`;
    const infos = [fullName, email, house, family, subject, evaluation, comment];
    for (let index = 0; index < infos.length; index += 1) {
      const paragraph = document.createElement('p');
      paragraph.classList.add('infos-p');
      paragraph.innerHTML = infos[index];
      form.appendChild(paragraph);
    }
    align();
};

// form check

new window.JustValidate('.js-form', {
  rules: {
    firstname: {
      required: true,
      minLength: 3,
      maxLength: 15,
    },
    lastname: {
      required: true,
      minLength: 3,
      maxLength: 15,
    },
    email: {
      required: true,
      email: true,
    },
    radio: {
      required: true,
    },
    radio1: {
      required: true,
    },
    text: {
      required: true,
    },
  },

  submitHandler: function (form, values, ajax) {
    ajax({
        url: 'https://just-validate-api.herokuapp.com/submit',
        method: 'POST',
        data: values,
        async: true,
        callback: function (response) {
            submitForm();
        },
        error: function (response) {
            alert('Insira todos os dados corretamente.')
        }
    });
},
});

// login on mobile 

const loginIcon = document.querySelector('.login-icon');
const loginField = document.querySelector('.login-field');
const logo = document.querySelector('.logo');
let active = false;

loginIcon.addEventListener('click', () => {
  if (!active) {
    active = true
    loginField.classList.add('active');
    loginIcon.classList.add('active');
    logo.classList.add('active');
  } else {
    active = false
    loginField.classList.remove('active');
    loginIcon.classList.remove('active');
    logo.classList.remove('active');
  }
});

// reload window

logo.addEventListener('click', () => {
  location.reload();
});
