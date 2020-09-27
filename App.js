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
          <SideMenu isOpen={open} menu={<SidebarMenu />} disableGestures>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/content/:id" component={Content} />
            <Route path="/course/:id" component={Courses} />
            <Route path="/quiz/:id" component={Question} />
            <Route exact path="/quiz" component={Quiz} />
            <Route path="/about" component={About} />
            <Route path="/profile" component={Profile} />
          </SideMenu>
        </DrawerContext.Provider>
      </NativeRouter>
    </ThemeProvider>
  );
}
