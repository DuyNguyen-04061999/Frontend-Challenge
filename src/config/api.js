import { interceptorsRequest, interceptorsResponse } from "@/utils";
import axios from "axios";

export const AUTH_API = import.meta.env.VITE_AUTH_API;
export const PRODUCT_API = import.meta.env.VITE_PRODUCT_API;
export const USER_API = import.meta.env.VITE_USER_API;
export const api = axios.create();
interceptorsRequest(api);
interceptorsResponse(api);
