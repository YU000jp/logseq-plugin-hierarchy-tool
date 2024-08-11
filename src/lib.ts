import { currentPageName, currentPageOriginalName } from "."
import { getQueryPageNamePattern } from "./query"
import { queryItemsShort } from "./type"


export const removeProvideStyle = (className: string) => {
  const doc = parent.document.head.querySelector(
    `style[data-injected-style^="${className}"]`
  ) as HTMLStyleElement | null
  if (doc) doc.remove()
}


export const getPageHierarchyOrNameRelatedFromQuery = async (pageName: string): Promise<queryItemsShort> => {

  let result = (await getQueryPageNamePattern(pageName))?.filter((item) => item !== null //resultの中に、nullが含まれている場合があるので、nullを除外する
    && item["original-name"] !== currentPageOriginalName)
    .map((item) => {
      item['original-name'] = item['original-name']
      //ページ名の先頭に「${currentPageOriginalName}/」もしくは「${currentPageName}/}」が含まれる場合は、TypeをHierarchyにする
      item["type"] = item["original-name"].startsWith(`${currentPageOriginalName}/`)
        || item["original-name"].startsWith(`${currentPageName}/`) ?
        "hierarchy"
        : "keyword"
      return item
    }) as queryItemsShort
  
  if (!result
    || result.length === 0) return []
  return result as queryItemsShort
}


export const confirmDialog = async (message: string, flag?: { inputDefaultValue?: string }) => {
  //index.htmlに<dialog>を記述済み
  document.getElementById("message")!.innerText = message
  const dialogElement = document.getElementById("dialog") as HTMLDialogElement
  if (flag?.inputDefaultValue) {
    const inputElement = document.getElementById("input") as HTMLInputElement
    inputElement.value = flag.inputDefaultValue
  }
  dialogElement.showModal()

  return new Promise(resolve => {
    const eventBase = flag => () => {
      dialogElement.close()
      document.getElementById("button-ok")!.removeEventListener("click", okEvent)
      document.getElementById("button-cancel")!.removeEventListener("click", cancelEvent)
      resolve(flag)
    }
    const okEvent = eventBase(true)
    const cancelEvent = eventBase(false)
    document.getElementById("button-ok")!.addEventListener("click", okEvent)
    document.getElementById("button-cancel")!.addEventListener("click", cancelEvent)
  })
}

export const sortGroupItemsByName = (group: { [key: string]: queryItemsShort }) => {
  // グループ内にアイテムが1つしかない場合は並び替える必要がないのでスキップ
  if (Object.keys(group).length < 2) return
  for (const key in group)
    group[key].sort((a, b) => {
      // 並び替えの条件を指定する
      // ここではアイテムの名前で昇順に並び替える例を示しています
      const nameA = a["original-name"]
      const nameB = b["original-name"]
      if (nameA < nameB) return -1
      if (nameA > nameB) return 1
      return 0
    })
}

