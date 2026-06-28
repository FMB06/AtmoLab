/* =========================================================
   ATMOLAB — SCRIPT PRINCIPAL
   Objectif : rendre le site interactif sans serveur.
   Les commentaires expliquent les étapes pour apprendre à modifier le code.
   ========================================================= */

/* ---------------------------------------------------------
   1. DONNÉES DES PLANTES ALLERGISANTES
   Chaque plante possède : période, niveau allergisant, indices de reconnaissance.
   Tu peux ajouter une plante en copiant un bloc et en modifiant les valeurs.
   --------------------------------------------------------- */
const plantData = {
  "cyprès": {
    image: "assets/plantes/cypres.jpg",
    season: "janvier-avril",
    power: 3,
    note: "Très important dans le Sud, pollen souvent précoce.",
    clues: ["Feuillage en petites écailles", "Arbre souvent en haie ou alignement", "Cônes arrondis visibles"],
    confusions: "Thuyas, genévriers, autres conifères de haie.",
    sheet: "À compléter avec des photos de rameaux, cônes et silhouette de l’arbre."
  },
  "bouleau": {
    image: "assets/plantes/bouleau.jpg",
    season: "mars-mai",
    power: 3,
    note: "Fort potentiel allergisant au printemps.",
    clues: ["Écorce blanche qui se détache", "Chatons pendants au printemps", "Feuilles triangulaires dentées"],
    confusions: "Peuplier blanc, certains jeunes arbres à écorce claire.",
    sheet: "À compléter avec des photos de l’écorce, des feuilles et des chatons."
  },
  "graminées": {
    image: "assets/plantes/graminees.svg",
    season: "avril-juillet",
    power: 3,
    note: "Pollens très fréquents et très allergisants.",
    clues: ["Herbes avec tiges fines", "Épis ou panicules", "Présentes en pelouses, friches, bords de route"],
    confusions: "Identification de l’espèce exacte difficile sans clé botanique.",
    sheet: "À compléter avec exemples d’épis et méthode d’observation simple."
  },
  "ambroisie": {
    image: "assets/plantes/ambroisie.jpg",
    season: "août-octobre",
    power: 3,
    note: "Espèce très allergisante, enjeu de santé publique.",
    clues: ["Feuilles très découpées", "Tige souvent velue et ramifiée", "Fleurs verdâtres discrètes en épis"],
    confusions: "Armoise commune, jeunes plants d’autres adventices.",
    sheet: "À compléter avec photos de la feuille, de la tige et de l’inflorescence."
  },
  "olivier": {
    image: "assets/plantes/olivier.jpg",
    season: "mai-juin",
    power: 2,
    note: "Important surtout en zone méditerranéenne.",
    clues: ["Feuilles allongées", "Dessus vert-gris et dessous argenté", "Tronc souvent noueux"],
    confusions: "Troène, filaire, certains arbustes méditerranéens.",
    sheet: "À compléter avec feuilles recto-verso, fleurs et port de l’arbre."
  },
  "platane": {
    image: "assets/plantes/platane.svg",
    season: "mars-avril",
    power: 2,
    note: "Peut provoquer des gênes, notamment en ville.",
    clues: ["Écorce en plaques claires", "Feuilles larges palmées", "Fruits ronds suspendus"],
    confusions: "Érable pour les feuilles, selon la saison.",
    sheet: "À compléter avec écorce, feuille et fruits ronds."
  },
  "frêne": {
    image: "assets/plantes/frene.jpg",
    season: "février-avril",
    power: 2,
    note: "Pollen printanier, parfois associé aux allergies.",
    clues: ["Feuilles composées de plusieurs folioles", "Bourgeons noirs fréquents", "Samares en grappes"],
    confusions: "Robinier, ailante, sorbier selon les feuilles.",
    sheet: "À compléter avec bourgeons noirs, feuilles et samares."
  },
  "aulne": {
    image: "assets/plantes/aulne.jpg",
    season: "janvier-mars",
    power: 2,
    note: "Arbre à pollen précoce, souvent associé aux allergies de début d’année.",
    clues: ["Chatons pendants", "Petits cônes ligneux persistants", "Souvent près des zones humides"],
    confusions: "Noisetier, bouleau selon les chatons.",
    sheet: "À compléter avec chatons, fruits et feuilles."
  },
  "noisetier": {
    image: "assets/plantes/noisetier.svg",
    season: "janvier-mars",
    power: 2,
    note: "Pollen précoce, parfois présent dès l’hiver.",
    clues: ["Longs chatons jaunes pendants", "Arbuste de haie ou de lisière", "Feuilles arrondies dentées"],
    confusions: "Aulne, bouleau en période de chatons.",
    sheet: "À compléter avec chatons mâles et feuilles."
  },
  "chêne": {
    image: "assets/plantes/chene.jpg",
    season: "avril-mai",
    power: 2,
    note: "Pollen fréquent au printemps, pouvoir allergisant variable.",
    clues: ["Feuilles lobées", "Glands", "Grand arbre fréquent en milieu urbain ou forestier"],
    confusions: "Autres chênes, jeunes arbres feuillus.",
    sheet: "À compléter avec feuilles, glands et silhouette."
  },
  "peuplier": {
    image: "assets/plantes/peuplier.svg",
    season: "mars-avril",
    power: 1,
    note: "Pollen généralement moins majeur, mais arbre souvent remarqué au printemps.",
    clues: ["Grand arbre", "Chatons", "Bourre blanche visible plus tard mais peu liée à l’allergie pollinique"],
    confusions: "Saule, tremble.",
    sheet: "À compléter pour distinguer pollen et bourre."
  },
  "plantain": {
    image: "assets/plantes/plantain.jpg",
    season: "mai-août",
    power: 1,
    note: "Herbacée pouvant contribuer aux symptômes chez certaines personnes.",
    clues: ["Rosette de feuilles nervurées", "Épi floral dressé", "Présent dans les pelouses et chemins"],
    confusions: "Autres petites herbacées de pelouse.",
    sheet: "À compléter avec rosette et épi floral."
  },
  "oseille": {
    image: "assets/plantes/oseille.svg",
    season: "mai-août",
    power: 1,
    note: "Herbacée allergisante modérée, utile à suivre dans les prairies et friches.",
    clues: ["Feuilles allongées", "Tiges avec petites fleurs rougeâtres ou verdâtres", "Milieux ouverts"],
    confusions: "Rumex voisins, autres herbacées.",
    sheet: "À compléter avec feuilles et inflorescences."
  },
  "urticacées": {
    image: "assets/plantes/urticacees.jpg",
    season: "juin-septembre",
    power: 1,
    note: "Famille comprenant orties et pariétaires ; la pariétaire est importante en zone méditerranéenne.",
    clues: ["Plantes herbacées près des murs ou friches", "Petites fleurs discrètes", "Feuilles souvent dentées"],
    confusions: "Autres herbacées de murs et friches.",
    sheet: "À compléter, surtout pour pariétaire en contexte méditerranéen."
  },
  "autre": {
    image: "assets/plantes/autre.svg",
    season: "à préciser",
    power: 1,
    note: "Observation utile, mais à rattacher plus tard à une fiche validée.",
    clues: ["Prendre une photo nette", "Ajouter une photo de la feuille ou de l’inflorescence", "Noter le contexte : haie, pelouse, friche, alignement urbain"],
    confusions: "À préciser.",
    sheet: "Fiche générique pour une plante à ajouter ensuite."
  }
};

/* ---------------------------------------------------------
   2. VARIABLES GLOBALES
   Elles gardent en mémoire l’état actuel du site.
   --------------------------------------------------------- */
const quantityPower = { "1 à 3": 1, "3 à 10": 2, "plus de 10": 3 };
let currentPosition = { lat: 43.7102, lng: 7.2620 }; // Nice par défaut.
let map = null;
let markers = null;
let lastRiskResult = null;
let observations = JSON.parse(localStorage.getItem("atmolab_pollen_observations_v1") || "[]");

/* ---------------------------------------------------------
   3. OUTILS GÉNÉRAUX
   Petites fonctions réutilisées dans plusieurs parties du code.
   --------------------------------------------------------- */
function $(id) {
  return document.getElementById(id);
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}


/* ---------------------------------------------------------
   OUTIL VISUEL POUR LES FICHES PLANTES
   Cette fonction affiche l’icône ou la photo associée à une essence.
   Si le fichier image manque, l’image est simplement masquée par le navigateur.
   --------------------------------------------------------- */
function plantImageMarkup(data, name, className = "") {
  const cls = className ? ` ${className}` : "";
  return `<img class="plant-image${cls}" src="${data.image}" alt="Illustration de reconnaissance : ${name}" loading="lazy">`;
}

function saveObservations() {
  localStorage.setItem("atmolab_pollen_observations_v1", JSON.stringify(observations));
}

function distanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function fileToDataUrl(file) {
  return new Promise(resolve => {
    if (!file) return resolve("");
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });
}

/* ---------------------------------------------------------
   4. NAVIGATION PRINCIPALE
   Les boutons changent de panneau sans changer de page HTML.
   --------------------------------------------------------- */
function showPanel(panelId) {
  document.querySelectorAll(".panel").forEach(panel => {
    panel.classList.toggle("active", panel.id === panelId);
  });

  document.querySelectorAll(".nav-button").forEach(button => {
    button.classList.toggle("active", button.dataset.panel === panelId);
  });

  window.scrollTo({ top: 0, behavior: "smooth" });

  // La carte Leaflet doit être redimensionnée quand son panneau devient visible.
  if (panelId === "pollens") {
    initMapIfNeeded();
    setTimeout(() => map && map.invalidateSize(), 150);
  }
}

function initNavigation() {
  document.querySelectorAll("[data-panel]").forEach(button => {
    button.addEventListener("click", () => showPanel(button.dataset.panel));
  });
}

/* ---------------------------------------------------------
   5. CALCUL DU RISQUE RESPIRATOIRE GLOBAL
   Important : le facteur “air peu dispersé” est utilisé en interne,
   mais on n’affiche pas les mots techniques inversion thermique/stagnation.
   --------------------------------------------------------- */
function calculateRisk(values) {
  let score = 0;
  let dustScore = 0;
  let pollenScore = 0;
  let localPollutionScore = 0;

  // Score PM10 : base principale du risque respiratoire.
  if (values.pm10 >= 80) score += 4;
  else if (values.pm10 >= 50) score += 3;
  else if (values.pm10 >= 30) score += 2;
  else if (values.pm10 >= 20) score += 1;

  // PM2,5 : si disponible, on ajoute un indice de pollution fine.
  if (!Number.isNaN(values.pm25)) {
    if (values.pm25 >= 25) {
      score += 2;
      localPollutionScore += 2;
    } else if (values.pm25 >= 15) {
      score += 1;
      localPollutionScore += 1;
    }
  }

  // Facteur interne : conditions favorisant une accumulation locale des particules.
  // Le site utilise ce facteur dans le score, sans afficher l’explication technique.
  let internalPoorDispersion = 0;
  if (values.wind < 5) internalPoorDispersion += 2;
  else if (values.wind < 10) internalPoorDispersion += 1;
  if (values.humidity >= 85) internalPoorDispersion += 1;
  if (values.sky === "mist") internalPoorDispersion += 2;
  if (values.rain < 1) internalPoorDispersion += 1;
  score += Math.min(internalPoorDispersion, 4);

  // Hypothèse brume de sable : PM10 + couleur du ciel/dépôt + vent sud.
  if (values.pm10 >= 50) dustScore += 2;
  if (values.sky === "yellow") dustScore += 2;
  if (values.deposit === "ochre") dustScore += 2;
  if (values.windDirection === "south") dustScore += 1;

  // Hypothèse pollen : saison + météo favorable + dépôt jaune.
  if (values.pollenSeason === "moderate") pollenScore += 2;
  if (values.pollenSeason === "high") pollenScore += 4;
  if (values.temperature >= 12 && values.temperature <= 30) pollenScore += 1;
  if (values.rain < 1) pollenScore += 1;
  if (values.wind >= 5 && values.wind <= 30) pollenScore += 1;
  if (values.deposit === "yellow") pollenScore += 2;

  // Pollution locale possible : air gris, PM2,5, dépôt sombre.
  if (values.sky === "grey") localPollutionScore += 1;
  if (values.deposit === "dark") localPollutionScore += 2;
  if (values.pm10 >= 50 && dustScore < 3) localPollutionScore += 1;

  // Effet cocktail : PM10 hautes + haute saison pollinique = risque majoré.
  if (values.pm10 >= 50 && values.pollenSeason === "high") {
    score += 2;
  }

  // Niveau final simplifié.
  let level = "Faible";
  let className = "risk-low";
  if (score >= 10) {
    level = "Élevé";
    className = "risk-high";
  } else if (score >= 6) {
    level = "Modéré";
    className = "risk-mid";
  }

  // Origine principale à vérifier.
  let origin = "À préciser";
  let action = "Surveiller";
  if (dustScore >= 5) {
    origin = "Poussières désertiques possibles";
    action = "Ouvrir AERONET / Copernicus";
  } else if (pollenScore >= 5 && values.pm10 >= 50) {
    origin = "Mélange pollen + particules";
    action = "Explorer pollens + vérifier PM10";
  } else if (pollenScore >= 5) {
    origin = "Pollens probables";
    action = "Explorer les pollens";
  } else if (localPollutionScore >= 3) {
    origin = "Pollution locale possible";
    action = "Comparer avec les données locales";
  } else if (values.pm10 >= 50) {
    origin = "Particules élevées, origine à vérifier";
    action = "Comparer les sources";
  }

  return { score, level, className, origin, action, dustScore, pollenScore, localPollutionScore };
}

function getRiskFormValues() {
  return {
    source: $("dataSource").value,
    pm10: Number($("pm10").value),
    pm25: Number($("pm25").value),
    temperature: Number($("temperature").value),
    humidity: Number($("humidity").value),
    wind: Number($("wind").value),
    rain: Number($("rain").value),
    pollenSeason: $("pollenSeason").value,
    windDirection: $("windDirection").value,
    sky: $("skyObservation").value,
    deposit: $("depositObservation").value
  };
}

function updateRiskDisplay(result, values) {
  const riskLevel = $("riskLevel");
  riskLevel.textContent = result.level;
  riskLevel.className = result.className;

  $("homeRiskLabel").textContent = result.level;
  $("homeRiskLabel").className = result.className;

  $("originHint").textContent = result.origin;
  $("actionHint").textContent = result.action;

  const message = buildRiskMessage(result, values);
  $("riskMessage").textContent = message;
  $("homeRiskText").textContent = message;

  $("adviceList").innerHTML = buildAdvice(result, values).map(item => `<li>${item}</li>`).join("");
}

function buildRiskMessage(result, values) {
  if (result.level === "Élevé") {
    return "Le risque respiratoire estimé est élevé. Les particules sont importantes ou plusieurs facteurs se cumulent. Il faut vérifier l’origine probable et appliquer les bons réflexes, surtout pour les personnes sensibles.";
  }
  if (result.level === "Modéré") {
    return "Le risque respiratoire estimé est modéré. Les données justifient une surveillance et une comparaison avec les observations locales.";
  }
  return "Le risque respiratoire estimé est faible avec les données saisies. Il reste utile de surveiller les personnes sensibles en période pollinique.";
}

function buildAdvice(result, values) {
  const advice = [];
  if (result.level !== "Faible") {
    advice.push("Limiter les efforts intenses dehors pour les personnes sensibles.");
    advice.push("Comparer les mesures PM10 de l’école avec les stations locales.");
    advice.push("Avant d’aérer longtemps une classe, vérifier si l’air extérieur est favorable.");
  }
  if (result.dustScore >= 5) {
    advice.push("Vérifier les poussières désertiques avec AERONET et Copernicus/CAMS.");
  }
  if (result.pollenScore >= 5) {
    advice.push("Explorer la carte des plantes allergisantes autour de l’école.");
  }
  if (values.deposit !== "none") {
    advice.push("Prélever les dépôts et les observer à la loupe ou au microscope.");
  }
  if (advice.length === 0) {
    advice.push("Poursuivre les observations météo et PM10 sur plusieurs jours.");
  }
  return advice;
}

function initRiskForm() {
  // Affiche ou masque le lien MeteoEdu selon la source de données choisie.
  // Ce lien est utile lorsque les élèves utilisent les mesures de la station de l’école.
  const dataSourceSelect = $("dataSource");
  const stationLink = $("stationWeatherLink");

  function updateStationLinkVisibility() {
    if (!stationLink || !dataSourceSelect) return;
    stationLink.style.display = dataSourceSelect.value === "station" ? "block" : "none";
  }

  if (dataSourceSelect) {
    dataSourceSelect.addEventListener("change", updateStationLinkVisibility);
    updateStationLinkVisibility();
  }

  $("riskForm").addEventListener("submit", event => {
    event.preventDefault();
    const values = getRiskFormValues();
    const result = calculateRisk(values);
    lastRiskResult = { values, result };
    updateRiskDisplay(result, values);
  });
}

/* ---------------------------------------------------------
   6. PAGE POLLENS : SOUS-ONGLETS
   --------------------------------------------------------- */
function initPollenTabs() {
  document.querySelectorAll(".subtab").forEach(button => {
    button.addEventListener("click", () => {
      const targetId = button.dataset.pollenTab;
      document.querySelectorAll(".subtab").forEach(btn => btn.classList.toggle("active", btn === button));
      document.querySelectorAll(".pollen-panel").forEach(panel => panel.classList.toggle("active", panel.id === targetId));
      if (targetId === "pollen-carte") {
        initMapIfNeeded();
        setTimeout(() => map && map.invalidateSize(), 150);
      }
    });
  });
}

/* ---------------------------------------------------------
   7. PAGE POLLENS : CARTE LEAFLET
   La carte n’est créée qu’au moment où on en a besoin.
   --------------------------------------------------------- */
function initMapIfNeeded() {
  if (map || typeof L === "undefined") {
    if (typeof L === "undefined") $("mapFallback").style.display = "block";
    return;
  }

  map = L.map("map").setView([currentPosition.lat, currentPosition.lng], 12);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "&copy; OpenStreetMap"
  }).addTo(map);

  markers = L.layerGroup().addTo(map);

  map.on("click", event => setPosition(event.latlng.lat, event.latlng.lng));
  renderObservations();
}

function setPosition(lat, lng) {
  currentPosition = { lat, lng };
  if ($("lat")) $("lat").value = lat.toFixed(6);
  if ($("lng")) $("lng").value = lng.toFixed(6);
  if ($("positionInfo")) $("positionInfo").textContent = `Position utilisée : ${lat.toFixed(5)}, ${lng.toFixed(5)}`;
  if (map) map.setView([lat, lng], 14);
  updatePollenRisk();
}

/* ---------------------------------------------------------
   8. PAGE POLLENS : FORMULAIRE D’OBSERVATION
   --------------------------------------------------------- */
function populatePlantSelect() {
  const select = $("plantType");
  const treeNames = ["cyprès", "bouleau", "platane", "olivier", "frêne", "aulne", "noisetier", "chêne", "peuplier"];
  const herbNames = ["graminées", "ambroisie", "armoise", "plantain", "oseille", "urticacées"];

  select.innerHTML = `
    <option value="" selected disabled>Choisir une essence allergène</option>
    <optgroup label="Arbres allergisants">${treeNames.map(name => `<option value="${name}">${capitalize(name)}</option>`).join("")}</optgroup>
    <optgroup label="Herbacées et graminées">${herbNames.map(name => `<option value="${name}">${capitalize(name)}</option>`).join("")}</optgroup>
    <option value="autre">Autre / à ajouter plus tard</option>`;
}

function updatePlantHint() {
  const name = $("plantType").value;
  const hint = $("plantHint");
  const preview = $("plantPreview");
  const sheetBtn = $("openPlantSheet");

  if (!name || !plantData[name]) {
    hint.textContent = "Sélectionnez une plante pour voir sa période pollinique.";
    sheetBtn.disabled = true;
    return;
  }

  const data = plantData[name];
  const riskLabel = data.power === 3 ? "fort" : data.power === 2 ? "modéré" : "à préciser";
  hint.innerHTML = `<strong>${capitalize(name)}</strong> — période indicative : ${data.season}. ${data.note}`;
  // L’aperçu utilise désormais les icônes/photos du dossier assets/plantes.
  preview.innerHTML = `
    ${plantImageMarkup(data, name, "plant-preview-image")}
    <div>
      <span class="eyebrow">Aperçu</span>
      <h4>${capitalize(name)}</h4>
      <p><strong>Risque allergisant :</strong> ${riskLabel}</p>
      <p>${data.clues.slice(0, 2).join(" • ")}</p>
      <button type="button" class="link-button" data-preview-sheet="${name}">Voir la fiche</button>
    </div>`;

  preview.querySelector("[data-preview-sheet]").addEventListener("click", () => openSheet(name));
  sheetBtn.disabled = false;
}

function renderPlantCards() {
  // Cartes courtes : elles reprennent les icônes de reconnaissance du dossier assets/plantes.
  $("plantCards").innerHTML = Object.entries(plantData).map(([name, data]) => `
    <div class="plant">
      ${plantImageMarkup(data, name, "plant-card-image")}
      <div class="plant-body">
        <strong>${name}</strong><span class="badge">${data.season}</span>
        <p>${data.note}</p>
        <button class="link-button" data-sheet="${name}">Voir la fiche</button>
      </div>
    </div>
  `).join("");

  // Fiches longues : elles donnent les critères de terrain et les confusions possibles.
  $("plantSheets").innerHTML = Object.entries(plantData).map(([name, data]) => `
    <article class="sheet" id="fiche-${name}">
      ${plantImageMarkup(data, name, "plant-sheet-image")}
      <h3>${capitalize(name)}</h3>
      <p><strong>Période pollinique :</strong> ${data.season}</p>
      <p><strong>Risque allergisant :</strong> ${data.power === 3 ? "fort" : data.power === 2 ? "modéré" : "à préciser"}</p>
      <ul>${data.clues.map(clue => `<li>${clue}</li>`).join("")}</ul>
      <p><strong>Confusions possibles :</strong> ${data.confusions}</p>
      <p class="muted">${data.sheet}</p>
    </article>
  `).join("");

  document.querySelectorAll("[data-sheet]").forEach(button => {
    button.addEventListener("click", () => openSheet(button.dataset.sheet));
  });
}

function renderObservations() {
  if (markers) markers.clearLayers();
  const list = $("observationsList");

  if (observations.length === 0) {
    list.innerHTML = "<p class='muted'>Aucune observation pour le moment.</p>";
  } else {
    list.innerHTML = observations.slice().reverse().map(obs => `
      <div class="obs-item">
        <strong>${capitalize(obs.type)}</strong>
        <span>${obs.date} • quantité : ${obs.quantity}</span>
        <p>${obs.comment || "Pas de commentaire."}</p>
        <small>${obs.lat.toFixed(5)}, ${obs.lng.toFixed(5)}</small>
        ${obs.photo ? `<img src="${obs.photo}" alt="Photo observation ${obs.type}">` : ""}
      </div>
    `).join("");
  }

  if (markers) {
    observations.forEach(obs => {
      const marker = L.marker([obs.lat, obs.lng]).addTo(markers);
      marker.bindPopup(`<strong>${capitalize(obs.type)}</strong><br>Quantité : ${obs.quantity}<br>${obs.comment || ""}`);
    });
  }

  updatePollenRisk();
}

function monthMatchesSeason(plant) {
  const month = new Date().getMonth() + 1;
  const seasons = {
    "cyprès": [1, 2, 3, 4], "bouleau": [3, 4, 5], "graminées": [4, 5, 6, 7],
    "ambroisie": [8, 9, 10], "olivier": [5, 6], "platane": [3, 4],
    "frêne": [2, 3, 4], "aulne": [1, 2, 3], "noisetier": [1, 2, 3],
    "chêne": [4, 5], "peuplier": [3, 4], "plantain": [5, 6, 7, 8],
    "oseille": [5, 6, 7, 8], "urticacées": [6, 7, 8, 9], "armoise": [7, 8, 9]
  };
  return (seasons[plant] || []).includes(month);
}

function updatePollenRisk() {
  const localObs = observations.filter(obs => distanceKm(obs.lat, obs.lng, currentPosition.lat, currentPosition.lng) < 5);
  const plantScore = localObs.reduce((sum, obs) => {
    const data = plantData[obs.type] || plantData.autre;
    const quantity = quantityPower[obs.quantity] || 1;
    return sum + data.power + quantity + (monthMatchesSeason(obs.type) ? 2 : 0);
  }, 0);

  const badge = $("pollenRiskBadge");
  const exp = $("pollenRiskExplanation");
  if (!badge || !exp) return;

  let label = "Faible";
  let className = "risk-low";
  if (plantScore >= 10) {
    label = "Élevé";
    className = "risk-high";
  } else if (plantScore >= 5) {
    label = "Modéré";
    className = "risk-mid";
  }

  badge.textContent = label;
  badge.className = className;
  exp.textContent = `${localObs.length} observation(s) dans un rayon d’environ 5 km. Score plantes + quantité + saison : ${plantScore}.`;
}

function initObservationForm() {
  $("plantType").addEventListener("change", updatePlantHint);

  $("openPlantSheet").addEventListener("click", () => {
    const selected = $("plantType").value;
    if (selected) openSheet(selected);
  });

  $("observationForm").addEventListener("submit", async event => {
    event.preventDefault();
    const photo = await fileToDataUrl($("photo").files[0]);
    const obs = {
      type: $("plantType").value,
      quantity: $("quantity").value,
      lat: Number($("lat").value),
      lng: Number($("lng").value),
      comment: $("comment").value,
      photo,
      date: new Date().toLocaleDateString("fr-FR")
    };
    observations.push(obs);
    saveObservations();
    renderObservations();
    if (map) map.setView([obs.lat, obs.lng], 15);
    event.target.reset();
    populatePlantSelect();
    alert("Observation ajoutée au prototype.");
  });

  $("useMapCenter").addEventListener("click", () => {
    initMapIfNeeded();
    if (map) {
      const center = map.getCenter();
      setPosition(center.lat, center.lng);
    }
  });

  $("locateBtn").addEventListener("click", () => {
    if (!navigator.geolocation) {
      alert("La géolocalisation n’est pas disponible sur ce navigateur.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      position => setPosition(position.coords.latitude, position.coords.longitude),
      () => alert("Impossible d’obtenir la position. Vous pouvez saisir les coordonnées manuellement.")
    );
  });

  $("clearPollenBtn").addEventListener("click", () => {
    if (confirm("Effacer toutes les observations de ce navigateur ?")) {
      observations = [];
      saveObservations();
      renderObservations();
    }
  });
}

/* ---------------------------------------------------------
   9. MODALE DES FICHES PLANTES
   --------------------------------------------------------- */
function openSheet(name) {
  const data = plantData[name];
  $("modalTitle").textContent = `Fiche de reconnaissance — ${capitalize(name)}`;
  $("modalContent").innerHTML = `
    ${plantImageMarkup(data, name, "plant-modal-image")}
    <p><strong>Période pollinique indicative :</strong> ${data.season}</p>
    <p><strong>Pourquoi l’observer ?</strong> ${data.note}</p>
    <h3>Critères simples à vérifier</h3>
    <ul>${data.clues.map(clue => `<li>${clue}</li>`).join("")}</ul>
    <p><strong>Confusions possibles :</strong> ${data.confusions}</p>
    <p class="info-box">${data.sheet} On pourra ensuite remplacer ou compléter les icônes par plusieurs photos validées : silhouette, feuille, fleur ou inflorescence.</p>
  `;
  $("sheetModal").classList.add("show");
  $("sheetModal").setAttribute("aria-hidden", "false");
}

function closeSheet() {
  $("sheetModal").classList.remove("show");
  $("sheetModal").setAttribute("aria-hidden", "true");
}

function initModal() {
  $("closeModal").addEventListener("click", closeSheet);
  $("sheetModal").addEventListener("click", event => {
    if (event.target.id === "sheetModal") closeSheet();
  });
}


/* ---------------------------------------------------------
   10. PAGE ADAPTER NOS COMPORTEMENTS
   Cette partie transforme les données de la classe et de l’extérieur
   en conseils d’action : activités, gestes quotidiens et aération.
   --------------------------------------------------------- */
function getAiringValues() {
  return {
    classCo2: Number($("classCo2").value),
    classTemperature: Number($("classTemperature").value),
    minutesSinceAiring: Number($("minutesSinceAiring").value),
    peopleInRoom: Number($("peopleInRoom").value),
    outsidePm10: Number($("outsidePm10").value),
    outsidePm25: Number($("outsidePm25").value),
    outsideTemperature: Number($("outsideTemperature").value),
    outsidePollenRisk: $("outsidePollenRisk").value,
    outsideDustRisk: $("outsideDustRisk").value,
    outsideObservation: $("outsideObservation").value
  };
}

function calculateAiring(values) {
  let indoorNeed = 0;
  let outdoorRisk = 0;
  const advice = [];
  const factors = [];

  // Besoin intérieur : CO₂, temps sans aération, densité et chaleur dans la salle.
  if (values.classCo2 >= 1500) indoorNeed += 4;
  else if (values.classCo2 >= 1000) indoorNeed += 3;
  else if (values.classCo2 >= 800) indoorNeed += 2;
  else indoorNeed += 1;

  if (values.minutesSinceAiring >= 60) indoorNeed += 2;
  else if (values.minutesSinceAiring >= 30) indoorNeed += 1;
  if (values.peopleInRoom >= 28) indoorNeed += 1;
  if (values.classTemperature >= 26) indoorNeed += 1;

  // Risque extérieur : PM10, PM2,5, chaleur, pollens, poussières minérales et observation.
  if (values.outsidePm10 >= 80) { outdoorRisk += 4; factors.push("PM10 élevées"); }
  else if (values.outsidePm10 >= 50) { outdoorRisk += 3; factors.push("PM10 élevées"); }
  else if (values.outsidePm10 >= 30) { outdoorRisk += 2; factors.push("PM10 en hausse"); }
  else if (values.outsidePm10 >= 20) outdoorRisk += 1;

  if (!Number.isNaN(values.outsidePm25)) {
    if (values.outsidePm25 >= 25) { outdoorRisk += 3; factors.push("PM2,5 / pollution fine"); }
    else if (values.outsidePm25 >= 15) { outdoorRisk += 2; factors.push("PM2,5 en hausse"); }
  }

  if (values.outsideTemperature >= 32) { outdoorRisk += 3; factors.push("chaleur forte"); }
  else if (values.outsideTemperature >= 28) { outdoorRisk += 1; factors.push("chaleur"); }

  if (values.outsidePollenRisk === "high") { outdoorRisk += 3; factors.push("pollens"); }
  else if (values.outsidePollenRisk === "moderate") { outdoorRisk += 1; factors.push("pollens possibles"); }

  if (values.outsideDustRisk === "likely") { outdoorRisk += 3; factors.push("poussières minérales"); }
  else if (values.outsideDustRisk === "possible") { outdoorRisk += 2; factors.push("poussières minérales possibles"); }

  if (values.outsideObservation === "heat") { outdoorRisk += 1; factors.push("chaleur observée"); }
  if (values.outsideObservation === "pollen") { outdoorRisk += 2; factors.push("indice pollen"); }
  if (values.outsideObservation === "dust") { outdoorRisk += 3; factors.push("ciel/dépôt ocre"); }
  if (values.outsideObservation === "traffic") { outdoorRisk += 2; factors.push("pollution locale"); }

  // Origine dominante : si plusieurs facteurs apparaissent, AtmoLab affiche le cas multifactoriel.
  const uniqueFactors = [...new Set(factors)];
  let focus = "Air extérieur globalement favorable";
  if (uniqueFactors.length >= 3) focus = "Risque multifactoriel";
  else if (uniqueFactors.some(f => f.includes("poussières") || f.includes("ocre"))) focus = "Poussières minérales";
  else if (uniqueFactors.some(f => f.includes("pollen"))) focus = "Pollens";
  else if (uniqueFactors.some(f => f.includes("PM2,5"))) focus = "PM2,5 / pollution fine";
  else if (uniqueFactors.some(f => f.includes("chaleur"))) focus = "Chaleur";
  else if (uniqueFactors.some(f => f.includes("PM10"))) focus = "PM10 / particules";

  // Niveau de comportement : formulation simple pour l’utilisateur.
  let decision = "Liberté d’action";
  let className = "risk-low";
  let message = "Aucune précaution particulière avec les données saisies. Pensez à aérer régulièrement et à poursuivre les observations.";
  let duration = "Aération régulière";

  if (outdoorRisk >= 9) {
    decision = "Protection renforcée";
    className = "risk-high";
    message = "Le risque extérieur est très défavorable ou plusieurs facteurs se cumulent. Reporter les efforts extérieurs si possible et protéger les personnes sensibles.";
    duration = indoorNeed >= 5 ? "Aérer très brièvement" : "Limiter l’ouverture prolongée";
  } else if (outdoorRisk >= 6) {
    decision = "Réduire l’exposition";
    className = "risk-high";
    message = "Le risque est fort. Éviter le sport intense dehors, limiter les sorties longues des personnes sensibles et choisir soigneusement les moments d’aération.";
    duration = indoorNeed >= 5 ? "Strict nécessaire" : "Attendre un créneau plus favorable";
  } else if (outdoorRisk >= 3) {
    decision = "Vigilance simple";
    className = "risk-mid";
    message = "Les activités restent possibles, mais les personnes sensibles doivent éviter les expositions inutiles. Aérer plutôt par périodes courtes.";
    duration = indoorNeed >= 5 ? "Aérer brièvement" : "Aérer au bon moment";
  }

  // Conseils généraux affichés en haut de la page.
  if (decision === "Liberté d’action") {
    advice.push("Activités extérieures possibles normalement.");
    advice.push("Aérer régulièrement les salles, en restant attentif aux PM10 et aux observations.");
  } else if (decision === "Vigilance simple") {
    advice.push("Maintenir les activités habituelles, mais adapter les personnes sensibles.");
    advice.push("Éviter les efforts très intenses si des symptômes apparaissent : toux, gêne respiratoire, yeux qui piquent.");
    advice.push("Aérer par périodes courtes, au moment où l’air extérieur semble le plus favorable.");
  } else if (decision === "Réduire l’exposition") {
    advice.push("Éviter le sport intense en plein air et les sorties prolongées pour les personnes sensibles.");
    advice.push("Identifier l’origine dominante du risque avant d’ouvrir longtemps : pollen, poussières minérales, PM2,5 ou mélange.");
    advice.push("Aérer seulement le strict nécessaire si l’air extérieur est très chargé.");
  } else {
    advice.push("Reporter les efforts extérieurs si possible.");
    advice.push("Protéger en priorité les personnes sensibles : asthmatiques, allergiques, enfants, personnes fragiles.");
    advice.push("Limiter l’ouverture prolongée des fenêtres et attendre une amélioration des mesures si la classe n’est pas confinée.");
  }

  // Conseils ciblés, en complément du niveau global.
  if (values.classCo2 >= 1000) advice.push("Le CO₂ montre un besoin de renouveler l’air intérieur : privilégier des ouvertures courtes et répétées si l’extérieur est défavorable.");
  if (values.outsidePollenRisk === "high") advice.push("Pollen dominant : éviter le linge dehors et se rincer les cheveux le soir après forte exposition.");
  if (values.outsideDustRisk !== "none" || values.outsideObservation === "dust") advice.push("Poussières minérales : nettoyer les dépôts avec un chiffon humide plutôt qu’à sec.");
  if (!Number.isNaN(values.outsidePm25) && values.outsidePm25 >= 15) advice.push("PM2,5 : éviter les efforts près du trafic et aérer hors pics de circulation si possible.");
  if (values.outsideTemperature >= 28) advice.push("Chaleur : éviter les heures les plus chaudes et aérer quand l’air extérieur est plus frais.");
  if (focus === "Risque multifactoriel") advice.push("Risque multifactoriel : cumuler les précautions et choisir le meilleur créneau en croisant PM10, PM2,5, pollen et température.");

  return { indoorNeed, outdoorRisk, decision, duration, focus, className, message, advice };
}

function updateAiringDisplay(result) {
  $("airingDecision").textContent = result.decision;
  $("airingDecision").className = result.className;
  $("airingMessage").textContent = result.message;
  $("airingDuration").textContent = result.duration;
  $("airingFocus").textContent = result.focus;
  $("airingAdviceList").innerHTML = result.advice.map(item => `<li>${item}</li>`).join("");
}

function fillAiringFormFromRiskData() {
  if (!lastRiskResult) {
    alert("Calculez d’abord le risque du jour ou saisissez les valeurs manuellement.");
    return;
  }

  const values = lastRiskResult.values;
  $("outsidePm10").value = values.pm10;
  $("outsidePm25").value = Number.isNaN(values.pm25) ? "" : values.pm25;
  $("outsideTemperature").value = values.temperature;

  // On traduit la saison pollinique de la page Évaluer vers la page Quand aérer.
  if (values.pollenSeason === "high") $("outsidePollenRisk").value = "high";
  else if (values.pollenSeason === "moderate") $("outsidePollenRisk").value = "moderate";
  else $("outsidePollenRisk").value = "low";

  // Si les indices de brume de sable étaient forts dans l’évaluation, on les reporte ici.
  if (lastRiskResult.result.dustScore >= 5) $("outsideDustRisk").value = "likely";
  else if (lastRiskResult.result.dustScore >= 3) $("outsideDustRisk").value = "possible";
  else $("outsideDustRisk").value = "none";

  // Les observations visuelles peuvent aussi être reprises.
  if (values.sky === "yellow" || values.deposit === "ochre") $("outsideObservation").value = "dust";
  else if (values.deposit === "yellow") $("outsideObservation").value = "pollen";
  else if (values.sky === "grey" || values.deposit === "dark") $("outsideObservation").value = "traffic";
  else if (values.temperature >= 28) $("outsideObservation").value = "heat";
  else $("outsideObservation").value = "normal";

  const airingValues = getAiringValues();
  updateAiringDisplay(calculateAiring(airingValues));
}

function initAiringForm() {
  if (!$("airingForm")) return;

  $("airingForm").addEventListener("submit", event => {
    event.preventDefault();
    updateAiringDisplay(calculateAiring(getAiringValues()));
  });

  $("useRiskDataAiring").addEventListener("click", fillAiringFormFromRiskData);

  // Conseil par défaut au chargement, pour que la page ne reste pas vide.
  updateAiringDisplay(calculateAiring(getAiringValues()));
}

/* ---------------------------------------------------------
   11. RAPPORT AUTOMATIQUE
   --------------------------------------------------------- */
function updateReport(values, result) {
  if (!$("reportText")) return;
  const sourceLabels = {
    "station": "station de l’école",
    "site-local": "site local de surveillance",
    "manuel": "saisie manuelle"
  };

  const pollenLabels = {
    "none": "hors saison pollinique ou saison inconnue",
    "moderate": "saison pollinique possible",
    "high": "haute saison pollinique"
  };

  $("reportText").value =
`Rapport AtmoLab — ${new Date().toLocaleDateString("fr-FR")}

Source des données : ${sourceLabels[values.source]}.
PM10 : ${values.pm10} µg/m³.
PM2,5 : ${Number.isNaN(values.pm25) ? "non renseignées" : values.pm25 + " µg/m³"}.
Température : ${values.temperature} °C.
Humidité : ${values.humidity} %.
Vent : ${values.wind} km/h.
Pluie sur 24 h : ${values.rain} mm.
Saison pollinique : ${pollenLabels[values.pollenSeason]}.
Observation du ciel : ${$("skyObservation").selectedOptions[0].textContent}.
Dépôt observé : ${$("depositObservation").selectedOptions[0].textContent}.

Risque respiratoire estimé : ${result.level}.
Origine à vérifier : ${result.origin}.
Action prioritaire : ${result.action}.

Conclusion prudente : cette estimation repose sur un croisement d’indices. Elle ne remplace pas les données officielles de qualité de l’air ni un avis médical. Elle sert à guider l’enquête : mesures locales, observations de terrain, données polliniques et vérification éventuelle des poussières désertiques avec AERONET ou Copernicus.`;
}

function initReportCopy() {
  if (!$("copyReportBtn") || !$("reportText")) return;
  $("copyReportBtn").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText($("reportText").value);
      alert("Rapport copié.");
    } catch (error) {
      $("reportText").select();
      document.execCommand("copy");
      alert("Rapport copié.");
    }
  });
}

/* ---------------------------------------------------------
   12. INITIALISATION
   Cette fonction lance toutes les fonctions nécessaires au chargement.
   --------------------------------------------------------- */
function initApp() {
  initNavigation();
  initRiskForm();
  initPollenTabs();
  populatePlantSelect();
  renderPlantCards();
  initObservationForm();
  initModal();
  initAiringForm();
  setPosition(currentPosition.lat, currentPosition.lng);
  renderObservations();

  // Rapport par défaut avant toute saisie.
  const values = getRiskFormValues();
  const result = calculateRisk(values);
  lastRiskResult = { values, result };
  updateRiskDisplay(result, values);
}

// DOMContentLoaded garantit que le HTML est chargé avant de chercher les éléments de la page.
document.addEventListener("DOMContentLoaded", initApp);
