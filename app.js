document.addEventListener('DOMContentLoaded', () => {
    // --- Internationalization (i18n) Logic ---
    let currentLanguage = 'pt'; // Default language

    function setLanguage(lang) {
        currentLanguage = lang;
        localStorage.setItem('preferredLanguage', lang);
        const langTranslations = translations[lang];

        if (!langTranslations) {
            console.error(`Translations for language '${lang}' not found.`);
            return;
        }

        document.querySelectorAll('[data-translate-key]').forEach(element => {
            const key = element.dataset.translateKey;
            if (langTranslations[key]) {
                if (element.tagName === 'INPUT' && element.placeholder !== undefined) {
                    element.placeholder = langTranslations[key];
                } else {
                    element.textContent = langTranslations[key];
                }
            } else {
                console.warn(`Translation key '${key}' not found for language '${lang}'.`);
            }
        });

        // Update dynamic texts if needed (e.g., error messages, ROI result prefix)
        // This will be more robust when we refactor how dynamic messages are generated.
        // For now, we can re-translate known dynamic parts or ensure functions use currentLanguage.
        // updateDynamicTexts(); // Placeholder, can be removed if not immediately used or refined.

        // Translate page title specifically
        const pageTitleKey = 'app_title'; // Assuming this is the key for the page title
        if (langTranslations[pageTitleKey]) {
            document.title = langTranslations[pageTitleKey];
        } else {
            console.warn(`Translation key '${pageTitleKey}' not found for language '${lang}'.`);
        }
    }

    function getTranslation(key, replacements = {}) {
        let translation = translations[currentLanguage][key] || `Missing translation for ${key}`;
        // Basic placeholder replacement, e.g., "Hello {{name}}"
        for (const placeholder in replacements) {
            translation = translation.replace(`{{${placeholder}}}`, replacements[placeholder]);
        }
        return translation;
    }

    // function updateDynamicTexts() { // Placeholder, can be removed or refined
    // }


    // Initialize language
    // Note: currentLanguage is already initialized to 'pt'
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang && translations[savedLang]) {
        // setLanguage will update currentLanguage
        setLanguage(savedLang); 
    } else {
        // Set default language if nothing is saved or saved lang is invalid
        setLanguage(currentLanguage); 
    }

    // --- Navigation and Menu Logic ---
    const menuToggleBtn = document.getElementById('menuToggleBtn');
    const sideMenu = document.getElementById('sideMenu');
    const appContainer = document.getElementById('appContainer');
    const menuItems = document.querySelectorAll('#sideMenu .menu-item[data-section]'); // Selects only actual navigation items
    const contentSections = document.querySelectorAll('#contentArea .main-section');
    const languageToggleBtn = document.getElementById('languageToggleBtn');

    if (menuToggleBtn && appContainer) {
        menuToggleBtn.addEventListener('click', () => {
            appContainer.classList.toggle('menu-active');
        });
    }

    // Event listener for regular menu items
    menuItems.forEach(item => {
        item.addEventListener('click', (event) => {
            event.preventDefault();
            const sectionIdToShow = item.getAttribute('data-section');
            contentSections.forEach(section => {
                section.style.display = (section.id === sectionIdToShow) ? 'block' : 'none';
            });
            // Optionally close menu on item click for mobile/overlay if menu is open
            if (appContainer.classList.contains('menu-active')) {
                // Check if it's a "mobile" view where menu overlays content
                // A simple check like window.innerWidth might work for now
                if (window.innerWidth < 768) { 
                    appContainer.classList.remove('menu-active');
                }
            }
        });
    });

    // Event listener for language toggle button
    if (languageToggleBtn) {
        languageToggleBtn.addEventListener('click', () => {
            const newLang = currentLanguage === 'pt' ? 'en' : 'pt';
            setLanguage(newLang);
            // Optionally close menu if it's open, similar to other menu items
            // if (appContainer.classList.contains('menu-active')) {
            //     if (window.innerWidth < 768) { 
            //         appContainer.classList.remove('menu-active');
            //     }
            // }
        });
    }

    // --- Existing ROI Calculator and Dashboard Logic ---
    const investmentAmountInput = document.getElementById('investmentAmount');
    const revenueGeneratedInput = document.getElementById('revenueGenerated');
    const calculateRoiBtn = document.getElementById('calculateRoiBtn');
    const roiResultDiv = document.getElementById('roiResult');

    const totalInvestmentSpan = document.getElementById('totalInvestment');
    const totalRevenueSpan = document.getElementById('totalRevenue');
    const overallRoiSpan = document.getElementById('overallRoi');
    const historyTableBody = document.getElementById('historyTableBody');

    let calculationLog = [];

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
                // Using getTranslation for the prefix and then appending the value.
                resultText = getTranslation('calculator_resultPrefix') + ` ${roi.toFixed(2)}%`;
            }
            roiResultDiv.textContent = resultText;
            
            // For calculationLog, store the numeric ROI or 'N/A' string.
            // The display in the history table will handle 'N/A' appropriately.
            calculationLog.push({
                investment: investmentAmount,
                revenue: revenueGenerated,
                roi: (typeof roi === 'number') ? roi : 'N/A'
            });
            saveHistory();
            updateDashboard();
        });
    }

    loadHistory();
    updateDashboard();
    setLanguage(currentLanguage); // Ensure language is applied on initial load after other initializations.
});
