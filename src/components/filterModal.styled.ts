import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 8,
    zIndex: 9999,
    elevation: 9999, // for Android
  },
  shadow: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#162C1B',
    borderRadius: 24,
    width: '100%',
    height: '100%',
    top: 8,
    left: 8,
    zIndex: 1,
  },
  card: {
    borderWidth: 1,
    borderColor: '#162C1B',
    padding: 16,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    width: '100%',
    zIndex: 1,
  },
  section: {
    marginBottom: 16,
  },
  label: {
    color: '#59695C',
    fontWeight: '500',
    fontSize: 18,
    marginBottom: 8,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  checkboxText: {
    marginLeft: 8,
    color: '#162C1B',
    fontSize: 18,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 9999,
  },
  resetButton: {
    borderWidth: 1,
    borderColor: '#162C1B',
  },
  resetText: {
    color: '#162C1B',
    fontWeight: '600',
    fontSize: 16,
  },
  applyButton: {
    backgroundColor: '#162C1B',
  },
  applyText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
});
