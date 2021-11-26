module.exports = {
	env: {
		browser: true,
		es6: true,
	},
	extends: [
		'airbnb',
		'plugin:react-hooks/recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier/@typescript-eslint',
		'plugin:prettier/recommended',
		'prettier/react',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: 'tsconfig.json',
		sourceType: 'module',
	},
	rules: {
		'class-methods-use-this':'off',
		'react/jsx-props-no-spreading': 'off',
		'global-require': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'import/extensions': 'off',
		'import/no-unresolved': ['error', { caseSensitive: true, commonjs: true }],
		'import/prefer-default-export': 'off',
		'arrow-body-style': 'off',
		'react/jsx-indent': 'off',
		'no-shadow': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'no-use-before-define': 'off',
		'no-useless-constructor': 'off',

		'no-param-reassign': ['error', { props: true, ignorePropertyModificationsFor: ['state'] }],
		'@typescript-eslint/no-useless-constructor': 'error',
		'@typescript-eslint/no-use-before-define': 'error',
		'react-hooks/exhaustive-deps': 'error',
		'react/jsx-boolean-value': ['error', 'always'],
		'@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
		'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
		'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
		'eol-last': ['error', 'windows'],
		'prettier/prettier': [
			'error',
			{
				endOfLine: 'crlf',
			},
		],
		'import/order': [
			'error',
			{
				groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
				'newlines-between': 'always',
			},
		],
		curly: ['error', 'all'],
	},
	settings: {
		'import/resolver': {
			node: {
				extensions: ['.js', '.jsx', '.ts', '.tsx'],
				moduleDirectory: ['node_modules', 'src/'],
			},
		},
	},
};
