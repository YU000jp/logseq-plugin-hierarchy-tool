import '@logseq/libs'; //https://plugins-doc.logseq.com/
import { AppInfo, BlockEntity, LSPluginBaseInfo, PageEntity } from '@logseq/libs/dist/LSPlugin.user'
import { setup as l10nSetup, t } from "logseq-l10n"; //https://github.com/sethyuan/logseq-l10n
import { clickRefreshButton } from "./button"
import { icon, keyCommand, keyCreateSubPageButton, keyCssHideHierarchyInPageContent, keyCssHidePageTagsInPageContent, keyRefreshButton, keySettingsButton, keyToggleH1, keyToggleH2, keyToggleH3, keyToggleH4, keyToggleH5, keyToggleH6, keyToggleStyleForHideBlock, keyToggleSubPage, keyToolbar, keyToolbarPopupFull } from './key'
import { removeProvideStyle } from './lib'
import { openPopupFromToolbar, removePopup } from './popup'
import { settingsTemplate } from "./settings"
import cssStyleString from "./style.css?inline"
import { createSubPage, createSubPageUserConfirm } from './subPage'
import { displayHeadersList } from './toc'
import { hideHeaderFromList, toggleStyleForHideBlock } from "./toggle"
import af from "./translations/af.json"
import de from "./translations/de.json"
import es from "./translations/es.json"
import fr from "./translations/fr.json"
import id from "./translations/id.json"
import it from "./translations/it.json"
import ja from "./translations/ja.json"
import ko from "./translations/ko.json"
import nbNO from "./translations/nb-NO.json"
import nl from "./translations/nl.json"
import pl from "./translations/pl.json"
import ptBR from "./translations/pt-BR.json"
import ptPT from "./translations/pt-PT.json"
import ru from "./translations/ru.json"
import sk from "./translations/sk.json"
import tr from "./translations/tr.json"
import uk from "./translations/uk.json"
import zhCN from "./translations/zh-CN.json"
import zhHant from "./translations/zh-Hant.json"

//現在のページ名とuuidの保持
export let currentPageOriginalName: PageEntity["originalName"] = ""
export let currentPageName: PageEntity["name"] = ""
export let currentPageUuid: PageEntity["uuid"] = ""
export let currentBlockUuid: BlockEntity["uuid"] = ""
export let currentPageProperties: PageEntity["properties"] = {}

export const updateBlockUuid = (uuid?: BlockEntity["uuid"]) => {
  currentBlockUuid = uuid ? uuid : ""
}


export const updateCurrentPage = async (
  pageName: string,
  pageOriginalName: string,
  pageUuid: PageEntity["uuid"],
  properties: PageEntity["properties"],
) => {
  currentPageOriginalName = pageOriginalName
  currentPageName = pageName
  currentPageUuid = pageUuid
  currentBlockUuid = "" //ページが変わったら、ブロックのuuidをリセットする
  currentPageProperties = properties


  // logseq.settings!.historyに、配列をつくって、ページ名を履歴にいれる (重複させない)
  const history = logseq.settings!.history as string[] || []
  if (history.length === 0) {
    history.push(pageOriginalName)
    logseq.updateSettings({ history })
  } else {
    if (!history.includes(pageOriginalName)) {
      //お気に入りと重複させないようにするオプションは不要かも。
      history.unshift(pageOriginalName)
      logseq.updateSettings({ history: history.slice(0, 16) })
    }
  }
}


let processingBlockChanged: boolean = false//処理中 TOC更新中にブロック更新が発生した場合に処理を中断する

let onBlockChangedOnce: boolean = false//一度のみ
const onBlockChanged = () => {

  if (onBlockChangedOnce === true)
    return
  onBlockChangedOnce = true //index.tsの値を書き換える
  logseq.DB.onChanged(async ({ blocks }) => {

    if (processingBlockChanged === true
      || currentPageOriginalName === ""
      || logseq.settings!.booleanTableOfContents === false)
      return
    //headingがあるブロックが更新されたら
    const findBlock = blocks.find((block) => block.properties?.heading) as { uuid: BlockEntity["uuid"] } | null //uuidを得るためsomeではなくfindをつかう
    if (!findBlock) return
    const uuid = findBlock ? findBlock!.uuid : null
    updateToc()

    setTimeout(() => {
      //ブロック更新のコールバックを登録する
      if (uuid)
        logseq.DB.onBlockChanged(uuid, async () => updateToc())
    }, 200)

  })
}


const updateToc = () => {
  if (processingBlockChanged === true)
    return
  processingBlockChanged = true //index.tsの値を書き換える
  setTimeout(async () => {
    //#keyRefreshButtonをクリックする
    clickRefreshButton()
    processingBlockChanged = false
  }, 100)
}

const cssCodeHideHierarchyInPageContent = `
#main-content-container div.page-hierarchy {
  display: none;
}
`
const cssCodeHidePageTagsInPageContent = `
#main-content-container div.page-tags {
  display: none;
}
`


let logseqVersion: string = "" //バージョンチェック用
let logseqVersionMd: boolean = false //バージョンチェック用
// export const getLogseqVersion = () => logseqVersion //バージョンチェック用
export const booleanLogseqVersionMd = () => logseqVersionMd //バージョンチェック用


/* main */
const main = async () => {


    // バージョンチェック
  logseqVersionMd = await checkLogseqVersion()
  // console.log("logseq version: ", logseqVersion)
  // console.log("logseq version is MD model: ", logseqVersionMd)
  // 100ms待つ
  await new Promise(resolve => setTimeout(resolve, 100))

  if (logseqVersionMd === false) {
    // Logseq ver 0.10.*以下にしか対応していない
    logseq.UI.showMsg("The ’Hierarchy Tool’ plugin only supports Logseq ver 0.10.* and below.", "warning", { timeout: 5000 })
    return
  }

  //多言語化 L10N
  await l10nSetup({
    builtinTranslations: {//Full translations
      ja, af, de, es, fr, id, it, ko, "nb-NO": nbNO, nl, pl, "pt-BR": ptBR, "pt-PT": ptPT, ru, sk, tr, uk, "zh-CN": zhCN, "zh-Hant": zhHant
    }
  })

  // 設定の読み込み
  logseq.useSettingsSchema(settingsTemplate())

  //CSS
  logseq.provideStyle(cssStyleString)


  //ツールバーにポップアップ画面を開くボタンを追加
  logseq.App.registerUIItem('toolbar', {
    key: keyToolbar,
    template: `<div><a class="button icon" id="${keyToolbar}" data-on-click="${keyToolbar}" style="font-size: 18px">${icon}</a></div>`,
  })


  //クリックイベント
  logseq.provideModel({
    [keyToolbar]: () => openPopupFromToolbar(),//ツールバーのボタンをクリックしたら、ポップアップを表示
    [keyRefreshButton]: () => displayHeadersList(),//リフレッシュボタンを押したらポップアップの本文をリフレッシュ
    [keySettingsButton]: () => logseq.showSettingsUI(),//設定ボタンを押したら設定画面を表示
    [keyCreateSubPageButton]: () => createSubPage(),//サブページを作成
    [keyToggleStyleForHideBlock]: () => toggleStyleForHideBlock(),// サブブロックを非表示にするスタイルをトグル
    [keyToggleSubPage]: () => hideHeaderFromList("subPage"),//サブページの表示・非表示
    [keyToggleH1]: () => hideHeaderFromList("H1"),//h1の表示・非表示
    [keyToggleH2]: () => hideHeaderFromList("H2"),//h2の表示・非表示
    [keyToggleH3]: () => hideHeaderFromList("H3"),//h3の表示・非表示
    [keyToggleH4]: () => hideHeaderFromList("H4"),//h4の表示・非表示
    [keyToggleH5]: () => hideHeaderFromList("H5"),//h5の表示・非表示
    [keyToggleH6]: () => hideHeaderFromList("H6"),//h6の表示・非表示
  })


  logseq.beforeunload(async () => {
    //ポップアップを削除
    removePopup()
  })/* end_beforeunload */


  onBlockChanged() //ブロック変更時の処理


  // コマンドパレットにコマンドを登録
  logseq.App.registerCommandPalette({
    key: keyCommand,
    label: `${t("Toggle for showing the popup of 'Hierarchy Tool'")}`,
    keybinding: { binding: 'mod+f1' }
  }, async () => {
    if (parent.document.getElementById(keyToolbarPopupFull))
      removePopup()
    else
      openPopupFromToolbar()
  })


  //箇条書きコンテキストメニューにコマンドを登録
  if (logseq.settings!.commandBlockToPage === true)
    logseq.Editor.registerBlockContextMenuItem(t("Promoting a block to a page"), async ({ uuid }) => {
      const blockEntity = await logseq.Editor.getBlock(uuid, { includeChildren: false }) as { content: BlockEntity["content"] } | null
      if (blockEntity)
        createSubPageUserConfirm(blockEntity.content, uuid, { checkOn: true, asSubPage: false })
      else
        logseq.UI.showMsg(t("Failed"), "warning", { timeout: 2000 }) //ブロックとして取得できなかった場合のメッセージ
    })


  //ページ読み込み時に実行コールバック
  logseq.App.onRouteChanged(({ path, template }) => {
    if (template === "/page/:name"
      && decodeURI(path.substring(6)) !== currentPageName)
      routeCheck()
  })
  // logseq.App.onPageHeadActionsSlotted(() => {//動作保証のため、2つとも必要
  //   routeCheck()
  // })

  // 初回実行
  if (logseq.settings!.hideBlockChildren === true)
    parent.document.body.classList.add(keyToggleStyleForHideBlock)
  if (logseq.settings!.hideHierarchyInPageContent === true)
    logseq.provideStyle({
      key: keyCssHideHierarchyInPageContent,
      style: cssCodeHideHierarchyInPageContent
    })
  if (logseq.settings!.hidePageTagsInPageContent === true)
    logseq.provideStyle({
      key: keyCssHidePageTagsInPageContent,
      style: cssCodeHidePageTagsInPageContent
    })
  if (logseq.settings!.autoPopup === true)
    openPopupFromToolbar()


  let processingSettingsChanged = false
  logseq.onSettingsChanged((newSet: LSPluginBaseInfo["settings"], oldSet: LSPluginBaseInfo["settings"]) => {
    if (processingSettingsChanged) return
    if (newSet.tocRemoveWordList !== oldSet.tocRemoveWordList
      || newSet.queryLastHierarchy !== oldSet.queryLastHierarchy
      || newSet.queryWithPageTagsProperty !== oldSet.queryWithPageTagsProperty
      || newSet.queryWithPageAliasProperty !== oldSet.queryWithPageAliasProperty
      || newSet.queryNamespace !== oldSet.queryNamespace) {
      processingSettingsChanged = true
      setTimeout(() => {
        processingSettingsChanged = false
        clickRefreshButton() //設定が変更されたら、ポップアップの本文をリフレッシュ
      }, 100)
    }
    if (newSet.hideHierarchyInPageContent !== oldSet.hideHierarchyInPageContent)
      if (newSet.hideHierarchyInPageContent === true)
        logseq.provideStyle({
          key: keyCssHideHierarchyInPageContent,
          style: cssCodeHideHierarchyInPageContent
        })
      else
        removeProvideStyle(keyCssHideHierarchyInPageContent)

    if (newSet.hidePageTagsInPageContent !== oldSet.hidePageTagsInPageContent)
      if (newSet.hidePageTagsInPageContent === true)
        logseq.provideStyle({
          key: keyCssHidePageTagsInPageContent,
          style: cssCodeHidePageTagsInPageContent
        })
      else
        removeProvideStyle(keyCssHidePageTagsInPageContent)
    if (newSet.popupWidth !== oldSet.popupWidth
      || newSet.popupHeight !== oldSet.popupHeight) {
      removePopup()
      setTimeout(() =>
        openPopupFromToolbar()
        , 10)
    }

  })/* end_onSettingsChanged */


  // グラフが変更されたときの処理
  logseq.App.onCurrentGraphChanged(async () => {
    removePopup()
    currentPageOriginalName = ""
    currentPageName = ""
    currentPageUuid = ""
    currentBlockUuid = ""
    currentPageProperties = {}
    setTimeout(() => {
      if (logseq.settings!.autoPopup === true)
        openPopupFromToolbar()
    }, 10)
  })/* end_onCurrentGraphChanged */

}/* end_main */


//ページ遷移時に実行
let processingRouteCheck = false //処理中フラグ
const routeCheck = () => {
  if (processingRouteCheck) return
  processingRouteCheck = true
  setTimeout(() => processingRouteCheck = false, 300)
  clickRefreshButton()
}


// MDモデルかどうかのチェック DBモデルはfalse
const checkLogseqVersion = async (): Promise<boolean> => {
  const logseqInfo = (await logseq.App.getInfo("version")) as AppInfo | any
  //  0.11.0もしくは0.11.0-alpha+nightly.20250427のような形式なので、先頭の3つの数値(1桁、2桁、2桁)を正規表現で取得する
  const version = logseqInfo.match(/(\d+)\.(\d+)\.(\d+)/)
  if (version) {
    logseqVersion = version[0] //バージョンを取得
    // console.log("logseq version: ", logseqVersion)

    // もし バージョンが0.10.*系やそれ以下ならば、logseqVersionMdをtrueにする
    if (logseqVersion.match(/0\.([0-9]|10)\.\d+/)) {
      logseqVersionMd = true
      // console.log("logseq version is 0.10.* or lower")
      return true
    } else logseqVersionMd = false
  } else logseqVersion = "0.0.0"
  return false
}

logseq.ready(main).catch(console.error)
