import React, { useContext } from "react";
import { useHistory } from "react-router-native";
import { Button, Header as HeaderEle, Text, Icon } from "react-native-elements";
import styled from "styled-components/native";
import DrawerContext from "../Contexts/Drawer";
const HeaderTitle = styled(Text)`
  color: #000;
  font-family: dancingScriptBold;
  font-size: 28px;
`;

export default function Header(props) {
  const history = useHistory();
  const toggleDrawer = useContext(DrawerContext);
  const onPressGoBack = () => {
    history.goBack();
  };
  return (
    <HeaderEle
      containerStyle={{
        borderBottomWidth: 0,
        borderBottomEndRadius: 25,
        borderBottomStartRadius: 25,
        backgroundColor: "white",
      }}
      placement="center"
      leftComponent={
        <>
          {props?.left && props.left()}
          {props.goBack && (
            <Button
              buttonStyle={{ backgroundColor: "transparent" }}
              onPress={onPressGoBack}
              icon={<Icon name="arrow-back" type="material" color="#000" />}
            />
          )}
        </>
      }
      centerComponent={<HeaderTitle>{props?.title ?? ""}</HeaderTitle>}
      rightComponent={
        <>
          {props?.right ? (
            props.right()
          ) : (
            <Button
              buttonStyle={{ backgroundColor: "transparent" }}
              icon={<Icon name="reorder" type="material" color="#000" />}
              onPress={toggleDrawer}
            />
          )}
        </>
      }
    />
  );
}
