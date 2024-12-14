import { useState } from "react";
import { Button } from "@mui/material";
import Note from "../../components/Note";

const Dashboard = () => {
  const [notes, setNotes] = useState<number[]>([]);

  const addNote = () => {
    setNotes((prevNotes) => [...prevNotes, prevNotes.length + 1]);
  };

  const deleteNote = (noteNumber: number) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note !== noteNumber));
  };

  return (
    <div className="flex flex-col justify-center gap-7 mx-5">
      <div className="w-full h-[100px] border-2 border-[#D9D9D9] shadow-md bg-[#ffff] rounded-md flex mt-6 items-center">
        <div className="flex flex-col gap-2 px-4">
          <p className="font-bold text-[20px]">Welcome, Jonas Kahnwald!</p>
          <p className="text-[16px]">Email: xxxxxx@xxxx.com</p>
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
