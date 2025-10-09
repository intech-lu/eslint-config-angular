import angular from 'angular-eslint';
import eslintConfig from '@intech.lu/eslint-config';
import { defineConfig } from 'eslint/config';

export default defineConfig(
  ...eslintConfig,
  {
    files: ["**/*.ts"],
    extends: [
      ...angular.configs.tsAll,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      // @angular-eslint already has a rule for this but only allows 
      // "Component" suffixes. This rule adds support for "Page" 
      // and "Modal" suffixes.
      '@angular-eslint/component-class-suffix': [
        'error',
        {
          suffixes: ['Component', 'Page', 'Modal'],
        },
      ],
      // Kebab case is the recommended way to name Angular components,
      // so we want to enforce this naming convention.
      // https://angular.dev/style-guide#component-selectors
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          style: 'kebab-case',
        },
      ],
      // Lower camel case is the recommended way to name Angular 
      // directives, so we want to enforce this naming convention.
      // https://angular.dev/style-guide#directive-selectors
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          style: 'camelCase',
        },
      ],
      // Empty functions should not go in production code, as they are a sign of
      // a mistake or a leftover from development. Just add a comment in the function
      // body to explain why it's empty and the error will go away.
      // However, we want to allow empty constructors, as they are common in Angular
      // for dependency injection (when not using inject() method) or to inject
      // data in modal components.
      'no-empty-function': ['error', { allow: ['constructors'] }],
      // Members are public by default in TypeScript classes, so we
      // don't need to explicitly declare them as public.
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        {
          accessibility: 'no-public',
          ignoredMethodNames: [
            'ngOnInit',
            'ngAfterViewInit',
            'ngAfterContentInit',
            'ngDoCheck',
            'ngAfterViewChecked',
            'ngAfterContentChecked',
            'ngOnChanges',
            'ngOnDestroy',
          ],
        },
      ],
      // Angular uses decorators to define props of a component,
      // which is changing with the introduction of signals. But still,
      // we want to enforce decorators to be places before constructor
      // and members.
      '@typescript-eslint/member-ordering': [
        'error',
        {
          default: {
            memberTypes: [
              'signature',
              'decorated-field',
              'field',
              'constructor',
              'method',
            ],
            order: 'as-written',
          },
        },
      ],
      "@typescript-eslint/no-extraneous-class": [
        "error",
        {
          allowWithDecorator: true,
        },
      ],
    },
  },
  {
    files: ["**/*.html"],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAll,
    ],
    rules: {
      // Even if it's not considered a good practice, it really too handy to call expressions
      // in Angular templates and reduce the amount of logic in the component class.
      '@angular-eslint/template/no-call-expression': 'off',
      // A project don't necessarily use Angular i18n, so we disable this rule.
      '@angular-eslint/template/i18n': 'off',
    }
  },
);
