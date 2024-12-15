import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import Note from "../../components/Note";
import { BASE_URL } from "../../apiUrl";
import { Loader } from "lucide-react";

const Dashboard = () => {
  const [notes, setNotes] = useState<number[]>([]);
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null
  );

  const addNote = () => {
    setNotes((prevNotes) => [...prevNotes, prevNotes.length + 1]);
  };

  const deleteNote = (noteNumber: number) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note !== noteNumber));
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/`, {
          withCredentials: true,
        });
        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  if (!user) {
    return <Loader className="animate-spin mx-auto" size={25}></Loader>;
  }

  return (
    <div className="flex flex-col justify-center gap-7 mx-5">
      <div className="w-full h-[100px] border-2 border-[#D9D9D9] shadow-md bg-[#ffff] rounded-md flex mt-6 items-center">
        <div className="flex flex-col gap-2 px-4">
          <p className="font-bold text-[20px]">Welcome, {user.name}!</p>
          <p className="text-[16px]">Email: {user.email}</p>
        </div>
      </div>
      <Button
        type="submit"
        variant="contained"
        onClick={addNote}
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
      <div className="flex flex-col gap-4 flex-1">
        <p className="text-left font-medium text-[20px]">Notes</p>
        <div className="flex flex-col gap-3">
          {notes.map((noteNumber) => (
            <Note
              key={noteNumber}
              noteNumber={noteNumber}
              onDelete={deleteNote}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
