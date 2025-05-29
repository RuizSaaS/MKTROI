const translations = {
    // Português
    pt: {
        app_title: "App de Marketing ROI",
        app_title_short: "ROI App",
        // Menu
        menu_roiCalculator: "Calculadora ROI",
        menu_dashboard: "Dashboard",
        // Mensagem de Boas-vindas
        welcome_title: "Bem-vindo!",
        welcome_message: "Use o menu para navegar até a Calculadora de ROI ou o Dashboard.",
        // Títulos das Seções
        section_roiCalculator_title: "Calculadora de ROI",
        section_dashboard_title: "Dashboard",
        // Calculadora ROI
        calculator_investmentAmountLabel: "Valor do Investimento:",
        calculator_investmentAmountPlaceholder: "Ex: 1000",
        calculator_revenueGeneratedLabel: "Receita Gerada:",
        calculator_revenueGeneratedPlaceholder: "Ex: 1500",
        calculator_calculateButton: "Calcular ROI",
        calculator_resultPrefix: "ROI:",
        // Dashboard - Métricas Resumo
        dashboard_totalInvestmentLabel: "Investimento Total:",
        dashboard_totalRevenueLabel: "Receita Total:",
        dashboard_overallRoiLabel: "ROI Geral:",
        // Dashboard - Histórico
        dashboard_historyTitle: "Histórico de Cálculo",
        dashboard_historyTableHeadInvestment: "Investimento",
        dashboard_historyTableHeadRevenue: "Receita",
        dashboard_historyTableHeadRoi: "ROI (%)",
        // Erros e Mensagens (adicionar mais conforme necessário)
        error_invalidInputs: "Por favor, insira números válidos.",
        error_investmentZero: "O investimento não pode ser zero para o cálculo do ROI.",
        error_emptyInputs: "Por favor, insira ambos os valores de investimento e receita." // Added from existing app.js
        // language_toggle_button key removed
    },
    // Inglês
    en: {
        app_title: "ROI Marketing App",
        app_title_short: "ROI App",
        // Menu
        menu_roiCalculator: "ROI Calculator",
        menu_dashboard: "Dashboard",
        // Welcome Message
        welcome_title: "Welcome!",
        welcome_message: "Use the menu to navigate to the ROI Calculator or the Dashboard.",
        // Section Titles
        section_roiCalculator_title: "ROI Calculator",
        section_dashboard_title: "Dashboard",
        // ROI Calculator
        calculator_investmentAmountLabel: "Investment Amount:",
        calculator_investmentAmountPlaceholder: "e.g., 1000",
        calculator_revenueGeneratedLabel: "Revenue Generated:",
        calculator_revenueGeneratedPlaceholder: "e.g., 1500",
        calculator_calculateButton: "Calculate ROI",
        calculator_resultPrefix: "ROI:",
        // Dashboard - Summary Metrics
        dashboard_totalInvestmentLabel: "Total Investment:",
        dashboard_totalRevenueLabel: "Total Revenue:",
        dashboard_overallRoiLabel: "Overall ROI:",
        // Dashboard - History
        dashboard_historyTitle: "Calculation History",
        dashboard_historyTableHeadInvestment: "Investment",
        dashboard_historyTableHeadRevenue: "Revenue",
        dashboard_historyTableHeadRoi: "ROI (%)",
        // Errors and Messages
        error_invalidInputs: "Please enter valid numbers.",
        error_investmentZero: "Investment cannot be zero for ROI calculation.",
        error_emptyInputs: "Please enter both investment and revenue amounts." // Added from existing app.js
        // language_toggle_button key removed
    }
};

// Para permitir o uso em app.js sem módulos ES6 (se app.js não for um módulo)
// podemos anexá-lo ao window ou simplesmente garantir que locales.js seja carregado antes de app.js
// Por enquanto, apenas defina a constante. A integração será feita depois.
// Ex: window.appTranslations = translations; (opcional, dependendo da estratégia de acesso)
