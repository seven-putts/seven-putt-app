import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const pryColor = '#f47b04'

const SelectMPMode = () => {
  
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <Image source={require('../assets/7puttLogo.png')} width={200} height={150} />

      <TouchableOpacity onPress={() => navigation.navigate("CreateGame")} style={styles.createBtn}>
        <Text style={{ fontSize: 20, color: pryColor }}>Create Game</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("JoinGame")} style={styles.joinBtn}>
        <Text style={{ fontSize: 20, color: "yellow" }}>Join Game</Text>
      </TouchableOpacity>
    </View>
  )
}

export default SelectMPMode

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: pryColor,
      paddingTop: 40,
      paddingHorizontal: 20,
      alignItems: "center",
      justifyContent: "center"
  },

  createBtn: {
    backgroundColor: "yellow",
    width: "80%",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },

  joinBtn: {
    borderWidth: 3,
    borderColor: "yellow",
    width: "80%",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center"
  },

})