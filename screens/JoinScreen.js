import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import AvGame from "../components/AvGame";
import Firebase from "../firebase";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { toggleLobby } from "../reduxslice/sevenputtSlice";

const pryColor = "#f47b04";
const firestore = Firebase.firestore();

const JoinScreen = () => {
  const [gameKey, setgameKey] = useState("");
  const [publicGames, setpublicGames] = useState([]);
  const [refresh, setrefresh] = useState(true);
  const [loading, setloading] = useState(false);
  const [privateGameError, setprivateGameError] = useState(null);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { user, currentGame } = useSelector((state) => state.sevenPutt);

  useEffect(() => {
    setloading(true);

    firestore.collection("MultiPlayerGame").onSnapshot((snapshot) => {
      setpublicGames(snapshot.docs.map((doc) => doc.data()));
    });

    return setloading(false);
  }, [refresh]);

  const joinPrivateGame = async () => {
    setprivateGameError(null);

    if (!publicGames.length) return;

    const privateGames = publicGames.filter((game) => game.type === "private");

    if (privateGames.length === 0)
      return setprivateGameError("game does not exist");

    const foundGame = privateGames.find(
      (game) => game.key.toUpperCase() === gameKey.toUpperCase()
    );

    if (!foundGame) return setprivateGameError("game does not exist");

    if (foundGame.users.length >= foundGame.maxPlayers)
      return setprivateGameError("Game is already full");

    if (
      !foundGame.isOpen &&
      !foundGame.users.find((x) => x.userId === user.uid)
    )
      return setprivateGameError("The game has already begun");

    if (foundGame.users.find((x) => x.userId === user.uid))
      return dispatch(toggleLobby({ ...foundGame }));

    await firestore
      .collection("MultiPlayerGame")
      .doc(foundGame.id)
      .update({
        users: [
          ...foundGame.users,
          {
            userId: user?.uid,
            equipments: { ...currentGame.equipments },
            isHost: false,
          },
        ],
      })
      .then(() => dispatch(toggleLobby({ ...foundGame })));
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={{ color: pryColor, fontSize: 28 }}>Join A Game</Text>

      <View style={{ width: "100%", marginVertical: 20, flex: 0.8 }}>
        <View style={styles.publicGames}>
          <Text style={styles.gameTypeText}>Public Games</Text>

          <TouchableOpacity onPress={() => setrefresh(!refresh)}>
            <Icon type="material" name="refresh" size={30} color={pryColor} />
          </TouchableOpacity>
        </View>

        <ScrollView style={{ flex: 1, paddingTop: 10 }}>
          {!loading ? (
            publicGames
              .filter((game) => game.type === "public" && game.isOpen)
              .map((game) => <AvGame game={game} key={game.id} />)
          ) : (
            <ActivityIndicator size="large" color={pryColor} />
          )}

          {publicGames.filter((game) => game.type === "public" && game.isOpen)
            .length < 1 && (
            <Text style={{ textAlign: "center", fontSize: 20, color: "gray" }}>
              No games available
            </Text>
          )}
        </ScrollView>
      </View>

      <View style={{ width: "100%" }}>
        <Text style={styles.gameTypeText}>Private Game</Text>
        <Text style={{ color: "grey", fontSize: 14 }}>
          Join a private game by entering the game key
        </Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setgameKey(text)}
            placeholder="Game key"
          />

          <TouchableOpacity
            onPress={() => joinPrivateGame()}
            style={{
              backgroundColor: pryColor,
              padding: 12,
              borderTopRightRadius: 10,
              borderBottomRightRadius: 10,
            }}
          >
            <Text>Join Game</Text>
          </TouchableOpacity>
        </View>

        <Text>{privateGameError}</Text>
      </View>
    </KeyboardAvoidingView>
  );
};

export default JoinScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f9efcf",
    paddingHorizontal: 10,
    paddingTop: 40,
    paddingBottom: 30,
  },

  gameTypeText: {
    fontSize: 18,
    color: "#5030e6",
  },

  input: {
    flex: 1,
    borderWidth: 2,
    borderColor: pryColor,
    padding: 10,
    fontSize: 16,
    backgroundColor: "white",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },

  inputContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  publicGames: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
});
