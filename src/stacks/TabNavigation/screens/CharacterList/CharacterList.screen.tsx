import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Button, ScrollView} from 'react-native';
import CharacterCard from '../../../../components/characterCard';
import {MainStackNavigationProp} from '../../../Main/Main.routes';
import {styles} from './CharacterList.styled';

const CharacterListScreen = () => {
  const {navigate} = useNavigation<MainStackNavigationProp>();
  return (
    <ScrollView style={styles.container}>
      <CharacterCard
        gender="Female"
        image="https://rickandmortyapi.com/api/character/avatar/1.jpeg"
        status="Alive"
        species="Human"
        name="Rick Sanchez"
        id={1}
        origin={{
          name: 'Earth',
          url: 'https://rickandmortyapi.com/api/location/1',
        }}
      />

      <Button
        title="Navigate to Details screen"
        onPress={(): void => {
          navigate('CharacterDetailsStack', {
            screen: 'CharacterDetailsScreen',
          });
        }}
      />
    </ScrollView>
  );
};

export default CharacterListScreen;
