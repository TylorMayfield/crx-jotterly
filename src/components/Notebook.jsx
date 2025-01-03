/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Stack,
  Box,
} from "@mantine/core";
import Breadcrumbs from './Breadcrumbs';
import SearchInput from './SearchInput';
import NotesList from './NotesList';
import PaginationControls from './PaginationControls';
import Note from "./Note";

const NOTES_PER_PAGE = 3;

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
      <Breadcrumbs selectedNote={selectedNote} onBack={() => setSelectedNote(null)} currentNote={currentNote} />

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
            <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </Box>

          <Box style={{ flex: 1, overflowY: "auto" }} px="md">
            <NotesList paginatedNotes={paginatedNotes} deleteNote={deleteNote} setSelectedNote={setSelectedNote} />
          </Box>

          <PaginationControls totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </Stack>
      )}
    </Stack>
  );
};

export default Notebook;
