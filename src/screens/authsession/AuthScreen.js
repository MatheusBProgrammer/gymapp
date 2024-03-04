import React, { useContext, useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import styles from "./styles/AuthPageStyle";
import { AuthContext } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

function AuthScreen() {
  //contexto para saber se o usuário está logado
  const { user, setUser } = useContext(AuthContext);
  const navigation = useNavigation(); // Usando o hook useNavigation
  useEffect(() => {
    if (user) {
      navigation.navigate("Home");
    }
  }, [user, navigation]);

  const [showRegisterPage, setShowRegisterPage] = useState(false);

  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (key, value) => {
    setData((prevData) => ({ ...prevData, [key]: value }));
  };

  const onSubmit = async () => {
    if (showRegisterPage) {
      await fetch("http://10.0.2.2:3333/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((data) => data.json())
        .then((data) => {
          alert(String(data.message));
        })

        .catch((error) => {
          console.error("Erro na requisição:", error);
          alert("Erro na requisição: " + error.message);
        });

      // siginup logic
    } else {
      try {
        const response = await fetch("http://10.0.2.2:3333/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: data.email, password: data.password }),
        })
          .then((response) => {
            const status = response.status;
            return response.json().then((response) => {
              alert(response.message);
              if (status === 200) {
                setUser(data);
              }
            });
          })

          .catch((error) => alert(`Erro: ${error}`));
      } catch (e) {}
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.spaceTop}></View>
      <View style={styles.contentTitle}>
        <Text style={styles.title}>Gym App</Text>
      </View>
      <View style={styles.loginArea}>
        <TextInput
          style={styles.formularioNome}
          placeholder="Digite o seu email"
          value={data.name}
          onChangeText={(value) => handleChange("email", value)}
        />
        <TextInput
          style={styles.formularioSenha}
          placeholder="Digite a sua senha"
          value={data.password}
          secureTextEntry={true}
          onChangeText={(value) => handleChange("password", value)}
        />
        <TouchableOpacity onPress={onSubmit} style={styles.button}>
          <Text style={styles.buttonText}>
            {showRegisterPage ? "Registrar" : "Entrar na conta"}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.registerArea}>
        <TouchableOpacity
          onPress={() => setShowRegisterPage(!showRegisterPage)}
          style={styles.button}
        >
          <Text style={styles.signup}>
            {showRegisterPage
              ? "Já possui conta? Entrar"
              : "Não possui conta? Criar conta"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default AuthScreen;
