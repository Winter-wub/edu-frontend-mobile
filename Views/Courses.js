import React from "react";
import {
  Body,
  Button,
  Container,
  Header,
  Icon,
  Left,
  List,
  ListItem,
  Text,
  Thumbnail,
  Title,
} from "native-base";
import { useHistory } from "react-router-native";
import { ScrollView } from "react-native";

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
  const onPressGoBack = () => {
    history.goBack();
  };
  const onPressItem = () => {
    history.push("/video", { type: "video" });
  };
  return (
    <Container>
      <Header>
        <Left>
          <Button transparent onPress={onPressGoBack}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Course Title</Title>
        </Body>
      </Header>
      <ScrollView>
        <List>
          {mockVideo.map((video) => (
            <ListItem thumbnail key={video.id} onPress={onPressItem}>
              <Left>
                <Thumbnail
                  square
                  source={{
                    uri: video.thumbnail,
                  }}
                />
              </Left>
              <Body>
                <Text>{video.title}</Text>
                <Text note numberOfLines={1}>
                  {video.subTitle}
                </Text>
              </Body>
            </ListItem>
          ))}
        </List>
      </ScrollView>
    </Container>
  );
}
