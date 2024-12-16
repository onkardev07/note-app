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
    <div className="border-2 border-gray-300 rounded-md p-4 shadow-md flex items-start justify-between gap-3">
      <div className="flex-1 min-w-0">
        <p className="whitespace-normal break-words overflow-hidden">
          {content}
        </p>
      </div>

      <div className="flex-shrink-0">
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
