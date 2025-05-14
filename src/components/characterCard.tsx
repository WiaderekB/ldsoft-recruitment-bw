import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Character} from '../services/characterAPI';
import {useLikedCharacters} from '../services/LikedCharactersContext';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardWrapper: {
    position: 'relative',
  },
  cardShadow: {
    position: 'absolute',
    backgroundColor: '#162C1B',
    borderRadius: 24,
    width: '98%',
    height: '90%',
    zIndex: 0,
    bottom: 16,
    marginLeft: 8,
  },
  card: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#162C1B',
    padding: 16,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    marginBottom: 24,
    zIndex: 10,
    marginRight: 8,
  },
  infoSection: {
    width: '40%',
  },
  infoGroup: {
    marginTop: 8,
  },
  label: {
    color: '#59695C',
    fontWeight: '500',
    fontSize: 12,
  },
  value: {
    color: '#162C1B',
    fontWeight: '600',
    fontSize: 16,
  },
  imageSection: {
    width: '60%',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#162C1B',
  },
  likeButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    padding: 8,
    borderRadius: 9999,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 82,
    height: 34,
    borderWidth: 1,
    borderColor: '#162C1B',
  },
  likedButton: {
    backgroundColor: '#DAE4DC',
  },
  unlikedButton: {
    backgroundColor: '#FFFFFF',
  },
  likeText: {
    color: '#162C1B',
    fontWeight: '500',
    fontSize: 14,
    marginLeft: 8,
  },
});

export default CharacterCard;
