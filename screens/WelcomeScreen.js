import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useFonts, Piazzolla_800ExtraBold, Piazzolla_600SemiBold } from '@expo-google-fonts/piazzolla';
import { useNavigation } from '@react-navigation/native'
import AppLoading from 'expo-app-loading'

const pryColor = '#f47b04'

const WelcomeScreen = () => {
  
  const navigation = useNavigation()
  
  const [fontsLoaded] = useFonts({
    Piazzolla_800ExtraBold,
    Piazzolla_600SemiBold
  });

  if(!fontsLoaded) return <AppLoading />

  return (
    <View style={styles.container}>
      <Text style={styles.WelcomText}>Welcome to <Text style={{ color: "yellow" }}>7-putt</Text></Text>

      <Image source={require("../assets/7puttLogo.jpeg")} style={{ height: 150, width: 150, marginVertical: 40, borderRadius: 999 }} />

      <TouchableOpacity onPress={() => navigation.navigate("Signup")} style={styles.Button}>
        <Text style={styles.ButtonText}>Signup</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")} style={styles.LoginBtn}>
        <Text style={styles.LoginBtnText}>Login</Text>
      </TouchableOpacity>
    </View>
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: "center", 
    backgroundColor: pryColor
  },

  Button: {
    width: "60%",
    paddingVertical: 5,
    backgroundColor: "white",
    shadowColor: "slategray",
    shadowOffset: { width: -3, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    borderRadius: 10,
    marginBottom: 20
  },

  WelcomText: {
    fontFamily: "Piazzolla_800ExtraBold",
    fontSize: 40,
    // marginBottom: 100
  },

  ButtonText: {
    fontFamily: "Piazzolla_600SemiBold",
    fontSize: 25,
    color: pryColor,
    textAlign: "center"
  },

  LoginBtn: {
    borderWidth: 2,
    width: "60%",
    paddingVertical: 5,
    borderRadius: 10,
    borderColor: "white"
  }, 

  LoginBtnText: {
    color: "white",
    textAlign: "center",
    fontSize: 25,
    fontFamily: "Piazzolla_600SemiBold",
  }
})