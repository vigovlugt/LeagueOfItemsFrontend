export function percentage(num) {
    return parseFloat((num * 100).toFixed(2)) + "%";
}

export function winrate(wins, matches) {
    if (matches === 0) {
        return "-%";
    }

    return parseFloat(((wins / matches) * 100).toFixed(2)) + "%";
}

export function winrateIncrease(wins, matches, previousWins, previousMatches) {
    if (matches === 0 || previousMatches == 0) {
        return "-%";
    }

    return (
        parseFloat(
            ((wins / matches - previousWins / previousMatches) * 100).toFixed(2)
        ) + "%"
    );
}

export function pickrate(wins, matches) {
    if (matches === 0) {
        return "-%";
    }

    return parseFloat(((wins / matches) * 100).toFixed(2)) + "%";
}

export function winrateClass(wins: number, matches?: number, noOkay = false) {
    if (matches === 0) {
        return "text-winrate-okay dark:text-winrate-okay-dark";
    }

    const winrate = matches === undefined ? wins : wins / matches;

    if (winrate < 0.45) {
        return "text-winrate-shiggo";
    } else if (winrate < (noOkay ? 0.5 : 0.485)) {
        return "text-winrate-meh";
    } else if (winrate < 0.515 && !noOkay) {
        return "text-winrate-okay dark:text-winrate-okay-dark";
    } else if (winrate < 0.53) {
        return "text-winrate-good";
    } else if (winrate < 0.55) {
        return "text-winrate-great";
    }

    return "text-winrate-volxd";
}

export function removeTags(str) {
    return str.replace(/<[^>]*>/g, "");
}
