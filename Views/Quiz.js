import React from "react";
import Header from "../Components/Header";
import Container from "../Components/ViewContainer";
import Footer from "../Components/Footer";
import { ScrollView } from "react-native";

export default function Quiz() {
  return (
    <Container>
      <Header title="Quiz" />
      <ScrollView></ScrollView>
      <Footer />
    </Container>
  );
}
