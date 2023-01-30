import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const Questionaires = () => {
  return (
    <Document>
      <Page size="A4">
        <View>
          <Text>Section #1</Text>
        </View>
        <View>
          <Text>Section #2</Text>
        </View>
      </Page>
    </Document>
  );
};

export default Questionaires;
