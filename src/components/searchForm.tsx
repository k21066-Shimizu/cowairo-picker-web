"use client";

import { Button } from "@/components/ui/button";
import { ScoreId } from "@/consts/scores";
import { For, HStack } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import SearchSlider from "./searchSlider";

const SCORE_LABELS = [
  { id: "gen", name: "声の性別", low: "女性的", high: "男性的" },
  { id: "lsn", name: "滑舌", low: "舌足らず", high: "はきはき" },
  { id: "unq", name: "特有性", low: "素直", high: "癖がある" },
  { id: "age", name: "声の年齢", low: "幼い", high: "大人びた" },
  { id: "clr", name: "透明感", low: "ノイジー", high: "クリア" },
  { id: "pow", name: "声の強さ", low: "優しい", high: "力強い" },
  { id: "brt", name: "声の明度", low: "暗い", high: "明るい" },
] as const;

type Props = {
  setScores: Dispatch<SetStateAction<Record<ScoreId, [number] | undefined>>>;
};

export default function SearchForm(props: Props) {
  const { setScores } = props;
  const methods = useForm<Record<(typeof SCORE_LABELS)[number]["id"], [number] | undefined>>({
    defaultValues: { gen: [3], lsn: [3], unq: [3], age: [3], clr: [3], pow: [3], brt: [3] },
  });
  const { handleSubmit } = methods;

  const onSubmit = handleSubmit(async (data) => setScores(data));

  return (
    <HStack as={"form"} onSubmit={onSubmit} maxW={"2xl"} w={"100%"} justify={"space-around"}>
      <For each={SCORE_LABELS}>
        {(label) => <SearchSlider key={label.id} label={label} methods={methods} />}
      </For>
      <Button type={"submit"}>検索</Button>
    </HStack>
  );
}
