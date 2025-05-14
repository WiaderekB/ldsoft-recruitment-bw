import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {Character} from '../services/characterAPI';
import {useLikedCharacters} from '../services/LikedCharactersContext';
import styles from './characterCard.styled';

type CharacterProps = Character;

const CharacterCard = ({
  id,
  name,
  status,
  species,
  image,
  ...rest
}: CharacterProps) => {
  const {isLiked, toggleLike} = useLikedCharacters();
  const liked = isLiked(id.toString());
  return (
    <View style={styles.container}>
      <View style={styles.cardWrapper}>
        <View style={styles.cardShadow} />
        <View style={styles.card}>
          <View style={styles.infoSection}>
            <View>
              <Text style={styles.label}>NAME</Text>
              <Text style={styles.value}>{name}</Text>
            </View>
            <View style={styles.infoGroup}>
              <Text style={styles.label}>STATUS</Text>
              <Text style={styles.value}>{status}</Text>
            </View>
            <View style={styles.infoGroup}>
              <Text style={styles.label}>SPECIES</Text>
              <Text style={styles.value}>{species}</Text>
            </View>
          </View>

          <View style={styles.imageSection}>
            <Image
              source={{uri: image}}
              style={styles.image}
              resizeMode="cover"
            />
            <TouchableOpacity
              onPress={() => toggleLike(id.toString())}
              style={[
                styles.likeButton,
                liked ? styles.likedButton : styles.unlikedButton,
              ]}>
              {liked ? (
                <Ionicons name={'star'} size={16} color={'#F89F34'} />
              ) : (
                <Ionicons name={'star-outline'} size={16} color={'#000'} />
              )}

              <Text style={styles.likeText}>LIKE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CharacterCard;
