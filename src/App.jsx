import { useEffect, useState } from "react";
import { AppShell, Box } from "@mantine/core";
import Header from "./components/Header";
import Notebook from "./components/Notebook";
import Footer from "./components/Footer";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(storedNotes);
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    const newNote = {
      id: Date.now(),
      title: "Untitled Note",
      content: "",
      tags: [],
      created: Date.now(),
      lastModified: Date.now(),
    };
    setNotes([newNote, ...notes]);
  };

  const exportNotes = () => {
    const blob = new Blob([JSON.stringify(notes)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "notes.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const importNotes = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const importedNotes = JSON.parse(e.target.result);
      setNotes(importedNotes);
    };
    reader.readAsText(file);
  };

  return (
    <Box style={{ width: 400, height: 600 }}>
      <AppShell
        header={{ height: 60 }}
        footer={{ height: 40 }}
        padding="0"
      >
        <AppShell.Header>
          <Header 
            onNewNote={addNote}
            onExport={exportNotes}
            onImport={importNotes}
          />
        </AppShell.Header>

        <AppShell.Main>
          <Notebook 
            notes={notes} 
            setNotes={setNotes} 
          />
        </AppShell.Main>

        <AppShell.Footer>
          <Footer />
        </AppShell.Footer>
      </AppShell>
    </Box>
  );
}

export default App;
