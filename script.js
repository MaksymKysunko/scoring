const DEFAULT_CODE_QUALITY_WEIGHT = 20;
const DEFAULT_BUILD_CI_SCORE_WEIGHT = 20;
const DEFAULT_DEPLOYMENT_WEIGHT = 20;
const DEFAULT_LANGUAGE_FRAMEWORK_WEIGHT = 20;
const DEFAULT_VERSION_CONTROL_WEIGHT = 20;

decimalsInWeight = 0


document.addEventListener('DOMContentLoaded', function() {
    // setting score values as default for input fields
    document.getElementById('codeQualityWeight').value = DEFAULT_CODE_QUALITY_WEIGHT;
    document.getElementById('buildCIWeight').value = DEFAULT_BUILD_CI_SCORE_WEIGHT;
    document.getElementById('deploymentWeight').value = DEFAULT_DEPLOYMENT_WEIGHT;
    document.getElementById('languageFrameworkWeight').value = DEFAULT_LANGUAGE_FRAMEWORK_WEIGHT;
    document.getElementById('versionControlWeight').value = DEFAULT_VERSION_CONTROL_WEIGHT;

    //setting weight default values for the result table
    document.getElementById('codeQualityWeightDisplay').textContent = DEFAULT_CODE_QUALITY_WEIGHT.toFixed(decimalsInWeight);
    document.getElementById('buildCIWeightDisplay').textContent = DEFAULT_BUILD_CI_SCORE_WEIGHT.toFixed(decimalsInWeight);
    document.getElementById('deploymentWeightDisplay').textContent = DEFAULT_BUILD_CI_SCORE_WEIGHT.toFixed(decimalsInWeight);
        document.getElementById('languageFrameworkWeightDisplay').textContent = DEFAULT_LANGUAGE_FRAMEWORK_WEIGHT.toFixed(decimalsInWeight);
    document.getElementById('versionControlWeightDisplay').textContent = DEFAULT_VERSION_CONTROL_WEIGHT.toFixed(decimalsInWeight);
});

function getGrade(score) {
    if (score <= 2) return 'E';
    if (score <= 3) return 'D';
    if (score <= 4) return 'C';
    if (score < 5) return 'B';
    return 'A';
}

function calculateTotalScore() {
    const sections = {
        codeQuality: ["securityScore", "reliabilityScore", "MaintanabilityScore", "securityHotspotsScore", "testCoverage", "commentsDensity"],
        buildCI: ["ciPipeline", "buildState"],
        deployment: ["deploymentScore"],
        languageFramework: ["popularity", "support", "performance", "easeOfUse"],
        versionControl: ["branchingStrategy", "commitMessages", "pullRequests"]
    };

    const weights = {
        codeQuality: parseFloat(document.getElementById('codeQualityWeight').value) || DEFAULT_CODE_QUALITY_WEIGHT,
        buildCI: parseFloat(document.getElementById('buildCIWeight').value) || DEFAULT_BUILD_CI_SCORE_WEIGHT,
        deployment: parseFloat(document.getElementById('deploymentWeight').value) || DEFAULT_DEPLOYMENT_WEIGHT,
        languageFramework: parseFloat(document.getElementById('languageFrameworkWeight').value) || DEFAULT_LANGUAGE_FRAMEWORK_WEIGHT,
        versionControl: parseFloat(document.getElementById('versionControlWeight').value) || DEFAULT_VERSION_CONTROL_WEIGHT
    };

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
            totalWeight += weights[section];
            sectionScores[section] = sectionScores[section]/ count ;
        }
    }

    // Second iteration: Calculate and display weighted scores
    for (let section in sections) {
        if (sectionScores[section] > 0) {
            const weightedScore = sectionScores[section] * weights[section] / totalWeight;
            totalWeightedScore += weightedScore;

            // Update individual section weighted score
            document.getElementById(`${section}WeightedScoreDisplay`).textContent = weightedScore.toFixed(2);
            document.getElementById(`${section}ScoreDisplay`).textContent = sectionScores[section].toFixed(2);
        } else {
            document.getElementById(`${section}WeightedScoreDisplay`).textContent = '0';
            document.getElementById(`${section}ScoreDisplay`).textContent = '0';
        }

        // Update individual section weight
        document.getElementById(`${section}WeightDisplay`).textContent = weights[section].toFixed(2);
    }


    document.getElementById('gradeOnTop').textContent = getGrade(totalWeightedScore);

    // Update total scores
    document.getElementById('totalWeight').textContent = totalWeight.toFixed(2);
    document.getElementById('totalWeightedScore').textContent = totalWeightedScore.toFixed(2);
    //document.getElementById('totalScore').textContent = finalScore.toFixed(2);
}


// Export functions for use in HTML
/* exported updateLanguageEvaluation */
window.updateLanguageEvaluation = updateLanguageEvaluation;
/* exported calculateTotalScore */
window.calculateTotalScore = calculateTotalScore;