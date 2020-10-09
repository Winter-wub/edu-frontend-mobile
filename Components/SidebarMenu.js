import React, { useContext, useEffect, useState } from "react";
import DrawerContext from "../Contexts/Drawer";
import { useHistory } from "react-router-native";
import { auth, firestore } from "../Utils/firebase";
import config from "../config.json";
import { ScrollView, View } from "react-native";
import { Avatar, Button, ListItem, Text } from "react-native-elements";

export default function SidebarMenu() {
  const [userInfo, setUserInfo] = useState(null);
  const toggleDrawer = useContext(DrawerContext);
  const history = useHistory();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        (async () => {
          const userInfoRef = firestore
            .collection(config.collections.students)
            .doc(user.uid);
          const userInfo = {
            ...(await userInfoRef.get()).data(),
            id: userInfoRef.id,
          };
          setUserInfo(userInfo);
        })();
      } else {
        setUserInfo(null);
      }
    });
  }, []);

  const onPressSignOut = async () => {
    await auth.signOut();
  };

  const onPressSignIn = async () => {
    history.push("/login");
    toggleDrawer();
  };

  const menu = [
    {
      id: "1",
      title: "📹 Video",
      path: "/course/videos",
    },
    {
      id: "2",
      title: "📒 Essay",
      path: "/course/essays",
    },
    {
      id: "3",
      title: "📖 Vocabulary",
      path: "/course/vocab",
    },
    {
      id: "4",
      title: "⭐️ My Score",
      path: "/myscore",
    },
  ];

  return (
    <View
      style={{
        display: "flex",
        justifyContent: "flex-start",
        height: "100%",
        // backgroundColor: "#4285F4",
      }}
    >
      <View
        style={{
          marginBottom: 5,
          padding: 15,
          backgroundColor: "#4285F4",
          borderBottomLeftRadius: 15,
        }}
      >
        <View
          style={{
            paddingTop: 25,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#4285F4",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 10,
              backgroundColor: "#4285F4",
            }}
          >
            <Avatar
              rounded
              icon={{ name: "user-astronaut", type: "font-awesome-5" }}
              activeOpacity={0.8}
              containerStyle={{ backgroundColor: "#000000" }}
            />
            <Text style={{ marginLeft: 8, color: "#fff" }}>
              {userInfo?.fullname ?? "Not sign In"}
            </Text>
          </View>

          {userInfo ? (
            <Button
              buttonStyle={{ backgroundColor: "transparent" }}
              titleStyle={{ color: "red" }}
              title="Sign out"
              onPress={onPressSignOut}
            />
          ) : (
            <Button
              type="clear"
              buttonStyle={{ backgroundColor: "transparent" }}
              titleStyle={{ color: "#ffffff" }}
              title="Sign in"
              onPress={onPressSignIn}
            />
          )}
        </View>
      </View>
      <ScrollView contentContainerStyle={{ backgroundColor: "white" }}>
        {menu.map((item) => (
          <ListItem
            bottomDivider
            key={item.id}
            onPress={() => {
              history.push(item.path);
              toggleDrawer();
            }}
          >
            <ListItem.Content>
              <ListItem.Title>{item.title}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </ScrollView>
    </View>
  );
}
