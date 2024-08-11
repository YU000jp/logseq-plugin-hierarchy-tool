import { t } from "logseq-l10n"
import { createSearchBox } from "./incrementalSearch"
import { githubReadmeUrl, icon, keyCreateSubPageButton, keyRefreshButton, keySettingsButton, keyToggleH1, keyToggleH2, keyToggleH3, keyToggleH4, keyToggleH5, keyToggleH6, keyToggleStyleForHideBlock, keyToggleSubPage, keyToggleTableId, keyToolbarHeaderSpace, keyToolbarHierarchy, keyToolbarHierarchyContainer, keyToolbarIncrementalContainer, keyToolbarIncrementalSearchBox, keyToolbarIncrementalSearchResult, keyToolbarPopup, keyToolbarSelectPage, keyToolbarTocContainer, keyToolbarTocContent, pluginName } from './key'
import { displayHeadersList } from './toc'
import { detailsStateToggle } from "./toggle"

export const removePopup = () => {
  parent.document.getElementById(logseq.baseInfo.id + "--" + keyToolbarPopup)?.remove()
}


export const openPopupFromToolbar = () => {

  //ポップアップを表示
  logseq.provideUI({
    attrs: {
      title: `${icon}${pluginName} ${t("Plugin")}`,
    },
    key: keyToolbarPopup,
    reset: true,
    style: {
      width: logseq.settings?.popupWidth as string || "380px",
      height: logseq.settings?.popupHeight as string || "93vh",
      overflowY: "auto",
      left: "unset",
      bottom: "unset",
      right: "1em",
      top: "4em",
      paddingLeft: "0.2em",
      paddingTop: "0.2em",
      backgroundColor: 'var(--ls-primary-background-color)',
      color: 'var(--ls-primary-text-color)',
      boxShadow: '1px 2px 5px var(--ls-secondary-background-color)',
    },
    template: `
        <div title="" style="padding-bottom: 3em">
          <div id="${keyToolbarSelectPage}" title="${t("Clicking on a page name is reflected in 'Page Connection'.")}"></div>
          <details id="${keyToolbarIncrementalContainer}"${logseq.settings?.[keyToolbarIncrementalContainer] as boolean === true ? ' open="true"' : ""} title="${t("Search for page names matching the word")}">
            <summary>${t("Incremental Page Search")}</summary>
            <p id="${keyToolbarIncrementalSearchBox}"></p>
            <div id="${keyToolbarIncrementalSearchResult}" title="${t("Clicking on a page name is reflected in 'Page Connection'.")}\n${t("Ctrl-click to open the page")}"></div>
          </details>
          <hr/>
          <div style="float: right;">
              <button id="${keyRefreshButton}" data-on-click="${keyRefreshButton}" title="${t("Refresh")} (${t("Switch to current page")})">🔄</button>
              <button data-on-click="${keySettingsButton}" title="${t("Plugin Settings")}">⚙️</button>
              <a href="${githubReadmeUrl}" title="README (GitHub)" target="_blank"><span style="font-family: 'tabler-icons';">&#xec1c;</span></a>
          </div>
          <table title="${t("Current hierarchical position or currently open page")}">
            <tr>
              <th id="${keyToolbarHeaderSpace}"></th>
              <th title="${t("Create a new sub-page")}"><button data-on-click="${keyCreateSubPageButton}">➕</button></th>
            </tr>
          </table>
          <details id="${keyToolbarHierarchyContainer}"${logseq.settings?.[keyToolbarHierarchyContainer] as boolean === true ? ' open="true"' : ""}>
            <summary title="${t("Run queries on the page name to find pages related to it.") + "\n" + t("Ctrl-click to open the page")}">${t("Page Connection")}</summary>
            <div id="${keyToolbarHierarchy}"</div>
          </details>
          <details id="${keyToolbarTocContainer}"${logseq.settings?.[keyToolbarTocContainer] as boolean === true ? ' open="true"' : ""} title="${t("Instead of scrolling through the page content, it opens as a block zoom.")}\n${t("Click to open the page")}">
            <summary>${t("Table of Contents with Sub-pages")}</summary>
            <table id="${keyToggleTableId}" title="${t("Toggle for hide")}">
              <tr>
                <th title="${t("sub pages")}" class="text-sm">>><input type="checkbox" id="${keyToggleSubPage}" data-on-click="${keyToggleSubPage}"${logseq.settings!.tocShowSubPage ? `checked="true"` : ""}/></th>
                <th>h1<input type="checkbox" id="${keyToggleH1}" data-on-click="${keyToggleH1}"${logseq.settings!.hideH1 ? `checked="true"` : ""}/></th>
                <th>h2<input type="checkbox" id="${keyToggleH2}" data-on-click="${keyToggleH2}" ${logseq.settings!.hideH2 ? `checked="true"` : ""}/></th>
                <th>h3<input type="checkbox" id="${keyToggleH3}" data-on-click="${keyToggleH3}" ${logseq.settings!.hideH3 ? `checked="true"` : ""}/></th>
                <th>h4<input type="checkbox" id="${keyToggleH4}" data-on-click="${keyToggleH4}" ${logseq.settings!.hideH4 ? `checked="true"` : ""}/></th>
                <th>h5<input type="checkbox" id="${keyToggleH5}" data-on-click="${keyToggleH5}" ${logseq.settings!.hideH5 ? `checked="true"` : ""}/></th>
                <th>h6<input type="checkbox" id="${keyToggleH6}" data-on-click="${keyToggleH6}" ${logseq.settings!.hideH6 ? `checked="true"` : ""}/></th>
                <th title="${t("Black out header sub-blocks when the page is open.")}">👀<input type="checkbox" id="${keyToggleStyleForHideBlock}" data-on-click="${keyToggleStyleForHideBlock}" ${logseq.settings!.hideBlockChildren ? `checked="true"` : ""}/></th>
              </tr>
            </table>
            <div id="${keyToolbarTocContent}"></div>
          </details>
          <hr/>
          <hr/>
        </div>
        <style>
          /* h1,h2,h3,h4,h5,h6を持つブロックの子要素を非表示にする ブロックズームを除く */
          body.${keyToggleStyleForHideBlock} div.page:has(.page-title) div[haschild="true"].ls-block:has(h1,h2,h3,h4,h5,h6)>div.block-children-container:not(:focus-within) {
              opacity: 0.2;
              max-height: 200px;
              overflow-y: auto;
          } 
        </style>
        `,
  })

  setTimeout(() => {

    //ポップアップの本文を作成・リフレッシュ
    displayHeadersList()

    //インクリメントサーチボックスを作成
    createSearchBox()

    //detailsのトグルをstate
    detailsStateToggle()

  }, 50)
}



