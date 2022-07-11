import { Alert, StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Firebase from "../firebase";
import { toggleLobby } from "../reduxslice/sevenputtSlice";

const pryColor = "#f47b04";
const firestore = Firebase.firestore();

const AvGame = ({ game }) => {
  const { user, currentGame } = useSelector((state) => state.sevenPutt);
  const dispatch = useDispatch();

  const enterGame = () => {
    firestore
      .collection("MultiPlayerGame")
      .doc(game.id)
      .get()
      .then((snapshot) => {
        let users = snapshot.data().users;
        let currentUser = users.find((x) => x.userId === user.uid);

        if (currentUser) return dispatch(toggleLobby({ ...snapshot.data() }));

        if (snapshot.data().users.length >= snapshot.data().maxPlayers)
          return Alert.alert("Room already full");

        firestore
          .collection("MultiPlayerGame")
          .doc(game.id)
          .set(
            {
              users: [
                ...users,
                { ...currentGame.equipments, userId: user.uid },
              ],
            },
            { merge: true }
          );

        dispatch(toggleLobby({ ...snapshot.data() }));

        firestore.collection("users").doc(user.uid).update({
          currentGame: snapshot.data(),
        });
      });
  };

  return (
    <TouchableOpacity onPress={() => enterGame()} style={styles.container}>
      <Text style={{ flex: 1, fontSize: 14, color: "lavender" }}>
        Game Id: <Text style={styles.Val}>{game?.id}</Text>
      </Text>
      <Text style={{ fontSize: 16, color: "lavender" }}>
        players:{" "}
        <Text style={styles.Val}>
          {game?.users.length}/{game?.maxPlayers}
        </Text>
      </Text>
    </TouchableOpacity>
  );
};

export default AvGame;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: pryColor,
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
    shadowColor: "slategray",
    shadowOffset: { width: -3, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
  },

  Val: {
    color: "yellow",
  },
});
