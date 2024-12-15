const Note = ({
  noteId,
  content,
  onDelete,
}: {
  noteId: number;
  content: string;
  onDelete: (id: number) => void;
}) => {
  return (
    <div className="border-2 border-gray-300 rounded-md p-4 shadow-md flex items-center ">
      <div className="w-[90%] break-words pr-2">
        <p className="font-medium">Note #{noteId}</p>
        <p className="">{content}</p>
      </div>

      <div className="w-[10%]">
        <img
          src="/assets/icons/delete.svg"
          alt="delete icon"
          className="cursor-pointer"
          onClick={() => onDelete(noteId)}
        />
      </div>
    </div>
  );
};

export default Note;
