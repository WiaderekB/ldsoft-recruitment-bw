import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useRef} from 'react';
import {
  Animated,
  Easing,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DetailsLikeButton from '../../../../components/detailsLikeButton';
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

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(10)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        delay: 100,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        delay: 100,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => goBack()} style={styles.backTouchable}>
        <Text style={styles.backText}>&larr; Go back to Characters List</Text>
      </TouchableOpacity>

      <View style={styles.cardContainer}>
        <View style={styles.cardBackground} />

        <Animated.View
          style={[
            styles.cardContent,
            {
              opacity: fadeAnim,
              transform: [{translateY: slideAnim}],
            },
          ]}>
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
            <DetailsLikeButton id={id} />
          </View>
        </Animated.View>
      </View>
    </View>
  );
};

export default CharacterDetailsScreen;
