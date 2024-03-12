module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module"
  },
  plugins: ["eslint-plugin-import", "@typescript-eslint/eslint-plugin"],
  extends: ["plugin:@typescript-eslint/recommended", "prettier"],
  root: true,
  env: {
    node: true,
    jest: true
  },
  ignorePatterns: [".eslintrc.js"],
  rules: {
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "import/order": [
      "warn",
      {
        alphabetize: {
          order: "asc",
          caseInsensitive: true
        },
        "newlines-between": "always",
        groups: [
          ["builtin", "external"],
          ["internal", "unknown"],
          ["parent", "sibling"]
        ],
        pathGroups: [
          {
            pattern: "constant",
            group: "internal"
          },
          {
            pattern: "constant/**",
            group: "internal"
          },
          {
            pattern: "controllers/**",
            group: "internal"
          },
          {
            pattern: "DTOs/**",
            group: "internal"
          },
          {
            pattern: "interfaces/**",
            group: "internal"
          },
          {
            pattern: "modules/**",
            group: "internal"
          },
          {
            pattern: "schemas/**",
            group: "internal"
          },
          {
            pattern: "services/**",
            group: "internal"
          }
        ],
        pathGroupsExcludedImportTypes: []
      }
    ]
  }
};
