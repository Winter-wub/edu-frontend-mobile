import { Text } from "react-native-elements";
import React from "react";
import styled from "styled-components/native";
import { View } from "react-native";
import { Link, useHistory } from "react-router-native";
import CardItem from "./CardItem";
import moment from "moment";

const CardHeader = styled(View)`
  display: flex;
  align-content: flex-start;
  margin-bottom: 15px;
  padding: 10px;
  flex-direction: row;
  align-items: center;
  background-color: ${(props) => props?.bgColor ?? "#fff"};
`;

const Card = styled(View)`
  padding-top: 0;
  padding-bottom: 5px;
  border-top-width: 0.5px;
  border-top-color: #2b2b2b2b;
`;

export default function Section(props) {
  const history = useHistory();
  const onPressItem = (link) => {
    history.push(link, { type: props.type });
  };

  return (
    <Card>
      <CardHeader>
        <Text
          h4
          style={{ fontFamily: "dancingScriptBold", color: props.color }}
        >
          {props?.title ?? ""}
        </Text>
        {props?.path && (
          <Link style={{ marginLeft: "auto" }} to={props?.path}>
            <Text style={{ color: "#fff" }}>more</Text>
          </Link>
        )}
      </CardHeader>
      {props?.item?.map((item, id) => (
        <CardItem
          key={id}
          title={item.title}
          subTitle={
            item?.created_at
              ? `Published ${moment(item.created_at.toDate()).format(
                  "DD/MM/YYYY hh:mm"
                )}`
              : ""
          }
          onPress={() => onPressItem(item.path)}
          thumbnail={item.thumbnail}
        />
      )) ?? ""}
    </Card>
  );
}
