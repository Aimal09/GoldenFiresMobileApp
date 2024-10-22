const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  // Reduce the number of worker threads to reduce system load
  maxWorkers: 2,
  // Use a custom watchFolders setting to prevent watching unnecessary folders
  watchFolders: [],
  // Additional settings to help prevent too many open files issues
  server: {
    // Adjust the timeout for file watcher events
    enhanceMiddleware: (middleware) => middleware,
  },
  resolver: {
    blacklistRE: /node_modules\/.*\/node_modules\/react-native\/.*/,
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);