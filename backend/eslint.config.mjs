import eslint from '@eslint/js';
import tsEslint from 'typescript-eslint';
import * as stylistic from "@stylistic/eslint-plugin";

export default tsEslint.config(
    eslint.configs.recommended,
    tsEslint.configs.recommended,
    stylistic.configs.customize({
        rules: {
            "object-curly-spacing": ["error", "always"],
        },
    })
);