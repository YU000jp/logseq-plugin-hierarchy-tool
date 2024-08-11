import { headerCellClassPageContent, headerCellClassSubPage, keyToggleStyleForHideBlock, keyToggleSubPage, keyToolbarHierarchyContainer, keyToolbarIncrementalContainer, keyToolbarTocContainer, keyToolbarTocContent, htToggle } from "./key"


let processingDetails = false // detailsのトグル処理中フラグ 連続で処理されないようにする

export const detailsStateToggle = () => {
  for (const detail of (parent.document.querySelectorAll(`details:is(#${keyToolbarTocContainer},#${keyToolbarHierarchyContainer},#${keyToolbarIncrementalContainer})`) as NodeListOf<HTMLDetailsElement>))
    detail.addEventListener("toggle", (ev) => {
      if (processingDetails) {
        ev.preventDefault()
        return
      }
      processingDetails = true
      setTimeout(() => processingDetails = false,
        10)
      logseq.updateSettings({ [detail.id]: detail.open })
    })
}


export const toggleHeaderVisibility = (headerName: string) => {
  for (const element of (parent.document.querySelectorAll(`#${keyToolbarTocContent} ${headerName}`) as NodeListOf<HTMLElement>))
    element.style.display = element.style.display === "none" ?
      "block"
      : "none"
}


let flagToggleStyleForHideBlock: boolean = false

export const toggleStyleForHideBlock = () => {
  if (flagToggleStyleForHideBlock) return
  flagToggleStyleForHideBlock = true

  let state = false

  //body.classに「tws--hide-block」がある場合は削除する
  if (parent.document.body.classList.contains(keyToggleStyleForHideBlock))
    parent.document.body.classList.remove(keyToggleStyleForHideBlock)
  else {
    parent.document.body.classList.add(keyToggleStyleForHideBlock)
    state = true //非表示の状態であることを示す
  }
  setTimeout(() => {
    flagToggleStyleForHideBlock = false
    //#keyToggleStyleForHideBlockのトグルをマッチさせる
    const button = parent.document.getElementById(keyToggleStyleForHideBlock) as HTMLInputElement | null
    if (button)
      button.checked = state
    logseq.updateSettings({ hideBlockChildren: state })
  }, 300)
}
//ヘッダーの表示・非表示
let processingButton = false //処理中フラグ
export const hideHeaderFromList = (headerName: string) => {
  if (processingButton) return
  processingButton = true
  setTimeout(() => processingButton = false, 300)

  //リストから該当のヘッダーを非表示 or 表示
  toggleHeaderVisibility(
    headerName === "H1" ?
      `h1.${headerCellClassPageContent}`
      : headerName === "subPage" ?
        `h1.${headerCellClassSubPage}`
        : headerName
  )
  const checkButton = parent.document.getElementById(
    headerName === "subPage" ?
      keyToggleSubPage
      : `${htToggle}${headerName.toUpperCase()}`
  ) as HTMLInputElement | null

  if (checkButton)
    logseq.updateSettings({ [`hide${headerName}`]: checkButton.checked }) //設定を更新
}

