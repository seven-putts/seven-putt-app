import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Icon } from "react-native-elements";

const UserRank = ({ name = "", value = 0 }) => {
  return (
    <View style={styles.container}>
      <Icon name="person-outline" size={30} color="yellow" type="material" />
      <Text style={styles.name}>{name !== "" ? name : "-------------"}</Text>
      <Text style={styles.price}>{value !== 0 ? value : "-----"}</Text>
    </View>
  );
};

export default UserRank;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    paddingVertical: 8,
    alignSelf: "center",
  },
  name: {
    color: "yellow",
    fontSize: 18,
    flex: 1,
    marginLeft: 10,
  },

  price: {
    fontSize: 20,
    color: "lightgreen",
  },
});
