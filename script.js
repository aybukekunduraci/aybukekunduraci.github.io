// Get references to DOM elements
const moodSelectionSection = document.getElementById('mood-selection');
const recommendationDisplaySection = document.getElementById('recommendation-display');
const moodButtons = document.querySelectorAll('.mood-btn');
const songTitle = document.getElementById('song-title');
const motivationalMessage = document.getElementById('motivational-message');
const tryAgainButton = document.getElementById('try-again-btn');
const errorMessage = document.getElementById('error-message');

// Define the data for moods, songs, and messages
const moodsData = {
    "Happy": {
        song: "Happy - Pharrell Williams",
        message: "Enerjini koru! Bu enerjinin sana harika şeyler getireceğine inanıyorum."
    },
    "Sad": {
        song: "Everything I Wanted - Billie Eilish",
        message: "Unutma, her fırtına sonunda diner. Biraz dinlen, kendini iyi hissedeceksin."
    },
    "Stressed": {
        song: "Lo-fi Chill Beats - Various Artists",
        message: "Biraz yavaşla ve nefes al, her şey yoluna girecek. Sakinleş ve odaklan."
    },
    "In Love": {
        song: "Love - Lana Del Rey",
        message: "Kalbinin sesini dinle ve aşkın tadını çıkar! Bu özel anların kıymetini bil."
    },
    "Lonely": {
        song: "Hello - Adele",
        message: "Yalnızlık geçicidir, etrafına bak ve sevdiklerini hatırla. Yeni bağlar kurmak için bir fırsat bu."
    }
};

let selectedMood = ""; // Variable to track the user's selected mood

/**
 * Displays the mood selection section and hides the recommendation section.
 * Resets any selected mood button visual feedback and error messages.
 */
function displayMoodSelection() {
    moodSelectionSection.classList.remove('hidden');
    recommendationDisplaySection.classList.add('hidden');
    errorMessage.textContent = ''; // Clear any previous error messages
    
    // Remove 'selected' class from all buttons
    moodButtons.forEach(button => {
        button.classList.remove('selected');
    });
    selectedMood = ""; // Reset the selected mood
}

/**
 * Displays the song and motivational message based on the selected mood.
 * Hides the mood selection section.
 * @param {string} mood - The mood selected by the user.
 */
function displayRecommendation(mood) {
    const data = moodsData[mood];
    if (data) {
        songTitle.textContent = data.song;
        motivationalMessage.textContent = data.message;
        moodSelectionSection.classList.add('hidden');
        recommendationDisplaySection.classList.remove('hidden');
        errorMessage.textContent = ''; // Clear error message if a mood was successfully selected
    }
}

/**
 * Event handler for when a mood button is clicked.
 * Updates the selected mood and provides visual feedback.
 */
function handleMoodSelection(event) {
    // Remove 'selected' class from previously selected button (if any)
    const currentSelected = document.querySelector('.mood-btn.selected');
    if (currentSelected) {
        currentSelected.classList.remove('selected');
    }

    // Add 'selected' class to the clicked button
    const clickedButton = event.target;
    clickedButton.classList.add('selected');
    selectedMood = clickedButton.dataset.mood; // Store the selected mood
    errorMessage.textContent = ''; // Clear error message when a mood is selected
}

/**
 * Handles the "Get Recommendation" action (which is implicitly triggered
 * by selecting a mood in this version, but can be a separate button if desired).
 * This function ensures a mood is selected before proceeding.
 */
function getRecommendation() {
    if (selectedMood) {
        displayRecommendation(selectedMood);
    } else {
        errorMessage.textContent = 'Please select your mood first!';
    }
}

// Add event listeners to each mood button
moodButtons.forEach(button => {
    button.addEventListener('click', handleMoodSelection);
});

// Add event listener to the "Try Another Mood" button
tryAgainButton.addEventListener('click', displayMoodSelection);

// Initially display the mood selection section when the page loads
document.addEventListener('DOMContentLoaded', displayMoodSelection);

// To ensure the recommendation is shown right after a mood is selected,
// we can either add a separate "Get Recommendation" button or
// modify the mood button click handler to directly call displayRecommendation.
// For a smoother flow, let's make selecting a mood automatically show the recommendation.
// We'll modify the handleMoodSelection to call getRecommendation after setting selectedMood.
moodButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        handleMoodSelection(event); // Set the selected mood and visual feedback
        getRecommendation(); // Immediately show recommendation
    });
});
