import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type CharacterDetailsStackParamList = {
  CharacterDetailsScreen: {
    id: number;
    name: string;
    status: string;
    species: string;
    image: string;
    origin: {
      name: string;
      url: string;
    };
    gender: string;
  };
};

export type CharacterDetailsStackNavigationProp =
  NativeStackNavigationProp<CharacterDetailsStackParamList>;

export const CharacterDetailsStackRoutes: {
  [route in keyof CharacterDetailsStackParamList]: route;
} = {
  CharacterDetailsScreen: 'CharacterDetailsScreen',
};
