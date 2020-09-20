import React from "react";
import { ScrollView } from "react-native";
import { Col, Grid, Row } from "react-native-easy-grid";
import Section from "../Components/Section";
import Container from "../Components/ViewContainer";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import config from "../config.json";

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
  return (
    <Container>
      <Header title={config.app.title} />
      <ScrollView>
        <Grid>
          <Row>
            <Col>
              <Section
                title="Videos"
                item={mockVideo.map((item) => ({
                  ...item,
                  path: `/content/${item.id}`,
                }))}
                path="/course/1"
                type="video"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Section title="Essay" item={mockEssay} />
            </Col>
          </Row>
          <Row>
            <Col>
              <Section title="Vocabulary" item={mockVocab} />
            </Col>
          </Row>
        </Grid>
      </ScrollView>
      <Footer />
    </Container>
  );
}
