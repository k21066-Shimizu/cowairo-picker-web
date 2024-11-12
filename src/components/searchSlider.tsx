import { Checkbox } from "@/components/ui/checkbox";
import { Field } from "@/components/ui/field";
import { Slider } from "@/components/ui/slider";
import { SCORE_LABELS, ScoreId } from "@/consts/scores";
import { VStack } from "@chakra-ui/react";
import { useState } from "react";
import { Controller, UseFormReturn } from "react-hook-form";

type Props = {
  label: (typeof SCORE_LABELS)[number];
  methods: UseFormReturn<Record<ScoreId, number | undefined>>;
};

export default function SearchSlider(props: Props) {
  const { label, methods } = props;
  const {
    control,
    formState: { errors },
  } = methods;
  const [enabled, setEnabled] = useState(true);

  return (
    <Controller
      key={label.id}
      name={label.id}
      control={control}
      disabled={!enabled}
      render={({ field }) => (
        <Field
          label={`Slider: ${field.value ?? "-"}`}
          invalid={!!errors[label.id]}
          errorText={errors[label.id]?.message}
        >
          <VStack>
            <Checkbox size={"sm"} defaultChecked onCheckedChange={(e) => setEnabled(!!e.checked)}>
              {label.name}
            </Checkbox>
            <p>{label.high}</p>
            <Slider
              height={"200px"}
              orientation="vertical"
              defaultValue={[4]}
              max={7}
              min={1}
              step={0.1}
              disabled={!enabled}
              onFocusChange={({ focusedIndex }) => {
                if (focusedIndex !== -1) return;
                field.onBlur();
              }}
              name={field.name}
              value={field.value == null ? field.value : [field.value]}
              onValueChange={({ value }) => {
                field.onChange(value[0]);
              }}
            />
            <p>{label.low}</p>
          </VStack>
        </Field>
      )}
    />
  );
}
