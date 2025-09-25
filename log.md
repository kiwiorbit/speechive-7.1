# Speechive App: Changelog & Developer Notes

This log tracks recent feature implementations, bug fixes, and provides guidance for developers on how to manually adjust certain features for testing purposes.

---

## Recent Changes & Manual Adjustments

### 1. Single-Page Progress Dashboard
- **Change:** The `ProgressTracker` component was completely redesigned. The 'Daily', 'Strategies', 'Weekly', and 'Monthly' tabs no longer switch between different views. Instead, they are all displayed on a single, scrollable page.
- **Behavior:** The tabs now act as smooth-scrolling links to the corresponding section. The active tab is highlighted automatically as the user scrolls, using an `IntersectionObserver` for efficient tracking.
- **Enhancement:** A `scroll-margin-top` was added to each section to ensure that the sticky navigation header does not obscure the section title when a user jumps to it.

### 2. Enhanced Progress Visualizations
- **New Feature:** Added a **Monthly Performance** bar chart to the 'Monthly' section, visualizing total time spent across all 30 days of a challenge.
- **New Feature:** Added a **Top 5 Activities** horizontal bar chart, showing the most-practiced activities by cumulative time across all strategies.
- **Data Sync:** Refactored the 'Weekly' bar chart and 'Monthly' calendar to use the live `strategyChallengesData`, ensuring all visualizations on the dashboard are consistent and accurate.

### 3. Strategy Detail Pages & Charts
- **New Feature:** Created a new page component, `StrategyDetailPage.tsx`, to display a detailed progress summary for a single strategy.
- **Behavior:** This page is accessed by clicking on a strategy card from the 'Strategies Overview' section on the main Progress Dashboard.
- **New Feature:** Added a **"Top Activities"** bar chart to each `StrategyDetailPage`, showing the most-practiced activities *within that specific strategy*.

### 4. Daily Activity Limits & Minimum Timer
- **New Rule:** Users are now limited to completing a **maximum of 3 activities per day**. Logic was added in `App.tsx` to check this limit before starting a timer. The UI in `StrategyChallengePage.tsx` is updated to disable activities once the limit is reached.
- **New Rule:** A **minimum duration of 10 minutes** is now required before the timer can be stopped. The 'Stop' button in `FloatingTimer.tsx` is disabled, and a countdown is displayed until the 10-minute mark is reached.

### 5. Day Completion Celebration
- **New Feature:** When a user completes all activities for a single day within any strategy, a full-screen celebration modal (`DayCompletionCelebration.tsx`) is displayed.
- **Behavior:** This modal features a confetti animation, shows the user which badge they've unlocked, and automatically dismisses after 5 seconds. The logic is triggered in the `handleStopTimer` function in `App.tsx`.
- **Reward Update:** The `onClaimBadge` function was updated to award **33 Honey Drops**.

### 6. Smart Navigation for Challenges
- **Enhancement:** The `StrategyChallengePage.tsx` was updated to automatically scroll to the **first day with incomplete activities** when the page is opened. This provides a better user experience, as users no longer start at Day 1 every time.

---

## How to Manually Adjust Features for Testing

For development and testing, you may need to bypass some of the new rules.

### Disabling the 10-Minute Timer Limit

1.  **Open the file:** `components/FloatingTimer.tsx`
2.  **Locate the constant:** Find the line that defines `MINIMUM_SECONDS`.
    ```typescript
    const MINIMUM_SECONDS = 10 * 60; // 10 minutes
    ```
3.  **Change the value to 0:**
    ```typescript
    // For testing, change this value to 0
    const MINIMUM_SECONDS = 0; 
    ```
This will make the "Stop" button available immediately after the timer starts. Remember to change it back to `10 * 60` before deployment.

### Adjusting the 3-Activities-Per-Day Limit

1.  **Open the file:** `App.tsx`
2.  **Locate the handler function:** Find the `handleStartTimer` function.
3.  **Find the condition:** Inside the function, locate the `if` statement that checks the limit.
    ```typescript
    if (todaysCompletedActivitiesCount >= 3) {
      alert("You have completed the maximum of 3 activities for today. Come back tomorrow!");
      return;
    }
    ```
4.  **Adjust the number:** You can change `3` to a higher number (e.g., `10`) for testing, or comment out the entire block to disable the limit temporarily.
    ```typescript
    // Temporarily increased for testing
    if (todaysCompletedActivitiesCount >= 10) { 
      // ...
    }
    ```
This allows you to complete more activities in a single day for faster testing of features like badge unlocking and progress tracking.
