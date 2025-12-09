import { Pressable, StyleSheet, Text } from "react-native";

export default function Button({ addTask }) {
  return (
    <Pressable style={style.button} onPress={addTask}>
      <Text style={style.buttonText}>+</Text>
    </Pressable>
  );
}

const style = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "yellow",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 20,
  },
});
