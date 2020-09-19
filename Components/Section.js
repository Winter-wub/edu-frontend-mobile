import { Card, Text } from "react-native-elements";
import React from "react";
import styled from "styled-components/native";
import { View } from "react-native";
import { Link, useHistory } from "react-router-native";
import CardItem from "./CardItem";

const CardHeader = styled(View)`
  display: flex;
  align-content: flex-start;
  margin-bottom: 15px;
  padding: 5px;
  flex-direction: row;
  align-items: center;
`;

export default function Section(props) {
  const history = useHistory();
  const onPressItem = (link) => {
    history.push(link, { type: props.type });
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
        <CardItem
          key={item.id}
          title={item.title}
          subTitle={item.subTitle}
          onPress={() => onPressItem(item.path)}
          thumbnail={item.thumbnail}
        />
      )) ?? ""}
    </Card>
  );
}
