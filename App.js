import React, { useEffect, useState } from "react";
import { NativeRouter, Route } from "react-router-native";
import { ThemeProvider } from "react-native-elements";
import { loadAsync } from "expo-font";
import Home from "./Views/Home";
import Content from "./Views/Content";
import Courses from "./Views/Courses";
import Quiz from "./Views/Quiz";
import About from "./Views/About";
import Login from "./Views/Login";
import Register from "./Views/Register";
import Profile from "./Views/Profile";
import Question from "./Views/Question";
import DrawerContext from "./Contexts/Drawer";
import useDrawer from "./Hooks/Drawer";
import SideMenu from "react-native-side-menu";
import SidebarMenu from "./Components/SidebarMenu";
import { AppLoading } from "expo";
import Forget from "./Views/Forget";
import MyScore from "./Views/MyScore";
import Stack from "react-router-native-stack";

export default function App() {
  const { open, setOpen } = useDrawer();
  const [load, setLoad] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoad(true);
        await loadAsync({
          dancingScript: require("./assets/fonts/DancingScriptVariableFontwght.ttf"),
          dancingScriptBold: require("./assets/fonts/DancingScriptBold.ttf"),
          roboto: require("./assets/fonts/RobotoRegular.ttf"),
          robotoBold: require("./assets/fonts/RobotoBold.ttf"),
        });
      } catch (e) {
        console.log(e);
      } finally {
        setLoad(false);
      }
    })();
  }, []);

  if (load) {
    return <AppLoading />;
  }

  const theme = {
    colors: {
      primary: "#305b81",
    },
    Button: {
      titleStyle: {
        fontFamily: "roboto",
        color: "#fff",
        fontWeight: "normal",
        fontSize: 15,
      },
      buttonStyle: {
        backgroundColor: "#305b81",
      },
    },
    Header: {
      containerStyle: {
        backgroundColor: "#305b81",
      },
    },
    Text: {
      fontFamily: "roboto",
      fontWeight: "normal",
      h4Style: {
        fontFamily: "dancingScriptBold",
        fontWeight: "normal",
        fontSize: 30,
      },
    },
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };
  return (
    <ThemeProvider theme={theme}>
      <NativeRouter>
        <DrawerContext.Provider value={toggleDrawer}>
          <SideMenu
            menuPosition="right"
            isOpen={open}
            menu={<SidebarMenu />}
            disableGestures
          >
            <Stack>
              <Route
                exact
                path="/"
                animationType="slide-horizontal"
                component={Home}
              />
              <Route
                path="/login"
                animationType="slide-horizontal"
                component={Login}
              />
              <Route
                path="/register"
                animationType="slide-vertical"
                component={Register}
              />
              <Route
                path="/content/:id/:type"
                animationType="slide-vertical"
                component={Content}
              />
              <Route
                path="/course/:id"
                animationType="slide-vertical"
                component={Courses}
              />
              <Route
                path="/quiz/:id"
                animationType="slide-vertical"
                component={Question}
              />
              <Route
                exact
                path="/quiz"
                animationType="slide-horizontal"
                component={Quiz}
              />
              <Route path="/about" component={About} />
              <Route path="/profile" component={Profile} />
              <Route
                path="/forget"
                animationType="slide-vertical"
                component={Forget}
              />
              <Route
                path="/myscore"
                animationType="slide-vertical"
                component={MyScore}
              />
            </Stack>
          </SideMenu>
        </DrawerContext.Provider>
      </NativeRouter>
    </ThemeProvider>
  );
}
