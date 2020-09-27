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
import YoutubePlayer from "react-native-youtube-iframe";

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get("window");
const FONT_SIZE = 14;

const VideoPlay = styled(Video)`
  width: ${DEVICE_WIDTH}px;
  height: ${(DEVICE_HEIGHT * 2.0) / 5.0 - FONT_SIZE * 2}px;
`;

function YouTubeGetID(url) {
  let ID;
  url = url
    .replace(/(>|<)/gi, "")
    .split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  if (url[2] !== undefined) {
    ID = url[2].split(/[^0-9a-z_-]/i);
    ID = ID[0];
  } else {
    ID = url;
  }
  return ID;
}

export default function Content() {
  const history = useHistory();
  const { id } = useParams();
  const { type } = history.location.state;
  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [content, setContent] = useState("");
  const [isYouTube, setYoutube] = useState(false);

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
        console.log(`${config.collections.categories}/${type}/${content.id}`);
        console.log(`👁 ${type} mode`);
        if (type === "videos") {
          if (content.video_url.includes("youtube")) {
            console.log("📹 Youtube video");
            setYoutube(true);
            console.log(content.video_url);
            const videoId = YouTubeGetID(content.video_url);
            setVideoUrl(videoId);
          } else {
            setVideoUrl(content.video_url);
          }
        }
      } catch (e) {
        console.log(e);
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
                {videoUrl !== "" &&
                  (!isYouTube ? (
                    <VideoPlay
                      source={{
                        uri: videoUrl,
                      }}
                      volume={1.0}
                      isMuted={false}
                      resizeMode="cover"
                      useNativeControls
                    />
                  ) : (
                    <YoutubePlayer
                      width={DEVICE_WIDTH}
                      height={(DEVICE_HEIGHT * 2.0) / 5.0 - FONT_SIZE * 2}
                      videoId={videoUrl}
                    />
                  ))}
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
