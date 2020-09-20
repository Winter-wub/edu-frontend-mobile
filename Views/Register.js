import React, { useState } from "react";
import Container from "../Components/ViewContainer";
import Header from "../Components/Header";
import { Button, Icon, Input, Overlay, Text } from "react-native-elements";
import FormContainer from "../Components/FormContainer";
import { useForm, Controller } from "react-hook-form";
import { auth, firestore } from "../Utils/firebase";
import { ActivityIndicator, View } from "react-native";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers";
import config from "../config.json";
import DatePicker from "react-native-datepicker";
import { useHistory } from "react-router-native";
import moment from "moment";

export function Register() {
  const history = useHistory();
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(5).required(),
    fullname: yup.string().required(),
    birth_date: yup.string(),
  });
  const { control, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const [isShow, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoad, setLoad] = useState(false);
  const [isComplete, setComplete] = useState(false);

  const onPressRegister = async (value) => {
    try {
      setLoad(true);
      const registeredData = await auth.createUserWithEmailAndPassword(
        value.email,
        value.password
      );
      const uid = registeredData.user.uid;
      await firestore.collection(config.collections.students).add({
        uid,
        email: value.email,
        fullname: value.fullname,
        birth_date: moment(value.birth_date, "DD-MM-YYYY").toDate(),
      });
      setComplete(true);
    } catch (e) {
      setShow(true);
      setMessage(e.message);
    } finally {
      setLoad(false);
    }
  };

  return (
    <Container>
      <Header title="Register" goBack />
      <FormContainer>
        <Controller
          defaultValue=""
          name="fullname"
          render={({ onChange, value }) => (
            <Input
              onChangeText={onChange}
              placeholder="Full Name"
              errorMessage={errors.fullname && "กรุณากรอกข้อมูลให้ถูกต้อง"}
              value={value}
            />
          )}
          rules={{ required: true }}
          control={control}
        />
        <Controller
          name="birth_date"
          defaultValue=""
          render={({ onChange, value }) => (
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
          )}
          control={control}
        />
        <Controller
          defaultValue=""
          name="email"
          rules={{ required: true }}
          render={({ onChange, value }) => (
            <Input placeholder="Email" onChangeText={onChange} value={value} />
          )}
          control={control}
        />
        <Controller
          defaultValue=""
          name="password"
          rules={{ required: true }}
          render={({ onChange, value }) => (
            <Input
              value={value}
              onChangeText={onChange}
              secureTextEntry
              placeholder="Password"
              errorMessage={errors.email && "กรุณากรอกข้อมูลให้ถูกต้อง"}
            />
          )}
          control={control}
        />
        <Button title="Register" onPress={handleSubmit(onPressRegister)} />
      </FormContainer>
      <Overlay isVisible={isShow} onBackdropPress={() => setShow(false)}>
        <View style={{ display: "flex" }}>
          <Icon name="error" color="red" />
          <Text>{message}</Text>
        </View>
      </Overlay>
      <Overlay isVisible={isLoad}>
        <ActivityIndicator size="large" />
      </Overlay>
      <Overlay
        isVisible={isComplete}
        onBackdropPress={() => history.push("/login")}
      >
        <View style={{ display: "flex" }}>
          <Icon
            name="checkbox-marked-circle"
            color="green"
            type="material-community"
            size={50}
            style={{ margin: 15 }}
          />
          <Text h4 style={{ margin: 10 }}>
            Register Complete
          </Text>
          <Button
            onPress={() => history.push("/login")}
            title="Go to Login"
            type="outline"
          />
        </View>
      </Overlay>
    </Container>
  );
}
