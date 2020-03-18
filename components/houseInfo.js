import React from "react";
import { View, Image } from "react-native";

const HouseInfo = ({ navigation }) => {
  return (
    <View>
      <Image source={{ uri: navigation.getParam("img_url") }} style = {{width : navigation.getParam("img_width") , height : navigation.getParam("img_height") }}/>
    </View>
  );
};

export default HouseInfo;
