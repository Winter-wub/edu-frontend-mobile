import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-native";
import { ScrollView, ActivityIndicator, View } from "react-native";
import Header from "../Components/Header";
import Container from "../Components/ViewContainer";
import CardItem from "../Components/CardItem";
import { firestore } from "../Utils/firebase";
import config from "../config.json";
import { Button, Icon, ListItem, Overlay, Text } from "react-native-elements";

export default function Courses() {
  const history = useHistory();
  const { id } = useParams();
  const [items, setItems] = useState([]);
  const [load, setLoad] = useState(true);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [typeList, setTypeList] = useState([]);
  const [toggleSearch, setToggleSearch] = useState(false);

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
        if (type !== "") {
          console.log("search by type");
          const coursesRef = await docRef
            .collection("courses")
            .where("type", "==", type)
            .get();
          const data = await Promise.all(
            coursesRef.docs.map(async (doc) => ({
              id: doc.id,
              ...(await doc.data()),
              link: doc.id,
            }))
          );
          setItems(data);
        } else {
          const coursesRef = await docRef.collection("courses").get();
          const data = await Promise.all(
            coursesRef.docs.map(async (doc) => ({
              id: doc.id,
              ...(await doc.data()),
              link: doc.id,
            }))
          );
          setItems(data);
        }

        const appConfig = (
          await firestore
            .collection(config.collections.app_config)
            .doc("categories")
            .get()
        ).data();
        if (id === "videos") {
          setTypeList(appConfig.videos_type);
        } else if (id === "essays") {
          setTypeList(appConfig.essays_type);
        } else if (id === "vocab") {
          setTypeList(appConfig.vocab_type);
        } else {
          setTypeList([]);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoad(false);
      }
    })();
  }, [type]);
  return (
    <Container>
      <Overlay isVisible={load}>
        <ActivityIndicator />
      </Overlay>
      <Overlay
        isVisible={toggleSearch}
        onBackdropPress={() => setToggleSearch(false)}
      >
        <View style={{ display: "flex", justifyContent: "center" }}>
          {typeList.map((item, id) => (
            <ListItem
              bottomDivider
              key={id}
              onPress={() => {
                setType(item);
                setToggleSearch(false);
              }}
            >
              <ListItem.Title>{item}</ListItem.Title>
            </ListItem>
          )) ?? []}
        </View>
      </Overlay>
      <Header title={title} goBack />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          padding: 15,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Button
          type="clear"
          icon={<Icon name="search" type="material" />}
          onPress={() => setToggleSearch(true)}
        />
        <Text>{type === "" ? "Search by Type" : type}</Text>
        <Button
          type="clear"
          title="clear"
          style={{ marginRight: 0 }}
          onPress={() => setType("")}
        />
      </View>
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
