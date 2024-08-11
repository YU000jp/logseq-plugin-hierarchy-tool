# Logseq プラグイン: Hierarchy Tool (TOC)

- 階層やヘッダーが使われている包括的なページを、表示または分割するために最適化された目次機能です！

<div align="right">
 
[English](https://github.com/YU000jp/logseq-plugin-hierarchy-tool) / [日本語](https://github.com/YU000jp/logseq-plugin-hierarchy-tool/blob/main/readme.ja.md) [![latest release version](https://img.shields.io/github/v/release/YU000jp/logseq-plugin-hierarchy-tool)](https://github.com/YU000jp/logseq-plugin-hierarchy-tool/releases) [![License](https://img.shields.io/github/license/YU000jp/logseq-plugin-hierarchy-tool?color=blue)](https://github.com/YU000jp/logseq-plugin-hierarchy-tool/LICENSE) [![Downloads](https://img.shields.io/github/downloads/YU000jp/logseq-plugin-hierarchy-tool/total.svg)](https://github.com/YU000jp/logseq-plugin-hierarchy-tool/releases)
<a href="https://www.buymeacoffee.com/yu000japan"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a pizza&emoji=🍕&slug=yu000japan&button_colour=FFDD00&font_colour=000000&font_family=Poppins&outline_colour=000000&coffee_colour=ffffff" /></a>
 </div>

## 概要

<table><tr><td>

- ページを開かずに、階層を頼りに目的のページを探します。
  ### **Incremental Page Search**
     - ページ検索機能。文字入力にマッチするページを一覧表示
  ### **Page Connection**
     - 現在開いているページに関連するページを一覧表示
### **Table of Contents with Sub-pages**
  - サブページも統合された目次機能。
    > ※ページ内でのスクロールではなく、ブロックへのズームインとして機能します。

</td>
<td><img src="https://github.com/user-attachments/assets/acaa22a4-8b3d-4934-aea2-201d924f9c46" height="800px" /></td>
</tr></table>

---

## 始めに

Logseq マーケットプレイスからインストール
  - 右上のツールバーで[`---`]をクリックして[`プラグイン`]を開きます。`マーケットプレイス`を選択し、検索フィールドに`Headers`と入力し、検索結果から選択してインストールします。

### 使用方法


- ツールバーのボタンが、最初のトグルになっています。
   - ポップアップが表示されている間、ユーザーがページを移動したら、そのページの目次に切り替わります。
   > 最初、このボタンはLogseqによって非表示にされています。ツールバーのこのボタン (![アイコン](https://github.com/YU000jp/logseq-plugin-bullet-point-custom-icon/assets/111847207/136f9d0f-9dcf-4942-9821-c9f692fcfc2f)) をクリックし、その後、この (![image](https://github.com/user-attachments/assets/1121f7af-b4f6-4bec-bfd3-1f3d2b97745e)) を選択します。その後、ツールバーに 🛢️ ボタンが表示されます。
- 目次では、ブロックをズームインで開きますが、ページコネクション内では、階層の上下移動のために、ページが直接開かないようになっています。(Ctrl+クリックでページとして開きます)


#### Tip

1. ページ名の隣にある➕ボタンを押すと、サブページの作成がおこなえます。類似するページ名が候補として表示されます。
1. ヘッダーごとに分割し、情報量の増えてしまった包括的なページを、サブページに分割するワークフローを提供します。
   - 目次のヘッダーをCtrl+クリックして、そのヘッダーがあるブロックとそのサブブロックを、サブページに移設することが可能です。
1. ポップアップをトグルするショートカット (デフォルト: `Ctrl/Cmd + F1`)

#### 注意事項

- サイドバーとポップアップが重なることがあります。サイドバーを使う場合は、ポップアップを閉じてください。
- ページの情報量があまりに膨大な場合や、ページ埋め込みがコンテンツ内に多く存在する場合に、読み込みが遅くなる可能性があります。

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

## 先行技術とクレジット

- TOC > [Page-level TOC プラグイン](https://github.com/benjypng/logseq-toc-plugin)
- TOC > [TOC Generator プラグイン](https://github.com/sethyuan/logseq-plugin-tocgen)
- 左サイドバーの目次機能 > [Left Sidebar Enhance プラグイン](https://github.com/YU000jp/logseq-plugin-left-sidebar-enhance)
- アイコン > [icooon-mono.com](https://icooon-mono.com/10933-%e3%83%89%e3%83%a9%e3%83%a0%e7%bc%b6%e3%81%ae%e3%82%a2%e3%82%a4%e3%82%b3%e3%83%b32/)
- 製作者 > [@YU000jp](https://github.com/YU000jp)
