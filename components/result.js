import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { FlatList, TouchableHighlight } from "react-native-gesture-handler";
const Result = ({ navigation }) => {
  const data = navigation.getParam("data");

  const onNavigate = houseInfo => {
    navigation.navigate("HouseInfo", houseInfo);
    // console.log(houseInfo);
  };

  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={item => {
        const info = item.item;
        return (
          <TouchableHighlight
            underlayColor="#dddddd"
            onPress={() => onNavigate(info)}
          >
            <View style={styles.itemContainer}>
              <Image source={{ uri: info.img_url }} style={styles.image} />
              <View style={styles.textArea}>
                <Text style={styles.price}>{info.price_formatted}</Text>
                <Text style={styles.title}>{info.title}</Text>
              </View>
            </View>
          </TouchableHighlight>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 15
  },
  image: {
    width: 80,
    height: 80
  },
  textArea: {
    flex: 1,
    paddingLeft: 10
  },
  title: {
    color: "#444"
  },
  price: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#48BBEC"
  }
});

export default Result;
