import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { baskets, discs } from '../FacilitiesData'
import { Icon } from 'react-native-elements'
import { useDispatch, useSelector } from 'react-redux'
import { toggleGame } from '../reduxslice/sevenputtSlice'

const StartGameScreeen = () => {
    const dispatch = useDispatch()
    const { currentGame } = useSelector(state => state.sevenPutt)

  return (
    <View style={styles.container}>
      <Text style={styles.screenHeader}>Are you ready?</Text>
      <Text style={styles.screenInfo}>Click the Button below to start game</Text>

      <View style={styles.Body}>
        <Text style={styles.bodyText}>Choosen Equipments</Text>

        <View style={[styles.detailContainer, {  marginBottom: 30  }]}>
            <Text style={styles.detailText}>Disc Type </Text>
            <Image source={discs[currentGame.equipments.disc.id - 1].img} style={{ height: 70, width: 140, resizeMode: "contain"}} />
            <Text style={{ fontSize: 15, marginTop: 8, color: "slategray" }} >{currentGame.equipments.disc.name}</Text>
        </View>

        <View style={styles.detailContainer}>
            <Text style={styles.detailText}>Basket Type </Text>
            <Image source={baskets[currentGame.equipments.basket.id - 1].img} style={{ height: 70, width: 140, resizeMode: "contain" }} />
            <Text style={{ fontSize: 15, marginTop: 8, color: "slategray" }} >{currentGame.equipments.basket.name}</Text>
        </View>

        <View style={[styles.detailContainer, { marginTop: 20 }]}>
            <Text style={styles.detailText}>Plastic Type</Text>
            <Text style={{ fontSize: 20, color: "gray" }} >{currentGame.equipments.plastic.name}</Text>
        </View>        
      </View>

        <TouchableOpacity onPress={() => dispatch(toggleGame())} style={styles.startBtn}>
            <Text style={styles.startBtnText}>Start Game</Text>
            <Icon name="sports" type='material' />
        </TouchableOpacity>

    </View>
  )
}

export default StartGameScreeen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f47b04",
        paddingTop: 40,
        alignItems: 'center'
    },

    screenHeader: {
        fontSize: 35,
        color: "yellow",
        marginBottom: 8
    },

    screenInfo: {
        fontSize: 18,
        color: "lavender"
    },

    Body: {
        height: 450,
        backgroundColor: "white",
        borderRadius: 30,
        width: "90%",
        marginTop: 30,
        alignItems: "center",
        justifyContent: "center"
    },

    bodyText: {
        fontSize: 18,
        marginBottom: 20,
        color: "lightgrey",
        fontWeight: "600"
    },

    detailContainer: {
        // flexDirection: "row",
        alignItems: "center"
    },

    detailText: {
        fontSize: 18,
        color: "#f47b04",
        marginBottom: 10,
    },

    startBtn: {
        width: "70%",
        backgroundColor: "yellow",
        borderRadius: 10,
        marginTop: 30,
        paddingVertical: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'center'
    },

    startBtnText: {
        fontSize: 20
    }
})