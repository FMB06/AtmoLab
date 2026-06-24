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
    emoji: "🌲",
    season: "janvier-avril",
    power: 3,
    note: "Très important dans le Sud, pollen souvent précoce.",
    clues: ["Feuillage en petites écailles", "Arbre souvent en haie ou alignement", "Cônes arrondis visibles"],
    confusions: "Thuyas, genévriers, autres conifères de haie."
  },
  "bouleau": {
    emoji: "🌳",
    season: "mars-mai",
    power: 3,
    note: "Fort potentiel allergisant au printemps.",
    clues: ["Écorce blanche qui se détache", "Chatons pendants au printemps", "Feuilles triangulaires dentées"],
    confusions: "Peuplier blanc, certains jeunes arbres à écorce claire."
  },
  "graminées": {
    emoji: "🌾",
    season: "avril-juillet",
    power: 3,
    note: "Pollens très fréquents et très allergisants.",
    clues: ["Herbes avec tiges fines", "Épis ou panicules", "Présentes en pelouses, friches, bords de route"],
    confusions: "Identification de l’espèce exacte difficile sans clé botanique."
  },
  "ambroisie": {
    emoji: "🌿",
    season: "août-octobre",
    power: 3,
    note: "Espèce très allergisante, enjeu de santé publique.",
    clues: ["Feuilles très découpées", "Tige souvent velue et ramifiée", "Fleurs verdâtres discrètes en épis"],
    confusions: "Armoise commune, jeunes plants d’autres adventices."
  },
  "olivier": {
    emoji: "🫒",
    season: "mai-juin",
    power: 2,
    note: "Important surtout en zone méditerranéenne.",
    clues: ["Feuilles allongées", "Dessus vert-gris et dessous argenté", "Tronc souvent noueux"],
    confusions: "Troène, filaire, certains arbustes méditerranéens."
  },
  "platane": {
    emoji: "🍃",
    season: "mars-avril",
    power: 2,
    note: "Peut provoquer des gênes, notamment en ville.",
    clues: ["Écorce en plaques claires", "Feuilles larges palmées", "Fruits ronds suspendus"],
    confusions: "Érable pour les feuilles, selon la saison."
  },
  "frêne": {
    emoji: "🌳",
    season: "février-avril",
    power: 2,
    note: "Pollen printanier, parfois associé aux allergies.",
    clues: ["Feuilles composées", "Bourgeons noirs fréquents", "Samares en grappes"],
    confusions: "Robinier, ailante, sorbier selon les feuilles."
  },
  "aulne": {
    emoji: "🌳",
    season: "janvier-mars",
    power: 2,
    note: "Arbre à pollen précoce, souvent associé aux allergies de début d’année.",
    clues: ["Chatons pendants", "Petits cônes ligneux persistants", "Souvent près des zones humides"],
    confusions: "Noisetier, bouleau selon les chatons."
  },
  "noisetier": {
    emoji: "🌰",
    season: "janvier-mars",
    power: 2,
    note: "Pollen précoce, parfois présent dès l’hiver.",
    clues: ["Longs chatons jaunes pendants", "Arbuste de haie ou de lisière", "Feuilles arrondies dentées"],
    confusions: "Aulne, bouleau en période de chatons."
  },
  "chêne": {
    emoji: "🌳",
    season: "avril-mai",
    power: 2,
    note: "Pollen fréquent au printemps, pouvoir allergisant variable.",
    clues: ["Feuilles lobées", "Glands", "Grand arbre fréquent"],
    confusions: "Autres chênes, jeunes arbres feuillus."
  },
  "peuplier": {
    emoji: "🌳",
    season: "mars-avril",
    power: 1,
    note: "Pollen généralement moins majeur, mais arbre souvent remarqué au printemps.",
    clues: ["Grand arbre", "Chatons", "Bourre blanche visible plus tard mais peu liée à l’allergie pollinique"],
    confusions: "Saule, tremble."
  },
  "plantain": {
    emoji: "🌿",
    season: "mai-août",
    power: 1,
    note: "Herbacée pouvant contribuer aux symptômes chez certaines personnes.",
    clues: ["Rosette de feuilles nervurées", "Épi floral dressé", "Présent dans les pelouses et chemins"],
    confusions: "Autres petites herbacées de pelouse."
  },
  "oseille": {
    emoji: "🌿",
    season: "mai-août",
    power: 1,
    note: "Herbacée allergisante modérée, utile à suivre dans les prairies et friches.",
    clues: ["Feuilles allongées", "Tiges avec petites fleurs rougeâtres ou verdâtres", "Milieux ouverts"],
    confusions: "Rumex voisins, autres herbacées."
  },
  "urticacées": {
    emoji: "🌱",
    season: "juin-septembre",
    power: 1,
    note: "Famille comprenant orties et pariétaires ; la pariétaire est importante en zone méditerranéenne.",
    clues: ["Plantes herbacées près des murs ou friches", "Petites fleurs discrètes", "Feuilles souvent dentées"],
    confusions: "Autres herbacées de murs et friches."
  },
  "autre": {
    emoji: "🌿",
    season: "à préciser",
    power: 1,
    note: "Observation utile, mais à rattacher plus tard à une fiche validée.",
    clues: ["Prendre une photo nette", "Ajouter une photo de la feuille ou de l’inflorescence", "Noter le contexte"],
    confusions: "À préciser."
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
  preview.innerHTML = `
    <div class="plant-emoji">${data.emoji}</div>
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
  $("plantCards").innerHTML = Object.entries(plantData).map(([name, data]) => `
    <div class="plant">
      <div class="plant-emoji">${data.emoji}</div>
      <strong>${name}</strong><span class="badge">${data.season}</span>
      <p>${data.note}</p>
      <button class="link-button" data-sheet="${name}">Voir la fiche</button>
    </div>
  `).join("");

  $("plantSheets").innerHTML = Object.entries(plantData).map(([name, data]) => `
    <article class="sheet" id="fiche-${name}">
      <div class="plant-emoji">${data.emoji}</div>
      <h3>${capitalize(name)}</h3>
      <p><strong>Période pollinique :</strong> ${data.season}</p>
      <p><strong>Risque allergisant :</strong> ${data.power === 3 ? "fort" : data.power === 2 ? "modéré" : "à préciser"}</p>
      <ul>${data.clues.map(clue => `<li>${clue}</li>`).join("")}</ul>
      <p><strong>Confusions possibles :</strong> ${data.confusions}</p>
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
    <div class="plant-emoji">${data.emoji}</div>
    <p><strong>Période pollinique indicative :</strong> ${data.season}</p>
    <p><strong>Pourquoi l’observer ?</strong> ${data.note}</p>
    <h3>Critères simples à vérifier</h3>
    <ul>${data.clues.map(clue => `<li>${clue}</li>`).join("")}</ul>
    <p><strong>Confusions possibles :</strong> ${data.confusions}</p>
    <p class="info-box">Version future : ajouter plusieurs photos validées : silhouette, feuille, fleur ou inflorescence, confusions fréquentes.</p>
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
   10. PAGE QUAND AÉRER ?
   Cette partie transforme des données simples en conseil d’aération.
   On met en balance : besoin de renouveler l’air intérieur + risque extérieur.
   --------------------------------------------------------- */
function getAiringValues() {
  return {
    classCo2: Number($("classCo2").value),
    classTemperature: Number($("classTemperature").value),
    minutesSinceAiring: Number($("minutesSinceAiring").value),
    peopleInRoom: Number($("peopleInRoom").value),
    outsidePm10: Number($("outsidePm10").value),
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

  // Besoin d’aération : CO₂, temps sans aération, densité et chaleur intérieure.
  if (values.classCo2 >= 1500) indoorNeed += 4;
  else if (values.classCo2 >= 1000) indoorNeed += 3;
  else if (values.classCo2 >= 800) indoorNeed += 2;
  else indoorNeed += 1;

  if (values.minutesSinceAiring >= 60) indoorNeed += 2;
  else if (values.minutesSinceAiring >= 30) indoorNeed += 1;

  if (values.peopleInRoom >= 28) indoorNeed += 1;
  if (values.classTemperature >= 26) indoorNeed += 1;

  // Risque extérieur : PM10, chaleur, pollens, brume de sable et observations.
  if (values.outsidePm10 >= 80) outdoorRisk += 4;
  else if (values.outsidePm10 >= 50) outdoorRisk += 3;
  else if (values.outsidePm10 >= 30) outdoorRisk += 2;
  else if (values.outsidePm10 >= 20) outdoorRisk += 1;

  if (values.outsideTemperature >= 32) outdoorRisk += 3;
  else if (values.outsideTemperature >= 28) outdoorRisk += 1;

  if (values.outsidePollenRisk === "high") outdoorRisk += 3;
  else if (values.outsidePollenRisk === "moderate") outdoorRisk += 1;

  if (values.outsideDustRisk === "likely") outdoorRisk += 3;
  else if (values.outsideDustRisk === "possible") outdoorRisk += 2;

  if (values.outsideObservation === "heat") outdoorRisk += 1;
  if (values.outsideObservation === "pollen") outdoorRisk += 2;
  if (values.outsideObservation === "dust") outdoorRisk += 3;
  if (values.outsideObservation === "traffic") outdoorRisk += 2;

  // Conseils ciblés : ils apparaissent seulement si le facteur concerné est présent.
  if (values.classCo2 >= 1000) advice.push("Le CO₂ indique un vrai besoin de renouveler l’air intérieur.");
  if (values.outsidePm10 >= 50) advice.push("Les PM10 extérieures sont élevées : éviter une aération prolongée si possible.");
  if (values.outsidePollenRisk === "high") advice.push("Le risque pollinique est élevé : privilégier une aération courte ou après une pluie si possible.");
  if (values.outsideDustRisk !== "none" || values.outsideObservation === "dust") advice.push("Brume de sable possible : vérifier AERONET/Copernicus et limiter l’entrée prolongée de poussières.");
  if (values.outsideTemperature >= 28) advice.push("La chaleur extérieure peut réchauffer la salle : privilégier tôt le matin, une zone ombragée ou un moment plus frais.");

  let decision = "Surveiller";
  let duration = "Selon besoin";
  let focus = "Équilibre intérieur / extérieur";
  let className = "risk-mid";
  let message = "Les données invitent à rester prudent et à adapter la durée d’aération.";

  if (indoorNeed >= 5 && outdoorRisk <= 2) {
    decision = "Aérer maintenant";
    duration = "5 à 10 min";
    focus = "Air extérieur favorable";
    className = "risk-low";
    message = "Le besoin de renouveler l’air intérieur est important et l’air extérieur semble favorable.";
  } else if (indoorNeed >= 5 && outdoorRisk <= 5) {
    decision = "Aérer brièvement";
    duration = "2 à 5 min";
    focus = "Risque extérieur modéré";
    className = "risk-mid";
    message = "Il faut renouveler l’air intérieur, mais l’air extérieur présente quelques facteurs de risque. Une aération courte est préférable.";
  } else if (indoorNeed >= 5 && outdoorRisk > 5) {
    decision = "Aérer très brièvement";
    duration = "1 à 3 min, par à-coups";
    focus = "Air extérieur défavorable";
    className = "risk-high";
    message = "Le besoin d’aérer existe, mais l’air extérieur est défavorable. Privilégier une ouverture courte, puis réévaluer plus tard.";
  } else if (indoorNeed < 5 && outdoorRisk > 5) {
    decision = "Reporter si possible";
    duration = "Attendre un moment plus favorable";
    focus = "Air extérieur défavorable";
    className = "risk-high";
    message = "Le besoin d’aération n’est pas prioritaire et l’air extérieur est chargé : il vaut mieux attendre si la situation intérieure le permet.";
  } else if (indoorNeed < 5 && outdoorRisk <= 2) {
    decision = "Moment favorable";
    duration = "Aérer si besoin";
    focus = "Air extérieur correct";
    className = "risk-low";
    message = "L’air extérieur semble favorable. C’est un bon moment pour anticiper le renouvellement de l’air.";
  }

  if (advice.length === 0) {
    advice.push("Aérer régulièrement reste utile, même si aucun facteur critique n’est détecté.");
    advice.push("Réévaluer si les PM10, la chaleur ou les symptômes allergiques augmentent.");
  }

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
