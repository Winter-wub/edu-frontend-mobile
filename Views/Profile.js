import React, { useEffect } from "react";
import Container from "../Components/ViewContainer";
import Header from "../Components/Header";
import { auth } from "../Utils/firebase";
import { useHistory } from "react-router-native";
import Footer from "../Components/Footer";
import { ScrollView } from "react-native";

export default function Profile() {
  const history = useHistory();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        history.push("/login");
      }
    });
  }, []);

  return (
    <Container>
      <Header title="Profile" />
      <ScrollView></ScrollView>
      <Footer />
    </Container>
  );
}
