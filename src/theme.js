import { Platform } from 'react-native';

const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    textWhite: 'white',
    primary: '#0366d6',
    mainBackground: '#e1e4e8',
    appBarBackground: '#385170',
    repositoryItemBackground: 'white',
    formBackground: 'white',
    reviewItemBackground: 'white',
    ratingIconOuterCircle: '#0366d6',
    ratingIconInnerCircle: 'white',
    textInputBorder: 'gray',
    error: '#ff0000',
    deleteButton: '#da2d2d'
  },
  fontSizes: {
    body: 14,
    subheading: 16,
    heading: 20,
  },
  fonts: {
    main: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System',
    }),
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
  padding: {
    formHorizontal: 20,
    formVertical: 10,
    formInput: 10,
    formButtonVertical: 10,
    reviewItemHorizontal: 15,
    reviewItemVertical: 15,
  },
  borderRadius: {
    small: 5,
    normal: 10,
  }
};

export default theme;
