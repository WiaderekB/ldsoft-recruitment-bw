import {useQuery} from '@tanstack/react-query';
import React, {useState} from 'react';
import {ActivityIndicator, ScrollView, Text, View} from 'react-native';
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

  const likedCharacters = data?.characters.filter(character =>
    isLiked(character.id.toString()),
  );

  const noResults = likedCharacters?.length === 0;

  return (
    <ScrollView style={styles.container}>
      <SearchBar onSubmit={handleSubmit} />

      {isPending && <ActivityIndicator size="large" color="#162C1B" />}

      {!isPending && noResults && (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            No favorites yet! Start liking characters to see them here
          </Text>
        </View>
      )}

      {!isPending &&
        !noResults &&
        likedCharacters?.map(character => (
          <CharacterCard key={character.id} {...character} />
        ))}
    </ScrollView>
  );
};

export default CharacterListScreen;
