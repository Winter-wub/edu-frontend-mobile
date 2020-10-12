import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  ImageBackground,
  ScrollView,
  View,
} from "react-native";
import { Col, Grid, Row } from "react-native-easy-grid";
import Section from "../Components/Section";
import Container from "../Components/ViewContainer";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import config from "../config.json";
import { Overlay, Text, ThemeContext } from "react-native-elements";
import { firestore } from "../Utils/firebase";

export default function Home() {
  const [video, setVideo] = useState([]);
  const [essay, setEssay] = useState([]);
  const [vocab, setVocab] = useState([]);
  const [quiz, setQuiz] = useState([]);
  const [load, setLoad] = useState(true);
  const { theme } = useContext(ThemeContext);

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
    <Container bgColor="#fff">
      <Header title={config.app.title} />
      <Overlay isVisible={load}>
        <ActivityIndicator />
      </Overlay>
      <ScrollView>
        <ImageBackground
          source={require("../assets/images/bg-wooden.jpg")}
          style={{ width: "100%", height: "100%" }}
        >
          {!load && (
            <>
              <View
                style={{
                  alignSelf: "center",
                  margin: 5,
                  padding: 15,
                  paddingHorizontal: 10,
                }}
              >
                <View>
                  <Text
                    h4
                    h4Style={{
                      color: "#fff",
                      fontFamily: "dancingScriptBold",
                      fontSize: 30,
                    }}
                  >
                    What&#39;s new ?
                  </Text>
                </View>
              </View>
              <Grid>
                <Row>
                  <Col>
                    <Section
                      title="Video"
                      item={video}
                      path="/course/videos"
                      type="videos"
                      color="#000"
                      bgColor={theme.colors.video}
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
                      color="#000"
                      bgColor={theme.colors.essay}
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
                      color="#000"
                      bgColor={theme.colors.vocab}
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
                      color="#000"
                      bgColor={theme.colors.quiz}
                    />
                  </Col>
                </Row>
              </Grid>
            </>
          )}
          <View style={{ paddingBottom: 25 }} />
        </ImageBackground>
      </ScrollView>
      <Footer />
    </Container>
  );
}
