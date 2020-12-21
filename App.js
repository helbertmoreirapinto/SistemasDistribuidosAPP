import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from './pages/Login'
import SignupScreen from './pages/SignUp'
import Enquetes from './pages/ListaEnquetes'
import EnqueteScreen from './pages/EnqueteScreen'
import EnqueteResult from './pages/EnqueteResult'
import NewEnquete from './pages/NewEnquete'
import { StatusBar } from 'react-native'

const Stack = createStackNavigator()
export default function App () {
  return (
    <NavigationContainer>
      <StatusBar barStyle={'light-content'} backgroundColor="#0c1424" />
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Cadastro" component={SignupScreen} options={{ headerShown: false }} />
        <Stack.Screen
          name="ListaEnquetes"
          component={Enquetes}
          options={{
            headerShown: true,
            headerLeft: null,
            title: 'Lista de enquetes',
            headerStyle: { backgroundColor: '#5dbcd2' },
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            headerTitleStyle: { color: 'white', fontSize: 22, fontWeight: 'bold', textAlign: 'center' }
          }}
        />
        <Stack.Screen
          name="EnqueteScreen"
          component={EnqueteScreen}
          options={({ route }) => ({
            headerStyle: { backgroundColor: '#5dbcd2' },
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            headerTitleStyle: { color: 'white', fontSize: 22, fontWeight: 'bold', textAlign: 'center' },
            headerShown: true,
            title: route.params.tituloEnquete
          })}
        />
        <Stack.Screen
          name="EnqueteResult"
          component={EnqueteResult}
          options={({ route }) => ({
            headerStyle: { backgroundColor: '#5dbcd2' },
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            headerTitleStyle: { color: 'white', fontSize: 22, fontWeight: 'bold', textAlign: 'center' },
            headerShown: true,
            title: route.params.tituloEnquete
          })}
        />
      <Stack.Screen
          name="NewEnquete"
          component={NewEnquete}
          options={({ route }) => ({
            headerStyle: { backgroundColor: '#5dbcd2' },
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            headerTitleStyle: { color: 'white', fontSize: 22, fontWeight: 'bold', textAlign: 'center' },
            headerShown: true,
            title: 'Nova Enquete'
          })}
          />
        </Stack.Navigator>
    </NavigationContainer>
  )
}
