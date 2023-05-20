export interface IInputData {
  email?: string;
  login?: string;
  password?: string;
  repeat_password?: string;
  first_name?: string;
  display_name?: string;
  second_name?: string;
  phone?: string;
  oldPassword?: string;
  newPassword?: string;
  repeatNewPassword?: string;
}

export type Indexed<T = any> = {
  [key in string]: T;
};

export interface LoginData {
  login: string;
  password: string;
}

export interface SignupData {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export interface User {
  id: number;
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
  avatar: string;
}

export interface EditProfileData {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
}

export interface EditProfilePassword {
  oldPassword: string;
  newPassword: string;
}

export interface EditProfileData {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
}

export interface ChatData {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: {
    user: User;
    time: string;
    content: string;
  };
}

export interface Message {
  chat_id: string;
  content: string;
  file: string;
  id: number;
  is_read: boolean;
  time: string;
  type: string;
  user_id: number;
}
