/**
 * 노션 Post 데이터베이스 스키마 기반 타입
 * - 이름 (title) → title
 * - 상태 (status) → status: "시작 전" | "진행 중" | "완료"
 * - 선택 (select) → category: "Skill" | "Trouble Shooting" | "Issue"
 * - 최종 편집 일시 (last_edited_time) → date
 */
export interface BlogPost {
  /** 노션 페이지 ID */
  id: string
  /** 포스트 제목 */
  title: string
  /** 최종 편집 일시 (ISO-8601) */
  date: string
  /** 카테고리: Skill, Trouble Shooting, Issue */
  category: "Skill" | "Trouble Shooting" | "Issue"
  /** 상태: 시작 전, 진행 중, 완료 */
  status: string
  /** 커버 이미지 URL (optional) */
  cover?: string
}
