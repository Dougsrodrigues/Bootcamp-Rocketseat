import Reactotron from "reactotron-react-native";

if (__DEV__) {
  const tron = Reactotron.configure()
    .useReactNative()
    .connect(); // let's connect!
  console.tron = tron;

  tron.clear();
}
