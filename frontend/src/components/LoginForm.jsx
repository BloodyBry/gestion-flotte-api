import { useState } from "react";

export default function LoginForm({ onLogin, envoi, erreur }) {
    const [email, setEmail] = useState("");
    const [motDePasse, setMotDePasse] = useState("");

    function gererSoumission(event) {
        event.preventDefault();
        onLogin(email.trim(), motDePasse);
    }

    return (
        <main>
            <h1>Connexion FleetTrackPRO</h1>

            <form onSubmit={gererSoumission}>
                <p>
                    <label htmlFor="email">Email</label><br />
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                    />
                </p>

                <p>
                    <label htmlFor="motDePasse">Mot de passe</label><br />
                    <input
                        id="motDePasse"
                        type="password"
                        value={motDePasse}
                        onChange={(event) => setMotDePasse(event.target.value)}
                        required
                    />
                </p>

                <button type="submit" disabled={envoi}>
                    {envoi ? "Connexion en cours…" : "Se connecter"}
                </button>

                {erreur && <p role="alert">{erreur}</p>}
            </form>
        </main>
    );
}