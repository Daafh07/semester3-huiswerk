"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Student } from "@/lib/studenten";
import StudentTable from "@/components/StudentTable";
import StudentModal from "@/components/StudentModal";
import { haalStudentenOp, voegStudentToe as voegStudentToeInDatabase, verwijderStudent as verwijderStudentUitDatabase, updateStudent as updateStudentInDatabase, } from "@/lib/studentenService";

export default function Home() {
  const [zoekterm, setZoekterm] = useState("");
  const [nieuweNaam, setNieuweNaam] = useState("");
  const [nieuweOpleiding, setNieuweOpleiding] = useState("");
  const [nieuwEmail, setNieuwEmail] = useState("");
  const [studenten, setStudenten] = useState<Student[]>([]);
  const [toonFormulier, setToonFormulier] = useState(false);
  const [studentOmTeBewerken, setStudentOmTeBewerken] = useState<Student | null>(null);

  function startBewerken(student: Student) {
  setStudentOmTeBewerken(student);
  setNieuweNaam(student.naam);
  setNieuweOpleiding(student.opleiding);
  setNieuwEmail(student.email);
  setToonFormulier(true);
  }

  function sluitFormulier() {
  setToonFormulier(false);
  setStudentOmTeBewerken(null);
  setNieuweNaam("");
  setNieuweOpleiding("");
  setNieuwEmail("");
  }

  async function bewerkStudent() {
  if (!studentOmTeBewerken) {
    return;
  }

  try {
    const bijgewerkteStudent = await updateStudentInDatabase(
      studentOmTeBewerken.id,
      nieuweNaam,
      nieuweOpleiding,
      nieuwEmail
    );

    setStudenten((huidigeStudenten) =>
      huidigeStudenten.map((student) =>
        student.id === bijgewerkteStudent.id
          ? bijgewerkteStudent
          : student
      )
    );

    setStudentOmTeBewerken(null);
    setNieuweNaam("");
    setNieuweOpleiding("");
    setNieuwEmail("");
    setToonFormulier(false);
  } catch (error) {
    console.error("Fout bij bewerken van student:", error);
  }
}

  useEffect(() => {
  async function laadStudenten() {
    try {
      const data = await haalStudentenOp();
      setStudenten(data);
    } catch (error) {
      console.error("Fout bij laden van studenten:", error);
    }
  }

  laadStudenten();
}, []);

  async function voegStudentToe() {
  try {
    const nieuweStudent = await voegStudentToeInDatabase(
      nieuweNaam,
      nieuweOpleiding,
      nieuwEmail
    );

    setStudenten((huidigeStudenten) => [
      ...huidigeStudenten,
      nieuweStudent,
    ]);

    setNieuweNaam("");
    setNieuweOpleiding("");
    setNieuwEmail("");
    setToonFormulier(false);
  } catch (error) {
    console.error("Fout bij toevoegen van student:", error);
  }
}

  async function verwijderStudent(id: number) {
  try {
    await verwijderStudentUitDatabase(id);

    setStudenten((huidigeStudenten) =>
      huidigeStudenten.filter((student) => student.id !== id)
    );
  } catch (error) {
    console.error("Fout bij verwijderen van student:", error);
  }
}

  const gefilterdeStudenten = studenten.filter((student) => {
    const zoektermKlein = zoekterm.toLowerCase();

    return (
      student.naam.toLowerCase().includes(zoektermKlein) ||
      student.opleiding.toLowerCase().includes(zoektermKlein) ||
      student.email.toLowerCase().includes(zoektermKlein)
    );
  });

  return (
    <main className="min-h-screen bg-black p-8">
  <h1 className="mb-5 text-3xl font-bold text-white">
    Studenten CRM
  </h1>

  <p className="mb-3 text-white">
    Overzicht van alle studenten
  </p>

  <p className="mb-2 mt-6 text-gray-400">
  {gefilterdeStudenten.length} studenten gevonden
  </p>

  <button
  type="button"
  onClick={() => setToonFormulier(true)}
  className="mb-4 mt-6 rounded bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700"
  >
    Nieuwe student
  </button>


  {toonFormulier && (
  <StudentModal
  nieuweNaam={nieuweNaam}
  nieuweOpleiding={nieuweOpleiding}
  nieuwEmail={nieuwEmail}
  setNieuweNaam={setNieuweNaam}
  setNieuweOpleiding={setNieuweOpleiding}
  setNieuwEmail={setNieuwEmail}
  onAdd={voegStudentToe}
  onUpdate={bewerkStudent}
  onClose={() => setToonFormulier(false)}
  editMode={studentOmTeBewerken !== null}
/>
)}

      
  <input
      type="text"
      placeholder="Zoek op naam..."
      value={zoekterm}
      onChange={(event) => setZoekterm(event.target.value)}
      className="mb-6 w-full rounded border border-gray-600 bg-gray-900 p-3 text-white"
  />

  {gefilterdeStudenten.length === 0 && (
  <p className="mb-4 text-red-400">
    Geen studenten gevonden.
  </p>
  )}

  <StudentTable
    studenten={gefilterdeStudenten}
    onDelete={verwijderStudent}
    onEdit={startBewerken}
  />

</main>
  );
}