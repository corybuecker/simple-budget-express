/* eslint-env node */
module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'prettier',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: true,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        tsconfigRootDir: __dirname,
    },
    plugins: ['@typescript-eslint'],
    root: true,
    ignorePatterns: [
        'jest.config.js',
        '.eslintrc.cjs',
        'public/**/*',
        'vendor/**/*',
        'tailwind.config.js',
    ],
    "rules": {
        "@typescript-eslint/no-misused-promises": "off"
    }
}
