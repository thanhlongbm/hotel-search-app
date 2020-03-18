import Search from "../components/search";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Result from "../components/result";
import HouseInfo from "../components/houseInfo";

const screens = {
  Search: {
    screen: Search,
    navigationOptions: {
      title: "Property Finder"
    }
  },
  Result: {
    screen: Result,
    navigationOptions: {
      title: "Result"
    }
  },
  HouseInfo: {
    screen: HouseInfo,
    navigationOptions: {
      title: "House's Infomation"
    }
  }
};

const stack = createStackNavigator(screens);

export default createAppContainer(stack);
