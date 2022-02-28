import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  button: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    alignSelf: 'flex-end',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#000000',
  },
  inactiveButton: {
    backgroundColor: '#000000',
  },
  activeButton: {
    backgroundColor: '#FFFFFF',
  },
  buttonText: {
    fontFamily: 'OpenSans-SemiBold',
  },
  inactiveButtonText: {
    color: '#FFFFFF',
  },
  activeButtonText: {
    color: '#000000',
  },
});
