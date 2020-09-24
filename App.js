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

export default function App() {
  const { open, setOpen } = useDrawer();
  return (
    <ThemeProvider>
      <NativeRouter>
        <DrawerContext.Provider value={[open, setOpen]}>
          <SideMenu
            isOpen={open}
            menu={<SidebarMenu />}
            autoClosing
            disableGestures
          >
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
