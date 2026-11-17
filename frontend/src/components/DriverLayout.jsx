export default function DriverLayout({ utilisateur, onLogout }) {
    return (
        <main>
            <header>
                <h1>Espace Chauffeur</h1>
                <button type="button" onClick={onLogout}>
                    Se déconnecter
                </button>
            </header>

            <p>Bienvenue, {utilisateur.nom}.</p>
            <p>Tu es dans ton espace chauffeur.</p>
        </main>
    );
}