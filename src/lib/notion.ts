import { Client } from "@notionhq/client"
import type { BlogPost } from "@/features/blog/types"

// 노션 클라이언트 초기화
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

const DATABASE_ID = process.env.NOTION_DATABASE_ID as string

// Data Source ID 캐싱
let cachedDataSourceId: string | null = null

/**
 * 데이터베이스 정보에서 Data Source ID를 가져옵니다.
 */
async function getDataSourceId(): Promise<string> {
  if (cachedDataSourceId) return cachedDataSourceId

  try {
    const database = await notion.databases.retrieve({
      database_id: DATABASE_ID,
    })

    if ("data_sources" in database && Array.isArray(database.data_sources)) {
      const dataSource = database.data_sources[0]
      if (dataSource && "id" in dataSource) {
        cachedDataSourceId = dataSource.id
        return cachedDataSourceId
      }
    }

    cachedDataSourceId = DATABASE_ID
    return cachedDataSourceId
  } catch {
    cachedDataSourceId = DATABASE_ID
    return cachedDataSourceId
  }
}

// ============================================
// 타입 정의
// ============================================

interface NotionRichText {
  plain_text: string
  annotations?: {
    bold?: boolean
    italic?: boolean
    strikethrough?: boolean
    code?: boolean
  }
  href?: string | null
}

interface NotionBlock {
  type: string
  paragraph?: { rich_text: NotionRichText[] }
  heading_1?: { rich_text: NotionRichText[] }
  heading_2?: { rich_text: NotionRichText[] }
  heading_3?: { rich_text: NotionRichText[] }
  bulleted_list_item?: { rich_text: NotionRichText[] }
  numbered_list_item?: { rich_text: NotionRichText[] }
  code?: { rich_text: NotionRichText[]; language?: string }
  quote?: { rich_text: NotionRichText[] }
  callout?: { rich_text: NotionRichText[]; icon?: { emoji?: string } }
  divider?: object
  image?: {
    type: "external" | "file"
    external?: { url: string }
    file?: { url: string }
    caption?: NotionRichText[]
  }
}

interface NotionPageProperties {
  이름: { type: "title"; title: Array<{ plain_text: string }> }
  상태: { type: "status"; status: { name: string } | null }
  선택: { type: "select"; select: { name: string } | null }
  "최종 편집 일시": { type: "last_edited_time"; last_edited_time: string }
}

interface NotionPageResult {
  id: string
  cover:
    | { type: "external"; external: { url: string } }
    | { type: "file"; file: { url: string } }
    | null
  properties: NotionPageProperties
}

// ============================================
// HTML 변환 (동기, 최적화)
// ============================================

/**
 * HTML 이스케이프
 */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

/**
 * 인라인 코드 백틱 패턴 처리
 * - `code` 또는 "`code`" 등의 패턴을 처리
 * - smart quotes (curly quotes) 포함
 */
function processInlineCode(text: string): { isCode: boolean; content: string } {
  // 모든 종류의 따옴표 (normal + smart quotes)
  const quotes = `["'"'""\`]`

  // 백틱으로 감싸진 패턴
  const pattern = new RegExp(`^${quotes}*\`(.+)\`${quotes}*$`)
  const match = text.match(pattern)

  if (match) {
    return { isCode: true, content: match[1] }
  }

  return { isCode: false, content: text }
}

/**
 * Rich Text 배열을 HTML 문자열로 변환 (동기 처리)
 */
function richTextToHtml(richTexts: NotionRichText[]): string {
  if (!richTexts?.length) return ""

  return richTexts
    .map((rt) => {
      let text = rt.plain_text
      if (!text) return ""

      const { annotations, href } = rt

      // 인라인 코드 처리
      if (annotations?.code) {
        // annotations.code가 true면 백틱/따옴표 제거 후 코드로 처리
        // smart quotes: " " ' ' 포함
        const codeText = text
          .replace(/^["`'\u201C\u201D\u2018\u2019]+/g, "")
          .replace(/["`'\u201C\u201D\u2018\u2019]+$/g, "")
        return `<code class="inline-code">${escapeHtml(codeText)}</code>`
      }

      // 백틱 패턴 체크
      const { isCode, content } = processInlineCode(text)
      if (isCode) {
        return `<code class="inline-code">${escapeHtml(content)}</code>`
      }

      // HTML 이스케이프
      text = escapeHtml(text)

      // 볼드
      if (annotations?.bold) {
        text = `<strong>${text}</strong>`
      }
      // 이탤릭
      if (annotations?.italic) {
        text = `<em>${text}</em>`
      }
      // 취소선
      if (annotations?.strikethrough) {
        text = `<del>${text}</del>`
      }
      // 링크
      if (href) {
        text = `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`
      }

      return text
    })
    .join("")
}

/**
 * 단일 블록을 HTML로 변환 (동기 처리)
 */
function blockToHtml(block: NotionBlock): string {
  switch (block.type) {
    case "paragraph":
      return `<p>${richTextToHtml(block.paragraph?.rich_text || [])}</p>`

    case "heading_1":
      return `<h1>${richTextToHtml(block.heading_1?.rich_text || [])}</h1>`

    case "heading_2":
      return `<h2>${richTextToHtml(block.heading_2?.rich_text || [])}</h2>`

    case "heading_3":
      return `<h3>${richTextToHtml(block.heading_3?.rich_text || [])}</h3>`

    case "bulleted_list_item":
      return `<li>${richTextToHtml(
        block.bulleted_list_item?.rich_text || []
      )}</li>`

    case "numbered_list_item":
      return `<li>${richTextToHtml(
        block.numbered_list_item?.rich_text || []
      )}</li>`

    case "code": {
      const code =
        block.code?.rich_text?.map((rt) => rt.plain_text).join("") || ""
      const lang = block.code?.language || "plaintext"
      // 코드 블록을 마크다운으로 유지 (react-syntax-highlighter 사용)
      return `\n\`\`\`${lang}\n${code}\n\`\`\`\n`
    }

    case "quote":
      return `<blockquote>${richTextToHtml(
        block.quote?.rich_text || []
      )}</blockquote>`

    case "callout": {
      const emoji = block.callout?.icon?.emoji || "💡"
      const text = richTextToHtml(block.callout?.rich_text || [])
      return `<div class="callout"><span class="callout-emoji">${emoji}</span><span>${text}</span></div>`
    }

    case "divider":
      return "<hr />"

    case "image": {
      const url =
        block.image?.type === "external"
          ? block.image.external?.url
          : block.image?.file?.url
      const caption =
        block.image?.caption?.map((c) => c.plain_text).join("") || ""
      return url
        ? `<figure><img src="${url}" alt="${escapeHtml(caption)}" />${
            caption ? `<figcaption>${escapeHtml(caption)}</figcaption>` : ""
          }</figure>`
        : ""
    }

    default:
      return ""
  }
}

// ============================================
// API 함수
// ============================================

/**
 * 노션 페이지를 BlogPost로 변환
 */
function transformPageToPost(page: NotionPageResult): BlogPost {
  const props = page.properties

  return {
    id: page.id,
    title: props.이름?.title?.map((t) => t.plain_text).join("") || "제목 없음",
    date: props["최종 편집 일시"]?.last_edited_time || "",
    category: (props.선택?.select?.name || "Skill") as
      | "Skill"
      | "Trouble Shooting",
    status: props.상태?.status?.name || "시작 전",
    cover:
      page.cover?.type === "external"
        ? page.cover.external.url
        : page.cover?.type === "file"
          ? page.cover.file.url
          : undefined,
  }
}

/**
 * 블로그 포스트 목록 가져오기
 */
export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const dataSourceId = await getDataSourceId()

    const response = await notion.dataSources.query({
      data_source_id: dataSourceId,
      filter: {
        property: "상태",
        status: { equals: "완료" },
      },
      sorts: [{ property: "최종 편집 일시", direction: "descending" }],
    })

    return response.results
      .filter(
        (page): page is typeof page & { properties: NotionPageProperties } =>
          "properties" in page
      )
      .map((page) => transformPageToPost(page as unknown as NotionPageResult))
  } catch (error) {
    console.error("Failed to fetch blog posts:", error)
    return []
  }
}

/**
 * 단일 블로그 포스트 가져오기
 */
export async function getBlogPostById(
  pageId: string
): Promise<BlogPost | null> {
  try {
    const response = await notion.pages.retrieve({ page_id: pageId })

    if (!("properties" in response)) return null

    return transformPageToPost(response as unknown as NotionPageResult)
  } catch (error) {
    console.error(`Failed to fetch blog post ${pageId}:`, error)
    return null
  }
}

/**
 * 블로그 포스트 콘텐츠 가져오기
 * - 단일 API 호출로 최상위 블록만 가져옴 (재귀 없음)
 * - 리스트 아이템 그룹핑으로 올바른 HTML 구조 생성
 */
export async function getBlogPostContent(
  pageId: string
): Promise<string | null> {
  try {
    const response = await notion.blocks.children.list({
      block_id: pageId,
      page_size: 100,
    })

    const blocks = response.results as unknown as NotionBlock[]
    const htmlParts: string[] = []
    let currentListType: "bulleted" | "numbered" | null = null
    let listItems: string[] = []

    // 리스트 플러시 함수
    const flushList = (): void => {
      if (listItems.length > 0) {
        const tag = currentListType === "numbered" ? "ol" : "ul"
        htmlParts.push(`<${tag}>${listItems.join("")}</${tag}>`)
        listItems = []
        currentListType = null
      }
    }

    for (const block of blocks) {
      const type = block.type

      if (type === "bulleted_list_item" || type === "numbered_list_item") {
        const listType = type === "bulleted_list_item" ? "bulleted" : "numbered"

        // 리스트 타입이 변경되면 이전 리스트 플러시
        if (currentListType && currentListType !== listType) {
          flushList()
        }

        currentListType = listType
        listItems.push(blockToHtml(block))
      } else {
        // 리스트가 아닌 블록이면 이전 리스트 플러시
        flushList()

        const html = blockToHtml(block)
        if (html) {
          htmlParts.push(html)
        }
      }
    }

    // 마지막 리스트 플러시
    flushList()

    return htmlParts.join("\n")
  } catch (error) {
    console.error(`Failed to fetch content for post ${pageId}:`, error)
    return null
  }
}

/**
 * 블로그 포스트 미리보기 (최신 N개만 가져오기)
 * - 메인 페이지의 Blog 섹션에서 사용
 */
export async function getBlogPostsPreview(
  limit: number = 4
): Promise<BlogPost[]> {
  try {
    const dataSourceId = await getDataSourceId()

    const response = await notion.dataSources.query({
      data_source_id: dataSourceId,
      filter: {
        property: "상태",
        status: { equals: "완료" },
      },
      sorts: [{ property: "최종 편집 일시", direction: "descending" }],
      page_size: limit,
    })

    return response.results
      .filter(
        (page): page is typeof page & { properties: NotionPageProperties } =>
          "properties" in page
      )
      .map((page) => transformPageToPost(page as unknown as NotionPageResult))
  } catch (error) {
    console.error("Failed to fetch blog posts preview:", error)
    return []
  }
}

// Alias exports
export const getPosts = getBlogPosts
export const getPost = getBlogPostById
export const getPostContent = getBlogPostContent
export const getPostsPreview = getBlogPostsPreview
