import { View, Text, StyleSheet } from "react-native";
import { useState } from "react";
import React from "react";
function AuthPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>AuthPage</Text>
    </View>
  );
}

export default AuthPage;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: { fontSize: 40 },
});
