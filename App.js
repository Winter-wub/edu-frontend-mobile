import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NativeRouter, Route } from "react-router-native";
import Home from "./Views/Home";
import * as Font from "expo-font";
import { AppLoading } from "expo";

const Courses = () => {
  return (
    <View style={styles.container}>
      <Text>Course 1231312313</Text>
    </View>
  );
};

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
      <Route exact path="/course" component={Courses} />
    </NativeRouter>
  );
}

const styles = StyleSheet.create({
  subNavItem: {
    padding: 5,
  },
});
