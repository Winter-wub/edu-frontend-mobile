import { Dimensions, View } from "react-native";
import { Button, Icon, Image, ListItem, Text } from "react-native-elements";
import React from "react";

const width = Dimensions.get("window").width;

export default function Choice(props) {
  const { currentQuest, onPressAnswer, onSelectChoice, selectChoice } = props;
  return (
    <View
      style={{
        padding: 5,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {currentQuest.image_url && (
        <Image
          resizeMode="cover"
          source={{ uri: currentQuest.image_url }}
          style={{ width: width * 0.8, height: 200 }}
        />
      )}
      <Text
        h4
        h4Style={{
          fontFamily: "roboto",
          margin: 5,
          padding: 5,
          marginBottom: 25,
          fontSize: 20,
        }}
      >
        {currentQuest.no}:{currentQuest.question}
      </Text>
      <View style={{ width: width * 0.8, marginTop: 15 }}>
        {currentQuest?.choices?.map((item, id) => (
          <ListItem
            bottomDivider
            key={id}
            onPress={() => onSelectChoice(id)}
            containerStyle={{
              backgroundColor: selectChoice === id ? "#aaa" : "#fff",
            }}
          >
            <ListItem.Content>
              <ListItem.Title>{item}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </View>
      <Button
        disabled={selectChoice === null}
        onPress={onPressAnswer}
        icon={<Icon name="navigate-next" type="material" color="white" />}
        buttonStyle={{
          marginTop: 25,
          borderRadius: 100,
        }}
      />
    </View>
  );
}
