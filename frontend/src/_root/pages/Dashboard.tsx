import { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import Note from "../../components/Note";
import { BASE_URL } from "../../apiUrl";
import { Loader } from "lucide-react";

interface Note {
  id: number;
  data: string;
}

const Dashboard = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [noteContent, setNoteContent] = useState("");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setNoteContent("");
  };

  const addNote = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/note/create`,
        { data: noteContent },
        { withCredentials: true }
      );

      const { noteId } = response.data;

      setNotes((prevNotes) => [
        ...prevNotes,
        { id: noteId, data: noteContent },
      ]);

      closeModal();
    } catch (error) {
      console.error("Error adding note:", error);
      alert("Failed to add note. Please try again.");
    }
  };

  const deleteNote = async (noteId: number) => {
    try {
      await axios.delete(`${BASE_URL}/note/${noteId}`, {
        withCredentials: true,
      });

      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
    } catch (error) {
      console.error("Error deleting note:", error);
      alert("Failed to delete note. Please try again.");
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get(`${BASE_URL}/user/`, {
          withCredentials: true,
        });
        setUser(userResponse.data.user);

        const notesResponse = await axios.get(`${BASE_URL}/note/`, {
          withCredentials: true,
        });

        setNotes(notesResponse.data.notes);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUserData();
  }, []);

  if (!user) {
    return <Loader className="animate-spin mx-auto" size={25}></Loader>;
  }

  return (
    <div className="flex flex-col justify-center gap-7 mx-5">
      {/* User Information */}
      <div className="w-full h-[100px] border-2 border-[#D9D9D9] shadow-md bg-[#ffff] rounded-md flex mt-6 items-center">
        <div className="flex flex-col gap-2 px-4">
          <p className="font-bold text-[20px]">Welcome, {user.name}!</p>
          <p className="text-[16px]">Email: {user.email}</p>
        </div>
      </div>

      {/* Note Button */}
      <Button
        type="submit"
        variant="contained"
        onClick={openModal}
        sx={{
          height: "56px",
          fontSize: "16px",
          textTransform: "none",
          backgroundColor: "#367aff",
          "&:hover": {
            backgroundColor: "#2957d0",
          },
        }}
      >
        Create Note
      </Button>

      {/* Notes List */}
      <div className="flex flex-col flex-1">
        <p className="text-left font-medium text-[20px]">Notes</p>
        <div className="flex flex-col gap-2 py-4">
          {notes.map((note) => (
            <Note
              key={note.id}
              noteId={note.id}
              content={note.data}
              onDelete={deleteNote}
            />
          ))}
        </div>
      </div>

      {/* Modal for Adding Note */}
      <Dialog open={isModalOpen} onClose={closeModal}>
        <DialogTitle>Add a New Note</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Note Content"
            type="text"
            fullWidth
            variant="outlined"
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal}>Cancel</Button>
          <Button
            onClick={addNote}
            variant="contained"
            disabled={!noteContent.trim()}
          >
            Add Note
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Dashboard;
