# HRCorp HR ERP Frontend

## Project Description

**Project Type**: HR software  
**Project Name**: HRCorp

## Overview

This is the frontend for the **HRCorp HR ERP system**, built using **React** and **Vite**. It provides the user interface for managing employee data, job profiles, leave applications, payroll, and more.

---

<br>

## Project Features

### Multiple User Management

- Can have an admin user called “power_user.”
- Also can have multiple normal users called “standard_user.”

### User Authentication Management

- User registration.
- Email verification for confirmation link.
- Login & logout.

### Power_User Authorization Management

Only a “power_user” can:

- Create & update:
  - Designation
  - Department
  - Job Location
- Transfer modification:
  - Update an existing transfer record.
  - Cancel a transfer order.

### Employee Database Management

- Entry of new employees with relevant information such as personal info, employment info, salary info, separation info, etc.
- Implement salary structure with salary grading & stepping functionality.

### Employee Transfer Management

- Update job location after transferring an employee.
- Update job profile history accordingly.

### Employee Job Confirmation Management

- Update employee salary information after job confirmation.
- Update job profile history accordingly.

### Employee Promotion Management

- Update employee salary information after promotion.
- Update job profile history accordingly.

### Employee Separation Management

- Update employee separation data & change the employee status to “inactive.”
- Update job profile history accordingly.

### Employee Details View

- Get the full information of an employee on a single page (in a separate tab).

### Employee List View

- View all employee info in a table.
- Get employee list by:
  - Employee ID
  - Employee name
  - Department
  - Designation
  - Job location

### Reports Management

- Get a list of employees whose jobs need confirmation (up to this month).
- Get a list of employees who joined last month / filtered duration.
- Get a list of employees transferred last month / filtered duration.
- Get a list of employees separated last month / filtered duration.
- Get a list of employees whose jobs were confirmed last month / filtered duration.
- Get a list of employees promoted last month / filtered duration.

### HR Live Dashboard (for frontend homepage)

- Create an HR dashboard that displays statistical charts showing:
  - Number of active staff (by concerned departments).
  - Number of active staff (by concerned designations).
  - Number of active staff (by concerned job locations).

### Employee Leave Management

- Entry of leave data for an employee.
- Update “number of leave days status” for that employee.
- Deduct salary for Non-Paid Leave entries.
- Update payroll data accordingly.

### Payroll Management

- Prepare salary for the current month.
- Download salary sheet in PDF & XLSX format.

---

<br>

## Instructions to Run Locally

### Prerequisites

Make sure you have the following software installed on your machine:

- **Node.js** (version 16 or higher)
- **npm** (comes with Node.js)
- **Vite** (already included in this project)

### Packages used:

```bash
jspdf==2.5.2
jspdf-autotable==3.8.3
localforage==1.10.0
lottie-react==2.4.0
match-sorter==6.3.4
react==18.3.1
react-dom==18.3.1
react-fast-marquee==1.6.5
react-icons==5.3.0
react-lazy-load==4.0.1
react-router-dom==6.26.1
react-toastify==10.0.5
sort-by==1.2.0
xlsx==0.18.5
@vitejs/plugin-react==4.3.1
autoprefixer==10.4.20
daisyui==4.12.10
tailwindcss==3.4.10
vite==5.4.1
```

### Additional Notes:

- **Vite** is used as the development and build tool for this project.
- **React Router** is implemented for managing application routes.
- **Tailwind CSS** and **DaisyUI** are used for styling components.

---

<br>

### Installation Steps:

1. Copy the `repository_url` to **Clone the repository**

   ```bash
   git clone https://github.com/sayed8901/HRCorp_HR_ERP_project.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd HRCorp_HR_ERP_project
   ```

3. **Install the dependencies:**

   Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

   ```bash
   npm install
   code .
   ```

<br>

4. **Environment Variables Configuration**

- To run the application, you need to configure environment variables. Create a file named `.env.local` inside the root directory of your project and include the `server link` as VITE_API_URL:

* For Local server:

  ```bash
  VITE_API_URL=http://127.0.0.1:8000
  ```

* For Vercel deployed server:

  ```bash
  VITE_API_URL=https://hr-corp-system-drf-backend.vercel.app
  ```

  <br>

  - N.B.: If you have cloned the backend project (`https://github.com/sayed8901/HRCorp_system_DRF_backend`) and perform the `Instructions to Run Locally` section properly, you can get the above mentioned `local server` link...

  - Or, if you don't want to set up the `backend local server`, you can use the `vercel server link` which I have already deployed earlier..

    - `Important:` **Uncomment** the relevant line depending on the server you are currently using (`Vercel deployed server` or `Local server`).

<br>

5. **Run the development server:**

After the dependencies are installed, start the development server with:

```bash
npm run dev
```

**Finally, Access the application**

The application will be available at: `http://localhost:5173`.

---

<br>

## Getting Started

To unlock and access the full functionality of this site and to perform some role-specific activities, you will need to create an account first. Follow the instructions below to get started.

### Account Creation

You will find the available register options by clicking on the `Register` button on the top right corner of the `Navbar`.

- **To register as a Power_user**: click on the `Power User Registration` button.
- **To register as a Standard_user**: click on the `Standard User Registration` button.

#### Steps to Register:

1. Fill out the registration form with the relevant information and click the **POST** button.
2. A confirmation link will be automatically sent to your email. Please check your inbox.
3. Verify your account by clicking on the confirmation link provided in the email.
4. After verification, return to the project site and click on the `Login` button to log in with your credentials.

### Role-Based Activities

Once you’ve logged in, you’re ready to interact with the application and will be able to perform activities specific to your role.

---

<br>

## Conclusion

Thank you for exploring the **HRCorp HR ERP system**. This project aims to streamline HR processes and enhance employee management through an user-friendly interface. I hope this application will serve as a valuable tool for HR professionals and organizations.

Feel free to contribute to this project by reporting issues, suggesting enhancements, or submitting pull requests. Your feedback is essential in making HRCorp even better. For any queries or support, feel free to reach out!
