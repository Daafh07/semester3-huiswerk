// VIEW: toont de boeken en geeft gebruikersacties door aan de controller.
// Deze import laadt het stylesheet dat bij de view hoort.
import './BibliotheekView.css';

// De controller geeft boeken en onLeenBoek mee als props.
// { boeken, onLeenBoek } haalt deze eigenschappen uit het props-object (destructuring).
function BibliotheekView({ boeken, onLeenBoek }) {
  // return geeft JSX terug: de beschrijving van wat React op het scherm moet tonen.
  // main bevat de hoofdinhoud; className is de React-schrijfwijze van HTML class.
  return (
    <main className="app">
      {/* h1 toont de hoofdtitel. JSX-comments staan tussen accolades met een blokcomment erin. */}
      <h1>Bibliotheek</h1>
      {/* ul is een lijst. map maakt voor ieder boek een lijstitem (li). */}
      {/* key geeft React een uniek id om lijstitems bij wijzigingen te herkennen. */}
      <ul className="boekenlijst">
        {boeken.map((boek) => (
          <li className="boek" key={boek.id}>
            {/* div groepeert de informatie. De accolades tonen waarden uit het boekobject. */}
            <div>
              {/* h2 is de boektitel; p bevat een tekstparagraaf. */}
              <h2>{boek.titel}</h2>
              <p>Auteur: {boek.auteur}</p>
              <p>Status: {boek.status}</p>
            </div>
            {/* disabled schakelt de knop uit als de vergelijking true oplevert. */}
            {/* onClick voert de pijlfunctie pas bij een klik uit, met het id van dit boek. */}
            {/* onLeenBoek verwijst naar handleLeenBoek in de controller. */}
            <button
              disabled={boek.status === 'uitgeleend'}
              onClick={() => onLeenBoek(boek.id)}
            >
              {/* De ternaire operator kiest de knoptekst: voorwaarde ? bijWaar : bijOnwaar. */}
              {boek.status === 'uitgeleend' ? 'Uitgeleend' : 'Leen'}
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}

// De standaardexport zorgt dat de controller deze view kan importeren.
export default BibliotheekView;
