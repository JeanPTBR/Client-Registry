<h1 align="center">📝 Client Registry</h1>

A CRUD system built in JavaScript for registering clients, where the data is stored locally in the browser using localStorage.

## Technologies Used 🔧
- __HTML__ 📝
- __JavaScript__ ⚙️
- __CSS__ 💄

___

## Installation 💻
Clone my branch from the repository using Git or download and extract the .zip file from **< > Code**;

To clone only my branch from the repository using Git, run the following command:
```sh
git clone -b jean-carlos --single-branch https://github.com/Compass-pb-aws-2024-JUNHO/sprint-1-pb-aws-junho.git
```
1. Open the repository in VS Code and start the **index.html** file in Live Server to run the Registration System;

2. Register users by clicking the **"Register"** button and filling in all the corresponding fields;

3. Delete records using **"🗑️"** and edit records using **"📝️"**.

___

## Creation Process 🏛️
**Step 1: Cloning the repository and creating the Branch**
- I cloned the repository with ``git clone`` and made a basic edit in the README;
- Created the branch and made my first commit to the local repo.

**Step 2: Creating the 3 files and organizing the folders**
- Created the files **index.html, script.js, and styles.css**;
- Organized them inside the **src** folder.

**Step 3: HTML Structure**
- Created a basic HTML structure with a **"Register"** button and a table with headers for **Name, Date of Birth, Email, and Phone**;
- Linked the .js and .css files within the HTML.

**Step 4: JavaScript**
- Created a Factory method function to register users;
- Developed functions to save and retrieve data from localStorage;
- Created the function to register users in localStorage:
    - I had previously created a [**voting website**](https://github.com/JeanPTBR/votarjogos) with registration using modals from the [___SweetAlert2___](https://sweetalert2.github.io/) library, ___PHP___, and ___SQL___, so I did not use the HTML form for this.
- Understood how table rows work to add them via JS;
- Created functions to display each registration (object) as a new row in the HTML table;
- Added functionalities to delete and edit records.

**Step 5: Styling with CSS**
- Once everything was working, I styled and aligned the table using CSS;
- Added emojis for delete and edit buttons to make them more intuitive and added a footer with my name and LinkedIn.

___

## License 📝
This project is licensed under the MIT License.  

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)  
