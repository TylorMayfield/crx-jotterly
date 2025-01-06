/* eslint-disable react/prop-types */
import {
  Paper,
  Group,
  Text,
  ActionIcon,
  Modal,
  Button,
  Stack,
  Badge,
} from "@mantine/core";
import { IconPin, IconTrash } from "@tabler/icons-react";
import { useState } from "react";

const NoteItem = ({ note, onDelete, onSelect, togglePinNote }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleDelete = () => {
    onDelete();
    setModalOpen(false);
  };

  const handlePinClick = (e) => {
    e.stopPropagation();
    togglePinNote();
  };

  return (
    <>
      <Paper
        onClick={onSelect}
        withBorder
        p="md"
        style={{
          cursor: "pointer",
          position: "relative",
          borderRadius: "8px",
          border: "1px solid var(--mantine-color-gray-3)",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          transition: "all 0.1s ease",
          willChange: "transform",
          animation: "slideIn 0.1s ease-out",
          backgroundColor: "var(--mantine-color-body)",
          "&:hover": {
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
            transform: "scale(1.02)",
          },
        }}
      >
        <Group justify="space-between" mb="xs" spacing="xs">
          <Group>
            <ActionIcon
              variant={note.pinned ? "filled" : "subtle"}
              onClick={handlePinClick}
              aria-label="Pin note"
            >
              <IconPin size={16} />
            </ActionIcon>
            <Text fw={500} size="sm" lineClamp={1}>
              {note.title || "Untitled Note"}
            </Text>
          </Group>
          <ActionIcon
            variant="subtle"
            color="red"
            onClick={(e) => {
              e.stopPropagation();
              setModalOpen(true);
            }}
            aria-label="Delete note"
          >
            <IconTrash size={16} />
          </ActionIcon>
        </Group>
        <Text size="sm" color="dimmed" lineClamp={2} mb="xs">
          {note.content || "Empty note"}
        </Text>
        {note.tags && note.tags.length > 0 && (
          <Group spacing="xs">
            {note.tags.map((tag, index) => (
              <Badge key={index} size="sm" variant="light">
                {tag}
              </Badge>
            ))}
          </Group>
        )}
      </Paper>

      <Modal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Delete Note"
        centered
      >
        <Stack>
          <Text>Are you sure you want to delete this note?</Text>
          <Group justify="flex-end" mt="md">
            <Button variant="default" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button color="red" onClick={handleDelete}>
              Delete
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
};

export default NoteItem;
