import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  Piazzolla_800ExtraBold,
  Piazzolla_600SemiBold,
} from "@expo-google-fonts/piazzolla";
import { baskets, discs } from "../FacilitiesData";
import { Icon } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { resetGame, toggleGame } from "../reduxslice/sevenputtSlice";
import AwesomeAlert from "react-native-awesome-alerts";
import { useNavigation } from "@react-navigation/native";
import RoundCard from "../components/RoundCard";
import Firebase from "../firebase";

const pryColor = "#f47b04";
const firestore = Firebase.firestore();

const MainGameScreen = () => {
  const [fontsLoaded] = useFonts({
    Piazzolla_800ExtraBold,
    Piazzolla_600SemiBold,
  });

  const [showAlert, setshowAlert] = useState(false);
  const [users, setusers] = useState([]);
  const [MPData, setMPData] = useState(null);
  const [userFocused, setuserFocused] = useState(0);

  const { currentGame, inLobby, multiplayerOptions, user } = useSelector(
    (state) => state.sevenPutt
  );
  const dispatch = useDispatch();

  const navigation = useNavigation();

  const handleQuit = () => {
    dispatch(toggleGame());
    dispatch(resetGame());
    setshowAlert(false);
  };

  const handleGoHome = () => {
    dispatch(toggleGame());
    dispatch(resetGame());
  };

  useEffect(async () => {
    let mount = true;

    if (!inLobby) return;

    await firestore
      .collection("MultiPlayerGame")
      .doc(multiplayerOptions?.id)
      .onSnapshot((doc) => {
        if (mount) {
          setMPData(doc.data());
        }
      });

    await firestore
      .collection("users")
      .get()
      .then((snapshot) => {
        setusers(snapshot.docs.map((doc) => doc.data()));
      });

    return () => (mount = false);
  }, []);

  const getUserData = () => {
    if (!MPData) return null;

    const focusedUser = MPData.users[userFocused]?.userId;

    const userInfo = users.find((user) => user.uid === focusedUser);

    return userInfo;
  };

  const fetchPlayerData = () => {
    if (!MPData) return null;

    const focusedUser = MPData.users[userFocused];
    if (!focusedUser) return null;

    if (focusedUser.equipments) return focusedUser.equipments;
    return focusedUser;
  };

  const fetchUsersGame = () => {
    if (!MPData) return null;

    const focusedUser = MPData.users[userFocused];
    if (!focusedUser) return null;

    if (!focusedUser.game)
      return { round1Data: [], round2Data: [], round3Data: [] };

    const round1Data = focusedUser.game.round1
      ? Object.values(focusedUser.game.round1)
      : [];
    const round2Data = focusedUser.game.round2
      ? Object.values(focusedUser.game.round2)
      : [];

    const round3Data = focusedUser.game.round3
      ? Object.values(focusedUser.game.round3)
      : [];

    return { round1Data, round2Data, round3Data };
  };

  const handleNext = async () => {
    const numOfUsers = (await MPData?.users.length) - 1;

    if (userFocused >= numOfUsers) {
      return setuserFocused(0);
    }

    setuserFocused(userFocused + 1);
  };

  const handleBack = async () => {
    const numOfUsers = (await MPData?.users.length) - 1;

    if (userFocused <= 0) {
      return setuserFocused(numOfUsers);
    }

    setuserFocused(userFocused - 1);
  };

  const isGameOn = () => {
    // return true;
    if (inLobby) {
      const currentUser = MPData?.users.find((x) => x.userId === user.uid);
      if (currentUser?.game.round3["Section D"]) {
        return true;
      } else {
        return false;
      }
    } else {
      if (currentGame?.round3.length === 4) {
        return true;
      } else {
        return false;
      }
    }
  };

  if (!fontsLoaded) return <AppLoading />;

  return (
    <View style={styles.container}>
      <AwesomeAlert
        show={showAlert}
        title="Quit Game?"
        message="Ending the game means your records will be lost"
        closeOnTouchOutside={true}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="No, cancel"
        confirmText="Yes, Quit"
        confirmButtonColor="#DD6B55"
        onCancelPressed={() => setshowAlert(false)}
        onConfirmPressed={() => handleQuit()}
      />

      <View style={styles.screenHeader}>
        <Image
          source={require("../assets/7puttLogo.png")}
          style={{ height: 50, width: 110, resizeMode: "cover" }}
        />

        {isGameOn() ? (
          <TouchableOpacity
            onPress={() => handleGoHome()}
            style={styles.endGame}
          >
            <Text style={{ color: "white" }}>Return Home</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => setshowAlert(true)}
            style={styles.quitBtn}
          >
            <Text style={{ color: "white" }}>Quit</Text>
            <Icon type="material" name="exit-to-app" size={16} color="white" />
          </TouchableOpacity>
        )}
      </View>

      {inLobby && (
        <View style={styles.sliderSection}>
          <TouchableOpacity onPress={() => handleBack()}>
            <Icon
              type="material"
              name="arrow-back-ios"
              color="yellow"
              size={35}
            />
          </TouchableOpacity>

          <Text
            style={{
              flex: 1,
              textAlign: "center",
              fontSize: 26,
              color: "whitesmoke",
            }}
          >
            {getUserData()?.fullName}
          </Text>

          <TouchableOpacity onPress={() => handleNext()}>
            <Icon
              type="material"
              name="arrow-forward-ios"
              color="yellow"
              size={35}
            />
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.equipmentsContainer}>
        <View style={{ alignItems: "center" }}>
          <Text>Disc</Text>

          {inLobby ? (
            <Image
              source={
                fetchPlayerData() && discs[fetchPlayerData()?.disc.id - 1].img
              }
              style={{ height: 80, width: 150, resizeMode: "contain" }}
            />
          ) : (
            <Image
              source={discs[currentGame.equipments.disc.id - 1].img}
              style={{ height: 80, width: 150, resizeMode: "contain" }}
            />
          )}
        </View>

        <View style={{ alignItems: "center" }}>
          <Text>Basket</Text>
          {inLobby ? (
            <Image
              source={
                fetchPlayerData() &&
                baskets[fetchPlayerData().basket.id - 1].img
              }
              style={{ height: 80, width: 150, resizeMode: "contain" }}
            />
          ) : (
            <Image
              source={baskets[currentGame.equipments.basket.id - 1].img}
              style={{ height: 80, width: 150, resizeMode: "contain" }}
            />
          )}
        </View>
      </View>

      <View style={styles.detailBody}>
        {!inLobby && (
          <Text style={styles.puttsText}>
            Total Putts:{" "}
            <Text style={{ color: "yellow" }}>{currentGame.putts}</Text>
          </Text>
        )}

        {isGameOn() ? (
          <TouchableOpacity
            onPress={() => navigation.navigate("GameStats")}
            style={[styles.statsBtn]}
          >
            <Text style={styles.statsBtnText}>View Game Stats</Text>
            <Icon name="arrow-forward-ios" type="material" color="#5030e6" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => navigation.navigate("Play")}
            style={styles.continueBtn}
          >
            <Text style={styles.continueBtnText}>Continue</Text>
          </TouchableOpacity>
        )}
      </View>

      {inLobby ? (
        <ScrollView style={styles.sectionsContainer}>
          {fetchUsersGame()?.round1Data.length > 0 && (
            <RoundCard name="Round 1" results={fetchUsersGame()?.round1Data} />
          )}

          {fetchUsersGame()?.round2Data.length > 0 && (
            <RoundCard name="Round 2" results={fetchUsersGame()?.round2Data} />
          )}

          {fetchUsersGame()?.round3Data.length > 0 && (
            <RoundCard name="Round 3" results={fetchUsersGame()?.round3Data} />
          )}
        </ScrollView>
      ) : (
        <ScrollView style={styles.sectionsContainer}>
          {currentGame.round1.length > 0 && (
            <RoundCard name="Round 1" results={currentGame?.round1} />
          )}

          {currentGame.round2.length > 0 && (
            <RoundCard name="Round 2" results={currentGame?.round2} />
          )}

          {currentGame.round3.length > 0 && (
            <RoundCard name="Round 3" results={currentGame?.round3} />
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default MainGameScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: pryColor,
    paddingTop: 40,
    paddingHorizontal: 15,
  },

  screenHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    justifyContent: "space-between",
  },

  screenText: {
    fontFamily: "Piazzolla_800ExtraBold",
    color: "yellow",
    fontSize: 30,
  },

  quitBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "red",
    width: 80,
    borderRadius: 7,
    paddingVertical: 5,
    justifyContent: "center",
  },

  endGame: {
    backgroundColor: "#5030e6",
    width: 120,
    borderRadius: 7,
    paddingVertical: 8,
    alignItems: "center",
  },

  puttsText: {
    fontFamily: "Piazzolla_800ExtraBold",
    color: "lavender",
    marginVertical: 20,
    fontSize: 18,
  },

  sectionsContainer: {
    flex: 1,
    marginBottom: 10,
  },

  detailBody: {
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  continueBtn: {
    backgroundColor: "green",
    width: 100,
    paddingVertical: 8,
    borderRadius: 10,
  },

  continueBtnText: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },

  statsBtn: {
    flexDirection: "row",
    alignItems: "center",
  },

  statsBtnText: {
    color: "#5030e6",
    fontSize: 18,
  },

  equipmentsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
  },

  sliderSection: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 8,
  },
});
