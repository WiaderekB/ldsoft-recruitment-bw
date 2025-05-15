import Ionicons from '@expo/vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef} from 'react';
import {Animated, Image, Text, TouchableOpacity, View} from 'react-native';
import {Character} from '../services/characterAPI';
import {useLikedCharacters} from '../services/LikedCharactersContext';
import {MainStackNavigationProp} from '../stacks/Main/Main.routes';
import styles from './characterCard.styled';

type CharacterProps = Character;

const CharacterCard = ({
  id,
  name,
  status,
  species,
  image,
  gender,
  origin,
}: CharacterProps) => {
  const {isLiked, toggleLike} = useLikedCharacters();
  const liked = isLiked(id);
  const {navigate} = useNavigation<MainStackNavigationProp>();

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      delay: 100, // Short delay before starting the fade
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <TouchableOpacity
      onPress={(): void => {
        navigate('CharacterDetailsStack', {
          screen: 'CharacterDetailsScreen',
          params: {
            id,
            name,
            status,
            species,
            image,
            gender,
            origin,
          },
        });
      }}>
      <Animated.View style={{opacity: fadeAnim}}>
        <View style={styles.container}>
          <View style={styles.cardWrapper}>
            <View style={styles.cardShadow} />
            <View style={styles.card}>
              <View style={styles.infoSection}>
                <View style={styles.infoGroup}>
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
                  onPress={() => {
                    toggleLike(id);
                  }}
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
      </Animated.View>
    </TouchableOpacity>
  );
};

export default CharacterCard;
