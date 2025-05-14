// components/SearchBar.tsx

import Ionicons from '@expo/vector-icons/Ionicons';
import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

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

const styles = StyleSheet.create({
  navigationContainer: {
    gap: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 32,
  },
  searchContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 24, // rounded-3xl ≈ 24
    borderColor: '#162C1B',
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 8,
    fontSize: 16,
    color: '#000', // You can change this depending on your design
  },
});

export default SearchBar;
