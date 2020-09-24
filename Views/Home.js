import React, { useEffect, useState } from "react";
import { ScrollView, ActivityIndicator } from "react-native";
import { Col, Grid, Row } from "react-native-easy-grid";
import Section from "../Components/Section";
import Container from "../Components/ViewContainer";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import config from "../config.json";
import { Overlay, Text } from "react-native-elements";
import { firestore } from "../Utils/firebase";

export default function Home() {
  const [video, setVideo] = useState([]);
  const [essay, setEssay] = useState([]);
  const [vocab, setVocab] = useState([]);
  const [load, setLoad] = useState(true);

  const loadingNews = async () => {
    const appConfigHomeRef = await firestore
      .collection(config.collections.app_config)
      .doc("home")
      .get();

    const videosRef = await Promise.all(
      appConfigHomeRef.data().videos.map(async (item) => await item.get())
    );

    setVideo(
      videosRef.map((ref) => ({
        id: ref.id,
        path: `/content/${ref.id}`,
        ...ref.data(),
      }))
    );

    const essayRef = await Promise.all(
      appConfigHomeRef.data().essays.map(async (item) => await item.get())
    );

    setEssay(
      essayRef.map((ref) => ({
        id: ref.id,
        path: `/content/${ref.id}`,
        ...ref.data(),
      }))
    );

    const vocabRef = await Promise.all(
      appConfigHomeRef.data().vocab.map(async (item) => await item.get())
    );

    setVocab(
      vocabRef.map((ref) => ({
        id: ref.id,
        path: `/content/${ref.id}`,
        ...ref.data(),
      }))
    );
  };

  useEffect(() => {
    (async () => {
      try {
        await loadingNews();
      } finally {
        setLoad(false);
      }
    })();
  }, []);

  return (
    <Container>
      <Header title={config.app.title} />
      <ScrollView>
        {load ? (
          <Overlay isVisible={load}>
            <ActivityIndicator size="large" />
          </Overlay>
        ) : (
          <>
            <Text
              h4
              style={{
                alignSelf: "center",
                margin: 5,
                padding: 5,
              }}
            >
              What&#39;s new ?
            </Text>
            <Grid>
              <Row>
                <Col>
                  <Section
                    title="Videos"
                    item={video}
                    path="/course/videos"
                    type="videos"
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Section
                    title="Essay"
                    item={essay}
                    path="/course/essays"
                    type="essays"
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Section
                    title="Vocabulary"
                    item={vocab}
                    path="/course/vocab"
                    type="vocab"
                  />
                </Col>
              </Row>
            </Grid>
          </>
        )}
      </ScrollView>
      <Footer />
    </Container>
  );
}
