# Logseq プラグイン: Hierarchy Tool (TOC)

Logseqで階層ページを効率的に管理するための強力なツール

> [!WARNING]
> このプラグインは Logseq DB バージョンとは互換性がなく、今後も対応の予定はありません。

<div align="right">
 
[English](https://github.com/YU000jp/logseq-plugin-hierarchy-tool) / [日本語](https://github.com/YU000jp/logseq-plugin-hierarchy-tool/blob/main/readme.ja.md) [![latest release version](https://img.shields.io/github/v/release/YU000jp/logseq-plugin-hierarchy-tool)](https://github.com/YU000jp/logseq-plugin-hierarchy-tool/releases) [![License](https://img.shields.io/github/license/YU000jp/logseq-plugin-hierarchy-tool?color=blue)](https://github.com/YU000jp/logseq-plugin-hierarchy-tool/LICENSE) [![Downloads](https://img.shields.io/github/downloads/YU000jp/logseq-plugin-hierarchy-tool/total.svg)](https://github.com/YU000jp/logseq-plugin-hierarchy-tool/releases)
<a href="https://www.buymeacoffee.com/yu000japan"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a pizza&emoji=🍕&slug=yu000japan&button_colour=FFDD00&font_colour=000000&font_family=Poppins&outline_colour=000000&coffee_colour=ffffff" /></a>
 </div>

## ✨ 主な機能

1. **ページ検索**
   - 全ページをすばやく検索
   - 入力しながらリアルタイムで結果表示

2. **ページコネクション**
   - 関連ページをクリーンに表示
   - 階層（名前空間）とタグの効率的なナビゲーション

3. **強化された目次機能**
   - サブページとのシームレスな統合
   - スマートなブロックズーム操作
   - クイックサブページ作成とブロック管理

## 概要

<table><tr><td>

- ページを開かずに、階層を頼りに目的のページを探します。
  ### **Incremental Page Search**
     - ページ検索機能。文字入力にマッチするページを一覧表示
  ### **Page Connection**
     - 現在開いているページに関連するページを一覧表示
     - ページコンテンツの下側ではなく、ポップアップに、下位階層へのリンク(Namespace)とページタグの表示。
### **Table of Contents with Sub-pages**
  - サブページも統合された目次機能。
    > ※ページ内でのスクロールではなく、ブロックへのズームインとして機能します。
  - サブページの作成とブロックの移動をサポート

</td>
<td><img src="https://github.com/user-attachments/assets/acaa22a4-8b3d-4934-aea2-201d924f9c46" height="800px" width="350px" /></td>
</tr></table>

---

## 始めに

Logseq マーケットプレイスからインストール
  - 右上のツールバーで[`---`]をクリックして[`プラグイン`]を開きます。`マーケットプレイス`を選択し、検索フィールドに`Headers`と入力し、検索結果から選択してインストールします。

### 使用方法


- ツールバーのボタンが、最初のトグルになっています。
   - ポップアップが表示されている間、ユーザーがページを移動したら、そのページの目次に切り替わります。
   > 最初、このボタンはLogseqによって非表示にされています。ツールバーのこのボタン (![アイコン](https://github.com/YU000jp/logseq-plugin-bullet-point-custom-icon/assets/111847207/136f9d0f-9dcf-4942-9821-c9f692fcfc2f)) をクリックし、その後、この ![image](https://github.com/user-attachments/assets/5445bf64-6c5c-4dcf-981c-ad3ec176930f) を選択します。その後、ツールバーに 🏢 ボタンが表示されます。
- 目次では、ブロックをズームインで開きますが、ページコネクション内では、階層の上下移動のために、ページが直接開かないようになっています。(Ctrl+クリックでページとして開きます)


## 🚀 使用のヒント

1. **サブページ作成**: ページ名横の➕で素早くサブページを作成
2. **スマートなブロック移動**: ヘッダーをCtrl+クリックでサブページに移動
3. **クイックアクセス**: `Ctrl/Cmd + F1`でポップアップ切り替え
4. **ブロック昇格**: 箇条書きを右クリックでページに昇格

## ⚠️ 注意事項

- 競合を防ぐため、階層/タグ表示は自動的に非表示
- サイドバー使用時はポップアップを閉じる
- ページサイズや埋め込みコンテンツにより性能が変動
- 他のTOCプラグインは無効化推奨
- Side Blockプラグインと互換（設定で`#.side(-[a-z])?`を追加）

#### Tip

1. ページ名の隣にある➕ボタンを押すと、サブページの作成がおこなえます。類似するページ名が候補として表示されます。
1. 目次のヘッダーをCtrl+クリックして、そのヘッダーがあるブロックとそのサブブロックを、サブページに移設することが可能です。
   > 注: ブロックの移設後に、ブロック背景色を示す"backgroundcolor"プロパティが残ってしまい、色が適用されない場合があります。"backgroundcolor"ページにアクセスし、"background-color"に名称を変更してください。
1. ポップアップをトグルするショートカット (デフォルト: `Ctrl/Cmd + F1`)
1. 箇条書き(ブロック)のコンテキストメニュー項目「ブロックをページに昇格させる」
   - サブブロックを含めて、新しいページに移設することができます。

#### 注意事項

- 内容が競合するため、あらかじめ、ページコンテンツ内の階層やページタグの表示を、プラグイン設定で非表示になっています。
- サイドバーとポップアップが重なることがあります。サイドバーを使う場合は、ポップアップを閉じてください。
- ページの情報量があまりに膨大な場合や、ページ埋め込みがコンテンツ内に多く存在する場合に、読み込みが遅くなる可能性があります。
- ほかの目次機能をもつプラグインがある場合、その機能は必ずオフにしてください。
- このプラグインを使う際は、Page-tags and Hierarchy プラグインの Page View UI機能を必ずオフにしてください。
- Side Block プラグインを使っている方は、プラグイン設定で、目次の文字列削除の入力欄に、「`#.side(-[a-z])?`」を追加してください
- 目次では、1階層目にあるヘッダーのみが検出されます。
- 自動ヘッダーの場合は、"heading:: true" プロパティが使われます。その場合、目次には表示されません。

## Demo

![HierarchyTool](https://github.com/user-attachments/assets/f2438a2a-019e-4e7a-bff1-b699a5ebabc3)

---

## ショーケース / 質問 / アイデア / ヘルプ

> [ディスカッション](https://github.com/YU000jp/logseq-plugin-hierarchy-tool/discussions)タブにアクセスして、この種の質問をするか見つけます。

### TODO

1. [x] 目次機能の移植
1. [x] 現在はポップアップ表示で実装されています。
1. [x] 目次の中に、下位階層を表示
1. [x] ズームページに対応 (スクロールではなく、ブロックズームにする)
1. [x] ページ名でパターンマッチをおこなってページを検索する機能を追加 (インクリメンタルサーチ)
1. [x] ヘッダーをもつブロックを、サブページ化する機能を追加 (目次のヘッダーでCtrlクリックをする)
1. [x] サブページを作成するボタンを追加
1. [x] ページタグや階層の一覧表示に対応 (ページコンテンツ内のページタグや階層の表示を代替する役割をもつ)
1. [x] サブページを作成するダイアログでのインクリメンタルサーチ (類似ページの検索)
1. [x] ショートカットで、ポップアップをトグル可能にする
1. [ ] Sticky Heading スタイル https://github.com/zhouhua/obsidian-sticky-headings
1. [ ] Logseqのdbバージョンがリリースされた後に、調整が必要。("heading:: true"などのプロパティを使用しなくなる)

## 先行技術とクレジット

- TOC > [Page-level TOC プラグイン](https://github.com/benjypng/logseq-toc-plugin)
- TOC > [TOC Generator プラグイン](https://github.com/sethyuan/logseq-plugin-tocgen)
- 左サイドバーの目次機能 > [Left Sidebar Enhance プラグイン](https://github.com/YU000jp/logseq-plugin-left-sidebar-enhance)
- アイコン > [icooon-mono.com](https://icooon-mono.com/10928-%e3%83%93%e3%83%ab%e3%81%ae%e3%82%a2%e3%82%a4%e3%82%b3%e3%83%b3/)
- 製作者 > [@YU000jp](https://github.com/YU000jp)
