// Dashboard data
const dashboardData = {
    frequencyAnalysis: [
        { declineType: "5% or more", frequency: "Every 1 year", recoveryDays: 101 },
        { declineType: "10% or more", frequency: "Every 2.5 years", recoveryDays: 234 },
        { declineType: "15% or more", frequency: "Every 5 years", recoveryDays: 345 },
        { declineType: "20% or more (Bear)", frequency: "Every 6-7.6 years", recoveryDays: 1095 }
    ],

    historicalBearMarkets: [
        { year: "1946", startDate: "May 1946", endDate: "Jun 1949", decline: -30.0, durationMonths: 37, recoveryMonths: 60 },
        { year: "1956", startDate: "Aug 1956", endDate: "Oct 1957", decline: -22.0, durationMonths: 14, recoveryMonths: 18 },
        { year: "1961", startDate: "Dec 1961", endDate: "Jun 1962", decline: -28.0, durationMonths: 6, recoveryMonths: 14 },
        { year: "1968", startDate: "Nov 1968", endDate: "May 1970", decline: -36.1, durationMonths: 18, recoveryMonths: 21 },
        { year: "1973", startDate: "Jan 1973", endDate: "Oct 1974", decline: -48.2, durationMonths: 21, recoveryMonths: 69 },
        { year: "1980", startDate: "Nov 1980", endDate: "Aug 1982", decline: -27.1, durationMonths: 21, recoveryMonths: 26 },
        { year: "1987", startDate: "Aug 1987", endDate: "Dec 1987", decline: -33.5, durationMonths: 4, recoveryMonths: 20 },
        { year: "2000", startDate: "Mar 2000", endDate: "Oct 2002", decline: -49.1, durationMonths: 31, recoveryMonths: 90 },
        { year: "2007", startDate: "Oct 2007", endDate: "Mar 2009", decline: -57.7, durationMonths: 17, recoveryMonths: 49 },
        { year: "2020", startDate: "Feb 2020", endDate: "Apr 2020", decline: -33.9, durationMonths: 2, recoveryMonths: 5 },
        { year: "2022", startDate: "Jan 2022", endDate: "Oct 2022", decline: -25.4, durationMonths: 9, recoveryMonths: 24 }
    ],

    recentBearMarkets: [
        {
            year: "2022",
            name: "2022 Bear Market",
            decline: -25.4,
            duration: "9 months (Jan-Oct 2022)",
            recovery: "24 months (recovered Jan 2024)",
            description: "Driven by inflation concerns and Federal Reserve rate hikes"
        },
        {
            year: "2020",
            name: "COVID-19 Bear Market",
            decline: -33.9,
            duration: "2 months (Feb-Apr 2020)",
            recovery: "5 months (shortest recovery on record)",
            description: "Pandemic-induced sell-off with rapid government intervention"
        },
        {
            year: "2007",
            name: "Financial Crisis Bear Market",
            decline: -57.7,
            duration: "17 months (Oct 2007 - Mar 2009)",
            recovery: "49 months (about 4 years)",
            description: "Housing bubble collapse and financial system crisis"
        }
    ]
};

// Utility functions
function formatRecoveryTime(days) {
    if (days >= 365) {
        const years = (days / 365).toFixed(1);
        return `${days} days (${years} years)`;
    } else {
        const months = (days / 30.44).toFixed(1);
        return `${days} days (${months} months)`;
    }
}

function addDeclineClass(value) {
    return value < 0 ? 'decline-cell' : '';
}

function addPositiveClass(value) {
    return value > 0 ? 'positive-cell' : '';
}

// Populate frequency analysis table
function populateFrequencyTable() {
    const tbody = document.getElementById('frequency-table-body');

    dashboardData.frequencyAnalysis.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${item.declineType}</strong></td>
            <td>${item.frequency}</td>
            <td>${formatRecoveryTime(item.recoveryDays)}</td>
        `;
        tbody.appendChild(row);
    });
}

// Populate historical bear markets table
function populateHistoricalTable() {
    const tbody = document.getElementById('historical-table-body');

    dashboardData.historicalBearMarkets.forEach(market => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${market.year}</strong></td>
            <td>${market.startDate}</td>
            <td>${market.endDate}</td>
            <td class="${addDeclineClass(market.decline)}"><strong>${market.decline}%</strong></td>
            <td>${market.durationMonths}</td>
            <td>${market.recoveryMonths}</td>
        `;

        // Add click event for row highlighting
        row.addEventListener('click', function() {
            // Remove previous highlights
            tbody.querySelectorAll('tr').forEach(r => r.classList.remove('highlighted'));
            // Add highlight to clicked row
            this.classList.add('highlighted');

            // Show details (could expand this functionality)
            console.log(`Selected bear market: ${market.year}`);
        });

        tbody.appendChild(row);
    });
}

// Populate recent bear markets section
function populateRecentBearMarkets() {
    const container = document.getElementById('recent-bear-markets');

    dashboardData.recentBearMarkets.forEach(market => {
        const card = document.createElement('div');
        card.className = 'recent-card';
        card.innerHTML = `
            <h3>${market.name}</h3>
            <div class="recent-detail">
                <strong>Decline:</strong>
                <span class="decline">${market.decline}%</span>
            </div>
            <div class="recent-detail">
                <strong>Duration:</strong>
                <span>${market.duration}</span>
            </div>
            <div class="recent-detail">
                <strong>Recovery:</strong>
                <span class="recovery">${market.recovery}</span>
            </div>
            <div class="recent-description">${market.description}</div>
        `;
        container.appendChild(card);
    });
}

// Add interactive features
function addInteractiveFeatures() {
    // Add tooltips to metric cards
    const metricCards = document.querySelectorAll('.metric-card');
    metricCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-5px) scale(1)';
        });
    });

    // Add search functionality for historical table
    addTableSearch();

    // Add sorting functionality for historical table
    addTableSorting();
}

// Add table search functionality
function addTableSearch() {
    const searchContainer = document.querySelector('.historical-section');
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search bear markets by year or decade...';
    searchInput.style.cssText = `
        width: 100%;
        max-width: 300px;
        padding: 10px 15px;
        margin-bottom: 20px;
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.1);
        color: white;
        font-size: 0.9rem;
    `;

    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const rows = document.querySelectorAll('#historical-table-body tr');

        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });

    // Insert search input before the table
    const tableContainer = searchContainer.querySelector('.table-container');
    searchContainer.insertBefore(searchInput, tableContainer);
}

// Add table sorting functionality
function addTableSorting() {
    const headers = document.querySelectorAll('#historical-table-body').length > 0 ? 
        document.querySelectorAll('.historical-table th') : [];

    headers.forEach((header, index) => {
        header.style.cursor = 'pointer';
        header.style.userSelect = 'none';

        header.addEventListener('click', function() {
            sortTable(index);
        });

        // Add sort indicator
        header.innerHTML += ' <span class="sort-indicator">↕️</span>';
    });
}

function sortTable(columnIndex) {
    const table = document.querySelector('.historical-table');
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));

    // Determine sort direction
    const isAscending = table.dataset.sortDirection !== 'asc';
    table.dataset.sortDirection = isAscending ? 'asc' : 'desc';

    // Sort rows
    rows.sort((a, b) => {
        const aValue = a.cells[columnIndex].textContent.replace(/[^\d.-]/g, '');
        const bValue = b.cells[columnIndex].textContent.replace(/[^\d.-]/g, '');

        // Try to parse as numbers, fall back to string comparison
        const aNum = parseFloat(aValue);
        const bNum = parseFloat(bValue);

        if (!isNaN(aNum) && !isNaN(bNum)) {
            return isAscending ? aNum - bNum : bNum - aNum;
        } else {
            return isAscending ? 
                aValue.localeCompare(bValue) : 
                bValue.localeCompare(aValue);
        }
    });

    // Re-append sorted rows
    rows.forEach(row => tbody.appendChild(row));

    // Update sort indicators
    document.querySelectorAll('.sort-indicator').forEach(indicator => {
        indicator.textContent = '↕️';
    });

    const currentHeader = table.querySelectorAll('th')[columnIndex];
    currentHeader.querySelector('.sort-indicator').textContent = isAscending ? '↑' : '↓';
}

// Add CSS for highlighted rows
function addHighlightStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .highlighted {
            background: rgba(168, 218, 220, 0.2) !important;
            border-left: 4px solid #a8dadc !important;
        }

        .sort-indicator {
            font-size: 0.8rem;
            opacity: 0.6;
            margin-left: 5px;
        }
    `;
    document.head.appendChild(style);
}

// Initialize dashboard
function initializeDashboard() {
    console.log('🚀 Initializing Stock Market Dashboard...');

    // Populate all sections
    populateFrequencyTable();
    populateHistoricalTable();
    populateRecentBearMarkets();

    // Add interactive features
    addInteractiveFeatures();
    addHighlightStyles();

    // Add smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    console.log('✅ Dashboard initialized successfully!');
}

// Wait for DOM to be fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeDashboard);
} else {
    initializeDashboard();
}

// Export data for potential external use
window.dashboardData = dashboardData;