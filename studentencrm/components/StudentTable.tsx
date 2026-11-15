import type { Student } from "@/lib/studenten";
import { PencilSquareIcon, TrashIcon, } from "@heroicons/react/24/outline";

type StudentTableProps = {
  studenten: Student[];
  onDelete: (id: number) => void;
  onEdit: (student: Student) => void;
};

export default function StudentTable({
  studenten,
  onDelete,
  onEdit,
}: StudentTableProps) {
  return (
    <table className="w-full table-fixed border-collapse bg-black text-white">
      <thead>
        <tr className="bg-blue-600 text-left text-white">
          <th className="p-3">Naam</th>
          <th className="p-3">Opleiding</th>
          <th className="p-3">E-mail</th>
          <th className="w-65 p-3">Actie</th>
        </tr>
      </thead>

      <tbody>
        {studenten.map((student) => (
          <tr
            key={student.id}
            className="border-b border-gray-700 hover:bg-gray-800"
          >
            <td className="p-3">{student.naam}</td>
            <td className="p-3">{student.opleiding}</td>
            <td className="p-3">{student.email}</td>

            <td className="w-65 p-3">
              <div className="flex gap-2">
              <button
                type="button"
                onClick={() => onEdit(student)}
                aria-label={`Bewerk ${student.naam}`}
                className="group inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded bg-yellow-600 text-white transition-all duration-200 hover:w-28 hover:bg-yellow-700"
              >
                <PencilSquareIcon
                  className="h-5 w-5 shrink-0 group-hover:hidden"
                  aria-hidden="true"
                />

                <span className="hidden whitespace-nowrap group-hover:inline">
                  Bewerken
                </span>
              </button>

              <button
                type="button"
                onClick={() => onDelete(student.id)}
                aria-label={`Verwijder ${student.naam}`}
                className="group inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded bg-red-600 text-white transition-all duration-200 hover:w-28 hover:bg-red-700"
              >
                <TrashIcon
                  className="h-5 w-5 shrink-0 group-hover:hidden"
                  aria-hidden="true"
                />

                <span className="hidden whitespace-nowrap group-hover:inline">
                  Verwijderen
                </span>
              </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}