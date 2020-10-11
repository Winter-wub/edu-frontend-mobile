import React from "react";
import { Dimensions, View } from "react-native";
import { Button, Icon, Image, Text } from "react-native-elements";
import InputSmooth from "react-native-smooth-pincode-input";
const width = Dimensions.get("window").width;
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
      {currentQuest?.image_url && (
        <Image
          resizeMode="cover"
          source={{ uri: currentQuest.image_url }}
          style={{ width: width * 0.8, height: 200 }}
        />
      )}
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
          buttonStyle={{ borderRadius: 100, marginTop: 50 }}
          icon={<Icon name="navigate-next" type="material" color="white" />}
        />
      )}
    </View>
  );
}
