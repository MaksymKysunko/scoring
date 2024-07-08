const DEFAULT_CODE_QUALITY_WEIGHT = 0.20;
const DEFAULT_BUILD_CI_SCORE_WEIGHT = 0.20;
const DEFAULT_DEPLOYMENT_WEIGHT = 0.20;
const DEFAULT_LANGUAGE_FRAMEWORK_WEIGHT = 0.20;
const DEFAULT_VERSION_CONTROL_WEIGHT = 0.20;

/*
const gradeDescriptions = {
    popularity: {
        A: "Widely used with a large and active community.",
        B: "Moderately popular with a reasonably active community.",
        C: "Somewhat popular with a smaller community.",
        D: "Rarely used with a minimal community.",
        E: "Almost never used with an inactive or non-existent community."
    },
    support: {
        A: "Excellent official support and active community support channels.",
        B: "Good official support and active community support channels.",
        C: "Adequate support with some community activity.",
        D: "Limited support and minimal community activity.",
        E: "Poor support and negligible community activity."
    },
    performance: {
        A: "Known for excellent performance and efficiency.",
        B: "Generally good performance with minor inefficiencies.",
        C: "Average performance, suitable for most tasks.",
        D: "Below-average performance, may have significant inefficiencies.",
        E: "Poor performance, generally not recommended for performance-critical applications."
    },
    easeOfUse: {
        A: "Easy to learn and use, even for beginners.",
        B: "Moderately easy to learn, with some complexities.",
        C: "Average learning curve, suitable for developers with some experience.",
        D: "Steep learning curve, may be challenging for beginners.",
        E: "Very difficult to learn and use, even for experienced developers."
    }
};
*/

document.addEventListener('DOMContentLoaded', function() {
    // setting score values as default for input fields
    document.getElementById('codeQualityWeight').value = DEFAULT_CODE_QUALITY_WEIGHT;
    document.getElementById('buildCIWeight').value = DEFAULT_BUILD_CI_SCORE_WEIGHT;
    document.getElementById('deploymentWeight').value = DEFAULT_DEPLOYMENT_WEIGHT;
    document.getElementById('languageFrameworkWeight').value = DEFAULT_LANGUAGE_FRAMEWORK_WEIGHT;
    document.getElementById('versionControlWeight').value = DEFAULT_VERSION_CONTROL_WEIGHT;

    //setting weight default values for the result table
    document.getElementById('codeQualityWeightDisplay').textContent = DEFAULT_CODE_QUALITY_WEIGHT.toFixed(2);
    document.getElementById('buildCIWeightDisplay').textContent = DEFAULT_BUILD_CI_SCORE_WEIGHT.toFixed(2);
    document.getElementById('deploymentWeightDisplay').textContent = DEFAULT_BUILD_CI_SCORE_WEIGHT.toFixed(2);
        document.getElementById('languageFrameworkWeightDisplay').textContent = DEFAULT_LANGUAGE_FRAMEWORK_WEIGHT.toFixed(2);
    document.getElementById('versionControlWeightDisplay').textContent = DEFAULT_VERSION_CONTROL_WEIGHT.toFixed(2);
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
        codeQuality: ["securityScore","reliabilityScore","MaintanabilityScore", "securityHotspotsScore", "testCoverage",  "commentsDensity"],
        buildCI: ["ciPipeline", 'buildState'],
        deployment: ["deploymentScore"],
        languageFramework: ["popularity", "support", "performance", "easeOfUse"],
        versionControl: ["branchingStrategy", "commitMessages", "pullRequests"]
    };

    const weights = {
        codeQuality: parseFloat(document.getElementById('codeQualityWeight').value) || DEFAULT_CODE_QUALITY_WEIGHT,
        buildCI: parseFloat(document.getElementById('buildCIWeight').value) || DEFAULT_BUILD_CI_SCORE_WEIGHT,
        deployment: parseFloat(document.getElementById('buildCIWeight').value) || DEFAULT_DEPLOYMENT_WEIGHT,
        languageFramework: parseFloat(document.getElementById('languageFrameworkWeight').value) || DEFAULT_LANGUAGE_FRAMEWORK_WEIGHT,
        versionControl: parseFloat(document.getElementById('versionControlWeight').value) || DEFAULT_VERSION_CONTROL_WEIGHT
    };

    let totalWeight = 0;
    let totalWeightedScore = 0;

    for (let section in sections) {
        let sectionScore = 0;
        let count = 0;

        sections[section].forEach(param => {
            const value = parseInt(document.getElementById(param).value);
            if (value) {
                sectionScore += value;
                count++;
            }
        });

        if (count > 0) {
            const averageScore = sectionScore / count;
            const weightedScore = averageScore * weights[section];

            totalWeightedScore += weightedScore;

            // Update individual section score
            document.getElementById(`${section}ScoreDisplay`).textContent = averageScore.toFixed(2);
            document.getElementById(`${section}WeightedScoreDisplay`).textContent = weightedScore.toFixed(2);
        }
        
        // Update individual section weight 
        totalWeight += weights[section];
        document.getElementById(`${section}WeightDisplay`).textContent = weights[section].toFixed(2);

    }

    document.getElementById('gradeOnTop').textContent = getGrade(totalWeightedScore);

    // Update total scores
    document.getElementById('totalWeight').textContent = totalWeight.toFixed(2);
    document.getElementById('totalWeightedScore').textContent = totalWeightedScore.toFixed(2);
}

// Export functions for use in HTML
/* exported updateLanguageEvaluation */
window.updateLanguageEvaluation = updateLanguageEvaluation;
/* exported calculateTotalScore */
window.calculateTotalScore = calculateTotalScore;