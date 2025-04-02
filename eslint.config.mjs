import astro from 'eslint-plugin-astro';
import importPlugin from 'eslint-plugin-import';
import tseslint from 'typescript-eslint';
import tseslintPlugin from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';
import prettierPlugin from 'eslint-plugin-prettier';
import { configs } from '@eslint/js';

export default [
  // Base config for JavaScript and TypeScript files
  configs.recommended,
  {
    files: ['**/*.{js,ts,jsx,tsx,astro}'],
    plugins: {
      import: importPlugin,
      prettier: prettierPlugin,
      'typescript-eslint': tseslint,
      '@typescript-eslint': tseslintPlugin,
    },
    languageOptions: {
      parser: parser,
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
        project: './tsconfig.json',
      },

      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.ts',
          alwaysTryTypes: true,
        },
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.astro'], // Add `.astro` here for Astro files
        },
      },
    },
    rules: {
      'comma-dangle': 'off',
      'import/no-named-as-default': 'off',
      'prettier/prettier': 'warn', // Warn on Prettier violations
      'react/react-in-jsx-scope': 'off', // React not required in Astro
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/no-null': 'off',
      'unicorn/filename-case': 'off',
      'unicorn/no-useless-promise-resolve-reject': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-misused-promises': [
        2,
        {
          checksVoidReturn: {
            attributes: false,
          },
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      '@typescript-eslint/no-unnecessary-condition': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      'import/order': [
        'warn',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          'newlines-between': 'always',
        },
      ],
      'import/no-unresolved': 'error',
    },
  },
  // Extend Astro recommended configs
  ...astro.configs.recommended,
  // Astro files with TypeScript support
  {
    files: ['**/*.astro'],
    languageOptions: {
      parser: astro.processors['.astro'].parser,
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
        project: './tsconfig.json',
      },
    },
    rules: {
      'astro/no-conflict-set-directives': 'error', // Example Astro rule
    },
  },
];
