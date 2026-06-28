# AtmoLab — prototype d’architecture

## Page d’accueil
Titre principal : **Quel air respirons-nous aujourd’hui ?**

Sous-titre : AtmoLab aide à observer les PM10, la météo, les pollens et les brumes de sable pour comprendre le risque respiratoire et adopter les bons réflexes.

Boutons :
- Évaluer le risque du jour
- Explorer les pollens
- Vérifier une brume de sable
- Observer le ciel et les dépôts

## Architecture
1. Accueil : identité du projet et accès rapide aux modules.
2. Évaluer : saisie PM10, météo, saison pollinique, couleur du ciel, dépôts.
3. Pollens : reprise de la logique Carte / Observer / Fiches.
4. Brume de sable : vérification avec AERONET, Copernicus/CAMS et indices locaux.
5. Ciel et dépôts : activité de terrain, observation, microscope, H2O2.
6. Rapport : synthèse automatique à copier.

## Point important
Le risque de stagnation de l’air / inversion thermique est intégré dans le calcul interne, mais le site n’affiche pas ces termes pour ne pas surcharger l’interface.

## Logos
Place les fichiers suivants dans le dossier `assets` :
- `ease.png` pour le logo EASE en haut à gauche ;
- `erasmus.png` pour le logo Erasmus+ en bas de page.

Si les fichiers ne sont pas présents, un texte de remplacement apparaît.

## Encodage
Tous les fichiers sont enregistrés en UTF-8. Si des caractères étranges apparaissent encore, vérifier que l’éditeur de code enregistre bien en UTF-8.

## Lancement
Ouvrir `index.html` dans un navigateur.


Version modifiée : suppression de la page Rapport et ajout de l’illustration pissenlit sur la page Explorer les pollens.


Mise à jour — comportements
- L’onglet « Quand aérer ? » devient « Adapter nos comportements ».
- La navigation met « Ciel et dépôts » avant « Pollens » et « Brume de sable ».
- La page « Adapter nos comportements » reprend les données de l’évaluation du jour et propose un conseil global : liberté d’action, vigilance simple, réduction de l’exposition ou protection renforcée.
- Les recommandations détaillées sont placées en fin de page : pollen, poussières minérales, PM2,5/pollution fine, chaleur et risque multifactoriel.
- L’aération reste présente, mais comme un comportement parmi d’autres : sport, sorties, gestes du quotidien et gestion de la classe.
