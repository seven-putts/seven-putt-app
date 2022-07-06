import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useFonts, Piazzolla_800ExtraBold, Piazzolla_700Bold } from '@expo-google-fonts/piazzolla';
import AppLoading from 'expo-app-loading';
import { useNavigation } from '@react-navigation/native';
import PuttCard from '../components/PuttCard';
import { baskets } from '../FacilitiesData';
import { useSelector } from 'react-redux';

const pryColor = '#f47b04'

const SelectBasketScreen = () => {
    const navigation = useNavigation()
    const { currentGame } = useSelector(state => state.sevenPutt)

    const [fontsLoaded] = useFonts({
        Piazzolla_800ExtraBold,
        Piazzolla_700Bold
    });

    if(!fontsLoaded) return <AppLoading />

    return (
        <View style={styles.container}>
            <Text style={styles.pageTitle}>Select A Basket</Text>
            <Text style={styles.pageInfo}>Pick the type of Basket you want to play with</Text>
            
            <FlatList
                style={styles.puttContainer}
                data={baskets}
                keyExtractor={({ id }) => id.toString() }
                renderItem={({ item }) => ( <PuttCard data={item} gameMode={currentGame?.mode} type="basket"  navigation={navigation} /> )}
            />
        </View>
    )
}

export default SelectBasketScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        paddingTop: 40,
        backgroundColor: pryColor,
    },

    puttContainer: { 
        width: "100%", 
        backgroundColor: "#d9e0fd",
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        flex: 1, 
        paddingVertical: 20, 
    },

    pageTitle: {
        fontFamily: "Piazzolla_800ExtraBold",
        fontSize: 25,
        color: "yellow"
    },

    pageInfo: {
        fontFamily: "Piazzolla_700Bold",
        fontSize: 19,
        marginBottom: 10,
        color: "lavender"
    }
})