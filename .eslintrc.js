module.exports = {
  plugins: ['jest'],
  parserOptions: {
    project: './tsconfig.json',
  },
  extends: [
    'next',
    'next/core-web-vitals',
    'airbnb',
    'airbnb-typescript',
    'plugin:jest/recommended',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    'jsx-a11y/label-has-associated-control': [2, {
      assert: 'either',
    }],
    "import/no-extraneous-dependencies": ["error", {
      "devDependencies": ["**/*.test.ts", "**/*.test.tsx", "jest.*", "mocks/**"]
    }]
  },
  ignorePatterns: [".eslintrc.js"],
};
