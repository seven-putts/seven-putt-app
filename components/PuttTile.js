import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-elements'

const PuttTile = ({ number, attempt }) => {
  return (
    <View>
      <Text>putt {number}</Text>
      {
          attempt === "success" ? <Icon name="done" type="material" color="green" /> : <Icon name='close' type="material" color="red" />
      }
    </View>
  )
}

export default PuttTile

const styles = StyleSheet.create({})