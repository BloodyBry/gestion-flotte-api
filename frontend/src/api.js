const API_URL = import.meta.env.VITE_API_URL;

export async function seConnecter(email, motDePasse) {
    const reponse = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, motDePasse })
    });

    const resultat = await reponse.json();

    if (!reponse.ok) {
        throw new Error(resultat.message || "La connexion a échoué.");
    }

    return resultat;
}

export async function seDeconnecter(refreshToken) {
    const reponse = await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken })
    });

    if (!reponse.ok) {
        throw new Error("La déconnexion sur le serveur a échoué.");
    }
}

export async function listerUtilisateurs(accessToken) {
    const reponse = await fetch(`${API_URL}/utilisateurs`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });

    const resultat = await reponse.json().catch(() => null);

    if (!reponse.ok) {
        const erreur = new Error(
            reponse.status === 403
                ? "Accès refusé."
                : resultat?.message || "Impossible de charger les utilisateurs."
        );

        erreur.status = reponse.status;
        throw erreur;
    }

    return resultat;
}

export async function creerUtilisateur(accessToken, donnees) {
    const reponse = await fetch(`${API_URL}/utilisateurs`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify(donnees)
    });

    if (!reponse.ok) {
        const resultat = await reponse.json().catch(() => null);
        const erreur = new Error(
            resultat?.message || "Impossible de créer le compte."
        );
        erreur.status = reponse.status;
        throw erreur;
    }
}