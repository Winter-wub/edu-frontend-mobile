import React from "react";
import { ScrollView, Dimensions } from "react-native";
import { Grid, Row, Col } from "react-native-easy-grid";
import styled from "styled-components";
import { Video } from "expo-av";
import Container from "../Components/ViewContainer";
import { useHistory } from "react-router-native";
import Header from "../Components/Header";

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get("window");
const FONT_SIZE = 14;

const VideoPlay = styled(Video)`
  width: ${DEVICE_WIDTH}px;
  height: ${(DEVICE_HEIGHT * 2.0) / 5.0 - FONT_SIZE * 2}px;
`;

export default function Content() {
  const history = useHistory();
  const { type } = history.location.state;
  return (
    <Container>
      <Header title="Video Title" goBack />
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
              <Col></Col>
            </Row>
          </Grid>
        )}
      </ScrollView>
    </Container>
  );
}
