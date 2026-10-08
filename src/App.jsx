import React, { useEffect, useMemo, useState } from "react";

/* =========================================================
   INITIAL PRODUCTS
========================================================= */

const DEFAULT_PACK_OPTIONS = [{ label: "1 kg", multiplier: 1 }];

const GRAIN_PACK_OPTIONS = [
  { label: "1 kg", multiplier: 1 },
  { label: "5 kg bag", multiplier: 5 },
  { label: "10 kg bag", multiplier: 10 },
  { label: "30 kg bag", multiplier: 30 },
];

const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: "Wheat",
    category: "Grains",
    price: 52,
    wholesalePrice: 48,
    unit: "kg",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800",
    inStock: true,
    expiry: "",
    qualityCheck: true,
    quality: "Clean, fresh wheat with good grain quality.",
    qualityScore: 4.8,
    ratingCount: "10k+",
    packOptions: GRAIN_PACK_OPTIONS,
  },

  {
    id: 2,
    name: "Jowar",
    category: "Grains",
    price: 65,
    wholesalePrice: 60,
    unit: "kg",
    image: "https://images.unsplash.com/photo-1603046891744-76e6300f7e1d?w=800",
    inStock: true,
    expiry: "",
    qualityCheck: true,
    quality: "Fresh jowar grains with good colour and consistency.",
    qualityScore: 4.7,
    ratingCount: "10k+",
    packOptions: GRAIN_PACK_OPTIONS,
  },

  {
    id: 3,
    name: "Bajra",
    category: "Grains",
    price: 55,
    wholesalePrice: 50,
    unit: "kg",
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800",
    inStock: true,
    expiry: "",
    qualityCheck: true,
    quality: "Fresh bajra with good grain consistency.",
    qualityScore: 4.6,
    ratingCount: "10k+",
    packOptions: GRAIN_PACK_OPTIONS,
  },

  {
    id: 4,
    name: "Rice",
    category: "Grains",
    price: 72,
    wholesalePrice: 67,
    unit: "kg",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800",
    inStock: true,
    expiry: "",
    qualityCheck: true,
    quality: "Clean rice with good grain length.",
    qualityScore: 4.8,
    ratingCount: "10k+",
  },

  {
    id: 5,
    name: "Sugar",
    category: "Grocery",
    price: 48,
    wholesalePrice: 45,
    unit: "kg",
    image: "https://images.unsplash.com/photo-1581441363689-1f3c3c414635?w=800",
    inStock: true,
    expiry: "",
    qualityCheck: true,
    quality: "Fine, clean sugar.",
    qualityScore: 4.8,
    ratingCount: "10k+",
  },

  {
    id: 6,
    name: "Toor Dal",
    category: "Pulses",
    price: 145,
    wholesalePrice: 138,
    unit: "kg",
    image: "https://images.unsplash.com/photo-1585996866937-7c0c9c3f7c5d?w=800",
    inStock: true,
    expiry: "December 2026",
    qualityCheck: true,
    quality: "Fresh dal with uniform grains.",
    qualityScore: 4.7,
    ratingCount: "10k+",
  },

  {
    id: 7,
    name: "Bread",
    category: "Bakery",
    price: 40,
    wholesalePrice: 36,
    unit: "pack",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800",
    inStock: true,
    expiry: "08 October 2026",
    qualityCheck: false,
    quality: "",
    qualityScore: 0,
  },

  {
    id: 8,
    name: "Biscuits",
    category: "Snacks",
    price: 30,
    wholesalePrice: 27,
    unit: "pack",
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800",
    inStock: true,
    expiry: "January 2027",
    qualityCheck: false,
    quality: "",
    qualityScore: 0,
  },
];

/* =========================================================
   CATEGORIES
========================================================= */

const CATEGORIES = ["All", "Grains", "Pulses", "Grocery", "Bakery", "Snacks"];

/* =========================================================
   RECOMMENDATIONS
========================================================= */

const RECOMMENDATIONS = {
  Bread: ["Biscuits"],
  Wheat: ["Rice", "Jowar", "Bajra"],
  Jowar: ["Wheat", "Bajra"],
  Bajra: ["Jowar", "Wheat"],
  Sugar: ["Biscuits"],
  Rice: ["Toor Dal"],
  "Toor Dal": ["Rice"],
  Biscuits: ["Bread"],
};

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी" },
  { code: "mr", label: "मराठी" },
];

const SPEECH_LOCALES = {
  en: "en-IN",
  hi: "hi-IN",
  mr: "mr-IN",
};

const TRANSLATIONS = {
  en: {
    storeSubtitle: "Your local grocery store",
    search: "Search wheat, sugar, rice...",
    admin: "Admin",
    cart: "Cart",
    shop: "Shop groceries →",
    browse: "What are you looking for?",
    popular: "Fresh from the store",
    viewAll: "View all →",
    shopLabel: "Groceries",
    orders: "Pickup requests",
  },
  hi: {
    storeSubtitle: "आपकी स्थानीय किराना दुकान",
    search: "गेहूं, चीनी, चावल खोजें...",
    admin: "व्यवस्थापक",
    cart: "कार्ट",
    shop: "किराना खरीदें →",
    browse: "आप क्या ढूंढ रहे हैं?",
    popular: "दुकान से ताज़ा",
    viewAll: "सभी देखें →",
    shopLabel: "किराना",
    orders: "पिकअप अनुरोध",
  },
  mr: {
    storeSubtitle: "तुमचे स्थानिक किराणा दुकान",
    search: "गहू, साखर, तांदूळ शोधा...",
    admin: "व्यवस्थापक",
    cart: "कार्ट",
    shop: "किराणा खरेदी करा →",
    browse: "तुम्ही काय शोधत आहात?",
    popular: "दुकानातून ताजे",
    viewAll: "सर्व पहा →",
    shopLabel: "किराणा",
    orders: "पिकअप विनंत्या",
  },
};

const CUSTOMER_TRANSLATIONS = {
  en: {
    localOnline: "YOUR LOCAL STORE, NOW ONLINE",
    goodGroceries: "Good groceries.",
    fairPrices: "Fair prices.",
    heroDescription:
      "Shop from Mauli Provision, check the quality, build your cart and we'll have everything ready for you to pick up.",
    confidenceTitle: "Shop with confidence",
    confidenceDescription:
      "Check quality information before buying grains, pulses and more.",
    browseLabel: "BROWSE",
    popularLabel: "POPULAR",
    whyLabel: "WHY MAULI?",
    moreThanShopping: "More than just online shopping.",
    explore: "Explore →",
    checkQuality: "🔍 Check quality",
    rateProduct: "★ Rate this product",
    packSize: "Pack size",
    addToCart: "+ Add to cart",
    outOfStock: "Out of stock",
    callAdmin: "📞 Call admin to negotiate",
    shopLabel: "SHOP",
    noProducts: "No products found.",
    wholesale: "Wholesale",
    wholesaleAvailable: "Available for larger quantities",
    bestBefore: "Best before",
    qualityInformation: "Quality information",
    usersRated: "users rated this",
    appearanceChecked: "✓ Appearance checked",
    stockChecked: "✓ Current stock checked",
    storeRating: "✓ Store quality rating",
    privateReview: "Rate this product privately",
    privateReviewDescription:
      "Every product can be rated. Only the store admin will see it.",
    reviewSent: "Your review has been sent to the store team.",
    improvePlaceholder: "What could we improve?",
    sendReview: "Send private review",
    recommendations: "You might also need",
    yourOrder: "YOUR ORDER",
    yourCart: "Your cart",
    pickupDetails: "Pickup details",
    easyPickupTitle: "Easy pickup",
    easyPickupDescription:
      "Send your cart. We'll pack it. Just come and collect it.",
    emptyCart: "Your cart is empty",
    emptyCartDescription: "Add some groceries to get started.",
    bulkHint: "Buying in bulk? Call the store team to discuss your order.",
    estimatedTotal: "Estimated total",
    pickupNote: "We'll pack your order and keep it ready for pickup.",
    sendCart: "Send cart to store →",
    pickupIntro: "Give us your details and we'll prepare your order.",
    yourName: "Your name",
    mobileNumber: "Mobile number",
    orderNote: "Anything we should know?",
    confirmPickup: "Confirm pickup request",
    backToCart: "← Back to cart",
    addVoiceNote: "Add voice note",
    ordersLabel: "Orders",
    namePlaceholder: "Enter your name",
    phonePlaceholder: "10-digit mobile number",
    notePlaceholder: "Example: Please keep wheat separate.",
    noOrders: "No orders yet.",
    readyNotice: "Your order is packed and ready for pickup.",
    needReturn: "Need to return something?",
    returnDescription:
      "Send the product photo and your query. The store team will call you.",
    returnQueryPlaceholder: "Tell us what went wrong...",
    attachPhoto: "Attach received product photo",
    photoAttached: "Photo attached",
    sendReturnQuery: "Send return query",
  },
  hi: {
    localOnline: "आपकी स्थानीय दुकान, अब ऑनलाइन",
    goodGroceries: "अच्छा किराना।",
    fairPrices: "उचित दाम।",
    heroDescription:
      "Mauli Provision से खरीदारी करें, गुणवत्ता देखें, कार्ट बनाएं और हम आपका सामान पिकअप के लिए तैयार रखेंगे।",
    confidenceTitle: "विश्वास के साथ खरीदें",
    confidenceDescription:
      "अनाज, दाल और अन्य सामान खरीदने से पहले गुणवत्ता की जानकारी देखें।",
    browseLabel: "ब्राउज़ करें",
    popularLabel: "लोकप्रिय",
    whyLabel: "माउली क्यों?",
    moreThanShopping: "सिर्फ ऑनलाइन खरीदारी से कहीं अधिक।",
    explore: "देखें →",
    checkQuality: "🔍 गुणवत्ता देखें",
    rateProduct: "★ उत्पाद को रेट करें",
    packSize: "पैक का आकार",
    addToCart: "+ कार्ट में जोड़ें",
    outOfStock: "स्टॉक में नहीं",
    callAdmin: "📞 व्यवस्थापक को कॉल करें",
    shopLabel: "खरीदारी",
    noProducts: "कोई उत्पाद नहीं मिला।",
    wholesale: "थोक मूल्य",
    wholesaleAvailable: "अधिक मात्रा के लिए उपलब्ध",
    bestBefore: "उपयोग की अंतिम तारीख",
    qualityInformation: "गुणवत्ता की जानकारी",
    usersRated: "लोगों ने रेट किया",
    appearanceChecked: "✓ रूप की जांच हुई",
    stockChecked: "✓ वर्तमान स्टॉक की जांच हुई",
    storeRating: "✓ दुकान की गुणवत्ता रेटिंग",
    privateReview: "इस उत्पाद को निजी रूप से रेट करें",
    privateReviewDescription:
      "हर उत्पाद को रेट किया जा सकता है। इसे केवल व्यवस्थापक देखेंगे।",
    reviewSent: "आपकी समीक्षा दुकान की टीम को भेज दी गई है।",
    improvePlaceholder: "हम क्या बेहतर कर सकते हैं?",
    sendReview: "निजी समीक्षा भेजें",
    recommendations: "आपको यह भी चाहिए हो सकता है",
    yourOrder: "आपका ऑर्डर",
    yourCart: "आपकी कार्ट",
    pickupDetails: "पिकअप विवरण",
    easyPickupTitle: "आसान पिकअप",
    easyPickupDescription:
      "अपनी कार्ट भेजें। हम उसे पैक करके तैयार रखेंगे। बस आकर ले जाएं।",
    emptyCart: "आपकी कार्ट खाली है",
    emptyCartDescription: "शुरू करने के लिए कुछ किराना जोड़ें।",
    bulkHint: "अधिक मात्रा? ऑर्डर के लिए दुकान की टीम को कॉल करें।",
    estimatedTotal: "अनुमानित कुल",
    pickupNote: "हम आपका सामान पैक करके पिकअप के लिए तैयार रखेंगे।",
    sendCart: "दुकान को कार्ट भेजें →",
    pickupIntro: "अपना विवरण दें और हम आपका ऑर्डर तैयार करेंगे।",
    yourName: "आपका नाम",
    mobileNumber: "मोबाइल नंबर",
    orderNote: "क्या हमें कुछ जानना चाहिए?",
    confirmPickup: "पिकअप अनुरोध की पुष्टि करें",
    backToCart: "← कार्ट पर वापस जाएं",
    addVoiceNote: "आवाज़ का नोट जोड़ें",
    ordersLabel: "ऑर्डर",
    namePlaceholder: "अपना नाम दर्ज करें",
    phonePlaceholder: "10 अंकों का मोबाइल नंबर",
    notePlaceholder: "उदाहरण: कृपया गेहूं अलग रखें।",
    noOrders: "अभी कोई ऑर्डर नहीं है।",
    readyNotice: "आपका ऑर्डर पैक होकर पिकअप के लिए तैयार है।",
    needReturn: "कुछ वापस करना है?",
    returnDescription:
      "उत्पाद की फोटो और अपनी समस्या भेजें। दुकान की टीम आपको कॉल करेगी।",
    returnQueryPlaceholder: "बताएं कि क्या समस्या हुई...",
    attachPhoto: "मिले हुए उत्पाद की फोटो जोड़ें",
    photoAttached: "फोटो जुड़ी है",
    sendReturnQuery: "वापसी का प्रश्न भेजें",
  },
  mr: {
    localOnline: "तुमचे स्थानिक दुकान, आता ऑनलाइन",
    goodGroceries: "चांगला किराणा.",
    fairPrices: "योग्य किंमती.",
    heroDescription:
      "Mauli Provision मधून खरेदी करा, गुणवत्ता तपासा, कार्ट तयार करा आणि आम्ही तुमचे सामान पिकअपसाठी तयार ठेवू.",
    confidenceTitle: "विश्वासाने खरेदी करा",
    confidenceDescription:
      "धान्य, डाळी आणि इतर वस्तू खरेदी करण्यापूर्वी गुणवत्ता माहिती तपासा.",
    browseLabel: "पहा",
    popularLabel: "लोकप्रिय",
    whyLabel: "माउली का?",
    moreThanShopping: "फक्त ऑनलाइन खरेदीपेक्षा बरेच काही.",
    explore: "पहा →",
    checkQuality: "🔍 गुणवत्ता तपासा",
    rateProduct: "★ या उत्पादनाला रेट करा",
    packSize: "पॅकचा आकार",
    addToCart: "+ कार्टमध्ये जोडा",
    outOfStock: "स्टॉकमध्ये नाही",
    callAdmin: "📞 व्यवस्थापकाला कॉल करा",
    shopLabel: "खरेदी",
    noProducts: "उत्पादने सापडली नाहीत.",
    wholesale: "घाऊक किंमत",
    wholesaleAvailable: "जास्त प्रमाणासाठी उपलब्ध",
    bestBefore: "वापरण्याची अंतिम तारीख",
    qualityInformation: "गुणवत्ता माहिती",
    usersRated: "लोकांनी रेट केले",
    appearanceChecked: "✓ दिसण्याची तपासणी झाली",
    stockChecked: "✓ सध्याच्या स्टॉकची तपासणी झाली",
    storeRating: "✓ दुकानाची गुणवत्ता रेटिंग",
    privateReview: "या उत्पादनाला खाजगी रेटिंग द्या",
    privateReviewDescription:
      "प्रत्येक उत्पादनाला रेट करता येते. हे फक्त व्यवस्थापक पाहतील.",
    reviewSent: "तुमचे पुनरावलोकन दुकानाच्या टीमला पाठवले आहे.",
    improvePlaceholder: "आम्ही काय सुधारू शकतो?",
    sendReview: "खाजगी पुनरावलोकन पाठवा",
    recommendations: "तुम्हाला हेही लागेल",
    yourOrder: "तुमची ऑर्डर",
    yourCart: "तुमची कार्ट",
    pickupDetails: "पिकअप तपशील",
    easyPickupTitle: "सोपे पिकअप",
    easyPickupDescription:
      "तुमची कार्ट पाठवा. आम्ही ती पॅक करून तयार ठेवू. फक्त येऊन घेऊन जा.",
    emptyCart: "तुमची कार्ट रिकामी आहे",
    emptyCartDescription: "सुरुवात करण्यासाठी काही किराणा जोडा.",
    bulkHint: "जास्त प्रमाण? ऑर्डरसाठी दुकानाच्या टीमला कॉल करा.",
    estimatedTotal: "अंदाजे एकूण",
    pickupNote: "आम्ही तुमचे सामान पॅक करून पिकअपसाठी तयार ठेवू.",
    sendCart: "दुकानाला कार्ट पाठवा →",
    pickupIntro: "तुमचे तपशील द्या आणि आम्ही तुमची ऑर्डर तयार करू.",
    yourName: "तुमचे नाव",
    mobileNumber: "मोबाइल नंबर",
    orderNote: "आम्हाला काही सांगायचे आहे का?",
    confirmPickup: "पिकअप विनंती निश्चित करा",
    backToCart: "← कार्टवर परत जा",
    addVoiceNote: "आवाजाची नोंद जोडा",
    ordersLabel: "ऑर्डर",
    namePlaceholder: "तुमचे नाव लिहा",
    phonePlaceholder: "१० अंकी मोबाइल नंबर",
    notePlaceholder: "उदाहरण: कृपया गहू वेगळा ठेवा.",
    noOrders: "अजून ऑर्डर नाहीत.",
    readyNotice: "तुमची ऑर्डर पॅक करून पिकअपसाठी तयार आहे.",
    needReturn: "काही परत करायचे आहे का?",
    returnDescription:
      "उत्पादनाचा फोटो आणि तुमची समस्या पाठवा. दुकानाची टीम तुम्हाला कॉल करेल.",
    returnQueryPlaceholder: "काय समस्या झाली ते सांगा...",
    attachPhoto: "मिळालेल्या उत्पादनाचा फोटो जोडा",
    photoAttached: "फोटो जोडला आहे",
    sendReturnQuery: "परतीचा प्रश्न पाठवा",
  },
};

const ADMIN_TRANSLATIONS = {
  en: {
    categoryLabels: {
      All: "All",
      Grains: "Grains",
      Pulses: "Pulses",
      Grocery: "Grocery",
      Bakery: "Bakery",
      Snacks: "Snacks",
    },
    productNames: {
      Wheat: "Wheat",
      Jowar: "Jowar",
      Bajra: "Bajra",
      Rice: "Rice",
      Sugar: "Sugar",
      "Toor Dal": "Toor Dal",
      Bread: "Bread",
      Biscuits: "Biscuits",
    },
    adminTitle: "Store Admin",
    voiceTitle: "Talk to Mauli",
    voiceListening: "Listening...",
    voicePrompt: "Say: Add wheat at 52 rupees per kg",
    markOutStock: "Mark out of stock",
    markAvailable: "Mark available",
    dashboard: "Dashboard",
    products: "Products",
    ordersTab: "Orders",
    logout: "Log out",
    customerCall: "Customer call number",
    customerCallHint: "Customers can call this number to discuss an order.",
    manageProducts: "Manage products",
    viewOrders: "View orders",
    addProduct: "+ Add new product",
    privateFeedback: "PRIVATE FEEDBACK",
    improvementReviews: "Product improvement reviews",
    customerReturns: "CUSTOMER RETURNS",
    returnQueries: "Return queries",
    callCustomer: "Call customer",
    finance: "FINANCE",
    storeExpenses: "Store expenses",
    entries: "entries",
    orderValue: "Order value",
    expenses: "Expenses",
    net: "Net",
    addExpense: "Add expense",
    startPacking: "Start packing",
    markReady: "Mark ready",
    sendSMS: "Send SMS",
    whatsapp: "WhatsApp",
    markPickedUp: "Mark picked up",
    packForPickup: "Pack for pickup",
    noPickupRequests: "No pickup requests yet.",
    inStock: "In stock",
    outOfStock: "Out of stock",
    editProduct: "Edit product",
    newProduct: "Add product",
    productPhoto: "Product photo",
    productName: "Product name",
    category: "Category",
    retailPrice: "Retail price",
    wholesalePrice: "Wholesale price",
    availablePacks: "Available pack sizes",
    unit: "Unit",
    expiry: "Expiry / Best before",
    qualityInfo: "Quality information",
    saveProduct: "Save product",
    cancel: "Cancel",
    productInStock: "Product is currently in stock",
    showQuality: "Show quality check",
  },
  hi: {
    categoryLabels: {
      All: "सभी",
      Grains: "अनाज",
      Pulses: "दालें",
      Grocery: "किराना",
      Bakery: "बेकरी",
      Snacks: "नाश्ता",
    },
    productNames: {
      Wheat: "गेहूं",
      Jowar: "ज्वार",
      Bajra: "बाजरा",
      Rice: "चावल",
      Sugar: "चीनी",
      "Toor Dal": "तूर दाल",
      Bread: "ब्रेड",
      Biscuits: "बिस्कुट",
    },
    adminTitle: "दुकान व्यवस्थापक",
    voiceTitle: "माउली से बोलें",
    voiceListening: "सुन रहा है...",
    voicePrompt: "कहें: गेहूं को 52 रुपये प्रति किलो जोड़ें",
    markOutStock: "स्टॉक खत्म चिह्नित करें",
    markAvailable: "उपलब्ध चिह्नित करें",
    dashboard: "डैशबोर्ड",
    products: "उत्पाद",
    ordersTab: "ऑर्डर",
    logout: "लॉग आउट",
    customerCall: "ग्राहक कॉल नंबर",
    customerCallHint:
      "ऑर्डर पर बात करने के लिए ग्राहक इस नंबर पर कॉल कर सकते हैं।",
    manageProducts: "उत्पाद प्रबंधित करें",
    viewOrders: "ऑर्डर देखें",
    addProduct: "+ नया उत्पाद जोड़ें",
    privateFeedback: "निजी प्रतिक्रिया",
    improvementReviews: "उत्पाद सुधार समीक्षाएं",
    customerReturns: "ग्राहक वापसी",
    returnQueries: "वापसी के प्रश्न",
    callCustomer: "ग्राहक को कॉल करें",
    finance: "वित्त",
    storeExpenses: "दुकान खर्च",
    entries: "प्रविष्टियां",
    orderValue: "ऑर्डर मूल्य",
    expenses: "खर्च",
    net: "शुद्ध",
    addExpense: "खर्च जोड़ें",
    startPacking: "पैकिंग शुरू करें",
    markReady: "तैयार चिह्नित करें",
    sendSMS: "SMS भेजें",
    whatsapp: "WhatsApp",
    markPickedUp: "पिकअप पूरा करें",
    packForPickup: "पिकअप के लिए पैक करें",
    noPickupRequests: "अभी कोई पिकअप अनुरोध नहीं है।",
    inStock: "स्टॉक में",
    outOfStock: "स्टॉक में नहीं",
    editProduct: "उत्पाद संपादित करें",
    newProduct: "उत्पाद जोड़ें",
    productPhoto: "उत्पाद फोटो",
    productName: "उत्पाद का नाम",
    category: "श्रेणी",
    retailPrice: "खुदरा मूल्य",
    wholesalePrice: "थोक मूल्य",
    availablePacks: "उपलब्ध पैक आकार",
    unit: "इकाई",
    expiry: "समाप्ति / उपयोग की अंतिम तारीख",
    qualityInfo: "गुणवत्ता की जानकारी",
    saveProduct: "उत्पाद सहेजें",
    cancel: "रद्द करें",
    productInStock: "उत्पाद अभी स्टॉक में है",
    showQuality: "गुणवत्ता जांच दिखाएं",
  },
  mr: {
    categoryLabels: {
      All: "सर्व",
      Grains: "धान्य",
      Pulses: "डाळी",
      Grocery: "किराणा",
      Bakery: "बेकरी",
      Snacks: "खाद्यपदार्थ",
    },
    productNames: {
      Wheat: "गहू",
      Jowar: "ज्वारी",
      Bajra: "बाजरी",
      Rice: "तांदूळ",
      Sugar: "साखर",
      "Toor Dal": "तूर डाळ",
      Bread: "ब्रेड",
      Biscuits: "बिस्किटे",
    },
    adminTitle: "दुकान व्यवस्थापक",
    voiceTitle: "माउलीशी बोला",
    voiceListening: "ऐकत आहे...",
    voicePrompt: "म्हणा: 52 रुपये किलोने गहू जोडा",
    markOutStock: "स्टॉकमध्ये नाही असे चिन्हांकित करा",
    markAvailable: "उपलब्ध असे चिन्हांकित करा",
    dashboard: "डॅशबोर्ड",
    products: "उत्पादने",
    ordersTab: "ऑर्डर",
    logout: "लॉग आउट",
    customerCall: "ग्राहक कॉल नंबर",
    customerCallHint: "ऑर्डरबद्दल बोलण्यासाठी ग्राहक या नंबरवर कॉल करू शकतात.",
    manageProducts: "उत्पादने व्यवस्थापित करा",
    viewOrders: "ऑर्डर पहा",
    addProduct: "+ नवीन उत्पादन जोडा",
    privateFeedback: "खाजगी अभिप्राय",
    improvementReviews: "उत्पादन सुधारणा पुनरावलोकने",
    customerReturns: "ग्राहक परतावा",
    returnQueries: "परताव्याचे प्रश्न",
    callCustomer: "ग्राहकाला कॉल करा",
    finance: "आर्थिक नोंद",
    storeExpenses: "दुकानाचा खर्च",
    entries: "नोंदी",
    orderValue: "ऑर्डर मूल्य",
    expenses: "खर्च",
    net: "निव्वळ",
    addExpense: "खर्च जोडा",
    startPacking: "पॅकिंग सुरू करा",
    markReady: "तयार म्हणून चिन्हांकित करा",
    sendSMS: "SMS पाठवा",
    whatsapp: "WhatsApp",
    markPickedUp: "पिकअप पूर्ण करा",
    packForPickup: "पिकअपसाठी पॅक करा",
    noPickupRequests: "अजून पिकअप विनंत्या नाहीत.",
    inStock: "स्टॉकमध्ये",
    outOfStock: "स्टॉकमध्ये नाही",
    editProduct: "उत्पादन संपादित करा",
    newProduct: "उत्पादन जोडा",
    productPhoto: "उत्पादनाचा फोटो",
    productName: "उत्पादनाचे नाव",
    category: "वर्ग",
    retailPrice: "किरकोळ किंमत",
    wholesalePrice: "घाऊक किंमत",
    availablePacks: "उपलब्ध पॅक आकार",
    unit: "एकक",
    expiry: "मुदत / वापरण्याची अंतिम तारीख",
    qualityInfo: "गुणवत्ता माहिती",
    saveProduct: "उत्पादन जतन करा",
    cancel: "रद्द करा",
    productInStock: "उत्पादन सध्या स्टॉकमध्ये आहे",
    showQuality: "गुणवत्ता तपासणी दाखवा",
  },
};

const ADMIN_SESSION_KEY = "mauli_admin_authenticated";
const ADMIN_ACCESS_CODE =
  import.meta.env.VITE_ADMIN_ACCESS_CODE || "mauli-demo";

function getAppRoute() {
  const path = window.location.pathname.replace(/\/$/, "");

  if (path === "/admin") return "admin";

  return window.location.hash.replace("#", "");
}

function parseSpokenProductCommand(transcript) {
  const priceMatch = transcript.match(
    /(?:₹|rs\.?|rupees?|रु|रुपये)\s*(\d+)|(\d+)\s*(?:₹|rs\.?|rupees?|रु|रुपये)/i,
  );

  if (!priceMatch) return null;

  const price = Number(priceMatch[1] || priceMatch[2]);
  const rawName = transcript
    .replace(priceMatch[0], " ")
    .replace(/\b(add|create|new|product|please|at|for|kar|karo|karen)\b/gi, " ")
    .replace(/\b(कर|करा|जोड|जोडा|द्या|नवीन|उत्पादन)\b|अॅड/g, " ")
    .replace(/[^\p{L}\p{N}\s-]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!rawName) return null;

  const isBread = /bread|ब्रेड/i.test(rawName);
  const isPulse = /dal|डाळ|दाल/i.test(rawName);
  const isGrain =
    /wheat|गेहू|गहू|jowar|ज्वार|ज्वारी|bajra|बाजरा|बाजरी|rice|तांदूळ|चावल/i.test(
      rawName,
    );
  const category = isBread
    ? "Bakery"
    : isPulse
      ? "Pulses"
      : isGrain
        ? "Grains"
        : "Grocery";
  const unit = isBread ? "pack" : "kg";
  const name = rawName
    .split(" ")
    .map((word) =>
      /^[\u0000-\u007F]+$/.test(word)
        ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        : word,
    )
    .join(" ");

  return {
    name,
    category,
    price,
    wholesalePrice: "",
    unit,
    image: "",
    inStock: true,
    expiry: "",
    qualityCheck: true,
    quality: "",
    qualityScore: 4.5,
    ratingCount: "10k+",
    packOptions:
      unit === "kg"
        ? DEFAULT_PACK_OPTIONS
        : [{ label: "1 pack", multiplier: 1 }],
  };
}

/* =========================================================
   APP
========================================================= */

export default function App() {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("mauli_products");

    if (!saved) return INITIAL_PRODUCTS;

    return JSON.parse(saved).map((product) => ({
      ...product,
      packOptions:
        product.packOptions ||
        (["Wheat", "Jowar", "Bajra"].includes(product.name)
          ? GRAIN_PACK_OPTIONS
          : DEFAULT_PACK_OPTIONS),
    }));
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem("mauli_orders");

    return saved ? JSON.parse(saved) : [];
  });

  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem("mauli_reviews");

    return saved ? JSON.parse(saved) : [];
  });

  const [returnRequests, setReturnRequests] = useState(() => {
    const saved = localStorage.getItem("mauli_return_requests");

    return saved ? JSON.parse(saved) : [];
  });

  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("mauli_expenses");

    return saved ? JSON.parse(saved) : [];
  });

  const [cart, setCart] = useState([]);

  const [page, setPageState] = useState(() => {
    const route = getAppRoute();

    return ["products", "orders"].includes(route) ? route : "home";
  });

  const [language, setLanguage] = useState("en");

  const [category, setCategory] = useState("All");

  const [search, setSearch] = useState("");

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [showCart, setShowCart] = useState(false);

  const [showAdmin, setShowAdmin] = useState(false);

  const [showAdminLogin, setShowAdminLogin] = useState(false);

  const [adminAuthenticated, setAdminAuthenticated] = useState(
    () => sessionStorage.getItem(ADMIN_SESSION_KEY) === "true",
  );

  const [toast, setToast] = useState("");

  const [adminPhone, setAdminPhone] = useState(
    () => localStorage.getItem("mauli_admin_phone") || "",
  );

  const t = {
    ...TRANSLATIONS[language],
    ...CUSTOMER_TRANSLATIONS[language],
    ...ADMIN_TRANSLATIONS[language],
  };

  function setPage(nextPage) {
    setPageState(nextPage);
    window.history.pushState(
      {},
      "",
      nextPage === "home" ? "#" : `#${nextPage}`,
    );
  }

  function openAdmin() {
    if (adminAuthenticated) {
      setShowAdmin(true);
      return;
    }

    setShowAdminLogin(true);
  }

  function authenticateAdmin() {
    sessionStorage.setItem(ADMIN_SESSION_KEY, "true");
    setAdminAuthenticated(true);
    setShowAdminLogin(false);
    setShowAdmin(true);
  }

  function logoutAdmin() {
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
    setAdminAuthenticated(false);
    setShowAdmin(false);
  }

  useEffect(() => {
    const handleRouteChange = () => {
      const route = getAppRoute();

      if (route === "admin") {
        openAdmin();
        return;
      }

      setPageState(["products", "orders"].includes(route) ? route : "home");
    };

    handleRouteChange();

    window.addEventListener("popstate", handleRouteChange);
    window.addEventListener("hashchange", handleRouteChange);

    return () => {
      window.removeEventListener("popstate", handleRouteChange);
      window.removeEventListener("hashchange", handleRouteChange);
    };
  }, []);

  /* =======================================================
     LOCAL STORAGE
  ======================================================= */

  useEffect(() => {
    localStorage.setItem("mauli_products", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem("mauli_orders", JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem("mauli_reviews", JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem(
      "mauli_return_requests",
      JSON.stringify(returnRequests),
    );
  }, [returnRequests]);

  useEffect(() => {
    localStorage.setItem("mauli_expenses", JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem("mauli_admin_phone", adminPhone);
  }, [adminPhone]);

  /* =======================================================
     TOAST
  ======================================================= */

  function showToast(message) {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 2500);
  }

  /* =======================================================
     CART
  ======================================================= */

  function addToCart(product, selectedPack) {
    if (!product.inStock) {
      showToast("This product is currently out of stock.");

      return;
    }

    setCart((current) => {
      const pack =
        selectedPack || product.packOptions?.[0] || DEFAULT_PACK_OPTIONS[0];
      const cartKey = `${product.id}-${pack.label}`;
      const existing = current.find((item) => item.cartKey === cartKey);

      if (existing) {
        return current.map((item) =>
          item.cartKey === cartKey
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        );
      }

      return [
        ...current,
        {
          ...product,
          cartKey,
          packLabel: pack.label,
          packMultiplier: pack.multiplier,
          quantity: 1,
        },
      ];
    });

    showToast(`${product.name} added to cart`);
  }

  function changeQuantity(cartKey, amount) {
    setCart((current) =>
      current
        .map((item) =>
          item.cartKey === cartKey
            ? {
                ...item,
                quantity: item.quantity + amount,
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const cartTotal = cart.reduce(
    (total, item) =>
      total + item.price * (item.packMultiplier || 1) * item.quantity,
    0,
  );

  /* =======================================================
     FILTERING
  ======================================================= */

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search
      .toLocaleLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    return products.filter((product) => {
      const categoryMatch = category === "All" || product.category === category;
      const searchableProductText = [
        product.name,
        t.productNames[product.name],
        product.category,
        t.categoryLabels[product.category],
        product.unit,
        product.expiry,
        product.quality,
        ...(product.packOptions || []).map((pack) => pack.label),
      ]
        .filter(Boolean)
        .join(" ")
        .toLocaleLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

      const searchMatch = searchableProductText.includes(normalizedSearch);

      return categoryMatch && searchMatch;
    });
  }, [products, category, search, t]);

  /* =======================================================
     PRODUCTS
  ======================================================= */

  function addProduct(product) {
    setProducts((current) => [
      ...current,
      {
        ...product,
        id: Date.now(),
      },
    ]);

    showToast("Product added successfully!");
  }

  function updateOrder(orderId, status) {
    setOrders((current) =>
      current.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status,
              updatedAt: new Date().toLocaleString(),
            }
          : order,
      ),
    );

    showToast(`Order marked ${status.toLowerCase()}.`);
  }

  function updateProduct(updatedProduct) {
    setProducts((current) =>
      current.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product,
      ),
    );

    setSelectedProduct((current) =>
      current?.id === updatedProduct.id ? updatedProduct : current,
    );

    showToast("Product updated!");
  }

  /* =======================================================
     ORDERS
  ======================================================= */

  function createOrder(customerName, phone, note) {
    const order = {
      id: Date.now(),
      customerName,
      phone,
      note,
      items: cart,
      total: cartTotal,
      status: "Received",
      createdAt: new Date().toLocaleString(),
    };

    setOrders((current) => [...current, order]);

    setCart([]);

    setShowCart(false);

    showToast("Cart sent to Mauli Provision!");
  }

  function addReview(productId, customer, rating, reviewText) {
    setReviews((current) => [
      ...current,
      {
        id: Date.now(),
        productId,
        orderId: customer?.id || null,
        customerName: customer.customerName,
        phone: customer.phone,
        rating,
        reviewText,
        createdAt: new Date().toLocaleString(),
      },
    ]);

    showToast("Review sent privately to the store team.");
  }

  function createReturnRequest(order, itemId, query, image) {
    const item = order.items.find(
      (orderItem) =>
        orderItem.cartKey === itemId || String(orderItem.id) === String(itemId),
    );

    setReturnRequests((current) => [
      ...current,
      {
        id: Date.now(),
        orderId: order.id,
        customerName: order.customerName,
        phone: order.phone,
        itemName: item?.name || "Product",
        packLabel: item?.packLabel || item?.unit || "",
        query,
        image,
        status: "New",
        createdAt: new Date().toLocaleString(),
      },
    ]);

    showToast("Return request sent to the store team.");
  }

  function addExpense(description, amount, category) {
    setExpenses((current) => [
      ...current,
      {
        id: Date.now(),
        description,
        amount: Number(amount),
        category,
        createdAt: new Date().toLocaleString(),
      },
    ]);

    showToast("Expense added to the admin ledger.");
  }

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <>
      <Header
        search={search}
        setSearch={setSearch}
        cartCount={cartCount}
        setShowCart={setShowCart}
        setPage={setPage}
        language={language}
        setLanguage={setLanguage}
        t={t}
      />

      {page === "home" && (
        <Home
          products={products}
          setPage={setPage}
          setCategory={setCategory}
          addToCart={addToCart}
          cart={cart}
          changeQuantity={changeQuantity}
          setSelectedProduct={setSelectedProduct}
          t={t}
          adminPhone={adminPhone}
        />
      )}

      {page === "products" && (
        <ProductsPage
          products={filteredProducts}
          category={category}
          setCategory={setCategory}
          addToCart={addToCart}
          cart={cart}
          changeQuantity={changeQuantity}
          setSelectedProduct={setSelectedProduct}
          t={t}
          adminPhone={adminPhone}
        />
      )}

      {page === "orders" && (
        <OrdersPage
          orders={orders}
          t={t}
          createReturnRequest={createReturnRequest}
          returnRequests={returnRequests}
        />
      )}

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          products={products}
          close={() => setSelectedProduct(null)}
          addToCart={addToCart}
          setSelectedProduct={setSelectedProduct}
          adminPhone={adminPhone}
          orders={orders}
          reviews={reviews}
          addReview={addReview}
          t={t}
        />
      )}

      {showCart && (
        <CartDrawer
          cart={cart}
          total={cartTotal}
          changeQuantity={changeQuantity}
          close={() => setShowCart(false)}
          createOrder={createOrder}
          t={t}
        />
      )}

      {showAdminLogin && (
        <AdminLogin
          close={() => setShowAdminLogin(false)}
          authenticate={authenticateAdmin}
        />
      )}

      {showAdmin && adminAuthenticated && (
        <AdminPanel
          products={products}
          orders={orders}
          addProduct={addProduct}
          updateProduct={updateProduct}
          updateOrder={updateOrder}
          adminPhone={adminPhone}
          setAdminPhone={setAdminPhone}
          logout={logoutAdmin}
          reviews={reviews}
          returnRequests={returnRequests}
          expenses={expenses}
          addExpense={addExpense}
          t={t}
          language={language}
          close={() => setShowAdmin(false)}
        />
      )}

      {toast && <div className="toast">{toast}</div>}
    </>
  );
}

/* =========================================================
   HEADER
========================================================= */

function Header({
  search,
  setSearch,
  cartCount,
  setShowCart,
  setPage,
  language,
  setLanguage,
  t,
}) {
  const [showLanguages, setShowLanguages] = useState(false);
  const [searchListening, setSearchListening] = useState(false);

  function startVoiceSearch() {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice search requires Chrome or another supported browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = SPEECH_LOCALES[language] || "en-IN";
    recognition.interimResults = false;
    recognition.onstart = () => setSearchListening(true);
    recognition.onend = () => setSearchListening(false);
    recognition.onresult = (event) => {
      setSearch(event.results[0][0].transcript);
    };
    recognition.start();
  }

  return (
    <header className="header">
      <div className="header-inner">
        <div className="logo" onClick={() => setPage("home")}>
          <div className="logo-icon">म</div>

          <div>
            <div className="logo-name">Mauli Provision</div>

            <div className="logo-sub">{t.storeSubtitle}</div>
          </div>
        </div>

        <div className="search">
          <span>⌕</span>

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t.search}
          />

          <button
            className={
              searchListening ? "search-voice listening" : "search-voice"
            }
            onClick={startVoiceSearch}
            aria-label="Search by voice"
            title="Search by voice"
          >
            🎤
          </button>
        </div>

        <div className="header-actions">
          <div className="language-control">
            <button
              className="header-button language-button"
              onClick={() => setShowLanguages((current) => !current)}
              aria-label="Change language"
            >
              ◎ {LANGUAGES.find((item) => item.code === language).label}
            </button>
            {showLanguages && (
              <div className="language-menu">
                {LANGUAGES.map((item) => (
                  <button
                    key={item.code}
                    className={item.code === language ? "selected" : ""}
                    onClick={() => {
                      setLanguage(item.code);
                      setShowLanguages(false);
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            className="header-button orders-button"
            onClick={() => setPage("orders")}
          >
            🧾 <span>{t.ordersLabel}</span>
          </button>
          <button className="cart-button" onClick={() => setShowCart(true)}>
            🛒
            <span>{t.cart}</span>
            {cartCount > 0 && <b>{cartCount}</b>}
          </button>
        </div>
      </div>
    </header>
  );
}

/* =========================================================
   HOME
========================================================= */

function Home({
  products,
  setPage,
  setCategory,
  addToCart,
  cart,
  changeQuantity,
  setSelectedProduct,
  t,
  adminPhone,
}) {
  return (
    <main>
      <section className="hero">
        <div className="hero-content">
          <span className="hero-label">🏪 {t.localOnline}</span>

          <h1>
            {t.goodGroceries}
            <br />
            <span>{t.fairPrices}</span>
          </h1>

          <p>{t.heroDescription}</p>

          <button
            className="primary-button"
            onClick={() => setPage("products")}
          >
            {t.shop}
          </button>
        </div>

        <div className="hero-card">
          <div className="hero-card-icon">🌾</div>

          <strong>{t.confidenceTitle}</strong>

          <p>{t.confidenceDescription}</p>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">{t.browseLabel}</span>

            <h2>{t.browse}</h2>
          </div>
        </div>

        <div className="category-grid">
          {CATEGORIES.slice(1).map((item) => (
            <button
              key={item}
              className="category-card"
              onClick={() => {
                setCategory(item);
                setPage("products");
              }}
            >
              <span>
                {item === "Grains" && "🌾"}

                {item === "Pulses" && "🫘"}

                {item === "Grocery" && "🛍️"}

                {item === "Bakery" && "🍞"}

                {item === "Snacks" && "🍪"}
              </span>

              <strong>{t.categoryLabels[item] || item}</strong>

              <small>{t.explore}</small>
            </button>
          ))}
        </div>
      </section>

      <section className="section soft-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">{t.popularLabel}</span>

            <h2>{t.popular}</h2>
          </div>

          <button className="text-button" onClick={() => setPage("products")}>
            {t.viewAll}
          </button>
        </div>

        <div className="product-grid">
          {products.slice(0, 4).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
              cart={cart}
              changeQuantity={changeQuantity}
              setSelectedProduct={setSelectedProduct}
              adminPhone={adminPhone}
              t={t}
            />
          ))}
        </div>
      </section>

      <section className="why-section">
        <div>
          <span className="eyebrow">{t.whyLabel}</span>

          <h2>{t.moreThanShopping}</h2>
        </div>

        <div className="why-grid">
          <div>
            <span>🔍</span>

            <h3>{t.checkQuality.replace("🔍 ", "")}</h3>

            <p>
              See quality information for grains, pulses and other products.
            </p>
          </div>

          <div>
            <span>💬</span>

            <h3>{t.callAdmin.replace("📞 ", "")}</h3>

            <p>{t.bulkHint}</p>
          </div>

          <div>
            <span>📦</span>

            <h3>{t.easyPickupTitle}</h3>

            <p>{t.easyPickupDescription}</p>
          </div>
        </div>
      </section>
    </main>
  );
}

/* =========================================================
   PRODUCTS PAGE
========================================================= */

function ProductsPage({
  products,
  category,
  setCategory,
  addToCart,
  cart,
  changeQuantity,
  setSelectedProduct,
  t,
  adminPhone,
}) {
  return (
    <main className="products-page">
      <section className="section">
        <span className="eyebrow">{t.shopLabel}</span>

        <h1 className="page-title">{t.shopLabel}</h1>

        <div className="filter-row">
          {CATEGORIES.map((item) => (
            <button
              key={item}
              className={category === item ? "filter active" : "filter"}
              onClick={() => setCategory(item)}
            >
              {t.categoryLabels[item] || item}
            </button>
          ))}
        </div>

        <div className="product-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
              cart={cart}
              changeQuantity={changeQuantity}
              setSelectedProduct={setSelectedProduct}
              adminPhone={adminPhone}
              t={t}
            />
          ))}
        </div>

        {products.length === 0 && <div className="empty">{t.noProducts}</div>}
      </section>
    </main>
  );
}

/* =========================================================
   PRODUCT CARD
========================================================= */

function ProductCard({
  product,
  addToCart,
  cart,
  changeQuantity,
  setSelectedProduct,
  adminPhone,
  t,
}) {
  const packOptions = product.packOptions || DEFAULT_PACK_OPTIONS;
  const [selectedPack, setSelectedPack] = useState(packOptions[0]);
  const cartKey = `${product.id}-${selectedPack.label}`;
  const quantity = cart.find((item) => item.cartKey === cartKey)?.quantity || 0;

  return (
    <article className="product-card">
      <div
        className="product-image"
        onClick={() => setSelectedProduct(product)}
      >
        <img src={product.image} alt={product.name} />

        {!product.inStock && <span className="stock-badge">Out of stock</span>}
      </div>

      <div className="product-body">
        <span className="product-category">
          {t.categoryLabels[product.category] || product.category}
        </span>

        <h3>{t.productNames[product.name] || product.name}</h3>

        <div className="product-price">
          {product.wholesalePrice ? (
            <>
              <del>₹{product.price}</del>
              <strong>₹{product.wholesalePrice}</strong>
            </>
          ) : (
            <strong>₹{product.price}</strong>
          )}
          <small> / {product.unit}</small>
        </div>

        {product.expiry && (
          <p className="expiry">Best before: {product.expiry}</p>
        )}

        {product.qualityCheck && (
          <button
            className="quality-link"
            onClick={() => setSelectedProduct(product)}
          >
            {t.checkQuality}
          </button>
        )}

        <button
          className="quality-link review-link"
          onClick={() => setSelectedProduct(product)}
        >
          {t.rateProduct}
        </button>

        {packOptions.length > 1 && (
          <label className="pack-picker">
            <span>{t.packSize}</span>
            <select
              value={selectedPack.label}
              onChange={(event) =>
                setSelectedPack(
                  packOptions.find((pack) => pack.label === event.target.value),
                )
              }
            >
              {packOptions.map((pack) => (
                <option key={pack.label} value={pack.label}>
                  {pack.label} · ₹{product.price * pack.multiplier}
                </option>
              ))}
            </select>
          </label>
        )}

        {quantity > 0 ? (
          <div className="card-quantity" aria-label={`Quantity: ${quantity}`}>
            <button
              type="button"
              onClick={() => changeQuantity(cartKey, -1)}
              aria-label={`Decrease ${product.name} quantity`}
            >
              −
            </button>
            <strong>{quantity}</strong>
            <button
              type="button"
              onClick={() => addToCart(product, selectedPack)}
              aria-label={`Increase ${product.name} quantity`}
            >
              +
            </button>
          </div>
        ) : (
          <button
            className="add-button"
            disabled={!product.inStock}
            onClick={() => addToCart(product, selectedPack)}
          >
            {product.inStock ? t.addToCart : t.outOfStock}
          </button>
        )}

        <button
          className="call-admin-button"
          disabled={!adminPhone}
          onClick={() => {
            window.location.href = `tel:${adminPhone}`;
          }}
          title={adminPhone ? t.callAdmin : "Admin phone not configured"}
        >
          {t.callAdmin}
        </button>
      </div>
    </article>
  );
}

/* =========================================================
   PRODUCT MODAL
========================================================= */

function ProductModal({
  product,
  products,
  close,
  addToCart,
  setSelectedProduct,
  adminPhone,
  orders,
  reviews,
  addReview,
  t,
}) {
  const recommended = (RECOMMENDATIONS[product.name] || [])
    .map((name) => products.find((item) => item.name === name))
    .filter(Boolean);

  const purchasedOrder = orders.find((order) =>
    order.items.some((item) => item.id === product.id),
  );
  const existingReview = reviews.find(
    (review) =>
      review.productId === product.id &&
      purchasedOrder &&
      review.orderId === purchasedOrder.id,
  );
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState("");

  return (
    <div className="modal-backdrop" onClick={close}>
      <div className="product-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={close}>
          ×
        </button>

        <img className="modal-image" src={product.image} alt={product.name} />

        <div className="modal-content">
          <span className="product-category">
            {t.categoryLabels[product.category] || product.category}
          </span>

          <h2>{t.productNames[product.name] || product.name}</h2>

          <div className="modal-price">
            {product.wholesalePrice ? (
              <>
                <del>₹{product.price}</del>
                <strong>₹{product.wholesalePrice}</strong>
              </>
            ) : (
              <strong>₹{product.price}</strong>
            )}
            <small> / {product.unit}</small>
          </div>

          {product.wholesalePrice && (
            <div className="wholesale-box">
              <strong>
                {t.wholesale}: ₹{product.wholesalePrice}
              </strong>

              <span>{t.wholesaleAvailable}</span>
            </div>
          )}

          {product.expiry && (
            <p className="expiry large">
              📅 {t.bestBefore}: {product.expiry}
            </p>
          )}

          {product.qualityCheck && (
            <div className="quality-box">
              <div className="quality-header">
                <strong>{t.qualityInformation}</strong>

                <span>
                  ⭐ {product.qualityScore}
                  /5
                </span>
              </div>

              <div className="rating-count">
                {product.ratingCount || "10k+"} {t.usersRated}
              </div>

              <p>{product.quality}</p>

              <div className="quality-points">
                <span>{t.appearanceChecked}</span>

                <span>{t.stockChecked}</span>

                <span>{t.storeRating}</span>
              </div>
            </div>
          )}

          <div className="private-review-box">
            <div>
              <strong>{t.privateReview}</strong>
              <span>{t.privateReviewDescription}</span>
            </div>

            {existingReview ? (
              <p className="review-sent">{t.reviewSent}</p>
            ) : (
              <>
                <div
                  className="star-picker"
                  aria-label="Rate this product out of five stars"
                >
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      className={star <= reviewRating ? "selected" : ""}
                      onClick={() => setReviewRating(star)}
                      aria-label={`${star} star${star === 1 ? "" : "s"}`}
                    >
                      ★
                    </button>
                  ))}
                </div>
                <textarea
                  value={reviewText}
                  onChange={(event) => setReviewText(event.target.value)}
                  placeholder={t.improvePlaceholder}
                />
                <button
                  type="button"
                  className="secondary-button"
                  disabled={!reviewText.trim()}
                  onClick={() => {
                    addReview(
                      product.id,
                      purchasedOrder || {
                        customerName: "Customer",
                        phone: "",
                      },
                      reviewRating,
                      reviewText.trim(),
                    );
                    setReviewText("");
                  }}
                >
                  {t.sendReview}
                </button>
              </>
            )}
          </div>

          <div className="modal-actions">
            <button
              className="primary-button"
              disabled={!product.inStock}
              onClick={() => {
                addToCart(product);

                close();
              }}
            >
              {product.inStock ? t.addToCart : t.outOfStock}
            </button>

            <button
              className="secondary-button call-admin-button"
              disabled={!adminPhone}
              onClick={() => {
                window.location.href = `tel:${adminPhone}`;
              }}
            >
              {t.callAdmin}
            </button>
          </div>

          {recommended.length > 0 && (
            <div className="recommendations">
              <h3>{t.recommendations}</h3>

              <div className="mini-products">
                {recommended.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedProduct(item)}
                  >
                    <img src={item.image} alt={item.name} />

                    <span>{item.name}</span>

                    <strong>₹{item.price}</strong>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   CART
========================================================= */

function CartDrawer({ cart, total, changeQuantity, close, createOrder, t }) {
  const [step, setStep] = useState("cart");

  const [name, setName] = useState("");

  const [phone, setPhone] = useState("");

  const [note, setNote] = useState("");

  const [listening, setListening] = useState(false);

  function addVoiceNote() {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice notes require Chrome or another supported browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.interimResults = false;
    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onresult = (event) => {
      const spokenNote = event.results[0][0].transcript;
      setNote((current) => (current ? `${current} ${spokenNote}` : spokenNote));
    };
    recognition.start();
  }

  return (
    <div className="drawer-backdrop" onClick={close}>
      <aside className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <div>
            <span className="eyebrow">{t.yourOrder}</span>

            <h2>{step === "cart" ? t.yourCart : t.pickupDetails}</h2>
          </div>

          <button className="close-button" onClick={close}>
            ×
          </button>
        </div>

        {step === "cart" ? (
          <>
            {cart.length === 0 ? (
              <div className="empty-cart">
                <span>🛒</span>

                <h3>{t.emptyCart}</h3>

                <p>{t.emptyCartDescription}</p>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <div className="cart-item" key={item.id}>
                      <img src={item.image} alt={item.name} />

                      <div className="cart-item-info">
                        <strong>{item.name}</strong>

                        <span>
                          {item.packLabel || item.unit} · ₹
                          {item.price * (item.packMultiplier || 1)}
                        </span>

                        <div className="quantity">
                          <button
                            onClick={() => changeQuantity(item.cartKey, -1)}
                          >
                            −
                          </button>

                          <b>{item.quantity}</b>

                          <button
                            onClick={() => changeQuantity(item.cartKey, 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <strong>
                        ₹
                        {item.price *
                          (item.packMultiplier || 1) *
                          item.quantity}
                      </strong>
                    </div>
                  ))}
                </div>

                <div className="cart-recommendation">💡 {t.bulkHint}</div>

                <div className="cart-total">
                  <span>{t.estimatedTotal}</span>

                  <strong>₹{total}</strong>
                </div>

                <div className="pickup-note">📦 {t.pickupNote}</div>

                <button
                  className="primary-button full"
                  onClick={() => setStep("details")}
                >
                  {t.sendCart}
                </button>
              </>
            )}
          </>
        ) : (
          <div className="pickup-form">
            <p className="form-intro">{t.pickupIntro}</p>

            <label>{t.yourName}</label>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t.namePlaceholder}
            />

            <label>{t.mobileNumber}</label>

            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={t.phonePlaceholder}
            />

            <label>{t.orderNote}</label>

            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder={t.notePlaceholder}
            />

            <button className="voice-note-button" onClick={addVoiceNote}>
              🎤 {listening ? "Listening..." : t.addVoiceNote}
            </button>

            <div className="order-summary">
              <span>{cart.length} items</span>

              <strong>₹{total}</strong>
            </div>

            <button
              className="primary-button full"
              disabled={!name || !phone}
              onClick={() => createOrder(name, phone, note)}
            >
              {t.confirmPickup}
            </button>

            <button className="back-button" onClick={() => setStep("cart")}>
              {t.backToCart}
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}

/* =========================================================
   ADMIN ACCESS
========================================================= */

function AdminLogin({ close, authenticate }) {
  const [accessCode, setAccessCode] = useState("");
  const [error, setError] = useState("");

  function submit(event) {
    event.preventDefault();

    if (accessCode !== ADMIN_ACCESS_CODE) {
      setError("That access code is not correct.");
      return;
    }

    authenticate();
  }

  return (
    <div className="modal-backdrop" onClick={close}>
      <form
        className="admin-login"
        onSubmit={submit}
        onClick={(event) => event.stopPropagation()}
      >
        <button className="close-button" type="button" onClick={close}>
          ×
        </button>
        <span className="eyebrow">RESTRICTED AREA</span>
        <h2>Admin sign in</h2>
        <p>Enter the store admin access code to open the board.</p>
        <label htmlFor="admin-access-code">Access code</label>
        <input
          id="admin-access-code"
          type="password"
          value={accessCode}
          onChange={(event) => {
            setAccessCode(event.target.value);
            setError("");
          }}
          autoFocus
          required
        />
        {error && <span className="admin-login-error">{error}</span>}
        <button className="primary-button full" type="submit">
          Open admin board
        </button>
      </form>
    </div>
  );
}

/* =========================================================
   ADMIN PANEL
========================================================= */

function AdminPanel({
  products,
  orders,
  addProduct,
  updateProduct,
  updateOrder,
  adminPhone,
  setAdminPhone,
  logout,
  reviews,
  returnRequests,
  expenses,
  addExpense,
  t,
  language,
  close,
}) {
  const [tab, setTab] = useState("dashboard");

  const [editing, setEditing] = useState(null);

  const [adding, setAdding] = useState(false);

  const [listening, setListening] = useState(false);

  const [voiceProduct, setVoiceProduct] = useState(null);

  const [lastVoiceTranscript, setLastVoiceTranscript] = useState("");

  const [manualVoiceCommand, setManualVoiceCommand] = useState("");

  function notifyCustomer(order, channel) {
    const message = `Mauli Provision: Your order #${String(order.id).slice(-5)} is ready for pickup.`;
    const phone = order.phone.replace(/\D/g, "");
    const url =
      channel === "whatsapp"
        ? `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
        : `sms:${phone}?body=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
  }

  function handleVoiceCommand(text) {
    setLastVoiceTranscript(text);

    const spokenText = text.toLowerCase();
    const requestedProduct = products.find((product) =>
      spokenText.includes(product.name.toLowerCase()),
    );

    if (
      requestedProduct &&
      /out of stock|no stock|unavailable|स्टॉकमध्ये नाही|स्टॉकमध्ये उपलब्ध नाही/.test(
        spokenText,
      )
    ) {
      updateProduct({ ...requestedProduct, inStock: false });
      alert(`${requestedProduct.name} marked as out of stock.`);
      return true;
    }

    const productDraft = parseSpokenProductCommand(text);

    if (productDraft) {
      setVoiceProduct(productDraft);
      return true;
    }

    return false;
  }

  function submitManualVoiceCommand(event) {
    event.preventDefault();

    if (!manualVoiceCommand.trim()) return;

    const understood = handleVoiceCommand(manualVoiceCommand.trim());

    if (!understood) {
      alert(
        "Include a price and product name, for example: 44 rs brown bread add kar",
      );
    }
  }

  function startVoice() {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice input is not supported in this browser. Please use Chrome.");

      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = SPEECH_LOCALES[language] || "en-IN";

    recognition.interimResults = false;

    recognition.onstart = () => setListening(true);

    recognition.onend = () => setListening(false);

    recognition.onerror = (event) => {
      setListening(false);
      alert(
        `Voice input error: ${event.error}. You can type the command below.`,
      );
    };

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;

      if (!handleVoiceCommand(text)) {
        alert(
          `I heard: "${text}". Include a price and product name to add a listing.`,
        );
      }
    };

    recognition.start();
  }

  return (
    <div className="admin-backdrop">
      <div className="admin-panel">
        <div className="admin-topbar">
          <div>
            <span className="eyebrow">MAULI PROVISION</span>

            <h2>{t.adminTitle}</h2>
          </div>

          <button className="close-button" onClick={close}>
            ×
          </button>
          <button className="admin-logout" onClick={logout}>
            {t.logout}
          </button>
        </div>

        <div className="admin-nav">
          <button
            className={tab === "dashboard" ? "active" : ""}
            onClick={() => setTab("dashboard")}
          >
            {t.dashboard}
          </button>

          <button
            className={tab === "products" ? "active" : ""}
            onClick={() => setTab("products")}
          >
            {t.products}
          </button>

          <button
            className={tab === "orders" ? "active" : ""}
            onClick={() => setTab("orders")}
          >
            {t.ordersTab}
          </button>
        </div>

        {tab === "dashboard" && (
          <div className="admin-dashboard">
            <button
              className={listening ? "voice-card listening" : "voice-card"}
              onClick={startVoice}
            >
              <span>🎤</span>

              <div>
                <strong>{listening ? t.voiceListening : t.voiceTitle}</strong>

                <p>{t.voicePrompt}</p>
                {lastVoiceTranscript && (
                  <small className="voice-transcript">
                    Heard: {lastVoiceTranscript}
                  </small>
                )}
              </div>
            </button>

            <form
              className="voice-command-fallback"
              onSubmit={submitManualVoiceCommand}
            >
              <input
                value={manualVoiceCommand}
                onChange={(event) => setManualVoiceCommand(event.target.value)}
                placeholder="Or type: 44 rs brown bread add kar"
              />
              <button className="small-button" type="submit">
                Create draft
              </button>
            </form>

            {voiceProduct && (
              <div className="voice-product-backdrop">
                <div className="voice-product-dialog">
                  <div className="voice-product-heading">
                    <div>
                      <span className="eyebrow">VOICE PRODUCT</span>
                      <h3>{t.newProduct}</h3>
                    </div>
                    <button
                      className="close-button"
                      onClick={() => setVoiceProduct(null)}
                    >
                      ×
                    </button>
                  </div>
                  <p className="voice-product-help">
                    Add a photo of the product before saving this listing.
                  </p>
                  <ProductEditor
                    product={voiceProduct}
                    onSave={(product) => {
                      if (!product.image) {
                        alert("Please add a product photo before saving.");
                        return;
                      }
                      addProduct(product);
                      setVoiceProduct(null);
                    }}
                    onCancel={() => setVoiceProduct(null)}
                    t={t}
                  />
                </div>
              </div>
            )}

            <div className="admin-contact-settings">
              <div>
                <strong>{t.customerCall}</strong>
                <span>{t.customerCallHint}</span>
              </div>
              <input
                type="tel"
                value={adminPhone}
                onChange={(event) => setAdminPhone(event.target.value)}
                placeholder="Example: +91 98765 43210"
              />
            </div>

            <div className="admin-action-grid">
              <button onClick={() => setTab("products")}>
                <span>📦</span>
                Manage products
              </button>

              <button onClick={() => setTab("orders")}>
                <span>🧾</span>
                View orders
              </button>
            </div>

            <div className="stats-grid">
              <div>
                <strong>{products.length}</strong>

                <span>{t.products}</span>
              </div>

              <div>
                <strong>{products.filter((p) => p.inStock).length}</strong>

                <span>{t.inStock}</span>
              </div>

              <div>
                <strong>{products.filter((p) => !p.inStock).length}</strong>

                <span>{t.outOfStock}</span>
              </div>

              <div>
                <strong>{orders.length}</strong>

                <span>{t.ordersTab}</span>
              </div>
            </div>

            <ExpenseTracker
              orders={orders}
              expenses={expenses}
              addExpense={addExpense}
              t={t}
            />
          </div>
        )}

        {tab === "products" && (
          <div className="admin-products">
            <button className="primary-button" onClick={() => setAdding(true)}>
              {t.addProduct}
            </button>

            {adding && (
              <ProductEditor
                onSave={(product) => {
                  addProduct(product);

                  setAdding(false);
                }}
                onCancel={() => setAdding(false)}
                t={t}
              />
            )}

            <div className="admin-product-list">
              {products.map((product) => (
                <div className="admin-product" key={product.id}>
                  <img src={product.image} alt={product.name} />

                  <div className="admin-product-info">
                    <strong>
                      {t.productNames[product.name] || product.name}
                    </strong>

                    <span>
                      ₹{product.price} / {product.unit}
                    </span>

                    <span
                      className={product.inStock ? "in-stock" : "out-stock"}
                    >
                      {product.inStock ? `● ${t.inStock}` : `● ${t.outOfStock}`}
                    </span>
                  </div>

                  <button
                    className="small-button"
                    onClick={() =>
                      updateProduct({
                        ...product,
                        inStock: !product.inStock,
                      })
                    }
                  >
                    {product.inStock ? t.markOutStock : t.markAvailable}
                  </button>

                  <button
                    className="small-button"
                    onClick={() => setEditing(product)}
                  >
                    {t.editProduct}
                  </button>
                </div>
              ))}
            </div>

            {editing && (
              <ProductEditor
                product={editing}
                onSave={(product) => {
                  updateProduct(product);

                  setEditing(null);
                }}
                onCancel={() => setEditing(null)}
                t={t}
              />
            )}

            {reviews.length > 0 && (
              <section className="admin-feedback">
                <div className="admin-feedback-heading">
                  <div>
                    <span className="eyebrow">{t.privateFeedback}</span>
                    <h3>{t.improvementReviews}</h3>
                  </div>
                  <strong>{reviews.length}</strong>
                </div>
                {reviews.map((review) => {
                  const reviewedProduct = products.find(
                    (product) => product.id === review.productId,
                  );

                  return (
                    <div className="admin-review" key={review.id}>
                      <div>
                        <strong>{reviewedProduct?.name || "Product"}</strong>
                        <span>
                          {review.customerName} · {review.phone}
                        </span>
                      </div>
                      <span className="review-stars">
                        {"★".repeat(review.rating)}
                        {"☆".repeat(5 - review.rating)}
                      </span>
                      <p>{review.reviewText}</p>
                    </div>
                  );
                })}
              </section>
            )}
          </div>
        )}

        {tab === "orders" && (
          <div className="admin-order-list">
            {orders.length === 0 ? (
              <div className="empty">{t.noPickupRequests}</div>
            ) : (
              orders.map((order) => (
                <div className="admin-order admin-order-detail" key={order.id}>
                  <div className="order-heading">
                    <strong>#{String(order.id).slice(-5)}</strong>
                    <span className="status">{order.status}</span>
                  </div>

                  <div>
                    <strong>{order.customerName}</strong>
                    <span>{order.phone}</span>
                    <span>{order.note || "No pickup note"}</span>
                  </div>

                  <div className="packing-list">
                    <strong>{t.packForPickup}</strong>
                    {order.items.map((item) => (
                      <span key={item.cartKey || item.id}>
                        {item.quantity} × {item.name} (
                        {item.packLabel || item.unit})
                      </span>
                    ))}
                    <strong>Total: ₹{order.total}</strong>
                  </div>

                  <div className="order-actions">
                    {order.status === "Received" && (
                      <button
                        className="small-button"
                        onClick={() => updateOrder(order.id, "Packing")}
                      >
                        {t.startPacking}
                      </button>
                    )}
                    {order.status === "Packing" && (
                      <button
                        className="primary-button"
                        onClick={() => updateOrder(order.id, "Ready")}
                      >
                        {t.markReady}
                      </button>
                    )}
                    {order.status === "Ready" && (
                      <>
                        <button
                          className="small-button"
                          onClick={() => notifyCustomer(order, "sms")}
                        >
                          {t.sendSMS}
                        </button>
                        <button
                          className="small-button"
                          onClick={() => notifyCustomer(order, "whatsapp")}
                        >
                          WhatsApp
                        </button>
                        <button
                          className="small-button"
                          onClick={() => updateOrder(order.id, "Picked up")}
                        >
                          {t.markPickedUp}
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))
            )}

            {returnRequests.length > 0 && (
              <section className="return-admin-list">
                <div className="admin-feedback-heading">
                  <div>
                    <span className="eyebrow">{t.customerReturns}</span>
                    <h3>{t.returnQueries}</h3>
                  </div>
                  <strong>{returnRequests.length}</strong>
                </div>
                {returnRequests.map((request) => (
                  <div className="return-admin-card" key={request.id}>
                    {request.image && (
                      <img
                        src={request.image}
                        alt="Customer received product"
                      />
                    )}
                    <div className="return-admin-info">
                      <strong>
                        {request.itemName}{" "}
                        {request.packLabel && `(${request.packLabel})`}
                      </strong>
                      <span>
                        {request.customerName} · {request.phone}
                      </span>
                      <p>{request.query}</p>
                    </div>
                    <button
                      className="small-button"
                      onClick={() => {
                        window.location.href = `tel:${request.phone}`;
                      }}
                    >
                      {t.callCustomer}
                    </button>
                  </div>
                ))}
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function ExpenseTracker({ orders, expenses, addExpense, t }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Stock purchase");
  const revenue = orders.reduce(
    (total, order) => total + Number(order.total || 0),
    0,
  );
  const expenseTotal = expenses.reduce(
    (total, expense) => total + Number(expense.amount || 0),
    0,
  );

  function submitExpense(event) {
    event.preventDefault();

    if (!description.trim() || !Number(amount)) return;

    addExpense(description.trim(), amount, category);
    setDescription("");
    setAmount("");
  }

  return (
    <section className="expense-tracker">
      <div className="admin-feedback-heading">
        <div>
          <span className="eyebrow">{t.finance}</span>
          <h3>{t.storeExpenses}</h3>
        </div>
        <strong>
          {expenses.length} {t.entries}
        </strong>
      </div>

      <div className="finance-summary">
        <div>
          <span>{t.orderValue}</span>
          <strong>₹{revenue}</strong>
        </div>
        <div>
          <span>{t.expenses}</span>
          <strong>₹{expenseTotal}</strong>
        </div>
        <div>
          <span>{t.net}</span>
          <strong>₹{revenue - expenseTotal}</strong>
        </div>
      </div>

      <form className="expense-form" onSubmit={submitExpense}>
        <input
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Expense description"
          required
        />
        <input
          type="number"
          min="1"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          placeholder="Amount ₹"
          required
        />
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          <option>Stock purchase</option>
          <option>Packaging</option>
          <option>Delivery</option>
          <option>Store maintenance</option>
          <option>Other</option>
        </select>
        <button className="primary-button" type="submit">
          {t.addExpense}
        </button>
      </form>

      {expenses.length > 0 && (
        <div className="expense-list">
          {expenses
            .slice()
            .reverse()
            .map((expense) => (
              <div className="expense-row" key={expense.id}>
                <span>
                  {expense.description} · {expense.category}
                </span>
                <strong>₹{expense.amount}</strong>
              </div>
            ))}
        </div>
      )}
    </section>
  );
}

/* =========================================================
   PRODUCT EDITOR
========================================================= */

function ProductEditor({ product, onSave, onCancel, t }) {
  const [form, setForm] = useState(() =>
    product
      ? { ...product, packOptions: product.packOptions || DEFAULT_PACK_OPTIONS }
      : {
          name: "",
          category: "Grocery",
          price: "",
          wholesalePrice: "",
          unit: "kg",
          image: "",
          inStock: true,
          expiry: "",
          qualityCheck: true,
          quality: "",
          qualityScore: 4.5,
          ratingCount: "10k+",
          packOptions: DEFAULT_PACK_OPTIONS,
        },
  );

  const [listening, setListening] = useState(false);

  function update(key, value) {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function togglePack(pack) {
    setForm((current) => {
      const currentPacks = current.packOptions || [];
      const hasPack = currentPacks.some((item) => item.label === pack.label);
      const nextPacks = hasPack
        ? currentPacks.filter((item) => item.label !== pack.label)
        : [...currentPacks, pack];

      return {
        ...current,
        packOptions: nextPacks.length > 0 ? nextPacks : DEFAULT_PACK_OPTIONS,
      };
    });
  }

  /* =======================================================
     VOICE
  ======================================================= */

  function startVoice() {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice input requires Chrome.");

      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-IN";

    recognition.interimResults = false;

    recognition.onstart = () => setListening(true);

    recognition.onend = () => setListening(false);

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;

      setForm((current) => ({
        ...current,
        quality: current.quality ? `${current.quality} ${text}` : text,
      }));
    };

    recognition.start();
  }

  /* =======================================================
     IMAGE
  ======================================================= */

  function handleImage(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      update("image", reader.result);
    };

    reader.readAsDataURL(file);
  }

  return (
    <div className="editor">
      <div className="editor-header">
        <h3>{product ? t.editProduct : t.newProduct}</h3>

        <button className="voice-button" onClick={startVoice}>
          🎤 {listening ? "Listening..." : "Speak"}
        </button>
      </div>

      <label>{t.productPhoto}</label>

      <label className="upload">
        {form.image ? (
          <img src={form.image} alt="Preview" />
        ) : (
          <>
            <span>📷</span>

            <strong>Take / upload photo</strong>
          </>
        )}

        <input
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleImage}
        />
      </label>

      <label>{t.productName}</label>

      <input
        value={form.name}
        onChange={(e) => update("name", e.target.value)}
        placeholder="Example: Wheat"
      />

      <label>{t.category}</label>

      <select
        value={form.category}
        onChange={(e) => update("category", e.target.value)}
      >
        {CATEGORIES.slice(1).map((category) => (
          <option key={category} value={category}>
            {t.categoryLabels[category] || category}
          </option>
        ))}
      </select>

      <div className="two-inputs">
        <div>
          <label>{t.retailPrice}</label>

          <input
            type="number"
            value={form.price}
            onChange={(e) => update("price", Number(e.target.value))}
            placeholder="₹"
          />
        </div>

        <div>
          <label>{t.wholesalePrice}</label>

          <input
            type="number"
            value={form.wholesalePrice}
            onChange={(e) => update("wholesalePrice", Number(e.target.value))}
            placeholder="₹"
          />
        </div>
      </div>

      <label>{t.availablePacks}</label>

      <div className="pack-options-editor">
        {GRAIN_PACK_OPTIONS.map((pack) => (
          <label className="checkbox-row" key={pack.label}>
            <input
              type="checkbox"
              checked={(form.packOptions || []).some(
                (item) => item.label === pack.label,
              )}
              onChange={() => togglePack(pack)}
            />
            {pack.label}
          </label>
        ))}
      </div>

      <div className="two-inputs">
        <div>
          <label>{t.unit}</label>

          <select
            value={form.unit}
            onChange={(e) => update("unit", e.target.value)}
          >
            <option>kg</option>

            <option>gram</option>

            <option>pack</option>

            <option>piece</option>

            <option>litre</option>

            <option>ml</option>
          </select>
        </div>

        <div>
          <label>{t.expiry}</label>

          <input
            value={form.expiry}
            onChange={(e) => update("expiry", e.target.value)}
            placeholder="Example: Dec 2026"
          />
        </div>
      </div>

      <label>{t.qualityInfo}</label>

      <textarea
        value={form.quality}
        onChange={(e) => update("quality", e.target.value)}
        placeholder="Describe the quality..."
      />

      <label className="checkbox-row">
        <input
          type="checkbox"
          checked={form.qualityCheck}
          onChange={(e) => update("qualityCheck", e.target.checked)}
        />
        {t.showQuality}
      </label>

      <label className="checkbox-row">
        <input
          type="checkbox"
          checked={form.inStock}
          onChange={(e) => update("inStock", e.target.checked)}
        />
        {t.productInStock}
      </label>

      <div className="editor-actions">
        <button className="back-button" onClick={onCancel}>
          {t.cancel}
        </button>

        <button
          className="primary-button"
          disabled={!form.name || !form.price}
          onClick={() => onSave(form)}
        >
          {t.saveProduct}
        </button>
      </div>
    </div>
  );
}

/* =========================================================
   ORDERS
========================================================= */

function OrdersPage({ orders, t, createReturnRequest, returnRequests }) {
  return (
    <main className="section">
      <span className="eyebrow">{t.ordersLabel}</span>

      <h1 className="page-title">{t.orders}</h1>

      {orders.length === 0 ? (
        <div className="empty">{t.noOrders}</div>
      ) : (
        <div className="admin-orders">
          {orders.map((order) => (
            <div className="admin-order" key={order.id}>
              <div>
                <strong>#{String(order.id).slice(-5)}</strong>

                <span>{order.customerName}</span>

                <span>{order.phone}</span>
              </div>

              <div>
                {order.items.map((item) => (
                  <p key={item.id}>
                    {item.name} × {item.quantity}
                  </p>
                ))}
              </div>

              <strong>₹{order.total}</strong>

              <span className="status">{order.status}</span>

              {order.status === "Ready" && (
                <div className="ready-notice">{t.readyNotice}</div>
              )}

              <ReturnRequestForm
                order={order}
                submitted={returnRequests.some(
                  (request) => request.orderId === order.id,
                )}
                createReturnRequest={createReturnRequest}
                t={t}
              />
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

function ReturnRequestForm({ order, submitted, createReturnRequest, t }) {
  const [itemId, setItemId] = useState(
    order.items[0]?.cartKey || String(order.items[0]?.id || ""),
  );
  const [query, setQuery] = useState("");
  const [image, setImage] = useState("");

  function handleImage(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setImage(reader.result);
    reader.readAsDataURL(file);
  }

  if (submitted) {
    return (
      <div className="return-sent">Return request sent to the store team.</div>
    );
  }

  return (
    <div className="return-request">
      <strong>{t.needReturn}</strong>
      <span>{t.returnDescription}</span>

      <select
        value={itemId}
        onChange={(event) => setItemId(event.target.value)}
      >
        {order.items.map((item) => (
          <option key={item.cartKey || item.id} value={item.cartKey || item.id}>
            {item.name} ({item.packLabel || item.unit})
          </option>
        ))}
      </select>

      <textarea
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={t.returnQueryPlaceholder}
      />

      <label className="return-upload">
        <span>{image ? t.photoAttached : t.attachPhoto}</span>
        <input type="file" accept="image/*" onChange={handleImage} />
      </label>

      <button
        className="secondary-button"
        disabled={!query.trim()}
        onClick={() => createReturnRequest(order, itemId, query.trim(), image)}
      >
        {t.sendReturnQuery}
      </button>
    </div>
  );
}
