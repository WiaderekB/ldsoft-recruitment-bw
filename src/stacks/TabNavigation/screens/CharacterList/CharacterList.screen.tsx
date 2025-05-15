import {useQuery} from '@tanstack/react-query';
import React, {useState} from 'react';
import {ActivityIndicator, ScrollView, Text, View} from 'react-native';
import CharacterCard from '../../../../components/characterCard';
import PaginationContainer from '../../../../components/paginationContainer';
import SearchBar from '../../../../components/searchContainer';
import {getCharacters} from '../../../../services/characterAPI';
import {styles} from './CharacterList.styled';

const CharacterListScreen = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [selectedSpecies, setSelectedSpecies] = useState<string>('');

  const {isPending, refetch, data} = useQuery({
    queryKey: ['characters', {search, selectedStatus, selectedSpecies, page}],
    queryFn: () => getCharacters(search, selectedStatus, selectedSpecies, page),
  });

  const handleSearch = (text: string) => {
    setSearch(text);
    refetch();
  };
  const handleFilter = (selectedStatus: string, selectedSpecies: string) => {
    setSelectedSpecies(selectedSpecies);
    setSelectedStatus(selectedStatus);
    refetch();
  };

  const scrollRef = React.useRef<ScrollView>(null);
  const onPressTouch = () => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  const noResults = data?.characters?.length === 0;

  return (
    <ScrollView style={styles.container} ref={scrollRef}>
      <SearchBar handleSearch={handleSearch} handleFilter={handleFilter} />
      {isPending && <ActivityIndicator size="large" color="#162C1B" />}

      {!isPending &&
        data?.characters.map(character => (
          <CharacterCard key={character.id} {...character} />
        ))}

      {noResults && !isPending && (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            No characters found. Try a different search!
          </Text>
        </View>
      )}

      {!noResults && !isPending && (
        <PaginationContainer
          handlePageSelect={(page: number) => {
            onPressTouch();
            setPage(page);
          }}
          totalPages={data?.totalPages || 1}
          currentPage={page}
        />
      )}
    </ScrollView>
  );
};

export default CharacterListScreen;
