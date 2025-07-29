let input = "";

function press(value) {
  input += value;
  document.getElementById("display").value = input;
}

function clearDisplay() {
  input = "";
  document.getElementById("display").value = "";
}

function backspace() {
  input = input.slice(0, -1);
  document.getElementById("display").value = input;
}

function calculate() {
  try {
    const result = eval(input);
    document.getElementById("display").value = result;

    // Save expression before result replaces it
    const expression = input;

    // Clear input for next calculation
    input = result.toString();

    // Send to backend
    fetch('/api/log', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        expression: expression,
        result: result
      })
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("Failed to save log");
        }
        return res.json();
      })
      .then(data => {
        console.log("Log Saved:", data.message);
        fetchLogs();
      })
      .catch(err => {
        console.error("Error saving log:", err);
      });

  } catch (error) {
    document.getElementById("display").value = "Error";
    console.error("Calculation error:", error);
  }
}

// showing logs
const historyBtn = document.getElementById("historyBtn");
const historyPanel = document.getElementById("historyPanel");
const numberButtons = document.querySelectorAll(".num-btn");

let isHistoryVisible = false;

historyBtn.addEventListener("click", () => {
  isHistoryVisible = !isHistoryVisible;

  numberButtons.forEach(btn => {
    btn.style.visibility = isHistoryVisible ? "hidden" : "visible";
  });

  historyPanel.classList.toggle("visible");

  if (isHistoryVisible) fetchLogs();
});

function fetchLogs() {
  fetch('/api/logs')
    .then(response => response.json())
    .then(logs => {
      const historyDiv = document.getElementById('history-list');
      historyDiv.innerHTML = '';

      if (logs.length === 0) {
        historyDiv.innerHTML = "<div class='log-entry'>No logs found.</div>";
        return;
      }

      const lastLogs = logs.slice(-15).reverse();

      lastLogs.forEach(log => {
        const entry = document.createElement('div');
        entry.className = 'log-entry';
        entry.textContent = `${log.expression} = ${log.result}`;
        historyDiv.appendChild(entry);
      });

      document.getElementById('historyPanel').classList.add('show');
    })
    .catch(err => {
      console.error("Error fetching logs:", err);
    });
}

function clearHistory() {
  fetch('/api/logs/clear', { method: 'DELETE' })
    .then(res => res.json())
    .then(data => {
      console.log(data.message);
      fetchLogs();
    });
}

function saveLog(entry) {
  let logs = JSON.parse(localStorage.getItem('calcLogs')) || [];
  logs.push(entry);

  // Optional: keep it trimmed even in storage
  if (logs.length > 10) {
    logs = logs.slice(-10);
  }

  localStorage.setItem('calcLogs', JSON.stringify(logs));
}
