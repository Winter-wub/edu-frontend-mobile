import React, { useContext, useEffect, useState } from "react";
import Header from "../Components/Header";
import Container from "../Components/ViewContainer";
import Footer from "../Components/Footer";
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
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
        <FlatList
          keyExtractor={(item) => item.id}
          data={quiz}
          renderItem={({ item }) => {
            return (
              <View style={{ marginTop: 5, paddingHorizontal: 5 }}>
                <CardItem
                  titleColor="#112A46"
                  bgColor={bgPicker(item?.type)}
                  title={item?.title}
                  subTitle={`(${capitalizeFirstLetter(
                    item?.type ?? "choice"
                  )}) ${item?.length} Question`}
                  onPress={() => onPressItem(item.id)}
                  thumbnail={item.thumbnail}
                  subTitleColor="#112A46"
                />
              </View>
            );
          }}
        />
        <View style={{ marginBottom: 0, marginTop: "auto" }}>
          <Footer />
        </View>
      </ImageBackground>
    </Container>
  );
}
