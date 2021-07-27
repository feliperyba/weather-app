
module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint"],
    extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
    rules: {
        "@typescript-eslint/no-empty-function": "off",
        "max-len": ["error", { "code": 180 }],
        "indent": ["error", 4, { "SwitchCase": 1 }],
        "semi": ["error", "always"],
        "quotes": ["error", "double"],
        "comma-dangle": ["error", "never"],
        "object-curly-spacing": ["error", "always"],
        "arrow-parens": ["error", "as-needed"]
    },
    env: {
        browser: true,
        node: true
    },
    overrides: [
        {
            files: ["*.js"],
            rules: {
                "@typescript-eslint/no-var-requires": "off"
            }
        }
    ]
};