import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppLoading from 'expo-app-loading';
import { useFonts, Piazzolla_800ExtraBold, Piazzolla_700Bold } from '@expo-google-fonts/piazzolla';
import { companyNames } from '../FacilitiesData';
import PuttCardWithoutImage from '../components/PuttCardWithoutImage';
import { useNavigation } from '@react-navigation/native';

const pryColor = '#f47b04'

const CompanySelect = () => {

    const [fontsLoaded] = useFonts({
        Piazzolla_800ExtraBold,
        Piazzolla_700Bold
    });

    const navigation = useNavigation()

    if(!fontsLoaded) return <AppLoading />

    return (
        <View style={styles.container}>
            <Text style={styles.pageTitle}>Select A Disc Company</Text>
            <Text style={styles.pageInfo}>Pick the company whose equipments you want to play with</Text>
            
            <ScrollView style={{ width: "100%" }}>
                <View style={styles.puttContainer}>
                    {
                        companyNames.map(item => <PuttCardWithoutImage navigation={navigation} id={item.id} name={item.name} key={item.id} />)
                    }
                </View>
            </ScrollView>
        </View>
    )
}

export default CompanySelect

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        paddingTop: 40,
        backgroundColor: pryColor,
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
        color: "yellow"
    },

    pageInfo: {
        fontFamily: "Piazzolla_700Bold",
        fontSize: 16,
        marginBottom: 10,
        color: "lavender",
        textAlign: "center"
    }
})