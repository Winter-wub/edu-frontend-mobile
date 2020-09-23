import React, { useEffect, useState } from "react";
import Container from "../Components/ViewContainer";
import Header from "../Components/Header";
import { ActivityIndicator, ScrollView, View } from "react-native";
import { useParams, useHistory } from "react-router-native";
import { auth, firestore } from "../Utils/firebase";
import config from "../config.json";
import { Button, Card, Icon, Overlay, Text } from "react-native-elements";
import { Grid, Col, Row } from "react-native-easy-grid";

export default function Question() {
  const history = useHistory();
  const userId = auth.currentUser.uid;
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQuest, setCurrentQuest] = useState(null);
  const [done, setDone] = useState(0);
  const [no, setNo] = useState(0);
  const [finish, setFinish] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [save, setSave] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [quizRef, setQuizRef] = useState(null);

  useEffect(() => {
    (async () => {
      console.log(`😊 UserId: ${userId}`);
      const quizRef = firestore.collection(config.collections.quiz).doc(id);
      const quizInfo = (await quizRef.get()).data();
      setTitle(quizInfo.title);
      const questionsRef = await quizRef.collection("questions").get();
      setQuizRef(quizRef);
      const questionData = [];
      let i = 1;
      for (const ref of questionsRef.docs) {
        const doc = await ref.data();
        questionData.push({
          id: ref.id,
          no: i,
          ...doc,
        });
        i++;
      }
      setQuestions(questionData);
      setCurrentQuest(questionData?.[0] ?? null);
    })();
  }, []);

  const onPressAnswer = (choiceNo) => {
    if (!questions[no + 1]) {
      setDone((value) => value + 1);
      setFinish(true);
    } else {
      setDone((value) => value + 1);
      setNo((value) => value + 1);
      setCurrentQuest(questions[no + 1]);
    }
    setAnswers((prev) => [...prev, { no, answers: +choiceNo }]);
  };
  const onPressFinish = async () => {
    try {
      setSave(true);
      await firestore
        .collection(config.collections.students)
        .doc(userId)
        .collection("answers")
        .add({
          answers,
          quiz_id: quizRef,
          start_at: new Date(),
          status: "finish",
        });
      history.push("/quiz");
    } catch (e) {
      console.log(e);
      setError(true);
      setMessage("Can't Save Answer Please Try Again");
    } finally {
      setSave(false);
    }
  };

  console.log(`✅ done: ${done}/${questions.length}`);
  console.log(`🔗 answers data ${JSON.stringify(answers, null, 2)}`);

  return (
    <Container>
      <Header title={`${title} Q:${no}/${questions.length}`} goBack />
      <ScrollView>
        {currentQuest && !finish && (
          <View style={{ padding: 5, display: "flex" }}>
            <Text h4 style={{ margin: 5, padding: 5, marginBottom: 25 }}>
              {currentQuest.no}:{currentQuest.title}
            </Text>
            <Grid>
              <Row>
                <Col>
                  {currentQuest?.choices?.[0] && (
                    <Button
                      onPress={() => onPressAnswer(0)}
                      buttonStyle={{ margin: 5 }}
                      title={`${currentQuest.choices[0]}`}
                    />
                  )}
                </Col>
                <Col>
                  {currentQuest?.choices?.[1] && (
                    <Button
                      onPress={() => onPressAnswer(1)}
                      buttonStyle={{ margin: 5 }}
                      title={`${currentQuest.choices[1]}`}
                    />
                  )}
                </Col>
              </Row>
              <Row>
                {currentQuest?.choices?.[2] && (
                  <Col>
                    <Button
                      onPress={() => onPressAnswer(2)}
                      buttonStyle={{ margin: 5 }}
                      title={`${currentQuest.choices[2]}`}
                    />
                  </Col>
                )}
                <Col>
                  {currentQuest?.choices?.[3] && (
                    <Button
                      onPress={() => onPressAnswer(3)}
                      buttonStyle={{ margin: 5 }}
                      title={`${currentQuest.choices[3]}`}
                    />
                  )}
                </Col>
              </Row>
            </Grid>
          </View>
        )}
        {finish && (
          <View
            style={{ padding: 5, display: "flex", justifyContent: "center" }}
          >
            <Card>
              <Card.Title>Finish</Card.Title>
              <Button title="Send Answer" onPress={onPressFinish} />
            </Card>
          </View>
        )}
      </ScrollView>
      <Overlay
        isVisible={error || save}
        onBackdropPress={() => {
          if (error) {
            setError(false);
            setMessage("");
          }
        }}
      >
        <View style={{ padding: 5, display: "flex", justifyContent: "center" }}>
          {error ? (
            <Icon name="exclamation-circle" size="30" type="font-awesome" />
          ) : (
            <ActivityIndicator size="large" />
          )}
          <Text>{message}</Text>
        </View>
      </Overlay>
    </Container>
  );
}
