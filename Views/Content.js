import React from "react";
import {
  Container,
  Header,
  Body,
  Title,
  Left,
  Button,
  Icon,
  Right,
  Card,
  CardItem,
  Text,
} from "native-base";
import { useHistory } from "react-router-native";
import { ScrollView, Dimensions } from "react-native";
import { Grid, Row, Col } from "react-native-easy-grid";
import styled from "styled-components";
import { Video } from "expo-av";

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get("window");
const FONT_SIZE = 14;

const VideoPlay = styled(Video)`
  width: ${DEVICE_WIDTH}px;
  height: ${(DEVICE_HEIGHT * 2.0) / 5.0 - FONT_SIZE * 2}px;
`;

export default function Content() {
  const history = useHistory();
  const onPressGoBack = () => {
    history.goBack();
  };

  const { type } = history.location.state;
  return (
    <Container>
      <Header>
        <Left>
          <Button transparent onPress={onPressGoBack}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Video Title</Title>
        </Body>
        <Right />
      </Header>
      <ScrollView>
        {type === "video" && (
          <Grid>
            <Row>
              <Col>
                <VideoPlay
                  source={{
                    uri:
                      "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
                  }}
                  volume={1.0}
                  isMuted={false}
                  resizeMode="cover"
                  useNativeControls
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Card>
                  <CardItem>
                    <Title>Video Scripts</Title>
                  </CardItem>
                  <CardItem>
                    <Text>lorem pi</Text>
                  </CardItem>
                </Card>
              </Col>
            </Row>
          </Grid>
        )}
      </ScrollView>
    </Container>
  );
}
