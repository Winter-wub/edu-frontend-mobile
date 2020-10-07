import { Button, Icon, Text } from "react-native-elements";
import { FlatList, TouchableOpacity, View } from "react-native";
import { DraxProvider, DraxView } from "react-native-drax";
import React from "react";
import styled from "styled-components/native";

const DragItem = styled(View)`
  border-radius: 5px;
  border-width: 1px;
  width: 80px;
  height: 100px;
  background-color: ${(props) => props.bgColor ?? "#fff"};
  display: flex;
  align-items: center;
  margin-vertical: 5px;
  margin-horizontal: 5px;
  justify-content: center;
  align-items: center;
`;

const DragContainer = styled(View)`
  margin-top: 25px;
  background-color: grey;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CategoryItem = styled(TouchableOpacity)`
  border-width: 1px;
  border-radius: 10px;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px;
  height: 150px;
`;

const CategoryContainer = styled(View)`
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  margin-bottom: 10px;
`;

export default function Matching(props) {
  const {
    currentQuest,
    onReceiveItem,
    categories,
    matchAnswers,
    onPressReceiver,
    onPressAnswer,
  } = props;

  return (
    <View
      style={{
        padding: 5,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Text
        h4
        h4Style={{
          fontFamily: "roboto",
          margin: 5,
          padding: 5,
          marginBottom: 25,
          fontSize: 22,
        }}
      >
        {currentQuest.no}:{currentQuest.question}
      </Text>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
        }}
      >
        <DraxProvider>
          <CategoryContainer>
            {categories.map((cat) => (
              <DraxView
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: "50%",
                  padding: 2,
                }}
                key={cat.id}
                onReceiveDragDrop={onReceiveItem}
                payload={cat}
                draggable={false}
              >
                <CategoryItem onPress={() => onPressReceiver(cat)}>
                  <Text h4>{cat.text}</Text>
                  <View>
                    {cat.receiveItems.map((i) => (
                      <Text key={i.id}>{i.text}</Text>
                    ))}
                  </View>
                </CategoryItem>
              </DraxView>
            ))}
          </CategoryContainer>
          {matchAnswers.length !== 0 ? (
            <DragContainer>
              <Icon name="keyboard-arrow-up" type="material" />
              <FlatList
                horizontal
                data={matchAnswers}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <DraxView payload={item}>
                    {item.type === "text" && (
                      <DragItem>
                        <Text>{item.text}</Text>
                      </DragItem>
                    )}
                  </DraxView>
                )}
              />
              <Text
                h4
                h4Style={{
                  fontSize: 20,
                  fontFamily: "roboto",
                  marginBottom: 5,
                }}
              >
                Drag item to correct category.
              </Text>
            </DragContainer>
          ) : (
            <Button
              onPress={onPressAnswer}
              iconRight
              icon={<Icon name="navigate-next" type="material" color="white" />}
              style={{
                justifyContent: "center",
                display: "flex",
                alignItems: "center",
              }}
              buttonStyle={{
                borderRadius: "100%",
                maxWidth: 65,
                minWidth: 55,
                minHeight: 55,
                maxHeight: 65,
              }}
            />
          )}
        </DraxProvider>
      </View>
    </View>
  );
}
