import React from "react";
import { StyleSheet, View, Text } from "react-native";
const SandBox = () => {
  return (
    <View>
      <Text style={styles.text}>Sandbox</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
  },
});

export default SandBox;
