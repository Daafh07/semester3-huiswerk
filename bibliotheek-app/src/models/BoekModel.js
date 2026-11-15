// MODEL: bevat de boekgegevens en de regels voor het uitlenen van een boek.
// Dit bestand werkt met gewone JavaScript-gegevens en gebruikt geen React.

// Een array ([]) bevat de lijst met startboeken.
// Elk object ({}) stelt één boek voor: een uniek id, titel, auteur en status.
// const voorkomt dat de variabele opnieuw wordt toegewezen; de inhoud is niet bevroren.
const startBoeken = [
  {
    id: 1,
    titel: 'De Hobbit',
    auteur: 'J.R.R. Tolkien',
    status: 'beschikbaar',
  },
  {
    id: 2,
    titel: 'Harry Potter en de Steen der Wijzen',
    auteur: 'J.K. Rowling',
    status: 'beschikbaar',
  },
];

export function maakStartBoeken() {
  // export maakt deze functie beschikbaar voor andere bestanden, zoals de controller.
  // map doorloopt de boeken en geeft een nieuwe array terug.
  // De pijlfunctie (boek) => ... wordt voor ieder boek uitgevoerd.
  // { ...boek } kopieert de eigenschappen naar een nieuw object (spreadoperator).
  // De haakjes rond ({ ...boek }) laten de pijlfunctie een object teruggeven.
  // Zo krijgt de app eigen boekobjecten en blijven de startgegevens behouden.
  return startBoeken.map((boek) => ({ ...boek }));
}

// boeken is de huidige lijst; id is het nummer van het boek dat je wilt lenen.
export function leenBoek(boeken, id) {
  // Maak een nieuwe lijst zonder de bestaande lijst of boekobjecten te wijzigen.
  return boeken.map((boek) =>
    // === vergelijkt waarden zonder het type om te zetten.
    // && betekent 'en': het id moet kloppen én het boek moet beschikbaar zijn.
    boek.id === id && boek.status === 'beschikbaar'
      // De ternaire operator werkt als: voorwaarde ? bijWaar : bijOnwaar.
      // Bij waar: kopieer het boek en overschrijf alleen de status.
      ? { ...boek, status: 'uitgeleend' }
      // Bij onwaar: behoud het boek. Ook een al uitgeleend boek blijft hetzelfde.
      : boek,
  );
}
