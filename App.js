import React, { useState, useEffect } from "react";
import Home from "./components/Home";
import Todos from "./components/Todos";
import {
  StyleSheet,
  View,
  Alert,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import AddTodo from "./components/AddTodo";

export default function App() {
  const [todos, setTodos] = useState([
    { text: "buy coffee", key: "1" },
    { text: "create an app", key: "2" },
    { text: "play on the switch", key: "3" },
  ]);
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState("");

  useEffect(() => {
    const notes = AsyncStorage.getItem("notes");
    if (notes && notes.length > 0) {
      setNotes(JSON.parse(notes));
    }
  }, []);

  const pressHandler = (key) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo.key != key);
    });
  };

  const cloneNotes = () => {
    return [...notes];
  };

  const updateAsyncStorage = (notes) => {
    return new Promise(async (resolve, reject) => {
      try {
        await AsyncStorage.removeItem("notes");
        await AsyncStorage.setItem("notes", JSON.stringify(notes));
        return resolve(true);
      } catch (e) {
        return reject(e);
      }
    });
  };

  const submitHandler = async (text) => {
    if (text.length > 3) {
      // setTodos((prevTodos) => {
      //   return [{ text, key: Math.random().toString() }, ...prevTodos];
      // });
      try {
        const notes = cloneNotes();
        notes.push(note);
        await updateAsyncStorage(notes);
        setNotes(notes);
        setNote("");
        // this.setState({
        //   notes: notes,
        //   note: "",
        // });
      } catch (e) {
        // notes could not be updated
        alert(e);
      }
    } else {
      Alert.alert("OOPS", "Todo must be over 3 characters long", [
        { text: "Understood", onPress: () => console.log("alert closed") },
      ]);
    }
  };
  return (
    // <SandBox />
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.container}>
        <Home />
        <View style={styles.content}>
          <AddTodo submitHandler={submitHandler} />
          <View style={styles.list}>
            <FlatList
              data={notes}
              renderItem={({ item }) => (
                <Todos item={item} pressHandler={pressHandler} />
              )}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 40,
    flex: 1,
  },
  list: {
    flex: 1,
    marginTop: 20,
  },
});
