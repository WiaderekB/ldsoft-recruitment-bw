import Ionicons from '@expo/vector-icons/Ionicons';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {useLikedCharacters} from '../../../../services/LikedCharactersContext';
import {MainStackNavigationProp} from '../../../Main/Main.routes';
import {CharacterDetailsStackParamList} from '../../CharacterDetails.routes';
import {styles} from './CharacterDetails.styled';

const CharacterDetailsScreen = () => {
  const {goBack} = useNavigation<MainStackNavigationProp>();

  const route =
    useRoute<
      RouteProp<CharacterDetailsStackParamList, 'CharacterDetailsScreen'>
    >();
  const {id, name, status, species, image, origin, gender} = route.params;

  const {isLiked, toggleLike} = useLikedCharacters();
  const liked = isLiked(id.toString());

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => goBack()} style={styles.backTouchable}>
        <Text style={styles.backText}>&larr; Go back to Characters List</Text>
      </TouchableOpacity>

      <View style={styles.cardContainer}>
        <View style={styles.cardBackground} />

        <View style={styles.cardContent}>
          <View style={styles.imageWrapper}>
            <Image
              source={{uri: image}}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
          <View style={styles.section}>
            <Text style={styles.label}>NAME</Text>
            <Text style={styles.valueName}>{name}</Text>
          </View>

          <View style={styles.row}>
            <View style={styles.halfSection}>
              <Text style={styles.label}>STATUS</Text>
              <Text style={styles.value}>{status}</Text>
            </View>
            <View style={styles.halfSection}>
              <Text style={styles.label}>ORIGIN</Text>
              <Text style={styles.value}>{origin.name}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.halfSection}>
              <Text style={styles.label}>SPECIES</Text>
              <Text style={styles.value}>{species}</Text>
            </View>
            <View style={styles.halfSection}>
              <Text style={styles.label}>GENDER</Text>
              <Text style={styles.value}>{gender}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <TouchableOpacity
              style={styles.favoriteButton}
              onPress={() => toggleLike(id.toString())}>
              {liked ? (
                <Ionicons name={'star'} size={16} color={'#F89F34'} />
              ) : (
                <Ionicons name={'star-outline'} size={16} color={'#000'} />
              )}
              <Text style={styles.favoriteText}>
                {liked ? 'Remove from Favorites' : 'Add to Favorites'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CharacterDetailsScreen;
