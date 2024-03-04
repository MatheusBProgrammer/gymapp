import React from "react";
import { View, Text, Image } from "react-native";
import styles from "./styles/HomeStyle"; // Ajuste o caminho conforme necessário
import Navbar from "../layout/Navbar";
const MeuComponente = () => {
  return (
    <View style={styles.container}>
      <Navbar />
      <Image
        source={require("../assets/imgs/woman.jpg")}
        style={styles.backgroundImage}
        resizeMode="cover "
      />
      <View style={styles.menuContainer}>
        <Text> Text</Text>
      </View>
    </View>
  );
};

export default MeuComponente;
