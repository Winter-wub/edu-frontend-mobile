import React, { useEffect, useState } from "react";
import Container from "../Components/ViewContainer";
import Header from "../Components/Header";
import { auth, firestore } from "../Utils/firebase";
import { useHistory } from "react-router-native";
import Footer from "../Components/Footer";
import { ScrollView, View, ActivityIndicator } from "react-native";
import config from "../config.json";
import {
  Avatar,
  Button,
  Icon,
  Input,
  Overlay,
  Text,
} from "react-native-elements";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-native-datepicker";
import moment from "moment";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers";

export default function Profile() {
  const schema = yup.object().shape({
    email: yup.string().email(),
    password: yup.string().min(8),
    fullname: yup.string(),
    birth_date: yup.string(),
  });
  const history = useHistory();
  const [userData, setUserData] = useState();
  const [load, setLoad] = useState(true);
  const [update, setUpdate] = useState(false);
  const [complete, setComplete] = useState(false);
  const [error, setError] = useState(false);
  const { control, handleSubmit, errors, formState } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        history.push("/login");
      } else {
        (async () => {
          try {
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
              console.log("NO!!");
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
      if (dirtyFields.birth_date) {
        await firestore
          .collection(config.collections.students)
          .doc(auth.currentUser.uid)
          .set({
            birth_date: moment(data.birth_date, "DD-MM-YYYY").toDate(),
          });
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
      <Header title={userData?.fullname ?? ""} />
      <ScrollView>
        {!load && (
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
              icon={{ name: "user", type: "font-awesome" }}
              activeOpacity={0.8}
              containerStyle={{ backgroundColor: "#d2d2d2" }}
            />
            <Controller
              defaultValue={userData?.fullname}
              name="fullname"
              control={control}
              render={({ onChange, value }) => (
                <Input
                  label="Fullname"
                  onChangeText={onChange}
                  value={value}
                  containerStyle={{ marginTop: 15 }}
                  style={{ padding: 1 }}
                  errorMessage={errors?.fullname && "กรุณากรอกข้อมูลให้ถูกต้อง"}
                />
              )}
            />
            <Controller
              name="birth_date"
              defaultValue={
                userData?.birth_date
                  ? moment(userData.birth_date.toDate()).format("DD-MM-YYYY")
                  : ""
              }
              render={({ onChange, value }) => (
                <View
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-start",
                    padding: 8,
                  }}
                >
                  <Text
                    style={{
                      margin: 5,
                      fontSize: 15,
                      fontWeight: "bold",
                      color: "#86939e",
                    }}
                  >
                    Date of Birth
                  </Text>
                  <DatePicker
                    style={{ width: "100%" }}
                    format="DD-MM-YYYY"
                    placeholder="Date of birth"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    showIcon={false}
                    date={value}
                    onDateChange={onChange}
                  />
                </View>
              )}
              control={control}
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
                  label="Password"
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
