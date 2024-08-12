import { SettingSchemaDesc } from '@logseq/libs/dist/LSPlugin.user'
import { t } from 'logseq-l10n'

/* user setting */
// https://logseq.github.io/plugins/types/SettingSchemaDesc.html
export const settingsTemplate = (): SettingSchemaDesc[] => [


    {// 共通設定
        key: "heading0000",
        title: t("Common") + " " + t("Settings"),
        type: "heading",
        description: "",
        default: "",
    },
    {// 起動時に自動的にポップアップを表示する
        key: "autoPopup",
        title: t("Auto popup at startup"),
        type: "boolean",
        default: false,
        description: "",
    },
    {// Logseq Coreのページコンテンツ内Hierarchyを非表示にする
        key: "hideHierarchyInPageContent",
        title: t("Hide hierarchy in page content"),
        type: "boolean",
        default: true,
        description: "",
    },
    {// Logseq Coreのページコンテンツ内PageTagsを非表示にする
        key: "hidePageTagsInPageContent",
        title: t("Hide page-tags in page content"),
        type: "boolean",
        default: true,
        description: "",
    },
    {// ポップアップの横幅
        key: "popupWidth",
        title: t("Popup width"),
        type: "enum",
        enumChoices: ["280px", "300px", "320px", "340px", "380px", "400px", "420px", "440px", "460px", "480px", "500px", "520px", "600px"],
        default: "380px",
        description: "default: 380px",
    },
    {// ポップアップの縦幅
        key: "popupHeight",
        title: t("Popup height"),
        type: "enum",
        enumChoices: ["93vh", "90vh", "85vh", "80vh", "75vh", "70vh", "65vh", "60vh", "55vh", "50vh", "45vh"],
        default: "93vh",
        description: "default: 93vh",
    },
    {// 箇条書きコンテキストにコマンド追加「Promoting a block to a page」
        key: "commandBlockToPage",
        title: t("Enable Bullet context menu 'Promoting a block to a page'"),
        type: "boolean",
        default: true,
        description: t("If disabled via a toggle, this will not be reflected until this plugin is switched off."),
    },



    {// Query Settings
        key: "heading0010",
        title: t("Query") + " " + t("Settings"),
        type: "heading",
        description: "",
        default: "",
    },
    {//ページ名に階層が含まれている場合、その最後の階層をもとにクエリーを取得する
        key: "queryLastHierarchy",
        title: t("Query the last hierarchy if the page name contains a hierarchy"),
        type: "boolean",
        default: true,
        description: "",
    },
    {//ページタグでクエリーを取得する
        key: "queryWithPageTagsProperty",
        title: t("Query with page-tags property"),
        type: "boolean",
        default: true,
        description: "",
    },
    {//ページaliasでクエリーを取得する
        key: "queryWithPageAliasProperty",
        title: t("Query with page-alias property"),
        type: "boolean",
        default: true,
        description: "",
    },
    {// namespaceでクエリーを取得する
        key: "queryNamespace",
        title: t("Query Namespace"),
        type: "boolean",
        default: true,
        description: "",
    },



    {//Table of Contents Settings
        key: "heading0020",
        title: t("Table of Contents") + " " + t("Settings"),
        type: "heading",
        description: "",
        default: "",
    },
    {//Table of Contents、削除する単語リスト 改行区切り
        key: "tocRemoveWordList",
        title: t("Remove words from table of contents"),
        type: "string",
        inputAs: "textarea",
        default: "#\.side(-[a-z])?", // Side Block プラグイン用
        // 改行区切り
        // 記入例:
        // #tagのような文字列
        //正規表現に対応
        description: `
            ${t("Separate with line breaks")}
            ${t("Example:")}
            ${t("Remove the string")} >> #tag
            ${t("Regular expression is supported")} >> #\.side(-[a-z])?
            `,
    },

]
