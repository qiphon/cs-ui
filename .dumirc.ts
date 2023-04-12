import { defineConfig } from 'dumi';

export default defineConfig({
  apiParser: {},
  resolve: {
    entryFile: './src/index.ts',
  },
  outputPath: 'build',
  themeConfig: {
    name: 'cs-ui',
  },
  lessLoader: {
    modifyVars: {
      '@primary-color': '#0cbf9f',
    },
    javascriptEnabled: true,
  },
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
    ],
  ],
});
