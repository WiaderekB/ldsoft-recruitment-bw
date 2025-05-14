import {useQuery} from '@tanstack/react-query';
import React, {useState} from 'react';
import {ActivityIndicator, ScrollView} from 'react-native';
import CharacterCard from '../../../../components/characterCard';
import SearchBar from '../../../../components/searchContainer';
import {getCharacters} from '../../../../services/characterAPI';
import {useLikedCharacters} from '../../../../services/LikedCharactersContext';
import {styles} from './FavoriteCharacters.styled';

const CharacterListScreen = () => {
  const [search, setSearch] = useState('');
  const {isLiked} = useLikedCharacters();

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

      {isPending && <ActivityIndicator size="large" color="#162C1B" />}

      {!isPending &&
        data?.characters
          .filter(character => isLiked(character.id.toString()))
          .map(character => (
            <CharacterCard key={character.id} {...character} />
          ))}
    </ScrollView>
  );
};

export default CharacterListScreen;
