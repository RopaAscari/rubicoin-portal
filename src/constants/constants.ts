export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  ipAddress: string;
  countryCode:string;
  countryName:string;
  profilePic: string;
  phoneNumber: string;
  walletConnected: boolean;
  miningRigConnected: boolean;
}

export interface Wallet {
  balance: number;
  publicKey: string;
  isHidden: boolean;
  walletAddress: string;
}

export interface Token {
  token?: string | null;
  refreshToken?: string | null;
}

export interface Recovery {
  email?: string | null;
  phoneNumber?: string | null;
  verficationType: string;
}

export interface NavigationItem {
  title: string;
  path: string;
  icon: JSX.Element;
}

export type Color =
  | "white"
  | "primary"
  | "secondary"
  | "info"
  | "success"
  | "warning"
  | "error"
  | "light"
  | "dark";

interface ErrorMessage {
  hasError: boolean;
  message: string | null | undefined;
}
export interface CardForm {
  cvc: ErrorMessage;
  city: ErrorMessage;
  name: ErrorMessage;
  number: ErrorMessage;
  expiry: ErrorMessage;
  address: ErrorMessage;
  country: ErrorMessage;
  province: ErrorMessage;
  postalCode: ErrorMessage;
}

export interface IPResponse {
  success: boolean;
  ipAddress: string | null;
}

export const DESKTOP_APP_NAME = "Rubicoin.exe";

export type TransitionType = "vertical" | "horizontal";

export const GEOLOCATION_API = "https://geolocation-db.com/json/";

export const INPUT_THEME = {
  DARK: {
    style: { color: "#9A9A9A" },
  },
  LIGHT: {
    style: { color: "#9A9A9A" },
  },
} as any;
