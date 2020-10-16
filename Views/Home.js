import React, { useContext, useEffect, useState } from "react";
import { FlatList, ImageBackground } from "react-native";
import Section from "../Components/Section";
import Container from "../Components/ViewContainer";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import config from "../config.json";
import { ThemeContext } from "react-native-elements";
import { firestore } from "../Utils/firebase";

export default function Home() {
  const [video, setVideo] = useState([]);
  const [essay, setEssay] = useState([]);
  const [vocab, setVocab] = useState([]);
  const [quiz, setQuiz] = useState([]);
  const [load, setLoad] = useState(true);
  const [sections, setSections] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
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
        setIsSuccess(true);
      } catch (e) {
        setIsSuccess(false);
      } finally {
        setLoad(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setSections([
        {
          item: quiz,
          title: "Exercise",
          type: "quiz",
          bgColor: theme.colors.quiz,
          path: "/quiz",
        },
        {
          item: video,
          title: "Video",
          type: "videos",
          bgColor: theme.colors.video,
          path: "/course/videos",
        },
        {
          item: vocab,
          title: "Vocabulary",
          type: "vocab",
          bgColor: theme.colors.vocab,
          path: "/course/vocab",
        },
        {
          item: essay,
          title: "Essay",
          type: "essays",
          bgColor: theme.colors.essay,
          path: "/course/essays",
        },
      ]);
      setIsSuccess(false);
    }
  }, [load]);

  return (
    <Container bgColor="#fff">
      <ImageBackground
        source={require("../assets/images/bg-building.jpg")}
        style={{ width: "100%", height: "100%" }}
      >
        <Header title={config.app.title} />
        <FlatList
          onRefresh={() => loadingNews()}
          refreshing={load}
          data={sections}
          keyExtractor={(item) => item.path}
          renderItem={({ item }) => (
            <Section
              title={item.title}
              item={item.item}
              type={item.type}
              path={item.path}
              bgColor={item.bgColor}
            />
          )}
        />
        <Footer />
      </ImageBackground>
    </Container>
  );
}
