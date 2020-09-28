import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import Container from "../Components/ViewContainer";
import Footer from "../Components/Footer";
import { ActivityIndicator, ScrollView } from "react-native";
import { firestore } from "../Utils/firebase";
import config from "../config.json";
import CardItem from "../Components/CardItem";
import { useHistory } from "react-router-native";
import { Overlay, Text } from "react-native-elements";

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
      <Header title="Quiz" />
      <ScrollView>
        {quiz.map((item) => (
          <CardItem
            key={item.id}
            title={item?.title}
            subTitle={<Text>{item?.length} Question</Text>}
            onPress={() => onPressItem(item.id)}
            thumbnail={item.thumbnail}
          />
        ))}
      </ScrollView>
      <Footer />
    </Container>
  );
}
