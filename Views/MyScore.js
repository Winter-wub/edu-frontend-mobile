import React, { useContext, useEffect, useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { ScrollView, View } from "react-native";
import Container from "../Components/ViewContainer";
import { auth, firestore } from "../Utils/firebase";
import { Button, Text, ThemeContext } from "react-native-elements";
import { useHistory } from "react-router-native";
import config from "../config.json";
import CardItem from "../Components/CardItem";
import moment from "moment";

export default function MyScore() {
  const userId = auth?.currentUser?.uid ?? null;
  const history = useHistory();
  const [doneQuestion, setDoneQuestion] = useState([]);
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
    <Container>
      <Header title="My Score" />
      <ScrollView style={{ paddingTop: 15 }}>
        {doneQuestion
          .filter((item) => item?.quiz_id?.thumbnail)
          .map((item) => (
            <View key={item.id} style={{ marginTop: 5, paddingHorizontal: 5 }}>
              <CardItem
                titleColor="#000"
                subTitleColor="#000"
                bgColor={bgPicker(item?.quiz_id?.type ?? "Choice")}
                thumbnail={item?.quiz_id?.thumbnail}
                subTitle={`Finished at ${moment(item.start_at.toDate()).format(
                  "DD/MM/YYYY hh:mm"
                )}`}
                title={`${item?.quiz_id?.title} - ${item?.correct}/${
                  item?.length
                } (${item?.quiz_id?.type ?? "Choice"})`}
              />
            </View>
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
      <Footer />
    </Container>
  );
}
