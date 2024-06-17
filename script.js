const frameworks = {
    Python: {
        frontend: ["Django", "Flask", "Pyramid", "Tornado", "Web2py"],
        backend: ["Django", "Flask", "Pyramid", "Tornado", "Web2py"]
    },
    JavaScript: {
        frontend: ["React", "Vue", "Angular"],
        backend: ["Node.js", "Express"]
    },
    Java: {
        backend: ["Spring", "Struts", "Hibernate"]
    },
    TypeScript: {
        frontend: ["Angular", "React", "Vue"],
        backend: ["NestJS", "Express"]
    },
    ".Net": {
        backend: [".NET Core", "ASP.NET"]
    },
    PHP: {
        backend: ["Laravel", "Symfony", "CodeIgniter", "Zend", "CakePHP"]
    },
    Ruby: {
        backend: ["Rails", "Sinatra"]
    },
    Perl: {
        backend: ["Catalyst", "Mojolicious"]
    },
    Golang: {
        backend: ["Gin", "Beego", "Echo"]
    },
    Swift: {
        frontend: ["SwiftUI"],
        backend: ["Vapor", "Kitura"]
    },
    Kotlin: {
        backend: ["Ktor", "Spring"]
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
    Angular: {
        "11.x": { popularity: 5, support: 5 },
        "10.x": { popularity: 5, support: 5 },
        "9.x": { popularity: 4, support: 4 },
        "8.x and below": { popularity: 3, support: 3 }
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
    NestJS: {
        "7.x": { popularity: 5, support: 5 },
        "6.x": { popularity: 5, support: 5 },
        "5.x": { popularity: 4, support: 4 },
        "4.x and below": { popularity: 3, support: 3 }
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
    Catalyst: {
        "5.x": { popularity: 4, support: 4 },
        "4.x": { popularity: 4, support: 4 },
        "3.x and below": { popularity: 3, support: 3 }
    },
    Mojolicious: {
        "9.x": { popularity: 4, support: 4 },
        "8.x": { popularity: 4, support: 4 },
        "7.x and below": { popularity: 3, support: 3 }
    },
    Gin: {
        "1.x": { popularity: 5, support: 5 }
    },
    Beego: {
        "1.x": { popularity: 4, support: 4 }
    },
    Echo: {
        "4.x": { popularity: 5, support: 5 },
        "3.x": { popularity: 4, support: 4 },
        "2.x and below": { popularity: 3, support: 3 }
    },
    SwiftUI: {
        "3.x": { popularity: 5, support: 5 },
        "2.x": { popularity: 4, support: 4 },
        "1.x": { popularity: 3, support: 3 }
    },
    Vapor: {
        "4.x": { popularity: 5, support: 5 },
        "3.x": { popularity: 4, support: 4 },
        "2.x and below": { popularity: 3, support: 3 }
    },
    Kitura: {
        "3.x": { popularity: 4, support: 4 },
        "2.x": { popularity: 4, support: 4 },
        "1.x": { popularity: 3, support: 3 }
    },
    Ktor: {
        "2.x": { popularity: 5, support: 5 },
        "1.x": { popularity: 4, support: 4 }
    }
};

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
    calculateTotalScore()
}


function calculateTotalScore() {
    const sections = {
        techDoc: ["techDoc","codeSmells","testCoverage","bestPractices","versionControl"],
        systemArchitecture: ["scalability", "modularity", "security", "performance"],
        infrastructureRequirements: ["infraScalability", "costEfficiency", "reliability"],
        language: ["popularity","communitySupport"]
    };

    const weights = {
        techDoc: 0.25,
        systemArchitecture: 0.25,
        infrastructureRequirements: 0.25,
        language: 0.25
    };

    let totalScore = 0;

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
            totalScore += averageScore * weights[section];
        }
    }

    document.getElementById('totalScore').textContent = totalScore.toFixed(2);
}