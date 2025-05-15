import React, {useEffect, useRef} from 'react';
import {Animated, Text, TouchableOpacity, View} from 'react-native';
import {CheckBox} from 'react-native-btr';
import {styles} from './filterModal.styled';

interface FilterModalProps {
  visible: boolean;
  selectedStatus: string[];
  selectedSpecies: string[];
  onSelectStatus: (list: string[]) => void;
  onSelectedSpecies: (list: string[]) => void;
  onConfirm: () => void;
}

const FiltersModal = ({
  visible,
  selectedStatus,
  selectedSpecies,
  onSelectStatus,
  onSelectedSpecies,
  onConfirm,
}: FilterModalProps) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

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

  const toggleItem = (
    value: string,
    currentList: string[],
    onChange: (list: string[]) => void,
  ) => {
    onChange(
      currentList.includes(value)
        ? currentList.filter(item => item !== value)
        : [...currentList, value],
    );
  };

  const resetFilters = () => {
    onSelectStatus([]);
    onSelectedSpecies([]);
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
                toggleItem(option, selectedStatus, onSelectStatus)
              }>
              <CheckBox
                checked={selectedStatus.includes(option)}
                onPress={() =>
                  toggleItem(option, selectedStatus, onSelectStatus)
                }
                borderRadius={4}
                color={selectedStatus.includes(option) ? '#162C1B' : '#DAE4DC'}
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
                toggleItem(option, selectedSpecies, onSelectedSpecies)
              }>
              <CheckBox
                checked={selectedSpecies.includes(option)}
                onPress={() =>
                  toggleItem(option, selectedSpecies, onSelectedSpecies)
                }
                borderRadius={4}
                color={selectedSpecies.includes(option) ? '#162C1B' : '#DAE4DC'}
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
            onPress={onConfirm}
            style={[styles.button, styles.applyButton]}>
            <Text style={styles.applyText}>APPLY</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
};

export default FiltersModal;
