console.log("Hello from app.js!");

// Get DOM elements for ROI Calculator
const investmentAmountInput = document.getElementById('investmentAmount');
const revenueGeneratedInput = document.getElementById('revenueGenerated');
const calculateRoiBtn = document.getElementById('calculateRoiBtn');
const roiResultDiv = document.getElementById('roiResult');

// Get DOM elements for Dashboard
const totalInvestmentSpan = document.getElementById('totalInvestment');
const totalRevenueSpan = document.getElementById('totalRevenue');
const overallRoiSpan = document.getElementById('overallRoi');
const historyTableBody = document.getElementById('historyTableBody');

// Data Storage
let calculationLog = [];

// Save history to localStorage
function saveHistory() {
    localStorage.setItem('calculationLog', JSON.stringify(calculationLog));
}

// Load history from localStorage
function loadHistory() {
    const savedLog = localStorage.getItem('calculationLog');
    if (savedLog) {
        calculationLog = JSON.parse(savedLog);
    } else {
        calculationLog = [];
    }
}

// Update Dashboard Logic
function updateDashboard() {
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

    // Clear the history table body
    historyTableBody.innerHTML = '';

    // Populate history table
    calculationLog.forEach(entry => {
        const row = historyTableBody.insertRow();
        const cellInvestment = row.insertCell();
        const cellRevenue = row.insertCell();
        const cellRoi = row.insertCell();

        cellInvestment.textContent = entry.investment.toFixed(2);
        cellRevenue.textContent = entry.revenue.toFixed(2);
        cellRoi.textContent = entry.roi.toFixed(2);
    });
}


// Add event listener to the ROI calculation button
calculateRoiBtn.addEventListener('click', () => {
    const investmentAmount = parseFloat(investmentAmountInput.value);
    const revenueGenerated = parseFloat(revenueGeneratedInput.value);

    // Basic validation
    if (isNaN(investmentAmount) || isNaN(revenueGenerated)) {
        roiResultDiv.textContent = "Please enter valid numbers.";
        return;
    }

    if (investmentAmountInput.value.trim() === '' || revenueGeneratedInput.value.trim() === '') {
        roiResultDiv.textContent = "Please enter both investment and revenue amounts.";
        return;
    }
    
    let roi;
    // Handle division by zero
    if (investmentAmount === 0) {
        if (revenueGenerated > 0) {
            roiResultDiv.textContent = "Investment cannot be zero for ROI calculation if there's revenue. ROI: N/A";
            roi = 'N/A'; // Store N/A for history
        } else {
            roiResultDiv.textContent = "Investment amount cannot be zero. ROI: N/A";
            roi = 'N/A'; // Store N/A for history
        }
    } else {
        // Calculate ROI
        roi = ((revenueGenerated - investmentAmount) / investmentAmount) * 100;
        // Display the result
        roiResultDiv.textContent = `ROI: ${roi.toFixed(2)}%`;
    }


    // Add to calculation log if ROI is a number
    if (typeof roi === 'number') {
        calculationLog.push({
            investment: investmentAmount,
            revenue: revenueGenerated,
            roi: roi
        });
    } else {
         calculationLog.push({ // Also log entries where ROI is N/A
            investment: investmentAmount,
            revenue: revenueGenerated,
            roi: 0 // Store 0 or some other numeric placeholder if N/A
        });
    }


    saveHistory();
    updateDashboard();
});

// Initial Load
loadHistory();
updateDashboard();
