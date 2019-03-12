import {
  createAppContainer,
  createSwitchNavigator,
  createBottomTabNavigator
} from "react-navigation";
//createSwitchNavigator não retorna nada visual
import Welcome from "./pages/Welcome";
import Repositories from "./pages/Repositories";
import Organizations from "./pages/Organization";

import { colors } from "./styles";

const Routes = (userLogged = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Welcome,
        User: createBottomTabNavigator(
          {
            Repositories,
            Organizations
          },
          {
            tabBarOptions: {
              // Barra de baixo do celular
              showIcon: true,
              showLabel: false,
              activeTintColor: colors.white,
              inactiveTintColor: colors.whiteTransparent,
              style: {
                backgroundColor: colors.secundary
              }
            }
          }
        )
      },
      {
        initialRouteName: userLogged ? "User" : "Welcome"
      }
    )
  ); // Container onde vão estar todas as rotas da navegação

export default Routes;
