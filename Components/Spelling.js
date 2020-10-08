import React from "react";
import { View } from "react-native";
import { Button, Icon, Text } from "react-native-elements";
import InputSmooth from "react-native-smooth-pincode-input";
export default function Spelling(props) {
  const { currentQuest, handleChange, value, onPressAnswer } = props;
  return (
    <View
      style={{
        padding: 5,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text h3 h3Style={{ marginBottom: 25 }}>
        {currentQuest.question}
      </Text>
      <InputSmooth
        value={value}
        onTextChange={handleChange}
        keyboardType="default"
        codeLength={currentQuest?.answer?.length ?? 5}
      />
      {currentQuest?.answer?.length === value.length && (
        <Button
          onPress={onPressAnswer}
          style={{ marginTop: 25 }}
          buttonStyle={{ borderRadius: "100%" }}
          icon={<Icon name="navigate-next" type="material" color="white" />}
        />
      )}
    </View>
  );
}
