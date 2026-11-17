export default function UserList({ comptes, compteSelectionneId, onSelect }) {
    if (comptes.length === 0) {
        return <p>Aucun chauffeur ne correspond à ce filtre.</p>;
    }

    return (
        <ul>
            {comptes.map((compte) => (
                <li key={compte._id}>
                    <button
                        type="button"
                        aria-pressed={compte._id === compteSelectionneId}
                        onClick={() => onSelect(compte._id)}
                    >
                        {compte.nom} — {compte.actif ? "Actif" : "Suspendu"}
                    </button>
                </li>
            ))}
        </ul>
    );
}