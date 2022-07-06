import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useFonts, Piazzolla_800ExtraBold, Piazzolla_700Bold } from '@expo-google-fonts/piazzolla';
import PuttCardWithoutImage from '../components/PuttCardWithoutImage';
import AppLoading from 'expo-app-loading';
import { useRoute } from '@react-navigation/native';
import { Plastics } from '../FacilitiesData';
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'

const SelectPlastic = () => {
    const [fontsLoaded] = useFonts({
        Piazzolla_800ExtraBold,
        Piazzolla_700Bold
    });

    const navigation = useNavigation()
    const dispatch = useDispatch()

    const { params } = useRoute()

    if(!fontsLoaded) return <AppLoading />

    return (
        <View style={styles.container}>
            <Text style={styles.pageTitle}>Select A Plastic</Text>
            <Text style={styles.pageInfo}>Select the plastic you want play with</Text>
            
            <ScrollView style={{ width: "100%" }}>
                <View style={styles.puttContainer}>
                    {
                        Plastics.filter(item => item.companyId === params.companyId).map(item => <PuttCardWithoutImage navigation={navigation} dispatch={dispatch} data={item} id={item.id} name={item.name} key={item.id} type="Plastic Tile" />)
                    }
                </View>
            </ScrollView>
        </View>
    )
}

export default SelectPlastic

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        paddingTop: 40,
        backgroundColor: "#5030e6",
    },

    puttContainer: { 
        width: "100%",
        flex: 1, 
        paddingVertical: 20,
        flexWrap: "wrap",
        flexDirection: 'row',
        justifyContent: "center"
    },

    pageTitle: {
        fontFamily: "Piazzolla_800ExtraBold",
        fontSize: 25,
        color: "lightgreen"
    },

    pageInfo: {
        fontFamily: "Piazzolla_700Bold",
        fontSize: 19,
        marginBottom: 10,
        color: "lavender"
    }
})