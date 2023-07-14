module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'babel-plugin-styled-components',
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@': './src',
          '@components': './src/components',
          '@screens': './src/screens',
          '@navigation': './src/navigation',
          '@assets': './src/assets',
        },
      },
    ],
    [
      "module:react-native-dotenv",
      {
        moduleName: "react-native-dotenv",
      },
    ],
  ],
};
