import React from "react";
import {
  Body,
  Card,
  Container,
  Header,
  Left,
  List,
  ListItem,
  Right,
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

const mockVideo = [
  {
    id: "1",
    thumbnail:
      "https://cdn.iconscout.com/icon/free/png-256/no-image-1771002-1505134.png",
    title: "Test Video 1",
    subTitle: "Test Video Subtitle 1",
  },
  {
    id: "2",
    thumbnail:
      "https://cdn.iconscout.com/icon/free/png-256/no-image-1771002-1505134.png",
    title: "Test Video 2",
    subTitle: "Test Video Subtitle 2",
  },
  {
    id: "3",
    thumbnail:
      "https://cdn.iconscout.com/icon/free/png-256/no-image-1771002-1505134.png",
    title: "Test Video 3",
    subTitle: "Test Video Subtitle 3",
  },
];

const mockEssay = [
  {
    id: "1",
    thumbnail:
      "https://cdn.iconscout.com/icon/free/png-256/no-image-1771002-1505134.png",
    title: "Test Video 1",
    subTitle: "Test Video Subtitle 1",
  },
  {
    id: "2",
    thumbnail:
      "https://cdn.iconscout.com/icon/free/png-256/no-image-1771002-1505134.png",
    title: "Test Video 2",
    subTitle: "Test Video Subtitle 2",
  },
  {
    id: "3",
    thumbnail:
      "https://cdn.iconscout.com/icon/free/png-256/no-image-1771002-1505134.png",
    title: "Test Video 3",
    subTitle: "Test Video Subtitle 3",
  },
];

const mockVocab = [
  {
    id: "1",
    thumbnail:
      "https://cdn.iconscout.com/icon/free/png-256/no-image-1771002-1505134.png",
    title: "Test Video 1",
    subTitle: "Test Video Subtitle 1",
  },
  {
    id: "2",
    thumbnail:
      "https://cdn.iconscout.com/icon/free/png-256/no-image-1771002-1505134.png",
    title: "Test Video 2",
    subTitle: "Test Video Subtitle 2",
  },
  {
    id: "3",
    thumbnail:
      "https://cdn.iconscout.com/icon/free/png-256/no-image-1771002-1505134.png",
    title: "Test Video 3",
    subTitle: "Test Video Subtitle 3",
  },
];

export default function Home() {
  return (
    <Container>
      <Header>
        <Left />
        <Body>
          <Title style={{ fontSize: 18 }}>The English Recap</Title>
        </Body>
        <Right />
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
                    <ListItem thumbnai key={video.id}>
                      <Left>
                        <Thumbnail
                          square
                          small
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
                    <ListItem thumbnai key={video.id}>
                      <Left>
                        <Thumbnail
                          square
                          small
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
                    <ListItem thumbnai key={video.id}>
                      <Left>
                        <Thumbnail
                          square
                          small
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
