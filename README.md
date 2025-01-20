## HUND Denmark

* This is a Product Hunt website. It includes user, moderator, and admin dashboards. When a user signs up or logs in using Google, all their data is stored in the database. If the user later logs in again with the same Gmail account, duplicate entries are avoided. The website is fully responsive and designed with a user-friendly UX for all devices. Using a new user token, members can access offers and subscriptions. For added security, JWT tokens have been implemented.

##  "Users make use of this website."

* Users can add products to this website. However, to display the products on the website, the moderator’s permission is required.
* Users can delete or update all the products they have added.
* Additionally, users can purchase subscriptions with money. If they use a coupon, they will receive a discount on the price.

##  "Modaretor make use of this website."

* Moderators can change the status of each added product. If the moderators grant permission, the added products will be displayed on the homepage.
* If any product is reported, the moderators will be able to view the report. They can delete the reported product if they wish.

##  "Admin make use of this website."

* The admin can view how many users have accessed the website, how many products are pending, and how many products have been approved.
* The admin can change the roles of any user and can also assign them as moderators if desired. 
* The admin can add offer tokens, and they also have the ability to delete or update them if needed.

## Main Technologies Used
* Front-End: React, Tailwind CSS,
* Back-End: Node.js, Express.js, MongoDB
* Tools: Axios, Firebase.

## Features

- User-friendly interface
- Responsive design
- Secure authentication and authorization
- Subscription management
- Moderation features for products
- Dynamic homepage with moderator-approved products
- Token-based discount system

### Frontend
- **React** (`react`, `react-dom`): A JavaScript library for building user interfaces.
- **React Router DOM** (`react-router-dom`): Routing for single-page applications.
- **Material Tailwind** (`@material-tailwind/react`): UI components and design system.
- **Framer Motion** (`framer-motion`): Animations and transitions.
- **Animate.css**: Ready-to-use CSS animations.
- **React Icons**: Icon library for React.
- **Swiper**: Modern slider for web and mobile.

### Backend
- **Firebase**: Authentication, database, and hosting.
- **Helmet**: Security headers for Express apps.

### State Management and Querying
- **TanStack React Query** (`@tanstack/react-query`): Data fetching and caching.

### Utilities
- **Axios**: HTTP client for API requests.
- **LocalForage**: Asynchronous storage for large data.
- **React Hook Form**: Form validation and management.
- **React Hot Toast**: Notification system.
- **Recharts**: Charting library for data visualization.
- **Slick Carousel**: Carousel library.
- **Match Sorter**: Sorting utilities.
- **Sort By**: Sorting helper library.

### Payment
- **Stripe** (`@stripe/react-stripe-js`, `@stripe/stripe-js`): Payment integration.

## Installation

Follow these steps to set up the project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/Programming-Hero-Web-Course4/b10a12-client-side-ibrahimkholilullah-web.git


## projucts Live URL 
https://last-project-abb90.web.app
