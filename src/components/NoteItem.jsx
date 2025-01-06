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
import { IconPin, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { showNoteNotification } from './NotificationSystem';

const NoteItem = ({ note, onDelete, onSelect, togglePinNote }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleDelete = () => {
    onDelete();
    setModalOpen(false);
    showNoteNotification('delete', 'Note has been deleted');
  };

  const handlePinClick = (e) => {
    e.stopPropagation();
    togglePinNote();
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
          transition: "all 0.3s ease",
          willChange: "transform",
          animation: "slideIn 0.3s ease-out",
          overflow: "hidden",
          "&:hover": {
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
            transform: "translateY(-4px) scale(1.02)",
          },
        }}
      >
        {/* Left blue stripe for pin button */}
        <div
          onClick={handlePinClick}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "12px",
            height: "100%",
            backgroundColor: note.pinned ? "#1c7ed6" : "#e9ecef",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transition: "width 0.2s ease, background-color 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.width = "24px";
            e.currentTarget.style.backgroundColor = note.pinned
              ? "#1c7ed6"
              : "#dbe2e6";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.width = "12px";
            e.currentTarget.style.backgroundColor = note.pinned
              ? "#1c7ed6"
              : "#e9ecef";
          }}
        >
          {/* Pin Icon */}
          <ActionIcon
            variant="transparent"
            color={note.pinned ? "white" : "#495057"}
            style={{
              padding: 6,
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            <IconPin size={14} />
          </ActionIcon>
        </div>

        {/* Right red stripe for delete button */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            setModalOpen(true);
          }}
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "12px",
            height: "100%",
            backgroundColor: "red",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transition: "width 0.2s ease, background-color 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.width = "24px";
            e.currentTarget.style.backgroundColor = "darkred";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.width = "12px";
            e.currentTarget.style.backgroundColor = "red";
          }}
        >
          {/* Delete Icon */}
          <ActionIcon
            variant="transparent"
            color="white"
            style={{
              padding: 6,
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            <IconTrash size={14} />
          </ActionIcon>
        </div>

        {/* Note Title and Content */}
        <Group position="apart" noWrap mb={4} mx={16}>
          <Text size="sm" fw={500} lineClamp={1}>
            {note.title || "Untitled Note"}
          </Text>
        </Group>

        <Text size="sm" color="dimmed" lineClamp={2} mx={16}>
          {note.content || "No content"}
        </Text>

        <Group position="apart" mt="md" mx={16}>
          <Group spacing={8}>
            {note.tags?.map((tag, index) => (
              <Badge key={index} size="sm">
                {tag}
              </Badge>
            ))}
          </Group>
        </Group>
      </Paper>

      {/* Delete Confirmation Modal */}
      <Modal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Delete Note"
        size="sm"
      >
        <Text size="sm">Are you sure you want to delete this note?</Text>
        <Group position="right" mt="md">
          <Button variant="outline" onClick={() => setModalOpen(false)}>
            Cancel
          </Button>
          <Button color="red" onClick={handleDelete}>
            Delete
          </Button>
        </Group>
      </Modal>
    </>
  );
};

export default NoteItem;
