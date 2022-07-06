import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import PlayersInGame from "../components/PlayersInGame";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "react-native-elements";
import Firebase from "../firebase";
import { goHome, toggleGame, toggleLobby } from "../reduxslice/sevenputtSlice";
import * as Clipboard from "expo-clipboard";
import LoadingScreen from "../components/LoadingScreen";

const pryColor = "#f47b04";
const firestore = Firebase.firestore();

const MPLobby = () => {
  const { multiplayerOptions, user } = useSelector((state) => state.sevenPutt);
  const dispatch = useDispatch();

  const [users, setusers] = useState(null);
  const [text, settext] = useState("Copy");
  const [leave, setLeave] = useState(false);

  const copyToClipboard = async (key) => {
    settext("Copied!");
    await Clipboard.setString(key);

    await setTimeout(() => {
      settext("Copy");
    }, 2000);
  };

  const leaveGame = async () => {
    if (!multiplayerOptions.users.find((x) => x.userId === user.uid)) return;

    if (multiplayerOptions.users.find((x) => x.userId === user.uid)?.isHost) {
      await firestore
        .collection("MultiPlayerGame")
        .doc(multiplayerOptions?.id)
        .delete()
        .then(() => {
          return dispatch(toggleLobby(undefined));
        });
    } else {
      firestore
        .collection("MultiPlayerGame")
        .doc(multiplayerOptions?.id)
        .get()
        .then(async (snapshot) => {
          let users = snapshot.data().users;
          let substractedUser = users.filter((x) => x.userId !== user.uid);

          await firestore
            .collection("MultiPlayerGame")
            .doc(multiplayerOptions.id)
            .set({ users: substractedUser }, { merge: true })
            .then(() => {
              setLeave(true);
              return dispatch(toggleLobby(undefined));
            });
        });
    }
  };

  useEffect(async () => {
    let mount = true;

    await firestore
      .collection("MultiPlayerGame")
      .doc(multiplayerOptions?.id)
      .onSnapshot((snapshot) => {
        if (mount) {
          if (!leave) {
            dispatch(toggleLobby({ ...snapshot.data() }));
          } else {
            dispatch(toggleLobby(undefined));
          }
        }
      });

    await firestore
      .collection("users")
      .get()
      .then((snapshot) => {
        if (mount) {
          setusers(snapshot.docs.map((user) => user.data()));
        }
      });

    return () => {
      mount = false;
    };
  }, []);

  const StartGame = async () => {
    const userIsHost = multiplayerOptions?.users.find(
      (x) => x.userId === user.uid
    ).isHost;

    if (userIsHost) {
      await firestore
        .collection("MultiPlayerGame")
        .doc(multiplayerOptions.id)
        .update({
          isOpen: false,
        });
    }
    dispatch(toggleGame("MP"));
  };

  if (!multiplayerOptions.users) return <LoadingScreen />;

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity onPress={() => dispatch(goHome())}>
          <Icon name="home" type="material" color="white" size={30} />
        </TouchableOpacity>

        <Text style={styles.gameInfo}>
          Game Id:{" "}
          <Text style={{ color: pryColor }}>{multiplayerOptions?.id}</Text>
        </Text>

        <TouchableOpacity onPress={() => leaveGame()} style={styles.leaveBtn}>
          <Text style={{ color: "white" }}>Leave</Text>
          <Icon name="logout" type="material" color="white" />
        </TouchableOpacity>
      </View>

      <Text style={{ fontSize: 18, color: "lavender", marginVertical: 10 }}>
        Players -{" "}
        <Text style={{ color: "lightgreen" }}>
          {multiplayerOptions?.users.length}/{multiplayerOptions?.maxPlayers}
        </Text>
      </Text>

      {multiplayerOptions?.type !== "public" && (
        <View style={styles.keyContainer}>
          <Text
            style={{ color: "lightgray", fontSize: 20, marginVertical: 10 }}
          >
            Key:{" "}
            <Text style={{ color: "white", fontWeight: "600" }}>
              {multiplayerOptions?.key}
            </Text>
          </Text>

          <TouchableOpacity
            onPress={() => copyToClipboard(multiplayerOptions?.key)}
            style={styles.copyBtn}
          >
            <Icon name="content-copy" type="material" color="white" />
            <Text style={{ color: "white", fontSize: 18 }}>{text}</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={{ marginTop: 20 }}>
        <Text style={{ color: pryColor, marginBottom: 10, fontSize: 16 }}>
          Players in game
        </Text>
        {multiplayerOptions?.users.map((player) => (
          <PlayersInGame
            player={player}
            key={player.userId}
            name={users?.find((user) => user.uid === player.userId)?.fullName}
          />
        ))}
      </View>

      {multiplayerOptions?.users?.length > 1 ? (
        <View
          style={{ width: "100%", alignItems: "center", marginTop: "auto" }}
        >
          {multiplayerOptions?.users.find((x) => x.userId === user.uid)
            .isHost ? (
            <TouchableOpacity
              onPress={() => StartGame()}
              style={styles.startGameBtn}
            >
              <Text style={{ textAlign: "center", fontSize: 20 }}>
                Start Game
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => StartGame()}
              style={styles.startGameBtn}
            >
              <Text style={{ textAlign: "center", fontSize: 20 }}>
                Continue
              </Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <Text style={styles.waitingText}>{"Waiting for players"}</Text>
      )}
    </View>
  );
};

export default MPLobby;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5030e6",
    paddingTop: 40,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },

  gameInfo: {
    color: "white",
    fontSize: 15,
    flex: 1,
    marginLeft: 15,
  },

  leaveBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "red",
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 10,
  },

  copyBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 30,
  },

  keyContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  startGameBtn: {
    width: "80%",
    paddingVertical: 10,
    backgroundColor: "white",
    borderRadius: 12,
  },

  waitingText: {
    fontSize: 20,
    color: "yellow",
    textAlign: "center",
    marginTop: "auto",
  },
});
