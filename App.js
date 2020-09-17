import React, { useEffect, useState } from "react";
import { NativeRouter, Route } from "react-router-native";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import Home from "./Views/Home";
import Content from "./Views/Content";

export default function App() {
  const [loadFont, setLoadFont] = useState(true);

  useEffect(() => {
    (async () => {
      await Font.loadAsync({
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      });
      setLoadFont(false);
    })();
  }, []);

  return loadFont ? (
    <AppLoading />
  ) : (
    <NativeRouter>
      <Route exact path="/" component={Home} />
      <Route path="/video" component={Content} />
    </NativeRouter>
  );
}
