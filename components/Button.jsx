import { Platform } from "react-native";
import ButtonAndroid from "./Button.android";
import ButtonIOS from "./Button.ios";
import ButtonWeb from "./Button.web";

// Seleciona automaticamente o componente de acordo com a plataforma
const Button = Platform.select({
  android: ButtonAndroid,
  ios: ButtonIOS,
  default: ButtonWeb,
});

export default Button;
