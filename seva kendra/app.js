// AngularJS Application Config & Logic
var app = angular.module('sevaKendraApp', ['ngRoute']);

// Routing configuration
app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/home.html',
      controller: 'HomeController'
    })
    .when('/about', {
      templateUrl: 'views/about.html'
    })
    .when('/products', {
      templateUrl: 'views/products.html',
      controller: 'ProductsController'
    })
    .when('/advisory', {
      templateUrl: 'views/advisory.html',
      controller: 'AdvisoryController'
    })
    .when('/contact', {
      templateUrl: 'views/contact.html',
      controller: 'ContactController'
    })
    .when('/admin', {
      templateUrl: 'views/admin.html',
      controller: 'AdminController'
    })
    .otherwise({
      redirectTo: '/'
    });
    
  $locationProvider.hashPrefix('');
}]);

// Centralized Shop Data Service Store with LocalStorage Persistence
app.factory('ShopDataService', function() {
  var STORAGE_KEY_SHOP = 'seva_kendra_shop_info_v2';
  var STORAGE_KEY_PRODS = 'seva_kendra_products_v2';
  var STORAGE_KEY_RATES = 'seva_kendra_market_rates_v2';
  var STORAGE_KEY_ENQUIRIES = 'seva_kendra_enquiries_v2';
  var STORAGE_KEY_PIN = 'seva_kendra_admin_pin_v2';

  // Factory Default Data
  var defaultShopInfo = {
    shopNameEn: "Shree Dharidevar",
    shopNameKn: "ಶ್ರೀ ಧರಿದೇವರ",
    subEn: "Raith Krushi Seva Kendra",
    subKn: "ರೈತ ಕೃಷಿ ಸೇವಾ ಕೇಂದ್ರ",
    phone: "07090080289",
    email: "support@raithseva.com",
    addressEn: "Near Busstand Jatta, Kanamadi, Main Rd, Karnataka 586114",
    addressKn: "ಬಸ್ ನಿಲ್ದಾಣದ ಹತ್ತಿರ ಜತ್ತಾ, ಕನಮಡಿ, ಮುಖ್ಯ ರಸ್ತೆ, ಕರ್ನಾಟಕ ೫೮೬೧೧೪",
    hours: "Mon - Sun: 8:00 AM - 8:00 PM",
    isClosed: true, // Physical store status toggle
    noticeEn: "Our physical store at Kanamadi is temporarily closed for off-season renovation, but our B2B online booking, grape/pomegranate advisory, and crop helpline are fully active!",
    noticeKn: "ಕನಮಡಿಯ ನಮ್ಮ ಭೌತಿಕ ಅಂಗಡಿಯು ತಾತ್ಕಾಲಿಕವಾಗಿ ಮುಚ್ಚಲ್ಪಟ್ಟಿದೆ, ಆದರೆ ನಮ್ಮ ಬಿ2ಬಿ ಬುಕಿಂಗ್, ದ್ರಾಕ್ಷಿ/ದಾಳಿಂಬೆ ಕೃಷಿ ಸಲಹಾ ಮತ್ತು ಪೋರ್ಟಲ್ ಸಂಪೂರ್ಣವಾಗಿ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತಿವೆ!"
  };

  var defaultProducts = [
    {
      id: 1,
      name: "Bhagwa Pomegranate Certified Saplings (Tissue Culture)",
      category: "FRUIT",
      desc: "High yield, glossy ruby-red arils, drought resistant. Selected strain specifically propagated for Vijayapura-Kanamadi soil profile.",
      packaging: "Bundle of 100 Saplings",
      compatibility: "Light loamy & black well-drained soil.",
      usage: "Plant at 14x10 ft spacing (400 plants/acre). Apply 10kg FYM + 250g organic neem cake per pit during planting.",
      img: "images/fruit-category.png",
      badge: "Horticulture Special"
    },
    {
      id: 2,
      name: "Dog Ridge Grape Rootstock Cuttings & Manik Chaman Grafts",
      category: "FRUIT",
      desc: "Salinity-tolerant Dog Ridge rootstock grafted with Manik Chaman / Sonaka seedless grape scions. Heavy bearing & berry uniformity.",
      packaging: "Bundle of 50 Grafts",
      compatibility: "Table grape vineyard orchards.",
      usage: "Plant rootstocks at 10x6 ft spacing. Follow April back pruning and October forward pruning fertigation charts.",
      img: "images/fruit-category.png",
      badge: "Grapes Special"
    },
    {
      id: 3,
      name: "GA3 Gibberellic Acid Growth Promoter (for Grapes)",
      category: "FRUIT",
      desc: "Premium plant growth regulator designed for grape berry elongation, cluster loosening, and uniform fruit sizing.",
      packaging: "1 Gram Sachet x 10",
      compatibility: "Grapes, Pomegranate, Tomatoes, Sugarcane.",
      usage: "Dissolve 1g GA3 in 100 Litres water. Spray during 3-4mm berry stage and repeat at 6-7mm stage.",
      img: "images/fruit-category.png",
      badge: "Yield Booster"
    },
    {
      id: 4,
      name: "Pomegranate Fruit Cracking & Color Special Micronutrient",
      category: "FRUIT",
      desc: "Scientific formulation of Boron, Calcium, Zinc & Amino Acids. Prevents rind splitting in Pomegranates and enhances fruit shine.",
      packaging: "1 kg Pack",
      compatibility: "Pomegranate, Grapes, Citrus fruits.",
      usage: "Foliar spray 2.5g per litre water during fruit development stage (60 and 90 days after fruit set).",
      img: "images/fertilizers-category.png",
      badge: "Quality Protection"
    },
    {
      id: 5,
      name: "Mahyco Certified Hybrid Cotton Seeds",
      category: "SEEDS",
      desc: "High yield, bollworm resistant BT cotton seeds. Highly compatible with Karnataka local black cotton soils. Strong germination profile.",
      packaging: "450 Grams",
      compatibility: "Sugarcane intercrop, primary cotton farming.",
      usage: "Sow at 2-3 cm depth. Space rows 90cm apart and plants 45-60cm apart. Maintain damp soil during germination.",
      img: "images/seeds-category.png",
      badge: "Best Seller"
    },
    {
      id: 6,
      name: "Kavery Super-60 Maize Seeds",
      category: "SEEDS",
      desc: "Double cross hybrid maize seeds with high cob size. Drought tolerant and resists lodging. Perfect for rainfed farming.",
      packaging: "4 kg Bag",
      compatibility: "Grown in red, loam, and well-drained sandy-clay soils.",
      usage: "Sowing rate is 8kg per acre. Sow with nitrogen rich starter fertilizers like NPK 19-19-19.",
      img: "images/seeds-category.png"
    },
    {
      id: 7,
      name: "Dharidevar Premium Jowar Seeds",
      category: "SEEDS",
      desc: "Premium locally selected Sorghum (Jowar) seeds. Drought resistant with excellent grain and fodder yields. Ideal for Rabi season.",
      packaging: "5 kg Bag",
      compatibility: "Grows well in dry clay soils.",
      usage: "Sow using seed drill. Needs single primary irrigation during heading stage.",
      img: "images/seeds-category.png",
      badge: "Local Premium"
    },
    {
      id: 8,
      name: "Organic Neem Cake Fertilizer",
      category: "FERT",
      desc: "100% natural organic soil enrichment. Rich in Nitrogen, Phosphorus, and Potassium. Natural nematicide properties.",
      packaging: "50 kg Bag",
      compatibility: "All cash crops, vegetables, Grapes & Pomegranate orchards.",
      usage: "Mix with soil during initial land preparation at the rate of 100kg-200kg per acre.",
      img: "images/fertilizers-category.png",
      badge: "Organic Certified"
    },
    {
      id: 9,
      name: "Premium NPK 19-19-19 (Water Soluble)",
      category: "FERT",
      desc: "Fully water-soluble fertilizer containing balanced primary crop nutrients (N, P, K). Rapid vegetative growth promoter.",
      packaging: "25 kg Sack",
      compatibility: "Sugarcane, Cotton, Grapes, Pomegranate, Drip irrigated crops.",
      usage: "Apply via drip irrigation system at 5-10kg per acre, or spray solution during early vegetative phase.",
      img: "images/fertilizers-category.png"
    },
    {
      id: 10,
      name: "Bio-Phosphorous Solubilizing Liquid (PSB)",
      category: "FERT",
      desc: "Ecofriendly bio-fertilizer. Contains active bacterial strains that mobilize fixed soil phosphorus, improving root development.",
      packaging: "1 Litre Bottle",
      compatibility: "Soil treatment and seed treatment for all crops.",
      usage: "Mix 1 Litre PSB with 200 Litres water and apply near the crop root zone per acre.",
      img: "images/fertilizers-category.png"
    },
    {
      id: 11,
      name: "Bio-Insecticide Neem Oil Concentrate",
      category: "PROT",
      desc: "Pure cold-pressed neem oil rich in Azadirachtin. Controls sucking pests, thrips, and mites organically without chemical residues.",
      packaging: "500 ml Bottle",
      compatibility: "Grapes, Pomegranate, Cotton, Sugarcane, Chilli.",
      usage: "Dilute 5ml neem oil with 1 Litre water, add 1-2 drops of liquid soap, and spray foliage uniformly.",
      img: "images/equipment-category.png",
      badge: "Eco-Friendly"
    },
    {
      id: 12,
      name: "Knapsack Battery Sprayer (16 Litres)",
      category: "EQUIP",
      desc: "Double motor electric sprayer. Long battery life of 6-8 hours. Ergonomic shoulder strap design for comfortable orchard spraying.",
      packaging: "1 Box",
      compatibility: "Foliar sprays of organic fertilizers and bio-pesticides.",
      usage: "Charge battery fully before use. Flush container with clean water after spraying chemical inputs.",
      img: "images/equipment-category.png"
    }
  ];

  var defaultMarketRates = [
    { name: "Pomegranate (ದಾಳಿಂಬೆ - Bhagwa)", price: "₹ 12,500 / Quintal", trend: "up", val: "+₹450" },
    { name: "Grapes (ದ್ರಾಕ್ಷಿ - Sonaka/Thomson)", price: "₹ 8,500 / Quintal", trend: "up", val: "+₹300" },
    { name: "Cotton (ಹತ್ತಿ - Kapas)", price: "₹ 7,350 / Quintal", trend: "up", val: "+₹110" },
    { name: "Maize (ಮೆಕ್ಕೆಜೋಳ)", price: "₹ 2,210 / Quintal", trend: "up", val: "+₹30" },
    { name: "Jowar (ಬಿಳಿ ಜೋಳ)", price: "₹ 3,450 / Quintal", trend: "down", val: "-₹20" },
    { name: "Sugarcane (ಕಬ್ಬು)", price: "₹ 315 / Ton", trend: "flat", val: "0" }
  ];

  var defaultEnquiries = [
    {
      name: "Basavaraj Patil",
      phone: "9845012345",
      message: "Need 400 Bhagwa pomegranate saplings and drip fertilizer chart for 2 acres in Kanamadi.",
      date: "12 Aug 2026",
      status: "Followed Up"
    },
    {
      name: "Suresh Biradar",
      phone: "9731298765",
      message: "Inquiring wholesale prices for 50 bags of Organic Neem Cake and NPK 19-19-19 for grape orchard.",
      date: "12 Aug 2026",
      status: "Pending"
    }
  ];

  // Helper functions
  function getStored(key, fallback) {
    try {
      var data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function setStored(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {}
  }

  return {
    getShopInfo: function() { return getStored(STORAGE_KEY_SHOP, defaultShopInfo); },
    saveShopInfo: function(data) { setStored(STORAGE_KEY_SHOP, data); },

    getProducts: function() { return getStored(STORAGE_KEY_PRODS, defaultProducts); },
    saveProducts: function(data) { setStored(STORAGE_KEY_PRODS, data); },

    getMarketRates: function() { return getStored(STORAGE_KEY_RATES, defaultMarketRates); },
    saveMarketRates: function(data) { setStored(STORAGE_KEY_RATES, data); },

    getEnquiries: function() { return getStored(STORAGE_KEY_ENQUIRIES, defaultEnquiries); },
    saveEnquiries: function(data) { setStored(STORAGE_KEY_ENQUIRIES, data); },

    getAdminPin: function() {
      var stored = localStorage.getItem(STORAGE_KEY_PIN);
      return stored ? stored : 'bairav@204';
    },
    saveAdminPin: function(pin) { localStorage.setItem(STORAGE_KEY_PIN, pin); },

    resetDefaults: function() {
      localStorage.removeItem(STORAGE_KEY_SHOP);
      localStorage.removeItem(STORAGE_KEY_PRODS);
      localStorage.removeItem(STORAGE_KEY_RATES);
      localStorage.removeItem(STORAGE_KEY_ENQUIRIES);
      localStorage.removeItem(STORAGE_KEY_PIN);
    },

    // Force clear any old PIN so bairav@204 takes effect immediately
    clearOldPin: function() {
      var stored = localStorage.getItem(STORAGE_KEY_PIN);
      if (stored && stored !== 'bairav@204') {
        localStorage.removeItem(STORAGE_KEY_PIN);
      }
    }
  };
});

// Global Translation Dictionary
app.constant('TRANSLATIONS', {
  en: {
    // Navigation
    BRAND_NAME: "Shree Dharidevar",
    BRAND_SUB: "Raith Krushi Seva Kendra",
    NAV_HOME: "Home",
    NAV_ABOUT: "About Us",
    NAV_PRODUCTS: "Products",
    NAV_ADVISORY: "Farm Advisory",
    NAV_CONTACT: "Contact Us",
    NAV_ADMIN: "Admin Portal",
    
    // Status
    TEMP_CLOSED: "Physical Store Temporarily Closed",
    TEMP_CLOSED_DESC: "Our physical store at Kanamadi is temporarily closed for off-season renovation, but our B2B online booking, grape/pomegranate advisory, and crop helpline are fully active!",
    CALL_US: "Call Us Now",
    
    // Home View
    HERO_BADGE: "Farmer Centric B2B & Horticulture Service",
    HERO_TITLE_PRE: "Empowering Farmers with",
    HERO_TITLE_SPAN: "Quality Agri-Inputs & Fruit Advisory",
    HERO_DESC: "Welcome to Shree Dharidevar Raith Krushi Seva Kendra. We supply high-yield seeds, certified Grapes & Pomegranate saplings, bio-fertilizers, and eco-friendly crop protection directly to farmers of Kanamadi and regional distributors.",
    HERO_CTA_PRIMARY: "Get Farm Advisory",
    HERO_CTA_SECONDARY: "Browse Products",
    
    WEATHER_TITLE: "Local Weather",
    WEATHER_LOC: "Kanamadi, Karnataka",
    WEATHER_DESC: "Optimal conditions for Grapes pruning & Pomegranate Bahar management",
    MARKET_TITLE: "Local Mandi Rates",
    MARKET_UNIT: "Per Quintal / Ton",
    MARKET_POMEGRANATE: "Pomegranate (Bhagwa)",
    MARKET_GRAPES: "Grapes (Sonaka/Thomson)",
    MARKET_COTTON: "Cotton (Kapas)",
    MARKET_MAIZE: "Maize (Corn)",
    MARKET_JOWAR: "Jowar (Sorghum)",
    MARKET_SUGARCANE: "Sugarcane",
    
    STATS_FARMERS: "12,000+",
    STATS_FARMERS_LABEL: "Farmers Served",
    STATS_YEARS: "10+",
    STATS_YEARS_LABEL: "Years of Trust",
    STATS_VILLAGES: "45+",
    STATS_VILLAGES_LABEL: "Villages Covered",
    STATS_SATISFACTION: "99%",
    STATS_SATISFACTION_LABEL: "Satisfaction Rate",
    
    FEATURES_TITLE: "Our Specialized Services",
    FEATURES_SUB: "Designed to help farmers achieve maximum yield in Grapes, Pomegranate, Cotton, and Field Crops",
    FEAT1_TITLE: "Fruit Saplings & Input Supplies",
    FEAT1_DESC: "Direct supply of tissue culture Bhagwa Pomegranate saplings, Dog Ridge Grape rootstocks, high-germination seeds, and organic fertilizers.",
    FEAT2_TITLE: "Soil Testing & Horti-Consulting",
    FEAT2_DESC: "Scientific analysis of soil health, pH balance, and fertigation schedules for vineyards and fruit orchards.",
    FEAT3_TITLE: "B2B Bulk Distribution",
    FEAT3_DESC: "Bulk orders and door-step delivery options for cooperative farming societies, orchard growers, and sub-retailers.",
    
    CTA_TITLE: "Need Expert Agricultural & Fruit Advice?",
    CTA_DESC: "Use our interactive seed, fertilizer & fruit sapling calculator tool or get in touch with our experts for custom solutions.",
    CTA_BTN: "Calculate Crop & Fertilizer Dose",
    
    // About View
    ABOUT_TITLE: "Who We Are",
    ABOUT_DESC_1: "Shree Dharidevar Raith Krushi Seva Kendra was founded with a singular mission: to make premium quality agricultural inputs, fruit saplings, and scientific farming advice accessible to the hardworking farmers of Kanamadi and surrounding Vijayapura regions in Karnataka.",
    ABOUT_DESC_2: "We understand that horticulture and agriculture are the backbone of our regional economy. Therefore, we supply only government-certified products, high-quality Bhagwa pomegranate saplings, and Dog Ridge grape rootstocks. Though our physical store is temporarily closed for renovation, our commitment to supporting you via online advisory remains stronger than ever.",
    ABOUT_VAL_QUALITY_TITLE: "Guaranteed Quality",
    ABOUT_VAL_QUALITY_DESC: "We source seeds, saplings, and fertilizers from licensed research labs and verify certifications.",
    ABOUT_VAL_TRUST_TITLE: "Farmer First Approach",
    ABOUT_VAL_TRUST_DESC: "Our suggestions are based purely on scientific soil health, water quality, and crop requirements.",
    ABOUT_EST: "Established",
    
    // Products View
    PROD_TITLE: "Our Agricultural & Fruit Inputs Catalog",
    PROD_SEARCH_PLACEHOLDER: "Search grapes, pomegranate, seeds, fertilizers...",
    PROD_ALL: "All Products",
    PROD_SEEDS: "Seeds",
    PROD_FRUIT: "Fruit Crops & Saplings",
    PROD_FERT: "Fertilizers",
    PROD_PROT: "Crop Protection",
    PROD_EQUIP: "Equipment",
    PROD_PACK: "Packaging",
    PROD_DETAILS: "View Specifications",
    PROD_SPEC_TITLE: "Product Specifications",
    PROD_SPEC_COMP: "Compatible Crops",
    PROD_SPEC_USAGE: "Usage Guidelines",
    
    // Advisory View
    ADVISORY_TITLE: "Crop & Horticulture Calculator",
    ADVISORY_DESC: "Select your crop (including Grapes & Pomegranate), soil type, and land size to receive localized plant population, N-P-K recommendation, and organic manure guidelines.",
    FORM_CROP: "Select Crop / ಬೆಳೆ ಆಯ್ಕೆಮಾಡಿ",
    FORM_AREA: "Land Area (Acres)",
    FORM_SOIL: "Soil Type",
    FORM_CALC_BTN: "Calculate Recommendations",
    
    RESULT_TITLE: "Agronomic Recommendations for",
    RESULT_SEEDS: "Saplings / Seed Quantity Needed",
    RESULT_NPK: "N-P-K Recommendation",
    RESULT_MANURE: "Organic Manure Needed",
    RESULT_SOIL_ADVICE: "Soil & Water Specific Advice",
    
    CROP_DOC_TITLE: "Crop Doctor - Pest & Disease Advisory",
    CROP_DOC_DESC: "Solutions for common regional fruit & field crop ailments:",
    
    // Contact View
    CONTACT_TITLE: "Get In Touch",
    CONTACT_DESC: "For orders, fruit sapling bookings, and consultation inquiries, reach out to us or submit the form below.",
    CONTACT_LOC: "Address",
    CONTACT_LOC_VAL: "Near Busstand Jatta, Kanamadi, Main Rd, Karnataka 586114",
    CONTACT_PHONE: "Phone Number",
    CONTACT_HOURS: "Business Hours",
    CONTACT_HOURS_VAL: "Mon - Sun: 8:00 AM - 8:00 PM",
    CONTACT_MAP_BTN: "Open in Google Maps",
    
    FORM_NAME: "Your Name",
    FORM_PHONE: "Your Phone Number",
    FORM_MSG: "Write Message / Query",
    FORM_SUBMIT: "Send Message",
    FORM_SUCCESS: "Thank you! Your enquiry has been received. Our shop representative will call you shortly.",
    FORM_ERROR: "Please fill out all the fields correctly."
  },
  
  kn: {
    // Navigation
    BRAND_NAME: "ಶ್ರೀ ಧರಿದೇವರ",
    BRAND_SUB: "ರೈತ ಕೃಷಿ ಸೇವಾ ಕೇಂದ್ರ",
    NAV_HOME: "ಮುಖಪುಟ",
    NAV_ABOUT: "ನಮ್ಮ ಬಗ್ಗೆ",
    NAV_PRODUCTS: "ಉತ್ಪನ್ನಗಳು",
    NAV_ADVISORY: "ಕೃಷಿ ಸಲಹೆಗಾರ",
    NAV_CONTACT: "ಸಂಪರ್ಕಿಸಿ",
    NAV_ADMIN: "ಆಡಳಿತ ಮಂಡಳಿ",
    
    // Status
    TEMP_CLOSED: "ಭೌತಿಕ ಅಂಗಡಿ ತಾತ್ಕಾಲಿಕವಾಗಿ ಮುಚ್ಚಲ್ಪಟ್ಟಿದೆ",
    TEMP_CLOSED_DESC: "ಕನಮಡಿಯ ನಮ್ಮ ಭೌತಿಕ ಅಂಗಡಿಯು ತಾತ್ಕಾಲಿಕವಾಗಿ ಮುಚ್ಚಲ್ಪಟ್ಟಿದೆ, ಆದರೆ ನಮ್ಮ ಬಿ2ಬಿ ಬುಕಿಂಗ್, ದ್ರಾಕ್ಷಿ/ದಾಳಿಂಬೆ ಕೃಷಿ ಸಲಹಾ ಮತ್ತು ಪೋರ್ಟಲ್ ಸಂಪೂರ್ಣವಾಗಿ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತಿವೆ!",
    CALL_US: "ಈಗಲೇ ಕರೆ ಮಾಡಿ",
    
    // Home View
    HERO_BADGE: "ರೈತ ಕೇಂದ್ರಿತ ಬಿ2ಬಿ ಮತ್ತು ತೋಟಗಾರಿಕೆ ಸೇವೆ",
    HERO_TITLE_PRE: "ರೈತರಿಗೆ ಒದಗಿಸುತ್ತಿದ್ದೇವೆ",
    HERO_TITLE_SPAN: "ಗುಣಮಟ್ಟದ ಪರಿಕರ ಮತ್ತು ಹಣ್ಣಿನ ಸಲಹೆ",
    HERO_DESC: "ಶ್ರೀ ಧರಿದೇವರ ರೈತ ಕೃಷಿ ಸೇವಾ ಕೇಂದ್ರಕ್ಕೆ ಸುಸ್ವಾಗತ. ನಾವು ಅಧಿಕ ಇಳುವರಿ ನೀಡುವ ಬೀಜಗಳು, ಪ್ರಮಾಣೀಕೃತ ದ್ರಾಕ್ಷಿ ಮತ್ತು ದಾಳಿಂಬೆ ಸಸಿಗಳು, ಜೈವಿಕ ಗೊಬ್ಬರ ಮತ್ತು ಕೀಟನಾಶಕಗಳನ್ನು ನೇರವಾಗಿ ಕನಮಡಿ ಸುತ್ತಮುತ್ತಲಿನ ರೈತರಿಗೆ ಪೂರೈಸುತ್ತೇವೆ.",
    HERO_CTA_PRIMARY: "ಕೃಷಿ ಸಲಹೆ ಪಡೆಯಿರಿ",
    HERO_CTA_SECONDARY: "ಉತ್ಪನ್ನಗಳನ್ನು ನೋಡಿ",
    
    WEATHER_TITLE: "ಸ್ಥಳೀಯ ಹವಾಮಾನ",
    WEATHER_LOC: "ಕನಮಡಿ, ಕರ್ನಾಟಕ",
    WEATHER_DESC: "ದ್ರಾಕ್ಷಿ ಛಂಗೋಲ ಮತ್ತು ದಾಳಿಂಬೆ ಬಹಾರ್ ನಿರ್ವಹಣೆಗೆ ಸೂಕ್ತ ಸಮಯ",
    MARKET_TITLE: "ಸ್ಥಳೀಯ ಮಾರುಕಟ್ಟೆ ದರ",
    MARKET_UNIT: "ಪ್ರತಿ ಕ್ವಿಂಟಾಲ್ / ಟನ್",
    MARKET_POMEGRANATE: "ದಾಳಿಂಬೆ (ಭಗವಾ)",
    MARKET_GRAPES: "ದ್ರಾಕ್ಷಿ (ಸೋನಾಕಾ/ಥಾಮ್ಸನ್)",
    MARKET_COTTON: "ಹತ್ತಿ (ಕಪಾಸ್)",
    MARKET_MAIZE: "ಮೆಕ್ಕೆಜೋಳ",
    MARKET_JOWAR: "ಬಿಳಿ ಜೋಳ",
    MARKET_SUGARCANE: "ಕಬ್ಬು",
    
    STATS_FARMERS: "೧೨,೦೦೦+",
    STATS_FARMERS_LABEL: "ಸೇವೆ ಪಡೆದ ರೈತರು",
    STATS_YEARS: "೧೦+ ವರ್ಷ",
    STATS_YEARS_LABEL: "ನಂಬಿಕೆಯ ವರ್ಷಗಳು",
    STATS_VILLAGES: "೪೫+",
    STATS_VILLAGES_LABEL: "ತಲುಪಿದ ಗ್ರಾಮಗಳು",
    STATS_SATISFACTION: "೯೯%",
    STATS_SATISFACTION_LABEL: "ತೃಪ್ತಿಯ ಪ್ರಮಾಣ",
    
    FEATURES_TITLE: "ನಮ್ಮ ವಿಶಿಷ್ಟ ಸೇವೆಗಳು",
    FEATURES_SUB: "ದ್ರಾಕ್ಷಿ, ದಾಳಿಂಬೆ, ಹತ್ತಿ ಮತ್ತು ಇತರ ಬೆಳೆಗಳಲ್ಲಿ ಗರಿಷ್ಠ ಇಳುವರಿ ಸಾಧಿಸಲು ವಿನ್ಯಾಸಗೊಳಿಸಲಾಗಿದೆ",
    FEAT1_TITLE: "ಹಣ್ಣಿನ ಸಸಿ ಮತ್ತು ಪರಿಕರ ಪೂರೈಕೆ",
    FEAT1_DESC: "ಪ್ರಮಾಣೀಕೃತ ದಾಳಿಂಬೆ ಭಗವಾ ಸಸಿಗಳು, ಡಾಗ್ ರಿಡ್ಜ್ ದ್ರಾಕ್ಷಿ ಸಸಿಗಳು, ಬೀಜಗಳು ಮತ್ತು ಸಾವಯವ ಗೊಬ್ಬರಗಳ ನೇರ ಪೂರೈಕೆ.",
    FEAT2_TITLE: "ಮಣ್ಣು ಪರೀಕ್ಷೆ ಮತ್ತು ಸಲಹೆ",
    FEAT2_DESC: "ಮಣ್ಣಿನ ಆರೋಗ್ಯ, ಪಿಹೆಚ್ (pH) ಸಮತೋಲನ ಮತ್ತು ದ್ರಾಕ್ಷಿ/ದಾಳಿಂಬೆ ತೋಟಗಳಿಗೆ ಹನಿ ನೀರಾವರಿ ರಸಗೊಬ್ಬರ ಶಿಫಾರಸು.",
    FEAT3_TITLE: "ಬಿ2ಬಿ ಸಗಟು ವಿತರಣೆ",
    FEAT3_DESC: "ರೈತ ಸಹಕಾರ ಸಂಘಗಳಿಗೆ ಮತ್ತು ಸ್ಥಳೀಯ ಉಪ-ಚಿಲ್ಲರೆ ವ್ಯಾಪಾರಿಗಳಿಗೆ ಸಗಟು ಆರ್ಡರ್ ಮತ್ತು ಮನೆಬಾಗಿಲಿಗೆ ಪೂರೈಕೆ ವ್ಯವಸ್ಥೆ.",
    
    CTA_TITLE: "ತಜ್ಞ ಕೃಷಿ ಮತ್ತು ಹಣ್ಣಿನ ಸಲಹೆ ಬೇಕೇ?",
    CTA_DESC: "ನಮ್ಮ ಸಂವಾದಾತ್ಮಕ ಬೀಜ, ರಸಗೊಬ್ಬರ ಮತ್ತು ಹಣ್ಣಿನ ಸಸಿ ಕ್ಯಾಲ್ಕುಲೇಟರ್ ಬಳಸಿ ಅಥವಾ ಕಸ್ಟಮ್ ಪರಿಹಾರಗಳಿಗಾಗಿ ನಮ್ಮ ತಜ್ಞರನ್ನು ಸಂಪರ್ಕಿಸಿ.",
    CTA_BTN: "ಬೆಳೆ ಮತ್ತು ಗೊಬ್ಬರ ಲೆಕ್ಕಾಚಾರ ಮಾಡಿ",
    
    // About View
    ABOUT_TITLE: "ನಮ್ಮ ಪರಿಚಯ",
    ABOUT_DESC_1: "ಕನಮಡಿ ಮತ್ತು ವಿಜಯಪುರ ಜಿಲ್ಲೆಯ ರೈತರಿಗೆ ಉತ್ತಮ ಗುಣಮಟ್ಟದ ಕೃಷಿ ಪರಿಕರಗಳು, ಹಣ್ಣಿನ ಸಸಿಗಳು ಮತ್ತು ವೈಜ್ಞಾನಿಕ ಕೃಷಿ ಸಲಹೆಗಳನ್ನು ಒದಗಿಸುವ ಏಕೈಕ ಉದ್ದೇಶದಿಂದ ಶ್ರೀ ಧರಿದೇವರ ರೈತ ಕೃಷಿ ಸೇವಾ ಕೇಂದ್ರವನ್ನು ಸ್ಥಾಪಿಸಲಾಯಿತು.",
    ABOUT_DESC_2: "ತೋಟಗಾರಿಕೆ ಮತ್ತು ಕೃಷಿಯು ನಮ್ಮ ಪ್ರದೇಶದ ಬೆನ್ನೆಲುಬು ಎಂಬುದನ್ನು ನಾವು ನಂಬುತ್ತೇವೆ. ಆದ್ದರಿಂದ, ನಾವು ಪ್ರಮಾಣೀಕೃತ ದಾಳಿಂಬೆ ಭಗವಾ ಸಸಿಗಳು ಮತ್ತು ಡಾಗ್ ರಿಡ್ಜ್ ದ್ರಾಕ್ಷಿ ಸಸಿಗಳನ್ನು ಒದಗಿಸುತ್ತೇವೆ. ನಮ್ಮ ಭೌತಿಕ ಅಂಗಡಿಯು ಪ್ರಸ್ತುತ ತಾತ್ಕಾಲಿಕವಾಗಿ ಮುಚ್ಚಲ್ಪಟ್ಟಿದ್ದರೂ, ಕೃಷಿ ಸಲಹೆ ಮುಖಾಂತರ ನಿಮ್ಮ ಸೇವೆಯಲ್ಲಿ ನಿರತರಾಗಿದ್ದೇವೆ.",
    ABOUT_VAL_QUALITY_TITLE: "ಖಾತರಿ ಗುಣಮಟ್ಟ",
    ABOUT_VAL_QUALITY_DESC: "ನಾವು ಪ್ರಮಾಣೀಕೃತ ತಯಾರಕರಿಂದ ಮಾತ್ರ ಬೀಜ, ಸಸಿ ಮತ್ತು ಗೊಬ್ಬರಗಳನ್ನು ಖರೀದಿಸುತ್ತೇವೆ.",
    ABOUT_VAL_TRUST_TITLE: "ರೈತರಿಗೆ ಮೊದಲ ಆದ್ಯತೆ",
    ABOUT_VAL_TRUST_DESC: "ನಮ್ಮ ಸಲಹೆಗಳು ಸಂಪೂರ್ಣವಾಗಿ ವೈಜ್ಞಾನಿಕ ಮಣ್ಣಿನ ಆರೋಗ್ಯ ಮತ್ತು ಬೆಳೆ ಅಗತ್ಯಗಳ ಮೇಲೆ ಆಧಾರಿತವಾಗಿವೆ.",
    ABOUT_EST: "ಸ್ಥಾಪನೆ",
    
    // Products View
    PROD_TITLE: "ನಮ್ಮ ಕೃಷಿ ಮತ್ತು ಹಣ್ಣಿನ ಬೆಳೆ ಉತ್ಪನ್ನಗಳು",
    PROD_SEARCH_PLACEHOLDER: "ದ್ರಾಕ್ಷಿ, ದಾಳಿಂಬೆ, ಬೀಜಗಳು, ಗೊಬ್ಬರಗಳನ್ನು ಹುಡುಕಿ...",
    PROD_ALL: "ಎಲ್ಲಾ ಉತ್ಪನ್ನಗಳು",
    PROD_SEEDS: "ಬಿತ್ತನೆ ಬೀಜಗಳು",
    PROD_FRUIT: "ಹಣ್ಣಿನ ಬೆಳೆಗಳು ಮತ್ತು ಸಸಿಗಳು",
    PROD_FERT: "ರಸಗೊಬ್ಬರಗಳು",
    PROD_PROT: "ಬೆಳೆ ಸಂರಕ್ಷಣೆ",
    PROD_EQUIP: "ಉಪಕರಣಗಳು",
    PROD_PACK: "ಪ್ಯಾಕೇಜಿಂಗ್",
    PROD_DETAILS: "ವಿವರಗಳನ್ನು ನೋಡಿ",
    PROD_SPEC_TITLE: "ಉತ್ಪನ್ನದ ವಿವರಗಳು",
    PROD_SPEC_COMP: "ಹೊಂದುವ ಬೆಳೆಗಳು",
    PROD_SPEC_USAGE: "ಬಳಕೆಯ ನಿಯಮಗಳು",
    
    // Advisory View
    ADVISORY_TITLE: "ಬೆಳೆ ಮತ್ತು ತೋಟಗಾರಿಕೆ ಕ್ಯಾಲ್ಕುಲೇಟರ್",
    ADVISORY_DESC: "ನಿಮ್ಮ ಬೆಳೆ (ದ್ರಾಕ್ಷಿ ಮತ್ತು ದಾಳಿಂಬೆ ಸೇರಿದಂತೆ), ಮಣ್ಣಿನ ಪ್ರಕಾರ ಮತ್ತು ಜಮೀನಿನ ವಿಸ್ತೀರ್ಣವನ್ನು ಆಯ್ಕೆಮಾಡಿ, ನಿಮ್ಮ ಜಮೀನಿಗೆ ಸೂಕ್ತವಾದ ಸಸಿಗಳ ಸಂಖ್ಯೆ, N-P-K ಗೊಬ್ಬರ ಮತ್ತು ಸಾವಯವ ಗೊಬ್ಬರದ ಶಿಫಾರಸನ್ನು ಪಡೆಯಿರಿ.",
    FORM_CROP: "ಬೆಳೆಯನ್ನು ಆರಿಸಿ",
    FORM_AREA: "ಜಮೀನಿನ ವಿಸ್ತೀರ್ಣ (ಎಕರೆಗಳಲ್ಲಿ)",
    FORM_SOIL: "ಮಣ್ಣಿನ ಪ್ರಕಾರ",
    FORM_CALC_BTN: "ಶಿಫಾರಸುಗಳನ್ನು ಲೆಕ್ಕಾಚಾರ ಮಾಡಿ",
    
    RESULT_TITLE: "ಕೃಷಿ ಶಿಫಾರಸುಗಳು - ಬೆಳೆ:",
    RESULT_SEEDS: "ಅಗತ್ಯವಿರುವ ಸಸಿಗಳು / ಬೀಜಗಳ ಪ್ರಮಾಣ",
    RESULT_NPK: "N-P-K ಗೊಬ್ಬರದ ಶಿಫಾರಸು",
    RESULT_MANURE: "ಅಗತ್ಯವಿರುವ ಸಾವಯವ ಗೊಬ್ಬರ",
    RESULT_SOIL_ADVICE: "ಮಣ್ಣು ಮತ್ತು ನೀರಾವರಿ ಸಲಹೆ",
    
    CROP_DOC_TITLE: "ಕ್ರಾಪ್ ಡಾಕ್ಟರ್ - ಬೆಳೆ ರೋಗ ಸಲಹೆಗಳು",
    CROP_DOC_DESC: "ಸ್ಥಳೀಯವಾಗಿ ಕಂಡುಬರುವ ಪ್ರಮುಖ ಬೆಳೆ ರೋಗಗಳು ಮತ್ತು ಪರಿಹಾರಗಳು:",
    
    // Contact View
    CONTACT_TITLE: "ಸಂಪರ್ಕಿಸಿ",
    CONTACT_DESC: "ಖರೀದಿ ಬುಕಿಂಗ್ ಮತ್ತು ಸಲಹೆಗಳಿಗಾಗಿ, ಕೆಳಗಿನ ವಿಳಾಸಕ್ಕೆ ಭೇಟಿ ನೀಡಿ ಅಥವಾ ಫೋನ್ ಮೂಲಕ ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ.",
    CONTACT_LOC: "ವಿಳಾಸ",
    CONTACT_LOC_VAL: "ಬಸ್ ನಿಲ್ದಾಣದ ಹತ್ತಿರ ಜತ್ತಾ, ಕನಮಡಿ, ಮುಖ್ಯ ರಸ್ತೆ, ಕರ್ನಾಟಕ ೫೮೬೧೧೪",
    CONTACT_PHONE: "ಫೋನ್ ಸಂಖ್ಯೆ",
    CONTACT_HOURS: "ಕೆಲಸದ ಸಮಯ",
    CONTACT_HOURS_VAL: "ಸೋಮ - ಭಾನು: ಬೆಳಗ್ಗೆ ೮:೦೦ ರಿಂದ ರಾತ್ರಿ ೮:೦೦",
    CONTACT_MAP_BTN: "ಗೂಗಲ್ ಮ್ಯಾಪ್ ನಲ್ಲಿ ನೋಡಿ",
    
    FORM_NAME: "ನಿಮ್ಮ ಹೆಸರು",
    FORM_PHONE: "ನಿಮ್ಮ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ",
    FORM_MSG: "ನಿಮ್ಮ ಸಂದೇಶ / ಪ್ರಶ್ನೆ",
    FORM_SUBMIT: "ಸಂದೇಶ ಕಳುಹಿಸಿ",
    FORM_SUCCESS: "ಧನ್ಯವಾದಗಳು! ನಿಮ್ಮ ಸಂದೇಶ ತಲುಪಿದೆ. ಶೀಘ್ರದಲ್ಲೇ ನಮ್ಮ ಅಂಗಡಿಯ ಪ್ರತಿನಿಧಿ ನಿಮಗೆ ಕರೆ ಮಾಡುತ್ತಾರೆ.",
    FORM_ERROR: "ದಯವಿಟ್ಟು ಎಲ್ಲಾ ವಿವರಗಳನ್ನು ಸರಿಯಾಗಿ ಭರ್ತಿ ಮಾಡಿ."
  }
});

// App Main Controller
app.controller('MainController', ['$scope', '$location', '$rootScope', 'TRANSLATIONS', 'ShopDataService', 
function($scope, $location, $rootScope, TRANSLATIONS, ShopDataService) {
  $scope.lang = 'en';
  $scope.isMobileMenuOpen = false;
  
  // Load dynamic shop info
  $rootScope.shopData = ShopDataService.getShopInfo();
  
  // Set translation language
  $scope.toggleLang = function(selectedLang) {
    if (selectedLang) {
      $scope.lang = selectedLang;
    } else {
      $scope.lang = ($scope.lang === 'en') ? 'kn' : 'en';
    }
  };
  
  // Translate function helper
  $scope.t = function(key) {
    if (TRANSLATIONS[$scope.lang] && TRANSLATIONS[$scope.lang][key]) {
      return TRANSLATIONS[$scope.lang][key];
    }
    return key;
  };
  
  // Active Navigation Tab Check
  $scope.isActive = function(viewLocation) {
    return viewLocation === $location.path();
  };
  
  // Toggle mobile navbar drawer
  $scope.toggleMobileMenu = function() {
    $scope.isMobileMenuOpen = !$scope.isMobileMenuOpen;
  };
  
  // Close menu on link click (mobile)
  $scope.closeMenu = function() {
    $scope.isMobileMenuOpen = false;
  };
}]);

// Home Controller
app.controller('HomeController', ['$scope', 'ShopDataService', function($scope, ShopDataService) {
  // Weather Simulation
  $scope.weather = {
    temp: 29,
    condition: 'Sunny / Clear',
    humidity: '64%',
    wind: '12 km/h'
  };
  
  var updateWeather = function() {
    var hour = new Date().getHours();
    if (hour > 18 || hour < 6) {
      $scope.weather.temp = 23 + Math.floor(Math.random() * 3);
      $scope.weather.condition = 'Cool / Breeze';
    } else {
      $scope.weather.temp = 28 + Math.floor(Math.random() * 5);
      $scope.weather.condition = 'Sunny / Clear';
    }
    $scope.weather.humidity = (55 + Math.floor(Math.random() * 20)) + '%';
    $scope.weather.wind = (8 + Math.floor(Math.random() * 8)) + ' km/h';
  };
  updateWeather();
  
  // Dynamic Market Rates from Service
  $scope.marketRates = ShopDataService.getMarketRates();
}]);

// Products Controller
app.controller('ProductsController', ['$scope', '$rootScope', 'ShopDataService', function($scope, $rootScope, ShopDataService) {
  $scope.searchQuery = '';
  $scope.activeCategory = 'ALL';
  $scope.selectedProduct = null;
  
  // Load products dynamically from service
  $scope.products = ShopDataService.getProducts();
  $scope.shopData = $rootScope.shopData;
  
  // Set Category Filter
  $scope.setCategory = function(category) {
    $scope.activeCategory = category;
  };
  
  // Filter products by search and category
  $scope.filterProducts = function(product) {
    var matchesCategory = ($scope.activeCategory === 'ALL' || product.category === $scope.activeCategory);
    
    var matchesSearch = true;
    if ($scope.searchQuery) {
      var query = $scope.searchQuery.toLowerCase();
      matchesSearch = (
        product.name.toLowerCase().indexOf(query) !== -1 ||
        product.desc.toLowerCase().indexOf(query) !== -1 ||
        product.category.toLowerCase().indexOf(query) !== -1 ||
        (product.compatibility && product.compatibility.toLowerCase().indexOf(query) !== -1)
      );
    }
    
    return matchesCategory && matchesSearch;
  };
  
  // Open details modal window
  $scope.openDetails = function(product) {
    $scope.selectedProduct = product;
  };
  
  // Close details modal window
  $scope.closeDetails = function() {
    $scope.selectedProduct = null;
  };
}]);

// Advisory Controller
app.controller('AdvisoryController', ['$scope', function($scope) {
  // Input models
  $scope.calc = {
    crop: 'POMEGRANATE',
    acres: 1,
    soil: 'BLACK'
  };
  
  $scope.results = null;
  
  // Comprehensive Crop & Fruit Recommendation logic
  $scope.calculate = function() {
    var acres = parseFloat($scope.calc.acres);
    if (isNaN(acres) || acres <= 0) {
      acres = 1;
    }
    
    var baseData = {
      POMEGRANATE: {
        cropName: 'Pomegranate (ದಾಳಿಂಬೆ - ಭಗವಾ)',
        seedPerAcre: 400, // saplings
        seedUnit: ' Saplings (14x10 ft spacing)',
        nPerAcre: 60,  // kg
        pPerAcre: 50,  // kg
        kPerAcre: 60,  // kg
        manurePerAcre: 8 // tons
      },
      GRAPES: {
        cropName: 'Grapes (ದ್ರಾಕ್ಷಿ - ಸೋನಾಕಾ/ಮಾಣಿಕ್ ಚಮನ್)',
        seedPerAcre: 1000, // rootstock grafts
        seedUnit: ' Rootstock Grafts (10x6 ft spacing)',
        nPerAcre: 80,  // kg
        pPerAcre: 60,  // kg
        kPerAcre: 100, // kg
        manurePerAcre: 12 // tons
      },
      MAIZE: {
        cropName: 'Maize (ಮೆಕ್ಕೆಜೋಳ)',
        seedPerAcre: 8, // kg
        seedUnit: ' kg Seeds',
        nPerAcre: 50,  // kg
        pPerAcre: 25,  // kg
        kPerAcre: 20,  // kg
        manurePerAcre: 5 // tons
      },
      JOWAR: {
        cropName: 'Jowar (ಜೋಳ)',
        seedPerAcre: 4, // kg
        seedUnit: ' kg Seeds',
        nPerAcre: 30,  // kg
        pPerAcre: 15,  // kg
        kPerAcre: 15,  // kg
        manurePerAcre: 4 // tons
      },
      COTTON: {
        cropName: 'Cotton (ಹತ್ತಿ)',
        seedPerAcre: 2.5, // kg
        seedUnit: ' kg BT Hybrid Seeds',
        nPerAcre: 40,  // kg
        pPerAcre: 20,  // kg
        kPerAcre: 20,  // kg
        manurePerAcre: 6 // tons
      },
      SUGARCANE: {
        cropName: 'Sugarcane (ಕಬ್ಬು)',
        seedPerAcre: 25000, // buds
        seedUnit: ' Eye Buds / Sets',
        nPerAcre: 100,  // kg
        pPerAcre: 40,  // kg
        kPerAcre: 40,  // kg
        manurePerAcre: 10 // tons
      },
      WHEAT: {
        cropName: 'Wheat (ಗೋಧಿ)',
        seedPerAcre: 40,
        seedUnit: ' kg Seeds',
        nPerAcre: 40, pPerAcre: 20, kPerAcre: 12, manurePerAcre: 5
      },
      BANANA: {
        cropName: 'Banana (ಬಾಳೆ - G9/Grand Naine)',
        seedPerAcre: 400,
        seedUnit: ' Tissue Culture Suckers (8x5 ft spacing)',
        nPerAcre: 100, pPerAcre: 40, kPerAcre: 120, manurePerAcre: 10
      },
      MANGO: {
        cropName: 'Mango (ಮಾವು - Alphonso/Kesar)',
        seedPerAcre: 40,
        seedUnit: ' Grafted Saplings (32x32 ft spacing)',
        nPerAcre: 50, pPerAcre: 25, kPerAcre: 50, manurePerAcre: 8
      },
      PAPAYA: {
        cropName: 'Papaya (ಪಪ್ಪಾಯಿ - Red Lady)',
        seedPerAcre: 550,
        seedUnit: ' Hybrid Seedlings (6x6 ft spacing)',
        nPerAcre: 60, pPerAcre: 30, kPerAcre: 60, manurePerAcre: 6
      },
      GUAVA: {
        cropName: 'Guava (ಪೇರಲ - L-49/Allahabad Safeda)',
        seedPerAcre: 200,
        seedUnit: ' Grafted Plants (15x15 ft spacing)',
        nPerAcre: 40, pPerAcre: 20, kPerAcre: 40, manurePerAcre: 7
      },
      TOMATO: {
        cropName: 'Tomato (ಟೊಮೇಟೊ - Hybrid)',
        seedPerAcre: 3500,
        seedUnit: ' Seedlings (3x2 ft spacing)',
        nPerAcre: 60, pPerAcre: 40, kPerAcre: 50, manurePerAcre: 5
      },
      SUNFLOWER: {
        cropName: 'Sunflower (ಸೂರ್ಯಕಾಂತಿ)',
        seedPerAcre: 3,
        seedUnit: ' kg Hybrid Seeds',
        nPerAcre: 40, pPerAcre: 20, kPerAcre: 20, manurePerAcre: 4
      },
      GROUNDNUT: {
        cropName: 'Groundnut (ಕಡಲೆಕಾಯಿ)',
        seedPerAcre: 50,
        seedUnit: ' kg Seeds (shelled)',
        nPerAcre: 20, pPerAcre: 40, kPerAcre: 20, manurePerAcre: 4
      },
      ONION: {
        cropName: 'Onion (ಈರುಳ್ಳಿ - Bellary/Nasik Red)',
        seedPerAcre: 3,
        seedUnit: ' kg Seeds (or 200 kg sets)',
        nPerAcre: 50, pPerAcre: 25, kPerAcre: 50, manurePerAcre: 5
      },
      CHILLI: {
        cropName: 'Chilli (ಮೆಣಸಿನಕಾಯಿ - Byadgi/Hybrid)',
        seedPerAcre: 200,
        seedUnit: ' g Seeds (transplanted seedlings)',
        nPerAcre: 50, pPerAcre: 25, kPerAcre: 25, manurePerAcre: 5
      },
      TURMERIC: {
        cropName: 'Turmeric (ಅರಿಶಿನ)',
        seedPerAcre: 800,
        seedUnit: ' kg Rhizomes (1.5x1 ft spacing)',
        nPerAcre: 40, pPerAcre: 20, kPerAcre: 40, manurePerAcre: 8
      }
    };
    
    var cropInfo = baseData[$scope.calc.crop];
    var seedTotal = Math.round(cropInfo.seedPerAcre * acres);
    var nTotal = cropInfo.nPerAcre * acres;
    var pTotal = cropInfo.pPerAcre * acres;
    var kTotal = cropInfo.kPerAcre * acres;
    var manureTotal = cropInfo.manurePerAcre * acres;
    
    var soilAdviceEn = "";
    var soilAdviceKn = "";
    
    if ($scope.calc.soil === 'BLACK') {
      kTotal = Math.round(kTotal * 0.85);
      soilAdviceEn = "Local black soil retains moisture well but requires drip aeration. For Pomegranate/Grapes, ensure proper pit drainage. Potassium dosage adjusted by -15%.";
      soilAdviceKn = "ಕರಿಮಣ್ಣು ನೀರನ್ನು ಚೆನ್ನಾಗಿ ಹಿಡಿದಿಟ್ಟುಕೊಳ್ಳುತ್ತದೆ. ದ್ರಾಕ್ಷಿ ಮತ್ತು ದಾಳಿಂಬೆಗೆ ಹನಿ ನೀರಾವರಿ ಒಳಚರಂಡಿ ಸರಿಯಾಗಿರಲಿ. ಪೊಟ್ಯಾಶ್ ಡೋಸ್ ಅನ್ನು ೧೫% ಕಡಿತಗೊಳಿಸಲಾಗಿದೆ.";
    } else if ($scope.calc.soil === 'RED') {
      pTotal = Math.round(pTotal * 1.15);
      soilAdviceEn = "Red loamy soil has lower phosphorous availability. P dosage increased by 15% to encourage strong root architecture and fruit set.";
      soilAdviceKn = "ಕೆಂಪು ಮಣ್ಣಿನಲ್ಲಿ ರಂಜಕದ ಅಂಶ ಕಡಿಮೆಯಿರುತ್ತದೆ. ಬಲವಾದ ಬೇರುಗಳ ಬೆಳವಣಿಗೆಗೆ ರಂಜಕದ ಡೋಸ್ ಅನ್ನು ೧೫% ಹೆಚ್ಚಿಸಲಾಗಿದೆ.";
    } else if ($scope.calc.soil === 'SANDY') {
      manureTotal += (2 * acres);
      soilAdviceEn = "Sandy soil drains rapidly. High organic carbon is required. We recommend +2 tons/acre extra neem cake compost and weekly fertigation splits.";
      soilAdviceKn = "ಮರಳು ಮಣ್ಣು ಬೇಗನೆ ಒಣಗುತ್ತದೆ. ಹೆಚ್ಚಿನ ಸಾವಯವ ಇಂಗಾಲದ ಅಗತ್ಯವಿದೆ. ಪ್ರತಿ ಎಕರೆಗೆ +೨ ಟನ್ ಹೆಚ್ಚುವರಿ ಗೊಬ್ಬರ ಮತ್ತು ಹನಿ ನೀರಾವರಿ ರಸಗೊಬ್ಬರ ಶಿಫಾರಸು ಮಾಡಲಾಗಿದೆ.";
    }
    
    $scope.results = {
      cropName: cropInfo.cropName,
      seedVal: seedTotal + cropInfo.seedUnit,
      npkVal: Math.round(nTotal) + ' kg N : ' + Math.round(pTotal) + ' kg P : ' + Math.round(kTotal) + ' kg K',
      manureVal: manureTotal + ' Tons',
      soilAdviceEn: soilAdviceEn,
      soilAdviceKn: soilAdviceKn
    };
  };
  
  $scope.calculate();
  
  // Crop Doctor items (including Grapes & Pomegranate)
  $scope.cropDoc = [
    { 
      crop: 'Pomegranate / ದಾಳಿಂಬೆ', 
      issue: 'Bacterial Blight / Teliya Disease (ತೇಲಿಯಾ ರೋಗ)', 
      sol: 'Orchard sanitation: prune infected twigs. Spray Streptocycline (0.5g/L) + Copper Oxychloride (2g/L) during rainy spells.' 
    },
    { 
      crop: 'Grapes / ದ್ರಾಕ್ಷಿ', 
      issue: 'Downy Mildew & Powdery Mildew (ಬೂದಿ ರೋಗ)', 
      sol: 'Foliar spray of Potassium Phosphonate (3g/L) or Copper Hydroxide (2g/L) after October foundation pruning.' 
    },
    { 
      crop: 'Cotton / ಹತ್ತಿ', 
      issue: 'Sucking Pests (Thrips/Aphids/Jassids)', 
      sol: 'Spray 5% Neem Seed Kernel Extract (NSKE) or biological Beauveria bassiana liquid.' 
    },
    { 
      crop: 'Sugarcane / ಕಬ್ಬು', 
      issue: 'Internode Borer (ಅಂತರಗಣ್ಣು ಕೊರಕ)', 
      sol: 'Release Trichogramma chilonis egg parasitoids at rate of 2.5 cc/acre.' 
    },
    { 
      crop: 'Maize / ಮೆಕ್ಕೆಜೋಳ', 
      issue: 'Fall Armyworm (ಲದ್ದಿ ಹುಳು)', 
      sol: 'Apply organic neem cake powder in crop whorls or spray Metarhizium anisopliae.' 
    },
    { 
      crop: 'Banana / ಬಾಳೆ', 
      issue: 'Panama Wilt & Sigatoka Leaf Spot', 
      sol: 'Use disease-free TC suckers. Drench soil with Trichoderma viride (5g/L). Spray Mancozeb (2g/L) for Sigatoka control.' 
    },
    { 
      crop: 'Mango / ಮಾವು', 
      issue: 'Mango Hopper & Powdery Mildew (ಬೂದಿ ರೋಗ)', 
      sol: 'Spray Imidacloprid (0.5ml/L) for hoppers. Apply Wettable Sulphur (3g/L) or Hexaconazole for powdery mildew at flowering.' 
    },
    { 
      crop: 'Tomato / ಟೊಮೇಟೊ', 
      issue: 'Early Blight & Leaf Curl Virus', 
      sol: 'Spray Mancozeb (2g/L) for early blight. Control whitefly vectors with Neem oil (5ml/L). Remove infected plants immediately.' 
    },
    { 
      crop: 'Chilli / ಮೆಣಸಿನಕಾಯಿ', 
      issue: 'Thrips & Anthracnose Fruit Rot', 
      sol: 'Spray Spinosad (0.3ml/L) for thrips. Apply Copper Oxychloride (3g/L) for anthracnose. Avoid waterlogging.' 
    },
    { 
      crop: 'Onion / ಈರುಳ್ಳಿ', 
      issue: 'Purple Blotch & Thrips', 
      sol: 'Spray Mancozeb + Carbendazim (2g/L) for purple blotch. Use Fipronil (2ml/L) for thrips. Ensure proper field drainage.' 
    },
    { 
      crop: 'Groundnut / ಕಡಲೆಕಾಯಿ', 
      issue: 'Tikka Leaf Spot & Collar Rot', 
      sol: 'Seed treat with Trichoderma (4g/kg). Spray Chlorothalonil (2g/L) at 30 & 60 days. Avoid excess soil moisture.' 
    }
  ];
}]);

// Contact Controller
app.controller('ContactController', ['$scope', 'ShopDataService', function($scope, ShopDataService) {
  $scope.shopData = ShopDataService.getShopInfo();
  $scope.contact = {
    name: '',
    phone: '',
    message: ''
  };
  
  $scope.feedback = {
    show: false,
    success: false,
    textKey: ''
  };
  
  $scope.submitForm = function(isValid) {
    if (isValid && $scope.contact.name && $scope.contact.phone) {
      // Save enquiry to local service store for Admin viewing
      var enquiries = ShopDataService.getEnquiries();
      enquiries.unshift({
        name: $scope.contact.name,
        phone: $scope.contact.phone,
        message: $scope.contact.message,
        date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        status: 'Pending'
      });
      ShopDataService.saveEnquiries(enquiries);

      $scope.feedback.show = true;
      $scope.feedback.success = true;
      $scope.feedback.textKey = 'FORM_SUCCESS';
      
      // Reset form
      $scope.contact = {
        name: '',
        phone: '',
        message: ''
      };
    } else {
      $scope.feedback.show = true;
      $scope.feedback.success = false;
      $scope.feedback.textKey = 'FORM_ERROR';
    }
  };
}]);

// Admin Controller (Shop Dashboard Management)
app.controller('AdminController', ['$scope', '$rootScope', 'ShopDataService', function($scope, $rootScope, ShopDataService) {
  // Always wipe any stale old PIN so bairav@204 is always the active password
  ShopDataService.clearOldPin();

  $scope.isAdminLoggedIn = sessionStorage.getItem('seva_admin_logged') === 'true';
  $scope.admin = { pin: '' };
  $scope.loginError = false;

  $scope.activeTab = 'shop'; // Default tab: shop info
  $scope.saveSuccess = false;

  // Load Data
  $scope.shopData = ShopDataService.getShopInfo();
  $scope.products = ShopDataService.getProducts();
  $scope.marketRates = ShopDataService.getMarketRates();
  $scope.enquiries = ShopDataService.getEnquiries();
  $scope.adminPin = ShopDataService.getAdminPin();

  // Login handler
  $scope.loginAdmin = function() {
    if ($scope.admin.pin === 'bairav@204') {
      $scope.isAdminLoggedIn = true;
      sessionStorage.setItem('seva_admin_logged', 'true');
      $scope.loginError = false;
      $scope.admin.pin = '';
    } else {
      $scope.loginError = true;
    }
  };

  // Logout handler
  $scope.logoutAdmin = function() {
    $scope.isAdminLoggedIn = false;
    sessionStorage.removeItem('seva_admin_logged');
  };

  // Set active tab
  $scope.setTab = function(tab) {
    $scope.activeTab = tab;
  };

  // Save all shop data to LocalStorage
  $scope.saveData = function() {
    ShopDataService.saveShopInfo($scope.shopData);
    ShopDataService.saveProducts($scope.products);
    ShopDataService.saveMarketRates($scope.marketRates);
    ShopDataService.saveEnquiries($scope.enquiries);

    // Update global rootScope shopData so ALL pages update instantly
    $rootScope.shopData = angular.copy($scope.shopData);

    $scope.saveSuccess = true;
    setTimeout(function() {
      $scope.$apply(function() {
        $scope.saveSuccess = false;
      });
    }, 2500);
  };

  // Product CRUD
  $scope.prodCategoryFilter = 'ALL';
  $scope.showProductModal = false;
  $scope.editingProduct = {};

  $scope.setProdCategoryFilter = function(cat) {
    $scope.prodCategoryFilter = cat;
  };

  $scope.adminFilterProducts = function(p) {
    return ($scope.prodCategoryFilter === 'ALL' || p.category === $scope.prodCategoryFilter);
  };

  $scope.openAddProductModal = function() {
    $scope.editingProduct = {
      id: null,
      name: '',
      category: 'FRUIT',
      desc: '',
      packaging: '',
      compatibility: '',
      usage: '',
      img: 'images/fruit-category.png',
      badge: ''
    };
    $scope.showProductModal = true;
  };

  $scope.openEditProductModal = function(p) {
    $scope.editingProduct = angular.copy(p);
    $scope.showProductModal = true;
  };

  $scope.closeProductModal = function() {
    $scope.showProductModal = false;
    $scope.editingProduct = {};
  };

  $scope.saveProduct = function() {
    if (!$scope.editingProduct.name) return;

    if ($scope.editingProduct.id) {
      // Update existing
      for (var i = 0; i < $scope.products.length; i++) {
        if ($scope.products[i].id === $scope.editingProduct.id) {
          $scope.products[i] = angular.copy($scope.editingProduct);
          break;
        }
      }
    } else {
      // Create new
      var maxId = 0;
      for (var j = 0; j < $scope.products.length; j++) {
        if ($scope.products[j].id > maxId) maxId = $scope.products[j].id;
      }
      $scope.editingProduct.id = maxId + 1;
      $scope.products.unshift(angular.copy($scope.editingProduct));
    }

    $scope.saveData();
    $scope.closeProductModal();
  };

  $scope.deleteProduct = function(id) {
    if (confirm("Are you sure you want to delete this product?")) {
      $scope.products = $scope.products.filter(function(p) { return p.id !== id; });
      $scope.saveData();
    }
  };

  // Market Rates CRUD
  $scope.addNewMarketRate = function() {
    $scope.marketRates.push({
      name: "New Crop Rate",
      price: "₹ 0",
      trend: "flat",
      val: "0"
    });
  };

  $scope.deleteMarketRate = function(index) {
    $scope.marketRates.splice(index, 1);
    $scope.saveData();
  };

  // Customer Enquiries Management
  $scope.toggleEnquiryStatus = function(eq) {
    eq.status = (eq.status === 'Followed Up') ? 'Pending' : 'Followed Up';
    $scope.saveData();
  };

  $scope.deleteEnquiry = function(index) {
    $scope.enquiries.splice(index, 1);
    $scope.saveData();
  };

  $scope.clearAllEnquiries = function() {
    if (confirm("Are you sure you want to clear all customer enquiries?")) {
      $scope.enquiries = [];
      $scope.saveData();
    }
  };

  // PIN Change
  $scope.pinForm = { newPin: '', confirmPin: '' };
  $scope.pinSuccessMsg = '';
  $scope.pinErrMsg = '';

  $scope.changePin = function() {
    if (!$scope.pinForm.newPin || $scope.pinForm.newPin.length < 4) {
      $scope.pinErrMsg = "PIN must be at least 4 characters long.";
      $scope.pinSuccessMsg = '';
      return;
    }
    if ($scope.pinForm.newPin !== $scope.pinForm.confirmPin) {
      $scope.pinErrMsg = "New PIN and Confirm PIN do not match.";
      $scope.pinSuccessMsg = '';
      return;
    }

    ShopDataService.saveAdminPin($scope.pinForm.newPin);
    $scope.pinSuccessMsg = "Admin security PIN updated successfully!";
    $scope.pinErrMsg = '';
    $scope.pinForm = { newPin: '', confirmPin: '' };
  };

  // Reset Data to Factory Defaults
  $scope.resetToDefaults = function() {
    if (confirm("WARNING: This will reset all shop info, products, and market rates back to factory defaults. Continue?")) {
      ShopDataService.resetDefaults();
      $scope.shopData = ShopDataService.getShopInfo();
      $scope.products = ShopDataService.getProducts();
      $scope.marketRates = ShopDataService.getMarketRates();
      $scope.enquiries = ShopDataService.getEnquiries();
      $scope.adminPin = ShopDataService.getAdminPin();
      $rootScope.shopData = $scope.shopData;
      alert("All data has been reset to defaults!");
    }
  };
}]);
