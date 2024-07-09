const sections = {};

document.addEventListener('DOMContentLoaded', function() {
    fetch('config.json')
        .then(response => response.json())
        .then(data => {
            sections = data.sections;
            generateForm();
            initializeWeights();
        });
});

function generateForm() {
    const form = document.getElementById('scoringForm');

    sections.forEach(section => {
        // Create section header
        const sectionHeader = document.createElement('h3');
        sectionHeader.textContent = section.name;
        form.appendChild(sectionHeader);

        // Create weight input
        const weightDiv = document.createElement('div');
        weightDiv.classList.add('form-group', 'row');
        weightDiv.innerHTML = `
            <label for="${section.id}Weight" class="col-sm-4 col-form-label">Weight:</label>
            <div class="col-sm-8">
                <input type="number" id="${section.id}Weight" name="${section.id}Weight" class="form-control" onchange="calculateTotalScore()">
            </div>
        `;
        form.appendChild(weightDiv);

        // Create criteria
        section.criteria.forEach(criterion => {
            const criterionDiv = document.createElement('div');
            criterionDiv.classList.add('form-group');
            criterionDiv.innerHTML = `
                <label for="${criterion.id}">${criterion.label}</label>
                <select id="${criterion.id}" name="${criterion.id}" class="form-control" onchange="calculateTotalScore()">
                    ${criterion.options.map(option => `<option value="${option.value}">${option.label}</option>`).join('')}
                </select>
            `;
            form.appendChild(criterionDiv);
        });
    });
}

function initializeWeights() {
    const sectionKeys = Object.keys(sections);
    const numberOfSections = sectionKeys.length;
    const calculatedWeight = (100 / numberOfSections).toFixed(2);

    sections.forEach(section => {
        document.getElementById(`${section.id}Weight`).value = calculatedWeight;
        document.getElementById(`${section.id}WeightDisplay`).textContent = calculatedWeight;
    });

    calculateTotalScore();
}

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

    sections.forEach(section => {
        sectionScores[section.id] = 0;
        let count = 0;

        section.criteria.forEach(criterion => {
            const value = parseInt(document.getElementById(criterion.id).value);
            if (value) {
                sectionScores[section.id] += value;
                count++;
            }
        });

        if (count > 0) {
            const weight = parseFloat(document.getElementById(`${section.id}Weight`).value);
            totalWeight += weight;
            sectionScores[section.id] = sectionScores[section.id] / count;
        }
    });

    sections.forEach(section => {
        if (sectionScores[section.id] > 0) {
            const weight = parseFloat(document.getElementById(`${section.id}Weight`).value);
            const weightedScore = sectionScores[section.id] * weight;
            totalWeightedScore += weightedScore;

            document.getElementById(`${section.id}WeightedScoreDisplay`).textContent = (weightedScore / totalWeight).toFixed(2);
            document.getElementById(`${section.id}GradeDisplay`).textContent = getGrade(sectionScores[section.id].toFixed(2));
        } else {
            document.getElementById(`${section.id}WeightedScoreDisplay`).textContent = '0';
            document.getElementById(`${section.id}GradeDisplay`).textContent = '';
        }

        document.getElementById(`${section.id}WeightDisplay`).textContent = parseFloat(document.getElementById(`${section.id}Weight`).value).toFixed(2);
    });

    const finalScore = totalWeightedScore / totalWeight;

    document.getElementById('gradeOnTop').textContent = getGrade(finalScore);

    document.getElementById('totalWeight').textContent = totalWeight.toFixed(2);
    document.getElementById('totalGrade').textContent = getGrade(finalScore);
    document.getElementById('totalWeightedScore').textContent = totalWeightedScore.toFixed(2);
}

// Export functions for use in HTML
/* exported calculateTotalScore */
window.calculateTotalScore = calculateTotalScore;
