import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Lore MCP',
  tagline: 'Version control for AI coding context',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://ctx-stack.github.io',
  baseUrl: '/lore-docs/',

  organizationName: 'ctx-stack',
  projectName: 'lore-docs',
  trailingSlash: false,

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ko'],
    localeConfigs: {
      en: {
        label: 'English',
      },
      ko: {
        label: '한국어',
      },
    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/ctx-stack/lore-docs/tree/main/',
          routeBasePath: '/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: '🧠 Lore MCP',
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docs',
          position: 'left',
          label: 'Docs',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
        {
          href: 'https://lore-dashboard.jadecon2655.workers.dev',
          label: 'Dashboard',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Quick Start',
              to: '/quickstart',
            },
            {
              label: 'MCP Usage Guide',
              to: '/mcp-usage-guide',
            },
          ],
        },
        {
          title: 'Links',
          items: [
            {
              label: 'Dashboard',
              href: 'https://lore-dashboard.jadecon2655.workers.dev',
            },
            {
              label: 'PyPI',
              href: 'https://pypi.org/project/lore-mcp/',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} ctx-stack. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json', 'python'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
