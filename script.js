async function checkPassword() {
  const pwd = document.getElementById("password").value;
  if (!pwd) return;

  const hash = await sha1(pwd);
  const prefix = hash.substring(0, 5);
  const suffix = hash.substring(5);

  const breached = await isBreached(prefix, suffix);

  const result = document.getElementById("result");

  if (breached) {
    result.innerText = "⚠️ Password found in breach dataset";
    result.style.color = "red";
  } else {
    result.innerText = "✅ Password not found in known breaches";
    result.style.color = "green";
  }
}

async function sha1(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-1", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("").toUpperCase();
}

async function isBreached(prefix, suffix) {
  const response = await fetch("breached_hashes.txt");
  const text = await response.text();
  const lines = text.split("\n");

  for (let line of lines) {
    const [p, s] = line.trim().split(":");
    if (p === prefix && s === suffix) {
      return true;
    }
  }
  return false;
}
const entropy = calculateEntropy(pwd);
document.getElementById("entropy").innerText =
  "Entropy: " + entropy.toFixed(2) + " bits";

document.getElementById("cracktime").innerText =
  "Estimated crack time: " + crackTime(entropy);
