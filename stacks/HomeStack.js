import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SelectPutt from '../screens/SelectPuttScreen'
import SelectBasketScreen from '../screens/SelectBasketScreen';
import StartGameScreeen from '../screens/StartGameScreeen';
import { Icon } from 'react-native-elements';
import CompanySelect from '../screens/CompanySelect';
import SelectPlastic from '../screens/SelectPlastic';
import SelectMPMode from '../screens/SelectMPMode';
import CreateGameForm from '../screens/CreateGameForm';
import MPLobby from '../screens/MPLobby';
import JoinScreen from '../screens/JoinScreen';
import { useSelector } from 'react-redux';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator()

const tabBarStyle = { paddingBottom: 5, borderRadius: 20 }
const pryColor = '#f47b04'


function Home() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarStyle, tabBarShowLabel: false  }}>
      <Tab.Screen name="Welcome"
        component={HomeScreen}
        options={{ tabBarIcon: ({focused}) => ( <Icon type="material" name="home" size={30} color={focused ? pryColor : "gray"} /> )}}
      />
      
      <Tab.Screen name="Profile" 
        component={ProfileScreen} 
        options={{ tabBarIcon: ({focused}) => ( <Icon type="material" name="person" size={30} color={focused ? pryColor : "gray"} /> )}}
      />
    </Tab.Navigator>
  );
}

const HomeStack = () => {
  const { inLobby } = useSelector(state => state.sevenPutt)

  if(inLobby) return (
    <Stack.Navigator screenOptions={{ headerShown: false  }}>
      <Stack.Screen name="MPLobby" component={MPLobby} />
    </Stack.Navigator>
  )

  return (
    <Stack.Navigator screenOptions={{ headerShown: false  }}>
      <Stack.Screen
        name="Home"
        component={Home}
      />
      
      <Stack.Screen name="SelectCompany" component={CompanySelect} />
      <Stack.Screen name="SelectPutt" component={SelectPutt} />
      {/* <Stack.Screen name="SelectCompanyPlastic" component={SelectCompanyPlastic} /> */}
      <Stack.Screen name="SelectPlastic" component={SelectPlastic} />
      <Stack.Screen name="SelectBasket" component={SelectBasketScreen} />
      <Stack.Screen name="SelectMPMode" component={SelectMPMode} />
      <Stack.Screen name="CreateGame" component={CreateGameForm} />
      <Stack.Screen name="JoinGame" component={JoinScreen} />
      <Stack.Screen name="Ready" component={StartGameScreeen} />
    </Stack.Navigator>
  )
}

export default HomeStack
