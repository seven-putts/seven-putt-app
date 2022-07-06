import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-elements'

const UserRank = () => {
  return (
    <View style={styles.container}>
        <Icon name="person-outline" size={30} color="yellow" type="material" />
        <Text style={styles.name}>David</Text>
        <Text style={styles.price}>12</Text>
    </View>
  )
}

export default UserRank

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        width: "90%",
        paddingVertical: 8,
        alignSelf: "center"
    },
    name: {
      color: "yellow",
      fontSize: 18,
      flex: 1,
      marginLeft: 10
    },

    price: {
      fontSize: 20,
      color: "lightgreen"
    }
})