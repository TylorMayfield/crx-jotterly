/* eslint-disable react/prop-types */
import { Button, Group, Text } from "@mantine/core";
import { IconChevronLeft } from "@tabler/icons-react";

const Breadcrumbs = ({ selectedNote, onBack, currentNote }) => {
  return (
    <Group px="md" py="xs" style={{ borderBottom: "1px solid #eee" }}>
      {selectedNote ? (
        <>
          <Button
            variant="subtle"
            leftIcon={<IconChevronLeft size={16} />}
            size="sm"
            onClick={onBack}
          >
            Back to Notes
          </Button>
          <Text size="sm" c="dimmed" style={{ marginLeft: "auto" }}>
            {currentNote?.title || "Untitled Note"}
          </Text>
        </>
      ) : (
        <Text size="sm" fw={500}>
          All Notes
        </Text>
      )}
    </Group>
  );
};

export default Breadcrumbs;
