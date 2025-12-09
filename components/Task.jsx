import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
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
    const trimmed = editText.trim();
    if (trimmed === "") {
      // Se vazio, sai da edição sem alterar
      setEditText(text);
      setEditing(false);
      return;
    }
    onEdit && onEdit(id, trimmed);
    setEditing(false);
  };

  const flingGesture = Gesture.Fling()
    .direction(Directions.RIGHT)
    .onEnd(() => {
      Animated.timing(swipe, {
        toValue: 200,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        onRemove && onRemove();
        swipe.setValue(0);
      });
    });

  return (
    <GestureDetector gesture={flingGesture}>
      <Animated.View
        style={[style.rowContainer, { transform: [{ translateX: swipe }] }]}
      >
        <Pressable
          disabled={editing}
          onPress={() => {
            if (editing) return;
            const next = !completed;
            setCompleted(next);
            onToggle && onToggle();
            Haptics.selectionAsync();
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
          <Pressable onPress={() => setEditing(true)} style={{ flex: 1 }}>
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
          </Pressable>
        )}
        <Pressable onPress={() => setEditing(true)}>
          <Ionicons name="pencil" size={24} color={colors.primary} />
        </Pressable>
        <Pressable
          onPress={() => {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            onRemove && onRemove();
          }}
        >
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
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
  text: {
    fontSize: 16,
    flexShrink: 1,
  },
});
