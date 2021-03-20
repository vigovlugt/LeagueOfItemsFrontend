export function winrate(wins, matches) {
  return parseFloat(((wins / matches) * 100).toFixed(2)) + "%";
}

export function winrateClass(wins, matches) {
  const winrate = wins / matches;

  if (winrate < 0.45) {
    return "text-winrate-shiggo";
  } else if (winrate < 0.485) {
    return "text-winrate-meh";
  } else if (winrate < 0.515) {
    return "text-winrate-okay";
  } else if (winrate < 0.53) {
    return "text-winrate-good";
  } else if (winrate < 0.55) {
    return "text-winrate-great";
  }

  return "text-winrate-volxd";
}
