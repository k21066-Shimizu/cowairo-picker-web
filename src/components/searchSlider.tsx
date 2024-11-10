import { Slider } from "@/components/ui/slider";
import { VStack } from "@chakra-ui/react";
import { ControllerRenderProps } from "react-hook-form";

type Props = {
  label: { name: string; low: string; high: string };
  field: ControllerRenderProps<
    Record<"gen" | "lsn" | "unq" | "age" | "clr" | "pow" | "brt", number[]>,
    "gen" | "lsn" | "unq" | "age" | "clr" | "pow" | "brt"
  >;
};

export default function SearchSlider(props: Props) {
  const { label, field } = props;

  return (
    <VStack>
      <p>{label.name}</p>
      <p>{label.high}</p>
      <Slider
        height={"200px"}
        orientation="vertical"
        defaultValue={[4]}
        max={7}
        min={1}
        step={0.1}
        onFocusChange={({ focusedIndex }) => {
          if (focusedIndex !== -1) return;
          field.onBlur();
        }}
        name={field.name}
        value={field.value}
        onValueChange={({ value }) => {
          field.onChange(value);
        }}
      />
      <p>{label.low}</p>
    </VStack>
  );
}
