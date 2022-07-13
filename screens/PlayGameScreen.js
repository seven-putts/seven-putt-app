import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Icon } from "react-native-elements";
import {
  useFonts,
  Piazzolla_800ExtraBold,
  Piazzolla_600SemiBold,
} from "@expo-google-fonts/piazzolla";
import AppLoading from "expo-app-loading";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { addRound } from "../reduxslice/sevenputtSlice";
import Firebase from "../firebase";
import { useEffect } from "react";

const pryColor = "#f47b04";
const firestore = Firebase.firestore();

const PlayGame = () => {
  const [fontsLoaded] = useFonts({
    Piazzolla_800ExtraBold,
    Piazzolla_600SemiBold,
  });

  const navigation = useNavigation();
  const { currentGame, user, inLobby, multiplayerOptions } = useSelector(
    (state) => state.sevenPutt
  );
  const dispatch = useDispatch();
  const [currentRound, setcurrentRound] = useState([]);
  const [step, setstep] = useState(1);
  const [MPData, setMPData] = useState(null);
  const [users, setusers] = useState([]);
  const [secData, setsecData] = useState({ section: "Section A", round: 1 });
  const [dataCount, setdataCount] = useState(0);

  const checkSecData = () => {
    if (!MPData) return { section: "section A", round: 1 };

    const currentUserGame = MPData.users.find(
      (x) => x.userId === user.uid
    ).game;

    if (!currentUserGame) return { section: "Section A", round: 1 };

    if (
      currentUserGame.round1 &&
      !currentUserGame.round2 &&
      !currentUserGame.round3
    ) {
      if (
        currentUserGame.round1["Section A"] &&
        !currentUserGame.round1["Section B"] &&
        !currentUserGame.round1["Section C"] &&
        !currentUserGame.round1["Section D"]
      ) {
        return { section: "Section B", round: 1 };
      } else if (
        currentUserGame.round1["Section A"] &&
        currentUserGame.round1["Section B"] &&
        !currentUserGame.round1["Section C"] &&
        !currentUserGame.round1["Section D"]
      ) {
        return { section: "Section C", round: 1 };
      } else if (
        currentUserGame.round1["Section A"] &&
        currentUserGame.round1["Section B"] &&
        currentUserGame.round1["Section C"] &&
        !currentUserGame.round1["Section D"]
      ) {
        return { section: "Section D", round: 1 };
      } else {
        return { section: "Section A", round: 2 };
      }
    } else if (
      currentUserGame.round1 &&
      currentUserGame.round2 &&
      !currentUserGame.round3
    ) {
      if (
        currentUserGame.round2["Section A"] &&
        !currentUserGame.round2["Section B"] &&
        !currentUserGame.round2["Section C"] &&
        !currentUserGame.round2["Section D"]
      ) {
        return { section: "Section B", round: 2 };
      } else if (
        currentUserGame.round2["Section A"] &&
        currentUserGame.round2["Section B"] &&
        !currentUserGame.round2["Section C"] &&
        !currentUserGame.round2["Section D"]
      ) {
        return { section: "Section C", round: 2 };
      } else if (
        currentUserGame.round2["Section A"] &&
        currentUserGame.round2["Section B"] &&
        currentUserGame.round2["Section C"] &&
        !currentUserGame.round2["Section D"]
      ) {
        return { section: "Section D", round: 2 };
      } else {
        return { section: "Section A", round: 3 };
      }
    } else {
      if (
        currentUserGame.round3["Section A"] &&
        !currentUserGame.round3["Section B"] &&
        !currentUserGame.round3["Section C"] &&
        !currentUserGame.round3["Section D"]
      ) {
        return { section: "Section B", round: 3 };
      } else if (
        currentUserGame.round3["Section A"] &&
        currentUserGame.round3["Section B"] &&
        !currentUserGame.round3["Section C"] &&
        !currentUserGame.round3["Section D"]
      ) {
        return { section: "Section C", round: 3 };
      } else if (
        currentUserGame.round3["Section A"] &&
        currentUserGame.round3["Section B"] &&
        currentUserGame.round3["Section C"] &&
        !currentUserGame.round3["Section D"]
      ) {
        return { section: "Section D", round: 3 };
      } else {
        return { section: "Section D", round: 3 };
      }
    }
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

    return () => (mount = false);
  }, [currentRound]);

  useEffect(() => {
    if (dataCount >= 2) return;
    setsecData(checkSecData());
    setdataCount(dataCount + 1);
  }, [MPData]);

  useEffect(() => {
    const checkIfGameOver = () => {
      let numOfCompleted = 0;

      MPData.users.forEach((u) => {
        if (u.game) {
          if (u.game.round3) {
            if (u.game.round3["Section D"]) {
              numOfCompleted += 1;
            }
          }
        }
      });

      if (numOfCompleted >= MPData.users.length) {
        firestore
          .collection("MultiPlayerGame")
          .doc(multiplayerOptions?.id)
          .update({
            gameOver: true,
          });
      }
    };

    if (MPData) {
      checkIfGameOver();
    }
  }, [MPData]);

  const viewResult = async () => {
    navigation.navigate("GameMenu");
    setdataCount(1);
    setstep(1);

    dispatch(addRound(currentRound));
    if (inLobby) return setcurrentRound([]);

    if (checkSection().round == 3 && checkSection().section === "Section D") {
      await firestore
        .collection("SingleGames")
        .doc(user.uid)
        .collection("SingleGames")
        .add({
          equipments: currentGame.equipments,
          mode: currentGame.mode,
          putts: currentGame.putts,
          round1: {
            sectionA: currentGame.round1[0],
            sectionB: currentGame.round1[1],
            sectionC: currentGame.round1[2],
            sectionD: currentGame.round1[3],
          },
          round2: {
            sectionA: currentGame.round2[0],
            sectionB: currentGame.round2[1],
            sectionC: currentGame.round2[2],
            sectionD: currentGame.round2[3],
          },
          round3: {
            sectionA: currentGame.round3[0],
            sectionB: currentGame.round3[1],
            sectionC: currentGame.round3[2],
            sectionD: currentRound,
          },
        })
        .catch((err) => console.log(err.message));
    }

    return setcurrentRound([]);
  };

  const handleNext = (attempt) => {
    if (step >= 7) {
      if (inLobby) {
        const otherUsers = MPData?.users.filter((x) => x.userId !== user.uid);
        let currentUser = MPData?.users.find((x) => x.userId === user.uid);

        if (currentUser?.game) {
          currentUser.game = {
            ...currentUser.game,
            [`round${secData.round}`]: {
              ...currentUser.game[`round${secData.round}`],
              [secData.section]: [...currentRound, attempt],
            },
          };
        } else {
          currentUser.game = {
            round1: {
              "Section A": [...currentRound, attempt],
            },
          };
        }

        firestore
          .collection("MultiPlayerGame")
          .doc(multiplayerOptions.id)
          .update({
            users: [...otherUsers, currentUser],
          });
      }
    }

    setcurrentRound([...currentRound, attempt]);

    return setstep(step + 1);
  };

  const nextRound = () => {
    dispatch(addRound(currentRound));
    setcurrentRound([]);
    setdataCount(1);
    setstep(1);

    if (currentGame.round3.length >= 3) {
      return navigation.navigate("GameMenu");
    }
  };

  const getRoundPerformance = () => {
    const gotten = currentRound.filter((attempt) => attempt === "success");

    if (gotten.length > 3 && gotten.length < 7)
      return { message: "Nice Work, Keep it up", pass: true };
    if (gotten.length === 7)
      return { message: "Perfect Score, Keep it up", pass: true };
    if (gotten.length === 3)
      return {
        message: "Good attempt, a little more effort is needed",
        pass: false,
      };
    return { message: "Poor effort, You can do better", pass: false };
  };

  const checkSection = () => {
    if (currentGame.round1.length > 0 && currentGame.round1.length < 4) {
      if (currentGame.round1.length == 1) {
        return { section: "Section B", round: 1 };
      } else if (currentGame.round1.length === 2) {
        return { section: "Section C", round: 1 };
      } else {
        return { section: "Section D", round: 1 };
      }
    } else if (currentGame.round1.length > 3 && currentGame.round2.length < 4) {
      if (currentGame.round2.length === 0) {
        return { section: "Section A", round: 2 };
      } else if (currentGame.round2.length === 1) {
        return { section: "Section B", round: 2 };
      } else if (currentGame.round2.length === 2) {
        return { section: "Section C", round: 2 };
      } else {
        return { section: "Section D", round: 2 };
      }
    } else if (currentGame.round2.length > 3 && currentGame.round3.length < 4) {
      if (currentGame.round3.length === 0) {
        return { section: "Section A", round: 3 };
      } else if (currentGame.round3.length === 1) {
        return { section: "Section B", round: 3 };
      } else if (currentGame.round3.length === 2) {
        return { section: "Section C", round: 3 };
      } else {
        return { section: "Section D", round: 3 };
      }
    } else {
      return { section: "Section A", round: 1 };
    }
  };

  const checkMPcurrentRound = () => {
    let available = [];

    if (!MPData) return available;

    MPData?.users
      .filter((elem) => elem.userId !== user.uid)
      .map((elem) => {
        let userInfo = users.find((x) => x.uid === elem.userId);
        let userGame = null;
        if (elem.game) {
          userGame = elem.game[`round${secData.round}`]
            ? elem.game[`round${secData.round}`][secData.section]
            : null;
        }

        available.push({ name: userInfo, userGame });
      });

    return available;
  };

  const awaitingPlayer = () => {
    if (!inLobby) return false;
    if (!MPData) return true;

    let opp = checkMPcurrentRound();
    let numOfUnavailable = 0;

    if (opp.length < 1) return true;

    opp.forEach((ply) => {
      if (!ply.userGame) {
        numOfUnavailable += 1;
      }
    });

    if (numOfUnavailable > 0) return true;

    return false;
  };

  const checkNextBtnText = () => {
    let text;

    if (inLobby) {
      text =
        checkSecData().section == "Section D" ? "Next Round" : "Next Section";
    } else {
      text =
        checkSection().section == "Section D" ? "Next Round" : "Next Section";
    }

    return text;
  };

  const isgameOver = () => {
    if (inLobby) {
      if (MPData.gameOver) return true;

      if (secData.section === "Section D" && secData.round == 3) {
        return true;
      } else {
        return false;
      }
    } else {
      if (checkSection().section == "Section D" && checkSection().round === 3) {
        return true;
      } else {
        return false;
      }
    }
  };

  const handleGameOver = () => {
    viewResult();
    firestore.collection("users").doc(user.uid).update({
      currentGame: null,
    });
  };

  if (!fontsLoaded) return <AppLoading />;

  return (
    <View style={styles.container}>
      {inLobby && (
        <View style={styles.MPHeader}>
          <Text style={styles.MPText}>Multiplayer Mode :-</Text>
          <Text style={styles.MPplayers}>
            {MPData?.users.length || 0} players
          </Text>
        </View>
      )}

      {inLobby ? (
        <Text style={styles.headerText}>
          Round {secData.round}:{" "}
          <Text style={{ fontWeight: "400", color: pryColor }}>
            {secData.section}
          </Text>
        </Text>
      ) : (
        <Text style={styles.headerText}>
          Round {checkSection().round}:{" "}
          <Text style={{ fontWeight: "400", color: pryColor }}>
            {checkSection().section}
          </Text>
        </Text>
      )}

      <View style={styles.puttsScore}>
        {currentRound.map((attempt, index) => {
          return (
            <View
              style={{ flexDirection: "row", alignItems: "center", margin: 10 }}
              key={(index + 1).toString()}
            >
              <Text style={{ fontSize: 16 }}>PUTT {index + 1}: </Text>
              {attempt === "fail" ? (
                <Icon name="close" type="material" color="red" />
              ) : (
                <Icon name="done" type="material" color="green" />
              )}
            </View>
          );
        })}
      </View>

      {inLobby && (
        <View>
          <Text style={styles.opponentText}>Opponents</Text>

          <ScrollView style={{ height: 300 }}>
            {checkMPcurrentRound().map((element, index) => {
              if (!element.userGame)
                return (
                  <View key={index} style={styles.opponent}>
                    <Text>{element.name?.fullName}</Text>

                    <Text style={{ color: "grey" }}>
                      Waiting for {element.name?.fullName}
                    </Text>
                  </View>
                );

              return (
                <View key={index} style={styles.opponent}>
                  <Text>{element.name?.fullName}</Text>

                  <View style={{ flexWrap: "wrap", flexDirection: "row" }}>
                    {element.userGame.map((attempt, index) => {
                      return (
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            margin: 10,
                          }}
                          key={(index + 1).toString()}
                        >
                          <Text style={{ fontSize: 12, color: "slategrey" }}>
                            PUTT {index + 1}:{" "}
                          </Text>

                          {attempt === "fail" ? (
                            <Icon
                              name="close"
                              type="material"
                              color="red"
                              size={16}
                            />
                          ) : (
                            <Icon
                              name="done"
                              type="material"
                              color="green"
                              size={16}
                            />
                          )}
                        </View>
                      );
                    })}
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>
      )}

      {!inLobby && (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Image
            source={require("../assets/7puttLogo.png")}
            style={{ height: 120, width: 200, resizeMode: "cover" }}
          />
        </View>
      )}

      {currentRound.length >= 7 ? (
        <View style={{ width: "100%", marginBottom: 50, marginTop: "auto" }}>
          {!isgameOver() ? (
            <View style={{ width: "100%", justifyContent: "center" }}>
              <View style={styles.report}>
                {getRoundPerformance().pass ? (
                  <Icon
                    name="thumb-up"
                    type="material"
                    color="green"
                    size={40}
                  />
                ) : (
                  <Icon
                    name="thumb-down"
                    type="material"
                    color="red"
                    size={40}
                  />
                )}

                <Text
                  style={{
                    color: getRoundPerformance().pass ? "green" : "red",
                    fontSize: 20,
                  }}
                >
                  {getRoundPerformance().message}
                </Text>
              </View>

              {!awaitingPlayer() ? (
                <View style={styles.resultBtns}>
                  <TouchableOpacity
                    onPress={() => viewResult()}
                    style={styles.viewResult}
                  >
                    <Text style={{ color: "#5030e6", fontSize: 18 }}>
                      View current result
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => nextRound()}
                    style={styles.nextRound}
                  >
                    <Text style={{ color: "yellow", fontSize: 18 }}>
                      {checkNextBtnText()}
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <Text
                  style={{ fontSize: 20, color: "grey", textAlign: "center" }}
                >
                  Waiting for Opponent(s)
                </Text>
              )}
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => handleGameOver()}
              style={{
                width: "80%",
                backgroundColor: "#5030e6",
                alignSelf: "center",
                paddingVertical: 10,
                borderRadius: 20,
              }}
            >
              <Text
                style={{ color: "white", fontSize: 18, textAlign: "center" }}
              >
                Game Over
              </Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <View style={styles.selectPut}>
          <Text style={styles.selectPutHeader}>
            Putt {currentRound.length + 1}
          </Text>

          <View style={[styles.selectBtnContainers]}>
            <TouchableOpacity
              onPress={() => handleNext("fail")}
              style={[styles.PuttBtn, { backgroundColor: "#f3afa2" }]}
            >
              <Icon name="close" type="material" color="red" size={70} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleNext("success")}
              style={[styles.PuttBtn, { backgroundColor: "#b1fca2" }]}
            >
              <Icon name="done" type="material" color="green" size={70} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default PlayGame;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9efcf",
    paddingTop: 40,
    paddingHorizontal: 10,
  },

  headerText: {
    fontSize: 25,
    color: "#5030e6",
  },

  puttsScore: {
    marginTop: 20,
    flexDirection: "row",
    flexWrap: "wrap",
  },

  selectBtnContainers: {
    flexDirection: "row",
    width: "70%",
    justifyContent: "space-between",
  },

  selectPut: {
    alignItems: "center",
    marginBottom: 50,
    marginTop: "auto",
  },

  selectPutHeader: {
    fontSize: 30,
  },

  PuttBtn: {
    shadowColor: "slategray",
    shadowOffset: { width: -3, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    borderRadius: 10,
  },

  resultBtns: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  report: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },

  viewResult: {
    marginRight: 20,
    borderColor: "#5030e6",
    borderWidth: 2,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
  },

  nextRound: {
    backgroundColor: pryColor,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },

  MPHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  MPText: {
    fontSize: 17,
  },

  MPplayers: {
    fontSize: 20,
    color: "gray",
  },

  opponentText: {
    color: "#5030e6",
    fontSize: 20,
    marginVertical: 10,
  },

  opponent: {
    borderTopWidth: 1,
    borderTopColor: "lightgreen",
    padding: 10,
  },
});
