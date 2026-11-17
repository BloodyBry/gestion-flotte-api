import { useState } from "react";

export default function UserForm({ onCreate }) {
    const [nom, setNom] = useState("");
    const [email, setEmail] = useState("");
    const [motDePasse, setMotDePasse] = useState("");
    const [envoi, setEnvoi] = useState(false);
    const [erreur, setErreur] = useState("");

    async function gererSoumission(event) {
        event.preventDefault();
        setErreur("");
        setEnvoi(true);

        try {
            await onCreate({
                nom: nom.trim(),
                email: email.trim(),
                motDePasse
            });
            setNom("");
            setEmail("");
            setMotDePasse("");
        } catch (error) {
            setErreur(error.message);
        } finally {
            setEnvoi(false);
        }
    }

    return (
        <form onSubmit={gererSoumission}>
            <h3>Créer un compte chauffeur</h3>

            <p>
                <label>
                    Nom<br />
                    <input
                        value={nom}
                        onChange={(event) => setNom(event.target.value)}
                        required
                    />
                </label>
            </p>

            <p>
                <label>
                    Email<br />
                    <input
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                    />
                </label>
            </p>

            <p>
                <label>
                    Mot de passe<br />
                    <input
                        type="password"
                        autoComplete="new-password"
                        value={motDePasse}
                        onChange={(event) => setMotDePasse(event.target.value)}
                        minLength={8}
                        required
                    />
                </label>
            </p>

            <button type="submit" disabled={envoi}>
                {envoi ? "Création en cours…" : "Créer le compte"}
            </button>

            {erreur && <p role="alert">{erreur}</p>}
        </form>
    );
}