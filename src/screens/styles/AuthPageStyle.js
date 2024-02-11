import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
  container: {
    textAlign: "center",
    flexDirection: "column",
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-around",
  },
  contentTitle: {},
  title: { fontSize: 60, textAlign: "center", padding: 10 },
  loginArea: {
    height: "10%",
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
  },
  registerArea: {
    //marginTop: 200,
    //marginBottom: 100,
  },

  formularioNome: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    fontWeight: "bold",
    width: "70%",
    margin: 5,
    textAlign: "center",
    padding: 5,
  },
  formularioSenha: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    fontWeight: "bold",
    width: "70%",
    margin: 5,
    textAlign: "center",
    padding: 5,
  },
  button: {
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 5,
    backgroundColor: "transparent",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  signup: {
    textDecorationLine: "underline",
    fontSize: 18,
  },
});
