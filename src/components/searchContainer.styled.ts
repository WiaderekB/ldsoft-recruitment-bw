import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  navigationContainer: {
    position: 'relative',
    gap: 16,
    paddingBottom: 8,
    width: '100%',
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
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 8,
    fontSize: 16,
    color: '#000',
  },
  buttonBase: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 9999,
    paddingVertical: 8,
    marginRight: 'auto',
    paddingLeft: 24,
    paddingRight: 16,
    marginBottom: 16,
    gap: 8,
  },
  buttonActive: {
    backgroundColor: '#162C1B',
  },
  buttonInactive: {
    backgroundColor: '#224229',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '400',
  },
});

export default styles;
