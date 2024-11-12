"use client";

import { Button } from "@/components/ui/button";
import { formSchema } from "@/consts/schema";
import { SCORE_LABELS, ScoreId } from "@/consts/scores";
import { For, HStack } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import SearchSlider from "./searchSlider";

type Props = {
  setScores: Dispatch<SetStateAction<Record<ScoreId, number | undefined>>>;
};

export default function SearchForm(props: Props) {
  const { setScores } = props;
  const methods = useForm<Record<ScoreId, number | undefined>>({
    defaultValues: { gen: 3, lsn: 3, unq: 3, age: 3, clr: 3, pow: 3, brt: 3 },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = methods.handleSubmit((data) => setScores(data));

  return (
    <HStack as={"form"} onSubmit={onSubmit} maxW={"2xl"} w={"100%"} justify={"space-around"}>
      <For each={SCORE_LABELS}>
        {(label) => <SearchSlider key={label.id} label={label} methods={methods} />}
      </For>
      <Button type={"submit"}>検索</Button>
    </HStack>
  );
}
