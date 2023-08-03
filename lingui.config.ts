import type { LinguiConfig } from '@lingui/conf';
import { vueExtractor } from '@lingui/extractor-vue';

const config: LinguiConfig = {
  locales: ['en', 'nb'],
  catalogs: [
    {
      path: '<rootDir>/components/breadcrumbs/locales/{locale}/messages',
      include: ['<rootDir>/components/breadcrumbs'],
    },
    {
      path: '<rootDir>/components/button/locales/{locale}/messages',
      include: ['<rootDir>/components/button'],
    },
    {
      path: '<rootDir>/components/forms/locales/{locale}/messages',
      include: ['<rootDir>/components/forms/**/*.{js,vue}'],
    },
    {
      path: '<rootDir>/components/modal/locales/{locale}/messages',
      include: ['<rootDir>/components/modal/**/*.{js,vue}'],
    },
    {
      path: '<rootDir>/components/pill/locales/{locale}/messages',
      include: ['<rootDir>/components/pill/**/*.{js,vue}'],
    },
  ],
  sourceLocale: 'en',
  compileNamespace: 'es',
  extractors: [vueExtractor],
};

export default config;
