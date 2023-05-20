import {IInputData} from "../models";

function existUpperAndNumeric(string: string): Boolean {
  return /[A-Z]/.test(string) && /[0-9]/.test(string);
}

function containsSpecialChars(string: string): Boolean {
  const specialChars = /[`!@#$%^&*()+[\]{};':"\\|,.<>\/?~]/;
  return specialChars.test(string);
}

function startWithUpper(string: string): Boolean {
  const FIRST_CHAR = 0;
  return string[FIRST_CHAR].toUpperCase() === string[FIRST_CHAR];
}

function validateLogin(login: string): string {
  if (!login) {
    return "Укажите логин";
  }

  if (login.length < 3 || login.length > 20) {
    return "Логин должен содержать от 3 до 20 символов";
  }

  if (containsSpecialChars(login)) {
    return "Логин не должен содержать спецсимволов";
  } else {
    return "";
  }
}

function validatePassword(password: string): string {
  if (!password) {
    return "Укажите пароль";
  }

  if (password.length < 8 || password.length > 40) {
    return "Пароль должен иметь длину от 8 до 40 символов";
  }
  if (!existUpperAndNumeric(password)) {
    return "Пароль должен содержать хотя бы одну заглавную букву и число";
  } else {
    return "";
  }
}

// function comparePassword(password: string, repeatPassword: string): string {
//  if (!repeatPassword) {
//   return "Укажите пароль ещё раз";
//  }
//  if (password !== repeatPassword) {
//   return "Пароли не совпадают";
//  } else {
//   return "";
//  }
// }

function validateName(name: string): string {
  if (!name) {
    return "Укажите свое Имя";
  }

  if (!startWithUpper(name)) {
    return "Имя должно начинаться с заглавной буквы";
  }

  if (containsSpecialChars(name)) {
    return "Спецсимволы не допустимы";
  } else {
    return "";
  }
}

function validateSoName(soName: string): string {
  if (!soName) {
    return "Укажите свою Фамилию";
  }

  if (!startWithUpper(soName)) {
    return "Фамилию должна начинаться с заглавной буквы";
  }

  if (containsSpecialChars(soName)) {
    return "Спецсимволы не допустимы";
  } else {
    return "";
  }
}

function validatePhone(phone: string): string {
  const phoneRegex = /^[0-9\-\+]{9,15}$/;

  if (!phone) {
    return "Укажите номер";
  }

  if (!phoneRegex.test(phone)) {
    return "Неверный формат номера";
  } else {
    return "";
  }
}

function validateEmail(email: string): string {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!email) {
    return "Укажите email";
  }
  if (!emailRegex.test(email)) {
    return "Укажите корректный email";
  } else {
    return "";
  }
}

export function validateMessage(message: string): string {
  return !message ? "Введите сообщение" : "";
}

export function validateInput(data: IInputData): string {
  let {
    email,
    login,
    display_name,
    password,
    first_name,
    second_name,
    phone,
    oldPassword,
    newPassword,
    repeatNewPassword,
  } = data;

  let error = "";
  if (email || email === "") {
    error = validateEmail(email);
  }

  if (login || login === "") {
    error = validateLogin(login);
  }

  if (display_name || display_name === "") {
    error = validateName(display_name);
  }

  if (password || password === "") {
    error = validatePassword(password);
  }

  if (oldPassword || oldPassword === "") {
    error = validatePassword(oldPassword);
  }

  if (newPassword || newPassword === "") {
    error = validatePassword(newPassword);
  }

  if (repeatNewPassword || repeatNewPassword === "") {
    error = validatePassword(repeatNewPassword);
  }

  // if ((password || password === "") && (repeat_password || repeat_password === "")) {
  //  error = comparePassword(password, repeat_password);
  // }

  if (first_name || first_name === "") {
    error = validateName(first_name);
  }

  if (second_name || second_name === "") {
    error = validateSoName(second_name);
  }

  if (phone || phone === "") {
    error = validatePhone(phone);
  }

  return error;
}

export function validateForm(formClass: string) {
  const form = document.querySelector(formClass);
  const inputs = form?.querySelectorAll(".input-container__input") as NodeListOf<HTMLInputElement>;
  const errors = form?.querySelectorAll(".input-container__error");
  let errorCount = 0;
  errors?.forEach(error => {
    if (error.textContent && error.textContent !== "") {
      errorCount++;
    }
  });

  inputs?.forEach(input => {
    if (!input.value || input.value === "") {
      errorCount++;
    }
  });

  if (errorCount === 0) {
    return true;
  } else {
    alert("Заполните все поля в соответствии с условиями");
    return false;
  }
}

export function validateRepeatPassword(pass: string, repeatPass: string) {
  if (pass === repeatPass) {
    return true;
  } else {
    return "Новые пароль не совпадает";
  }
}
