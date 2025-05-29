document.addEventListener('DOMContentLoaded', () => {
    // --- DOM References ---
    const menuToggleBtn = document.getElementById('menuToggleBtn');
    const sideMenu = document.getElementById('sideMenu');
    const appContainer = document.getElementById('appContainer');
    const menuItems = document.querySelectorAll('#sideMenu .menu-item[data-section]');
    const contentSections = document.querySelectorAll('#contentArea .main-section');
    const langBtnPt = document.getElementById('langBtn-pt');
    const langBtnEn = document.getElementById('langBtn-en');

    const investmentAmountInput = document.getElementById('investmentAmount');
    const revenueGeneratedInput = document.getElementById('revenueGenerated');
    const calculateRoiBtn = document.getElementById('calculateRoiBtn');
    const roiResultDiv = document.getElementById('roiResult');

    const totalInvestmentSpan = document.getElementById('totalInvestment');
    const totalRevenueSpan = document.getElementById('totalRevenue');
    const overallRoiSpan = document.getElementById('overallRoi');
    const historyTableBody = document.getElementById('historyTableBody');

    // --- State Variables ---
    let currentLanguage = 'pt'; // Default language
    let calculationLog = [];

    // --- Internationalization (i18n) Logic ---
    function setLanguage(lang) {
        currentLanguage = lang;
        localStorage.setItem('preferredLanguage', lang);
        const langTranslations = translations[lang];

        if (!langTranslations) {
            console.error(`Translations for language '${lang}' not found.`);
            return;
        }

        // Update visual state of language flags
        if (langBtnPt && langBtnEn) {
            if (lang === 'pt') {
                langBtnPt.classList.add('active');
                langBtnPt.classList.remove('inactive');
                langBtnEn.classList.add('inactive');
                langBtnEn.classList.remove('active');
            } else if (lang === 'en') {
                langBtnEn.classList.add('active');
                langBtnEn.classList.remove('inactive');
                langBtnPt.classList.add('inactive');
                langBtnPt.classList.remove('active');
            }
        }

        // Translate static elements
        document.querySelectorAll('[data-translate-key]').forEach(element => {
            const key = element.dataset.translateKey;
            if (langTranslations[key]) {
                if (element.tagName === 'INPUT' && element.placeholder !== undefined) {
                    element.placeholder = langTranslations[key];
                } else {
                    element.textContent = langTranslations[key];
                }
            } else {
                // Don't warn for keys that might be specific to one element type, like language_toggle_button on a non-button
                // This check could be more sophisticated if needed.
                if (element.id !== 'languageToggleBtn') { // Assuming old button ID is removed
                     console.warn(`Translation key '${key}' not found for language '${lang}'.`);
                }
            }
        });
        
        // Translate page title specifically
        const pageTitleKey = 'app_title';
        if (langTranslations[pageTitleKey]) {
            document.title = langTranslations[pageTitleKey];
        } else {
            console.warn(`Translation key '${pageTitleKey}' not found for language '${lang}'.`);
        }
    }

    function getTranslation(key, replacements = {}) {
        let translation = (translations[currentLanguage] && translations[currentLanguage][key]) || `Missing: ${key}`;
        for (const placeholder in replacements) {
            translation = translation.replace(`{{${placeholder}}}`, replacements[placeholder]);
        }
        return translation;
    }

    // --- Navigation and Menu Logic ---
    if (menuToggleBtn && appContainer) {
        menuToggleBtn.addEventListener('click', () => {
            appContainer.classList.toggle('menu-active');
        });
    }

    menuItems.forEach(item => {
        item.addEventListener('click', (event) => {
            event.preventDefault();
            const sectionIdToShow = item.getAttribute('data-section');
            contentSections.forEach(section => {
                section.style.display = (section.id === sectionIdToShow) ? 'block' : 'none';
            });
            if (appContainer.classList.contains('menu-active') && window.innerWidth < 768) { 
                appContainer.classList.remove('menu-active');
            }
        });
    });

    // Language flag event listeners
    if (langBtnPt) {
        langBtnPt.addEventListener('click', () => {
            if (currentLanguage !== 'pt') setLanguage('pt');
        });
    }
    if (langBtnEn) {
        langBtnEn.addEventListener('click', () => {
            if (currentLanguage !== 'en') setLanguage('en');
        });
    }

    // --- ROI Calculator and Dashboard Logic ---
    function saveHistory() {
        localStorage.setItem('calculationLog', JSON.stringify(calculationLog));
    }

    function loadHistory() {
        const savedLog = localStorage.getItem('calculationLog');
        if (savedLog) {
            calculationLog = JSON.parse(savedLog);
        } else {
            calculationLog = [];
        }
    }

    function updateDashboard() {
        if (!totalInvestmentSpan || !totalRevenueSpan || !overallRoiSpan || !historyTableBody) {
            return;
        }
        let totalInvestment = 0;
        let totalRevenue = 0;
        calculationLog.forEach(entry => {
            totalInvestment += entry.investment;
            totalRevenue += entry.revenue;
        });
        const overallRoi = totalInvestment === 0 ? 0 : ((totalRevenue - totalInvestment) / totalInvestment) * 100;
        totalInvestmentSpan.textContent = totalInvestment.toFixed(2);
        totalRevenueSpan.textContent = totalRevenue.toFixed(2);
        overallRoiSpan.textContent = `${overallRoi.toFixed(2)}%`;
        historyTableBody.innerHTML = '';
        calculationLog.forEach(entry => {
            const row = historyTableBody.insertRow();
            row.insertCell().textContent = entry.investment.toFixed(2);
            row.insertCell().textContent = entry.revenue.toFixed(2);
            const roiCell = row.insertCell();
            roiCell.textContent = (typeof entry.roi === 'number') ? entry.roi.toFixed(2) : entry.roi;
        });
    }

    if (calculateRoiBtn) {
        calculateRoiBtn.addEventListener('click', () => {
            if (!investmentAmountInput || !revenueGeneratedInput || !roiResultDiv) {
                return;
            }
            const investmentAmount = parseFloat(investmentAmountInput.value);
            const revenueGenerated = parseFloat(revenueGeneratedInput.value);

            if (investmentAmountInput.value.trim() === '' || revenueGeneratedInput.value.trim() === '') {
                roiResultDiv.textContent = getTranslation('error_emptyInputs');
                return;
            }
            if (isNaN(investmentAmount) || isNaN(revenueGenerated)) {
                roiResultDiv.textContent = getTranslation('error_invalidInputs');
                return;
            }
            
            let roi;
            let resultText;

            if (investmentAmount === 0) {
                resultText = getTranslation('error_investmentZero');
                roi = 'N/A'; 
            } else {
                roi = ((revenueGenerated - investmentAmount) / investmentAmount) * 100;
                resultText = getTranslation('calculator_resultPrefix') + ` ${roi.toFixed(2)}%`;
            }
            roiResultDiv.textContent = resultText;
            
            calculationLog.push({
                investment: investmentAmount,
                revenue: revenueGenerated,
                roi: (typeof roi === 'number') ? roi : 'N/A'
            });
            saveHistory();
            updateDashboard();
        });
    }

    // --- Initial Load ---
    loadHistory();
    updateDashboard();
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang && translations[savedLang]) {
        setLanguage(savedLang); 
    } else {
        setLanguage(currentLanguage); 
    }
});
