import SearchForm from "@/components/searchForm";
import { Stack } from "@chakra-ui/react";

export default function Home() {
  return (
    <>
      <SearchForm />
      <Stack gap={4} dir={"row"} wrap={"wrap"}></Stack>
    </>
  );
}
