console.log('ConnectCampus loaded successfully');

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
