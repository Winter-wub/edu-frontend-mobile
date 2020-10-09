import React, { useEffect, useState } from "react";
import Container from "../Components/ViewContainer";
import Header from "../Components/Header";
import {
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { useHistory, useParams } from "react-router-native";
import { auth, firestore } from "../Utils/firebase";
import config from "../config.json";
import { Button, Card, Icon, Overlay, Text } from "react-native-elements";
import Choice from "../Components/Choice";
import Matching from "../Components/Matching";
import Spelling from "../Components/Spelling";

export default function Question() {
  const history = useHistory();
  const userId = auth?.currentUser?.uid ?? null;
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
  const [questionType, setQuestionType] = useState("");
  const [categories, setCategories] = useState([]);
  const [matchAnswers, setMatchAnswers] = useState([]);
  const [toggleEdit, setToggleEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);
  const [spellAnswer, setSpellAnswer] = useState("");

  const setUpMatchingQuestion = (questionData) => {
    setCategories(
      questionData.Categories.map((e, i) => ({
        text: e,
        id: i,
        receiveItems: [],
      }))
    );
    setMatchAnswers(
      questionData.answers.map((e, i) => ({
        ...e,
        id: i,
      }))
    );
  };

  useEffect(() => {
    (async () => {
      if (userId) {
        console.log(`😊 UserId: ${userId}`);
        const quizRef = firestore.collection(config.collections.quiz).doc(id);
        const quizInfo = (await quizRef.get()).data();
        setTitle(quizInfo.title);
        setQuestionType(quizInfo.type ?? "choice");
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
        if (quizInfo.type === "matching") {
          setUpMatchingQuestion(questionData?.[0]);
        }
      }
    })();
  }, []);

  const onSelectChoice = (choiceNo) => {
    let correct = false;
    if (!questions[no + 1]) {
      setDone((value) => value + 1);
      setFinish(true);
    } else {
      setDone((value) => value + 1);
      setNo((value) => value + 1);
      setCurrentQuest(questions[no + 1]);
    }
    if (questions[no].answer_index === +choiceNo) {
      correct = true;
    }
    setAnswers((prev) => [...prev, { no, answers: +choiceNo, correct }]);
  };

  const onPressFinish = async () => {
    try {
      setSave(true);
      await firestore
        .collection(config.collections.students)
        .doc(userId)
        .collection("answers")
        .add({
          answers: answers.map((ele) => {
            const data = { ...ele };
            delete data.correct;
            return data;
          }),
          quiz_id: quizRef,
          start_at: new Date(),
          status: "finish",
          correct: answers.reduce((prev, cur) => {
            if (cur.correct) {
              return prev + 1;
            } else {
              return prev;
            }
          }, 0),
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

  const onReceiveItem = ({ dragged, receiver }) => {
    const { payload: dragItem } = dragged;
    const { payload: category } = receiver;
    setCategories((prev) => {
      const currentPrev = [...prev];
      currentPrev[category.id].receiveItems = [
        ...prev[category.id].receiveItems,
        dragItem,
      ];
      return currentPrev;
    });

    setMatchAnswers((prev) => prev.filter((i) => i.id !== dragItem.id));
  };

  const onPressReceiver = (categoryData) => {
    setToggleEdit(true);
    setEditIndex(categoryData.id);
  };

  const onPressItemInEditor = (item, editIndex) => {
    console.log("🔧", item);
    setCategories((prev) => {
      const current = [...prev];
      console.log("🔥", current[editIndex]);
      current[editIndex].receiveItems = current[editIndex].receiveItems.filter(
        (e) => e.id !== item.id
      );
      console.log("👁", current[editIndex]);
      return current;
    });
    setMatchAnswers((prev) => [...prev, item]);
  };

  const onPressNextQuestionMatching = () => {
    let correct = true;
    const score = categories.reduce((prev, cur) => {
      const currentCategoryScore = cur.receiveItems.reduce(
        (count, currentReItem) => {
          if (currentReItem.category_index === cur.id) {
            return count + 1;
          }
          correct = false;
          return count;
        },
        0
      );
      return prev + currentCategoryScore;
    }, 0);
    const answers = categories.map(({ receiveItems, ...item }) => {
      return {
        id: item.id,
        text: item.text,
        answers: receiveItems,
      };
    });
    if (!questions[no + 1]) {
      setDone((value) => value + 1);
      setFinish(true);
    } else {
      setDone((value) => value + 1);
      setNo((value) => value + 1);
      setCurrentQuest(questions[no + 1]);
      setUpMatchingQuestion(questions?.[no + 1]);
    }

    setAnswers((prev) => [...prev, { no, answers, score, correct }]);
  };

  const onPressNextQuestionSpelling = () => {
    if (!questions[no + 1]) {
      setDone((value) => value + 1);
      setFinish(true);
    } else {
      setDone((value) => value + 1);
      setNo((value) => value + 1);
      setCurrentQuest(questions[no + 1]);
    }
    let correct = false;
    if (
      spellAnswer.toLocaleLowerCase() ===
      questions[no].answer.toLocaleLowerCase()
    ) {
      correct = true;
    }
    setAnswers((prev) => [
      ...prev,
      { no, answer: spellAnswer.toLocaleLowerCase(), correct },
    ]);

    setSpellAnswer("");
  };

  console.log(`👁 Question type: ${questionType}`);
  console.log(`✅ done: ${done}/${questions.length}`);
  console.log(`🔗 answers data ${JSON.stringify(answers, null, 2)}`);

  return (
    <Container>
      <Header title={`${title} Q:${no}/${questions.length}`} goBack />
      <ScrollView>
        {userId && !finish && currentQuest && (
          <>
            {questionType === "choice" && (
              <Choice
                currentQuest={currentQuest}
                onPressAnswer={onSelectChoice}
              />
            )}
            {questionType === "matching" && (
              <Matching
                currentQuest={currentQuest}
                onReceiveItem={onReceiveItem}
                categories={categories}
                matchAnswers={matchAnswers}
                onPressReceiver={onPressReceiver}
                onPressAnswer={onPressNextQuestionMatching}
              />
            )}
            {questionType === "spelling" && (
              <Spelling
                currentQuest={currentQuest}
                handleChange={setSpellAnswer}
                value={spellAnswer}
                onPressAnswer={onPressNextQuestionSpelling}
              />
            )}
          </>
        )}

        {!userId && (
          <View
            style={{
              padding: 5,
              flex: 1,
              alignItems: "center",
            }}
          >
            <Text>Please login</Text>
            <Button
              type="clear"
              title="Login"
              onPress={() => history.push("/login")}
            />
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
        {error ? (
          <Icon name="exclamation-circle" size="30" type="font-awesome" />
        ) : (
          <ActivityIndicator />
        )}
        <Text>{message}</Text>
      </Overlay>
      <Overlay
        isVisible={toggleEdit}
        onBackdropPress={() => setToggleEdit(false)}
      >
        <View
          style={{
            display: "flex",
            minWidth: 200,
            minHeight: 200,
            justifyContent: "space-around",
            backgroundColor: "white",
            alignItems: "center",
          }}
        >
          <Text h4 h4Style={{ marginBottom: 5 }}>
            {categories?.[editIndex]?.text}
          </Text>
          <View>
            {categories?.[editIndex]?.receiveItems?.map((i) => (
              <TouchableOpacity
                onPress={() => onPressItemInEditor(i, editIndex)}
                key={i.id}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text>{i.text}</Text>
                <Icon name="delete" type="material" color="red" />
              </TouchableOpacity>
            ))}
          </View>
          <Button
            onPress={() => setToggleEdit(false)}
            buttonStyle={{
              padding: 0,
              borderRadius: 25,
              backgroundColor: "red",
            }}
            icon={<Icon name="close" type="material" color="white" />}
          />
        </View>
      </Overlay>
    </Container>
  );
}
