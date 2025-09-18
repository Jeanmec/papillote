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

  soonContainer: {
    position: 'relative',
  },
  soonOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: 'white',
    borderStyle: 'dashed',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  soonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },

  sectionCard: {
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#636e72',
  },

  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  pageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#2d3436',
  },

  centeredCard: {
    borderRadius: 20,
    padding: 25,
    marginBottom: 20,
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    backgroundColor: 'white',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },

  whiteText: {
    color: 'white',
  },
  boldWhiteText: {
    color: 'white',
    fontWeight: 'bold',
  },
  centerText: {
    textAlign: 'center',
  },
});
