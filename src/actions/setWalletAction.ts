import { Wallet } from "@constants/constants";
import { SET_WALLET_ACTION, SetWalletActionType } from "@typings/wallet";

export function SetWalletAction(wallet: Wallet | null): SetWalletActionType {
  return {
    type: SET_WALLET_ACTION,
    payload: wallet,
  };
}
