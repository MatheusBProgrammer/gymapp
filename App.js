import { StyleSheet, Text, View } from "react-native";
import AuthScreen from "./src/screens/authsession/AuthScreen";
import { AuthProvider } from "./src/context/AuthContext";
import { useContext } from "react";
import Home from "./src/screens/Home";

export default function App() {
  return (
    <AuthProvider>
      <AuthScreen />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
