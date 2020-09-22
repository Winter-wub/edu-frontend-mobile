import React, { useEffect, useState } from "react";
import { ScrollView, Dimensions } from "react-native";
import { Grid, Row, Col } from "react-native-easy-grid";
import styled from "styled-components";
import { Video } from "expo-av";
import Container from "../Components/ViewContainer";
import { useHistory, useParams } from "react-router-native";
import Header from "../Components/Header";
import { firestore } from "../Utils/firebase";
import config from "../config.json";
import Markdown from "react-native-markdown-renderer";

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get("window");
const FONT_SIZE = 14;

const VideoPlay = styled(Video)`
  width: ${DEVICE_WIDTH}px;
  height: ${(DEVICE_HEIGHT * 2.0) / 5.0 - FONT_SIZE * 2}px;
`;

export default function Content() {
  const history = useHistory();
  const params = useParams();
  const { type } = history.location.state;
  const { id } = params;
  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const doc = await firestore
          .collection(config.collections.categories)
          .doc(type)
          .collection("courses")
          .doc(id)
          .get();
        const { title, ...content } = { id: doc.id, ...doc.data() };
        setTitle(title);
        setContent(content.content);
        console.log(content.id);
        console.log(`👁 ${type} mode`);
        if (type === "videos") {
          setVideoUrl(content.video_url);
        }
      } catch (e) {
        console.error(e);
      }
    })();
  }, [type, id]);
  return (
    <Container>
      <Header title={title} goBack />
      <ScrollView>
        <Grid>
          {type === "videos" && (
            <Row>
              <Col>
                {videoUrl !== "" && (
                  <VideoPlay
                    source={{
                      uri: videoUrl,
                    }}
                    volume={1.0}
                    isMuted={false}
                    resizeMode="cover"
                    useNativeControls
                  />
                )}
              </Col>
            </Row>
          )}
          <Row>
            <Col>
              <Markdown>{content ?? ""}</Markdown>
            </Col>
          </Row>
        </Grid>
      </ScrollView>
    </Container>
  );
}
