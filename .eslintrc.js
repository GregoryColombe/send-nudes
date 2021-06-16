module.exports = {
    root: true,
    parserOptions: {
        parser: "babel-eslint"
    },
    env: {
        node: true,
        commonjs: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:vue/strongly-recommended",
    ],
    plugins: [],
    rules: {
        "indent": ["error", 4],
        "quotes": ["error", "double"],
        "vue/html-indent": ["error", 4, {
            closeBracket: 0,
            baseIndent: 1,
            alignAttributesVertically: true
        }],
        "vue/max-attributes-per-line": ["error", {
            multiline: {
                max: 1,
                allowFirstLine: false
            }
        }]
    },
}
