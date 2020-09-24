import React, { useContext, useEffect, useState } from "react";
import DrawerContext from "../Contexts/Drawer";
import { useHistory } from "react-router-native";
import { auth, firestore } from "../Utils/firebase";
import config from "../config.json";
import { ScrollView, View } from "react-native";
import { Avatar, Button, ListItem, Text } from "react-native-elements";

export default function SidebarMenu() {
  const [userInfo, setUserInfo] = useState(null);
  const [drawer, setDrawer] = useContext(DrawerContext);
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
    setDrawer(!drawer);
  };

  const menu = [
    {
      id: "1",
      title: "Video",
      path: "/course/videos",
    },
    {
      id: "2",
      title: "Essay",
      path: "/course/essays",
    },
    {
      id: "3",
      title: "Vocabulary",
      path: "/course/vocab",
    },
    // {
    //   id: "4",
    //   title: "Article",
    //   path: "/articles",
    // },
  ];

  return (
    drawer && (
      <View
        style={{
          display: "flex",
          justifyContent: "flex-start",
          paddingTop: 25,
          height: "100%",
        }}
      >
        <View style={{ marginBottom: 5, padding: 15 }}>
          <View
            style={{
              padding: 2,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <Avatar
              rounded
              icon={{ name: "user", type: "font-awesome" }}
              activeOpacity={0.8}
              containerStyle={{ backgroundColor: "#d2d2d2" }}
            />
            <Text style={{ marginLeft: 5 }}>
              {userInfo?.fullname ?? "Not sign In"}
            </Text>
            {userInfo ? (
              <Button type="clear" title="Sign out" onPress={onPressSignOut} />
            ) : (
              <Button type="clear" title="Sign in" onPress={onPressSignIn} />
            )}
          </View>
        </View>
        <ScrollView>
          {menu.map((item) => (
            <ListItem
              bottomDivider
              key={item.id}
              onPress={() => {
                history.push(item.path);
                setDrawer(false);
              }}
            >
              <ListItem.Content>
                <ListItem.Title>{item.title}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          ))}
        </ScrollView>
      </View>
    )
  );
}
