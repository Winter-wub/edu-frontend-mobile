import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import Container from "../Components/ViewContainer";
import Footer from "../Components/Footer";
import { ScrollView } from "react-native";
import { firestore } from "../Utils/firebase";
import config from "../config.json";
import CardItem from "../Components/CardItem";
import { useHistory } from "react-router-native";

export default function Quiz() {
  const [quiz, setQuiz] = useState([]);
  const history = useHistory();
  useEffect(() => {
    (async () => {
      const quizRef = await firestore.collection(config.collections.quiz).get();
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
    })();
  }, []);

  const onPressItem = (id) => {
    history.push(`/quiz/${id}/0`);
  };

  return (
    <Container>
      <Header title="Quiz" />
      <ScrollView>
        {quiz.map((item) => (
          <CardItem
            key={item.id}
            title={item?.title}
            subTitle={`${item?.length} Question`}
            onPress={() => onPressItem(item.id)}
            thumbnail={item.thumbnail}
          />
        ))}
      </ScrollView>
      <Footer />
    </Container>
  );
}
