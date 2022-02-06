import {
  WalletState,
  SET_WALLET_ACTION,
  SetWalletActionType,
} from "@typings/wallet";

export const walletInitialState: WalletState | null = {
  wallet: { walletAddress: "", publicKey: "", balance: 0, isHidden: false },
};

export default function SetWalletReducer(
  state = walletInitialState,
  action: SetWalletActionType
): WalletState | null {
  switch (action.type) {
    case SET_WALLET_ACTION:
      return {
        wallet: action.payload,
      };
    default:
      return state;
  }
}
