import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-native";
import { ScrollView } from "react-native";
import Header from "../Components/Header";
import Container from "../Components/ViewContainer";
import CardItem from "../Components/CardItem";
import { firestore } from "../Utils/firebase";
import config from "../config.json";
import { AppLoading } from "expo";

export default function Courses() {
  const history = useHistory();
  const { id } = useParams();
  const [items, setItems] = useState([]);
  const [load, setLoad] = useState(true);
  const [title, setTitle] = useState("");

  const onPressItem = (link) => {
    history.push(`/content/${link}`, { type: id });
  };

  useEffect(() => {
    (async () => {
      try {
        const docRef = firestore
          .collection(config.collections.categories)
          .doc(id);

        const docData = await docRef.get();
        setTitle(docData.data().title);

        const coursesRef = await docRef.collection("courses").get();
        const data = await Promise.all(
          coursesRef.docs.map(async (doc) => ({
            id: doc.id,
            ...(await doc.data()),
            link: doc.id,
          }))
        );
        setItems(data);
      } catch (e) {
        console.log(e);
      } finally {
        setLoad(false);
      }
    })();
  }, []);
  return load ? (
    <AppLoading />
  ) : (
    <Container>
      <Header title={title} goBack />
      <ScrollView>
        {items.map((item) => (
          <CardItem
            key={item.id}
            title={item?.title}
            subTitle={item?.subTitle}
            onPress={() => onPressItem(item.id)}
            thumbnail={item.thumbnail}
          />
        ))}
      </ScrollView>
    </Container>
  );
}
