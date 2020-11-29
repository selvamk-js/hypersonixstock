module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    // 'react-native/no-inline-styles': 0,
    // 'space-in-brackets': 0,
    // 'array-bracket-spacing': 0,
  },
  settings: {
    'import/resolver': {
      'babel-module': {
        alias: {
          components: './src/components',
          containers: './src/containers',
          utils: './src/utils',
          assets: './src/assets',
          app: './src/app/',
          styles: './src/styles',
          constants: './src/constants',
          hooks: './src/hooks',
          config: './src/config',
          services: './src/services',
          types: './src/types',
          helper: './src/helper',
        },
      },
    },
  },
};
