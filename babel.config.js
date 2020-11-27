module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        root: ['./src'],
        alias: {
          components: './src/components',
          containers: './src/containers',
          utils: './src/utils',
          assets: './src/assets',
          app: './src/app',
          styles: './src/styles',
          constants: './src/constants',
          hooks: './src/hooks',
          config: './src/config',
          services: './src/services',
          types: './src/types',
        },
      },
    ],
  ],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};
