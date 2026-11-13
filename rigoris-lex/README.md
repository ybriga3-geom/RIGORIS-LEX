# RIGORIS LEX — Site vitrine (FR · AR · EN)

Site statique (HTML/CSS/JS, sans dépendance ni étape de build) de RIGORIS LEX SARL AU, Marrakech.

## Structure

```
index.html, expertises.html, plateformes.html, cabinet.html, contact.html   → Français (racine)
ar/…                                                                        → Arabe (RTL)
en/…                                                                        → Anglais
assets/css/style.css   assets/js/main.js   assets/img/rigoris-lex-logo.svg
```

## Mise en ligne

1. Créer un dépôt GitHub et y pousser le contenu de ce dossier (fichiers à la racine du dépôt).
2. Sur Vercel : *Add New → Project*, importer le dépôt, Framework Preset **Other**, aucune commande de build, Output Directory `.` (racine).
3. Ajouter le domaine dans *Settings → Domains*.

Test en local : `python3 -m http.server 8000` puis ouvrir http://localhost:8000

## À compléter avant la mise en production

- Coordonnées réelles (e-mail et téléphone actuellement fictifs) dans les 3 pages contact et le pied de page.
- Profils de l'équipe (fiches « [Nom à compléter] ») dans les pages cabinet.
- Brancher le formulaire de contact sur un service d'envoi (Formspree, Resend, fonction Vercel…).
- Valider les promesses commerciales (premier échange offert, formules, délais).
