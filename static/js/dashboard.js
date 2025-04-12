document.addEventListener('DOMContentLoaded', function() {
    // Check for Web Speech API support
    const speechRecognitionSupported = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
    const speechSynthesisSupported = 'speechSynthesis' in window;
    
    // Initialize elements
    const micButton = document.getElementById('micButton');
    const speakerButton = document.getElementById('speakerButton');
    const transcript = document.getElementById('transcript');
    const queryInput = document.getElementById('queryInput');
    const submitQueryButton = document.getElementById('submitQuery');
    const responseContent = document.getElementById('responseContent');
    const symptomButtons = document.querySelectorAll('.symptom-btn');
    const languageDropdown = document.getElementById('languageDropdown');
    const userModal = document.getElementById('userModal');
    const userNameInput = document.getElementById('userNameInput');
    const saveUserNameButton = document.getElementById('saveUserName');
    const closeModal = document.querySelector('.close');
    const settingsButton = document.getElementById('settingsButton');
    const userNameDisplay = document.getElementById('userName');
    
    // Initialize variables
    let currentLanguage = 'en';
    let recognition = null;
    let isListening = false;
    let userName = localStorage.getItem('healthPortalUserName') || 'User';
    
    // Language data for translations
    const translations = {
        'en': {
            portalTitle: 'Health Voice Portal',
            greeting: 'Welcome',
            languageTitle: 'Select Your Language',
            voiceTitle: 'Voice Interaction',
            micText: 'Speak',
            speakerText: 'Listen',
            transcriptTitle: 'Transcript',
            featuresTitle: 'Key Features',
            multiLangTitle: 'Multi-language Support',
            multiLangDesc: 'Access healthcare information in 22 Indian languages',
            voiceTechTitle: 'Voice Technology',
            voiceTechDesc: 'Speak to ask questions, listen to responses',
            ruralTitle: 'Rural Accessibility',
            ruralDesc: 'Designed for low-bandwidth and basic devices',
            queryTitle: 'Ask a Health Question',
            commonSymptomsTitle: 'Common Symptoms',
            feverText: 'Fever',
            headacheText: 'Headache',
            coughText: 'Cough',
            stomachText: 'Stomach Pain',
            responseTitle: 'Health Information',
            initialMessage: 'Select a language, then ask a health question by voice or text',
            footerText: '© 2025 Health Voice Portal - Providing accessible healthcare information',
            settingsText: 'Settings',
            modalTitle: 'Enter Your Name',
            direction: 'ltr'
        },
        'hi': {
            portalTitle: 'स्वास्थ्य आवाज़ पोर्टल',
            greeting: 'स्वागत है',
            languageTitle: 'अपनी भाषा चुनें',
            voiceTitle: 'आवाज़ इंटरैक्शन',
            micText: 'बोलें',
            speakerText: 'सुनें',
            transcriptTitle: 'प्रतिलेख',
            featuresTitle: 'प्रमुख विशेषताएं',
            multiLangTitle: 'बहु-भाषा समर्थन',
            multiLangDesc: '22 भारतीय भाषाओं में स्वास्थ्य जानकारी',
            voiceTechTitle: 'आवाज़ प्रौद्योगिकी',
            voiceTechDesc: 'प्रश्न पूछने के लिए बोलें, जवाब सुनें',
            ruralTitle: 'ग्रामीण पहुंच',
            ruralDesc: 'कम बैंडविड्थ और बुनियादी उपकरणों के लिए डिज़ाइन',
            queryTitle: 'स्वास्थ्य प्रश्न पूछें',
            commonSymptomsTitle: 'सामान्य लक्षण',
            feverText: 'बुखार',
            headacheText: 'सिरदर्द',
            coughText: 'खांसी',
            stomachText: 'पेट दर्द',
            responseTitle: 'स्वास्थ्य जानकारी',
            initialMessage: 'भाषा चुनें, फिर आवाज़ या टेक्स्ट से स्वास्थ्य प्रश्न पूछें',
            footerText: '© 2025 स्वास्थ्य आवाज़ पोर्टल - सुलभ स्वास्थ्य जानकारी प्रदान करता है',
            settingsText: 'सेटिंग्स',
            modalTitle: 'अपना नाम दर्ज करें',
            direction: 'ltr'
        },
        'bn': {
            portalTitle: 'স্বাস্থ্য ভয়েস পোর্টাল',
            greeting: 'স্বাগতম',
            languageTitle: 'আপনার ভাষা নির্বাচন করুন',
            voiceTitle: 'ভয়েস ইন্টারঅ্যাকশন',
            micText: 'বলুন',
            speakerText: 'শুনুন',
            transcriptTitle: 'ট্রান্সক্রিপ্ট',
            featuresTitle: 'মূল বৈশিষ্ট্য',
            multiLangTitle: 'বহু-ভাষা সমর্থন',
            multiLangDesc: '২২টি ভারতীয় ভাষায় স্বাস্থ্য তথ্য',
            voiceTechTitle: 'ভয়েস প্রযুক্তি',
            voiceTechDesc: 'প্রশ্ন জিজ্ঞাসা করতে বলুন, উত্তর শুনুন',
            ruralTitle: 'গ্রামীণ অ্যাক্সেসিবিলিটি',
            ruralDesc: 'কম ব্যান্ডউইথ এবং বেসিক ডিভাইসের জন্য ডিজাইন করা',
            queryTitle: 'একটি স্বাস্থ্য প্রশ্ন জিজ্ঞাসা করুন',
            commonSymptomsTitle: 'সাধারণ লক্ষণ',
            feverText: 'জ্বর',
            headacheText: 'মাথাব্যথা',
            coughText: 'কাশি',
            stomachText: 'পেটে ব্যথা',
            responseTitle: 'স্বাস্থ্য তথ্য',
            initialMessage: 'একটি ভাষা নির্বাচন করুন, তারপর ভয়েস বা টেক্সট দিয়ে স্বাস্থ্য প্রশ্ন জিজ্ঞাসা করুন',
            footerText: '© 2025 স্বাস্থ্য ভয়েস পোর্টাল - সহজলভ্য স্বাস্থ্য তথ্য প্রদান করে',
            settingsText: 'সেটিংস',
            modalTitle: 'আপনার নাম লিখুন',
            direction: 'ltr'
        },
        'te': {
            portalTitle: 'ఆరోగ్య వాయిస్ పోర్టల్',
            greeting: 'స్వాగతం',
            languageTitle: 'మీ భాషను ఎంచుకోండి',
            voiceTitle: 'వాయిస్ ఇంటరాక్షన్',
            micText: 'మాట్లాడండి',
            speakerText: 'వినండి',
            transcriptTitle: 'ట్రాన్స్క్రిప్ట్',
            featuresTitle: 'ముఖ్య ఫీచర్లు',
            multiLangTitle: 'బహుళ-భాషా మద్దతు',
            multiLangDesc: '22 భారతీయ భాషలలో ఆరోగ్య సమాచారం',
            voiceTechTitle: 'వాయిస్ టెక్నాలజీ',
            voiceTechDesc: 'ప్రశ్నలు అడగడానికి మాట్లాడండి, సమాధానాలు వినండి',
            ruralTitle: 'గ్రామీణ ప్రాప్యత',
            ruralDesc: 'తక్కువ బ్యాండ్విడ్త్ మరియు ప్రాథమిక పరికరాల కోసం డిజైన్ చేయబడింది',
            queryTitle: 'ఆరోగ్య ప్రశ్న అడగండి',
            commonSymptomsTitle: 'సాధారణ లక్షణాలు',
            feverText: 'జ్వరం',
            headacheText: 'తలనొప్పి',
            coughText: 'దగ్గు',
            stomachText: 'కడుపు నొప్పి',
            responseTitle: 'ఆరోగ్య సమాచారం',
            initialMessage: 'ఒక భాషను ఎంచుకోండి, ఆపై వాయిస్ లేదా టెక్స్ట్ ద్వారా ఆరోగ్య ప్రశ్న అడగండి',
            footerText: '© 2025 ఆరోగ్య వాయిస్ పోర్టల్ - ప్రాప్యత ఆరోగ్య సమాచారాన్ని అందిస్తుంది',
            settingsText: 'సెట్టింగ్స్',
            modalTitle: 'మీ పేరు నమోదు చేయండి',
            direction: 'ltr'
        }
    };

    // Function to update page language
    function updatePageLanguage() {
        const langData = translations[currentLanguage] || translations['en'];
        document.documentElement.lang = currentLanguage;
        document.documentElement.dir = langData.direction || 'ltr';
        
        // Update all elements with translations
        Object.keys(langData).forEach(key => {
            const element = document.getElementById(key);
            if (element) {
                element.textContent = langData[key];
            }
        });
    }

    // Language selection
    languageDropdown.addEventListener('change', function() {
        currentLanguage = this.value;
        updatePageLanguage();
    });

    // Rest of your existing JavaScript code...
    // [Keep all the remaining JavaScript code exactly as it was]
    // Only the language selection part has been changed to use dropdown instead of buttons

    // Initialize the page
    updatePageLanguage();
    userNameDisplay.textContent = userName;
});