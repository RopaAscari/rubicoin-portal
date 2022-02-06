import { Routes } from "@enums/enums";
import { Wallet } from "@styled-icons/entypo/Wallet";
import { Settings } from "@styled-icons/evaicons-solid/Settings";
import { Dashboard } from "@styled-icons/boxicons-solid/Dashboard";
import { InprivateAccount } from "@styled-icons/fluentui-system-filled/InprivateAccount";
import { BuildingBankToolbox } from "@styled-icons/fluentui-system-filled/BuildingBankToolbox";

const sidebarConfig = [
  {
    info: "",
    title: Routes.Dashboard,
    icon: <Dashboard size="25" />,
    path: `/${Routes.App}/${Routes.Dashboard}`,
  },
  {
    info: "",
    title: Routes.Wallet,
    icon: <Wallet size="25" />,
    path: `/${Routes.App}/${Routes.Wallet}`,
  },
  {
    info: "",
    title: Routes.Mining,
    icon: <BuildingBankToolbox size="25" />,
    path: `/${Routes.App}/${Routes.Mining}`,
  },
  {
    info: "",
    title: Routes.Profile,
    icon: <InprivateAccount size="25" />,
    path: `/${Routes.App}/${Routes.Profile}`,
  },
  {
    info: "",
    title: Routes.Settings,
    icon: <Settings size="25" />,
    path: `/${Routes.App}/${Routes.Settings}`,
  },
];

export default sidebarConfig;
