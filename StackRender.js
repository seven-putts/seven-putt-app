import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LoadingScreen from './components/LoadingScreen'
import Firebase from './firebase'
import HomeStack from './stacks/HomeStack'
import InGameStack from './stacks/InGameStack'
import AuthStack from './stacks/AuthStack'
import { login, logout } from './reduxslice/sevenputtSlice'
import { NavigationContainer } from '@react-navigation/native'

const auth = Firebase.auth()
const firestore = Firebase.firestore()

function StackRender() {
    const { inGame } = useSelector(state => state.sevenPutt)

    if(inGame) return <InGameStack />
    return <HomeStack />

}

const RootNavigator = () => {
    const [loading, setloading] = useState(true)
    const dispatch = useDispatch()

    const { user } = useSelector(state => state.sevenPutt)

    useEffect(() => {
        auth.onAuthStateChanged(async authenticatedUser => {
            setloading(true)

            if(authenticatedUser){
                await firestore.collection("users").doc(authenticatedUser.uid).get()
                .then(user => dispatch(login(user.data())))
            } else{
                dispatch(logout()) 
            }
            
            setloading(false)
        });
    }, [])

    if(loading) return <LoadingScreen />

    if(!user) return (
        <NavigationContainer>
            <AuthStack />
        </NavigationContainer>
    )

    return (
        <NavigationContainer>
            <StackRender />
        </NavigationContainer>
    )


}

export default RootNavigator