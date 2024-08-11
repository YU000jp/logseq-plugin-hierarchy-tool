import { PageEntity } from "@logseq/libs/dist/LSPlugin.user"
import { t } from "logseq-l10n"
import { currentBlockUuid, currentPageName, currentPageOriginalName, currentPageUuid, updateBlockUuid } from "."
import { keyRefreshButton, keyToolbarHeaderSpace } from "./key"
import { displayHeadersList } from './toc'



export const clickRefreshButton = () => {
  const refreshButton = parent.document.getElementById(keyRefreshButton) as HTMLElement | null
  if (refreshButton)
    refreshButton.click()
}


export const generatePageButton = () => {
  // 時間差処理
  setTimeout(() => {
    const headerSpace = parent.document.getElementById(keyToolbarHeaderSpace) as HTMLElement | null
    if (headerSpace) {
      headerSpace.innerHTML = "" //リフレッシュ



      //currentPageOriginalNameに 「/」が含まれている場合は、分割する
      if (currentPageName.includes("/")) {
        //「Logseq/プラグイン/A」のような場合は、「Logseq」「プラグイン」「A」 それぞれにリンクを持たせる。ただし、リンクは「Logseq/プラグイン」のように親の階層を含める必要がある
        const pageNames = currentPageOriginalName.split("/")
        let parentPageName = ""
        for (const pageName of pageNames) {
          // ページを開くボタン
          const openButton = document.createElement("button")
          openButton.textContent = parentPageName === "" ?
            pageName
            : "/" + pageName
          parentPageName += parentPageName === "" ?
            pageName
            : `/${pageName}`
          const thisButtonPageName = parentPageName
          openButton.title = thisButtonPageName + "\n" + t("Ctrl+click to open the page")
          openButton.className = "button"
          openButton.style.whiteSpace = "nowrap"
          openButton.style.backgroundColor = "var(--ls-secondary-background-color)"
          openButton.addEventListener("click", async ({ shiftKey, ctrlKey }) => {
            updateBlockUuid() //ブロックuuidをリセットする
            const pageEntity = await logseq.Editor.getPage(thisButtonPageName, { includeChildren: false }) as { uuid: PageEntity["uuid"] } | null
            if (pageEntity)
              if (shiftKey === true)
                logseq.Editor.openInRightSidebar(pageEntity.uuid)

              else if (ctrlKey === true)
                logseq.App.pushState('page', { name: thisButtonPageName })

              else
                // 目次の更新だけおこなう
                displayHeadersList(pageEntity.uuid)
          })
          headerSpace.appendChild(openButton)
        }
        headerSpace.classList.add("flex")
        headerSpace.style.flexWrap = "nowrap"
        if (currentBlockUuid !== "") // ブロックズームで開いている場合は、戻るボタンを追加
          headerSpace.appendChild(createOpenButton(" 🔙 🔎",
            //ズーム・ブロックを解除する
            t("This zoom block will be lifted.")))
      }
      else
        headerSpace.appendChild(createOpenButton(currentPageOriginalName + (currentBlockUuid !== "" ? " 🔙 🔎" : ""),
          t("This zoom block will be lifted.")))
    }
  }, 10)
}


export const createOpenButton = (buttonText: string, title: string) => {
  const openButton = document.createElement("button")
  openButton.title = title
  openButton.textContent = buttonText
  openButton.className = "button"
  openButton.style.whiteSpace = "nowrap"
  openButton.addEventListener("click", ({ shiftKey }) => {
    updateBlockUuid() //ブロックuuidをリセットする
    if (shiftKey === true)
      logseq.Editor.openInRightSidebar(currentPageUuid)

    else
      logseq.App.pushState('page', { name: currentPageOriginalName })
  })
  return openButton
}
