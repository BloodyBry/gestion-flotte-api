# API de gestion de flotte de transport routier

API REST destinée à une entreprise de transport routier située à Youssoufia. Elle centralise la gestion des camions, remorques, chauffeurs et trajets, ainsi que le suivi du kilométrage, du carburant, des pneus et de la maintenance.

L'application facilite la planification des missions, le contrôle de la disponibilité des ressources et le suivi des coûts de la flotte.

## Fonctionnalités

- **Authentification** : connexion, tokens JWT avec expiration, rafraîchissement et déconnexion. Les mots de passe sont hachés avec bcrypt.
- **Chauffeurs** : gestion des comptes, suspension et réactivation, fiches professionnelles avec permis et téléphone.
- **Véhicules** : création, consultation, modification, archivage et désarchivage des camions et remorques ; recherche par immatriculation et filtres par statut et archivage.
- **Trajets** : création et modification des missions avec un camion, une remorque et un chauffeur ; contrôle de leur disponibilité sur la période demandée.
- **Statuts** : progression contrôlée d'un trajet de `à faire` à `en cours`, puis à `terminé`.
- **Kilométrage** : calcul de la distance parcourue et mise à jour du kilométrage des véhicules lors de la clôture d'un trajet.
- **Carburant** : suivi des litres de gasoil, du coût et de la consommation moyenne en litres pour 100 km.
- **Pneus** : suivi des pneus montés sur les camions, de leur usure et de leur remplacement.
- **Maintenance** : suivi des vidanges et révisions, règles configurables et alertes lorsque les seuils sont atteints.
- **Rapports** : consultation des indicateurs de trajets, de kilométrage, de consommation et des coûts par l'administrateur.
- **Ordre de mission** : génération d'un PDF contenant le trajet, le chauffeur et les véhicules assignés.

## Technologies

| Technologie | Rôle |
| --- | --- |
| Node.js et Express | Exécution du backend et gestion des routes HTTP |
| MongoDB et Mongoose | Stockage des données et définition des modèles |
| Joi | Validation des données reçues par l'API |
| bcrypt | Hachage des mots de passe |
| jsonwebtoken | Création et vérification des tokens JWT |
| dotenv | Chargement des variables d'environnement |
| Docker et Docker Compose | Exécution de l'API et de MongoDB dans des conteneurs |
| Swagger / OpenAPI 3.0 | Documentation des endpoints et de leurs permissions |
| Postman | Exécution des requêtes et vérification des réponses |

## Architecture

Le projet suit une architecture en couches :

```text
src/
├── config/          # Configuration et connexion à MongoDB
├── controllers/     # Réception des requêtes et envoi des réponses
├── middlewares/     # Authentification, rôles, validation et erreurs
├── models/          # Modèles Mongoose
├── routes/          # Définition des endpoints
├── scripts/         # Scripts d'administration
├── services/        # Règles métier et accès aux données
├── validations/     # Schémas de validation Joi
├── app.js           # Configuration d'Express
└── server.js        # Démarrage de l'API
```

Les contrôleurs délèguent la logique métier aux services. La vérification de disponibilité est centralisée et réutilisée lors de la création et de la modification des trajets. Les calculs de kilométrage, de consommation et les alertes de maintenance sont traités séparément.

## Modèle de données

| Modèle | Description |
| --- | --- |
| Utilisateur | Compte de connexion : nom, email, mot de passe haché, rôle et activation |
| Chauffeur | Fiche professionnelle liée à un compte : numéro de permis et téléphone |
| Camion | Immatriculation, marque, kilométrage total, statut et archivage |
| Remorque | Immatriculation, type, kilométrage total, statut et archivage |
| Pneu | Pneu associé à un camion : position, usure et kilométrage de pose |
| Trajet | Mission associant un chauffeur, un camion et une remorque, avec dates et données de déplacement |
| RegleMaintenance | Configuration des seuils de vidange, de révision et d'usure des pneus |
| Maintenance | Intervention réalisée sur un véhicule, avec date, kilométrage et coût |

Un compte chauffeur possède au maximum une fiche professionnelle. Un chauffeur et un véhicule peuvent être associés à plusieurs trajets, à condition que les périodes respectent les règles de disponibilité.

## Rôles et permissions

| Rôle | Permissions |
| --- | --- |
| Admin | Gestion de la flotte, des comptes, des missions, des règles de maintenance et des rapports |
| Chauffeur | Consultation et actions autorisées sur ses propres trajets, selon leur statut |

Les contrôles sont appliqués côté serveur. Un chauffeur ne peut pas accéder aux routes réservées à l'administrateur ni consulter ou modifier les trajets d'un autre chauffeur.

## Règles métier

- Une ressource déjà assignée sur une période incompatible est refusée avec **409**, y compris lors de requêtes concurrentes.
- Un véhicule archivé ou en maintenance ne peut pas recevoir une nouvelle assignation.
- Un chauffeur dont le compte est suspendu ne peut pas recevoir une nouvelle mission.
- Le kilométrage d'arrivée doit être **strictement supérieur** au kilométrage de départ.
- Les transitions de statut d'un trajet sont vérifiées côté serveur.
- Les seuils de maintenance déclenchent des alertes et bloquent les nouvelles assignations lorsque nécessaire.
- L'archivage conserve les informations du véhicule et son historique.

### Calculs

```text
Distance parcourue = kilométrage d'arrivée − kilométrage de départ
Consommation moyenne = (litres consommés / distance parcourue) × 100
Coût du carburant = litres consommés × prix du litre
```

### Configuration de la maintenance

L'administrateur définit les règles selon le type de véhicule et d'entretien : intervalle de kilométrage pour les vidanges et révisions, seuil d'usure pour les pneus. Les interventions enregistrées servent de référence au suivi des prochaines échéances.

## Installation en développement

### Prérequis

- Node.js et npm
- Git
- Docker Desktop démarré
- Postman

### 1. Récupérer le projet

```bash
git clone https://github.com/BloodyBry/gestion-flotte-api.git
cd gestion-flotte-api
npm install
```

### 2. Configurer l'environnement

Copier `.env.example` vers `.env`, puis renseigner les variables :

```bash
cp .env.example .env
```

| Variable | Description |
| --- | --- |
| PORT | Port de l'API, par exemple `3000` |
| MONGO_URI | URI MongoDB, par exemple `mongodb://127.0.0.1:27017/gestion_flotte` |
| JWT_SECRET | Secret du token d'accès, au moins 64 caractères |
| JWT_EXPIRES_IN | Durée du token d'accès, par exemple `15m` |
| JWT_REFRESH_SECRET | Secret distinct pour le token de rafraîchissement, au moins 64 caractères |
| JWT_REFRESH_EXPIRES_IN | Durée du token de rafraîchissement, par exemple `7d` |
| ADMIN_NOM | Nom du premier administrateur |
| ADMIN_EMAIL | Email du premier administrateur |
| ADMIN_PASSWORD | Mot de passe du premier administrateur |

Générer chaque secret JWT séparément :

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Le fichier `.env` contient des informations privées et ne doit pas être publié sur GitHub.

### 3. Démarrer MongoDB

Pour créer le conteneur la première fois :

```bash
docker run --name gestion-flotte-mongo -p 127.0.0.1:27017:27017 -v gestion-flotte-data:/data/db -d mongo:8.0
```

Si le conteneur existe déjà :

```bash
docker start gestion-flotte-mongo
```

### 4. Initialiser l'administrateur et lancer l'API

```bash
node src/scripts/creer-admin.js
npm run dev
```

L'API est accessible à l'adresse `http://localhost:3000`.

La configuration MongoDB doit également correspondre aux besoins du mécanisme de gestion des assignations concurrentes. L'utilisation de transactions MongoDB nécessite un replica set.

## Docker Compose

Docker Compose regroupe l'API et MongoDB, avec un volume pour conserver les données :

```bash
docker compose up --build
```

Dans cet environnement, l'API utilise le nom du service MongoDB défini dans Compose pour se connecter à la base. Les secrets sont fournis par variables d'environnement.

## Utilisation avec Postman

1. Importer la collection de requêtes du projet.
2. Se connecter avec `POST /api/auth/login`.
3. Récupérer l'`accessToken` de la réponse.
4. Dans les requêtes protégées, choisir **Authorization → Bearer Token** et renseigner ce token.
5. Utiliser `POST /api/auth/refresh` pour obtenir de nouveaux tokens et `POST /api/auth/logout` pour révoquer le token de rafraîchissement.

Pour les requêtes avec un corps JSON, choisir **Body → raw → JSON**.

Exemple de recherche et de filtrage :

```http
GET /api/camions?recherche=12345&statut=disponible&archive=false
Authorization: Bearer <accessToken>
```

Les tokens, mots de passe et autres secrets doivent être retirés des exports partagés.

## Réponses HTTP

| Code | Signification |
| --- | --- |
| 200 | Opération réussie |
| 201 | Ressource créée |
| 400 | Données ou paramètres invalides |
| 401 | Authentification absente, invalide ou expirée |
| 403 | Accès refusé selon le rôle ou l'état du compte |
| 404 | Ressource introuvable |
| 409 | Conflit d'assignation ou donnée unique déjà utilisée |
| 500 | Erreur interne du serveur |

## Documentation et vérifications

La documentation Swagger/OpenAPI décrit les entrées, réponses et permissions des endpoints. La collection Postman permet de reproduire les scénarios de création, consultation, modification et refus attendus.

Les scénarios de tests portent sur les calculs de kilométrage et de consommation, les disponibilités, les conflits concurrents, les alertes de maintenance, les transitions de statut, les permissions et la génération de l'ordre de mission PDF.
