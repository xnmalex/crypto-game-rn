const path = require('path');
module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-native-async-storage|@react-navigation)/)',
  ],
   setupFiles: [
    './jest.setup.js',
  ],
};
