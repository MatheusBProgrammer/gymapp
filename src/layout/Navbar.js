import { View, Text, Image } from "react-native";
import React from "react";
import styles from "./styles/NavbarStyles";

const Navbar = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.imageLogo}
        source={require("../assets/imgs/logo.jpg")}
      />
      <Text>Teste</Text>
    </View>
  );
};

export default Navbar;
