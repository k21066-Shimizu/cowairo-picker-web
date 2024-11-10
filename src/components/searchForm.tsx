import { For, HStack } from "@chakra-ui/react";
import SearchSlider from "./searchSlider";

const SCORE_LABELS = [
  { name: "声の性別", low: "女性的", high: "男性的" },
  { name: "滑舌", low: "舌足らず", high: "はきはき" },
  { name: "特有性", low: "素直", high: "癖がある" },
  { name: "声の年齢", low: "幼い", high: "大人びた" },
  { name: "透明感", low: "ノイジー", high: "クリア" },
  { name: "声の強さ", low: "優しい", high: "力強い" },
  { name: "声の明度", low: "暗い", high: "明るい" },
];

export default function SearchForm() {
  return (
    <HStack maxW={"2xl"} w={"100%"} justify={"space-around"}>
      <For each={SCORE_LABELS}>{(label) => <SearchSlider key={label.name} label={label} />}</For>
    </HStack>
  );
}
