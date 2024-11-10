export const SCORE_LABELS = [
  { id: "gen", name: "声の性別", low: "女性的", high: "男性的" },
  { id: "lsn", name: "滑舌", low: "舌足らず", high: "はきはき" },
  { id: "unq", name: "特有性", low: "素直", high: "癖がある" },
  { id: "age", name: "声の年齢", low: "幼い", high: "大人びた" },
  { id: "clr", name: "透明感", low: "ノイジー", high: "クリア" },
  { id: "pow", name: "声の強さ", low: "優しい", high: "力強い" },
  { id: "brt", name: "声の明度", low: "暗い", high: "明るい" },
] as const;

export type ScoreId = (typeof SCORE_LABELS)[number]["id"];

export type Scores = Record<ScoreId, number>;

export type ScoreDataItem = {
  charactor_name: string;
  furigana: string;
  version: string;
} & Scores;
