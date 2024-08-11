

//ページ名でパターンマッチするページを探すクエリー
const queryPageNamePattern = `
[:find (pull ?p [:block/original-name,:block/uuid])
        :in $ ?pattern
        :where
        [?p :block/name ?c]
        [(re-pattern ?pattern) ?q]
        [(re-find ?q ?c)]
]
`

// クエリーでは、ページ名を小文字にする必要がある (ここでは、originalNameではなく、nameを使う)
export const getQueryPageNamePattern = async (pageName: string) =>
        (await logseq.DB.datascriptQuery(queryPageNamePattern, `"${pageName.toLowerCase()}"`) as any | null)?.flat() as {
                "original-name": string
                "uuid": string
        }[] | null