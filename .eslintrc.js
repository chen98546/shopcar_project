module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        // "eslint:recommended",
        "plugin:vue/essential"
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        // "parser": '@babel/eslint-parser'
    },
    "plugins": [
        "vue"
    ],
    "rules": {
        'no-console': 1,
        "vue/multi-word-component-names": "off"
    }
}