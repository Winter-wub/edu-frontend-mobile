import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-native";
import {
  ScrollView,
  ActivityIndicator,
  View,
  TouchableOpacity,
} from "react-native";
import Header from "../Components/Header";
import Container from "../Components/ViewContainer";
import CardItem from "../Components/CardItem";
import { firestore } from "../Utils/firebase";
import config from "../config.json";
import { Button, Icon, ListItem, Overlay, Text } from "react-native-elements";
import moment from "moment";

const randomInt = (a = 1, b = 0) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const bgColors = ["#4285F4", "#EA4335", "#FBBC05", "#34A853"];

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
    history.push(link);
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
          const coursesRef = await docRef
            .collection("courses")
            .where("type", "==", type)
            .orderBy("created_at", "desc")
            .get();

          const data = coursesRef.docs.map((doc) => ({
            id: doc.id,
            path: `/content/${doc.id}`,
            ...doc.data(),
          }));

          setItems(data);
        } else {
          const coursesRef = await docRef
            .collection("courses")
            .orderBy("created_at", "desc")
            .get();
          const data = coursesRef.docs.map((doc) => ({
            id: doc.id,
            path: `/content/${doc.id}/${id}`,
            ...doc.data(),
          }));

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
          buttonStyle={{
            borderWidth: 1,
            borderRadius: 100,
            backgroundColor: "transparent",
          }}
          icon={<Icon name="search" type="material" color="#000" />}
          onPress={() => setToggleSearch(true)}
        />
        <TouchableOpacity onPress={() => setToggleSearch(true)}>
          <Text>{type === "" ? "Search by Type" : type}</Text>
        </TouchableOpacity>
        <Button
          buttonStyle={{
            // borderWidth: 1,
            borderRadius: 100,
            backgroundColor: "transparent",
          }}
          titleStyle={{
            color: "#000",
          }}
          type="clear"
          title="Clear"
          style={{ marginRight: 0 }}
          onPress={() => setType("")}
        />
      </View>
      <ScrollView>
        {items.map((item, id) => (
          <View key={item.id} style={{ marginTop: 5, paddingHorizontal: 5 }}>
            <CardItem
              titleColor="#fff"
              subTitleColor="#fff"
              bgColor={bgColors[randomInt(0, 3)]}
              title={item?.title}
              subTitle={
                item?.created_at
                  ? `Published ${moment(item.created_at.toDate()).format(
                      "DD/MM/YYYY hh:mm"
                    )}`
                  : ""
              }
              onPress={() => onPressItem(item.path)}
              thumbnail={item.thumbnail}
            />
          </View>
        ))}
      </ScrollView>
    </Container>
  );
}
