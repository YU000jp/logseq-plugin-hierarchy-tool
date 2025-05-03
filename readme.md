# Logseq Plugin: Hierarchy Tool (TOC)

A powerful tool for managing hierarchical pages  in Logseq

> [!WARNING]  
> This plugin is NOT compatible with Logseq DB version and will remain incompatible.

<div align="right">
 
[English](https://github.com/YU000jp/logseq-plugin-hierarchy-tool) / [日本語](https://github.com/YU000jp/logseq-plugin-hierarchy-tool/blob/main/readme.ja.md) [![latest release version](https://img.shields.io/github/v/release/YU000jp/logseq-plugin-hierarchy-tool)](https://github.com/YU000jp/logseq-plugin-hierarchy-tool/releases) [![License](https://img.shields.io/github/license/YU000jp/logseq-plugin-hierarchy-tool?color=blue)](https://github.com/YU000jp/logseq-plugin-hierarchy-tool/LICENSE) [![Downloads](https://img.shields.io/github/downloads/YU000jp/logseq-plugin-hierarchy-tool/total.svg)](https://github.com/YU000jp/logseq-plugin-hierarchy-tool/releases)
<a href="https://www.buymeacoffee.com/yu000japan"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a pizza&emoji=🍕&slug=yu000japan&button_colour=FFDD00&font_colour=000000&font_family=Poppins&outline_colour=000000&coffee_colour=ffffff" /></a>
 </div>

## ✨ Key Features

1. **Smart Page Search**
   - Quick incremental search across all pages
   - Find pages instantly as you type

2. **Intelligent Page Connections**
   - View related pages in a clean interface
   - Navigate hierarchies (Namespaces) and tags efficiently

3. **Enhanced Table of Contents**
   - Seamlessly integrate with sub-pages
   - Smart block zoom navigation
   - Quick sub-page creation and block management

---

## Getting Started

Install from Logseq Marketplace
  - Press [`---`] on the top right toolbar to open [`Plugins`]. Select `Marketplace`. Type `sub` in the search field, select it from the search results and install.

### Usage

- The button on the toolbar is the first toggle.
   - While the pop-up is displayed, if the user navigates to a page, it switches to the table of contents for that page.
   > Initially, this button is hidden by Logseq. This button on the toolbar (![アイコン](https://github.com/YU000jp/logseq-plugin-bullet-point-custom-icon/assets/111847207/136f9d0f-9dcf-4942-9821-c9f692fcfc2f)) on the toolbar. Click on it and then click on this ![image](https://github.com/user-attachments/assets/5445bf64-6c5c-4dcf-981c-ad3ec176930f)
. The 🏢 button will then appear on the toolbar.
- In the table of contents, the block is opened by zooming in, but within Page Connections, the page does not open directly for moving up or down the hierarchy. (Ctrl+click to open as a page).

## 🚀 Quick Tips

1. **Create Sub-pages**: Click ➕ next to page names for quick sub-page creation
2. **Smart Block Movement**: Ctrl+click headers to move blocks to sub-pages
3. **Quick Access**: Use `Ctrl/Cmd + F1` to toggle the popup
4. **Block Promotion**: Right-click any bullet to promote it to a page

## ⚠️ Important Notes

- Plugin auto-hides hierarchy/tags display to prevent conflicts
- Close popup when using sidebars to avoid overlap
- Performance may vary with page size and embedded content
- Disable other TOC plugins for best experience
- Compatible with Side Block plugin (add `#.side(-[a-z])?` in settings)

#### Note

- Due to content conflicts, the display of hierarchy and page tags in the page content is hidden in the plugin settings beforehand.
- Sidebars and pop-ups are displayed overlapping. To use the sidebar, close the pop-up.
- Loading may be slow if the amount of information on the page is too large or if there are too many page embeds in the content.
- If you have other plug-ins with table of contents functionality, be sure to turn it off.
- When using this plugin, be sure to turn off the 'Page View UI' functionality of Page-tags and Hierarchy plugin.
- If using the Side Block plugin, in the plugin settings, add "`#.side(-[a-z])? `" in the input field.
- In table of contents
  - Only headers on the first level are detected.
  - For automatic headers, the "heading:: true" property is used. In this case, they are not displayed in there.

---

## Demo

![HierarchyTool](https://github.com/user-attachments/assets/f2438a2a-019e-4e7a-bff1-b699a5ebabc3)

## Showcase / Questions / Ideas / Help

> Go to the [Discussions](https://github.com/YU000jp/logseq-plugin-hierarchy-tool/discussions) tab to ask and find this kind of things.

### TODO

1. [x] Porting of table of contents functionality
1. [x] Currently implemented in pop-up view.
1. [x] Display of subordinate levels within the table of contents
1. [x] Support for zoomed pages (block zoom instead of scrolling)
1. [x] Added ability to search for pages using pattern matching by page name. (Incremental Page Search)
1. [x] add ability to turn blocks with headers into sub-pages (Ctrl-click on header in table of contents) 1.
1. [x] Added button to create a sub-page.
1. [x] Added support for displaying a list of page tags and hierarchies (replaces the display of page tags and hierarchies in the page content).
1. [x] Incremental Page Search in dialog that create sub-page
1. [x] Shortcut to enable toggling of the pop-up
1. [ ] Sticky Heading Style https://github.com/zhouhua/obsidian-sticky-headings
1. [ ] Adjustments need to be made after the db version of Logseq is released. ("heading:: true" and other properties).

## Prior art & Credit

- TOC > [Page-level TOC plugin](https://github.com/benjypng/logseq-toc-plugin)
- TOC > [TOC Generator plugin](https://github.com/sethyuan/logseq-plugin-tocgen)
- TOC in left sidebar > [Left Sidebar Enhance plugin](https://github.com/YU000jp/logseq-plugin-left-sidebar-enhance)
- Icon > [icooon-mono.com](https://icooon-mono.com/10928-%e3%83%93%e3%83%ab%e3%81%ae%e3%82%a2%e3%82%a4%e3%82%b3%e3%83%b3/)
- Author > [@YU000jp](https://github.com/YU000jp)
