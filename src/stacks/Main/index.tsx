import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Image} from 'react-native';
import {CharacterDetailsStack} from '../CharacterDetails';
import {TabNavigationStack} from '../TabNavigation';
import {MainStackRoutes} from './Main.routes';

const Tab = createNativeStackNavigator();

const LogoTitle = () => (
  <Image
    source={require('./logo.png')}
    style={{
      width: 105,
      paddingBottom: 32,
      marginLeft: 16,
    }}
    resizeMode="contain"
  />
);

export const MainStack = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerTitle: '',
        headerStyle: {
          backgroundColor: '#162C1B',
        },
        headerLeft: () => <LogoTitle />,
      }}>
      <Tab.Screen
        name={MainStackRoutes.TabNavigationStack}
        component={TabNavigationStack}
      />
      <Tab.Screen
        name={MainStackRoutes.CharacterDetailsStack}
        component={CharacterDetailsStack}
      />
    </Tab.Navigator>
  );
};
