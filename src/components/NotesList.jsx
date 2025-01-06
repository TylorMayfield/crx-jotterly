/* eslint-disable react/prop-types */
import { Stack, Transition, Box } from "@mantine/core";
import NoteItem from "./NoteItem";

const NotesList = ({ paginatedNotes, deleteNote, setSelectedNote, togglePinNote }) => {
  return (
    <Box pb="md">
      <Stack spacing="xs">
        {paginatedNotes.map((note) => (
          <Transition
            key={note.id}
            mounted={true}
            transition="fade"
            duration={200}
          >
            {() => (
              <NoteItem
                key={note.id}
                note={note}
                onDelete={() => deleteNote(note.id)}
                onSelect={() => setSelectedNote(note.id)}
                togglePinNote={() => togglePinNote(note.id)}
              />
            )}
          </Transition>
        ))}
      </Stack>
    </Box>
  );
};

export default NotesList;
