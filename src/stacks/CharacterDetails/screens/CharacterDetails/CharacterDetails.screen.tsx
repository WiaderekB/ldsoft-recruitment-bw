import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Text, View} from 'react-native';
import {MainStackNavigationProp} from '../../../Main/Main.routes';
import {styles} from './CharacterDetails.styled';

const CharacterDetailsScreen = () => {
  const {navigate} = useNavigation<MainStackNavigationProp>();

  return (
    <View style={styles.container}>
      <Text
        onPress={(): void => {
          navigate('TabNavigationStack', {
            screen: 'CharacterListScreen',
          });
        }}
        style={styles.backButton}>
        &larr; Go back to Characters List
      </Text>
    </View>
  );
};

export default CharacterDetailsScreen;
