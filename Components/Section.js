import { Card, Image, Text } from "react-native-elements";
import React from "react";
import styled from "styled-components";
import { TouchableOpacity, View } from "react-native";
import { Link, useHistory } from "react-router-native";

const CardHeader = styled(View)`
  display: flex;
  align-content: flex-start;
  margin-bottom: 15px;
  padding: 5px;
  flex-direction: row;
  align-items: center;
`;

const CardItem = styled(TouchableOpacity)`
  display: flex;
  flex-direction: row;
  align-items: center;
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

export default function Section(props) {
  const history = useHistory();
  const onPressItem = (link) => {
    history.push(link);
  };
  return (
    <Card>
      <CardHeader>
        <Text h4>{props?.title ?? ""}</Text>
        {props?.path && (
          <Link style={{ marginLeft: "auto" }} to={props?.path}>
            <Text>more</Text>
          </Link>
        )}
      </CardHeader>
      {props?.item?.map((item) => (
        <CardItem key={item.id} onPress={() => onPressItem(item.path)}>
          <Image
            resizeMode="cover"
            source={{ uri: item.thumbnail }}
            style={{ width: 50, height: 50 }}
          />
          <CardItemTitleContainer>
            <CardItemTitle>{item.title}</CardItemTitle>
            <CardItemSubTitle>{item.subTitle}</CardItemSubTitle>
          </CardItemTitleContainer>
        </CardItem>
      )) ?? ""}
    </Card>
  );
}
