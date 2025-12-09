import { Pressable, StyleSheet, Text } from "react-native";
import { colors } from "../constants/colors";

export default function Button(addTask) {
  return (
    <Pressable style={style.button}>
      <Text style={style.buttonText}>+</Text>
    </Pressable>
  );
}

const style = StyleSheet.create({
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
});
