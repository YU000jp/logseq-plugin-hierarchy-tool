import { PageEntity } from "@logseq/libs/dist/LSPlugin.user"
import { t } from "logseq-l10n"
import { keyToolbarSelectPage } from "./key"
import { displayHeadersList } from './toc'



export const generateSelectForQuickAccess = (removePageName?: string) => {
  const selectPage = parent.document.getElementById(keyToolbarSelectPage) as HTMLElement | null
  if (selectPage) {
    selectPage.innerHTML = "" //リフレッシュ
    const select = document.createElement("select")
    // logseq.settings!.historyにあるページ名をセレクトボックスに追加
    const history = logseq.settings!.history as string[] || []
    // 先頭の空白オプション
    const option = document.createElement("option")
    option.value = ""
    // ページ選択の初期値
    option.textContent = t("Quick Page Select") + "..."
    select.appendChild(option)
    for (const pageName of history) {
      if (removePageName
        && pageName === removePageName) continue // 現在のページ名は除外
      const option = document.createElement("option")
      option.value = pageName
      option.textContent = pageName
      select.appendChild(option)
    }
    select.addEventListener("change", async (ev) => {
      const pageName = (ev.target as HTMLSelectElement).value
      if (pageName === "") return
      const pageEntity = await logseq.Editor.getPage(pageName, { includeChildren: false }) as { uuid: PageEntity["uuid"] } | null
      if (pageEntity)
        displayHeadersList(pageEntity.uuid)
    })
    selectPage.appendChild(select)
  }
}
