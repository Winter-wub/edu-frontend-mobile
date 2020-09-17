import React from "react";
import {
  Body,
  Card,
  Container,
  Header,
  Left,
  List,
  ListItem,
  Thumbnail,
  Title,
  Text,
  CardItem,
  H1,
  Footer,
  FooterTab,
  Button,
  Icon,
} from "native-base";
import { ScrollView } from "react-native";
import { Row, Grid, Col } from "react-native-easy-grid";
import { useHistory } from "react-router-native";

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

const mockEssay = [
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

const mockVocab = [
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

export default function Home() {
  const history = useHistory();

  const onPressItem = () => {
    history.push("/video");
  };
  return (
    <Container>
      <Header>
        <Body style={{ alignItems: "center" }}>
          <Title>The English Recap</Title>
        </Body>
      </Header>
      <ScrollView>
        <Grid>
          <Row>
            <Col>
              <Card>
                <CardItem header>
                  <H1>Videos</H1>
                </CardItem>
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
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card>
                <CardItem header>
                  <H1>Essay</H1>
                </CardItem>
                <List>
                  {mockEssay.map((video) => (
                    <ListItem thumbnail key={video.id}>
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
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card>
                <CardItem header>
                  <H1>Vocabulary</H1>
                </CardItem>
                <List>
                  {mockVocab.map((video) => (
                    <ListItem thumbnail key={video.id}>
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
              </Card>
            </Col>
          </Row>
        </Grid>
      </ScrollView>
      <Footer>
        <FooterTab>
          <Button active>
            <Icon name="home" />
          </Button>
          <Button>
            <Text>Quiz</Text>
          </Button>
          <Button>
            <Text>About</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
}
