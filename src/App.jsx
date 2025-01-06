/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useEffect, useState, useRef } from "react";
import { AppShell, Box, MantineProvider } from "@mantine/core";
import { useColorScheme } from "@mantine/hooks";

import Header from "./components/Header";
import Notebook from "./components/Notebook";
import Footer from "./components/Footer";
import Achievements from "./components/Achievements";
import { showNoteNotification } from "./components/NotificationSystem";
import "./styles/animations.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [currentView, setCurrentView] = useState("notebook");
  const [stats, setStats] = useState({
    totalNotes: 0,
    pinnedNotes: 0,
    searches: 0,
  });
  const preferredColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useState(() => {
    const savedScheme = localStorage.getItem("color-scheme");
    return savedScheme || preferredColorScheme;
  });

  const fileInputRef = useRef(null);

  const toggleColorScheme = (value) => {
    const nextColorScheme =
      value || (colorScheme === "dark" ? "light" : "dark");
    setColorScheme(nextColorScheme);
    localStorage.setItem("color-scheme", nextColorScheme);
  };

  useEffect(() => {
    chrome.storage.local.get(["notes", "stats"], (result) => {
      if (result.notes) {
        setNotes(result.notes);
      }
      if (result.stats) {
        setStats(result.stats);
      }
    });
  }, []);

  useEffect(() => {
    chrome.storage.local.set({ notes });
  }, [notes]);

  useEffect(() => {
    chrome.storage.local.set({ stats });
  }, [stats]);

  const addNote = () => {
    const newNote = {
      id: Date.now().toString(),
      content: "",
      timestamp: new Date().toISOString(),
      pinned: false,
    };
    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setStats((prevStats) => ({
      ...prevStats,
      totalNotes: prevStats.totalNotes + 1,
    }));
    showNoteNotification("create", "Note created!");
  };

  const togglePinNote = (noteId) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => {
        if (note.id === noteId) {
          const newPinnedState = !note.pinned;
          if (newPinnedState) {
            setStats((prevStats) => ({
              ...prevStats,
              pinnedNotes: prevStats.pinnedNotes + 1,
            }));
          } else {
            setStats((prevStats) => ({
              ...prevStats,
              pinnedNotes: Math.max(0, prevStats.pinnedNotes - 1),
            }));
          }
          return { ...note, pinned: newPinnedState };
        }
        return note;
      })
    );
  };

  const exportNotes = () => {
    const notesJson = JSON.stringify(notes, null, 2);
    const blob = new Blob([notesJson], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "jotterly-notes.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const importNotes = (event) => {
    console.log("Import function called");
    const file = event.target.files[0];
    if (!file) {
      console.log("No file selected");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedNotes = JSON.parse(e.target.result);
        setNotes((prevNotes) => [...importedNotes, ...prevNotes]);
        showNoteNotification("Notes imported successfully!");
      } catch (error) {
        console.error("Error parsing JSON:", error);
        showNoteNotification("Error importing notes. Invalid file format.");
      }
    };

    reader.readAsText(file);
    event.target.value = null;
    console.log("File reading initiated.");
  };

  return (
    <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
      <Box style={{ width: 400, height: 600 }}>
        <AppShell header={{ height: 60 }} footer={{ height: 40 }} padding="0">
          <AppShell.Header>
            <Header
              onNewNote={addNote}
              onExport={exportNotes}
              onImport={() => {
                console.log("Import button clicked");
                fileInputRef.current.click();
              }}
              onViewChange={setCurrentView}
              currentView={currentView}
            />
          </AppShell.Header>

          <AppShell.Main>
            {currentView === "notebook" ? (
              <Notebook
                notes={notes}
                setNotes={setNotes}
                togglePinNote={togglePinNote}
              />
            ) : (
              <Box p="md">
                <Achievements
                  stats={stats}
                  onBack={() => setCurrentView("notebook")}
                />
              </Box>
            )}
          </AppShell.Main>

          <AppShell.Footer>
            <Footer />
          </AppShell.Footer>
        </AppShell>
      </Box>
      <input
        type="file"
        accept=".json"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={(event) => {
          console.log("File input changed");
          importNotes(event);
          console.log("File input changed and importNotes called");
        }}
      />
    </MantineProvider>
  );
}

export default App;
