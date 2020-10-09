import { Image, Text } from "react-native-elements";
import React from "react";
import styled from "styled-components/native";
import { TouchableOpacity, View } from "react-native";

const CardItemContainer = styled(TouchableOpacity)`
  display: flex;
  flex: 1;
  flex-direction: row;
  padding: 10px;
  background-color: ${(props) => props?.bgColor || "transparent"};
  border-radius: 10px;
  align-items: center;
`;

const CardItemTitle = styled(Text)`
  font-weight: bold;
  font-size: 15px;
  color: ${(props) => props?.fontColor || "#000"};
  margin-bottom: 5px;
`;

const CardItemSubTitle = styled(Text)`
  font-size: 10px;
  color: ${(props) => props?.fontColor || "#000"};
`;

const CardItemTitleContainer = styled(View)`
  display: flex;
  flex: 1;
  margin-left: 25px;
`;
export default function CardItem(props) {
  return (
    <CardItemContainer
      bgColor={props.bgColor}
      key={props.id}
      onPress={() => props.onPress?.()}
    >
      <Image
        resizeMode="cover"
        source={{ uri: props.thumbnail }}
        style={{ width: 50, height: 50 }}
      />
      <CardItemTitleContainer>
        <CardItemTitle fontColor={props.titleColor}>
          {typeof props.title === "function" ? <props.title /> : props.title}
        </CardItemTitle>
        <CardItemSubTitle fontColor={props.subTitleColor}>
          {typeof props.subTitle === "function" ? (
            <props.subTitle />
          ) : (
            props.subTitle
          )}
        </CardItemSubTitle>
      </CardItemTitleContainer>
    </CardItemContainer>
  );
}
