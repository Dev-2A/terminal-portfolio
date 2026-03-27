/**
 * 명령어 실행 결과를 쉽게 생성하기 위한 헬퍼 함수들
 */

export const out = {
  info: (content) => ({ type: "info", content }),
  success: (content) => ({ type: "success", content }),
  error: (content) => ({ type: "error", content }),
  warning: (content) => ({ type: "warning", content }),
  accent: (content) => ({ type: "accent", content }),
  purple: (content) => ({ type: "purple", content }),
  cyan: (content) => ({ type: "cyan", content }),
  comment: (content) => ({ type: "comment", content }),
  ascii: (content) => ({ type: "ascii", content }),
  blank: () => ({ type: "info", content: "" }),
};

/**
 * 테이블 형태 출력 생성
 * @param {Array} rows - [{ key, value }] 배열
 * @param {number} keyWidth - 키 컬럼 폭
 */
export function table(rows, keyWidth = 20) {
  return rows.map(({ key, value, type = "info" }) => ({
    type,
    content: `  ${key.padEnd(keyWidth)} ${value}`,
  }));
}

/**
 * 구분선 생성
 */
export function divider(char = "─", length = 50) {
  return out.comment(char.repeat(length));
}
