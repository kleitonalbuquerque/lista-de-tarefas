import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Animated, Pressable, StyleSheet, Text, TextInput } from "react-native";
import {
  Directions,
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";
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
  const swipe = new Animated.Value(0);

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

  const flingGesture = Gesture.Fling()
    .direction(Directions.RIGHT)
    .onStart(() => {
      Animated.timing(swipe, {
        toValue: 200,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        onRemove && onRemove();
      });
    });

  return (
    <GestureDetector gesture={flingGesture}>
      <Animated.View
        style={[style.rowContainer, { transform: [{ translateX: swipe }] }]}
      >
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
              completed && {
                textDecorationLine: "line-through",
                color: "gray",
              },
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
      </Animated.View>
    </GestureDetector>
  );
}

const style = StyleSheet.create({
  rowContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
    padding: 10,
    elevation: 3, // Add shadow for Android
    shadowColor: "#000", // iOS shadow color
    shadowOpacity: 0.1, // iOS shadow opacity
    shadowOffset: { width: 0, height: 2 }, // iOS shadow offset
    backgroundColor: "white", // Background color for better visibility
  },
  input: {
    borderBottomWidth: 1,
    borderColor: colors.primary,
    minWidth: 100,
    fontSize: 16,
  },
  text: {
    fontSize: 16,
    flexShrink: 1,
  },
});
