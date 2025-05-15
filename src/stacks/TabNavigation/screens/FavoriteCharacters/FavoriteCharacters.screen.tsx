import {useQuery} from '@tanstack/react-query';
import React, {useState} from 'react';
import {ActivityIndicator, ScrollView, Text, View} from 'react-native';
import CharacterCard from '../../../../components/characterCard';
import SearchBar from '../../../../components/searchContainer';
import {getFavouriteCharacters} from '../../../../services/characterAPI';
import {useLikedCharacters} from '../../../../services/LikedCharactersContext';
import {styles} from './FavoriteCharacters.styled';

const CharacterListScreen = () => {
  const [search, setSearch] = useState('');
  const {likedCharacters} = useLikedCharacters();
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [selectedSpecies, setSelectedSpecies] = useState<string>('');

  const {isPending, refetch, data} = useQuery({
    queryKey: [
      'characters',
      [...likedCharacters],
      {search, selectedStatus, selectedSpecies},
    ],
    queryFn: () =>
      getFavouriteCharacters(
        [...likedCharacters],
        search,
        selectedStatus,
        selectedSpecies,
      ),
  });

  const handleSearch = (submittedSearch: string) => {
    setSearch(submittedSearch);
    refetch();
  };
  const handleFilter = (selectedStatus: string, selectedSpecies: string) => {
    setSelectedSpecies(selectedSpecies);
    setSelectedStatus(selectedStatus);
    refetch();
  };

  const noResults = data?.characters.length === 0;

  return (
    <ScrollView style={styles.container}>
      <SearchBar handleSearch={handleSearch} handleFilter={handleFilter} />

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
        data?.characters.map(character => (
          <CharacterCard key={character.id} {...character} />
        ))}
    </ScrollView>
  );
};

export default CharacterListScreen;
