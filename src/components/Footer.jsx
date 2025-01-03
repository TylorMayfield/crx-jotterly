import { Text, Center, Box, Group } from "@mantine/core";
import { IconCoffee } from "@tabler/icons-react";

const Footer = () => {
  return (
    <Center h="100%" bg="white" p="md">
      <Box>
        <Group position="center" spacing="md">
          <Text size="sm" color="dimmed">
            &copy; 2025 Jotterly. All rights reserved.{" "}
            <a
              href="https://ko-fi.com/tylormayfield"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <IconCoffee
                size={16}
                style={{ verticalAlign: "middle", marginRight: "4px" }}
              />
              Buy me a coffee
            </a>
          </Text>
        </Group>
      </Box>
    </Center>
  );
};

export default Footer;
