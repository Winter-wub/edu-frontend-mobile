import { View } from "react-native";
import { Button, Text } from "react-native-elements";
import { Col, Grid, Row } from "react-native-easy-grid";
import React from "react";

export default function Choice(props) {
  const { currentQuest, onPressAnswer } = props;
  return (
    <View style={{ padding: 5, display: "flex" }}>
      <Text
        h4
        h4Style={{
          fontFamily: "roboto",
          margin: 5,
          padding: 5,
          marginBottom: 25,
          fontSize: 22,
        }}
      >
        {currentQuest.no}:{currentQuest.question}
      </Text>
      <Grid>
        <Row>
          <Col>
            {currentQuest?.choices?.[0] && (
              <Button
                onPress={() => onPressAnswer(0)}
                buttonStyle={{ margin: 5 }}
                title={`${currentQuest.choices[0]}`}
              />
            )}
          </Col>
          <Col>
            {currentQuest?.choices?.[1] && (
              <Button
                onPress={() => onPressAnswer(1)}
                buttonStyle={{ margin: 5 }}
                title={`${currentQuest.choices[1]}`}
              />
            )}
          </Col>
        </Row>
        <Row>
          {currentQuest?.choices?.[2] && (
            <Col>
              <Button
                onPress={() => onPressAnswer(2)}
                buttonStyle={{ margin: 5 }}
                title={`${currentQuest.choices[2]}`}
              />
            </Col>
          )}
          <Col>
            {currentQuest?.choices?.[3] && (
              <Button
                onPress={() => onPressAnswer(3)}
                buttonStyle={{ margin: 5 }}
                title={`${currentQuest.choices[3]}`}
              />
            )}
          </Col>
        </Row>
      </Grid>
    </View>
  );
}
