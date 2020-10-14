import { Icon, Text } from "react-native-elements";
import React from "react";
import styled from "styled-components/native";
import { Link, useHistory } from "react-router-native";
import CardItem from "./CardItem";
import moment from "moment";

const CardHeader = styled.View`
  display: flex;
  align-content: flex-start;
  padding: 15px 15px 15px 20px;
  flex-direction: row;
  align-items: center;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
`;

const Card = styled.View`
  margin: 10px;
  shadow-color: #000;
  shadow-offset: {
    width: 2px;
    height: 2px;
  }
  shadow-opacity: 0.25;
  shadow-radius: 3.84;
  elevation: 5;
  border-radius: 15px;
  background-color: ${(props) => props?.bgColor || "#fff"};
`;

const CardBody = styled.View`
  padding-bottom: 20px;
  padding-left: 15px;
  padding-right: 15px;
`;
export default function Section(props) {
  const history = useHistory();
  const onPressItem = (link) => {
    history.push(link);
  };

  return (
    <Card bgColor={props.bgColor}>
      <CardHeader>
        <Link to={props?.path}>
          <Text
            h4
            h4Style={{
              fontFamily: "dancingScriptBold",
              color: props.color,
              fontSize: 25,
            }}
          >
            {props?.title ?? ""}
          </Text>
        </Link>
        {props?.path && (
          <Link style={{ marginLeft: "auto" }} to={props?.path}>
            <Icon name="more-horiz" type="material" color="#fff" />
          </Link>
        )}
      </CardHeader>
      <CardBody>
        {props?.item?.map((item, id) => (
          <CardItem
            key={id}
            title={item.title}
            titleColor="#fff"
            subTitle={
              item?.created_at
                ? `Published ${moment(item.created_at.toDate()).format(
                    "DD/MM/YYYY hh:mm"
                  )}`
                : ""
            }
            subTitleColor="#fff"
            onPress={() => onPressItem(`${item.path}/${props.type}`)}
            thumbnail={item.thumbnail}
          />
        )) ?? ""}
      </CardBody>
    </Card>
  );
}
