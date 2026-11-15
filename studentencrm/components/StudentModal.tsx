type StudentModalProps = {
  nieuweNaam: string;
  nieuweOpleiding: string;
  nieuwEmail: string;
  setNieuweNaam: (waarde: string) => void;
  setNieuweOpleiding: (waarde: string) => void;
  setNieuwEmail: (waarde: string) => void;
  onAdd: () => void;
  onUpdate: () => void;
  onClose: () => void;
  editMode: boolean;
};

export default function StudentModal({
  nieuweNaam,
  nieuweOpleiding,
  nieuwEmail,
  setNieuweNaam,
  setNieuweOpleiding,
  setNieuwEmail,
  onAdd,
  onUpdate,
  onClose,
  editMode,
}: StudentModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-md rounded-lg bg-gray-900 p-6">
        <h2 className="mb-4 text-xl font-bold text-white">
          {editMode ? "Student bewerken" : "Nieuwe student"}
        </h2>

        <input
          type="text"
          placeholder="Naam van de student"
          value={nieuweNaam}
          onChange={(event) => setNieuweNaam(event.target.value)}
          className="mb-4 w-full rounded border border-gray-600 bg-gray-800 p-3 text-white"
        />

        <input
          type="text"
          placeholder="Opleiding"
          value={nieuweOpleiding}
          onChange={(event) =>
            setNieuweOpleiding(event.target.value)
          }
          className="mb-4 w-full rounded border border-gray-600 bg-gray-800 p-3 text-white"
        />

        <input
          type="email"
          placeholder="E-mailadres"
          value={nieuwEmail}
          onChange={(event) => setNieuwEmail(event.target.value)}
          className="mb-4 w-full rounded border border-gray-600 bg-gray-800 p-3 text-white"
        />

        <div className="flex gap-3">
          <button
            type="button"
            onClick={editMode ? onUpdate : onAdd}
            className="rounded bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700"
          >
            {editMode ? "Opslaan" : "Toevoegen"}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="rounded bg-gray-700 px-4 py-2 font-bold text-white hover:bg-gray-600"
          >
            Annuleren
          </button>
        </div>
      </div>
    </div>
  );
}