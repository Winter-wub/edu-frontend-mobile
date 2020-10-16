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
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          paddingHorizontal: 5,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Input
          containerStyle={{
            margin: 0,
            paddingHorizontal: 0,
          }}
          inputContainerStyle={{
            borderWidth: 1,
          }}
          ref={input}
          errorMessage={`${
            currentQuest?.answer?.length - value.length
          } remaining`}
          label="Answer"
          textAlign="center"
          value={value}
          onChangeText={handleChange}
          keyboardType="default"
          autoCapitalize="none"
          maxLength={currentQuest?.answer?.length ?? 5}
          rightIcon={
            <Button
              buttonStyle={{ margin: 0 }}
              disabled={currentQuest?.answer?.length !== value.length}
              onPress={onPressAnswer}
              icon={<Icon name="navigate-next" type="material" color="white" />}
            />
          }
        />
      </View>
    </View>
  );
}
