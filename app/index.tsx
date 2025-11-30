import NotesForm from "@/components/NotesForm";
import NotesList from "@/components/NotesList";
import { Note } from "@/components/types";
import { useSQLiteContext } from "expo-sqlite";
import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  View
} from "react-native";
export default function Index() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const db = useSQLiteContext();

  const fetchNotes = useCallback(async () => {
    try {
      // setLoading(true);
      const results = await db.getAllAsync<Note>(
        `SELECT * FROM notes WHERE archived = 0  ORDER BY created_at DESC;`
      );
      setNotes(results);
    } catch (error) {
      console.error("Error fetching notes: ", error);
      Alert.alert("Error", "Failed to fetch notes");
    } finally {
      // setLoading(false);
    }
  }, [db]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const deleteNote = async (id: number) => {
    try {
      await db.runAsync(`DELETE FROM notes WHERE id = ?;`, [id]);
      fetchNotes();
    } catch (error) {
      console.error("Error deleting note: ", error);
      Alert.alert("Error", "Failed to delete note");
    }
  };

  const insertNote = async (title: string, content: string) => {
    try {
      await db.runAsync(
        `INSERT INTO notes (title, content) VALUES (?, ?);`,
        [title, content]
      );
      fetchNotes(); // Refresh the list
    } catch (error) {
      // ... handle error
    }
  };

  const archiveNote = async (id: number) => {
    try {
      await db.runAsync(`UPDATE notes SET archived = 1 WHERE id = ?;`, [id]);
      fetchNotes();
    } catch (error) {
      console.error("Error archiving note: ", error);
      Alert.alert("Error", "Failed to archive note");
    }
  };

  return (
    <View style={styles_main.appContainer}>
      <NotesForm onNoteAdded={fetchNotes} onInsert={insertNote} />
      <NotesList notes={notes} onDelete={deleteNote} loadNotes={fetchNotes} archiveNote={archiveNote} />
    </View>
  );
}

const styles_main = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 10
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});






