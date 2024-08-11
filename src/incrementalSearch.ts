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

    input.addEventListener("input", function (this) {
      if (processingIncrementalSearch) return
      processingIncrementalSearch = true
      setTimeout(() => processingIncrementalSearch = false,
        200)

      setTimeout(async () => {
        searchResult(this.value, parent.document.getElementById(keyToolbarIncrementalSearchResult) as HTMLElement | null)
      }, 220)

    })//end addEventListener
    searchBox.appendChild(input)
  }//end if
}//end createSearchBox


export const searchResult = async (searchWord: string, element: HTMLElement | null) => {

  // インクリメントサーチ実行
  if (element) {
    element.innerHTML = "" //リフレッシュ

    if (searchWord === "") // 検索ワードが空の場合は何もしない (空になる)
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
      renderGroupElement("Keyword", element, group["Keyword"], searchWord)

  }//end if
}//end searchResult