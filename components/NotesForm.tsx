import { useState } from "react";
import { Alert, Button, StyleSheet, TextInput, View } from "react-native";

interface NotesFormProps {
    onNoteAdded: () => void;
    onInsert: (title: string, content: string) => void;
}

// Destructure the new prop: onNoteAdded
const NotesForm: React.FC<NotesFormProps> = ({ onNoteAdded, onInsert }) => {
    const [note, setNote] = useState({
        title: "",
        content: "",
        pinned: false,
        archived: false,
    });
    // const db = useSQLiteContext();

    const handleSubmit = async () => {
        if (!note.title || !note.content) {
            Alert.alert("Error", "Please fill in all fields");
            return;
        }

        try {
            onInsert(note.title, note.content);

            if (onNoteAdded) {
                onNoteAdded();
            }

            setNote({ title: "", content: "", pinned: false, archived: false });
        } catch (error) {
            console.error("Error adding note: ", error);
            Alert.alert("Error", "Failed to add note");
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Title"
                value={note.title}
                onChangeText={(text) => setNote({ ...note, title: text })}
                style={styles.input}
                placeholderTextColor="#888"
            />
            <TextInput
                placeholder="Content"
                value={note.content}
                onChangeText={(text) => setNote({ ...note, content: text })}
                style={styles.input}
                placeholderTextColor="#888"
            />
            <Button title="Add Note" onPress={handleSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        marginBottom: 10,
        backgroundColor: "#fff",
        marginLeft: 16,
        marginRight: 16,
        borderRadius: 8,
    },
    input: {
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        borderRadius: 8,
        backgroundColor: "#fff",
    },
});

export default NotesForm;