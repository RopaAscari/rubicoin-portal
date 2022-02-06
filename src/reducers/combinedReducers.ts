import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import SetUserReducer from "./setUserReducer";
import SetTokenReducer from "./setTokenReducer";
import SetThemeReducer from "./setThemeReducer";
import SetWalletReducer from "./setWalletReducer";
import localStorage from "redux-persist/es/storage";
import UpdateTransitionReducer from "./updateTransitionReducer";
import SetRecoveryOptionsReducer from "./setRecoveryOptionsReducer";

const persistanceConfiguartion = {
  key: "persist",
  storage: localStorage,
};

const rootReducer = combineReducers({
  user: SetUserReducer,
  token: SetTokenReducer,
  theme: SetThemeReducer,
  wallet: SetWalletReducer,
  transition: UpdateTransitionReducer,
  recovery: SetRecoveryOptionsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export const persistedReducer = persistReducer<any, any>(
  persistanceConfiguartion,
  rootReducer
);
