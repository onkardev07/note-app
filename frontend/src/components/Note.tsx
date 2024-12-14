const Note = ({
  noteNumber,
  onDelete,
}: {
  noteNumber: number;
  onDelete: (noteNumber: number) => void;
}) => {
  return (
    <div className="w-full h-[50px] border-2 border-[#D9D9D9] shadow-md bg-[#ffff] rounded-md flex p-4 justify-between items-center">
      <div>Note {noteNumber}</div>
      <div>
        <img
          src="/assets/icons/delete.svg"
          alt="delete icon"
          className="cursor-pointer"
          onClick={() => onDelete(noteNumber)}
        />
      </div>
    </div>
  );
};

export default Note;
