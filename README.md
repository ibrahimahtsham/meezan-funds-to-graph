# Meezan Funds to Graph

Meezan Funds to Graph is a web-based application designed to parse and visualize financial data for Meezan Funds. This tool now uses **react-plotly.js** for interactive graph rendering and leverages **Firebase** for authentication and database services.

## Key Features

- **Firebase Integration:**
  - **Authentication:** Secure login/sign-up functionality using Firebase Authentication.
  - **Database:** Investment data is stored in and retrieved from Firebase Firestore.
- **Data Visualization:**
  - **React-Plotly.js:** Visualizes financial data (NAV performance, category trends, projections, etc.) using interactive charts.
- **Projection Calculations:**
  - The application calculates portfolio projections by combining the investments made with the performance data (as parsed by the application).
  - For each investment, it matches the fund's abbreviated name (e.g. "Meezan Cash Fund" → "MCF") with its corresponding performance series.
  - Projections are computed using a simple formula:  
    `projected amount = invested amount * (1 + (performance percentage/100))`
  - The results are aggregated across all investments and displayed as a single projection chart.

## Graphs and Screenshots

### NAV Performance

![NAV Performance](./screenshots/nav-performance.png)

### Investment Trends by Category (Month Wise)

![Investment Trends by Category](./screenshots/investment-trends-category.png)

### Total Investment Trends (Month Wise)

![Total Investment Trends](./screenshots/total-investment-trends.png)

### Projections Chart (Based on Performance NAV)

![Projections Chart](./screenshots/projections-chart.png)

## Technologies Used

- **React:** A JavaScript library for building user interfaces.
- **Vite:** A modern build tool for fast development.
- **Material UI:** For designing a responsive and modern UI.
- **react-plotly.js:** Used for creating interactive charts.
- **Firebase:** Provides authentication and cloud database (Firestore) services.

## Setup Instructions

1. **Clone the repository:**

```
git clone https://github.com/your-username/meezan-funds-to-graph.git
```

2. **Navigate to the project directory:**

```
cd meezan-funds-to-graph
```

3. **Install dependencies:**

```
npm install
```

4. **Configure Firebase:**

- Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
- Enable Email/Password authentication.
- Create a Cloud Firestore database.
- Update your Firebase configuration file with your project credentials.

5. **Run or Deploy the Project:**

- Run the `run_or_deploy.bat` file and choose:
  - **Option 1** to run locally.
  - **Option 2** to deploy to GitHub Pages.

## How to Contribute

1. Fork the repository.
2. Create a new branch:

```
git checkout -b feature-branch
```

3. Make your changes.
4. Commit your changes:

```
git commit -m 'Add new feature'
```

5. Push to the branch:

```
git push origin feature-branch
```

6. Open a pull request.

## License

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.
