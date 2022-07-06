import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux'
import { selectBasket, selectDisc } from '../reduxslice/sevenputtSlice'

const PuttCard = ({ data, navigation, type, gameMode, companyId }) => {
  
  const dispatch = useDispatch()

  const handleSelect = () => {
    navigation.navigate("SelectPlastic", { companyId: companyId })
    dispatch(selectDisc(data))
  }
  
  const handleStartGame = () => {
    if(gameMode === "Multiplayer"){
      navigation.navigate("SelectMPMode")
    }else {
      navigation.navigate("Ready")
    } 

    dispatch(selectBasket(data))
  }

  if (type === "basket") return (
    <TouchableOpacity onPress={() => handleStartGame()} style={[styles.container, { marginBottom: data.id === 12 ? 50 : 10 } ]}>
      <Image source={data.img} style={{ height: "80%", width: "100%" , resizeMode: "contain"}}  /> 
      <Text style={{ fontSize: 15, marginTop: 8 }}>{data.name}</Text>
    </TouchableOpacity>
  )
  return (
    <TouchableOpacity onPress={() => handleSelect()} style={[styles.container, { marginBottom: data.id === 18 ? 50 : 10 } ]}>
      <Image source={data.img} style={{ height: "80%", width: "100%" , resizeMode: "contain"}}  /> 
      <Text style={{ fontSize: 15, marginTop: 8 }}>{data.name}</Text>
    </TouchableOpacity>

  )
}

export default PuttCard

const styles = StyleSheet.create({
    container: { 
        height: 150, 
        width: 250,
        alignSelf: 'center',  
        borderRadius: 10, 
        alignItems: 'center', 
        justifyContent: "center", 
        backgroundColor: "white",
        shadowColor: "gray",
        shadowOffset: { width: -3, height: 6 },
        shadowOpacity: 0.2,
        shadowRadius: 3, 
        padding: 5
    }
})