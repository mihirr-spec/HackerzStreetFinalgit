// DOM Elements
const darkModeCheckbox = document.getElementById('dark-mode-checkbox');
const languageSelect = document.getElementById('language-select');

// Language translations
const translations = {
    // English (default)
    en: {
        'lang-login': 'Login',
        'lang-register': 'Register',
        'lang-hero-title': 'Healthcare at Your Fingertips',
        'lang-intro-text': 'Swasthya Sathi helps rural users access critical health information using voice technology in their local languages. No matter where you are or what language you speak, quality healthcare guidance is just a conversation away.',
        'lang-register-now': 'Register Now',
        'lang-learn-more': 'Learn More',
        'lang-feature1-title': 'Multi-language Support',
        'lang-feature1-text': 'Access healthcare information in your native language',
        'lang-feature2-title': 'Voice Technology',
        'lang-feature2-text': 'Interact naturally through voice commands and responses',
        'lang-feature3-title': 'Rural Accessibility',
        'lang-feature3-text': 'Designed for areas with limited connectivity and resources',
        'lang-footer': '© 2025 Swasthya Sathi. All rights reserved.'
    },
    // Hindi
    hi: {
        'lang-login': 'लॉग इन',
        'lang-register': 'पंजीकरण',
        'lang-hero-title': 'स्वास्थ्य सेवा आपकी उंगलियों पर',
        'lang-intro-text': 'स्वास्थ्य साथी ग्रामीण उपयोगकर्ताओं को उनकी स्थानीय भाषाओं में आवाज तकनीक का उपयोग करके महत्वपूर्ण स्वास्थ्य जानकारी तक पहुंचने में मदद करता है। जहां भी आप हों या कोई भी भाषा बोलते हों, गुणवत्तापूर्ण स्वास्थ्य मार्गदर्शन सिर्फ एक बातचीत दूर है।',
        'lang-register-now': 'अभी पंजीकरण करें',
        'lang-learn-more': 'अधिक जानें',
        'lang-feature1-title': 'बहु-भाषा समर्थन',
        'lang-feature1-text': 'अपनी मातृभाषा में स्वास्थ्य जानकारी प्राप्त करें',
        'lang-feature2-title': 'आवाज तकनीक',
        'lang-feature2-text': 'आवाज कमांड और प्रतिक्रियाओं के माध्यम से प्राकृतिक रूप से बातचीत करें',
        'lang-feature3-title': 'ग्रामीण पहुंच',
        'lang-feature3-text': 'सीमित कनेक्टिविटी और संसाधनों वाले क्षेत्रों के लिए डिज़ाइन किया गया',
        'lang-footer': '© 2025 स्वास्थ्य साथी। सर्वाधिकार सुरक्षित।'
    },
    // Bengali
    bn: {
        'lang-login': 'লগইন',
        'lang-register': 'নিবন্ধন',
        'lang-hero-title': 'আপনার আঙ্গুলের ডগায় স্বাস্থ্যসেবা',
        'lang-intro-text': 'স্বাস্থ্য সাথী গ্রামীণ ব্যবহারকারীদের তাদের স্থানীয় ভাষায় ভয়েস প্রযুক্তি ব্যবহার করে গুরুত্বপূর্ণ স্বাস্থ্য তথ্য অ্যাক্সেস করতে সাহায্য করে। আপনি যেখানেই থাকুন বা যে ভাষাই বলুন না কেন, মানসম্পন্ন স্বাস্থ্যসেবা নির্দেশনা শুধুমাত্র একটি কথোপকথন দূরে।',
        'lang-register-now': 'এখনই নিবন্ধন করুন',
        'lang-learn-more': 'আরও জানুন',
        'lang-feature1-title': 'বহুভাষিক সমর্থন',
        'lang-feature1-text': 'আপনার মাতৃভাষায় স্বাস্থ্য তথ্য অ্যাক্সেস করুন',
        'lang-feature2-title': 'ভয়েস প্রযুক্তি',
        'lang-feature2-text': 'ভয়েস কমান্ড এবং প্রতিক্রিয়ার মাধ্যমে স্বাভাবিকভাবে যোগাযোগ করুন',
        'lang-feature3-title': 'গ্রামীণ অ্যাক্সেসযোগ্যতা',
        'lang-feature3-text': 'সীমিত সংযোগ এবং সংস্থান সহ এলাকার জন্য ডিজাইন করা হয়েছে',
        'lang-footer': '© 2025 স্বাস্থ্য সাথী। সর্বস্বত্ব সংরক্ষিত।'
    },
    // Telugu
    te: {
        'lang-login': 'లాగిన్',
        'lang-register': 'నమోదు',
        'lang-hero-title': 'వేలికొనల చివర ఆరోగ్య సంరక్షణ',
        'lang-intro-text': 'స్వస్థ్య సాథి గ్రామీణ వినియోగదారులకు తమ స్థానిక భాషలలో వాయిస్ టెక్నాలజీని ఉపయోగించి కీలకమైన ఆరోగ్య సమాచారాన్ని పొందడానికి సహాయపడుతుంది. మీరు ఎక్కడ ఉన్నా లేదా ఏ భాష మాట్లాడినా, నాణ్యమైన ఆరోగ్య మార్గదర్శకత్వం కేవలం ఒక సంభాషణ దూరంలో ఉంటుంది.',
        'lang-register-now': 'ఇప్పుడే నమోదు చేసుకోండి',
        'lang-learn-more': 'మరింత తెలుసుకోండి',
        'lang-feature1-title': 'బహుళ భాషా మద్దతు',
        'lang-feature1-text': 'మీ స్వంత భాషలో ఆరోగ్య సమాచారాన్ని పొందండి',
        'lang-feature2-title': 'వాయిస్ టెక్నాలజీ',
        'lang-feature2-text': 'వాయిస్ ఆదేశాలు మరియు ప్రతిస్పందనల ద్వారా సహజంగా సంభాషించండి',
        'lang-feature3-title': 'గ్రామీణ ప్రాప్యత',
        'lang-feature3-text': 'పరిమిత కనెక్టివిటీ మరియు వనరులు ఉన్న ప్రాంతాలకు అనుగుణంగా రూపొందించబడింది',
        'lang-footer': '© 2025 స్వస్థ్య సాథి. అన్ని హక్కులు రిజర్వ్ చేయబడ్డాయి.'
    },
    // Tamil
    ta: {
        'lang-login': 'உள்நுழைய',
        'lang-register': 'பதிவு செய்க',
        'lang-hero-title': 'உங்கள் விரல்நுனியில் சுகாதார பராமரிப்பு',
        'lang-intro-text': 'சுவஸ்த்ய சாதி கிராமப்புற பயனர்களுக்கு அவர்களின் உள்ளூர் மொழிகளில் குரல் தொழில்நுட்பத்தைப் பயன்படுத்தி முக்கியமான சுகாதாரத் தகவல்களை அணுக உதவுகிறது. நீங்கள் எங்கிருந்தாலும் அல்லது எந்த மொழியைப் பேசினாலும், தரமான சுகாதார வழிகாட்டுதல் வெறும் ஒரு உரையாடல் தொலைவில் உள்ளது.',
        'lang-register-now': 'இப்போதே பதிவு செய்யுங்கள்',
        'lang-learn-more': 'மேலும் அறிக',
        'lang-feature1-title': 'பல மொழி ஆதரவு',
        'lang-feature1-text': 'உங்கள் தாய்மொழியில் சுகாதார தகவல்களை அணுகவும்',
        'lang-feature2-title': 'குரல் தொழில்நுட்பம்',
        'lang-feature2-text': 'குரல் கட்டளைகள் மற்றும் பதில்கள் மூலம் இயல்பாக தொடர்பு கொள்ளுங்கள்',
        'lang-feature3-title': 'கிராமப்புற அணுகல்',
        'lang-feature3-text': 'குறைந்த இணைப்பு மற்றும் வளங்கள் கொண்ட பகுதிகளுக்காக வடிவமைக்கப்பட்டது',
        'lang-footer': '© 2025 சுவஸ்த்ய சாதி. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.'
    },
    // Urdu
    ur: {
        'lang-login': 'لاگ ان',
        'lang-register': 'رجسٹر',
        'lang-hero-title': 'آپ کی انگلیوں پر صحت کی دیکھ بھال',
        'lang-intro-text': 'سواستھیا ساتھی دیہی صارفین کو آواز ٹیکنالوجی کا استعمال کرتے ہوئے مقامی زبانوں میں اہم صحت کی معلومات تک رسائی حاصل کرنے میں مدد کرتا ہے۔ آپ کہیں بھی ہوں یا کوئی بھی زبان بولتے ہوں، معیاری صحت کی رہنمائی صرف ایک گفتگو دور ہے۔',
        'lang-register-now': 'ابھی رجسٹر کریں',
        'lang-learn-more': 'مزید جانیں',
        'lang-feature1-title': 'کثیر زبان کی سپورٹ',
        'lang-feature1-text': 'اپنی مادری زبان میں صحت کی معلومات تک رسائی حاصل کریں',
        'lang-feature2-title': 'آواز ٹیکنالوجی',
        'lang-feature2-text': 'آواز کے احکامات اور ردعمل کے ذریعے قدرتی طور پر بات چیت کریں',
        'lang-feature3-title': 'دیہی رسائی',
        'lang-feature3-text': 'محدود کنیکٹیویٹی اور وسائل والے علاقوں کے لیے ڈیزائن کیا گیا',
        'lang-footer': '© 2025 سواستھیا ساتھی۔ جملہ حقوق محفوظ ہیں۔'
    },
    // Malayalam
    ml: {
        'lang-login': 'ലോഗിൻ',
        'lang-register': 'രജിസ്റ്റർ',
        'lang-hero-title': 'നിങ്ങളുടെ വിരൽത്തുമ്പിൽ ആരോഗ്യ പരിരക്ഷ',
        'lang-intro-text': 'സ്വാസ്ത്യ സാഥി ഗ്രാമീണ ഉപയോക്താക്കൾക്ക് അവരുടെ പ്രാദേശിക ഭാഷകളിൽ വോയ്‌സ് സാങ്കേതികവിദ്യ ഉപയോഗിച്ച് സുപ്രധാന ആരോഗ്യ വിവരങ്ങൾ ആക്‌സസ് ചെയ്യാൻ സഹായിക്കുന്നു. നിങ്ങൾ എവിടെയാണെങ്കിലും അല്ലെങ്കിൽ ഏത് ഭാഷ സംസാരിച്ചാലും, ഗുണനിലവാരമുള്ള ആരോഗ്യ മാർഗ്ഗനിർദ്ദേശം ഒരു സംഭാഷണം മാത്രം അകലെയാണ്.',
        'lang-register-now': 'ഇപ്പോൾ രജിസ്റ്റർ ചെയ്യുക',
        'lang-learn-more': 'കൂടുതൽ അറിയുക',
        'lang-feature1-title': 'ബഹുഭാഷാ പിന്തുണ',
        'lang-feature1-text': 'നിങ്ങളുടെ മാതൃഭാഷയിൽ ആരോഗ്യ വിവരങ്ങൾ ആക്‌സസ് ചെയ്യുക',
        'lang-feature2-title': 'വോയ്‌സ് സാങ്കേതികവിദ്യ',
        'lang-feature2-text': 'വോയ്‌സ് കമാൻഡുകളും പ്രതികരണങ്ങളും വഴി സ്വാഭാവികമായി ആശയവിനിമയം നടത്തുക',
        'lang-feature3-title': 'ഗ്രാമീണ പ്രാപ്യത',
        'lang-feature3-text': 'പരിമിതമായ കണക്റ്റിവിറ്റിയും വിഭവങ്ങളുമുള്ള പ്രദേശങ്ങൾക്കായി രൂപകൽപ്പന ചെയ്തത്',
        'lang-footer': '© 2025 സ്വാസ്ത്യ സാഥി. എല്ലാ അവകാശങ്ങളും നിക്ഷിപ്തം.'
    }
};

// Initialize more languages (add basic translations for other languages)
const allLanguages = ['mr', 'gu', 'kn', 'pa', 'as', 'or', 'sa', 'sd', 'ks', 'ne', 'kok', 'mai', 'doi', 'bho', 'sat'];
allLanguages.forEach(lang => {
    if (!translations[lang]) {
        // Use English as fallback with language name
        translations[lang] = JSON.parse(JSON.stringify(translations.en));
        translations[lang]['lang-hero-title'] += ` (${lang})`;
    }
});

// Function to update page content based on selected language
function updateLanguage(language) {
    const langData = translations[language] || translations.en;
    
    // Update all elements with language classes
    Object.keys(langData).forEach(key => {
        const elements = document.getElementsByClassName(key);
        for (let i = 0; i < elements.length; i++) {
            if (elements[i].tagName === 'INPUT' || elements[i].tagName === 'TEXTAREA') {
                elements[i].placeholder = langData[key];
            } else if (elements[i].tagName === 'A' || elements[i].tagName === 'BUTTON') {
                // For buttons and links, carefully preserve only the text content
                elements[i].textContent = langData[key];
            } else {
                // For other elements, it's safe to use innerHTML
                elements[i].innerHTML = langData[key];
            }
        }
    });
    
    // Save selected language to localStorage
    localStorage.setItem('selectedLanguage', language);
    
    // Update HTML lang attribute
    document.documentElement.lang = language;
    
    // Update page title based on language
    document.title = language === 'en' ? 'Swasthya Sathi - Healthcare for All' : 
                    (translations[language] && translations[language]['lang-hero-title'] ? 
                     `Swasthya Sathi - ${translations[language]['lang-hero-title']}` : 
                     'Swasthya Sathi');
}

// Check for saved user preferences on page load
document.addEventListener('DOMContentLoaded', () => {
    // Apply saved dark mode preference
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'enabled') {
        document.body.classList.add('dark-mode');
        darkModeCheckbox.checked = true;
    }
    
    // Apply saved language preference or set default
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage && translations[savedLanguage]) {
        languageSelect.value = savedLanguage;
        updateLanguage(savedLanguage);
    } else {
        // Default to English if no valid language is saved
        updateLanguage('en');
    }

    // Add smooth scrolling to all links
    const links = document.querySelectorAll('a[href^="#"]');
    for (const link of links) {
        link.addEventListener('click', smoothScroll);
    }

    // Add animation to feature cards when they come into view
    const featureCards = document.querySelectorAll('.feature-card');

    // Simple intersection observer to check when elements enter the viewport
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        featureCards.forEach(card => {
            observer.observe(card);
        });
    }
});

// Dark Mode Toggle Functionality
darkModeCheckbox.addEventListener('change', () => {
    // Toggle dark mode class on body
    document.body.classList.toggle('dark-mode');

    // Update localStorage based on current state
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
    } else {
        localStorage.setItem('darkMode', 'disabled');
    }
});

// Language selection handler
languageSelect.addEventListener('change', function() {
    updateLanguage(this.value);
});

// Smooth scrolling function for anchor links
function smoothScroll(e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
        const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset;

        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Navbar behavior - hide on scroll down, show on scroll up
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');
const scrollThreshold = 50;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > lastScrollTop && currentScroll > scrollThreshold) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
}, { passive: true });
