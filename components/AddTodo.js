import React, { useState } from "react";
import { StyleSheet, View, TextInput, Button } from "react-native";

const AddTodo = ({ submitHandler }) => {
  const [text, setText] = useState("");
  const changeHandler = (val) => {
    setText(val);
  };
  const submitHandle = (text) => {
    setText("");
    submitHandler(text);
  };
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Add todos"
        value={text}
        onChangeText={changeHandler}
      />
      <Button
        title="add todos"
        color="coral"
        onPress={() => submitHandle(text)}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
});
export default AddTodo;
