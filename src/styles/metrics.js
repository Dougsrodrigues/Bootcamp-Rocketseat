import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window"); // pega a altura e largura do user

export default {
  baseMargin: 10,
  basePadding: 20,
  baseRadius: 3,

  srenWidth: width < height ? width : height, //caso o celular esteja em modo retrato
  srenHeight: width < height ? height : width
};
