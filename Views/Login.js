import React, { useState } from "react";
import Header from "../Components/Header";
import Container from "../Components/ViewContainer";
import Footer from "../Components/Footer";
import {
  Avatar,
  Button,
  Icon,
  Input,
  Overlay,
  Text,
} from "react-native-elements";
import { View, ActivityIndicator } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { Col, Grid } from "react-native-easy-grid";
import { useHistory } from "react-router-native";
import FormContainer from "../Components/FormContainer";
import { auth } from "../Utils/firebase";

export default function Login() {
  const { control, handleSubmit, errors } = useForm();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [showErr, setShowErr] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const onPressLogin = async (value) => {
    try {
      setLoading(true);
      await auth.signInWithEmailAndPassword(value.email, value.password);
      history.push("/profile");
    } catch (e) {
      console.log(e);
      setErrMsg("Username หรือ Password ผิด");
      setShowErr(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Header title="Login" />

      <FormContainer>
        <Avatar
          size="large"
          rounded
          icon={{ name: "user-astronaut", type: "font-awesome-5" }}
          activeOpacity={0.8}
          containerStyle={{
            backgroundColor: "#000000",
            alignSelf: "center",
            marginBottom: 35,
          }}
        />
        <Controller
          name="email"
          defaultValue=""
          rules={{ required: true }}
          control={control}
          render={({ onChange, value }) => (
            <Input
              textContentType="emailAddress"
              keyboardType="email-address"
              autoCompleteType="email"
              autoCapitalize="none"
              errorMessage={errors.email && "กรุณากรอกอีเมล์"}
              value={value}
              placeholder="Email"
              onChangeText={(text) => onChange(text)}
            />
          )}
        />
        <Controller
          name="password"
          defaultValue=""
          control={control}
          rules={{ required: true }}
          render={({ onChange, value }) => (
            <Input
              textContentType="password"
              errorMessage={errors.email && "กรุณากรอกรหัสผ่าน"}
              secureTextEntry={true}
              value={value}
              placeholder="Password"
              onChangeText={(text) => onChange(text)}
            />
          )}
        />
        <View style={{ display: "flex", flexDirection: "row", marginTop: 5 }}>
          <Grid>
            <Col>
              <Button
                iconRight
                icon={
                  <Icon name="navigate-next" type="material" color="#fff" />
                }
                buttonStyle={{
                  marginRight: 5,
                  backgroundColor: "#4285F4",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                title="Login"
                titleStyle={{ fontSize: 16 }}
                onPress={handleSubmit(onPressLogin)}
              />
            </Col>
            <Col>
              <Button
                iconRight
                icon={<Icon name="description" type="material" color="#fff" />}
                buttonStyle={{ marginLeft: 5, backgroundColor: "#34A853" }}
                title="Register"
                onPress={() => history.push("/register")}
              />
            </Col>
          </Grid>
        </View>
        <View style={{ display: "flex", marginTop: 5 }}>
          <Button
            iconRight
            icon={<Icon name="perm-identity" type="material" color="#fff" />}
            title="Forget Password"
            onPress={() => history.push("/forget")}
          />
        </View>
      </FormContainer>
      <Footer />
      <Overlay isVisible={loading} onBackdropPress={() => setLoading(false)}>
        <ActivityIndicator />
      </Overlay>
      <Overlay isVisible={showErr} onBackdropPress={() => setShowErr(false)}>
        <View style={{ display: "flex" }}>
          <Icon name="error" color="red" />
          <Text>{errMsg}</Text>
        </View>
      </Overlay>
    </Container>
  );
}
