import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  navigationContainer: {
    gap: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 32,
  },
  searchContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 24, // rounded-3xl ≈ 24
    borderColor: '#162C1B',
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 8,
    fontSize: 16,
    color: '#000', // You can change this depending on your design
  },
});

export default styles;
