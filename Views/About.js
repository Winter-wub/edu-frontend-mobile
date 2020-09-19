import React from "react";
import Container from "../Components/ViewContainer";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { ScrollView } from "react-native";

export default function About() {
  return (
    <Container>
      <Header title="About" />
      <ScrollView />
      <Footer />
    </Container>
  );
}
