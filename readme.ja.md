# Logseq プラグイン: Hierarchy Tool (TOC)

- 階層やヘッダーが使われている包括的なページを、表示または分割するために最適化された目次機能です！


- 左サイドバーの目次機能 >>> [Left Sidebar Enhance](https://github.com/YU000jp/logseq-plugin-left-sidebar-enhance) プラグイン

<div align="right">
 
[English](https://github.com/YU000jp/logseq-plugin-hierarchy-tool) / [日本語](https://github.com/YU000jp/logseq-plugin-hierarchy-tool/blob/main/readme.ja.md) [![latest release version](https://img.shields.io/github/v/release/YU000jp/logseq-plugin-hierarchy-tool)](https://github.com/YU000jp/logseq-plugin-hierarchy-tool/releases) [![License](https://img.shields.io/github/license/YU000jp/logseq-plugin-hierarchy-tool?color=blue)](https://github.com/YU000jp/logseq-plugin-hierarchy-tool/LICENSE) [![Downloads](https://img.shields.io/github/downloads/YU000jp/logseq-plugin-hierarchy-tool/total.svg)](https://github.com/YU000jp/logseq-plugin-hierarchy-tool/releases)
<a href="https://www.buymeacoffee.com/yu000japan"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a pizza&emoji=🍕&slug=yu000japan&button_colour=FFDD00&font_colour=000000&font_family=Poppins&outline_colour=000000&coffee_colour=ffffff" /></a>
 </div>

## 概要

- ページを開かずに、階層を頼りに目的のページを探します。
  ### **Incremental Page Search**
     - ページ検索機能。文字入力にマッチするページを一覧表示
  ### **Page Connection**
     - 現在開いているページに関連するページを一覧表示
### **Table of Contents with Sub-pages**
  - サブページも統合された目次機能。
    > ※ページ内でのスクロールではなく、ブロックへのズームインとして機能します。

### TODO

1. [x] 目次機能の移植
1. [x] 現在はポップアップ表示で実装されています。
1. [x] 目次の中に、下位階層を表示
1. [x] ズームページに対応 (スクロールではなく、ブロックズームにする)
1. [x] ページ名でパターンマッチをおこなってページを検索する機能を追加
1. [x] ヘッダーをもつブロックを、サブページ化する機能を追加 (目次のヘッダーでCtrlクリックをする)
1. [x] サブページを作成するボタンを追加
1. [x] ページタグや階層の一覧表示に対応 (ページコンテンツ内のページタグや階層の表示を代替する役割をもつ)
1. [ ] 目次などで、カーソルを合わせた際に、マークダウンのプレビューを表示する

---

## 始めに

Logseq マーケットプレイスからインストール
  - 右上のツールバーで[`---`]をクリックして[`プラグイン`]を開きます。`マーケットプレイス`を選択し、検索フィールドに`Headers`と入力し、検索結果から選択してインストールします。

### 使用方法


- ツールバーのボタンが、最初のトグルになっています。
   - ポップアップが表示されている間、ユーザーがページを移動したらそのページの目次に切り替わります。
   > 最初、このボタンはLogseqによって非表示にされています。ツールバーのこのボタン (![アイコン](https://github.com/YU000jp/logseq-plugin-bullet-point-custom-icon/assets/111847207/136f9d0f-9dcf-4942-9821-c9f692fcfc2f)) をクリックし、その後、この (![image](https://github.com/user-attachments/assets/1121f7af-b4f6-4bec-bfd3-1f3d2b97745e)) を選択します。その後、ツールバーに 🛢️ ボタンが表示されます。

---

## ショーケース / 質問 / アイデア / ヘルプ

> [ディスカッション](https://github.com/YU000jp/logseq-plugin-hierarchy-tool/discussions)タブにアクセスして、この種の質問をするか見つけます。

## 先行技術とクレジット

- アイコン > [icooon-mono.com](https://icooon-mono.com/10933-%e3%83%89%e3%83%a9%e3%83%a0%e7%bc%b6%e3%81%ae%e3%82%a2%e3%82%a4%e3%82%b3%e3%83%b32/)
- 製作者 > [@YU000jp](https://github.com/YU000jp)
