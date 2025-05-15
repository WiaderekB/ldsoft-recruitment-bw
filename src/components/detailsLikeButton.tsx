import Ionicons from '@expo/vector-icons/Ionicons';
import React, {useMemo} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {useLikedCharacters} from '../services/LikedCharactersContext';
import styles from './detailsLikeButton.styled';

const DetailsLikeButton = ({id}: {id: string}) => {
  const {isLiked, toggleLike} = useLikedCharacters();

  const liked = useMemo(() => isLiked(id), [id, isLiked]);

  const iconName = liked ? 'star' : 'star-outline';
  const iconColor = liked ? '#F89F34' : '#000';
  const label = liked ? 'Remove from Favorites' : 'Add to Favorites';

  return (
    <TouchableOpacity
      style={styles.favoriteButton}
      onPress={() => toggleLike(id)}>
      <Ionicons name={iconName} size={16} color={iconColor} />
      <Text style={styles.favoriteText}>{label}</Text>
    </TouchableOpacity>
  );
};

export default DetailsLikeButton;
