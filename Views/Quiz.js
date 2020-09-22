import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import Container from "../Components/ViewContainer";
import Footer from "../Components/Footer";
import { ScrollView } from "react-native";
import { firestore } from "../Utils/firebase";
import config from "../config.json";
import CardItem from "../Components/CardItem";

export default function Quiz() {
  const [quiz, setQuiz] = useState([]);
  useEffect(() => {
    (async () => {
      const quizRef = await firestore.collection(config.collections.quiz).get();
      const quiz = quizRef.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setQuiz(quiz);
    })();
  }, []);

  const onPressItem = (id) => {};

  return (
    <Container>
      <Header title="Quiz" />
      <ScrollView>
        {quiz.map((item) => (
          <CardItem
            key={item.id}
            title={item?.title}
            subTitle={item?.subTitle}
            onPress={() => onPressItem(item.id)}
            thumbnail={item.thumbnail}
          />
        ))}
      </ScrollView>
      <Footer />
    </Container>
  );
}
