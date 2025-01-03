/* eslint-disable react/prop-types */
import { useState } from "react";
import { 
  TextInput,
  Stack,
  Group,
  Badge,
  ActionIcon,
  Text,
  Box,
  Textarea,
} from "@mantine/core";
import { IconX } from "@tabler/icons-react";

const Note = ({ note, setNotes, notes }) => {
  const [newTag, setNewTag] = useState("");

  const updateNote = (field, value) => {
    const updatedNotes = notes.map((n) =>
      n.id === note.id ? { ...n, [field]: value, lastModified: Date.now() } : n
    );
    setNotes(updatedNotes);
  };

  const addTag = (e) => {
    if (e.key === "Enter" && newTag.trim()) {
      const tags = note.tags || [];
      if (!tags.includes(newTag.trim())) {
        updateNote("tags", [...tags, newTag.trim()]);
      }
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove) => {
    const tags = note.tags || [];
    updateNote(
      "tags",
      tags.filter((tag) => tag !== tagToRemove)
    );
  };

  return (
    <Stack spacing={0} style={{ flex: 1 }}>
      <Box p="md" pb="xs">
        <TextInput
          placeholder="Note Title"
          size="lg"
          value={note.title || ""}
          onChange={(e) => updateNote("title", e.target.value)}
          styles={{
            input: {
              fontSize: "1.5rem",
              fontWeight: 500,
              border: "none",
              padding: 0,
              "&:focus": {
                border: "none",
              },
            },
          }}
          variant="unstyled"
        />

        <Group spacing={6} mt="xs">
          {(note.tags || []).map((tag, index) => (
            <Badge
              key={index}
              size="sm"
              radius="sm"
              variant="light"
              rightSection={
                <ActionIcon
                  size="xs"
                  radius="xl"
                  variant="transparent"
                  onClick={() => removeTag(tag)}
                >
                  <IconX size={10} />
                </ActionIcon>
              }
            >
              {tag}
            </Badge>
          ))}
          <TextInput
            placeholder="Add tag... (press Enter)"
            size="xs"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyDown={addTag}
            styles={{
              input: {
                border: "none",
                backgroundColor: "transparent",
                "&:focus": {
                  border: "none",
                },
              },
              wrapper: {
                width: 150,
              },
            }}
          />
        </Group>
      </Box>

      <Box style={{ flex: 1, position: "relative" }}>
        <Textarea
          placeholder="Start writing your note..."
          value={note.content || ""}
          onChange={(e) => updateNote("content", e.target.value)}
          minRows={15}
          autosize
          styles={{
            root: { height: "100%" },
            wrapper: { height: "100%" },
            input: {
              border: "none",
              padding: "1rem",
              height: "100%",
              backgroundColor: "white",
              "&:focus": {
                border: "none",
              },
            },
          }}
        />
      </Box>

      <Box p="xs" style={{ borderTop: "1px solid #eee" }}>
        <Text size="xs" color="dimmed">
          Last modified: {new Date(note.lastModified || Date.now()).toLocaleString()}
        </Text>
      </Box>
    </Stack>
  );
};

export default Note;
