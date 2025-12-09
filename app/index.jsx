import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import logo from "../assets/images/abacate.png";
import Button from "../components/Button";
import Task from "../components/Task";
import { colors } from "../constants/colors";

// const initialTasks = [
//   { id: 1, completed: true, text: "Fazer café" },
//   { id: 2, completed: false, text: "Estudar React Native" },
//   { id: 3, completed: false, text: "Academia" },
// ];

export default function Index() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const getTasksAsyncStorage = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("tasks");
        if (jsonValue !== null) {
          setTasks(JSON.parse(jsonValue));
        }
      } catch (e) {
        console.log(e);
      }
    };
    getTasksAsyncStorage();
  }, []);

  useEffect(() => {
    const setTasksAsyncStorage = async () => {
      try {
        const jsonValue = JSON.stringify(tasks);
        await AsyncStorage.setItem("tasks", jsonValue);
      } catch (e) {
        console.log(e);
      }
    };
    setTasksAsyncStorage();
  }, [tasks]);

  const addTask = () => {
    if (text.trim() === "") return;
    const newTask = { id: Date.now(), completed: false, text };
    setTasks((prev) => [...prev, newTask]);
    setText("");
  };

  const removeTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const editTask = (id, newText) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, text: newText } : task))
    );
  };

  // Sem draggable no momento

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={style.mainContainer}>
        <View style={style.rowContainer}>
          <Image source={logo} style={style.image} />
          <Text style={style.title}>Minhas Tarefas</Text>
        </View>

        <View style={style.rowContainer}>
          <TextInput
            value={text}
            onChangeText={setText}
            style={style.input}
            placeholder="Digite uma tarefa"
            keyboardType="default"
            returnKeyType="done"
            onSubmitEditing={addTask}
          />
          <Button addTask={addTask} />
        </View>

        <FlatList
          style={style.list}
          data={tasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Task
              id={item.id}
              text={item.text}
              initialCompleted={item.completed}
              onRemove={() => removeTask(item.id)}
              onToggle={() => toggleTask(item.id)}
              onEdit={editTask}
            />
          )}
        />

        {Platform.OS === "android" && (
          <Text>Total de tarefas no Android: {tasks.length}</Text>
        )}
        {Platform.OS === "ios" && (
          <Text>Total de tarefas no iOS: {tasks.length}</Text>
        )}
        {Platform.OS === "web" && (
          <Text>Total de tarefas na Web: {tasks.length}</Text>
        )}
      </View>
    </SafeAreaView>
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
  mainContainer: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  rowContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginBottom: 20,
  },
  list: {
    flex: 1,
  },
});
