import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Intro from './app/screens/intro';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TelaNota from './app/screens/TelaNota';
import DetalheNota from './app/components/DetalheNota';
import { NavigationContainer } from '@react-navigation/native';
import NotaProvisoria from './app/context/NotaProvisoria';

const Stack = createNativeStackNavigator()

export default function App() {
  const [user, setUser] = useState({})
  const [primeiroLogin, setPrimeiroLogin] = useState(false)
  const AcharUser = async () => {
    const result = await AsyncStorage.getItem('user');

    if(result === null) return setPrimeiroLogin(true)

    setUser(JSON.parse(result))
    setPrimeiroLogin(false)

  };

  useEffect(() => {
    AcharUser()
  }, []);

  const renderTelaNota = props => <TelaNota {...props} user={user} />

  return ((primeiroLogin) ? <Intro onFinish={AcharUser} /> : (
    <NavigationContainer>
      <NotaProvisoria>
        <Stack.Navigator screenOptions={{ headerTitle: '', headerTransparent: true, }}>
          <Stack.Screen component={renderTelaNota} name='TelaNota' />
          <Stack.Screen component={DetalheNota} name='DetalheNota' />
        </Stack.Navigator>
      </NotaProvisoria>
    </NavigationContainer>
  ))
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
