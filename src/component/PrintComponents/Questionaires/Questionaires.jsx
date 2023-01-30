import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import title from "../../../Assest/Navigation/title2.png";

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
  note: {
    fontSize: 10,
    paddingHorizontal: 50,
    textAlign: "center",
    marginBottom: 30,
  },
  logo: {
    width: 300,
    height: 70,
    margin: "auto",
  },
  question: {
    marginBottom: 5,
  },
  item: {
    marginBottom: 10,
    fontSize: 12,
  },
  cContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  choices: {
    width: "50%",
    marginBottom: 5,
    fontSize: 12,
  },
  bContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 1,
  },
  box: {
    margin: "auto",
    width: "20%",
    height: 22,
    border: "1px solid black",
    marginBottom: 7,
    fontSize: 10,
  },
  header: {
    fontSize: 12,
    marginBottom: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

const Questionaires = ({ data }) => {
  const arrDummy = Array.from(Array(100));

  const handleQuestions = data => {
    return data.questions?.map((question, i) =>
      question.type === "0"
        ? handleMultipleChoice(question, i + 1)
        : handleIdentification(question, i + 1)
    );
  };

  const randomize = values => {
    let index = values.length,
      randomIndex;

    while (index != 0) {
      randomIndex = Math.floor(Math.random() * index);
      index--;
      [values[index], values[randomIndex]] = [
        values[randomIndex],
        values[index],
      ];
    }

    return values;
  };

  const handleMultipleChoice = (question, i) => {
    let choices = [
      question.choice1,
      question.choice2,
      question.choice3,
      question.answer,
    ];

    return (
      <View style={styles.item}>
        <Text style={styles.question}>
          {i}.) {question.question}
        </Text>
        <View style={styles.cContainer}>
          {randomize(choices).map((text, i) => (
            <Text style={styles.choices}>{text}</Text>
          ))}
        </View>
      </View>
    );
  };

  const handleIdentification = (question, i) => (
    <View style={styles.item}>
      <Text style={styles.question}>
        {i}.) {question.question} _______________
      </Text>
    </View>
  );

  return (
    <Document>
      <Page size="A4" style={styles.body}>
        <View>
          <Image style={styles.logo} src={title} />
          <Text style={styles.note}>
            THIS IS A QUESTIONNAIRE FOR THE EXAM, PLEASE DON'T WRITE ANYTHING
            HERE AND IF HAVE ANY QUESTIONS, PLEASE LOOK FOR AN INSTRUCTOR.
          </Text>
        </View>
        <View style={styles.title}>
          <Text>{data.questionnaire_title}</Text>
        </View>
        <View>{handleQuestions(data)}</View>
      </Page>
      <Page size="A4" style={styles.body}>
        <View style={styles.bContainer}>
          {arrDummy.map((_, i) => (
            <Text style={styles.box}></Text>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default Questionaires;
