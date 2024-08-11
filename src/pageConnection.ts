import { PageEntity } from "@logseq/libs/dist/LSPlugin.user"
import { t } from "logseq-l10n"
import { currentPageName, currentPageOriginalName, currentPageProperties, updateBlockUuid } from "."
import { keyCssClassHierarchyGroup, keyCssClassHierarchyItem, keyToolbarHierarchy, keyToolbarIncrementalContainer } from './key'
import { getPageHierarchyOrNameRelatedFromQuery, sortGroupItemsByName } from "./lib"
import { displayHeadersList } from './toc'
import { PageEntityNameAndUuid, queryItemsShort } from "./type"

export const generateHierarchyList = () => {
  setTimeout(() => {
    //階層構造を表示
    const hierarchy = parent.document.getElementById(keyToolbarHierarchy) as HTMLElement | null
    if (hierarchy) {
      hierarchy.innerHTML = "" //リフレッシュ
      createHierarchyList(hierarchy)
    }
  }, 10)
}


const createHierarchyList = async (hierarchyElement: HTMLElement) => {
  if (currentPageName === "") return

  const flagHierarchy = (currentPageName.includes("/")
    && logseq.settings!.queryLastHierarchy as boolean === true)
  const popHierarchyOr = flagHierarchy === true ?
    currentPageOriginalName.split("/").pop() as string//ページ名に階層が含まれている場合、その最後の階層をもとにクエリーを取得する
    : currentPageOriginalName //ページ名そのまま

  const getArrayFromQuery = await getPageHierarchyOrNameRelatedFromQuery(popHierarchyOr) as queryItemsShort

  // ページプロパティtagsでクエリー
  if (logseq.settings!.queryWithPageTagsProperty as boolean === true) {
    if (currentPageProperties
      && currentPageProperties.tags
      && currentPageProperties.tags.length > 0)
      for (const tag of currentPageProperties.tags) //currentPageTagsPropertyは配列。配列の要素を取り出して、クエリーを取得し、統合する
        getArrayFromQuery.push(...(await getPageHierarchyOrNameRelatedFromQuery(tag) as queryItemsShort))

    // タグづけされたページを取得するクエリー
    const query = await logseq.DB.q(`(page-tags [[${currentPageName}]])`) as any[] as PageEntityNameAndUuid[] | null
    if (query)
      for (const item of query)
        getArrayFromQuery.push({
          "original-name": item.originalName,
          uuid: item.uuid,
          type: "page-tags",
        })
  }

  // ページプロパティのaliasでクエリーを取得する
  if (logseq.settings!.queryWithPageAliasProperty as boolean === true)
    if (currentPageProperties
      && currentPageProperties.alias
      && currentPageProperties.alias.length > 0)
      //console.log(currentPageAliasProperty)
      //currentPageAliasPropertyは配列。配列の要素を取り出して、クエリーを取得し、統合する
      for (const alias of currentPageProperties.alias)
        getArrayFromQuery.push(...(await getPageHierarchyOrNameRelatedFromQuery(alias) as queryItemsShort))


  // namespaceでクエリーを取得する
  if (logseq.settings!.queryNamespace as boolean === true) {
    const query = await logseq.DB.q(`(namespace [[${currentPageName}]])`) as any[] as PageEntityNameAndUuid[] | null
    if (query)
      for (const item of query)
        getArrayFromQuery.push({
          "original-name": item.originalName,
          uuid: item.uuid,
          type: "namespace",
        })
  }

  // クエリー結果がない場合は処理を終了する
  if (getArrayFromQuery.length === 0) return

  // 重複を取り除く
  const unique = getArrayFromQuery.filter((element, index, self) =>
    index === self.findIndex((e) => (
      e["original-name"] === element["original-name"]
      && e["type"] === element["type"])))
  getArrayFromQuery.length = 0
  getArrayFromQuery.push(...unique)

  // グループ化
  const group = getArrayFromQuery.reduce((acc, item) => {
    switch (item.type) {
      case "namespace":
        if (!acc["Namespace"]) acc["Namespace"] = []
        acc["Namespace"].push(item)
        break
      case "keyword":
        if (!acc["Keyword"]) acc["Keyword"] = []
        acc["Keyword"].push(item)
        break
      case "page-tags":
        if (!acc["Page-tags"]) acc["Page-tags"] = []
        acc["Page-tags"].push(item)
        break
    }
    return acc
  }, {} as { [key: string]: queryItemsShort })


  // グループ内のアイテムを並び替える
  sortGroupItemsByName(group)

  // グループを表示
  if (group["Keyword"] &&
    group["Keyword"].length > 0)
    renderGroupElement("Keyword", hierarchyElement, group["Keyword"], popHierarchyOr)
  if (group["Page-tags"] &&
    group["Page-tags"].length > 0)
    renderGroupElement("Page-tags", hierarchyElement, group["Page-tags"], popHierarchyOr)
  if (group["Namespace"] &&
    group["Namespace"].length > 0)
    renderGroupElement("Namespace", hierarchyElement, group["Namespace"], popHierarchyOr)
}


let processingTocShowGroup = false
export const renderGroupElement = (
  key: string,
  hierarchyElement: HTMLElement,
  items: queryItemsShort,
  popHierarchyOr: string,
) => {

  const groupElement = document.createElement("details") as HTMLDetailsElement
  groupElement.className = keyCssClassHierarchyGroup

  // グループの開閉状態を保存する (stateトグル)
  groupElement.addEventListener("toggle", (ev) => {
    if (processingTocShowGroup) {
      ev.preventDefault()
      return
    }
    processingTocShowGroup = true
    setTimeout(() => { processingTocShowGroup = false }, 1000)
    logseq.updateSettings({ [`tocShowGroup${key}`]: groupElement.open as boolean })
  })
  if (logseq.settings![`tocShowGroup${key}`]
    && logseq.settings![`tocShowGroup${key}`] === true)
    groupElement.open = true

  const summary = document.createElement("summary")
  summary.textContent = key === "Keyword" ?
    `${t("Match the word or related")} "${popHierarchyOr}"`
    : key === "Namespace" ?
      `${t("Namespace")} "${currentPageOriginalName}"`
      : key === "Page-tags" ?
        `${t("Pages tagged with")} "${popHierarchyOr}"`
        : "🔎 " + key
  groupElement.appendChild(summary)
  hierarchyElement.appendChild(groupElement)

  if (key === "Keyword"
    || key === "Page-tags") {

    // 「Logseq/テンプレート/AAA」のような階層構造の場合、「Logseq」のグループを作り、その中にさらに「Logseq/テンプレート」グループを作る
    const group = items.reduce((acc, item) => {
      const array = item["original-name"].split("/")
      const key = array.shift() as string
      if (!acc[key]) acc[key] = []
      acc[key].push({
        "original-name": array.join("/"),
        uuid: item.uuid,
        type: "keyword",
      })
      return acc
    }, {} as { [key: string]: queryItemsShort })

    // グループ内のアイテムを並び替える
    sortGroupItemsByName(group)

    for (const small in group) {
      const smallGroup = document.createElement("details") as HTMLDetailsElement
      smallGroup.className = keyCssClassHierarchyGroup
      smallGroup.open = true
      const summary = document.createElement("summary")
      summary.textContent = small
      smallGroup.appendChild(summary)
      groupElement.appendChild(smallGroup)
      let beforeItem = ""
      for (const item of group[small]) {
        renderItem(item, smallGroup, small, beforeItem)
        beforeItem = item["original-name"]
      }
    }
  } else {
    let beforeItem = ""
    for (const item of items) {
      renderItem(item, groupElement, key, beforeItem)
      beforeItem = item["original-name"]
    }
  }
}


const renderItem = (
  item: {
    "original-name": string
    uuid: string,
  },
  groupElement: HTMLElement,
  key: string,
  beforeItem: string,
) => {

  const div = document.createElement("div")
  div.className = "flex justify-between items-center"

  const button = document.createElement("button")
  button.style.whiteSpace = "nowrap"
  button.title = item["original-name"]
  button.className = "button " + keyCssClassHierarchyItem
  if (key === "Namespace")
    button.textContent = item["original-name"].replace(new RegExp(`^${currentPageOriginalName}/`), "./")//文字列の先頭にある「${key}/」を取り除く
  else
    // beforeItemが空でない場合、beforeItemの文字列がitem["original-name"]の先頭にある場合
    if (beforeItem !== ""
      && item["original-name"].includes("/"))

      // beforeItemが先頭にある場合はグレーアウトする
      if (item["original-name"].startsWith(beforeItem))
        button.innerHTML = item["original-name"].replace(new RegExp(`^${beforeItem}`), `<span style='opacity:0.3'>${beforeItem}</span>`)
      else {
        // AAA/BBB/CCCのように何階層かある場合、「AAA/」もしくは「AAA/BBB/」のように、前の階層がある場合はグレーアウトする
        const array = beforeItem.split("/")
        let before = ""
        let success = false
        for (const element of array) {
          before += element + "/"
          if (item["original-name"].startsWith(before)) {
            button.innerHTML = item["original-name"].replace(new RegExp(`^${before}`), `<span style='opacity:0.3'>${before}</span>`)
            success = true
          }
        }
        if (!success)
          button.innerHTML = item["original-name"].replace(new RegExp(`^${beforeItem}`), `<span style='opacity:0.3'>${beforeItem}</span>`)
      }
    else
      if (item["original-name"] === key)
        button.textContent = key
      else
        if (item["original-name"].startsWith(key)) // keyが先頭にある場合はグレーアウトする
          button.innerHTML = item["original-name"].replace(new RegExp(`^${key}`), `<span style='opacity:0.3'>${key}</span>`)
        else // 初回
          button.textContent = item["original-name"] ?
            item["original-name"]
            : `(${key})`


  button.addEventListener("click",
    async ({ shiftKey, ctrlKey }) => accessItem({ shiftKey, ctrlKey }, { uuid: item.uuid, originalName: item["original-name"] }))
  div.appendChild(button)
  groupElement.appendChild(div)
}


const accessItem = (
  key: {
    shiftKey: boolean,
    ctrlKey: boolean
  },
  pageEntity: {
    uuid: PageEntity["uuid"],
    originalName: PageEntity["originalName"]
  },
) => {
  //details id="${keyToolbarIncrementalContainer}"のopenを閉じる
  const details = parent.document.getElementById(keyToolbarIncrementalContainer) as HTMLDetailsElement | null
  if (details)
    details.open = false

  updateBlockUuid() //ブロックuuidをリセットする
  if (key.shiftKey === true)
    logseq.Editor.openInRightSidebar(pageEntity.uuid)
  else
    if (key.ctrlKey === true)
      logseq.App.pushState('page', { name: pageEntity.originalName })
    else
      // 目次の更新だけおこなう
      displayHeadersList(pageEntity.uuid)
}

