import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { changeMode } from "../reduxslice/sevenputtSlice";
import { useSelector } from "react-redux";

const GameCard = ({
  name,
  iconName,
  bgColor,
  summary,
  textColor,
  dispatch,
}) => {
  const navigation = useNavigation();
  const { multiplayerOptions } = useSelector((state) => state.sevenPutt);

  const HandleSingleMode = () => {
    navigation.navigate("SelectCompany");
  };

  const HandleMMultiplayerMode = () => {
    dispatch(changeMode("Multiplayer"));
    navigation.navigate("SelectCompany");
  };

  return (
    <TouchableOpacity
      onPress={() =>
        name === "Multi player" ? HandleMMultiplayerMode() : HandleSingleMode()
      }
      style={[styles.container, { backgroundColor: bgColor }]}
    >
      <Text style={[styles.title, { color: textColor }]}>{name}</Text>
      <Icon name={iconName} type="material" color={textColor} />
      <Text style={styles.summary}>{summary}</Text>
    </TouchableOpacity>
  );
};

export default GameCard;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    height: 140,
    width: "45%",
    padding: 10,
    borderRadius: 15,
    justifyContent: "center",
    shadowColor: "gray",
    shadowOffset: { width: -3, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    position: "relative",
  },

  summary: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 13,
    color: "slategray",
  },

  inGameBar: {
    marginTop: -10,
    top: 0,
  },
});
