import React, { useContext } from "react";
import { useHistory } from "react-router-native";
import { Button, Header as HeaderEle, Text, Icon } from "react-native-elements";
import styled from "styled-components/native";
import DrawerContext from "../Contexts/Drawer";
const HeaderTitle = styled(Text)`
  color: #ffff;
  font-family: dancingScript;
  font-size: 25px;
`;

export default function Header(props) {
  const history = useHistory();
  const toggleDrawer = useContext(DrawerContext);
  const onPressGoBack = () => {
    history.goBack();
  };
  return (
    <HeaderEle
      placement="center"
      leftComponent={
        <>
          {props?.left && props.left()}
          {props.goBack ? (
            <Button
              onPress={onPressGoBack}
              icon={<Icon name="arrow-back" type="material" color="#fff" />}
            />
          ) : (
            <Button
              icon={<Icon name="reorder" type="material" color="#fff" />}
              onPress={toggleDrawer}
            />
          )}
        </>
      }
      centerComponent={<HeaderTitle>{props?.title ?? ""}</HeaderTitle>}
      rightComponent={props?.right ?? <></>}
    />
  );
}
