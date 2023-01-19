import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';


import ScreenHome from '../containers/pages/ScreenHome'
import ScreenHomeForm from '../containers/pages/ScreenHomeForm';
import ScreenFilter from '../containers/pages/ScreenFilter'
import ScreenConfig from '../containers/pages/ScreenConfig'

import Colors from '../utils/Colors';

const HomeStack = createNativeStackNavigator();
const ScreenHomeTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="ScreenHome"
      screenOptions={{
        tabBarActiveTintColor: Colors.primary500,
        headerShown: false
      }}
    >
      <Tab.Screen
        name="Home"
        component={ScreenHome}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="ScreenFilter"
        component={ScreenFilter}
        options={{
          tabBarLabel: 'Filter',
          tabBarIcon: ({ color, size }) => (
            <Icon name="archive-sharp" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}
const Tab = createBottomTabNavigator();

function AppNavigation() {
  return (
    <NavigationContainer>
      <HomeStack.Navigator>
        <HomeStack.Screen name="ScreenHomeTab" component={ScreenHomeTab} options={{ headerShown: false }} />
        <HomeStack.Screen name="ScreenHomeForm" component={ScreenHomeForm}
          options={{
            title: 'Form Transaksi',
            headerStyle: {
              backgroundColor: Colors.primary500,
            },
            headerTintColor: Colors.white
          }}
        />
        <HomeStack.Screen name="ScreenConfig" component={ScreenConfig}
          options={{
            title: 'Konfigurasi',
            headerStyle: {
              backgroundColor: Colors.primary500,
            },
            headerTintColor: Colors.white,
            headerLeft: () => (
              <></>
            )
          }}
        />
      </HomeStack.Navigator>
    </NavigationContainer>
  );
}
export default AppNavigation;