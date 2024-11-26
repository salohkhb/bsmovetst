module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react/jsx-runtime"
    ],
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    rules: {
        "react/prop-types": "off",
        "no-unused-vars": "off",
        "no-empty": "off",
        "no-undef": "off",
        "no-unsafe-optional-chaining": "off",
        "no-extra-semi": "off",
        "no-inner-declarations": "off",
        "no-extra-boolean-cast": "off",
    }
}
