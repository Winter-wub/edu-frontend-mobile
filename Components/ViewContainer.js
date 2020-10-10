import styled from "styled-components/native";
import { View } from "react-native";

const Container = styled(View)`
  display: flex;
  flex: 1;
  z-index: 0;
  background-color: ${(props) => props?.bgColor || "#fff"};
`;

export default Container;
