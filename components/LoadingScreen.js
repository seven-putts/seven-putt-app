import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/7puttLogo.png")} />
      <ActivityIndicator size={40} color={'#f47b04'} />
      <Text>Loading</Text>
    </View>
  )
}

export default LoadingScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9efcf",
    alignItems: "center",
    justifyContent: "center"
  }
})