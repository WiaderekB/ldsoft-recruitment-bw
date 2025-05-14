import Ionicons from '@expo/vector-icons/Ionicons';
import React, {useEffect, useRef, useState} from 'react';
import {Animated, Text, TextInput, View} from 'react-native';
import styles from './searchContainer.styled';

interface SearchBarProps {
  onSubmit: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({onSubmit}) => {
  const [search, setSearch] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (search !== '') {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }).start();
    }
  }, [search]);

  const handleClear = () => {
    onSubmit('');
    setSearch('');
  };

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

        <Animated.View style={{opacity: fadeAnim}}>
          <Ionicons
            name={'close'}
            size={16}
            color={'#162C1B'}
            onPress={handleClear}
          />
        </Animated.View>
      </View>
    </View>
  );
};

export default SearchBar;
