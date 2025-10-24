## Deployed website link: https://react-contact-manager-eight.vercel.app/


# Contact List Application

A modern, feature-rich contact management application built with React. This application allows users to view, search, add, edit, and delete contacts with a clean and intuitive user interface.

-----

## 🌟 Features

  - **View Contacts**: Display all contacts in a beautiful card-based layout.
  - **Search Functionality**: Real-time search contacts by name.
  - **Add Contacts**: Create new contacts with name, email, phone, and company information.
  - **Edit Contacts**: Update existing contact information.
  - **Delete Contacts**: Remove contacts with a confirmation prompt.
  - **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices.
  - **Loading States**: Smooth loading indicators for a better user experience.
  - **Error Handling**: Comprehensive error messages and validation.
  - **Dual Backend**:
      - **Local**: Uses `json-server` for rapid local development.
      - **Production**: Uses Vercel Serverless Functions for a live, scalable backend.

-----

## 🚀 Tech Stack

  - **React**: Frontend library for building the user interface.
  - **JSON Server**: Mock REST API for local development.
  - **Vercel Serverless Functions**: For the production backend API (in the `/api` directory).
  - **CSS3**: Styling with modern features (Grid, Flexbox, Animations).
  - **Fetch API**: For making HTTP requests to the backend.

-----

## 🛠️ Getting Started

Follow these instructions to get the project up and running on your local machine for development and testing.

### Prerequisites

Before you begin, ensure you have the following installed:

  - Node.js (v14 or higher)
  - npm (v6 or higher)

### Installation & Setup

1.  **Clone the repository**:

    ```bash
    git clone <your-repository-url>
    cd contactlist
    ```

2.  **Install dependencies**:
    This will install all the necessary packages for both the React app and the local `json-server`.

    ```bash
    npm install
    ```

### Running the Application Locally

You need to run **two separate terminal sessions** simultaneously for the local development environment: one for the mock API (JSON Server) and one for the React application.

**Terminal 1: Start the JSON Server (Backend)**
This command starts the mock API server, which watches the `public/db.json` file.

```bash
npm run server
```

This will start the JSON server on `http://localhost:5000`.

**Terminal 2: Start the React App (Frontend)**
This command starts the React development server.

```bash
npm start
```

This will start the React application on `http://localhost:3000`. Your default browser should open automatically.

-----

## 🚀 Deployment to Vercel

This project is configured for a seamless "zero-config" deployment to **Vercel**.

1.  **Push your code** to a Git repository (e.g., GitHub, GitLab).
2.  **Import the project** into your Vercel dashboard.
3.  **Deploy\!**

Vercel will automatically:

  - Detect and build the React application (from the root `package.json`).
  - Detect and deploy the serverless functions inside the `/api` directory, making them available as your production API.

-----

## 📁 Project Structure

```
contactlist/
├── api/
│   └── contacts.js          # Vercel serverless function for production API
├── public/
│   └── db.json              # Mock database for local json-server
├── src/
│   ├── components/          # React components
│   │   ├── ContactList.js
│   │   ├── ContactCard.js
│   │   ├── SearchBar.js
│   │   ├── AddContactModal.js
│   │   └── EditContactModal.js
│   ├── services/
│   │   └── api.js           # API service layer (handles requests)
│   ├── styles/
│   │   ├── App.css          # Main application styles
│   │   └── index.css        # Global styles
│   ├── App.js               # Root component
│   └── index.js             # Entry point
├── .gitignore
├── package.json
└── README.md
```

-----

## 📝 Assumptions & Decisions

1.  **Dual API**: `json-server` is used *only* for rapid local prototyping. The production deployment on Vercel relies on the serverless functions in the `/api` directory.
2.  **Client-Side Filtering**: Search is implemented client-side for better performance with small datasets.
3.  **Avatar Service**: Using UI Avatars API for automatic avatar generation.
4.  **No Authentication**: This is a demo app and does not include user authentication.
5.  **Local Storage**: Data in the local `db.json` file is persistent on file but will reset if the file is overwritten.

-----

## 🔮 Future Enhancements

  - [ ] User authentication and authorization (e.g., with NextAuth or Clerk)
  - [ ] Connect the Vercel API to a persistent database (e.g., Vercel Postgres, MongoDB Atlas)
  - [ ] Contact groups/categories
  - [ ] Export contacts (CSV, vCard)
  - [ ] Advanced filtering (by company, multiple fields)
  - [ ] Sorting options
  - [ ] Pagination for large datasets
  - [ ] Dark mode support

-----

## 🐛 Known Issues

  - The local `json-server` must be running for the app to function in the local development environment.
  - The production API on Vercel is not yet connected to a persistent database (data will be ephemeral unless `api/contacts.js` is configured with a DB).
  - No offline support.

-----

## 📄 License

This project is open source and available under the MIT License.

-----

-----

## 👨‍💻 Author

Created as part of Tria Frontend Assignment

If someone wants to see this app locally, then they have to **uncomment line 1** and **comment out line 2** in `src/services/api.js` to use the local `json-server` backend.

-----
