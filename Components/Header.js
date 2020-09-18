import React from "react";
import { useHistory } from "react-router-native";
import { Button, Header as HeaderEle, Text, Icon } from "react-native-elements";
import styled from "styled-components";

const HeaderTitle = styled(Text)`
  color: #ffff;
`;

export default function Header(props) {
  const history = useHistory();
  const onPressGoBack = () => {
    history.goBack();
  };
  return (
    <HeaderEle
      placement="center"
      leftComponent={
        <>
          {props?.left && props.left()}
          {props.goBack && (
            <Button
              onPress={onPressGoBack}
              icon={<Icon name="arrow-back" type="material" />}
            />
          )}
        </>
      }
      centerComponent={<HeaderTitle>{props?.title ?? ""}</HeaderTitle>}
      rightComponent={props?.right ?? ""}
    />
  );
}
