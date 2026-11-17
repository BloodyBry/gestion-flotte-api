import { useState } from "react";
import { seConnecter, seDeconnecter } from "./api";
import AdminLayout from "./components/AdminLayout";
import DriverLayout from "./components/DriverLayout";
import LoginForm from "./components/LoginForm";

export default function App() {
    const [session, setSession] = useState(null);
    const [erreur, setErreur] = useState("");
    const [envoi, setEnvoi] = useState(false);

    async function gererConnexion(email, motDePasse) {
        setErreur("");
        setEnvoi(true);

        try {
            const resultat = await seConnecter(email, motDePasse);
            setSession(resultat);
        } catch (error) {
            setErreur(error.message);
        } finally {
            setEnvoi(false);
        }
    }

    async function gererDeconnexion() {
        const refreshToken = session.refreshToken;

        setSession(null);
        setErreur("");

        try {
            await seDeconnecter(refreshToken);
        } catch {
            setErreur(
                "Tu es déconnecté de l’interface, mais le serveur n’a pas confirmé la déconnexion."
            );
        }
    }

    function gererSessionExpiree() {
        setSession(null);
        setErreur("Ta session a expiré. Reconnecte-toi.");
    }

    // Sans session, on affiche le formulaire de connexion.
    if (!session) {
        return (
            <LoginForm
                onLogin={gererConnexion}
                envoi={envoi}
                erreur={erreur}
            />
        );
    }

    const utilisateur = session.utilisateur;

    if (utilisateur.role === "admin") {
        return (
            <AdminLayout
                utilisateur={utilisateur}
                onLogout={gererDeconnexion}
                accessToken={session.accessToken}
                onSessionExpire={gererSessionExpiree}
            />
        );
    }

    if (utilisateur.role === "chauffeur") {
        return (
            <DriverLayout
                utilisateur={utilisateur}
                onLogout={gererDeconnexion}
            />
        );
    }

    return (
        <main>
            <p role="alert">Accès refusé : rôle non reconnu.</p>
            <button type="button" onClick={gererDeconnexion}>
                Se déconnecter
            </button>
        </main>
    );
}