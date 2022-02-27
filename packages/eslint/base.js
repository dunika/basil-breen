module.exports = {
  extends: [
    'airbnb',
  ],
  plugins: [
    'import',
    'modules-newlines',
  ],
  rules: {
    'no-await-in-loop': 0,
    'no-param-reassign': [1, { props: false }],
    'no-shadow': 1,
    'no-nested-ternary': 1,
    'arrow-body-style': 0,
    'consistent-return': 1,
    'max-len': ['error', {
      code: 100,
      ignoreTemplateLiterals: true,
      ignoreStrings: true,
    }],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'modules-newlines/import-declaration-newline': 'error',
    'no-plusplus': 0,
    'import/prefer-default-export': 0,
    'object-property-newline': ['error', { allowAllPropertiesOnSameLine: false }],
    semi: [
      2,
      'never',
    ],
    'import/extensions': 0,
  },
  env: {
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
  },
}
