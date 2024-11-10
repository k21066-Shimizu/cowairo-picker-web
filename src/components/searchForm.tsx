"use client";

import { Field } from "@/components/ui/field";
import { For, HStack } from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
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

export default function SearchForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Record<(typeof SCORE_LABELS)[number]["id"], number[]>>({
    defaultValues: { gen: [3], lsn: [3], unq: [3], age: [3], clr: [3], pow: [3], brt: [3] },
  });

  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <HStack as={"form"} onSubmit={onSubmit} maxW={"2xl"} w={"100%"} justify={"space-around"}>
      <For each={SCORE_LABELS}>
        {(label) => (
          <Controller
            key={label.id}
            name={label.id}
            control={control}
            render={({ field }) => (
              <Field
                label={`Slider: ${field.value[0]}`}
                invalid={!!errors[label.id]?.length}
                errorText={errors[label.id]?.[0]?.message}
              >
                <SearchSlider label={label} field={field} />
              </Field>
            )}
          />
        )}
      </For>
    </HStack>
  );
}
