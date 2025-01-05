/* eslint-disable no-unused-vars */
import { useEffect, useState, useRef } from "react";
import { AppShell, Box, MantineProvider } from "@mantine/core";
import { useColorScheme } from "@mantine/hooks";
import { Notifications, notifications } from "@mantine/notifications";
import Header from "./components/Header";
import Notebook from "./components/Notebook";
import Footer from "./components/Footer";

function App() {
  const [notes, setNotes] = useState([]);
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
      pinned: false,
    };
    setNotes([newNote, ...notes]);
  };

  const togglePinNote = (noteId) => {
    setNotes(
      notes.map((note) => {
        if (note.id === noteId) {
          return { ...note, pinned: !note.pinned };
        }
        return note;
      })
    );
  };

  const exportNotes = () => {
    try {
      const exportData = {
        version: "1.0",
        timestamp: Date.now(),
        notes: notes.map((note) => ({
          ...note,
          lastModified: Date.now(),
        })),
      };

      const blob = new Blob([JSON.stringify(exportData, null, 2)], {
        type: "application/json",
      });

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      const timestamp = new Date().toISOString().split("T")[0];
      a.href = url;
      a.download = `jotterly-notes-${timestamp}.json`;
      a.click();
      URL.revokeObjectURL(url);

      notifications.show({
        title: "Success",
        message: "Notes exported successfully",
        color: "green",
      });
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "Failed to export notes",
        color: "red",
      });
    }
  };

  const validateNote = (note) => ({
    id: note.id || Date.now(),
    title: note.title || "Untitled Note",
    content: note.content || "",
    tags: Array.isArray(note.tags) ? note.tags : [],
    created: note.created || Date.now(),
    lastModified: Date.now(),
    pinned: Boolean(note.pinned),
  });

  const importNotes = (event) => {
    const file = event.target.files[0];

    const loadingNotification = notifications.show({
      title: "Importing Notes",
      message: "Please wait...",
      loading: true,
      autoClose: false,
    });

    const fileExtension = file.name.split(".").pop().toLowerCase();
    if (file.type !== "application/json" && fileExtension !== "json") {
      notifications.update(loadingNotification, {
        title: "Error",
        message: "Invalid file format. Please select a JSON file.",
        color: "red",
        loading: false,
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = JSON.parse(e.target.result);
        console.log("Parsed content:", content);

        let importedNotes = Array.isArray(content)
          ? content
          : content.notes || [];
        const sanitizedNotes = importedNotes.map(validateNote);

        setNotes(sanitizedNotes);
        notifications.update(loadingNotification, {
          title: "Success",
          message: `${sanitizedNotes.length} notes imported successfully`,
          color: "green",
          loading: false,
        });
      } catch (error) {
        console.error("Parsing error:", error);
        notifications.update(loadingNotification, {
          title: "Error",
          message: "Failed to parse the file. Please check the JSON format.",
          color: "red",
          loading: false,
        });
      }
    };

    reader.onerror = () => {
      console.error("File read error");
      notifications.update(loadingNotification, {
        title: "Error",
        message: "Failed to read the file",
        color: "red",
        loading: false,
      });
    };

    reader.readAsText(file);
  };

  return (
    <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
      <Notifications />
      <Box style={{ width: 400, height: 600 }}>
        <AppShell header={{ height: 60 }} footer={{ height: 40 }} padding="0">
          <AppShell.Header>
            <Header
              onNewNote={addNote}
              onExport={exportNotes}
              onImport={() => fileInputRef.current.click()}
            />
          </AppShell.Header>

          <AppShell.Main>
            <Notebook
              notes={notes}
              setNotes={setNotes}
              togglePinNote={togglePinNote}
            />
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
        onChange={importNotes}
      />
    </MantineProvider>
  );
}

export default App;
