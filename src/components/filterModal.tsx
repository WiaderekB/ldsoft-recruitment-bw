import React, {useEffect, useRef} from 'react';
import {Animated, Text, TouchableOpacity, View} from 'react-native';
import {CheckBox} from 'react-native-btr';
import {styles} from './filterModal.styled';

interface FilterModalProps {
  visible: boolean;
  handleFilter: (selectedStatus: string, selectedSpecies: string) => void;
}

const FiltersModal = ({visible, handleFilter}: FilterModalProps) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const [selectedStatus, setSelectedStatus] = React.useState<string>('');
  const [selectedSpecies, setSelectedSpecies] = React.useState<string>('');
  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 30,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, fadeAnim, slideAnim]);

  const statusOptions = ['Alive', 'Dead', 'Unknown'];
  const speciesOptions = ['Human', 'Humanoid'];

  const resetFilters = () => {
    setSelectedStatus('');
    setSelectedSpecies('');
  };

  const handleSelect = (fn: Function, option: string, selected: string) => {
    if (selected === option) {
      fn('');
    } else {
      fn(option);
    }
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{translateY: slideAnim}],
        },
      ]}>
      <View style={styles.shadow} />

      <View style={styles.card}>
        <View style={styles.section}>
          <Text style={styles.label}>STATUS</Text>
          {statusOptions.map(option => (
            <TouchableOpacity
              key={option}
              style={styles.checkboxRow}
              onPress={() =>
                handleSelect(setSelectedStatus, option, selectedStatus)
              }>
              <CheckBox
                checked={selectedStatus == option}
                onPress={() =>
                  handleSelect(setSelectedStatus, option, selectedStatus)
                }
                borderRadius={4}
                color={selectedStatus === option ? '#162C1B' : '#DAE4DC'}
              />
              <Text style={styles.checkboxText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>SPECIES</Text>
          {speciesOptions.map(option => (
            <TouchableOpacity
              key={option}
              style={styles.checkboxRow}
              onPress={() =>
                handleSelect(setSelectedSpecies, option, selectedSpecies)
              }>
              <CheckBox
                checked={selectedSpecies == option}
                onPress={() =>
                  handleSelect(setSelectedSpecies, option, selectedSpecies)
                }
                borderRadius={4}
                color={selectedSpecies === option ? '#162C1B' : '#DAE4DC'}
              />
              <Text style={styles.checkboxText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.actionRow}>
          <TouchableOpacity
            onPress={resetFilters}
            style={[styles.button, styles.resetButton]}>
            <Text style={styles.resetText}>RESET</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleFilter(selectedStatus, selectedSpecies)}
            style={[styles.button, styles.applyButton]}>
            <Text style={styles.applyText}>APPLY</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
};

export default FiltersModal;
