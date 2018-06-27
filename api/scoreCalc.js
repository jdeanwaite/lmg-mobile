export function calculateActualValue(score) {
  if (!score || score.value === 0) {
    return 0;
  }
  const lastUpdate = new Date(score.updatedAt);
  const daysSinceLastUpdate = daysBetween(lastUpdate, new Date());
  if (score.value > 30) {
    return Math.max(0);
  } else {
    return Math.min(score.value, 20)
  }
}

function daysBetween(first, second) {
  // Take the difference between the dates and divide by milliseconds per day.
  // Round to nearest whole number to deal with DST.
  return Math.round((second - first) / (1000 * 60 * 60 * 24));
}
