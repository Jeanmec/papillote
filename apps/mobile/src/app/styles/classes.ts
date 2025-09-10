import { title } from 'process';
import { StyleSheet } from 'react-native';

export const primaryColor = '#8e4ddf';
export const secondaryColor = '#f8e1fc';

export const classes = StyleSheet.create({
  container: {
    flex: 1,
    width: '90%',
    marginVertical: 0,
    alignSelf: 'center',
    height: '100%',
  },

  tag: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    overflow: 'hidden',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  mainButton: {
    backgroundColor: secondaryColor,
    color: primaryColor,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
    width: '100%',
    fontWeight: 'bold',
  },
  description: { color: '#555' },
  imgCard: { width: '100%', height: '50%', borderRadius: 12 },
});
