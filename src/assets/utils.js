
export function sortEntities(entities, update){
    const sorted = [...entities].sort((a, b) => {
        if (a.initiative === b.initiative) {
            console.log(a.name + " and " + b.name + " have the same initiative: " + a.initiative);
            if (a.iniBonus === b.iniBonus) {
                console.log(a.name + " and " + b.name + " have the same initiative bonus: " + a.iniBonus);
                if (a.name != b.name){
                    var userResponce = parseInt(prompt("Both " + a.name + " and " + b.name + " have the same initiative and initiative bonus. Who goes first? (Enter 1 for " + a.name + ", 2 for " + b.name + ")"))
                    if (userResponce === 1) {
                        return -100;
                    } else if (userResponce === 2) {
                        return 100;
                    } else {
                    alert("Invalid input. Defaulting to " + a.name + " going first.");
                    return -100;
                    }
                } return 0;
            }
            return b.iniBonus - a.iniBonus;
        }
        return b.initiative - a.initiative;
    });
    return sorted;
}