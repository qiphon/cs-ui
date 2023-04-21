module.exports = {
  extends: require.resolve('@umijs/lint/dist/config/eslint'),
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx', '.js', '.jsx'],
    },
    'import/internal-regex': ['^@src/', '^@components/'],
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'import', 'prettier'],
  rules: {
    'import/order': [
      'warn',
      {
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: false,
        },
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling', 'index', 'unknown'],
        ],
        pathGroups: [
          {
            pattern: '@ahooksjs/**',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '@**/**',
            group: 'internal',
            position: 'after',
          },
        ],
      },
    ],
  },
};
