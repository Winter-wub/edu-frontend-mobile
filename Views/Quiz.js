import React, { useContext, useEffect, useState } from "react";
import Header from "../Components/Header";
import Container from "../Components/ViewContainer";
import Footer from "../Components/Footer";
import {
  ActivityIndicator,
  ImageBackground,
  ScrollView,
  View,
} from "react-native";
import { firestore } from "../Utils/firebase";
import config from "../config.json";
import CardItem from "../Components/CardItem";
import { useHistory } from "react-router-native";
import { Overlay, ThemeContext } from "react-native-elements";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function Quiz() {
  const [quiz, setQuiz] = useState([]);
  const [load, setLoad] = useState(true);
  const history = useHistory();
  const { theme } = useContext(ThemeContext);
  const bgPicker = (type) => {
    switch (type) {
      case "choice":
        return theme.colors.video;
      case "matching":
        return theme.colors.vocab;
      case "spelling":
        return theme.colors.essay;
      default:
        return theme.colors.quiz;
    }
  };

  const fetchQuizList = async () => {
    try {
      setQuiz([]);
      setLoad(true);
      const quizRef = await firestore.collection(config.collections.quiz).get();
      const quiz = await Promise.all(
        quizRef.docs.map(async (doc) => {
          const length =
            (await doc.ref.collection("questions").get())?.size ?? 0;
          return {
            ...doc.data(),
            ref: doc.ref,
            id: doc.id,
            length,
          };
        })
      );
      setQuiz(quiz);
    } catch (e) {
      console.log(e);
    } finally {
      setLoad(false);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchQuizList();
    })();
  }, []);

  const onPressItem = (id) => {
    history.push(`/quiz/${id}/0`);
  };

  return (
    <Container bgColor="#fff">
      <ImageBackground
        source={require("../assets/images/bg-sunset.jpg")}
        style={{
          width: "100%",
          height: "100%",
          flex: 1,
        }}
      >
        <Overlay isVisible={load}>
          <ActivityIndicator />
        </Overlay>
        <Header title="Exercise" />
        <ScrollView>
          {quiz.map((item) => (
            <View key={item.id} style={{ marginTop: 5 }}>
              <CardItem
                titleColor="#112A46"
                bgColor={bgPicker(item?.type)}
                title={item?.title ?? ""}
                subTitle={`(${capitalizeFirstLetter(item?.type ?? "choice")}) ${
                  item?.length
                } Question`}
                onPress={() => onPressItem(item.id)}
                thumbnail={item.thumbnail}
                subTitleColor="#112A46"
              />
            </View>
          ))}
        </ScrollView>
        <View style={{ marginBottom: 0, marginTop: "auto" }}>
          <Footer />
        </View>
      </ImageBackground>
    </Container>
  );
}
