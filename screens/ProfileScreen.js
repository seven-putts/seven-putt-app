import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Firebase from "../firebase";
import { getPlayerData } from "../utilities";

const auth = Firebase.auth();
const pryColor = "#f47b04";
const firestore = Firebase.firestore();

const ProfileScreen = () => {
  const [userSg, setuserSg] = useState(null);
  const { user } = useSelector((state) => state.sevenPutt);
  const [MPgame, setMPgame] = useState(null);
  const [MPStats, setMPStats] = useState({
    numOfGames: 0,
    totalPutts: 0,
    MostPuttsInGame: 0,
    MostRoundsInGame: 0,
  });

  const handleLogout = () => {
    auth.signOut().catch((err) => Alert.alert(err.message));
  };

  useEffect(async () => {
    await firestore
      .collection("SingleGames")
      .doc(user.uid)
      .collection("SingleGames")
      .get()
      .then((data) => {
        setuserSg(data.docs.map((doc) => doc.data()));
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const fetchUserMpData = async () => {
      await firestore
        .collection("MultiPlayerGame")
        .get()
        .then((snapshot) => {
          setMPgame(snapshot.docs.map((doc) => doc.data()));
        });
    };

    fetchUserMpData();
  }, []);

  useEffect(() => {
    if (!MPgame) return;

    let usersGames = [];
    let OverallHighestRound = 0;
    let overallMostPutts = 0;
    let overallTotal = 0;

    MPgame.forEach((game) => {
      if (game.users.find((x) => x.userId === user.uid)) {
        usersGames.push(game);
      }
    });

    usersGames
      .filter((game) => game?.gameOver === true)
      .forEach((game) => {
        let currentUserGame = game.users.find(
          (x) => x.userId === user.uid
        )?.game;

        let HighestRound = 0;
        let Total = 0;

        const R1S1 = currentUserGame.round1["Section A"].filter(
          (attempt) => attempt === "success"
        ).length;

        const R1S2 = currentUserGame.round1["Section B"].filter(
          (attempt) => attempt === "success"
        ).length;

        const R1S3 = currentUserGame.round1["Section C"].filter(
          (attempt) => attempt === "success"
        ).length;

        const R1S4 = currentUserGame.round1["Section D"].filter(
          (attempt) => attempt === "success"
        ).length;

        const R2S1 = currentUserGame.round2["Section A"].filter(
          (attempt) => attempt === "success"
        ).length;

        const R2S2 = currentUserGame.round2["Section B"].filter(
          (attempt) => attempt === "success"
        ).length;

        const R2S3 = currentUserGame.round2["Section C"].filter(
          (attempt) => attempt === "success"
        ).length;

        const R2S4 = currentUserGame.round2["Section D"].filter(
          (attempt) => attempt === "success"
        ).length;

        const R3S1 = currentUserGame.round3["Section A"].filter(
          (attempt) => attempt === "success"
        ).length;

        const R3S2 = currentUserGame.round3["Section B"].filter(
          (attempt) => attempt === "success"
        ).length;

        const R3S3 = currentUserGame.round3["Section C"].filter(
          (attempt) => attempt === "success"
        ).length;

        const R3S4 = currentUserGame.round3["Section A"].filter(
          (attempt) => attempt === "success"
        ).length;

        const round1Get = R1S1 + R1S2 + R1S3 + R1S4;

        const round2Get = R2S1 + R2S2 + R2S3 + R2S4;

        const round3Get = R3S1 + R3S2 + R3S3 + R3S4;

        const roundScores = [round1Get, round2Get, round3Get];

        roundScores.forEach((val) => {
          if (val >= HighestRound) {
            HighestRound = val;
          }
        });

        Total = round1Get + round2Get + round3Get;

        if (Total >= overallMostPutts) {
          overallMostPutts = Total;
        }

        overallTotal += Total;

        if (HighestRound >= OverallHighestRound) {
          OverallHighestRound = HighestRound;
        }
      });

    setMPStats({
      MostPuttsInGame: overallMostPutts,
      MostRoundsInGame: OverallHighestRound,
      totalPutts: overallTotal,
      numOfGames: usersGames.length,
    });
  }, [MPgame]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.userInfo}>
        <View>
          <Text style={{ fontSize: 20, fontWeight: "500" }}>
            {user?.fullName}
          </Text>
          <Text style={{ fontSize: 16, color: "darkslategray" }}>
            {user?.email}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => handleLogout()}
          style={styles.logoutBtn}
        >
          <Text style={styles.btnText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.userRecord}>
        <Text style={{ color: "lightgreen", marginBottom: 20 }}>
          Single Player Records
        </Text>
        <Text style={styles.userRecordText}>
          Total Games Played:{" "}
          <Text style={styles.recordVal}>
            {userSg && getPlayerData(userSg).length}
          </Text>
        </Text>
        <Text style={styles.userRecordText}>
          Overall Putts:{" "}
          <Text style={styles.recordVal}>
            {userSg && getPlayerData(userSg).putts}
          </Text>
        </Text>
        <Text style={styles.userRecordText}>
          Most Putts In A Game:{" "}
          <Text style={styles.recordVal}>
            {userSg && getPlayerData(userSg).highestGamePutt}
          </Text>
        </Text>
        <Text style={styles.userRecordText}>
          Most Putts In A Round:{" "}
          <Text style={styles.recordVal}>
            {userSg && getPlayerData(userSg).highestRound}
          </Text>
        </Text>
      </View>

      <View style={[styles.userRecord, { backgroundColor: pryColor }]}>
        <Text style={{ color: "yellow", marginBottom: 20 }}>
          Multiplayer Player Records
        </Text>
        <Text style={styles.userRecordText}>
          Total Games Played:{" "}
          <Text style={[styles.recordVal, { color: "yellow" }]}>
            {MPStats.numOfGames}
          </Text>
        </Text>
        <Text style={styles.userRecordText}>
          Overall Putts:{" "}
          <Text style={[styles.recordVal, { color: "yellow" }]}>
            {MPStats.totalPutts}
          </Text>
        </Text>
        {/* <Text style={styles.userRecordText}>
          Most Wins:{" "}
          <Text style={[styles.recordVal, { color: "yellow" }]}>20</Text>
        </Text> */}
        <Text style={styles.userRecordText}>
          Most Putts In A Game:{" "}
          <Text style={[styles.recordVal, { color: "yellow" }]}>
            {MPStats.MostPuttsInGame}
          </Text>
        </Text>
        <Text style={styles.userRecordText}>
          Most Putts In A Round:{" "}
          <Text style={[styles.recordVal, { color: "yellow" }]}>
            {MPStats.MostRoundsInGame}
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 10,
  },

  userInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  logoutBtn: {
    width: 100,
    backgroundColor: "red",
    shadowColor: "slategray",
    shadowOffset: { width: -3, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    borderRadius: 10,
    justifyContent: "center",
  },

  btnText: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },

  PlanContainer: {
    marginTop: 40,
    backgroundColor: "#d9e0fd",
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 30,
    borderRadius: 10,
    flexDirection: "row",
  },

  userRecord: {
    backgroundColor: "#5030e6",
    borderRadius: 10,
    padding: 15,
    marginTop: 30,
  },

  userRecordText: {
    fontSize: 18,
    marginBottom: 10,
    color: "white",
  },

  recordVal: {
    color: "lightgreen",
  },
});
