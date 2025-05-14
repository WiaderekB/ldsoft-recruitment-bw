import Ionicons from '@expo/vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Button,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import CharacterCard from '../../../../components/characterCard';
import {getCharacters} from '../../../../services/characterAPI';
import {MainStackNavigationProp} from '../../../Main/Main.routes';
import {styles} from './CharacterList.styled';

const CharacterListScreen = () => {
  const [search, setSearch] = useState('');
  const [submittedSearch, setSubmittedSearch] = useState(''); // Separate state for querying

  const {navigate} = useNavigation<MainStackNavigationProp>();

  const {isPending, refetch, data} = useQuery({
    queryKey: ['characters', {search: submittedSearch}], // use submittedSearch only
    queryFn: () => getCharacters(submittedSearch),
  });

  const handleSubmit = () => {
    setSubmittedSearch(search); // update the search used for fetching
    refetch();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.navigationContainer}>
        <Text style={styles.title}>Characters</Text>
        <View style={styles.searchContainer}>
          <Ionicons name={'search'} size={16} color={'#162C1B'} />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search the characters"
            placeholderTextColor="#2B2D4299"
            onSubmitEditing={handleSubmit}
            style={styles.searchInput}
          />
        </View>
      </View>

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
