import { t } from "logseq-l10n"
import { keyToolbarIncrementalSearchBox, keyToolbarIncrementalSearchResult } from "./key"
import { getPageHierarchyOrNameRelatedFromQuery, sortGroupItemsByName } from "./lib"
import { renderGroupElement } from "./pageConnection"
import { queryItemsShort } from "./type"

let processingIncrementalSearch = false // インクリメントサーチ処理中フラグ 連続で処理されないようにする


export const createSearchBox = () => {
  const searchBox = parent.document.getElementById(keyToolbarIncrementalSearchBox) as HTMLElement | null
  if (searchBox) {

    const input = document.createElement("input")
    input.type = "text"
    input.placeholder = t("Search word")

    input.addEventListener("input", async () => {
      if (processingIncrementalSearch) return
      processingIncrementalSearch = true
      setTimeout(() => processingIncrementalSearch = false,
        200)

      setTimeout(async () => {
        // インクリメントサーチ実行
        // #keyToolbarIncrementalSearchResultに検索結果を表示
        const searchResult = parent.document.getElementById(keyToolbarIncrementalSearchResult) as HTMLElement | null
        if (searchResult) {
          searchResult.innerHTML = "" //リフレッシュ

          const searchWord = input.value
          if (searchWord === "")
            return

          const getArrayFromQuery = await getPageHierarchyOrNameRelatedFromQuery(searchWord) as queryItemsShort
          if (getArrayFromQuery.length === 0)
            return

          const group = getArrayFromQuery.reduce((acc, item) => {
            if (!acc["Keyword"]) acc["Keyword"] = []
            acc["Keyword"].push(item)
            return acc
          }, {} as { [key: string]: queryItemsShort })

          // グループ内のアイテムを名前順にソート
          sortGroupItemsByName(group)

          // グループを表示
          if (group["Keyword"] &&
            group["Keyword"].length > 0)
            renderGroupElement("Keyword", searchResult, group["Keyword"], searchWord)

        }//end if
      }, 150)

    })//end addEventListener
    searchBox.appendChild(input)
  }//end if
}//end createSearchBox

