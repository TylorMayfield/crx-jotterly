import { Text, Center, Group } from "@mantine/core";
import { IconBrandPatreon } from "@tabler/icons-react";

const Footer = () => {
  return (
    <Center h="100%" mt="auto" p="md">
      <footer className="footer-text">
        <Group align="center" justify="center" style={{ width: "100%" }}>
          <a
            href="https://www.patreon.com/TylorMayfield"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            <Group align="center">
              <IconBrandPatreon
                style={{ display: "flex", alignItems: "center" }}
              />
              <Text
                size="sm"
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                Support on Patreon
              </Text>
            </Group>
          </a>
          <Text size="sm">|</Text>
          <Text size="sm">{new Date().getFullYear()} Tylor Mayfield</Text>
        </Group>
      </footer>
    </Center>
  );
};

export default Footer;
