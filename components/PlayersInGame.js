import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Firebase from "../firebase";

const firestore = Firebase.firestore();

const PlayersInGame = ({ player, name }) => {
  return (
    <View style={styles.container}>
      <Text
        style={[styles.playerStat, { flex: 1, fontSize: 18, color: "#5030e6" }]}
      >
        {name}
      </Text>
    </View>
  );
};

export default PlayersInGame;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 20,
    backgroundColor: "lightgreen",
    flexDirection: "row",
    borderRadius: 10,
    marginBottom: 20,
  },

  playerStat: {},
});
