import { BlockEntity, PageEntity } from "@logseq/libs/dist/LSPlugin.user"


export type blockContentWithChildren = {
  content: BlockEntity["content"]
  uuid: BlockEntity["uuid"]
  properties: BlockEntity["properties"]
  children: BlockEntity["children"]
}


export type HeaderEntity = {
  content: BlockEntity["content"]
  uuid: BlockEntity["uuid"]
  properties: BlockEntity["properties"]
  children: BlockEntity["children"]
  headerLevel: string // h1, h2, h3, h4, h5, h6
  pageContentOrSubPage: "pageContent" | "subPage"
}


export interface pageEntityShort {
  uuid: PageEntity["uuid"]
  name: PageEntity["name"]
  originalName: PageEntity["originalName"]
  properties: PageEntity["properties"]
}


export type queryItemsShort = Array<{
  "original-name": string
  uuid: string
  type: string
}>


export type PageEntityNameAndUuid = {
  originalName: PageEntity["originalName"]
  uuid: PageEntity["uuid"]
}