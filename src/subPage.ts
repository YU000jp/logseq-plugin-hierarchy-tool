import { BlockEntity, IBatchBlock } from "@logseq/libs/dist/LSPlugin.user"
import { t } from "logseq-l10n"
import removeMd from "remove-markdown"
import { currentPageOriginalName } from "."
import { confirmDialog } from "./lib"
import { pageEntityShort } from "./type"


// ヘッダーブロックを、サブページに移設する
export const createSubPageUserConfirm = async (content: string, uuid: string, flag?: { newPageName?: string }) => {
  logseq.showMainUI({ autoFocus: true })
  try {
    const string = content
      .split("\n")[0]
      .trim()
      .replace("[[", "")
      .replace("]]", "")

    const newPageName = (flag && flag.newPageName) ?
      flag.newPageName
      : `${currentPageOriginalName}/${removeMd(string)}`

    const checkboxMsg = document.getElementById("checkboxMsg") as HTMLElement | null
    if (checkboxMsg) {
      checkboxMsg.textContent = t("Insert a link to the sub-page in the original block") + ": " // #checkboxMsgにメッセージを表示する
      checkboxMsg.style.display = "unset"
    }
    const checkbox = document.getElementById("checkbox") as HTMLElement | null
    if (checkbox)
      checkbox.style.display = "unset"

    // Confirm
    if (await confirmDialog(
      t("Do you want to create a new sub-page?"),
      { inputDefaultValue: newPageName }
    )) {
      const userInput = document.getElementById("input") as HTMLInputElement | null // ユーザー入力値
      if (userInput
        && userInput.value !== "") {
        //作成する場合
        const isPageEntity = await logseq.Editor.getPage(userInput.value) as pageEntityShort | null // サブページがすでに存在するかどうか
        if (!isPageEntity) {
          const newSubPageEntity = await logseq.Editor.createPage(userInput.value, {}, { redirect: true, createFirstBlock: true }) as pageEntityShort | null // サブページを作成する
          if (newSubPageEntity) {
            setTimeout(async () => {
              logseq.UI.showMsg(userInput.value, "info", { timeout: 4000 })
              // サブブロックのみを取得し、サブページに挿入する
              const sourceBlockEntity = await logseq.Editor.getBlock(uuid, { includeChildren: true }) as { children: BlockEntity["children"] } | null
              if (sourceBlockEntity)
                if (sourceBlockEntity.children
                  && sourceBlockEntity.children.length > 0) { // サブブロックがある場合
                  const batch = (sourceBlockEntity.children as BlockEntity[]).map((child) => ({
                    content: child.content,
                    properties: child.properties,
                    children: child.children,
                  } as IBatchBlock))
                  await logseq.Editor.insertBatchBlock(newSubPageEntity.uuid, batch, { before: false, sibling: true }) as Array<BlockEntity> | null
                } else { // サブブロックがない場合
                  // 挿入処理はいらない
                }
              setTimeout(async () => {
                logseq.UI.showMsg("🔎 " + t("The selected block has been moved to a sub-page."), "success", { timeout: 4000 })
                // #checkbox.checked = trueなら、元のブロックをクリアにして、リンクを挿入する
                if ((document.getElementById("checkbox") as HTMLInputElement).checked) {
                  // newPageNameの階層の最後の部分を取得する
                  const label = userInput.value.substring(userInput.value.lastIndexOf("/") + 1)
                  // 前にブロックを挿入する
                  await logseq.Editor.insertBlock(uuid, `[${label}](${newPageName})`, { before: true, sibling: true, properties: { heading: "true" } })
                  // メッセージを表示する
                  logseq.UI.showMsg("🔎 " + t("The link to the sub-page has been inserted into the original block."), "success", { timeout: 4000 })
                  // 元のブロックを削除する
                  await logseq.Editor.removeBlock(uuid)
                }
                else // チェックされていない場合は、元のブロックを削除する
                  await logseq.Editor.removeBlock(uuid)

              }, 100)
            }, 100)

          }
          else // サブページの作成に失敗した場合
            logseq.UI.showMsg("🔎 " + t("Failed to create a new sub-page."), "warning", { timeout: 2200 })
        } else { // サブページがすでに存在する場合
          logseq.UI.showMsg("🔎 " + t("The sub-page already exists."), "warning", { timeout: 2200 })
          // もう一度、入力を求める
          setTimeout(() => createSubPageUserConfirm(content, uuid, { newPageName: userInput.value }),
            10)
        }
      } else {
        logseq.UI.showMsg("🔎 " + t("Please enter a name for the sub-page."), "warning", { timeout: 2200 })
        // もう一度、入力を求める
        setTimeout(() => createSubPageUserConfirm(content, uuid, { newPageName: newPageName }),
          10)
      }
    }
    else
      logseq.UI.showMsg(t("Canceled"), "warning", { timeout: 2200 })
  } catch (error) {
    logseq.hideMainUI()
  } finally {
    logseq.hideMainUI()
  }
}


// 現在のページに、サブページを作成する
export const createSubPage = async () => {
  logseq.showMainUI({ autoFocus: true })
  try {
    const newPageName = currentPageOriginalName ?
      `${currentPageOriginalName}/`
      : ""

    // チェックボックスを非表示にする
    const checkbox = document.getElementById("checkbox") as HTMLElement | null
    if (checkbox)
      checkbox.style.display = "none"
    const checkboxMsg = document.getElementById("checkboxMsg") as HTMLElement | null
    if (checkboxMsg)
      checkboxMsg.style.display = "none"

    // confirm
    if (await confirmDialog(
      t("Do you want to create a new sub-page?"),
      { inputDefaultValue: newPageName }
    )) {
      const userInput = document.getElementById("input") as HTMLInputElement | null //ユーザー入力値
      if (userInput
        && userInput.value !== ""
        && userInput.value !== newPageName) {
        //作成する場合
        const isPageEntity = await logseq.Editor.getPage(userInput.value) as pageEntityShort | null //ページがすでに存在するかどうか
        if (!isPageEntity) {
          const newSubPageEntity = await logseq.Editor.createPage(userInput.value, {}, { redirect: true, createFirstBlock: true }) as pageEntityShort | null //サブページを作成
          if (newSubPageEntity) {
            setTimeout(async () => {
              logseq.UI.showMsg(userInput.value, "info", { timeout: 4000 })
              setTimeout(async () => {
                logseq.UI.showMsg("🔎 " + t("The selected block has been moved to a sub-page."), "success", { timeout: 4000 })
              }, 100)
            }, 100)

          }
          else // サブページの作成に失敗した場合
            logseq.UI.showMsg("🔎 " + t("Failed to create a new sub-page."), "warning", { timeout: 2200 })
        } else { // サブページがすでに存在する場合
          logseq.UI.showMsg("🔎 " + t("The sub-page already exists."), "warning", { timeout: 2200 })
          // もう一度、入力を求める
          setTimeout(() => createSubPage(),
            10)
        }
      } else {
        logseq.UI.showMsg("🔎 " + t("Please enter a name for the sub-page."), "warning", { timeout: 2200 })
        // もう一度、入力を求める
        setTimeout(() => createSubPage(),
          10)
      }
    }
    else
      logseq.UI.showMsg(t("Canceled"), "warning", { timeout: 2200 })
  } catch (error) {
    logseq.hideMainUI()
  } finally {
    logseq.hideMainUI()
  }
}

