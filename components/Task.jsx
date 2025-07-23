import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { colors } from "../constants/colors";

export default function Task({
  id,
  text,
  initialCompleted,
  onRemove,
  onToggle,
  onEdit,
}) {
  const [completed, setCompleted] = useState(initialCompleted);
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(text);

  useEffect(() => {
    setCompleted(initialCompleted);
  }, [initialCompleted]);

  useEffect(() => {
    setEditText(text);
  }, [text]);

  const handleSave = () => {
    if (editText.trim() !== "") {
      onEdit(id, editText);
      setEditing(false);
    }
  };

  return (
    <View style={style.rowContainer}>
      <Pressable
        onPress={() => {
          setCompleted(!completed);
          onToggle && onToggle();
        }}
      >
        <Ionicons
          name="checkmark-circle"
          size={32}
          color={completed ? colors.primary : "gray"}
        />
      </Pressable>
      {editing ? (
        <TextInput
          value={editText}
          onChangeText={setEditText}
          style={style.input}
          onSubmitEditing={handleSave}
          onBlur={handleSave}
          autoFocus
        />
      ) : (
        <Text
          style={[
            style.text,
            completed && { textDecorationLine: "line-through", color: "gray" },
          ]}
        >
          {text}
        </Text>
      )}
      <Pressable onPress={() => setEditing(true)}>
        <Ionicons name="pencil" size={24} color={colors.primary} />
      </Pressable>
      <Pressable onPress={onRemove}>
        <Ionicons name="trash" size={24} color="red" />
      </Pressable>
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
  input: {
    borderBottomWidth: 1,
    borderColor: colors.primary,
    minWidth: 100,
    fontSize: 16,
    padding: 2,
  },
  text: {
    fontSize: 16,
    flexShrink: 1,
  },
});
