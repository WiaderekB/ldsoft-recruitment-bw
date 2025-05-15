import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  favoriteButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    borderRadius: 999,
    width: '100%',
    backgroundColor: '#224229',
  },
  favoriteText: {
    color: 'white',
    fontWeight: '400',
    fontSize: 14,
    marginLeft: 8,
    textTransform: 'uppercase',
  },
});

export default styles;
