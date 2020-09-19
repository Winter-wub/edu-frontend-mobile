import { Image, Text } from "react-native-elements";
import React from "react";
import styled from "styled-components/native";
import { TouchableOpacity, View } from "react-native";

const CardItemContainer = styled(TouchableOpacity)`
  display: flex;
  flex: 1;
  flex-direction: row;
  padding: 5px;
`;

const CardItemTitle = styled(Text)`
  font-weight: bold;
  font-size: 15px;
`;

const CardItemSubTitle = styled(Text)`
  font-size: 10px;
`;

const CardItemTitleContainer = styled(View)`
  display: flex;
  flex: 1;
  margin-left: 25px;
`;
export default function CardItem(props) {
  return (
    <CardItemContainer key={props.id} onPress={() => props.onPress()}>
      <Image
        resizeMode="cover"
        source={{ uri: props.thumbnail }}
        style={{ width: 50, height: 50 }}
      />
      <CardItemTitleContainer>
        <CardItemTitle>{props.title}</CardItemTitle>
        <CardItemSubTitle>{props.subTitle}</CardItemSubTitle>
      </CardItemTitleContainer>
    </CardItemContainer>
  );
}
