import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
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
  const [quiz, setQuiz] = useState([]);
  const [load, setLoad] = useState(true);

  const loadingNews = async () => {
    const getVideosNew = async () => {
      const videosRef = await firestore
        .collection(config.collections.categories)
        .doc("videos")
        .collection("courses")
        .orderBy("created_at", "desc")
        .limit(2)
        .get();

      setVideo(
        videosRef.docs.map((ref) => ({
          id: ref.id,
          path: `/content/${ref.id}`,
          ...ref.data(),
        }))
      );
    };

    const getEssaysNew = async () => {
      const essayRef = await firestore
        .collection(config.collections.categories)
        .doc("essays")
        .collection("courses")
        .orderBy("created_at", "desc")
        .limit(2)
        .get();

      setEssay(
        essayRef.docs.map((ref) => ({
          id: ref.id,
          path: `/content/${ref.id}`,
          ...ref.data(),
        }))
      );
    };

    const getVocabNew = async () => {
      const vocabRef = await firestore
        .collection(config.collections.categories)
        .doc("vocab")
        .collection("courses")
        .orderBy("created_at", "desc")
        .limit(2)
        .get();

      setVocab(
        vocabRef.docs.map((ref) => ({
          id: ref.id,
          path: `/content/${ref.id}`,
          ...ref.data(),
        }))
      );
    };

    const getQuizNew = async () => {
      const quizRef = await firestore
        .collection(config.collections.quiz)
        .orderBy("created_at", "desc")
        .limit(2)
        .get();

      setQuiz(
        quizRef.docs.map((ref) => ({
          id: ref.id,
          path: `/quiz/${ref.id}`,
          ...ref.data(),
        }))
      );
    };

    await Promise.all([
      getEssaysNew(),
      getQuizNew(),
      getVideosNew(),
      getVocabNew(),
    ]);
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
      <Overlay isVisible={load}>
        <ActivityIndicator />
      </Overlay>
      <ScrollView>
        {!load && (
          <>
            <Text
              h4
              style={{
                alignSelf: "flex-start",
                margin: 5,
                padding: 5,
                paddingHorizontal: 10,
              }}
            >
              What&#39;s new ?
            </Text>
            <Grid>
              <Row>
                <Col>
                  <Section
                    title="Video"
                    item={video}
                    path="/course/videos"
                    type="videos"
                    color="#fff"
                    bgColor="#4285F4"
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
                    color="#fff"
                    bgColor="#EA4335"
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
                    color="#fff"
                    bgColor="#FBBC05"
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Section
                    title="Exercise"
                    item={quiz}
                    path="/quiz"
                    type="quiz"
                    color="#fff"
                    bgColor="#34A853"
                  />
                </Col>
              </Row>
            </Grid>
          </>
        )}
        <View style={{ paddingBottom: 25 }} />
      </ScrollView>
      <Footer />
    </Container>
  );
}
