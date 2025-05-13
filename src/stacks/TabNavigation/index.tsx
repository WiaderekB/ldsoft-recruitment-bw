import Ionicons from '@expo/vector-icons/Ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {CharacterListScreen} from './screens/CharacterList';
import {FavoriteCharactersScreen} from './screens/FavoriteCharacters';

const Tab = createBottomTabNavigator();

const TabIcon = ({
  name,
  focused,
}: {
  name: 'person' | 'star';
  focused: boolean;
}) => (
  <View style={styles.iconWrapper}>
    <Ionicons name={name} size={16} color={focused ? '#fff' : '#DAE4DC'} />
    <Text style={[styles.label, {color: focused ? '#fff' : '#DAE4DC'}]}>
      {name === 'person' ? 'ALL CHARACTERS' : 'LIKED CHARACTERS'}
    </Text>
  </View>
);

export const TabNavigationStack = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => {
        const isLiked = route.name === 'Liked characters';
        return {
          tabBarActiveBackgroundColor: '#224229',
          tabBarInactiveBackgroundColor: '#162C1B',
          tabBarShowLabel: false,
          tabBarStyle: {
            paddingBottom: 0,
          },
          tabBarIcon: ({focused}) => (
            <TabIcon name={isLiked ? 'star' : 'person'} focused={focused} />
          ),
        };
      }}>
      <Tab.Screen
        name="All characters"
        component={CharacterListScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Liked characters"
        component={FavoriteCharactersScreen}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  iconWrapper: {
    alignItems: 'center',
    paddingTop: 18,
    gap: 6,
    width: 150,
  },
  label: {
    fontSize: 14,
  },
});
