import Header from "../Components/Header";
import React from "react";
import { View } from "react-native";
import { Button, Input, Text } from "react-native-elements";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
import { auth } from "../Utils/firebase";

export default function Forget() {
  const schema = yup.object().shape({
    email: yup.string().email().required(),
  });
  const { control, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });
  const sendEmail = async (data) => {
    try {
      const { email } = data;
      await auth.sendPasswordResetEmail(email);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Header title="Password Recovery" goBack />
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
          justifyContent: "center",
          alignItems: "center",
          padding: 25,
        }}
      >
        <Controller
          defaultValue=""
          name="email"
          label="Email"
          as={Input}
          control={control}
        />
        <View style={{ margin: 20 }}>
          {errors.email && (
            <Text style={{ color: "#ff0000" }}>Email incorrect</Text>
          )}
        </View>
        <Button
          buttonStyle={{ backgroundColor: "#5fa460" }}
          title="Send recovery password email"
          onPress={handleSubmit(sendEmail)}
        />
      </View>
    </>
  );
}
