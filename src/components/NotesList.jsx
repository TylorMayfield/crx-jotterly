/* eslint-disable react/prop-types */
import { Stack, Transition } from "@mantine/core";
import NoteItem from "./NoteItem";

const NotesList = ({ paginatedNotes, deleteNote, setSelectedNote }) => {
  return (
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
            />
          )}
        </Transition>
      ))}
    </Stack>
  );
};

export default NotesList;
