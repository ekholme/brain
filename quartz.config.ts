import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4.0 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Brain",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "ekholme.github.io/brain",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "created",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Inter",
        body: "Inter",
        code: "Fira Code",
      },
      colors: {
        lightMode: {
          light: "#f8f8f2", // background
          lightgray: "#e0e0e0", // borders
          gray: "#6272a4", // graph links, heavier borders
          darkgray: "#44475a", // body text
          dark: "#282a36", // header text and icons
          secondary: "#ff79c9", // link color
          tertiary: "#bd93f9", // hover states
          highlight: "rgba(255, 121, 199, 0.15)", // internal link background
          textHighlight: "#f1fa8c88",
        },
        darkMode: {
          light: "#282a36", // background
          lightgray: "#44475a", // borders
          gray: "#6272a4", // graph links, heavier borders
          darkgray: "#f8f8f2", // body text
          dark: "#f8f8f2", // header text and icons
          secondary: "#bd93f9", // link color, current graph node
          tertiary: "#8be9fd", // hover states and visited graph nodes
          highlight: "rgba(189, 147, 249, 0.15)", // internal link background
          textHighlight: "#f1fa8c88",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        // uses themes bundled with Shikiji
        theme: {
          light: "dracula",
          dark: "dracula",
        },
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config
