import { Button, FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import { Note } from "./types";

interface NotesListProps {
    notes: Note[];
    onDelete: (id: number) => void;
    loadNotes: () => void;
    archiveNote: (id: number) => void;
}

const NotesList: React.FC<NotesListProps> = ({ notes, onDelete, loadNotes, archiveNote }) => {

    if (notes.length === 0) {
        return (
            <View style={styles_noteslist.container}>
                <Text style={styles_noteslist.emptyText}>No notes yet.</Text>
            </View>
        );
    }

    return (
        <View style={styles_noteslist.container}>
            <FlatList
                refreshControl={
                    <RefreshControl refreshing={false} onRefresh={loadNotes} />
                }
                data={notes}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles_noteslist.noteItem}>
                        <Text style={styles_noteslist.noteTitle}>{item.title}</Text>
                        <Text style={styles_noteslist.noteContent}>{item.content}</Text>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginTop: 8,
                            }}
                        >
                            <Button
                                title="Pin"
                                color="#0275d8"
                                onPress={() => {
                                    /* handle edit */
                                }}
                            />
                            <Button
                                title="Archieve"
                                color="#5cb85c"
                                onPress={() => {
                                    archiveNote(item.id);
                                }}
                            />
                            <Button
                                title="Delete"
                                color="#d9534f"
                                onPress={() => onDelete(item.id)}
                            />
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

const styles_noteslist = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
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

export default NotesList;