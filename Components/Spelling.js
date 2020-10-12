import React, { useEffect, useRef } from "react";
import { Dimensions, View } from "react-native";
import { Button, Icon, Image, Input, Text } from "react-native-elements";
const width = Dimensions.get("window").width;
export default function Spelling(props) {
  const { currentQuest, handleChange, value, onPressAnswer } = props;
  const input = useRef();

  useEffect(() => {
    input.current.shake();
    input.current.focus();
  }, [currentQuest.answer]);

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
      <Text style={{ margin: 25, fontSize: 22 }}>{currentQuest.question}</Text>
      <Input
        ref={input}
        errorMessage={`${
          currentQuest?.answer?.length - value.length
        } remaining`}
        label="Answer"
        inputContainerStyle={{
          borderTopWidth: 1,
          borderLeftWidth: 1,
          borderRightWidth: 1,
          borderRadius: 25,
        }}
        textAlign="center"
        value={value}
        onChangeText={handleChange}
        keyboardType="default"
        autoCapitalize="none"
        maxLength={currentQuest?.answer?.length ?? 5}
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
