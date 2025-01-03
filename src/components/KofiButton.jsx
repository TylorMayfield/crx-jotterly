import { Button, Group } from "@mantine/core";
import { IconCoffee } from "@tabler/icons-react";

export default function KofiButton() {
  return (
    <Group position="center" my="md">
      <a
        href="https://ko-fi.com/tylormayfield"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button
          leftIcon={<IconCoffee size={16} />}
          variant="light"
          color="blue"
        >
          Buy me a coffee
        </Button>
      </a>
    </Group>
  );
}
