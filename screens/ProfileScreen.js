import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Firebase from '../firebase';
import { getPlayerData } from '../utilities';

const auth = Firebase.auth()
const pryColor = '#f47b04'
const firestore = Firebase.firestore()

const ProfileScreen = () => {
  const [userSg, setuserSg] = useState(null)
  const { user } = useSelector(state => state.sevenPutt)

  const handleLogout = () => {
    auth.signOut().catch(err => Alert.alert(err.message))
  }

  useEffect(async () => {
    await firestore.collection("SingleGames").doc(user.uid).collection("SingleGames").get().then(data => {
      setuserSg(data.docs.map(doc => doc.data()))
    }).catch(err => console.log(err))
  }, [])
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.userInfo}>
        <View>
          <Text style={{ fontSize: 20, fontWeight: "500" }}>{user?.fullName}</Text>
          <Text style={{ fontSize: 16, color: "darkslategray" }}>{user?.email}</Text>
        </View>

        <TouchableOpacity onPress={() => handleLogout()} style={styles.logoutBtn}>
          <Text style={styles.btnText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.PlanContainer}>
        <Text style={{ fontSize: 20 }}>Current Plan: </Text>
        <Text style={{ color: "#5030e6" ,  fontSize: 18 }}>Free Plan ($0)</Text>
      </View>

      <View style={styles.userRecord}>
        <Text style={{ color: "lightgreen", marginBottom: 20 }}>Single Player Records</Text>
        <Text style={styles.userRecordText}>Total Games Played:  <Text style={styles.recordVal}>{userSg && getPlayerData(userSg).length}</Text></Text>
        <Text style={styles.userRecordText}>Overall Putts:   <Text style={styles.recordVal}>{userSg && getPlayerData(userSg).putts}</Text></Text>
        <Text style={styles.userRecordText}>Most Putts In A Game:   <Text style={styles.recordVal}>{userSg && getPlayerData(userSg).highestGamePutt}</Text></Text>
        <Text style={styles.userRecordText}>Most Putts In A Round:   <Text style={styles.recordVal}>{userSg && getPlayerData(userSg).highestRound}</Text></Text>
      </View>

      <View style={[styles.userRecord, { backgroundColor: pryColor }]}>
        <Text style={{ color: "yellow", marginBottom: 20 }}>Multiplayer Player Records</Text>
        <Text style={styles.userRecordText}>Total Games Played:  <Text style={[styles.recordVal, { color: "yellow" }]}>120</Text></Text>
        <Text style={styles.userRecordText}>Overall Putts:   <Text style={[styles.recordVal, { color: "yellow" }]}>92</Text></Text>
        <Text style={styles.userRecordText}>Most Wins:  <Text style={[styles.recordVal, { color: "yellow" }]}>20</Text></Text>
        <Text style={styles.userRecordText}>Most Putts In A Game:   <Text style={[styles.recordVal, { color: "yellow" }]}>45</Text></Text>
        <Text style={styles.userRecordText}>Most Putts In A Round:   <Text style={[styles.recordVal, { color: "yellow" }]}>20</Text></Text>
      </View>
    </ScrollView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 10
  },

  userInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10
  },

  logoutBtn: {
    width: 100,
    backgroundColor: "red",
    shadowColor: "slategray",
    shadowOffset: { width: -3, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    borderRadius: 10,
    justifyContent: "center"
  },

  btnText: {
    fontSize: 16,
    color: "white",
    textAlign: "center"
  },

  PlanContainer: {
    marginTop: 40,
    backgroundColor: "#d9e0fd",
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 30,
    borderRadius: 10,
    flexDirection: "row"
  },

  userRecord: {
    backgroundColor: "#5030e6",
    borderRadius: 10,
    padding: 15,
    marginTop: 30
  },

  userRecordText: {
    fontSize: 18,
    marginBottom: 10,
    color: "white",
  },

  recordVal: {
    color: "lightgreen"
  }
})