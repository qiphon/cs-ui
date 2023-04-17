import { defineConfig } from 'dumi';
import tsConfig from './tsconfig.json';
import path from 'path';

export default defineConfig({
  apiParser: {},
  resolve: {
    entryFile: './src/index.ts',
    atomDirs: [
      {
        type: 'ui',
        dir: './src/',
      },
    ],
  },
  outputPath: 'build',
  themeConfig: {
    name: 'cs-ui',
  },
  // autoAlias: true,
  alias: Object.entries(tsConfig.compilerOptions.paths).reduce((tmp, next) => {
    const [key, value] = next;
    if (key.endsWith('*')) {
      tmp[key.slice(0, -2)] = path.join(__dirname, value[0].slice(0, -1));
    }
    return tmp;
  }, {} as Record<string, string>),
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
