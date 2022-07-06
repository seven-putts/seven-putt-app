import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { choosePlastic } from '../reduxslice/sevenputtSlice'

const PuttCardWithoutImage = ({ name, id, type, data, dispatch, navigation }) => {

  const selectCompany = (route) => {
    navigation.navigate(route, { companyId: id })
  }

  const selectPlastic = () => {
    dispatch(choosePlastic(data))
    return navigation.navigate("SelectBasket")
  }

  if(type === 'Plastic Tile') return (
    <TouchableOpacity onPress={() => selectPlastic()} style={[styles.container, { backgroundColor: "lightgreen" }]}>
      <Text style={{ fontSize: 20, textAlign: "center", color: "#5030e6" }}>{name}</Text>
    </TouchableOpacity>
  )
  return (
    <TouchableOpacity onPress={() => selectCompany("SelectPutt")} style={[styles.container ]}>
      <Text style={{ fontSize: 20, textAlign: "center", color: "#f47b04" }}>{name}</Text>
    </TouchableOpacity>
  )
}

export default PuttCardWithoutImage

const styles = StyleSheet.create({
  container: {
    width: 180,
    backgroundColor: "#f9efcf",
    paddingHorizontal: 10,
    height: 100,
    borderRadius: 10,
    justifyContent: "center",
    margin: 10
  }
})