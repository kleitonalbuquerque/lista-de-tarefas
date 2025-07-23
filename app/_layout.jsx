import React from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import logo from "../assets/images/abacate.png";
import Task from "../components/Task";
import { colors } from "../constants/colors";

export default function RootLayout() {
  const tasks = [
    { id: 1, completed: true, text: "Fazer café" },
    { id: 2, completed: false, text: "Estudar React Native" },
    { id: 3, completed: false, text: "Academia" },
  ];

  return (
    <View style={style.mainContainer}>
      <View style={style.rowContainer}>
        <Image source={logo} style={style.image} />
        <Text style={style.title}>Minhas Tarefas</Text>
      </View>

      <View style={style.rowContainer}>
        <TextInput style={style.input} placeholder="Digite uma tarefa" />
        <Pressable
          style={({ pressed }) => [
            style.button,
            { backgroundColor: pressed ? colors.primary : colors.secondary },
          ]}
          onPress={() => alert("Oi")}
        >
          <Text style={style.buttonText}>+</Text>
        </Pressable>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Task text={item.text} />}
      />
    </View>
  );
}

const style = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  title: {
    fontSize: 30,
    fontFamily: "Calibri",
    fontWeight: "600",
    color: colors.primary,
  },
  input: {
    height: 40,
    paddingHorizontal: 16,
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 20,
    flexGrow: 1,
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
  mainContainer: {
    marginTop: 60,
    marginLeft: 20,
    marginRight: 20,
  },
  rowContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginBottom: 20,
  },
});
