import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Icon } from "react-native-elements";
import SportLogo from "../Svgs/SportLogo";
import GameCard from "../components/GameCard";
import {
  useFonts,
  Piazzolla_800ExtraBold,
  Piazzolla_600SemiBold,
} from "@expo-google-fonts/piazzolla";
import AppLoading from "expo-app-loading";
import { useDispatch, useSelector } from "react-redux";
import { useLayoutEffect } from "react";
import UserRank from "../components/UserRank";
import Firebase from "../firebase";

const firestore = Firebase.firestore();

const HomeScreen = () => {
  const [fontsLoaded] = useFonts({
    Piazzolla_800ExtraBold,
    Piazzolla_600SemiBold,
  });

  const { user } = useSelector((state) => state.sevenPutt);
  const [mpGames, setmpGames] = useState([]);
  const [MostPuttsInGameRank, setMostPuttsInGameRank] = useState([]);
  const [MostMissInGameRank, setMostMissInGameRank] = useState([]);
  const [overallTotal, setoverallTotal] = useState([]);
  const [users, setusers] = useState([]);

  const dispatch = useDispatch();

  useEffect(async () => {
    const getRank = async () => {
      await firestore
        .collection("MultiPlayerGame")
        .get()
        .then((snapshot) => {
          setmpGames(snapshot.docs.map((doc) => doc.data()));
        });
    };

    await firestore
      .collection("users")
      .get()
      .then((snapshot) => {
        setusers(snapshot.docs.map((doc) => doc.data()));
      });

    getRank();
  }, []);

  useEffect(() => {
    const fetchResults = () => {
      let results = [];

      mpGames.forEach((game) => {
        if (game.results) {
          results = [...results, ...game.results];
        }
      });

      setMostPuttsInGameRank(results.sort((a, b) => b.Total - a.Total));
      setMostMissInGameRank(results.sort((a, b) => b.TotalMiss - a.TotalMiss));

      let userIds = [];

      results.forEach((res) => {
        if (!userIds.includes(res.userId)) {
          userIds.push(res.userId);
        }
      });

      userTotals = [];

      userIds.forEach((u) => {
        let userTotal = 0;
        let resForUser = results.filter((res) => res.userId === u);
        let username = users.find((x) => x.uid === u);

        resForUser.forEach((rx) => {
          userTotal += rx.Total;
        });

        userTotals.push({ username: username.fullName, overall: userTotal });
      });

      setoverallTotal(userTotals.sort((a, b) => b.overall - a.overall));
    };

    fetchResults();
  }, [mpGames]);

  if (!fontsLoaded) return <AppLoading />;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../assets/7puttLogo.jpeg")}
          style={{ height: 50, width: 90, resizeMode: "cover" }}
        />

        <View style={styles.user}>
          <Icon name="account-circle" type="material" color={"#f47b04"} />
          <Text style={styles.userName}>
            {user.usertag ? user.usertag : user.fullName}
          </Text>
        </View>
      </View>

      <View style={styles.banner}>
        <Text style={styles.bannerText}>
          Do you have what it takes to be a 7-putt champion
        </Text>
        <SportLogo />
      </View>

      <Text style={styles.GameText}>Play Game</Text>

      <View style={styles.GameBtnContainer}>
        <GameCard
          name={"Single Player"}
          textColor={"#f47b04"}
          bgColor={"#f9efcf"}
          iconName="person"
          dispatch={dispatch}
          summary={"Play 7-putt solo and improve your skills"}
        />
        <GameCard
          name={"Multi player"}
          dispatch={dispatch}
          textColor={"#5030e6"}
          bgColor={"#d9e0fd"}
          iconName="people"
          summary={"Play against other player and test out your skills"}
        />
      </View>

      <Text style={[styles.GameText, { marginTop: 30 }]}>Leaderboards</Text>

      <View style={[styles.topPutts, { marginBottom: 20 }]}>
        <Text style={styles.LeaderboardText}>Mosts Overal Putts</Text>
        {overallTotal.length > 0 && overallTotal.length < 4 ? (
          overallTotal.map((uGame) => (
            <UserRank name={uGame.username} value={uGame.overall} />
          ))
        ) : overallTotal.length > 3 ? (
          overallTotal
            .splice(0, 3)
            .map((uGame) => (
              <UserRank name={uGame.username} value={uGame.overall} />
            ))
        ) : (
          <>
            <UserRank />
            <UserRank />
            <UserRank />
          </>
        )}
      </View>

      <View style={styles.topPutts}>
        <Text style={styles.LeaderboardText}>Most Putts in a Game</Text>
        {MostPuttsInGameRank.length > 0 && MostPuttsInGameRank.length < 4 ? (
          MostPuttsInGameRank.sort((a, b) => b.Total - a.Total).map((urank) => {
            let username = users.find((x) => x.uid === urank.userId)?.fullName;
            return <UserRank name={username} value={urank.Total} />;
          })
        ) : MostPuttsInGameRank.length > 3 ? (
          MostPuttsInGameRank.sort((a, b) => b.Total - a.Total)
            .slice(0, 3)
            .map((urank) => {
              let username = users.find(
                (x) => x.uid === urank.userId
              )?.fullName;
              return <UserRank name={username} value={urank.Total} />;
            })
        ) : (
          <>
            <UserRank />
            <UserRank />
            <UserRank />
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 20,
  },

  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  companyText: {
    fontFamily: "Piazzolla_800ExtraBold",
    fontSize: 24,
    color: "#f47b04",
  },

  user: {
    flexDirection: "row",
    alignItems: "center",
  },

  userName: { fontSize: 13, color: "grey", fontWeight: "600" },

  banner: {
    backgroundColor: "#f47b04",
    marginVertical: 20,
    borderRadius: 15,
    padding: 8,
    alignItems: "center",
  },

  bannerText: {
    fontFamily: "Piazzolla_800ExtraBold",
    fontSize: 25,
    textAlign: "center",
    color: "white",
  },

  GameText: {
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "Piazzolla_800ExtraBold",
    fontSize: 20,
    color: "slategray",
  },

  GameBtnContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },

  topPutts: {
    width: "100%",
    backgroundColor: "#5030e6",
    borderRadius: 12,
    padding: 10,
  },

  LeaderboardText: {
    fontSize: 22,
    color: "white",
    textAlign: "center",
    marginBottom: 10,
  },
});
