console.log('ConnectCampus loaded successfully');\n\n// Profile Management\nconst profileIcon = document.getElementById('profileIcon');\nconst profileModal = document.getElementById('profileModal');\nconst closeModal = document.getElementById('closeModal');\nconst profileForm = document.getElementById('profileForm');\nconst profilePage = document.getElementById('profilePage');\nconst mainContainer = document.getElementById('mainContainer');\nconst mainNav = document.getElementById('mainNav');\nconst backBtn = document.getElementById('backBtn');\nconst editProfileBtn = document.getElementById('editProfileBtn');\n\n// Load profile from localStorage\nfunction loadProfile() {\n  const profile = JSON.parse(localStorage.getItem('userProfile')) || {\n    name: 'Your Name',\n    email: 'your.email@campus.edu',\n    bio: 'Your bio goes here',\n    views: Math.floor(Math.random() * 100),\n    clicks: Math.floor(Math.random() * 50),\n    viewers: []\n  };\n  return profile;\n}\n\n// Save profile to localStorage\nfunction saveProfile(profile) {\n  localStorage.setItem('userProfile', JSON.stringify(profile));\n}\n\n// Initialize profile icon\nfunction initializeProfileIcon() {\n  profileIcon.innerHTML = '👤';\n  profileIcon.style.cursor = 'pointer';\n  profileIcon.style.fontSize = '28px';\n}\n\n// Update profile page display\nfunction updateProfilePage() {\n  const profile = loadProfile();\n  document.getElementById('profilePageName').textContent = profile.name;\n  document.getElementById('profilePageEmail').textContent = profile.email;\n  document.getElementById('profilePageBio').textContent = profile.bio;\n  document.getElementById('viewCount').textContent = profile.views || 0;\n  document.getElementById('clickCount').textContent = profile.clicks || 0;\n  document.getElementById('interactionCount').textContent = (profile.views || 0) + (profile.clicks || 0);\n  \n  // Update viewers list\n  const viewersList = document.getElementById('viewersList');\n  if (profile.viewers && profile.viewers.length > 0) {\n    viewersList.innerHTML = profile.viewers.map(viewer => `\n      <div class=\"viewer-item\">\n        <div class=\"viewer-avatar\"></div>\n        <div class=\"viewer-info\">\n          <h3>${viewer.name}</h3>\n          <p>${viewer.timestamp}</p>\n        </div>\n      </div>\n    `).join('');\n  } else {\n    viewersList.innerHTML = '<p class=\"empty-message\">No viewers yet. Share your profile!</p>';\n  }\n}\n\n// Show profile modal\nprofileIcon.addEventListener('click', () => {\n  const profile = loadProfile();\n  document.getElementById('profileName').value = profile.name;\n  document.getElementById('profileEmail').value = profile.email;\n  document.getElementById('profileBio').value = profile.bio;\n  profileModal.style.display = 'block';\n});\n\n// Close modal\ncloseModal.addEventListener('click', () => {\n  profileModal.style.display = 'none';\n});\n\n// Save profile form\nprofileForm.addEventListener('submit', (e) => {\n  e.preventDefault();\n  const profile = loadProfile();\n  profile.name = document.getElementById('profileName').value;\n  profile.email = document.getElementById('profileEmail').value;\n  profile.bio = document.getElementById('profileBio').value;\n  saveProfile(profile);\n  profileModal.style.display = 'none';\n  updateProfilePage();\n  alert('Profile saved successfully!');\n});\n\n// Show profile page (double click on profile icon)\nprofileIcon.addEventListener('dblclick', () => {\n  mainContainer.style.display = 'none';\n  mainNav.style.display = 'none';\n  profilePage.style.display = 'block';\n  updateProfilePage();\n  // Simulate profile view\n  const profile = loadProfile();\n  profile.views = (profile.views || 0) + 1;\n  saveProfile(profile);\n});\n\n// Go back to homepage\nbackBtn.addEventListener('click', () => {\n  mainContainer.style.display = 'block';\n  mainNav.style.display = 'block';\n  profilePage.style.display = 'none';\n});\n\n// Edit profile from profile page\neditProfileBtn.addEventListener('click', () => {\n  const profile = loadProfile();\n  document.getElementById('profileName').value = profile.name;\n  document.getElementById('profileEmail').value = profile.email;\n  document.getElementById('profileBio').value = profile.bio;\n  profileModal.style.display = 'block';\n});\n\n// Close modal when clicking outside\nwindow.addEventListener('click', (e) => {\n  if (e.target === profileModal) {\n    profileModal.style.display = 'none';\n  }\n});\n\n// Initialize\ninitializeProfileIcon();

// Profile modal logic: open, close, save to localStorage
const profileBtn = document.getElementById('profileBtn');
const profileModal = document.getElementById('profileModal');
const saveBtn = document.getElementById('saveProfile');
const cancelBtn = document.getElementById('cancelProfile');
const fullNameInput = document.getElementById('fullName');
const emailInput = document.getElementById('email');
const bioInput = document.getElementById('bio');

function loadProfile() {
	try {
		const raw = localStorage.getItem('cc_profile');
		if (!raw) return null;
		return JSON.parse(raw);
	} catch (e) {
		console.error('Failed to load profile', e);
		return null;
	}
}

function saveProfile(data) {
	try {
		localStorage.setItem('cc_profile', JSON.stringify(data));
	} catch (e) {
		console.error('Failed to save profile', e);
	}
}

function openModal() {
	const data = loadProfile() || {};
	fullNameInput.value = data.fullName || '';
	emailInput.value = data.email || '';
	bioInput.value = data.bio || '';
	profileModal.classList.add('open');
	profileModal.setAttribute('aria-hidden', 'false');
}

function closeModal() {
	profileModal.classList.remove('open');
	profileModal.setAttribute('aria-hidden', 'true');
}

profileBtn && profileBtn.addEventListener('click', openModal);
cancelBtn && cancelBtn.addEventListener('click', closeModal);

saveBtn && saveBtn.addEventListener('click', () => {
	const data = {
		fullName: fullNameInput.value.trim(),
		email: emailInput.value.trim(),
		bio: bioInput.value.trim()
	};
	saveProfile(data);
	updateProfileIcon();
	closeModal();
});

// close modal when clicking outside content
profileModal && profileModal.addEventListener('click', (e) => {
	if (e.target === profileModal) closeModal();
});

function updateProfileIcon() {
	const data = loadProfile();
	const svg = document.querySelector('.profile-icon');
	if (!svg) return;
	if (data && data.fullName) {
		// show initials inside a colored circle by replacing svg with text-like circle
		const initials = data.fullName.split(' ').map(s => s[0]).slice(0,2).join('').toUpperCase();
		// create a simple circle with text using SVG
		const colored = `\n      <svg class="profile-icon" width="36" height="36" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">\n        <circle cx="18" cy="18" r="18" fill="#e6e6e6"/>\n        <text x="18" y="22" font-size="14" text-anchor="middle" fill="#555" font-family="sans-serif">${initials}</text>\n      </svg>`;
		svg.parentNode.innerHTML = colored;
	}
}

// initialize icon on load
document.addEventListener('DOMContentLoaded', updateProfileIcon);
