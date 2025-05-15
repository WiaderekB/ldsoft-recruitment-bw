import Ionicons from '@expo/vector-icons/Ionicons';
import React, {useEffect, useRef, useState} from 'react';
import {Animated, Text, TextInput, TouchableOpacity, View} from 'react-native';
import FiltersModal from './filterModal';
import styles from './searchContainer.styled';

interface SearchBarProps {
  handleSearch: (text: string) => void;
  handleFilter: (selectedStatus: string, selectedSpecies: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({handleSearch, handleFilter}) => {
  const [search, setSearch] = useState('');
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

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

  useEffect(() => {
    Animated.spring(rotateAnim, {
      toValue: isFilterModalVisible ? 1 : 0,
      useNativeDriver: true,
      tension: 50,
      friction: 7,
    }).start();
  }, [isFilterModalVisible]);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
      tension: 50,
      friction: 7,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 50,
      friction: 7,
    }).start();
  };

  const handleClear = () => {
    handleSearch('');
    setSearch('');
  };

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-180deg'],
  });

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
          onSubmitEditing={() => handleSearch(search)}
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

      <Animated.View style={{transform: [{scale: scaleAnim}]}}>
        <TouchableOpacity
          onPress={() => setIsFilterModalVisible(prev => !prev)}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={[
            styles.buttonBase,
            isFilterModalVisible ? styles.buttonActive : styles.buttonInactive,
          ]}>
          <Text style={styles.buttonText}>FILTER</Text>
          <Animated.View style={{transform: [{rotateX: spin}]}}>
            <Ionicons name="chevron-down" size={14} color={'#fff'} />
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>

      <FiltersModal
        visible={isFilterModalVisible}
        handleFilter={(selectedStatus: string, selectedSpecies: string) => {
          setIsFilterModalVisible(false);
          handleFilter(selectedStatus, selectedSpecies);
        }}
      />
    </View>
  );
};

export default SearchBar;
