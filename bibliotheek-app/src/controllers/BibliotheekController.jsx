// CONTROLLER: verwerkt gebruikersacties en verbindt het model met de view.
// useState laat een React-component gegevens onthouden tussen weergaven.
import React, { useState } from 'react';
// Haal de startgegevens en uitleenfunctie uit het model.
// ../ betekent: ga één map omhoog vanuit de map controllers.
import { maakStartBoeken, leenBoek } from '../models/BoekModel.js';
// Haal het component op dat de boeken op het scherm toont.
import BibliotheekView from '../views/BibliotheekView.jsx';

// Een React-component is een functie die de schermweergave teruggeeft als JSX.
function BibliotheekController() {
  // useState geeft twee waarden terug; [boeken, setBoeken] haalt die uit elkaar.
  // boeken bevat de actuele lijst; met setBoeken werken we deze lijst bij.
  // We geven maakStartBoeken zonder () door als initializer voor de begintoestand.
  // Daardoor wordt de startlijst niet bij elke nieuwe weergave opnieuw gemaakt.
  // In ontwikkelmodus kan React Strict Mode de initializer extra aanroepen als controle.
  const [boeken, setBoeken] = useState(maakStartBoeken);

  // De view roept deze functie aan wanneer iemand op een leenknop klikt.
  function handleLeenBoek(id) {
    // React geeft de meest actuele lijst door aan de pijlfunctie.
    // Het model berekent de nieuwe lijst; setBoeken slaat die op als state.
    // Door deze wijziging voert React de controller opnieuw uit en werkt de view bij.
    setBoeken((huidigeBoeken) => leenBoek(huidigeBoeken, id));
  }

  // JSX is de HTML-achtige schrijfwijze van React; {} bevat JavaScript-waarden.
  // Props zijn gegevens of functies die we aan een component meegeven:
  // boeken geeft de lijst door; onLeenBoek geeft de functie voor een leenactie door.
  return <BibliotheekView boeken={boeken} onLeenBoek={handleLeenBoek} />;
}

// De standaardexport maakt het mogelijk deze controller zonder {} te importeren.
export default BibliotheekController;
