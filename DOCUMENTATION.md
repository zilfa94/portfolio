# KidsCode Documentation

## Description
KidsCode est une application web éducative conçue pour enseigner la programmation aux enfants de manière amusante et interactive. L'application utilise React, TypeScript, Firebase et Material-UI pour offrir une expérience utilisateur moderne et réactive.

## Installation

1. Clonez le dépôt :
```bash
git clone <URL_DU_DEPOT>
```
2. Accédez au répertoire du projet :
```bash
cd kidscode
```
3. Installez les dépendances :
```bash
npm install
```
4. Démarrez le serveur de développement :
```bash
npm run dev
```

## Structure des fichiers

- `src/`
  - `App.css` : Fichier de styles global pour l'application.
  - `App.tsx` : Composant principal de l'application.
  - `assets/` : Dossier contenant les ressources statiques.
  - `components/` : Dossier contenant les composants réutilisables.
    - `Header.tsx` : Composant de la barre de navigation.
    - `Hero.tsx` : Composant de la section héroïque.
  - `config/` : Dossier contenant les fichiers de configuration.
    - `firebase.ts` : Configuration de Firebase.
  - `index.css` : Fichier de styles pour l'index.
  - `main.tsx` : Point d'entrée principal de l'application.
  - `pages/` : Dossier contenant les pages de l'application.
    - `AdminDashboard.tsx` : Page du tableau de bord administrateur.
    - `Home.tsx` : Page d'accueil.
    - `Login.tsx` : Page de connexion.
  - `vite-env.d.ts` : Déclarations de types pour Vite.

## Composants

### Header
Le composant `Header` utilise Material-UI pour créer une barre de navigation avec des icônes de navigation. Il utilise Firebase pour gérer l'état d'authentification de l'utilisateur et affiche des boutons de connexion/déconnexion en fonction de cet état.

### Hero
Le composant `Hero` utilise Material-UI pour créer une section héroïque avec un titre, une description et des boutons d'action.

## Pages

### Home
La page `Home` importe et utilise le composant `Hero` pour afficher la section héroïque.

### Login
La page `Login` implémente un formulaire de connexion pour les administrateurs en utilisant Material-UI et Firebase pour l'authentification. Elle gère les erreurs de connexion et redirige les utilisateurs authentifiés vers la page d'administration.

### AdminDashboard
La page `AdminDashboard` implémente un tableau de bord pour les administrateurs en utilisant Material-UI. Elle vérifie si l'utilisateur est connecté et redirige vers la page de connexion si ce n'est pas le cas. Le tableau de bord affiche des statistiques, des exercices, des projets et des actions rapides.

## Configuration

### Firebase
Le fichier `firebase.ts` dans le dossier `config` contient la configuration de Firebase pour l'authentification et la base de données.

## Scripts

- `dev` : Lance le serveur de développement Vite.
- `build` : Compile le projet TypeScript et construit le projet avec Vite.
- `lint` : Exécute ESLint pour vérifier le code.
- `preview` : Lance un serveur de prévisualisation Vite.

## Dépendances

- `@emotion/react` et `@emotion/styled` : Pour le style.
- `@mui/material` et `@mui/icons-material` : Pour les composants UI.
- `cloudinary-react` : Pour l'intégration avec Cloudinary.
- `firebase` : Pour l'authentification et la base de données.
- `react` et `react-dom` : Pour la bibliothèque de composants.
- `react-router-dom` : Pour la gestion des routes.

## Dépendances de développement

- `eslint` et divers plugins : Pour le linting.
- `typescript` et `typescript-eslint` : Pour le support TypeScript.
- `vite` et `@vitejs/plugin-react` : Pour la configuration Vite.
