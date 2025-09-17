// COFFEE PRECISION - Complete rewrite with fixed navigation
let currentScreen = 'screen-initial';
let extractionData = {
    coffee: {},
    method: 'Espresso',
    machine: {},
    machineType: '',
    grinder: {},
    dose: { coffee: 18, liquid: 36 },
    temperature: 93,
    evaluation: {},
    timestamp: null
};

// COMPLETE INTERNATIONAL COFFEE DATABASE
const coffeeData = {
    "countries_by_continent": {
        "Central America": ["Mexico", "Guatemala", "Honduras", "El Salvador", "Nicaragua", "Costa Rica", "Panama", "Cuba", "Jamaica", "Haiti", "Dominican Republic", "Puerto Rico"],
        "South America": ["Brazil", "Colombia", "Peru", "Ecuador", "Venezuela", "Bolivia", "Paraguay"], 
        "Africa": ["Ethiopia", "Kenya", "Tanzania", "Rwanda", "Burundi", "Uganda", "Ivory Coast", "Cameroon", "Madagascar", "Ghana", "Togo", "Benin", "Nigeria", "Sierra Leone", "Liberia", "Guinea", "Mali", "Central African Republic", "Democratic Republic of Congo", "Angola", "Gabon"],
        "Asia": ["Vietnam", "Indonesia", "India", "China", "Laos", "Thailand", "Myanmar", "Philippines", "Papua New Guinea", "Timor-Leste", "Nepal", "Yemen"]
    },
    
    "altitudes": ["600m", "650m", "700m", "750m", "800m", "850m", "900m", "950m", "1000m", "1050m", "1100m", "1150m", "1200m", "1250m", "1300m", "1350m", "1400m", "1450m", "1500m", "1550m", "1600m", "1650m", "1700m", "1750m", "1800m", "1850m", "1900m", "1950m", "2000m", "2050m", "2100m", "2150m", "2200m", "2250m", "2300m", "2350m", "2400m", "2450m", "2500m"],
    
    "varieties": ["Typica", "Red Bourbon", "Yellow Bourbon", "Orange Bourbon", "Pink Bourbon", "Geisha/Gesha", "Caturra", "Mundo Novo", "Catuai", "Pacamara", "Maragogipe", "Pacas", "Villa Sarchi", "SL28", "SL34", "Ruiru 11", "Batian", "Ethiopian Heirloom", "Yirgacheffe", "Sidamo", "Harar", "Wush Wush", "Catimor", "Sarchimor", "Castillo", "Marsellesa", "Parainema", "Anacafe 14", "Icatu", "Obata", "Arara", "Acaia", "Maracaturra", "Pache Colis", "Pache Comum", "Blue Mountain", "Kona", "Java", "Sumatra Ateng", "Bourbon Pointu", "Mocha", "Santos", "French Mission", "K7", "Jackson", "Bernardina", "Ombligon", "S795", "Cauvery", "Kent", "Chickumalgu", "Sagada", "Benguet", "Bergendal", "Mayagüez", "Bonifieur", "F1 Hybrid", "Centroamericano", "Robusta Conillon", "Nganda", "Kouilou", "Erecta", "BP Series", "Liberica", "Excelsa", "Charrier", "Arabusta", "Timor Hybrid"],
    
    "processing_methods": ["Washed", "Natural", "Honey White", "Honey Yellow", "Honey Red", "Honey Black", "Pulped Natural", "Semi-Washed", "Wet Hulled", "Anaerobic Fermentation", "Anaerobic Natural", "Anaerobic Washed", "Extended Fermentation", "Carbonic Maceration", "Double Fermentation", "Wine Process"],
    
    "roast_levels": ["Light Roast", "Light-Medium Roast", "Medium Roast", "Medium-Dark Roast", "Dark Roast", "French Roast", "Italian Roast"],
    
    "machine_types": {
        "pump_machine": {
            "name": "Pump Machines",
            "adjustment": 0.0,
            "description": "9 bar constant pressure, 25-30s extraction",
            "icon": "⚡",
            "examples": ["Sage Dual Boiler", "La Marzocco Linea Mini"]
        },
        "spring_lever": {
            "name": "Spring Lever Machines", 
            "adjustment": 1.2,
            "description": "10-12 bar declining pressure, 35-45s extraction",
            "icon": "🌿",
            "examples": ["La Pavoni Europiccola", "Olympia Cremina"]
        },
        "manual_lever": {
            "name": "Manual Lever Machines",
            "adjustment": 1.8,
            "description": "6-8 bar variable pressure, 45-60s extraction", 
            "icon": "💪",
            "examples": ["Flair 58", "Cafelat Robot"]
        },
        "manual_espresso": {
            "name": "Manual Espresso Machines",
            "adjustment": 2.0,
            "description": "4-6 bar pressure, 60+ seconds extraction",
            "icon": "🎒",
            "examples": ["Picopresso", "Handpresso"]
        }
    },
    
    "grinder_brands": {
        "Varia": ["VS3 Gen 1", "VS3 Gen 2", "VS6"],
        "Comandante": ["C40 MK3", "C40 MK4", "C40 with Red Clix"],
        "1Zpresso": ["J-Max", "JX-Pro", "JX", "K-Plus", "K-Max", "Q2", "X-Pro", "Z1 Espresso"],
        "Niche": ["Niche Zero", "Niche Duo"],
        "Weber Workshops": ["EG-1 Mk.3 Silver", "EG-1 Mk.3 Onyx", "HG-1 Prime", "HG-2", "Key"],
        "Kafatek": ["Monolith Conical MC6", "Monolith Flat MC5", "Monolith Flat Max", "MAX2 SSW"],
        "Versalab": ["M3", "M4"],
        "Eureka": ["Mignon Specialita", "Mignon Silenzio", "Mignon Perfetto", "Mignon Libra", "Mignon Zero", "Atom 60", "Atom 65", "Atom 75", "Atom W 75", "Zenith 65E", "Helios 65", "Helios 80"],
        "Fiorenzato": ["All Ground", "All Ground Sense", "F4 Nano", "F4 Evo", "F4 Filter", "F64 E", "F64 Evo", "F64 EVO Pro", "F83 E", "F83 XGi"],
        "Mazzer": ["Mini Electronic A", "Mini Electronic B", "Major", "Super Jolly", "Kony S", "Robur S", "Robur E", "ZM"],
        "Mahlkonig": ["X54", "E65S", "E65S GBW", "E80 Supreme", "EK43", "EK43S", "Peak"],
        "La Marzocco": ["Swift", "Lux D"],
        "Rancilio": ["Rocky", "MD40", "MD50", "MD64"],
        "Baratza": ["Encore", "Encore ESP", "Virtuoso+", "Vario", "Forte AP", "Forte BG", "Sette 30", "Sette 270", "Sette 270Wi", "Preciso"]
    },
    
    "espresso_machines_by_type": {
        "pump_machine": {
            "La Marzocco": ["Linea Mini", "GS3 AV", "GS3 MP", "Linea PB X", "Linea Classic", "Strada AV", "Strada EP", "KB90", "Leva"],
            "Sage": ["Bambino", "Bambino Plus", "Duo Temp Pro", "Barista Express", "Barista Pro", "Barista Touch", "Oracle", "Dual Boiler"],
            "Breville": ["Bambino", "Bambino Plus", "Infuser", "Duo Temp Pro", "Barista Express", "Barista Pro", "Barista Touch", "Oracle", "Oracle Touch", "Dual Boiler"],
            "Rancilio": ["Silvia", "Silvia Pro", "Silvia Pro X", "Classe 5 USB", "Classe 7 USB", "Specialty RS1"],
            "ECM": ["Classika PID", "Mechanika V Slim", "Puristika", "Synchronika", "Technika V Profi", "Casa V"],
            "Rocket Espresso": ["Appartamento", "Appartamento TCA", "Cellini Evoluzione", "Mozzafiato Cronometro", "R Nine One", "R58", "Bicocca", "Epica", "RE Dual Boiler", "RE A"],
            "Lelit": ["Anna PID", "Glenda", "Grace", "Mara X", "Elizabeth", "Bianca"],
            "Profitec": ["Go", "Pro 300", "Pro 500 PID", "Pro 600", "Pro 700"]
        },
        "spring_lever": {
            "La Pavoni": ["Europiccola", "Professional", "Bar", "Stradivari"],
            "Olympia Express": ["Cremina", "Club"],
            "Profitec": ["Pro 800"],
            "Londinium": ["L1", "L2", "L3"]
        },
        "manual_lever": {
            "Flair": ["58", "58+", "58x", "Pro 2", "Classic", "Signature"],
            "Cafelat": ["Robot", "Robot Barista"],
            "Rok": ["Presso", "Presso GC"]
        },
        "manual_espresso": {
            "Wacaco": ["Picopresso", "Nanopresso"],
            "Handpresso": ["Wild", "Pump", "Auto"]
        }
    },
    
    "grinder_specifications": {
        "Varia": {
            "VS3 Gen 1": {"espresso_base": 2.5, "espresso_range": [0.2, 3.3], "unit": "", "micron_per_step": 10},
            "VS3 Gen 2": {"espresso_base": 2.5, "espresso_range": [0.2, 3.3], "unit": "", "micron_per_step": 10},
            "VS6": {"espresso_base": 2.3, "espresso_range": [0.2, 3.5], "unit": "", "micron_per_step": 8}
        },
        "Comandante": {
            "C40 MK3": {"espresso_base": 4.5, "espresso_range": [3, 6], "unit": " click", "micron_per_step": 30},
            "C40 MK4": {"espresso_base": 4.5, "espresso_range": [3, 6], "unit": " click", "micron_per_step": 30},
            "C40 with Red Clix": {"espresso_base": 4.5, "espresso_range": [3, 6], "unit": " click", "micron_per_step": 25}
        },
        "1Zpresso": {
            "J-Max": {"espresso_base": 1.5, "espresso_range": [1, 2.2], "unit": " turns", "micron_per_step": 22},
            "JX-Pro": {"espresso_base": 1.8, "espresso_range": [1.2, 2.5], "unit": " turns", "micron_per_step": 25},
            "JX": {"espresso_base": 2.0, "espresso_range": [1.5, 3.0], "unit": " turns", "micron_per_step": 30},
            "K-Plus": {"espresso_base": 1.2, "espresso_range": [0.8, 1.8], "unit": " turns", "micron_per_step": 18},
            "K-Max": {"espresso_base": 1.0, "espresso_range": [0.6, 1.6], "unit": " turns", "micron_per_step": 16},
            "Z1 Espresso": {"espresso_base": 1.5, "espresso_range": [1.0, 2.2], "unit": " turns", "micron_per_step": 20}
        },
        "Niche": {
            "Niche Zero": {"espresso_base": 12, "espresso_range": [8, 16], "unit": "", "micron_per_step": 10},
            "Niche Duo": {"espresso_base": 10, "espresso_range": [6, 14], "unit": "", "micron_per_step": 8}
        }
    },
    
    "calculation_factors": {
        "altitude": {
            "600-1000m": 0.1,      
            "1000-1500m": 0.0,     
            "1500-2000m": -0.1,    
            "2000m+": -0.2         
        },
        "processing": {
            "Washed": 0.0,
            "Natural": 0.1,
            "Honey White": 0.02,
            "Honey Yellow": 0.05,
            "Honey Red": 0.08,
            "Honey Black": 0.1,
            "Pulped Natural": 0.05,
            "Semi-Washed": 0.03,
            "Wet Hulled": 0.08,
            "Anaerobic Fermentation": 0.1,    
            "Anaerobic Natural": 0.08,
            "Anaerobic Washed": 0.05,
            "Extended Fermentation": 0.08,
            "Carbonic Maceration": 0.12,
            "Double Fermentation": 0.1,
            "Wine Process": 0.15
        },
        "roast_level": {
            "Light Roast": -0.2,               
            "Light-Medium Roast": -0.1,        
            "Medium Roast": 0.0,               
            "Medium-Dark Roast": 0.1,          
            "Dark Roast": 0.2,
            "French Roast": 0.3,
            "Italian Roast": 0.4
        },
        "variety": {
            "Geisha/Gesha": -0.05,             
            "Pacamara": 0.0,                   
            "Maragogipe": 0.0,                 
            "SL28": -0.05,                     
            "SL34": -0.05,                     
            "Yirgacheffe": -0.05,
            "Ethiopian Heirloom": -0.03,
            "Robusta Conillon": 0.1,        
            "Typica": 0.0,
            "Red Bourbon": 0.0,
            "Yellow Bourbon": 0.0,
            "Orange Bourbon": 0.0,
            "Pink Bourbon": 0.0,
            "Caturra": 0.0,
            "Mundo Novo": 0.02,
            "Catuai": 0.02,
            "Catimor": 0.05,
            "Sarchimor": 0.05,
            "Castillo": 0.03
        }
    },
    
    "temperature_matrix": {
        "Light Roast + Washed": 96,
        "Light Roast + Natural": 95,
        "Light Roast + Anaerobic Fermentation": 95,
        "Light Roast + Anaerobic Natural": 95,
        "Light Roast + Anaerobic Washed": 95,
        "Light-Medium Roast + Washed": 95,
        "Light-Medium Roast + Natural": 94,
        "Light-Medium Roast + Anaerobic Fermentation": 94,  
        "Light-Medium Roast + Anaerobic Natural": 94,
        "Light-Medium Roast + Anaerobic Washed": 94,
        "Medium Roast + Washed": 94,
        "Medium Roast + Natural": 93,
        "Medium Roast + Anaerobic Fermentation": 93,
        "Medium-Dark Roast": 93,
        "Dark Roast": 92,
        "French Roast": 91,
        "Italian Roast": 90
    }
};

// FIXED SCREEN NAVIGATION 
function showScreen(screenId) {
    console.log('Switching to screen:', screenId);
    
    // Hide all screens
    const allScreens = document.querySelectorAll('.screen');
    allScreens.forEach(screen => {
        screen.classList.add('hidden');
    });
    
    // Show target screen
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.remove('hidden');
        currentScreen = screenId;
        console.log('Successfully switched to:', screenId);
    } else {
        console.error('Screen not found:', screenId);
    }
}

// Navigation functions
function showMainScreen() { showScreen('screen-main'); }
function showCoffeeDataScreen() { showScreen('screen-coffee-data'); }
function showMachineScreen() { 
    populateMachineTypesGrid();
    showScreen('screen-machine'); 
}
function showGrinderScreen() { showScreen('screen-grinder'); }
function showDoseCustomizationScreen() { 
    updateDoseSliders();
    showScreen('screen-dose-customization'); 
}
function showFinalSuggestionScreen() { 
    generateFinalSuggestion();
    showScreen('screen-final-suggestion'); 
}
function showEvaluationScreen() { showScreen('screen-evaluation'); }
function showArchiveScreen() { 
    populateArchive();
    showScreen('screen-archive'); 
}

// Populate dropdowns
function populateDropdowns() {
    const continentSelect = document.getElementById('continent');
    if (continentSelect) {
        Object.keys(coffeeData.countries_by_continent).forEach(continent => {
            const option = document.createElement('option');
            option.value = continent;
            option.textContent = continent;
            continentSelect.appendChild(option);
        });
    }
    
    const dropdowns = [
        { id: 'altitude', data: coffeeData.altitudes },
        { id: 'variety', data: coffeeData.varieties },
        { id: 'processing', data: coffeeData.processing_methods },
        { id: 'roast-level', data: coffeeData.roast_levels }
    ];
    
    dropdowns.forEach(dropdown => {
        const select = document.getElementById(dropdown.id);
        if (select && dropdown.data) {
            dropdown.data.forEach(item => {
                const option = document.createElement('option');
                option.value = item;
                option.textContent = item;
                select.appendChild(option);
            });
        }
    });
    
    const grinderBrandSelect = document.getElementById('grinder-brand');
    if (grinderBrandSelect) {
        Object.keys(coffeeData.grinder_brands).forEach(brand => {
            const option = document.createElement('option');
            option.value = brand;
            option.textContent = brand;
            grinderBrandSelect.appendChild(option);
        });
    }
}

function updateCountryOptions() {
    const continentSelect = document.getElementById('continent');
    const countrySelect = document.getElementById('country');
    
    if (!continentSelect || !countrySelect) return;
    
    const selectedContinent = continentSelect.value;
    
    if (selectedContinent) {
        countrySelect.classList.remove('hidden');
        countrySelect.innerHTML = '<option value="">Select country...</option>';
        
        const countries = coffeeData.countries_by_continent[selectedContinent] || [];
        countries.forEach(country => {
            const option = document.createElement('option');
            option.value = country;
            option.textContent = country;
            countrySelect.appendChild(option);
        });
    } else {
        countrySelect.classList.add('hidden');
        countrySelect.innerHTML = '<option value="">First select a continent</option>';
    }
}

function populateMachineTypesGrid() {
    const grid = document.getElementById('machine-types-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    Object.entries(coffeeData.machine_types).forEach(([typeKey, typeData]) => {
        const card = document.createElement('div');
        card.className = 'machine-type-card';
        card.dataset.machineType = typeKey;
        
        const adjustmentText = typeData.adjustment > 0 ? `+${typeData.adjustment}` : `${typeData.adjustment}`;
        
        card.innerHTML = `
            <span class="machine-type-icon">${typeData.icon}</span>
            <h4>${typeData.name}</h4>
            <div class="machine-type-adjustment">Adjustment: ${adjustmentText}</div>
            <p class="machine-type-description">${typeData.description}</p>
            <p class="machine-type-examples"><strong>Examples:</strong> ${typeData.examples.join(', ')}</p>
        `;
        
        card.addEventListener('click', function() {
            document.querySelectorAll('.machine-type-card').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            extractionData.machineType = typeKey;
            showMachineSelection(typeKey);
        });
        
        grid.appendChild(card);
    });
}

function showMachineSelection(machineType) {
    const selectionDiv = document.getElementById('machine-selection');
    const machineInfo = document.getElementById('machine-info');
    
    if (!selectionDiv) return;
    
    selectionDiv.classList.remove('hidden');
    
    const brandSelect = document.getElementById('machine-brand');
    if (brandSelect) {
        brandSelect.innerHTML = '<option value="">Select brand...</option>';
        
        const machines = coffeeData.espresso_machines_by_type[machineType] || {};
        Object.keys(machines).forEach(brand => {
            const option = document.createElement('option');
            option.value = brand;
            option.textContent = brand;
            brandSelect.appendChild(option);
        });
    }
    
    const typeData = coffeeData.machine_types[machineType];
    if (typeData && machineInfo) {
        const typeName = document.getElementById('machine-type-name');
        const adjustment = document.getElementById('machine-adjustment');
        const description = document.getElementById('machine-description');
        
        if (typeName) typeName.textContent = typeData.name;
        if (adjustment) adjustment.textContent = `+${typeData.adjustment}`;
        if (description) description.textContent = typeData.description;
        
        machineInfo.classList.remove('hidden');
    }
    
    updateTemperatureSuggestion();
}

function updateGrinderModels() {
    const brand = document.getElementById('grinder-brand').value;
    const modelSelect = document.getElementById('grinder-model');
    const grinderInfo = document.getElementById('grinder-info');
    
    if (!modelSelect) return;
    
    modelSelect.innerHTML = '<option value="">Select model...</option>';
    
    if (brand && coffeeData.grinder_brands[brand]) {
        coffeeData.grinder_brands[brand].forEach(model => {
            const option = document.createElement('option');
            option.value = model;
            option.textContent = model;
            modelSelect.appendChild(option);
        });
        
        modelSelect.addEventListener('change', function() {
            if (this.value) {
                extractionData.grinder = { brand, model: this.value };
                const precision = getGrinderPrecision(brand, this.value);
                const precisionEl = document.getElementById('grinder-precision');
                if (precisionEl) precisionEl.textContent = precision;
                if (grinderInfo) grinderInfo.classList.remove('hidden');
            } else {
                if (grinderInfo) grinderInfo.classList.add('hidden');
            }
        });
    } else {
        if (grinderInfo) grinderInfo.classList.add('hidden');
    }
}

function getGrinderPrecision(brand, model) {
    const grinderData = coffeeData.grinder_specifications[brand]?.[model];
    if (grinderData && grinderData.micron_per_step) {
        return `${grinderData.micron_per_step} micron/step`;
    }
    return '10-15 micron per step';
}

function updateMachineModels() {
    const brand = document.getElementById('machine-brand').value;
    const modelSelect = document.getElementById('machine-model');
    
    if (!modelSelect) return;
    
    modelSelect.innerHTML = '<option value="">Select model...</option>';
    
    if (brand && extractionData.machineType) {
        const machines = coffeeData.espresso_machines_by_type[extractionData.machineType];
        const models = machines?.[brand] || ['Standard', 'Pro', 'Premium'];
        
        models.forEach(model => {
            const option = document.createElement('option');
            option.value = model;
            option.textContent = model;
            modelSelect.appendChild(option);
        });
        
        modelSelect.addEventListener('change', function() {
            if (this.value) {
                extractionData.machine = { brand, model: this.value };
            }
        });
    }
}

function setupSliders() {
    const coffeeSlider = document.getElementById('coffee-grams');
    const liquidSlider = document.getElementById('liquid-grams');
    
    if (coffeeSlider) {
        coffeeSlider.addEventListener('input', updateDoseValues);
    }
    if (liquidSlider) {
        liquidSlider.addEventListener('input', updateDoseValues);
    }
}

function updateDoseSliders() {
    updateDoseValues();
    updateSelectedInfo();
}

function updateDoseValues() {
    const coffeeGrams = parseFloat(document.getElementById('coffee-grams')?.value || 18);
    const liquidGrams = parseInt(document.getElementById('liquid-grams')?.value || 36);
    
    const coffeeValue = document.getElementById('coffee-grams-value');
    const liquidValue = document.getElementById('liquid-grams-value');
    const ratioDisplay = document.getElementById('calculated-ratio');
    const ratioDescription = document.getElementById('ratio-description');
    
    if (coffeeValue) coffeeValue.textContent = coffeeGrams;
    if (liquidValue) liquidValue.textContent = liquidGrams;
    
    const ratio = (liquidGrams / coffeeGrams).toFixed(1);
    if (ratioDisplay) ratioDisplay.textContent = `1:${ratio}`;
    
    const ratioFloat = parseFloat(ratio);
    let description;
    if (ratioFloat < 1.8) {
        description = 'Very concentrated - ristretto style';
    } else if (ratioFloat < 2.2) {
        description = 'Perfect espresso ratio';
    } else if (ratioFloat < 3.0) {
        description = 'Lungo style - more diluted';
    } else {
        description = 'Very diluted extraction';
    }
    
    if (ratioDescription) ratioDescription.textContent = description;
    
    extractionData.dose.coffee = coffeeGrams;
    extractionData.dose.liquid = liquidGrams;
}

function updateSelectedInfo() {
    const selectedMethod = document.getElementById('selected-method-name');
    if (selectedMethod) selectedMethod.textContent = extractionData.method;
}

function calculateOptimalTemperature() {
    const coffee = extractionData.coffee;
    const roast = coffee.roastLevel || 'Medium Roast';
    const processing = coffee.processing || 'Washed';
    
    let tempKey = `${roast} + ${processing}`;
    
    if (coffeeData.temperature_matrix[tempKey]) {
        return coffeeData.temperature_matrix[tempKey];
    }
    
    if (roast.includes('Light')) {
        if (processing.includes('Natural') || processing.includes('Anaerobic')) {
            return 95;
        }
        return 96;
    } else if (roast.includes('Medium-Dark') || roast.includes('Dark')) {
        return 93;
    } else {
        return 94;
    }
}

function updateTemperatureSuggestion() {
    const suggestedTemp = calculateOptimalTemperature();
    
    const tempSuggestion = document.getElementById('temp-suggestion');
    const waterTemp = document.getElementById('water-temperature');
    
    if (tempSuggestion) tempSuggestion.textContent = `Suggested: ${suggestedTemp}°C`;
    if (waterTemp) waterTemp.value = suggestedTemp;
    
    extractionData.temperature = suggestedTemp;
}

function calculateGrindSetting() {
    const grinder = extractionData.grinder;
    const coffee = extractionData.coffee;
    const machineType = extractionData.machineType;
    
    if (!grinder.brand || !grinder.model) {
        return { setting: 'N/A', unit: '', targetMicrons: 250, warning: 'Select a grinder' };
    }
    
    const grinderData = coffeeData.grinder_specifications[grinder.brand]?.[grinder.model];
    if (!grinderData) {
        return { setting: 'N/A', unit: '', targetMicrons: 250, warning: 'Grinder not supported in database' };
    }
    
    let baseSetting = grinderData.espresso_base;
    let totalAdjustment = 0;
    
    const altitudeNum = parseInt(coffee.altitude?.replace('m', '') || '1000');
    if (altitudeNum >= 600 && altitudeNum < 1000) {
        totalAdjustment += coffeeData.calculation_factors.altitude['600-1000m'];
    } else if (altitudeNum >= 1000 && altitudeNum <= 1500) {
        totalAdjustment += coffeeData.calculation_factors.altitude['1000-1500m'];
    } else if (altitudeNum > 1500 && altitudeNum < 2000) {
        totalAdjustment += coffeeData.calculation_factors.altitude['1500-2000m'];
    } else if (altitudeNum >= 2000) {
        totalAdjustment += coffeeData.calculation_factors.altitude['2000m+'];
    }
    
    const processingFactor = coffeeData.calculation_factors.processing[coffee.processing] || 0;
    totalAdjustment += processingFactor;
    
    const roastFactor = coffeeData.calculation_factors.roast_level[coffee.roastLevel] || 0;
    totalAdjustment += roastFactor;
    
    const varietyFactor = coffeeData.calculation_factors.variety[coffee.variety] || 0;
    totalAdjustment += varietyFactor;
    
    let machineAdjustment = 0;
    if (machineType && coffeeData.machine_types[machineType]) {
        machineAdjustment = coffeeData.machine_types[machineType].adjustment;
        totalAdjustment += machineAdjustment;
    }
    
    let finalSetting = baseSetting + totalAdjustment;
    
    const [minRange, maxRange] = grinderData.espresso_range || [0, 10];
    let warning = '';
    
    if (finalSetting < minRange) {
        finalSetting = minRange;
        warning = 'Grind setting at minimum limit';
    } else if (finalSetting > maxRange) {
        finalSetting = maxRange;
        warning = 'Grind setting at maximum limit';
    }
    
    if (grinderData.unit === '') {
        finalSetting = Math.round(finalSetting * 10) / 10;
    } else {
        finalSetting = Math.round(finalSetting);
    }
    
    const targetMicrons = Math.round(250 + (finalSetting - grinderData.espresso_base) * 50);
    
    return {
        setting: finalSetting,
        unit: grinderData.unit,
        targetMicrons: targetMicrons,
        warning: warning,
        range: grinderData.espresso_range || [0, 10],
        machineAdjustment: machineAdjustment
    };
}

function generateFinalSuggestion() {
    const grinder = extractionData.grinder;
    const coffee = extractionData.coffee;
    const machineType = extractionData.machineType;
    
    const grindResult = calculateGrindSetting();
    const optimalTemp = calculateOptimalTemperature();
    
    const finalGrinderBrand = document.getElementById('final-grinder-brand');
    const finalGrinderModel = document.getElementById('final-grinder-model');
    const suggestedClickEl = document.getElementById('suggested-click');
    const targetMicronsEl = document.getElementById('target-microns');
    
    if (finalGrinderBrand) finalGrinderBrand.textContent = grinder.brand || 'Your';
    if (finalGrinderModel) finalGrinderModel.textContent = grinder.model || 'grinder';
    
    if (suggestedClickEl) {
        const settingText = grindResult.unit ? 
            `${grindResult.setting}${grindResult.unit}` : 
            `${grindResult.setting}`;
        suggestedClickEl.textContent = settingText;
    }
    
    if (targetMicronsEl) targetMicronsEl.textContent = grindResult.targetMicrons;
    
    const machineTypeData = coffeeData.machine_types[machineType];
    if (machineTypeData) {
        const finalMachineType = document.getElementById('final-machine-type');
        const finalMachineIcon = document.getElementById('final-machine-icon');
        const finalMachineAdjustment = document.getElementById('final-machine-adjustment');
        
        if (finalMachineType) finalMachineType.textContent = machineTypeData.name;
        if (finalMachineIcon) finalMachineIcon.textContent = machineTypeData.icon;
        if (finalMachineAdjustment) {
            const adj = machineTypeData.adjustment;
            finalMachineAdjustment.textContent = adj > 0 ? `+${adj}` : `${adj}`;
        }
    }
    
    extractionData.temperature = optimalTemp;
    
    const coffeeDesc = document.getElementById('coffee-description');
    const methodDesc = document.getElementById('method-description');
    const tempDesc = document.getElementById('temp-description');
    const calcExplanation = document.getElementById('calculation-explanation');
    
    if (coffeeDesc) {
        coffeeDesc.textContent = `${coffee.country || 'Unknown'} ${coffee.variety || ''} ${coffee.processing || ''} at ${coffee.altitude || '1000m'}`;
    }
    if (methodDesc) {
        methodDesc.textContent = `${extractionData.method} with ${extractionData.dose.coffee}g coffee to ${extractionData.dose.liquid}g liquid`;
    }
    if (tempDesc) {
        tempDesc.textContent = `Temperature ${optimalTemp}°C`;
    }
    if (calcExplanation) {
        calcExplanation.textContent = `Algorithm calibrated: base ${grinder.brand || 'N/A'} + coffee factors + machine adjustment ${machineTypeData ? machineTypeData.adjustment : 0}`;
    }
    
    generateAllMachineResults();
    
    if (grindResult.warning) {
        const suggestionCard = document.querySelector('.suggestion-card');
        if (suggestionCard) {
            let warningDiv = suggestionCard.querySelector('.status--warning');
            if (!warningDiv) {
                warningDiv = document.createElement('div');
                warningDiv.className = 'status status--warning';
                suggestionCard.appendChild(warningDiv);
            }
            warningDiv.textContent = grindResult.warning;
        }
    }
}

function generateAllMachineResults() {
    const resultsGrid = document.getElementById('results-grid');
    if (!resultsGrid) return;
    
    resultsGrid.innerHTML = '';
    
    Object.entries(coffeeData.machine_types).forEach(([typeKey, typeData]) => {
        const originalMachineType = extractionData.machineType;
        extractionData.machineType = typeKey;
        const result = calculateGrindSetting();
        extractionData.machineType = originalMachineType;
        
        const resultCard = document.createElement('div');
        resultCard.className = 'result-card';
        
        const settingText = result.unit ? 
            `${result.setting}${result.unit}` : 
            `${result.setting}`;
        
        resultCard.innerHTML = `
            <h5>${typeData.icon} ${typeData.name}</h5>
            <p><strong>${settingText}</strong></p>
            <p>${result.targetMicrons} microns</p>
        `;
        
        resultsGrid.appendChild(resultCard);
    });
}

function validateCoffeeForm() {
    const requiredFields = ['continent', 'country', 'altitude', 'variety', 'processing', 'roast-date', 'roast-level'];
    let valid = true;
    
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field && !field.value) {
            field.style.borderColor = 'var(--color-error)';
            valid = false;
        } else if (field) {
            field.style.borderColor = '';
        }
    });
    
    if (!valid) {
        alert('Please fill in all required fields');
    }
    
    return valid;
}

function updateStarRating(rating) {
    const stars = document.querySelectorAll('.star');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

function populateArchive() {
    const extractionsList = document.getElementById('extractions-list');
    if (!extractionsList) return;
    
    const sampleExtraction = {
        coffee: { country: 'Costa Rica', variety: 'Pacamara', processing: 'Anaerobic Fermentation', altitude: '1500m' },
        method: 'Espresso',
        machineType: 'manual_lever',
        machine: { brand: 'Flair', model: '58' },
        grinder: { brand: 'Varia', model: 'VS3 Gen 1' },
        dose: { coffee: 18, liquid: 36 },
        evaluation: { rating: 5, notes: 'Perfect! Algorithm calibrated correctly with Flair 58 at 4.3' },
        timestamp: new Date().toISOString()
    };
    
    extractionsList.innerHTML = '';
    
    const card = document.createElement('div');
    card.className = 'extraction-card';
    
    const date = new Date(sampleExtraction.timestamp).toLocaleDateString('en-US');
    const stars = '⭐'.repeat(sampleExtraction.evaluation?.rating || 3);
    const machineIcon = coffeeData.machine_types[sampleExtraction.machineType]?.icon || '⚡';
    
    card.innerHTML = `
        <div class="extraction-header">
            <h5 class="extraction-title">${machineIcon} ${sampleExtraction.coffee?.country || 'Coffee'} - ${sampleExtraction.method}</h5>
            <span class="extraction-date">${date}</span>
        </div>
        <div class="extraction-details">
            <span class="extraction-tag">${sampleExtraction.dose?.coffee || 18}g → ${sampleExtraction.dose?.liquid || 36}g</span>
            <span class="extraction-tag">${sampleExtraction.coffee?.variety || 'N/A'}</span>
            <span class="extraction-tag">${sampleExtraction.machine?.brand} ${sampleExtraction.machine?.model}</span>
            <span class="extraction-tag">${stars}</span>
        </div>
        ${sampleExtraction.evaluation?.notes ? `<p class="extraction-notes">"${sampleExtraction.evaluation.notes}"</p>` : ''}
    `;
    
    card.addEventListener('click', function() {
        if (confirm('Would you like to repeat this extraction?')) {
            extractionData = {...sampleExtraction};
            extractionData.timestamp = null;
            showMachineScreen();
        }
    });
    
    extractionsList.appendChild(card);
}

function saveAndArchive() {
    extractionData.timestamp = new Date().toISOString();
    const notesField = document.getElementById('evaluation-notes');
    if (notesField) {
        extractionData.evaluation.notes = notesField.value;
    }
    
    alert('Extraction saved to archive!');
    showMainScreen();
}

// FIXED EVENT LISTENERS
function setupEventListeners() {
    console.log('Setting up event listeners...');
    
    // Main navigation buttons
    const startBtn = document.getElementById('start-button');
    if (startBtn) {
        startBtn.onclick = function(e) {
            e.preventDefault();
            console.log('START button clicked');
            showMainScreen();
        };
    }

    const newExtractionBtn = document.getElementById('new-extraction-btn');
    if (newExtractionBtn) {
        newExtractionBtn.onclick = function(e) {
            e.preventDefault();
            console.log('New Extraction button clicked');
            showCoffeeDataScreen();
        };
    }

    const archiveBtn = document.getElementById('archive-btn');
    if (archiveBtn) {
        archiveBtn.onclick = function(e) {
            e.preventDefault();
            showArchiveScreen();
        };
    }

    // All other navigation buttons
    const buttons = {
        'coffee-back-btn': showMainScreen,
        'coffee-next-btn': function() {
            if (validateCoffeeForm()) {
                extractionData.coffee = {
                    continent: document.getElementById('continent').value,
                    country: document.getElementById('country').value,
                    altitude: document.getElementById('altitude').value,
                    variety: document.getElementById('variety').value,
                    processing: document.getElementById('processing').value,
                    roastDate: document.getElementById('roast-date').value,
                    roastLevel: document.getElementById('roast-level').value
                };
                showMachineScreen();
            }
        },
        'machine-back-btn': showCoffeeDataScreen,
        'machine-next-btn': function() {
            if (!extractionData.machineType) {
                alert('Please select a machine type');
                return;
            }
            showGrinderScreen();
        },
        'grinder-back-btn': showMachineScreen,
        'grinder-next-btn': function() {
            if (!extractionData.grinder.brand || !extractionData.grinder.model) {
                alert('Please select your grinder');
                return;
            }
            showDoseCustomizationScreen();
        },
        'dose-back-btn': showGrinderScreen,
        'dose-next-btn': showFinalSuggestionScreen,
        'final-back-btn': showDoseCustomizationScreen,
        'final-next-btn': showEvaluationScreen,
        'evaluation-back-btn': showFinalSuggestionScreen,
        'save-archive-btn': saveAndArchive,
        'archive-new-btn': showMainScreen
    };

    Object.entries(buttons).forEach(([id, handler]) => {
        const btn = document.getElementById(id);
        if (btn) {
            btn.onclick = function(e) {
                e.preventDefault();
                handler();
            };
        }
    });

    // Form submission
    const coffeeForm = document.getElementById('coffee-form');
    if (coffeeForm) {
        coffeeForm.onsubmit = function(e) {
            e.preventDefault();
            buttons['coffee-next-btn']();
        };
    }

    // Change listeners
    const continentSelect = document.getElementById('continent');
    if (continentSelect) {
        continentSelect.onchange = updateCountryOptions;
    }

    const grinderBrandSelect = document.getElementById('grinder-brand');
    if (grinderBrandSelect) {
        grinderBrandSelect.onchange = updateGrinderModels;
    }

    const machineBrandSelect = document.getElementById('machine-brand');
    if (machineBrandSelect) {
        machineBrandSelect.onchange = updateMachineModels;
    }

    // Slider listeners
    const coffeeSlider = document.getElementById('coffee-grams');
    const liquidSlider = document.getElementById('liquid-grams');
    
    if (coffeeSlider) coffeeSlider.oninput = updateDoseValues;
    if (liquidSlider) liquidSlider.oninput = updateDoseValues;

    console.log('Event listeners setup complete');
}

function initializeApp() {
    console.log('Initializing Coffee Precision app...');
    
    populateDropdowns();
    setupSliders();
    showScreen('screen-initial');
    
    const today = new Date().toISOString().split('T')[0];
    const roastDateInput = document.getElementById('roast-date');
    if (roastDateInput) {
        roastDateInput.value = today;
    }
    
    setupEventListeners();
    
    console.log('App initialization complete');
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - starting app...');
    initializeApp();
});