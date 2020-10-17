import React from "react";
import { NativeRouter, Route } from "react-router-native";
import { ThemeProvider } from "react-native-elements";
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
import Forget from "./Views/Forget";
import MyScore from "./Views/MyScore";
import Stack from "react-router-native-stack";
import useInitApp from "./Hooks/InitialApp";
import UpdateDialog from "./Components/UpdateDialog";
import theme from "./theme";
import { AppLoading } from "expo";

export default function App() {
  const { open, setOpen } = useDrawer();
  const {
    isInitialing: load,
    initResource,
    setLoad,
    hasUpdate,
    setConfirmUpdate,
  } = useInitApp();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  if (load) {
    return (
      <AppLoading
        startAsync={initResource}
        onFinish={async () => {
          setLoad(false);
        }}
        onError={(error) => {
          console.warn(error);
        }}
      />
    );
  } else {
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
              <Stack gestureEnabled={false}>
                <Route
                  exact
                  path="/"
                  animationType="slide-horizontal"
                  component={Home}
                />
                <Route path="/login" animationType="none" component={Login} />
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
        <UpdateDialog
          showUpdate={hasUpdate}
          handleShowUpdate={setConfirmUpdate}
        />
      </ThemeProvider>
    );
  }
}
