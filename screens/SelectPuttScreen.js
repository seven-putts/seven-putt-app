import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useFonts, Piazzolla_800ExtraBold, Piazzolla_700Bold } from '@expo-google-fonts/piazzolla';
import AppLoading from 'expo-app-loading';
import PuttCard from '../components/PuttCard';
import { useNavigation, useRoute } from '@react-navigation/native';
import { discs } from '../FacilitiesData';

const pryColor = '#f47b04'

const SelectPutt = () => {
    const navigation = useNavigation()
    const [fontsLoaded] = useFonts({
        Piazzolla_800ExtraBold,
        Piazzolla_700Bold
    });

    const { params } = useRoute()

    if(!fontsLoaded) return <AppLoading />
    return (
        <View style={styles.container}>
        <Text style={styles.pageTitle}>Select A Disc</Text>
        <Text style={styles.pageInfo}>Pick the type of disc you want to play with</Text>
        
        <FlatList
            style={styles.puttContainer}
            data={discs.filter(disc => disc.companyId === params.companyId)}
            keyExtractor={({ id }) => id.toString() }
            renderItem={({ item }) => ( <PuttCard data={item} navigation={navigation} companyId={params?.companyId} /> )}
        />
        </View>
    )
}

export default SelectPutt

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        paddingTop: 40,
        backgroundColor: pryColor,
    },

    puttContainer: { 
        width: "100%", 
        backgroundColor: "#f9efcf",
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