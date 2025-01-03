/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  TextInput,
  ActionIcon,
  Text,
  Stack,
  Paper,
  Badge,
  Group,
  Pagination,
  Transition,
  Box,
  Button,
} from "@mantine/core";
import { IconSearch, IconX, IconChevronLeft } from "@tabler/icons-react";
import Note from "./Note";

const NOTES_PER_PAGE = 10;

const Notebook = ({ notes, setNotes }) => {
  const [selectedNote, setSelectedNote] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const deleteNote = (noteId) => {
    setNotes(notes.filter((note) => note.id !== noteId));
    if (selectedNote === noteId) {
      setSelectedNote(null);
    }
  };

  const filteredNotes = notes.filter((note) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      (note.title || "").toLowerCase().includes(searchLower) ||
      (note.content || "").toLowerCase().includes(searchLower) ||
      (note.tags || []).some((tag) => tag.toLowerCase().includes(searchLower))
    );
  });

  const totalPages = Math.ceil(filteredNotes.length / NOTES_PER_PAGE);
  const paginatedNotes = filteredNotes.slice(
    (currentPage - 1) * NOTES_PER_PAGE,
    currentPage * NOTES_PER_PAGE
  );

  const currentNote = selectedNote
    ? notes.find((n) => n.id === selectedNote)
    : null;

  return (
    <Stack h="100%" spacing={0}>
      {/* Breadcrumbs */}
      <Group px="md" py="xs" style={{ borderBottom: "1px solid #eee" }}>
        {selectedNote ? (
          <>
            <Button
              variant="subtle"
              leftIcon={<IconChevronLeft size={16} />}
              size="sm"
              onClick={() => setSelectedNote(null)}
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

      {selectedNote ? (
        /* Note Editor */
        <Note
          note={currentNote}
          setNotes={setNotes}
          notes={notes}
          onBack={() => setSelectedNote(null)}
        />
      ) : (
        /* Notes List */
        <Stack spacing={0} h="100%">
          <Box p="md" pb="xs">
            <TextInput
              placeholder="Search notes..."
              size="sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              rightSection={
                searchTerm ? (
                  <ActionIcon
                    onClick={() => setSearchTerm("")}
                    variant="subtle"
                    size="sm"
                  >
                    <IconX size={14} />
                  </ActionIcon>
                ) : (
                  <IconSearch size={14} style={{ color: "#aaa" }} />
                )
              }
            />
          </Box>

          <Box style={{ flex: 1, overflowY: "auto" }} px="md">
            <Stack spacing="xs">
              {paginatedNotes.map((note) => (
                <Transition
                  key={note.id}
                  mounted={true}
                  transition="fade"
                  duration={200}
                >
                  {(styles) => (
                    <Paper
                      p="sm"
                      withBorder
                      onClick={() => setSelectedNote(note.id)}
                      style={{
                        cursor: "pointer",
                        ...styles,
                      }}
                    >
                      <Group position="apart" noWrap mb={4}>
                        <Text size="sm" fw={500} lineClamp={1}>
                          {note.title || "Untitled Note"}
                        </Text>
                        <ActionIcon
                          color="red"
                          variant="subtle"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNote(note.id);
                          }}
                          size="sm"
                        >
                          <IconX size={14} />
                        </ActionIcon>
                      </Group>
                      <Text c="dimmed" size="xs" lineClamp={2} mb={6}>
                        {note.content || "No content"}
                      </Text>
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
                  )}
                </Transition>
              ))}
            </Stack>
          </Box>

          {totalPages > 1 && (
            <Box p="md" pt="xs" style={{ borderTop: "1px solid #eee" }}>
              <Pagination
                total={totalPages}
                value={currentPage}
                onChange={setCurrentPage}
                size="sm"
                withEdges
              />
            </Box>
          )}
        </Stack>
      )}
    </Stack>
  );
};

export default Notebook;
