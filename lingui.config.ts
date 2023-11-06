import type { LinguiConfig } from '@lingui/conf';
import { vueExtractor } from '@lingui/extractor-vue';
// @ts-expect-error issue in typings
import { extractor as defaultExtractor } from '@lingui/cli/api';
import { supportedLocales } from './components/util/i18n';

const config: LinguiConfig = {
  locales: supportedLocales as unknown as string[],
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
      path: '<rootDir>/components/attention/locales/{locale}/messages',
      include: ['<rootDir>/components/attention/**/*.{js,vue}'],
    },
    {
      path: '<rootDir>/components/steps/locales/{locale}/messages',
      include: ['<rootDir>/components/steps/**/*.{js,vue}'],
    },
  ],
  sourceLocale: 'en',
  compileNamespace: 'es',
  extractors: [defaultExtractor, vueExtractor],
};

export default config;
