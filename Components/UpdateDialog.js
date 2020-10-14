import { Button, Overlay, Text } from "react-native-elements";
import React from "react";
import styled from "styled-components/native";

const UpdateContainer = styled.View`
  display: flex;
  padding: 15px;
  justify-content: center;
  align-items: center;
`;
export default function UpdateDialog({ showUpdate, setConfirmUpdate }) {
  return (
    <Overlay isVisible={showUpdate}>
      <UpdateContainer>
        <Text style={{ textAlign: "center", fontSize: 20, margin: 25 }}>
          An Update Available please restart the app now
        </Text>
        <Button title="Restart" onPress={() => setConfirmUpdate(true)} />
      </UpdateContainer>
    </Overlay>
  );
}
