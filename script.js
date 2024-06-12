function calculateTotalScore() {
    const sections = {
        techDoc: ["techDoc"],
        systemArchitecture: ["codeSmells","scalability", "modularity", "security", "performance"],
        technologyStack: ["compatibility", "maintenance"],
        infrastructureRequirements: ["infraScalability", "costEfficiency", "reliability"]
    };

    const weights = {
        techDoc: 0.20,
        systemArchitecture: 0.20,
        technologyStack: 0.20,
        infrastructureRequirements: 0.20
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
