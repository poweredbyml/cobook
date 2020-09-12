import React from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableHighlight,
  FlatList,
  Image,
} from "react-native";
import SketchView from "react-native-sketch-view";

const sketchViewConstants = SketchView.constants;

const tools = {};

tools[sketchViewConstants.toolType.pen.id] = {
  id: sketchViewConstants.toolType.pen.id,
  name: sketchViewConstants.toolType.pen.name,
  nextId: sketchViewConstants.toolType.eraser.id,
};
tools[sketchViewConstants.toolType.eraser.id] = {
  id: sketchViewConstants.toolType.eraser.id,
  name: sketchViewConstants.toolType.eraser.name,
  nextId: sketchViewConstants.toolType.pen.id,
};

export default class DoodleScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toolSelected: sketchViewConstants.toolType.pen.id,
      pages: [],
    };
  }

  isEraserToolSelected() {
    return this.state.toolSelected === sketchViewConstants.toolType.eraser.id;
  }

  toolChangeClick() {
    this.setState({ toolSelected: tools[this.state.toolSelected].nextId });
  }

  getToolName() {
    return tools[this.state.toolSelected].name;
  }

  onSketchSave(saveEvent) {
    saveEvent.text = this.state.text;
    saveEvent.key = this.state.pages.length + "";
    this.state.pages.push(saveEvent);
    this.setState({ text: null });
    this.refs.sketchRef.clearSketch();
    // this.props.onSave && this.props.onSave(saveEvent);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.scrollContainer}>
          <FlatList
            style={styles.previewCarousel}
            data={this.state.pages}
            renderItem={({ item }) => (
              <TouchableHighlight
                onPress={() => {
                  this.refs.sketchRef.loadSketch(
                    this.state.pages[item.key].localFilePath
                  );
                  this.setState({ text: item.text });
                }}
              >
                <Image
                  style={styles.thumb}
                  source={{ isStatic: true, uri: item.localFilePath }}
                />
              </TouchableHighlight>
            )}
            horizontal
          />
        </View>

        <SketchView
          style={styles.sketchView}
          ref="sketchRef"
          selectedTool={this.state.toolSelected}
          onSaveSketch={this.onSketchSave.bind(this)}
          localSourceImagePath={this.props.localSourceImagePath}
        />

        <TextInput
          placeholder="Enter text for this page."
          multiline={true}
          style={styles.textInput}
          onChangeText={(text) => this.setState({ text })}
          value={this.state.text}
        />

        <View style={{ flexDirection: "row", backgroundColor: "#EEE" }}>
          <TouchableHighlight
            underlayColor={"#CCC"}
            style={{ flex: 1, alignItems: "center", paddingVertical: 20 }}
            onPress={() => {
              this.refs.sketchRef.clearSketch();
            }}
          >
            <Text style={{ color: "#888", fontWeight: "600" }}>CLEAR</Text>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={"#CCC"}
            style={{
              flex: 1,
              alignItems: "center",
              paddingVertical: 20,
              borderLeftWidth: 1,
              borderRightWidth: 1,
              borderColor: "#DDD",
            }}
            onPress={() => {
              this.refs.sketchRef.saveSketch();
            }}
          >
            <Text style={{ color: "#888", fontWeight: "600" }}>SAVE</Text>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={"#CCC"}
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: this.isEraserToolSelected()
                ? "#CCC"
                : "rgba(0,0,0,0)",
            }}
            onPress={this.toolChangeClick.bind(this)}
          >
            <Text style={{ color: "#888", fontWeight: "600" }}>ERASER</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sketchView: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    marginTop: 40,
    flexDirection: "row",
    height: 50,
    borderColor: "#EEE",
    borderWidth: 1,
  },
  previewCarousel: {
    height: 50,
  },
  thumb: {
    height: 50,
    width: 50,
    borderColor: "#EEE",
    borderWidth: 1,
  },
  textInput: {
    borderColor: "#EEE",
    borderWidth: 1,
    paddingLeft: 10,
    height: 70,
  },
});
