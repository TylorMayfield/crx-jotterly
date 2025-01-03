/* eslint-disable react/prop-types */
import {
  Paper,
  Group,
  Text,
  Badge,
  Button,
  Modal,
  ActionIcon,
} from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { useState } from "react";

const NoteItem = ({ note, onDelete, onSelect }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleDelete = () => {
    onDelete();
    setModalOpen(false);
  };

  return (
    <>
      <Paper
        p="md"
        withBorder
        onClick={onSelect}
        style={{
          cursor: "pointer",
          position: "relative",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Vertical red stripe for delete button */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "12px",
            height: "100%",
            backgroundColor: "red",
            borderTopRightRadius: "8px",
            borderBottomRightRadius: "8px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Delete Icon */}
          <ActionIcon
            variant="transparent"
            color="white"
            onClick={(e) => {
              e.stopPropagation();
              setModalOpen(true);
            }}
            style={{
              padding: 6,
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            <IconX size={14} />
          </ActionIcon>
        </div>

        {/* Note Title and Content */}
        <Group position="apart" noWrap mb={4}>
          <Text size="sm" fw={500} lineClamp={1}>
            {note.title || "Untitled Note"}
          </Text>
        </Group>
        <Text c="dimmed" size="xs" lineClamp={2} mb={6}>
          {note.content || "No content"}
        </Text>

        {/* Tags Section */}
        {note.tags && note.tags.length > 0 && (
          <Group gap={4}>
            {note.tags.map((tag, idx) => (
              <Badge
                key={idx}
                size="xs"
                variant="light"
                style={{ textTransform: "lowercase" }}
              >
                {tag}
              </Badge>
            ))}
          </Group>
        )}
      </Paper>

      <Modal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Confirm Deletion"
      >
        <Text>Are you sure you want to delete this note?</Text>
        <Group position="right" mt="md">
          <Button variant="subtle" onClick={() => setModalOpen(false)}>
            Cancel
          </Button>
          <Button variant="filled" color="red" onClick={handleDelete}>
            Delete
          </Button>
        </Group>
      </Modal>
    </>
  );
};

export default NoteItem;
