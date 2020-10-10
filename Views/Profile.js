import React, { useContext, useEffect, useState } from "react";
import Container from "../Components/ViewContainer";
import Header from "../Components/Header";
import { auth, firestore } from "../Utils/firebase";
import { useHistory } from "react-router-native";
import Footer from "../Components/Footer";
import { ActivityIndicator, ScrollView, View } from "react-native";
import config from "../config.json";
import {
  Avatar,
  Button,
  Divider,
  Icon,
  Input,
  Overlay,
  Text,
  ThemeContext,
} from "react-native-elements";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers";

export default function Profile() {
  const schema = yup.object().shape({
    email: yup.string().email(),
    password: yup.string().min(8),
    fullname: yup.string(),
  });
  const history = useHistory();
  const [userData, setUserData] = useState();
  const [load, setLoad] = useState(true);
  const [update, setUpdate] = useState(false);
  const [complete, setComplete] = useState(false);
  const [error, setError] = useState(false);
  const [isSignin, setSignIn] = useState(false);
  const { control, handleSubmit, errors, formState } = useForm({
    resolver: yupResolver(schema),
  });
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        setSignIn(false);
      } else {
        (async () => {
          try {
            setSignIn(true);
            const userInfoRef = await firestore
              .collection(config.collections.students)
              .doc(user.uid)
              .get();
            if (userInfoRef.exists) {
              const userData = userInfoRef.data();
              setUserData({
                id: userInfoRef.id,
                ...userData,
              });
            } else {
              setSignIn(false);
            }
          } catch (e) {
            console.log(e);
            setError(true);
          } finally {
            setLoad(false);
          }
        })();
      }
    });
  }, []);
  const { dirtyFields } = formState;

  const onPressUpdate = async (data) => {
    try {
      setUpdate(true);
      if (dirtyFields.email) {
        console.log("✅ update email");
        await auth.currentUser.updateEmail(data.email);
        await firestore
          .collection(config.collections.students)
          .doc(auth.currentUser.uid)
          .set(
            {
              email: data.email,
            },
            { merge: true }
          );
      }
      if (dirtyFields.password) {
        await auth.currentUser.updatePassword(data.password);
      }
      if (dirtyFields.fullname) {
        await firestore
          .collection(config.collections.students)
          .doc(auth.currentUser.uid)
          .set(
            {
              fullname: data.fullname,
            },
            { merge: true }
          );
      }
      setComplete(true);
    } catch (e) {
      console.log(e);
      setError(true);
      setTimeout(async () => {
        if (e.message.includes("recent authentication")) {
          await auth.signOut();
          history.push("/login");
        }
      }, 3000);
    } finally {
      setUpdate(false);
    }
  };

  return (
    <Container>
      <Header title="Profile" />
      <ScrollView>
        {isSignin ? (
          !load && (
            <View
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 15,
              }}
            >
              <Avatar
                size="large"
                rounded
                icon={{ name: "user-astronaut", type: "font-awesome-5" }}
                activeOpacity={0.8}
                containerStyle={{ backgroundColor: "#000" }}
              />
              <Controller
                defaultValue={userData?.fullname}
                name="fullname"
                control={control}
                render={({ onChange, value }) => (
                  <Input
                    label="Name"
                    onChangeText={onChange}
                    value={value}
                    containerStyle={{ marginTop: 15 }}
                    style={{ padding: 1 }}
                    errorMessage={
                      errors?.fullname && "กรุณากรอกข้อมูลให้ถูกต้อง"
                    }
                  />
                )}
              />
              <Controller
                defaultValue={userData?.email ?? ""}
                name="email"
                render={({ onChange, value }) => (
                  <Input
                    label="Email"
                    placeholder="Email"
                    onChangeText={onChange}
                    value={value}
                    containerStyle={{ marginTop: 15 }}
                    style={{ padding: 1 }}
                    errorMessage={errors?.email && "กรุณากรอกข้อมูลให้ถูกต้อง"}
                  />
                )}
                control={control}
              />
              <Controller
                defaultValue="*********"
                name="password"
                render={({ onChange, value }) => (
                  <Input
                    onFocus={() => {
                      onChange("");
                    }}
                    label="Change Password"
                    placeholder="Change Password"
                    onChangeText={onChange}
                    value={value}
                    containerStyle={{ marginTop: 15 }}
                    style={{ padding: 1 }}
                    secureTextEntry
                    errorMessage={
                      errors?.password &&
                      "กรุณากรอกข้อมูลให้ถูกต้อง และต้องมากกว่า 8 ตัว"
                    }
                  />
                )}
                control={control}
              />
              <Button
                title="Update Profile"
                onPress={handleSubmit(onPressUpdate)}
              />
              <Divider />
              <View
                style={{ display: "flex", flexDirection: "row", marginTop: 25 }}
              >
                <Button
                  buttonStyle={{ backgroundColor: theme.colors.secondary }}
                  title="View Exercise Score"
                  onPress={() => history.push("/myscore")}
                />
              </View>
            </View>
          )
        ) : (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text
              h4
              h4Style={{
                fontSize: 20,
                margin: 20,
                fontFamily: "robotoBold",
                padding: 15,
                textAlign: "center",
              }}
            >
              Please Sign in or Sign up to collect quiz data
            </Text>
            <Button title="Sign In" onPress={() => history.push("/login")} />
          </View>
        )}
      </ScrollView>
      <Overlay isVisible={update}>
        <ActivityIndicator size="large" />
      </Overlay>
      <Overlay isVisible={complete} onBackdropPress={() => setComplete(false)}>
        <View style={{ display: "flex" }}>
          <Icon
            name="checkbox-marked-circle"
            color="green"
            type="material-community"
            size={50}
            style={{ margin: 15 }}
          />
          <Text h4 style={{ margin: 10 }}>
            Update Complete
          </Text>
          <Button
            onPress={() => setComplete(false)}
            title="Ok"
            type="outline"
          />
        </View>
      </Overlay>
      <Overlay isVisible={error} onBackdropPress={() => setError(false)}>
        <View style={{ display: "flex" }}>
          <Icon name="error" color="red" size={50} style={{ margin: 15 }} />
          <Text h4 style={{ margin: 10 }}>
            Error please Try Again
          </Text>
          <Button onPress={() => setError(false)} title="Ok" type="outline" />
        </View>
      </Overlay>
      <Footer />
    </Container>
  );
}
