import {useQuery} from '@tanstack/react-query';
import React, {useState} from 'react';
import {ActivityIndicator, ScrollView} from 'react-native';
import CharacterCard from '../../../../components/characterCard';
import PaginationContainer from '../../../../components/paginationContainer';
import SearchBar from '../../../../components/searchContainer';
import {getCharacters} from '../../../../services/characterAPI';
import {styles} from './CharacterList.styled';

const CharacterListScreen = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const {isPending, refetch, data} = useQuery({
    queryKey: ['characters', {search, page}],
    queryFn: () => getCharacters(search, page),
  });

  const handleSubmit = (submittedSearch: string) => {
    setSearch(submittedSearch);
    refetch();
  };

  const scrollRef = React.useRef<ScrollView>(null);
  const onPressTouch = () => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };
  return (
    <ScrollView style={styles.container} ref={scrollRef}>
      <SearchBar onSubmit={handleSubmit} />
      {isPending && <ActivityIndicator size="large" color="#162C1B" />}
      {!isPending &&
        data?.characters.map(character => (
          <CharacterCard key={character.id} {...character} />
        ))}

      <PaginationContainer
        handlePageSelect={(page: number) => {
          onPressTouch();
          setPage(page);
        }}
        totalPages={data?.totalPages || 1}
        currentPage={page}
      />
    </ScrollView>
  );
};

export default CharacterListScreen;
