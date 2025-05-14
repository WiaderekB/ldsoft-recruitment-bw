import Ionicons from '@expo/vector-icons/Ionicons';
import React, {useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import styles from './searchContainer.styled';

interface SearchBarProps {
  onSubmit: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({onSubmit}) => {
  const [search, setSearch] = useState('');

  return (
    <View style={styles.navigationContainer}>
      <Text style={styles.title}>Characters</Text>
      <View style={styles.searchContainer}>
        <Ionicons name={'search'} size={16} color={'#162C1B'} />
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search the characters"
          placeholderTextColor="#2B2D4299"
          onSubmitEditing={() => onSubmit(search)}
          style={styles.searchInput}
        />
      </View>
    </View>
  );
};

export default SearchBar;
