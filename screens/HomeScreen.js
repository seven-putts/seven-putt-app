import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
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
import UserRank from "../components/UserRank";
import Firebase from "../firebase";

const HomeScreen = () => {
  const [fontsLoaded] = useFonts({
    Piazzolla_800ExtraBold,
    Piazzolla_600SemiBold,
  });

  const { user } = useSelector((state) => state.sevenPutt);
  const dispatch = useDispatch();

  if (!fontsLoaded) return <AppLoading />;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../assets/7puttLogo.jpeg")}
          style={{ height: 50, width: 90, resizeMode: "cover" }}
        />

        <View style={styles.user}>
          <Icon name="account-circle" type="material" color={"#f47b04"} />
          <Text style={styles.userName}>{user?.fullName}</Text>
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
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 30,
    paddingHorizontal: 15,
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

  userName: { fontSize: 13, color: "black", fontWeight: "600" },

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
