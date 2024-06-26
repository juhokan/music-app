module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    "max-len": ["warn", { "code": 120 }],
    "@typescript-eslint/indent": ["warn", 2],
    "@typescript-eslint/semi": ["error", "never"],
    "@typescript-eslint/comma-dangle": ["error", "never"],
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/ban-types": "off",
    "jsx-quotes": ["error", "prefer-single"],
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
