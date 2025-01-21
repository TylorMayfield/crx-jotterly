/* eslint-disable no-undef */
import { useEffect, useState } from "react";
import { AppShell, Box, MantineProvider } from "@mantine/core";
import { useColorScheme } from "@mantine/hooks";
import { Notifications } from "@mantine/notifications";
import Header from "./components/Header";
import Notebook from "./components/Notebook";
import Achievements from "./components/Achievements";
import { showNoteNotification } from "./components/NotificationSystem";
import "./styles/animations.css";
import Footer from "./components/Footer";

function App() {
  const preferredColorScheme = useColorScheme();
  const [notes, setNotes] = useState([]);
  const [currentView, setCurrentView] = useState("notebook");
  const [stats, setStats] = useState({
    totalNotes: 0,
    searches: 0,
    pinned: 0,
    deleted: 0,
  });

  useEffect(() => {
    if (
      typeof chrome !== "undefined" &&
      chrome.storage &&
      chrome.storage.local
    ) {
      chrome.storage.local.get(["notes", "stats"], (result) => {
        if (result.notes) {
          setNotes(result.notes);
        }
        if (result.stats) {
          setStats(result.stats);
        } else {
          setStats({
            totalNotes: 0,
            searches: 0,
            pinned: 0,
            deleted: 0,
          });
        }
      });
    } else {
      console.log("Chrome storage API not available - using default values");
      setStats({
        totalNotes: 0,
        searches: 0,
        pinned: 0,
        deleted: 0,
      });
    }
  }, []);

  useEffect(() => {
    if (
      typeof chrome !== "undefined" &&
      chrome.storage &&
      chrome.storage.local
    ) {
      chrome.storage.local.set({ notes });
    }
  }, [notes]);

  useEffect(() => {
    console.log("Saving stats to local storage:", stats);
    if (
      typeof chrome !== "undefined" &&
      chrome.storage &&
      chrome.storage.local
    ) {
      chrome.storage.local.set({ stats });
    }
  }, [stats]);

  const addNote = () => {
    const newNote = {
      id: Date.now().toString(),
      title: "",
      content: "",
      timestamp: new Date().toISOString(),
      pinned: false,
    };
    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setStats((prevStats) => ({
      ...prevStats,
      totalNotes: prevStats.totalNotes + 1,
    }));
  };

  const deleteAllData = () => {
    if (
      typeof chrome !== "undefined" &&
      chrome.storage &&
      chrome.storage.local
    ) {
      chrome.storage.local.clear(() => {
        setNotes([]);
        setStats({
          totalNotes: 0,
          searches: 0,
          pinned: 0,
          deleted: 0,
        });
        showNoteNotification("delete", "All data has been deleted");
      });
    }
  };

  return (
    <MantineProvider
      theme={{
        colorScheme: preferredColorScheme,
      }}
      withGlobalStyles
      withNormalizeCSS
    >
      <Box style={{ width: 400, height: 600 }}>
        <Notifications position="top-center" />
        <AppShell padding="0" header={{ height: 60 }}>
          <AppShell.Header>
            <Header
              onNewNote={addNote}
              onExport={() => {}}
              onViewChange={setCurrentView}
              currentView={currentView}
              onDeleteAll={deleteAllData}
            />
          </AppShell.Header>

          <AppShell.Main>
            {currentView === "notebook" ? (
              <Notebook notes={notes} setNotes={setNotes} setStats={setStats} />
            ) : (
              <Box p="md">
                <Achievements stats={stats} />
              </Box>
            )}
          </AppShell.Main>
        </AppShell>
      </Box>
      <Footer />
    </MantineProvider>
  );
}

export default App;
