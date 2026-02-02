function calculateEntropy(password) {
  let pool = 0;

  if (/[a-z]/.test(password)) pool += 26;
  if (/[A-Z]/.test(password)) pool += 26;
  if (/[0-9]/.test(password)) pool += 10;
  if (/[^A-Za-z0-9]/.test(password)) pool += 32;

  return password.length * Math.log2(pool);
}

function crackTime(entropy) {
  const guessesPerSecond = 1e9; // GPU attacker
  const seconds = Math.pow(2, entropy) / guessesPerSecond;

  if (seconds < 60) return "seconds";
  if (seconds < 3600) return "minutes";
  if (seconds < 86400) return "hours";
  if (seconds < 31536000) return "days";
  return "years+";
}
