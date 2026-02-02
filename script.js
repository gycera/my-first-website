function checkPassword() {
  const pwd = document.getElementById("password").value;

  const checks = {
    length: pwd.length >= 12,
    upper: /[A-Z]/.test(pwd),
    lower: /[a-z]/.test(pwd),
    number: /[0-9]/.test(pwd),
    symbol: /[^A-Za-z0-9]/.test(pwd),
    common: !isCommonPassword(pwd)
  };

  updateUI(checks);
}

function isCommonPassword(pwd) {
  const common = ["password", "123456", "qwerty", "letmein", "admin"];
  return common.includes(pwd.toLowerCase());
}

function updateUI(checks) {
  let score = 0;

  for (let key in checks) {
    const item = document.getElementById(key);
    if (checks[key]) {
      item.innerText = "✅ " + item.innerText.slice(2);
      score++;
    } else {
      item.innerText = "❌ " + item.innerText.slice(2);
    }
  }

  const result = document.getElementById("result");

  if (score <= 2) {
    result.innerText = "Very weak 🚨";
    result.style.color = "red";
  } else if (score <= 4) {
    result.innerText = "Moderate ⚠️";
    result.style.color = "orange";
  } else {
    result.innerText = "Strong ✅";
    result.style.color = "green";
  }
}
