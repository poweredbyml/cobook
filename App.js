import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import {
  DefaultTheme,
  Provider as PaperProvider,
  Appbar,
  Share,
} from "react-native-paper";

import NotesScreen from "./components/Notes";
import DoodleScreen from "./components/DoodleScreen";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "tomato",
    accent: "yellow",
  },
};

const OnShare = async () => {
  try {
    const result = Share.share({
      message: "A Note was shared",
    });
  } catch (error) {
    alert(error.message);
  }
};

function App() {
  return (
    <Appbar style={styles.bottom}>
      <Appbar.Action
        icon="archive"
        onPress={() => console.log("Pressed archive")}
      />
      <Appbar.Action
        icon="mail"
        onPress={() => {
          console.log("Pressed mail");
          OnShare;
        }}
      />
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

// export default function Main() {
//   return (

//     <PaperProvider theme={theme}>
//       <App />
//     </PaperProvider>
//   );
// }

export default createAppContainer(
  createSwitchNavigator(
    {
      Doodle: DoodleScreen,
      Notes: NotesScreen,
    },
    {
      initialRouteName: "Doodle",
    }
  )
);

const styles = StyleSheet.create({
  bottom: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#fff",
  },
});
