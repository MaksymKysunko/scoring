const sections = {
    codeQuality: ["securityScore", "reliabilityScore", "maintanabilityScore", "securityHotspotsScore", "testCoverage", "commentsDensity"],
    buildCI: ["ciPipeline", "buildState"],
    deployment: ["deploymentScore"],
    languageFramework: ["popularity", "support", "easeOfUse"],
    versionControl: ["branchingStrategy", "commitMessages"]
};

document.addEventListener('DOMContentLoaded', function() {
    const sectionKeys = Object.keys(sections);
    const numberOfSections = sectionKeys.length;
    const calculatedWeight = (100 / numberOfSections).toFixed(2);

    sectionKeys.forEach(section => {
        document.getElementById(`${section}Weight`).value = calculatedWeight;
        document.getElementById(`${section}WeightDisplay`).textContent = calculatedWeight;
    });

    // Load form data from localStorage
    loadFormData();

    // Set default values for summary table weights
    calculateTotalScore();

    // Add event listeners to save data on input change
    document.querySelectorAll('#scoringForm input, #scoringForm select').forEach(input => {
        input.addEventListener('change', saveFormData);
    });
});

function getGrade(score) {
    if (score < 2) return 'E';
    if (score < 3) return 'D';
    if (score < 4) return 'C';
    if (score < 5) return 'B';
    return 'A';
}

function calculateTotalScore() {
    let sectionScores = {};
    let totalWeightedScore = 0;
    let totalWeight = 0;

    // First iteration: Collect scores and total weight
    for (let section in sections) {
        sectionScores[section] = 0;
        let count = 0;

        sections[section].forEach(param => {
            const value = parseInt(document.getElementById(param).value);
            if (value) {
                sectionScores[section] += value;
                count++;
            }
        });

        if (count > 0) {
            const weight = parseFloat(document.getElementById(`${section}Weight`).value);
            totalWeight += weight;
            sectionScores[section] = sectionScores[section] / count;
        }
    }

    // Second iteration: Calculate and display weighted scores
    for (let section in sections) {
        if (sectionScores[section] > 0) {
            const weight = parseFloat(document.getElementById(`${section}Weight`).value);
            const weightedScore = sectionScores[section] * weight / totalWeight;
            totalWeightedScore += weightedScore;

            // Update individual section weighted score
            document.getElementById(`${section}WeightedScoreDisplay`).textContent = (weightedScore).toFixed(2);
            document.getElementById(`${section}GradeDisplay`).textContent = getGrade(sectionScores[section]);
        } else {
            document.getElementById(`${section}WeightedScoreDisplay`).textContent = '0';
            document.getElementById(`${section}GradeDisplay`).textContent = '';
        }

        // Update individual section weight
        document.getElementById(`${section}WeightDisplay`).textContent = parseFloat(document.getElementById(`${section}Weight`).value).toFixed(2);
    }

    const finalScore = totalWeightedScore;
    if (finalScore > 0) {
        document.getElementById('gradeOnTop').textContent = getGrade(finalScore);
        document.getElementById('totalGrade').textContent = getGrade(finalScore);
    }

    // Update total scores
    document.getElementById('totalWeight').textContent = totalWeight.toFixed(2);
    document.getElementById('totalWeightedScore').textContent = totalWeightedScore.toFixed(2);
}

function generateReport() {
    const projectName = document.getElementById('projectName').value;
    const componentType = document.getElementById('componentType').value;
    const programmingLanguage = document.getElementById('programmingLanguage').value;

    let reportContent = `
        <html>
        <head>
            <title>Project Evaluation Report</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                h2 { color: #2F4F4F; }
                table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
                th, td { padding: 10px; border: 1px solid #ddd; text-align: left; }
                th { background-color: #f2f2f2; }
            </style>
        </head>
        <body>
            <h1>Project Evaluation Report</h1>
            <p><strong>Project Name:</strong> ${projectName}</p>
            <p><strong>Component Type:</strong> ${componentType}</p>
            <p><strong>Programming Language/Framework:</strong> ${programmingLanguage}</p>
    `;

    for (let section in sections) {
        reportContent += `<h2>${section}</h2>`;
        reportContent += `<table>`;
        reportContent += `<tr><th>Criteria</th><th>Score</th></tr>`;
        sections[section].forEach(param => {
            const labelElement = document.querySelector(`label[for=${param}]`);
            const value = getGrade(document.getElementById(param).value); 
            /*
            if (document.getElementById(param).value) 
                { 
                    const value = getGrade(document.getElementById(param).value); 
                }
            else 
                { const value = ''; }
            */
            if (labelElement) {
                const label = labelElement.innerText;
                reportContent += `<tr><td>${label}</td><td>${value}</td></tr>`;
            }
        });
        reportContent += `</table>`;
    }

    // Include the total table
    reportContent += `
        <h2>Summary Table</h2>
        <table>
            <thead>
                <tr>
                    <th>Criteria</th>
                    <th>Weight</th>
                    <th>Grade</th>
                    <th>Weighted Score</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Code Readability and Maintainability</td>
                    <td>${document.getElementById('codeQualityWeightDisplay').textContent}</td>
                    <td>${document.getElementById('codeQualityGradeDisplay').textContent}</td>
                    <td>${document.getElementById('codeQualityWeightedScoreDisplay').textContent}</td>
                </tr>
                <tr>
                    <td>CI/CD Pipeline</td>
                    <td>${document.getElementById('buildCIWeightDisplay').textContent}</td>
                    <td>${document.getElementById('buildCIGradeDisplay').textContent}</td>
                    <td>${document.getElementById('buildCIWeightedScoreDisplay').textContent}</td>
                </tr>
                <tr>
                    <td>Version Control</td>
                    <td>${document.getElementById('versionControlWeightDisplay').textContent}</td>
                    <td>${document.getElementById('versionControlGradeDisplay').textContent}</td>
                    <td>${document.getElementById('versionControlWeightedScoreDisplay').textContent}</td>
                </tr>
                <tr>
                    <td>Deployment</td>
                    <td>${document.getElementById('deploymentWeightDisplay').textContent}</td>
                    <td>${document.getElementById('deploymentGradeDisplay').textContent}</td>
                    <td>${document.getElementById('deploymentWeightedScoreDisplay').textContent}</td>
                </tr>
                <tr>
                    <td>Programming Language and Frameworks</td>
                    <td>${document.getElementById('languageFrameworkWeightDisplay').textContent}</td>
                    <td>${document.getElementById('languageFrameworkGradeDisplay').textContent}</td>
                    <td>${document.getElementById('languageFrameworkWeightedScoreDisplay').textContent}</td>
                </tr>
                <tr>
                    <td>Total</td>
                    <td>${document.getElementById('totalWeight').textContent}</td>
                    <td>${document.getElementById('totalGrade').textContent}</td>
                    <td>${document.getElementById('totalWeightedScore').textContent}</td>
                </tr>
            </tbody>
        </table>
    `;

    reportContent += `</body></html>`;


    const newTab = window.open();
    newTab.document.write(reportContent);
    newTab.document.close();
}

// Function to clear form data
function clearForm() {
    document.querySelectorAll('#scoringForm input, #scoringForm select').forEach(input => {
        if (!input.name.includes('weight') && !input.id.includes('weight')) {
            input.value = '';
        }
    });
    localStorage.removeItem('scoringFormData');
    calculateTotalScore();
}

// Function to save form data to localStorage
function saveFormData() {
    const formData = {};
    document.querySelectorAll('#scoringForm input, #scoringForm select').forEach(input => {
        formData[input.id] = input.value;
    });
    localStorage.setItem('scoringFormData', JSON.stringify(formData));
}

// Function to load form data from localStorage
function loadFormData() {
    const savedFormData = localStorage.getItem('scoringFormData');
    if (savedFormData) {
        const formData = JSON.parse(savedFormData);
        for (const key in formData) {
            if (formData.hasOwnProperty(key)) {
                const input = document.getElementById(key);
                if (input) {
                    input.value = formData[key];
                }
            }
        }
        calculateTotalScore();
    }
}

// Export functions for use in HTML
/* exported calculateTotalScore */
window.calculateTotalScore = calculateTotalScore;
