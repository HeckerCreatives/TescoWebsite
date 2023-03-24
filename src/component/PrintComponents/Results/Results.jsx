import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  body: {
    paddingVertical: 30,
    paddingHorizontal: 30,
  },
  items: {
    marginBottom: 20,
    fontSize: 12,
  },
  header: {
    marginBottom: 20,
  },
  name: {
    fontSize: 13,
    textTransform: "capitalize",
  },
  question: {},
  answer: {},
  footer: {
    textAlign: "right",
    marginTop: 30,
    fontSize: 15,
  },
  cColor: {
    color: "green",
  },
  wColor: {
    color: "red",
  },
});

const PrintResults = ({ data }) => {
  const ShowQuestions = (data) => {
    const questions = data.questionaireId?.questions;
    const answers = data.answer;

    let texts = [];

    questions.map((question) => {
      let ans = answers.find((e) => e.questionId === question._id);
      texts.push({
        question: question.question,
        answer: ans?.answer,
        correct: question.answer,
        isCorrect: ans.answer === question.answer,
      });
    });

    return texts.map((text, i) => (
      <View style={styles.items}>
        <View>
          <Text>
            {i + 1}. {text.question}{" "}
          </Text>
        </View>
        <View>
          <Text style={text.isCorrect ? styles.cColor : styles.wColor}>
            Your answer: {text.answer}
          </Text>
          <Text style={styles.cColor}>
            {!text.isCorrect && <>Correct Answer: {text.correct}</>}
          </Text>
        </View>
        <br />
      </View>
    ));
  };

  const handleScore = (data) => {
    const questions = data.questionaireId?.questions;
    const answers = data.answer;

    if (questions) {
      let total = 0;

      questions.map((question) => {
        let ans = answers.find((e) => e.questionId === question._id);
        if (ans.answer === question.answer) total++;
      });

      return `${total}/${questions.length}`;
    }
  };

  return (
    <Document>
      <Page size="A4" style={styles.body}>
        <View style={styles.header}>
          <Text>{data.questionaireId?.questionnaire_title}</Text>
          <Text style={styles.name}>
            {`${data.lastname}, ${data.firstname} ${
              data.middlename && data.middlename?.substring(0, 1)
            }.`}
          </Text>
        </View>
        {ShowQuestions(data)}
        <View style={styles.footer}>
          <Text>Overall Score: {handleScore(data)}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default PrintResults;
