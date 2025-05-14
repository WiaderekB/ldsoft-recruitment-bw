import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 12,
  },
  arrowButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginHorizontal: 3,
    backgroundColor: '#E0E0E0',
    borderRadius: 999,
    elevation: 1, // subtle shadow on Android
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  arrowText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#333',
  },
  pageButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginHorizontal: 3,
    borderRadius: 999,
    backgroundColor: '#E0E0E0',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  activePageButton: {
    backgroundColor: '#162C1B',
  },
  pageText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  activePageText: {
    color: '#FFFFFF',
  },
});

export default styles;
