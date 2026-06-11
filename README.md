<br/>
<p align="center">
  <h1 align="center">React FormCraft 🛠️</h1>
  <p align="center">
    An advanced, drag-and-drop dynamic form builder built with React and Redux Toolkit.
    <br/>
    <a href="https://github.com/amankoli09/Schema-form-builder"><strong>Explore the docs »</strong></a>
    <br/>
    <br/>
    <a href="#">View Demo</a>
    ·
    <a href="https://github.com/amankoli09/Schema-form-builder/issues">Report Bug</a>
    ·
    <a href="https://github.com/amankoli09/Schema-form-builder/issues">Request Feature</a>
  </p>
</p>

![Downloads](https://img.shields.io/github/downloads/amankoli09/Schema-form-builder/total) ![Contributors](https://img.shields.io/github/contributors/amankoli09/Schema-form-builder?color=dark-green) ![Issues](https://img.shields.io/github/issues/amankoli09/Schema-form-builder) ![License](https://img.shields.io/github/license/amankoli09/Schema-form-builder)

---

## 📝 About The Project

React FormCraft is a powerful, "no-code" dynamic form builder that empowers developers and non-technical users alike to visually construct complex, multi-step forms. 

Instead of hardcoding form layouts and logic, FormCraft allows you to drag and drop fields, apply complex regex validation, and configure advanced conditional display logic—all while generating a live, exportable JSON schema and a fully functioning React `.jsx` component in real-time.

### ✨ Key Features

- **Drag & Drop Canvas**: Intuitive interface powered by `@dnd-kit` for adding and reordering form fields.
- **Advanced Conditional Logic**: Watch fields and hide/show inputs based on dynamic values (e.g., *Show Dropdown if Checkbox contains "Yes"*).
- **Live Regex Validation**: Real-time error handling with custom regex patterns, min/max lengths, and required field checks.
- **Two-Way JSON Sync**: Edit the form visually, or edit the underlying JSON schema in the built-in terminal—both update instantly.
- **React Code Export**: Click a button to instantly download a fully working `.jsx` file of your form to drop straight into your own codebase.
- **Auto-Save**: Never lose your work. Your schema is actively saved to `localStorage`.

---

## 💻 Tech Stack

This project is built with modern, scalable web technologies:

* **Framework:** [React 18](https://reactjs.org/) + [Vite](https://vitejs.dev/)
* **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/) (Eliminates prop-drilling)
* **Drag & Drop:** [@dnd-kit/core](https://dndkit.com/)
* **Styling:** Vanilla CSS (Custom Design System)

---

## 📸 Screenshots

*(Replace these links with actual screenshots of your running app)*

| Form Builder Workspace | Live JSON Terminal |
| :---: | :---: |
| <img src="https://via.placeholder.com/600x350.png?text=Drag+and+Drop+Canvas" alt="Canvas" width="400"/> | <img src="https://via.placeholder.com/600x350.png?text=Live+JSON+Terminal" alt="Terminal" width="400"/> |

| Conditional Logic | Dark Mode Landing Page |
| :---: | :---: |
| <img src="https://via.placeholder.com/600x350.png?text=Property+Inspector+Conditions" alt="Inspector" width="400"/> | <img src="https://via.placeholder.com/600x350.png?text=Landing+Page" alt="Landing" width="400"/> |

---

## 🚀 Getting Started

Any developer can spin this project up locally in less than a minute. Follow these simple steps.

### Prerequisites

You need Node.js and NPM installed on your machine.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repository
   ```sh
   git clone https://github.com/amankoli09/Schema-form-builder.git
   ```
2. Navigate into the directory
   ```sh
   cd Schema-form-builder
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Start the development server
   ```sh
   npm run dev
   ```
5. Open your browser and navigate to `http://localhost:5173`

---

## 🏗️ Architecture Overview

The codebase is highly modular, separating the user interface from the math/logic engines.

- **`src/engine/`**: Contains pure JavaScript logic files (`validationEngine.js`, `conditionEvaluator.js`) that handle math and regex without touching React HTML.
- **`src/store/`**: Contains the Redux Toolkit slices. `schemaSlice.js` holds the form blueprint, while `valuesSlice.js` holds the live answers.
- **`src/hooks/`**: Custom hooks (`useFormValues`, `useFormSchema`) that act as a bridge between the UI components and the Redux store.
- **`src/components/`**: The visual UI elements (Canvas, Sidebar, Inspector).

---

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
