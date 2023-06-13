// Get the HTML elements for the select dropdown and enable checkbox
const slangSelect = document.getElementById('slang-select');
const enableCheckbox = document.getElementById('enable-checkbox');

const saveButton = document.getElementById('save-button');
saveButton.addEventListener('click', function() {
    // Refresh the current page
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.reload(tabs[0].id);
    });
  });
  

// Get the stored options from Chrome storage and populate the select dropdown and enable checkbox
chrome.storage.sync.get(['slangOption', 'isEnabled'], function(result) {
  const storedSlangOption = result.slangOption;
  const storedIsEnabled = result.isEnabled;

  // Set the selected option in the select dropdown
  if (storedSlangOption) {
    slangSelect.value = storedSlangOption;
  }

  // Set the checked state of the enable checkbox
  if (storedIsEnabled !== undefined) {
    enableCheckbox.checked = storedIsEnabled;
  }
});

// Add a change event listener to the select dropdown
slangSelect.addEventListener('change', function() {
  // Get the selected slang option
  const slangOption = slangSelect.value;

  // Save the slang option to Chrome storage
  chrome.storage.sync.set({ slangOption: slangOption }, function() {
    console.log('Slang option saved:', slangOption);
  });
});

// Add a change event listener to the enable checkbox
enableCheckbox.addEventListener('change', function() {
  // Get the checked state of the enable checkbox
  const isEnabled = enableCheckbox.checked;

  // Save the checked state to Chrome storage
  chrome.storage.sync.set({ isEnabled: isEnabled }, function() {
    console.log('Extension enabled:', isEnabled);
  });
});
