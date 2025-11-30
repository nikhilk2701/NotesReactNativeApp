import { Note } from "@/components/types";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { Alert, FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";

const History = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const db = useSQLiteContext();

    const fetchArchivedNotes = async () => {
        try {
            const results = await db.getAllAsync<Note>(
                `SELECT * FROM notes WHERE archived = 1 ORDER BY created_at DESC;`
            );
            setNotes(results);
        } catch (error) {
            console.error("Error fetching notes: ", error);
            Alert.alert("Error", "Failed to fetch notes");
        }
    };

    useEffect(() => {
        fetchArchivedNotes();
    }, []);

    return (
        <View style={styles_noteslist.container}>
            <FlatList
                refreshControl={<RefreshControl refreshing={false} onRefresh={fetchArchivedNotes} />}
                data={notes}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles_noteslist.noteItem}>
                        <Text style={styles_noteslist.noteTitle}>{item.title}</Text>
                        <Text style={styles_noteslist.noteContent}>{item.content}</Text>
                    </View>
                )}
            />
        </View>
    );
};
const styles_noteslist = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingTop: 16,
        flex: 1,
    },
    noteItem: {
        marginBottom: 12,
        padding: 12,
        backgroundColor: "#fff",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    noteTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 4,
        color: "#333",
    },
    noteContent: {
        fontSize: 16,
        color: "#666",
    },
    emptyText: {
        textAlign: "center",
        color: "#888",
        marginTop: 20,
    },
});

export default History;
