const butInstall = document.getElementById("buttonInstall");

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener("beforeinstallprompt", (event) => {
  // Prevent the mini-infobar from appearing on mobile
  event.preventDefault();
  // Stash the event so it can be triggered later.
  window.deferredPrompt = event;
  // Update UI notify the user they can install the PWA
  butInstall.style.display = "block";
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener("click", async () => {
  const promptEvent = window.deferredPrompt;
  if (!promptEvent) {
    // The deferred prompt isn't available.
    return;
  }
  // Show the install prompt
  promptEvent.prompt();
  // Wait for the user to respond to the prompt
  const result = await promptEvent.userChoice;
  console.log("User choice", result);
  // We've used the prompt, and can't use it again, throw it away
  window.deferredPrompt = null;
  // Hide the install button
  butInstall.style.display = "none";
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener("appinstalled", (event) => {
  console.log("PWA was installed");
  // Clear the deferredPrompt so it can be garbage collected
  window.deferredPrompt = null;
  // Optionally, send analytics event to indicate successful install
  // e.g., logInstall(event);
});
