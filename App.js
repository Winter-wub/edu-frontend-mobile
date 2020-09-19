import React from "react";
import { NativeRouter, Route } from "react-router-native";
import { ThemeProvider } from "react-native-elements";
import Home from "./Views/Home";
import Content from "./Views/Content";
import Courses from "./Views/Courses";
import Quiz from "./Views/Quiz";
import About from "./Views/About";

export default function App() {
  return (
    <ThemeProvider>
      <NativeRouter>
        <Route exact path="/" component={Home} />
        <Route path="/content/:id" component={Content} />
        <Route path="/course/:id" component={Courses} />
        <Route path="/quiz" component={Quiz} />
        <Route path="/about" component={About} />
      </NativeRouter>
    </ThemeProvider>
  );
}
