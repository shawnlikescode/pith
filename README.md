# Pith - Personal Book Notes App

A simple app I'm building to capture thoughts while reading books.

## Why This

I have a problem: when I'm reading/listening to a book and come across something interesting, I want to jot down my thoughts about it. But I never have a notebook handy, and using random note apps means I can never find my thoughts later. Kindle has a note feature but I never use it and it probably isn't good.

So I'm building this app and calling it Pith. It's just for capturing book passages and my thoughts about them, then finding them again when I need them.

## What It Does

- Add notes with book title, author, page number, and your thoughts
- Search through all your notes
- Everything stays on your phone (no cloud, no accounts)
- Works offline

## How I'll Use It

I'm reading on my couch, come across something that makes me think, pull out my phone or more likely just switch from Kindle to this App, and quickly add:

- Book: "Atomic Habits"
- Author: "James Clear"
- Page: "45"
- Passage: "..........."
- Thoughts: "This habit stacking thing is exactly how I learned to floss - I just do it right after brushing"

Later when I'm trying to remember that insight about habits, I search "habit stacking" and find it immediately.

## Tech Stack

Built with React Native and Expo because I wanted it to work on my phone. Using:

- React Native + Expo (cross-platform)
- Expo Router (file-based routing)
- NativeWind (Tailwind for React Native)
- TypeScript
- Lucide icons
- Bun for package management

## Running It

If you want to run this yourself:

```bash
git clone <repository-url>
cd pith
bun install
bun start
```

Then use the Expo Go app or run `bun run ios`/`bun run android`.

## Project Structure

```
src/
├── app/           # App screens (using Expo Router)
├── components/    # Reusable UI stuff
├── features/      # Main app functionality
├── lib/           # Utilities and hooks
├── config/        # App config
└── assets/        # Images, fonts and stuff
```

## Current Status

This is very much a work in progress. Right now it's just the basic setup. Still need to build:

- [x] The actual note-taking interface
- [x] Search functionality
- [x] Local storage
- [ ] Polish

## TODO - Complete Project Plan

**THE GOAL:** Build a mobile app for logging book passages and thoughts.

**THE FEATURES (ONLY THESE):**

- Add Insight Screen: Form with Book Title, Author, Page/Location, and Note text area
- View Insights Screen: List of all saved insights
- Basic Search: Filter the list by typing keywords
- Local Storage: Insights save on phone, no internet needed

That's it. Nothing else.

### Step 1: Setup & Hello World ✅

- [x] Install development environment
- [x] Create new project
- [x] Better structure than blank-typescript expo template
- [x] Get "Hello World" running
- [x] Commit to git

### Step 2: Basic Add Form

- [x] Create an "Add Insight" screen with 5 input fields (Title, Author, Location, Passage, Note)
- [x] Add a "Save" button
- [x] For now, just console.log the data when Save is pressed
- [x] Test on phone

### Step 3: Local Storage

- [x] Research local storage options (AsyncStorage)
- [x] Make the Save button actually store the entry locally
- [x] Test that data persists when you close/reopen the app

### Step 4: View Insights

- [x] Create a "View Insights" screen
- [x] Load all saved insights from storage
- [x] Display them in a list (just title and first few words of note)
- [x] Add Add entry from View screens

### Step 5: Search

- [x] Add a search bar to the View screen
- [x] Filter the displayed insights based on search text
- [x] Test that it searches across all fields

### Step 6: Polish

[Figma](https://www.figma.com/design/VS9X0yAVxQiWBF5rrakoVQ/Untitled?node-id=0-1&t=ZRczTMS1U9dmdl10-1)

- [ ] Make it look good (clean UI, proper spacing, mobile-friendly)
- [ ] Handle edge cases (empty fields, no insights yet, etc.)
- [ ] Final testing on phone

### Step 7: Done!

- [ ] Use the app to log 3-5 real book notes
- [ ] Confirm it works as intended
- [ ] Celebrate completed project! 🎉

**CURRENT FOCUS:** Step 6 - Polish

---
