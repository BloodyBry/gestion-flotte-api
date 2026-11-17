import { useState } from "react";
// import { listerUtilisateurs } from "../api";
import { listerUtilisateurs, creerUtilisateur } from "../api";
import UserForm from "./UserForm";
import UserList from "./UserList";

export default function AdminLayout({
    utilisateur,
    onLogout,
    accessToken,
    onSessionExpire
}) {
    const [comptes, setComptes] = useState(null);
    const [chargement, setChargement] = useState(false);
    const [erreur, setErreur] = useState("");
    const [filtre, setFiltre] = useState("tous");
    const [selectionId, setSelectionId] = useState(null);

    async function chargerUtilisateurs() {
        setChargement(true);
        setErreur("");

        try {
            const liste = await listerUtilisateurs(accessToken);
            setComptes(liste);
        } catch (error) {
            if (error.status === 401) {
                onSessionExpire();
            } else {
                setErreur(error.message);
            }
        } finally {
            setChargement(false);
        }
    }

    async function ajouterChauffeur(donnees) {
        try {
            await creerUtilisateur(accessToken, donnees);
        } catch (error) {
            if (error.status === 401) {
                onSessionExpire();
            }
            throw error;
        }

        setFiltre("tous");
        await chargerUtilisateurs();
    }

    const comptesVisibles = (comptes ?? []).filter((compte) => {
        if (filtre === "actifs") return compte.actif === true;
        if (filtre === "suspendus") return compte.actif === false;
        return true;
    });

    const compteSelectionne = comptesVisibles.find(
        (compte) => compte._id === selectionId
    );

    return (
        <main>
            <header>
                <h1>Espace Admin</h1>
                <button type="button" onClick={onLogout}>
                    Se déconnecter
                </button>
            </header>

            <p>Bienvenue, {utilisateur.nom}.</p>

            <button
                type="button"
                onClick={chargerUtilisateurs}
                disabled={chargement}
            >
                Utilisateurs
            </button>

            {chargement && <p role="status">Chargement des utilisateurs…</p>}
            {erreur && <p role="alert">{erreur}</p>}

            {!chargement && !erreur && comptes !== null && (
                <section>
                    <h2>Comptes chauffeurs</h2>
                    <UserForm onCreate={ajouterChauffeur} />

                    <label htmlFor="filtre-comptes">État du compte : </label>
                    <select
                        id="filtre-comptes"
                        value={filtre}
                        onChange={(event) => setFiltre(event.target.value)}
                    >
                        <option value="tous">Tous</option>
                        <option value="actifs">Actifs</option>
                        <option value="suspendus">Suspendus</option>
                    </select>

                    <UserList
                        comptes={comptesVisibles}
                        compteSelectionneId={selectionId}
                        onSelect={setSelectionId}
                    />

                    {compteSelectionne && (
                        <div>
                            <h3>{compteSelectionne.nom}</h3>
                            <p>Email : {compteSelectionne.email}</p>
                            <p>Rôle : {compteSelectionne.role}</p>
                            <p>
                                État : {compteSelectionne.actif ? "Actif" : "Suspendu"}
                            </p>
                        </div>
                    )}
                </section>
            )}
        </main>
    );
}