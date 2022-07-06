import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import StatItem from "../components/StatItem";
import { useSelector } from "react-redux";
import { Icon } from "react-native-elements";
import Firebase from "../firebase";

const pryColor = "#f47b04";
const secColor = "#f9efcf";

const firestore = Firebase.firestore();

const GameStatsScreen = () => {
  const { currentGame, inLobby, multiplayerOptions } = useSelector(
    (state) => state.sevenPutt
  );
  const [selectedUser, setselectedUser] = useState(0);
  const [MPData, setMPData] = useState(null);
  const [users, setusers] = useState([]);

  const fetchCurrentUser = () => {
    if (!MPData) return null;
    const user = MPData?.users[selectedUser];

    if (!user.game) return null;
    return user.game;
  };

  const checkHighestSection = (game) => {
    let highestPutts = 0;
    let lowestPutts = 0;

    if (!game) return { highestPutts, lowestPutts };

    game.round1.forEach((sec) => {
      const getNum = sec.filter((attempt) => attempt === "success");
      const getFail = 7 - getNum.length;

      if (getNum.length > highestPutts) {
        highestPutts = getNum.length;
      }

      if (getFail > lowestPutts) {
        lowestPutts = getFail;
      }
    });

    game.round2.forEach((sec) => {
      const getNum = sec.filter((attempt) => attempt === "success");
      const getFail = 7 - getNum.length;

      if (getNum.length > highestPutts) {
        highestPutts = getNum.length;
      }

      if (getFail > lowestPutts) {
        lowestPutts = getFail;
      }
    });

    game.round3.forEach((sec) => {
      const getNum = sec.filter((attempt) => attempt === "success");
      const getFail = 7 - getNum.length;

      if (getNum.length > highestPutts) {
        highestPutts = getNum.length;
      }

      if (getFail > lowestPutts) {
        lowestPutts = getFail;
      }
    });

    return { highestPutts, lowestPutts };
  };

  const checkHighestRound = (game) => {
    let round1Get = 0;
    let round1Fail = 0;

    let round2Get = 0;
    let round2Fail = 0;

    let round3Get = 0;
    let round3Fail = 0;

    let HighestRound = 0;
    let HighestMiss = 0;

    if (!game) return { HighestRound, HighestMiss };

    game.round1.forEach((section) => {
      let gotten = section.filter((attempt) => attempt === "success").length;
      let fail = 7 - gotten;

      round1Get += gotten;
      round1Fail += fail;
    });

    game.round2.forEach((section) => {
      let gotten = section.filter((attempt) => attempt === "success").length;
      let fail = 7 - gotten;

      round2Get += gotten;
      round2Fail += fail;
    });

    game.round3.forEach((section) => {
      let gotten = section.filter((attempt) => attempt === "success").length;
      let fail = 7 - gotten;

      round3Get += gotten;
      round3Fail += fail;
    });

    if (round1Get >= round2Get && round1Get >= round3Get) {
      HighestRound = round1Get;
    } else if (round2Get >= round1Get && round2Get >= round3Get) {
      HighestRound = round2Get;
    } else {
      HighestRound = round3Get;
    }

    if (round1Fail > round2Fail && round1Fail > round3Fail) {
      HighestMiss = round1Fail;
    } else if (round2Fail > round1Fail && round2Fail > round3Fail) {
      HighestMiss = round2Fail;
    } else {
      HighestMiss = round3Fail;
    }

    return { HighestRound, HighestMiss };
  };

  const checkMPHighestSection = () => {
    let HighestSection = 0;
    let HighestSectionMiss = 0;

    let HighestRound = 0;
    let HighestRoundMiss = 0;

    let Total = 0;
    let TotalMiss = 0;

    if (!fetchCurrentUser())
      return {
        HighestSection,
        HighestSectionMiss,
        Total,
        TotalMiss,
        HighestRound,
        HighestRoundMiss,
      };

    const R1S1 = fetchCurrentUser().round1["Section A"].filter(
      (attempt) => attempt === "success"
    ).length;
    const R1S1Miss = 7 - R1S1;

    const R1S2 = fetchCurrentUser().round1["Section B"].filter(
      (attempt) => attempt === "success"
    ).length;
    const R1S2Miss = 7 - R1S2;

    const R1S3 = fetchCurrentUser().round1["Section C"].filter(
      (attempt) => attempt === "success"
    ).length;
    const R1S3Miss = 7 - R1S3;

    const R1S4 = fetchCurrentUser().round1["Section D"].filter(
      (attempt) => attempt === "success"
    ).length;
    const R1S4Miss = 7 - R1S4;

    const R2S1 = fetchCurrentUser().round2["Section A"].filter(
      (attempt) => attempt === "success"
    ).length;
    const R2S1Miss = 7 - R2S1;

    const R2S2 = fetchCurrentUser().round2["Section B"].filter(
      (attempt) => attempt === "success"
    ).length;
    const R2S2Miss = 7 - R2S2;

    const R2S3 = fetchCurrentUser().round2["Section C"].filter(
      (attempt) => attempt === "success"
    ).length;
    const R2S3Miss = 7 - R2S3;

    const R2S4 = fetchCurrentUser().round2["Section D"].filter(
      (attempt) => attempt === "success"
    ).length;
    const R2S4Miss = 7 - R2S4;

    const R3S1 = fetchCurrentUser().round3["Section A"].filter(
      (attempt) => attempt === "success"
    ).length;
    const R3S1Miss = 7 - R3S1;

    const R3S2 = fetchCurrentUser().round3["Section B"].filter(
      (attempt) => attempt === "success"
    ).length;
    const R3S2Miss = 7 - R3S2;

    const R3S3 = fetchCurrentUser().round3["Section C"].filter(
      (attempt) => attempt === "success"
    ).length;
    const R3S3Miss = 7 - R3S3;

    const R3S4 = fetchCurrentUser().round3["Section A"].filter(
      (attempt) => attempt === "success"
    ).length;
    const R3S4Miss = 7 - R3S4;

    const round1Get = R1S1 + R1S2 + R1S3 + R1S4;
    const round1Miss = R1S1Miss + R1S2Miss + R1S3Miss + R1S4Miss;

    const round2Get = R2S1 + R2S2 + R2S3 + R2S4;
    const round2Miss = R2S1Miss + R2S2Miss + R2S3Miss + R2S4Miss;

    const round3Get = R3S1 + R3S2 + R3S3 + R3S4;
    const round3Miss = R3S1Miss + R3S2Miss + R3S3Miss + R3S4Miss;

    const secScores = [
      R1S1,
      R1S2,
      R1S3,
      R1S4,
      R2S1,
      R2S2,
      R2S3,
      R2S4,
      R3S1,
      R3S2,
      R3S3,
      R3S4,
    ];

    const secMisses = [
      R1S1Miss,
      R1S2Miss,
      R1S3Miss,
      R1S4Miss,
      R2S1Miss,
      R2S2Miss,
      R2S3Miss,
      R2S4Miss,
      R3S1Miss,
      R3S2Miss,
      R3S3Miss,
      R3S4Miss,
    ];

    secScores.forEach((val) => {
      Total += val;

      if (val >= HighestSection) {
        HighestSection = val;
      }
    });

    secMisses.forEach((val) => {
      TotalMiss += val;

      if (val >= HighestSectionMiss) {
        HighestSectionMiss = val;
      }
    });

    const roundScores = [round1Get, round2Get, round3Get];
    const roundMisses = [round1Miss, round2Miss, round3Miss];

    roundScores.forEach((val) => {
      if (val >= HighestRound) {
        HighestRound = val;
      }
    });

    roundMisses.forEach((val) => {
      if (val >= HighestRoundMiss) {
        HighestRoundMiss = val;
      }
    });

    return {
      HighestSection,
      HighestSectionMiss,
      Total,
      TotalMiss,
      HighestRound,
      HighestRoundMiss,
    };
  };

  const getUserData = () => {
    if (!MPData || !users) return null;
    const user = MPData?.users[selectedUser];

    if (!user) return null;

    const userData = users.find((x) => x.uid === user.userId);

    return userData;
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
          //   console.log(doc.data().users[0]);
        }
      });

    await firestore
      .collection("users")
      .get()
      .then((snapshot) => {
        setusers(snapshot.docs.map((doc) => doc.data()));
      });
  }, []);

  const handleNext = async () => {
    const numOfUsers = (await MPData?.users.length) - 1;

    if (selectedUser >= numOfUsers) {
      return setselectedUser(0);
    }

    setselectedUser(selectedUser + 1);
  };

  const handleBack = async () => {
    const numOfUsers = (await MPData?.users.length) - 1;

    if (selectedUser <= 0) {
      return setselectedUser(numOfUsers);
    }

    setselectedUser(selectedUser - 1);
  };

  if (inLobby)
    return (
      <View style={styles.container}>
        <Text style={styles.MPHeaderText}>Stats</Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 10,
            marginBottom: 20,
          }}
        >
          <TouchableOpacity style={styles.btn} onPress={() => handleBack()}>
            <Icon name="arrow-back-ios" type="material" size={26} />
          </TouchableOpacity>

          <Text style={styles.username}>{getUserData()?.fullName}</Text>

          <TouchableOpacity style={styles.btn} onPress={() => handleNext()}>
            <Icon name="arrow-forward-ios" type="material" size={26} />
          </TouchableOpacity>
        </View>

        <View style={styles.MPStatsContainer}>
          <StatItem name="Total putts" value={checkMPHighestSection().Total} />
          <StatItem
            name="Total misses"
            value={checkMPHighestSection().TotalMiss}
          />
          <StatItem
            name="Most putts in a Section"
            value={checkMPHighestSection().HighestSection}
          />
          <StatItem
            name="Most misses in a section"
            value={checkMPHighestSection().HighestSectionMiss}
          />
          <StatItem
            name="Most putts in a round"
            value={checkMPHighestSection().HighestRound}
          />
          <StatItem
            name="Most misses in a round"
            value={checkMPHighestSection().HighestRoundMiss}
            isLast
          />
        </View>
      </View>
    );

  return (
    <View style={styles.container}>
      <View style={styles.statHeader}>
        <Text style={{ color: pryColor, textAlign: "center", fontSize: 25 }}>
          Stats
        </Text>
      </View>

      <View style={styles.statListContainer}>
        <StatItem name="Total putts" value={currentGame.putts} />
        <StatItem name="Total misses" value={84 - currentGame.putts} />
        <StatItem
          name="Most putts in a Section"
          value={checkHighestSection(currentGame).highestPutts}
        />
        <StatItem
          name="Most misses in a section"
          value={checkHighestSection(currentGame).lowestPutts}
        />
        <StatItem
          name="Most putts in a round"
          value={checkHighestRound(currentGame).HighestRound}
        />
        <StatItem
          name="Most misses in a round"
          value={checkHighestRound(currentGame).HighestMiss}
          isLast
        />
      </View>
    </View>
  );
};

export default GameStatsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: pryColor,
    alignItems: "center",
    justifyContent: "center",
  },

  statHeader: {
    width: "30%",
    backgroundColor: secColor,
    paddingVertical: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },

  statListContainer: {
    width: "80%",
    backgroundColor: secColor,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },

  MPHeaderText: {
    fontSize: 25,
    color: "yellow",
  },

  MPStatsContainer: {
    maxHeight: "80%",
    width: "95%",
    backgroundColor: secColor,
  },

  btn: {
    backgroundColor: "yellow",
    padding: 8,
    width: 40,
    height: 40,
    borderRadius: 6,
  },

  username: {
    flex: 1,
    textAlign: "center",
    color: "white",
    fontSize: 20,
  },
});
