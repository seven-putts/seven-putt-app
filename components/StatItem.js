import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const StatItem = ({ name, value, isLast }) => {
  return (
    <View style={[styles.container, { borderBottomWidth: isLast ? 0 : 2, borderBottomColor: "grey" }]}>
      <Text>{name}</Text>
      <Text style={{ color: name.includes("miss") ? "red" : "green", fontSize: 18 }}>{value}</Text>
    </View>
  )
}

export default StatItem

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 15,
        justifyContent: "space-between"
    }
})