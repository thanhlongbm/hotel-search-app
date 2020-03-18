import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Keyboard,
  Button,
  ActivityIndicator
} from "react-native";
import {
  TextInput,
  TouchableWithoutFeedback
} from "react-native-gesture-handler";

function urlForQueryAndPage(key, value, pageNumber) {
  const data = {
    country: "uk",
    pretty: "1",
    encoding: "json",
    listing_type: "buy",
    action: "search_listings",
    page: pageNumber
  };
  data[key] = value;

  const querystring = Object.keys(data)
    .map(key => key + "=" + encodeURIComponent(data[key]))
    .join("&");

  return "https://api.nestoria.co.uk/api?" + querystring;
}

const Search = ({ navigation }) => {
  const [place, setPlace] = useState("");
  const [loadStatus, setLoading] = useState({ isLoading: false, error: "" });

  const executeQuery = query => {
    setLoading({ ...loadStatus, isLoading: true });
    fetch(query)
      .then(response => response.json())
      .then(json => {
        response = json.response;
        setLoading({ isLoading: false, error: "" });
        if (response.application_response_code.substr(0, 1) === "1") {
          onNavigate(response.listings);
        } else
          setLoading({
            ...loadStatus,
            error: "Location not recognized; please try again."
          });
      })
      .catch(error =>
        setLoading({
          isLoading: false,
          error: "Something bad happened " + error
        })
      );
  };

  const onNavigate = data => {
    navigation.navigate("Result", { data: data });
  };

  const findData = () => {
    Keyboard.dismiss();
    const query = urlForQueryAndPage("place_name", place, 1);
    executeQuery(query);
  };

  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      style={styles.container}
    >
      <Text style={styles.description}>Search for house to buy</Text>
      <Text style={styles.description}>Search by place-name or postcode</Text>
      <View style={styles.inputArea}>
        <TextInput
          underlineColorAndroid={"transparent"}
          style={styles.inputBox}
          placeholder="Search via name or postcode"
          onChange={value => setPlace(value.nativeEvent.text)}
          value={place}
        />
        <Button onPress={findData} color="#48BBEC" title="Find" />
      </View>
      {loadStatus.isLoading ? (
        <ActivityIndicator size="large" style={{ marginVertical: 20 }} />
      ) : null}
      <Text style={styles.error}>{loadStatus.error}</Text>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  description: {
    fontSize: 18,
    textAlign: "center",
    color: "#656565",
    marginTop: 30
  },
  container: {
    padding: 20,
    alignItems: "center",
    height: "100%"
  },
  inputArea: {
    flexDirection: "row",
    marginTop: 30
  },
  inputBox: {
    borderWidth: 1,
    borderRadius: 3,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderColor: "#8bf",
    marginRight: 10
  },
  error: {
    marginVertical: 10,
    color: "red"
  }
});

export default Search;
