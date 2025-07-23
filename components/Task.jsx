import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../constants/colors";

export default function Task({ text, initialCompleted }) {
  const [completed, setCompleted] = useState(initialCompleted);

  return (
    <View style={style.rowContainer}>
      <Pressable onPress={() => setCompleted(!completed)}>
        <Ionicons
          name="checkmark-circle"
          size={32}
          color={completed ? colors.primary : "gray"}
        />
      </Pressable>
      <Text>{text}</Text>
    </View>
  );
}

const style = StyleSheet.create({
  rowContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
});
