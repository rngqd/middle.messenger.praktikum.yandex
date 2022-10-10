import {IInputData} from "../models";

function existUpperAndNumeric(string: string): Boolean {
 return /[A-Z]/.test(string) && /[0-9]/.test(string);
}

function containsSpecialChars(string: string): Boolean {
 const specialChars = /[`!@#$%^&*()+[\]{};':"\\|,.<>\/?~]/;
 return specialChars.test(string);
}

function startWithUpper(string: string): Boolean {
 return string[0].toUpperCase() === string[0];
}

function validateLogin(login: string): string {
 if (!login) return "Укажите логин";

 if (login.length < 3 || login.length > 20) {
  return "Логин должен содержать от 3 до 20 символов";
 }

 if (containsSpecialChars(login)) {
  return "Логин не должен содержать спецсимволов";
 } else return "";
}

function validatePassword(password: string): string {
 if (!password) return "Укажите пароль";

 if (password.length < 8 || password.length > 40) {
  return "Пароль должен иметь длину от 8 до 40 символов";
 }
 if (!existUpperAndNumeric(password)) {
  return "Пароль должен содержать хотя бы одну заглавную букву и число";
 } else return "";
}

function comparePassword(password: string, repeatPassword: string): string {
 if (!repeatPassword) return "Укажите пароль ещё раз";
 if (password !== repeatPassword) {
  return "Пароли не совпадают";
 }
 return "";
}

function validateName(name: string): string {
 if (!name) return "Укажите данные";

 if (!startWithUpper(name)) {
  return "Имя должно начинаться с заглавной буквы";
 }

 if (containsSpecialChars(name)) {
  return "Спецсимволы не допустимы";
 } else return "";
}

function validatePhone(phone: string): string {
 const phoneRegex = /^[0-9\-\+]{9,15}$/;

 if (!phone) return "Укажите номер";

 if (!phoneRegex.test(phone)) {
  return "Неверный формат номера";
 } else return "";
}

function validateEmail(email: string): string {
 const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
 if (!email) return "Укажите email";
 if (!emailRegex.test(email)) {
  return "Укажите корректный email";
 } else return "";
}

export function validateMessage(message: string): string {
 return !message ? "Введите сообщение" : "";
}

export function validateInput(data: IInputData, errors: IInputData): IInputData {
 let {email, login, display_name, password, repeat_password, first_name, second_name, phone} = data;

 if (email || email === "") {
  errors.email = validateEmail(email);
 }

 if (login || login === "") {
  errors.login = validateLogin(login);
 }

 if (display_name || display_name === "") {
  errors.display_name = validateName(display_name);
 }

 if (password || password === "") {
  errors.password = validatePassword(password);
 }

 if ((password || password === "") && (repeat_password || repeat_password === "")) {
  errors.repeat_password = comparePassword(password, repeat_password);
 }

 if (first_name || first_name === "") {
  errors.first_name = validateName(first_name);
 }

 if (second_name || second_name === "") {
  errors.second_name = validateName(second_name);
 }

 if (phone || phone === "") {
  errors.phone = validatePhone(phone);
 }

 return errors;
}
