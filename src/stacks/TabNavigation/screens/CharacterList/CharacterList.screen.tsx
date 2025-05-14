import {useNavigation} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import React, {useState} from 'react';
import {ActivityIndicator, Button, ScrollView} from 'react-native';
import CharacterCard from '../../../../components/characterCard';
import SearchBar from '../../../../components/searchContainer';
import {getCharacters} from '../../../../services/characterAPI';
import {MainStackNavigationProp} from '../../../Main/Main.routes';
import {styles} from './CharacterList.styled';

const CharacterListScreen = () => {
  const [search, setSearch] = useState('');

  const {navigate} = useNavigation<MainStackNavigationProp>();

  const {isPending, refetch, data} = useQuery({
    queryKey: ['characters', {search}],
    queryFn: () => getCharacters(search),
  });

  const handleSubmit = (submittedSearch: string) => {
    setSearch(submittedSearch);
    refetch();
  };

  return (
    <ScrollView style={styles.container}>
      <SearchBar onSubmit={handleSubmit} />

      {isPending ? (
        <ActivityIndicator size="large" color="#162C1B" />
      ) : (
        data?.characters.map(character => (
          <CharacterCard key={character.id} {...character} />
        ))
      )}

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
