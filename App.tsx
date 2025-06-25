/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import { StyleSheet, useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from '@react-native-vector-icons/ionicons';


import { useTraderStore } from './src/store/useTraderStore'
import { UsernameScreen } from './src/screens/UsernameScreen'
import { CryptoListScreen } from './src/screens/CryptoListScreen'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let icon = 'home'
          if (route.name === 'Trade') icon = 'swap-horizontal'
          if (route.name === 'Leaderboard') icon = 'trophy'
          return <Ionicons name={icon} size={size} color={color} />
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="CryptoList" component={CryptoListScreen} />
     
    </Tab.Navigator>
  )
}

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const { username } = useTraderStore()

  return (
   <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {username ? (
            <Stack.Screen name="Main" component={MainTabs} />
          ) : (
            <Stack.Screen name="Username" component={UsernameScreen} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
