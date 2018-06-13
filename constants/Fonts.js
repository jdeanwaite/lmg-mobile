import { Platform } from 'react-native';

const defaultCopyFont = {
  fontSize: Platform.OS === 'ios' ? 16 : 16,
  fontFamily: 'Merriweather',
  lineHeight: 24,
};

export default {
  defaultCopyFont
};
