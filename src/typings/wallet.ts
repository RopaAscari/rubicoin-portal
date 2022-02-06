import { Wallet } from "@constants/constants";

export const SET_WALLET_ACTION = "SET_WALLET_ACTION";

export interface WalletState {
  wallet: Wallet | null;
}

export interface SetWalletActionStore {
  type: typeof SET_WALLET_ACTION;
  payload: Wallet | null;
}

export type SetWalletActionType = SetWalletActionStore;
