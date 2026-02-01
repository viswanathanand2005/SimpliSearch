document.addEventListener("DOMContentLoaded", async () => {
  const status = document.getElementById("status");
  const preview = document.getElementById("preview");
  const saveBtn = document.getElementById("saveBtn");

  let capturedData = null;

  // 1. Get the current active tab
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  // Safety check for chrome:// pages
  if (tab.url.startsWith("chrome://")) {
    status.innerText = "Cannot run on browser system pages.";
    status.className = "error";
    saveBtn.disabled = true;
    return;
  }

  // 2. Inject script to grab text immediately upon opening
  try {
    const results = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => ({
        text: window.getSelection().toString().trim(),
        title: document.title,
        url: window.location.href,
      }),
    });

    capturedData = results[0].result;

    if (capturedData && capturedData.text) {
      // Show preview of what we found
      preview.style.display = "block";
      preview.innerText = '"' + capturedData.text + '"';
      status.innerText = "Ready to save.";
    } else {
      status.innerText = "No text selected on page.";
      status.className = "error";
      saveBtn.disabled = true;
    }
  } catch (err) {
    status.innerText = "Could not access page content.";
    status.className = "error";
    saveBtn.disabled = true;
  }

  // 3. Handle the Save Button Click
  saveBtn.addEventListener("click", async () => {
    if (!capturedData || !capturedData.text) return;

    saveBtn.innerText = "Saving...";
    saveBtn.disabled = true;

    try {
      const payload = {
        title: capturedData.title,
        url: capturedData.url,
        text: capturedData.text,
      };

      const res = await fetch("https://simplisearch-backend.onrender.com/save_page", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        status.innerText = "✓ Saved to Knowledge Base!";
        status.className = "success";
        saveBtn.innerText = "Saved";
        setTimeout(() => window.close(), 1500); // Auto-close after success
      } else {
        throw new Error("Server Error");
      }
    } catch (err) {
      console.error(err);
      status.innerText = "Connection Failed. Is the backend running?";
      status.className = "error";
      saveBtn.innerText = "Retry";
      saveBtn.disabled = false;
    }
  });
});
