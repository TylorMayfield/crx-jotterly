/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Stack, Box } from "@mantine/core";
import Breadcrumbs from "./Breadcrumbs";
import SearchInput from "./SearchInput";
import NotesList from "./NotesList";
import PaginationControls from "./PaginationControls";
import Note from "./Note";

const NOTES_PER_PAGE = 3;

const Notebook = ({ notes, setNotes, setStats }) => {
  const [selectedNote, setSelectedNote] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (searchTerm) {
      setStats((prev) => ({
        ...prev,
        searches: prev.searches + 1,
      }));
    }
  }, [searchTerm, setStats]);

  const deleteNote = (noteId) => {
    setNotes(notes.filter((note) => note.id !== noteId));
    if (selectedNote === noteId) {
      setSelectedNote(null);
    }
  };

  const togglePinNote = (noteId) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => {
        if (note.id === noteId) {
          const newPinnedState = !note.pinned;
          const updatedPinnedCount = newPinnedState ? prevNotes.filter(n => n.pinned).length + 1 : prevNotes.filter(n => n.pinned).length - 1;

          setStats((prevStats) => ({
            ...prevStats,
            pinned: updatedPinnedCount,
          }));

          return { ...note, pinned: newPinnedState };
        }
        return note;
      })
    );
  };

  const filteredNotes = notes.filter((note) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      (note.title || "").toLowerCase().includes(searchLower) ||
      (note.content || "").toLowerCase().includes(searchLower) ||
      (note.tags || []).some((tag) => tag.toLowerCase().includes(searchLower))
    );
  });

  const sortedNotes = [...filteredNotes].sort((a, b) =>
    b.pinned === a.pinned ? 0 : b.pinned ? 1 : -1
  );

  const totalPages = Math.ceil(sortedNotes.length / NOTES_PER_PAGE);
  const paginatedNotes = sortedNotes.slice(
    (currentPage - 1) * NOTES_PER_PAGE,
    currentPage * NOTES_PER_PAGE
  );

  const currentNote = selectedNote
    ? notes.find((n) => n.id === selectedNote)
    : null;

  return (
    <Stack spacing="sm" h="100%">
      <Breadcrumbs
        selectedNote={selectedNote}
        onBack={() => setSelectedNote(null)}
        currentNote={currentNote}
      />

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
        <Stack spacing="xs" h="100%" style={{ flex: 1, "--stack-gap": "0px" }}>
          <Box pt="xs" p="xs" pb="xs">
            <SearchInput
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          </Box>

          <Box spacing="xs" style={{ flex: 1, overflowY: "auto" }} px="md">
            <NotesList
              paginatedNotes={paginatedNotes}
              deleteNote={deleteNote}
              setSelectedNote={setSelectedNote}
              togglePinNote={togglePinNote}
            />
          </Box>

          <PaginationControls
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </Stack>
      )}
    </Stack>
  );
};

export default Notebook;
