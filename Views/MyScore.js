import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { ScrollView, View } from "react-native";
import Container from "../Components/ViewContainer";
import { auth, firestore } from "../Utils/firebase";
import { Button, Text } from "react-native-elements";
import { useHistory } from "react-router-native";
import config from "../config.json";
import CardItem from "../Components/CardItem";
import moment from "moment";

export default function MyScore() {
  const userId = auth?.currentUser?.uid ?? null;
  const history = useHistory();
  const [doneQuestion, setDoneQuestion] = useState([]);

  useEffect(() => {
    if (userId) {
      (async () => {
        const answerDataRef = await firestore
          .collection(config.collections.students)
          .doc(userId)
          .collection("answers")
          .orderBy("start_at", "desc")
          .get();
        const answerData = await Promise.all(
          answerDataRef.docs.map(async (i) => ({
            ...i.data(),
            id: i.id,
            quiz_id: (await i.data().quiz_id.get()).data(),
            length: (await i.data().quiz_id.collection("questions").get()).docs
              .length,
          }))
        );
        setDoneQuestion(answerData);
      })();
    }
  }, []);
  return (
    <>
      <Header title="My Score" />
      <Container>
        <ScrollView style={{ paddingTop: 15 }}>
          {doneQuestion.map((item) => (
            <CardItem
              thumbnail={item.quiz_id.thumbnail}
              key={item.id}
              subTitle={`Success at ${moment(item.start_at.toDate()).format(
                "DD/MM/YYYY hh:mm"
              )}`}
              title={`${item.quiz_id.title} - ${item.correct}/${item.length} `}
            />
          ))}
          {!userId && (
            <View
              style={{
                padding: 5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ margin: 15, fontSize: 20 }}>
                Please login to view your score
              </Text>
              <Button
                type="clear"
                title="Login"
                onPress={() => history.push("/login")}
              />
            </View>
          )}
        </ScrollView>
      </Container>
      <Footer />
    </>
  );
}
