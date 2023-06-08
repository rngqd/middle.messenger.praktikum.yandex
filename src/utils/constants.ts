import {RouterPath} from "../models/enums";

export const SOCKET_API_URL = "wss://ya-praktikum.tech/ws/chats/";

export const API_URL = "https://ya-praktikum.tech/api/v2";

export const RESOURCE_URL = "https://ya-praktikum.tech/api/v2/resources";

export const unProtectedRedirects: string[] = [RouterPath.default, RouterPath.register, RouterPath.login];

export const protectedRedirects: string[] = [
  RouterPath.profile,
  RouterPath.editProfile,
  RouterPath.editProfilePassword,
  RouterPath.chats,
];
