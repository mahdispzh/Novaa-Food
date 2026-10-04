# Nova Food

## Project Overview

Nova Food is a mobile cafe and restaurant discovery application designed to help users explore cafes, discover popular places, view restaurant details, and interact with different content sections.

This project is a forked version of the original repository with additional UI improvements, reusable components, restaurant detail functionality, animations, and location-based features.

---

## My Contributions

* Redesigned and improved multiple sections of the application.
* Developed reusable UI components for the project.
* Implemented restaurant detail pages and related interactions.
* Designed the application specifically for mobile devices.
* Implemented reusable tabs, badges, ratings, buttons, and containers.
* Added restaurant reviews and review submission UI.
* Implemented an interactive restaurant gallery.
* Added animations and transitions using Motion.
* Integrated Neshan map-related functionality.
* Improved RTL and Persian-language support.
* Refactored parts of the project structure for better maintainability.
* Centralized icons, shared components, and reusable constants.

---

## Features

### Home

* Events & Moments
* Nearby Cafes
* Popular Cafes
* Bloggers
* My Favorites
* Similar Cafes
* Category Cards
* Location / Map Cards

### Restaurant Details

* Restaurant information
* Rating and reviews
* Restaurant tags and badges
* Introduction section
* Reviews section
* Gallery section
* Bloggers section
* Review submission interface
* Interactive image gallery
* Back navigation between views

### Location

* Neshan map integration
* Location-based cafe cards
* Nearby restaurant presentation
* Custom map card UI

---

## Tech Stack

* **Next.js**
* **React**
* **TypeScript**
* **Tailwind CSS**
* **Motion**
* **Neshan Maps**
* **pnpm**

---

## Project Structure

The project follows a component-based architecture with reusable shared components and separated feature-specific modules.

```text
src/
├── app/
│   └── (landing)/
│       ├── detail-card/
│       ├── restaurant/
│       └── ...
│
├── shared/
│   ├── ui/
│   ├── constants/
│   └── ...
│
└── ...
```

The shared UI layer contains reusable components such as:

* Button
* Badge
* Tab
* Rating
* Avatar
* Input
* Container
* Icons

This structure helps keep the project maintainable and makes it easier to reuse components across different parts of the application.
