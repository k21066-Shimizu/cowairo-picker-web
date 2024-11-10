import { Slider } from "@/components/ui/slider";
import { VStack } from "@chakra-ui/react";

type Props = {
  label: { name: string; low: string; high: string };
};

export default function SearchSlider(props: Props) {
  const { label } = props;

  return (
    <VStack>
      <p>{label.name}</p>
      <p>{label.high}</p>
      <Slider height={"200px"} orientation="vertical" defaultValue={[40]} />
      <p>{label.low}</p>
    </VStack>
  );
}
