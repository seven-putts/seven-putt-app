import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PuttTile from './PuttTile'

const SectionInfo = ({ number, attempts }) => {
    const checkLetter = () => {
        if(number === "1") return "A"
        if(number === "2") return "B"
        if(number === "3") return "C"
        
        return "D"
     }

    return (
        <View style={styles.roundContainer}>
            <Text style={styles.roundText}>Section {checkLetter(number)}</Text>
            
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
               {
                   attempts.map((attempt, index) => {
                       return <PuttTile number={(index+1).toString()} attempt={attempt} key={(index+1).toString()} />
                   })
               } 
               
            </View>
        </View>
    )
}

const RoundCard = ({ name, results }) => {

  return (
    <View style={styles.container}>
        <Text style={styles.sectiontext}>{name}</Text>

        {
            results.map((section, index) => {
                return <SectionInfo number={(index+1).toString()} key={index} attempts={section} />
            })
        }       
    </View>
  )
}

export default RoundCard

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffcc80",
        padding: 20,
        borderRadius: 20,
        marginBottom: 20
    },

    sectiontext: {
        fontSize: 20,
        fontFamily: "Piazzolla_800ExtraBold",
        marginBottom: 10
    },

    roundContainer: {
        marginBottom: 20,
        // borderBottomWidth: 1,
        // borderBottomColor: "lavender" 
    },

    roundText: {
        marginBottom: 10,
        color: "#5030e6"
    }
})