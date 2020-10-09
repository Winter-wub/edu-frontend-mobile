import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import Container from "../Components/ViewContainer";
import Footer from "../Components/Footer";
import { ActivityIndicator, ScrollView, View } from "react-native";
import { firestore } from "../Utils/firebase";
import config from "../config.json";
import CardItem from "../Components/CardItem";
import { useHistory } from "react-router-native";
import { Overlay } from "react-native-elements";

const bgColors = ["#4285F4", "#EA4335", "#FBBC05", "#34A853"];

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function bgPicker(type) {
  switch (type) {
    case "choice":
      return bgColors[0];
    case "matching":
      return bgColors[1];
    case "spelling":
      return bgColors[3];
    default:
      return bgColors[0];
  }
}

export default function Quiz() {
  const [quiz, setQuiz] = useState([]);
  const [load, setLoad] = useState(true);
  const history = useHistory();

  useEffect(() => {
    (async () => {
      try {
        setLoad(true);
        const quizRef = await firestore
          .collection(config.collections.quiz)
          .get();
        const quiz = await Promise.all(
          quizRef.docs.map(async (doc) => {
            const length = (await doc.ref.collection("questions").get()).size;
            return {
              ...doc.data(),
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
    })();
  }, []);

  const onPressItem = (id) => {
    history.push(`/quiz/${id}/0`);
  };

  return (
    <Container>
      <Overlay isVisible={load}>
        <ActivityIndicator />
      </Overlay>
      <Header title="Exercise" />
      <ScrollView>
        {quiz.map((item) => (
          <View key={item.id} style={{ marginTop: 5, paddingHorizontal: 5 }}>
            <CardItem
              titleColor="#fff"
              bgColor={bgPicker(item?.type)}
              title={item?.title}
              subTitle={`(${capitalizeFirstLetter(item?.type ?? "choice")}) ${
                item?.length
              } Question`}
              onPress={() => onPressItem(item.id)}
              thumbnail={item.thumbnail}
              subTitleColor="#fff"
            />
          </View>
        ))}
      </ScrollView>
      <Footer />
    </Container>
  );
}
