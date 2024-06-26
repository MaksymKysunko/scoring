const DEFAULT_CODE_QUALITY_WEIGHT = 0.30;
const DEFAULT_BUILD_CI_SCORE_WEIGHT = 0.20;
const DEFAULT_LANGUAGE_FRAMEWORK_WEIGHT = 0.30;
const DEFAULT_VERSION_CONTROL_WEIGHT = 0.20;

const frameworks = {
    Python: {
        monolith: ["Django", "Flask", "Pyramid"],
        frontend: ["Django", "Flask", "Pyramid", "Tornado", "Web2py"],
        backend: ["Django", "Flask", "Pyramid", "Tornado", "Web2py"]
    },
    JavaScript: {
        monolith: ["Express", "Meteor", "Sails.js"],
        frontend: ["React", "Vue", "Angular", "Ext JS"],
        backend: ["Node.js", "Express", "Nest"]
    },
    Java: {
        monolith: ["Spring", "Struts", "JSF"],
        backend: ["Spring", "Struts", "Hibernate"]
    },
    PHP: {
        monolith: ["Laravel", "Symfony", "CodeIgniter"],
        backend: ["Laravel", "Symfony", "CodeIgniter", "Zend", "CakePHP"]
    },
    Ruby: {
        monolith: ["Rails", "Sinatra", "Hanami"],
        backend: ["Rails", "Sinatra"]
    },
    ".Net": {
        monolith: [".NET Core", "ASP.NET", "Blazor"],
        backend: [".NET Core", "ASP.NET"]
    }
};

const versions = {
    Django: {
        "3.x": { popularity: 5, support: 5 },
        "2.x": { popularity: 5, support: 5 },
        "1.11.x": { popularity: 4, support: 4 },
        "1.10.x": { popularity: 3, support: 3 },
        "1.9.x and below": { popularity: 2, support: 2 }
    },
    Flask: {
        "2.x": { popularity: 5, support: 5 },
        "1.x": { popularity: 4, support: 4 },
    },
    Pyramid: {
        "1.10.x": { popularity: 4, support: 4 },
        "1.9.x and below": { popularity: 3, support: 3 }
    },
    Tornado: {
        "6.x": { popularity: 5, support: 5 },
        "5.x": { popularity: 4, support: 4 },
        "4.x": { popularity: 3, support: 3 },
        "3.x and below": { popularity: 2, support: 2 }
    },
    Web2py: {
        "2.x": { popularity: 4, support: 4 },
        "1.x": { popularity: 3, support: 3 }
    },
    React: {
        "17.x": { popularity: 5, support: 5 },
        "16.x": { popularity: 5, support: 5 },
        "15.x": { popularity: 4, support: 4 },
        "14.x and below": { popularity: 3, support: 3 }
    },
    Vue: {
        "3.x": { popularity: 5, support: 5 },
        "2.x": { popularity: 5, support: 5 },
        "1.x": { popularity: 4, support: 4 }
    },
    Angular: {
        "11.x": { popularity: 5, support: 5 },
        "10.x": { popularity: 5, support: 5 },
        "9.x": { popularity: 4, support: 4 },
        "8.x and below": { popularity: 3, support: 3 }
    },
    "Node.js": {
        "14.x": { popularity: 5, support: 5 },
        "12.x": { popularity: 5, support: 5 },
        "10.x": { popularity: 4, support: 4 },
        "8.x and below": { popularity: 3, support: 3 }
    },
    Express: {
        "4.x": { popularity: 5, support: 5 },
        "3.x": { popularity: 4, support: 4 },
        "2.x": { popularity: 3, support: 3 },
        "1.x": { popularity: 2, support: 2 }
    },
    Spring: {
        "5.x": { popularity: 5, support: 5 },
        "4.x": { popularity: 5, support: 5 },
        "3.x": { popularity: 4, support: 4 },
        "2.x and below": { popularity: 3, support: 3 }
    },
    Struts: {
        "2.x": { popularity: 4, support: 4 },
        "1.x": { popularity: 3, support: 3 }
    },
    Hibernate: {
        "5.x": { popularity: 5, support: 5 },
        "4.x": { popularity: 4, support: 4 },
        "3.x and below": { popularity: 3, support: 3 }
    },
    ".NET Core": {
        "5.x": { popularity: 5, support: 5 },
        "3.x": { popularity: 5, support: 5 },
        "2.x": { popularity: 4, support: 4 },
        "1.x": { popularity: 3, support: 3 }
    },
    "ASP.NET": {
        "4.x": { popularity: 5, support: 5 },
        "3.x": { popularity: 4, support: 4 },
        "2.x": { popularity: 3, support: 3 },
        "1.x": { popularity: 2, support: 2 }
    },
    Laravel: {
        "8.x": { popularity: 5, support: 5 },
        "7.x": { popularity: 5, support: 5 },
        "6.x": { popularity: 4, support: 4 },
        "5.x and below": { popularity: 3, support: 3 }
    },
    Symfony: {
        "5.x": { popularity: 5, support: 5 },
        "4.x": { popularity: 5, support: 5 },
        "3.x": { popularity: 4, support: 4 },
        "2.x and below": { popularity: 3, support: 3 }
    },
    CodeIgniter: {
        "4.x": { popularity: 4, support: 4 },
        "3.x": { popularity: 4, support: 4 },
        "2.x and below": { popularity: 3, support: 3 }
    },
    Zend: {
        "3.x": { popularity: 4, support: 4 },
        "2.x": { popularity: 4, support: 4 },
        "1.x": { popularity: 3, support: 3 }
    },
    CakePHP: {
        "4.x": { popularity: 4, support: 4 },
        "3.x": { popularity: 4, support: 4 },
        "2.x and below": { popularity: 3, support: 3 }
    },
    Rails: {
        "6.x": { popularity: 5, support: 5 },
        "5.x": { popularity: 5, support: 5 },
        "4.x": { popularity: 4, support: 4 },
        "3.x and below": { popularity: 3, support: 3 }
    },
    Sinatra: {
        "2.x": { popularity: 4, support: 4 },
        "1.x": { popularity: 3, support: 3 }
    },
    Meteor: {
        "2.x": { popularity: 5, support: 5 },
        "1.x": { popularity: 4, support: 4 }
    },
    "Sails.js": {
        "1.x": { popularity: 5, support: 5 },
        "0.x": { popularity: 4, support: 4 }
    },
    JSF: {
        "2.x": { popularity: 4, support: 4 },
        "1.x": { popularity: 3, support: 3 }
    },
    Hanami: {
        "1.x": { popularity: 4, support: 4 }
    },
    "Ext JS": {
        "7.x": { popularity: 5, support: 5 },
        "6.x": { popularity: 5, support: 5 },
        "5.x": { popularity: 4, support: 4 },
        "4.x and below": { popularity: 3, support: 3 }
    },
    Nest: {
        "7.x": { popularity: 5, support: 5 },
        "6.x": { popularity: 5, support: 5 },
        "5.x": { popularity: 4, support: 4 },
        "4.x and below": { popularity: 3, support: 3 }
    }
};

document.addEventListener('DOMContentLoaded', function() {
    // setting score values as default for input fields
    document.getElementById('codeQualityWeight').value = DEFAULT_CODE_QUALITY_WEIGHT;
    document.getElementById('buildCIWeight').value = DEFAULT_BUILD_CI_SCORE_WEIGHT;
    document.getElementById('languageFrameworkWeight').value = DEFAULT_LANGUAGE_FRAMEWORK_WEIGHT;
    document.getElementById('versionControlWeight').value = DEFAULT_VERSION_CONTROL_WEIGHT;

    //setting weight default values for the result table
    document.getElementById('codeQualityWeightDisplay').textContent = DEFAULT_CODE_QUALITY_WEIGHT.toFixed(2);
    document.getElementById('buildCIWeightDisplay').textContent = DEFAULT_BUILD_CI_SCORE_WEIGHT.toFixed(2);
    document.getElementById('languageFrameworkWeightDisplay').textContent = DEFAULT_LANGUAGE_FRAMEWORK_WEIGHT.toFixed(2);
    document.getElementById('versionControlWeightDisplay').textContent = DEFAULT_VERSION_CONTROL_WEIGHT.toFixed(2);
});

function updateComponents() {
    const language = document.getElementById('language').value;
    const componentSelect = document.getElementById('component');
    componentSelect.innerHTML = '<option value="0">Select</option>';
    if (language !== "0") {
        for (const component in frameworks[language]) {
            componentSelect.innerHTML += `<option value="${component}">${component}</option>`;
        }
    }
}

function updateFrameworks() {
    const language = document.getElementById('language').value;
    const component = document.getElementById('component').value;
    const frameworkSelect = document.getElementById('framework');
    frameworkSelect.innerHTML = '<option value="0">Select</option>';
    if (language !== "0" && component !== "0") {
        frameworks[language][component].forEach(framework => {
            frameworkSelect.innerHTML += `<option value="${framework}">${framework}</option>`;
        });
    }
}

function updateVersions() {
    const framework = document.getElementById('framework').value;
    const versionSelect = document.getElementById('version');
    versionSelect.innerHTML = '<option value="0">Select</option>';
    if (framework !== "0") {
        for (const version in versions[framework]) {
            versionSelect.innerHTML += `<option value="${version}">${version}</option>`;
        }
    }
}

function showScores() {
    const framework = document.getElementById('framework').value;
    const version = document.getElementById('version').value;
    if (framework !== "0" && version !== "0") {
        const popularity = versions[framework][version].popularity;
        const support = versions[framework][version].support;
        document.getElementById('popularity').value = popularity;
        document.getElementById('communitySupport').value = support;
    }
    calculateTotalScore();
}

function calculateTotalScore() {
    const sections = {
        codeQuality: ["securityScore","reliabilityScore","MaintanabilityScore", "securityHotspotsScore", "testCoverage",  "commentsDensity"],
        buildCI: ["ciPipeline", 'buildState'],
        languageFramework: ["popularity", "communitySupport"],
        versionControl: ["branchingStrategy", "commitMessages", "pullRequests"]
    };

    const weights = {
        codeQuality: parseFloat(document.getElementById('codeQualityWeight').value) || DEFAULT_CODE_QUALITY_WEIGHT,
        buildCI: parseFloat(document.getElementById('buildCIWeight').value) || DEFAULT_BUILD_CI_SCORE_WEIGHT,
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

    document.getElementById('totalScoreOnTop').textContent = totalWeightedScore.toFixed(2);

    // Update total scores
    document.getElementById('totalWeight').textContent = totalWeight.toFixed(2);
    document.getElementById('totalWeightedScore').textContent = totalWeightedScore.toFixed(2);
}

// Export functions for use in HTML
/* exported updateComponents */
window.updateComponents = updateComponents;
/* exported updateFrameworks */
window.updateFrameworks = updateFrameworks;
/* exported pdateVersions*/
window.updateVersions = updateVersions;
/* exported showScores */
window.showScores = showScores;