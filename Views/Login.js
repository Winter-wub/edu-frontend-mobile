import React, { useState } from "react";
import Header from "../Components/Header";
import Container from "../Components/ViewContainer";
import Footer from "../Components/Footer";
import { Button, Icon, Input, Overlay, Text } from "react-native-elements";
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
      history.push("/");
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
        <Controller
          name="email"
          defaultValue=""
          rules={{ required: true }}
          control={control}
          render={({ onChange, value }) => (
            <Input
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
                buttonStyle={{ marginRight: 5 }}
                title="Login"
                onPress={handleSubmit(onPressLogin)}
              />
            </Col>
            <Col>
              <Button
                buttonStyle={{ marginLeft: 5 }}
                title="Register"
                onPress={() => history.push("/register")}
              />
            </Col>
          </Grid>
        </View>
      </FormContainer>
      <Footer />
      <Overlay isVisible={loading} onBackdropPress={() => setLoading(false)}>
        <ActivityIndicator size="large" />
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