import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import React, { useState } from 'react'
import { Slider, CheckBox } from 'react-native-elements'
import Firebase from '../firebase'
import { useDispatch, useSelector } from 'react-redux'
import { toggleLobby } from '../reduxslice/sevenputtSlice'

const pryColor = '#f47b04'
const firestore = Firebase.firestore()

const CreateGameForm = () => {

    const [gameType, setgameType] = useState("public")
    const [numberOfPlayers, setnumberOfPlayers] = useState(2)
    const { user, currentGame } = useSelector(state => state.sevenPutt)
    const [loading, setloading] = useState(false)

    const dispatch = useDispatch()

    const CreateGame = async () => {
        setloading(true)
    
        await firestore.collection("MultiPlayerGame").add({
            type: gameType,
            maxPlayers: numberOfPlayers,
            users: [
                {
                    userId: user?.uid,
                    equipments: { ...currentGame.equipments },
                    isHost: true
                }
            ]
        }).then(data => {
            const gameData = gameType === "public" ? { id: data.id, isOpen: true } : { id: data.id, key: data.id.substring(0, 6), isOpen: true }

            firestore.collection("MultiPlayerGame").doc(data.id).update(gameData)

            firestore.collection("MultiPlayerGame").doc(data.id).get().then(game => {
                dispatch(toggleLobby({ ...game.data() }))
            })
            

        }).catch(err => Alert.alert(err.message))

        return setloading(false)
    }

  return (
    <View style={styles.container}>
        <Text style={{ fontSize: 24, color: "yellow" }}>Create new Game</Text>
      
        <View style={styles.checkboxHolder}>
            <CheckBox
                title='public'
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checked={gameType === "public" ? true : false}
                onPress={() => setgameType("public")}
                containerStyle={{ backgroundColor: pryColor, borderColor: pryColor }}
                textStyle={{ color: "yellow", fontSize: 20 }}
            />

            <CheckBox
                title='private'
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checked={gameType !== "public" ? true : false}
                onPress={() => setgameType("private")}
                textStyle={{ color: "yellow", fontSize: 20 }}
                containerStyle={{ backgroundColor: pryColor, borderColor: pryColor }}
            />
        </View>

        <View style={{ width: "80%", marginVertical: 30 }}>
            <Slider
                value={numberOfPlayers}
                minimumValue={2}
                maximumValue={5}
                onValueChange={(value) => setnumberOfPlayers(value)}
                step={1}
                thumbStyle={{ height: 30 }}  
            />
            <Text style={{ textAlign: "center", fontSize: 20 }}>{numberOfPlayers} players</Text>
        </View>
        {
            !loading ? 
            <TouchableOpacity onPress={() => CreateGame()} style={{ backgroundColor: "yellow", width: "70%", paddingVertical: 10, borderRadius: 10 }}>
                <Text style={{ textAlign: "center", color: pryColor }}>Create Game</Text>
            </TouchableOpacity>
            :
            <View>
                <ActivityIndicator size="large" color="yellow" />
                <Text style={{ color: "yellow" }}>Creating Game</Text>
            </View>
        }
    </View>
  )
}

export default CreateGameForm

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: pryColor,
        paddingTop: 40,
        justifyContent: "center"
    },

    checkboxHolder: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 40
    },

    
})