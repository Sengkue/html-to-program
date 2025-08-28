module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true
  },
  extends: [
    'eslint:recommended'
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  rules: {
    // Error prevention
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'no-undef': 'error',
    
    // Code style
    'indent': ['error', 2],
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    
    // Best practices
    'eqeqeq': 'error',
    'no-var': 'error',
    'prefer-const': 'error',
    'prefer-arrow-callback': 'warn',
    'no-multiple-empty-lines': ['error', { max: 2 }],
    'comma-dangle': ['error', 'never']
  },
  overrides: [
    {
      files: ['src/main/**/*.js'],
      env: {
        browser: false,
        node: true
      }
    },
    {
      files: ['src/renderer/**/*.js'],
      env: {
        browser: true,
        node: false
      },
      globals: {
        electronAPI: 'readonly',
        happyFiles: 'readonly'
      }
    }
  ]
};