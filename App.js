import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import {
  DefaultTheme,
  Provider as PaperProvider,
  Appbar,
} from "react-native-paper";

import NotesScreen from "./components/Notes";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "tomato",
    accent: "yellow",
  },
};

function App() {
  return (
    <Appbar style={styles.bottom}>
      <Appbar.Action
        icon="archive"
        onPress={() => console.log("Pressed archive")}
      />
      <Appbar.Action icon="mail" onPress={() => console.log("Pressed mail")} />
      <Appbar.Action
        icon="label"
        onPress={() => console.log("Pressed label")}
      />
      <Appbar.Action
        icon="delete"
        onPress={() => console.log("Pressed delete")}
      />
    </Appbar>
  );
}

export default function Main() {
  return (
    <PaperProvider theme={theme}>
      <App />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  bottom: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#fff",
  },
});
