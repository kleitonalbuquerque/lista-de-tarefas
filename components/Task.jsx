import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../constants/colors";

export default function Task({ text }) {
  return (
    <View style={style.rowContainer}>
      <Pressable>
        <Ionicons name="checkmark-circle" size={32} color={colors.primary} />
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
