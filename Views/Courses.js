import React from "react";
import { useHistory } from "react-router-native";
import { ScrollView } from "react-native";
import Header from "../Components/Header";
import Container from "../Components/ViewContainer";
import CardItem from "../Components/CardItem";

const mockVideo = [
  {
    id: "1",
    thumbnail:
      "https://cdn.iconscout.com/icon/free/png-256/no-image-1771002-1505134.png",
    title: "Test Content 1",
    subTitle: "Test Content Subtitle 1",
  },
  {
    id: "2",
    thumbnail:
      "https://cdn.iconscout.com/icon/free/png-256/no-image-1771002-1505134.png",
    title: "Test Content 2",
    subTitle: "Test Content Subtitle 2",
  },
  {
    id: "3",
    thumbnail:
      "https://cdn.iconscout.com/icon/free/png-256/no-image-1771002-1505134.png",
    title: "Test Content 3",
    subTitle: "Test Content Subtitle 3",
  },
];

export default function Courses() {
  const history = useHistory();
  const onPressItem = (link) => {
    history.push(link, { type: "videos" });
  };
  return (
    <Container>
      <Header title="Course Title" goBack />
      <ScrollView>
        {mockVideo.map((item) => (
          <CardItem
            key={item.id}
            title={item.title}
            subTitle={item.subTitle}
            onPress={() => onPressItem(item.id)}
            thumbnail={item.thumbnail}
          />
        ))}
      </ScrollView>
    </Container>
  );
}
