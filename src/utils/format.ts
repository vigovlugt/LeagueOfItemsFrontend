export function winrate(wins, matches) {
  return parseFloat(((wins / matches) * 100).toFixed(2)) + "%";
}