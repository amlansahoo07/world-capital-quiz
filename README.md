# World Capital Quiz

This project is a simple web application that quizzes users on capital cities around the world. It uses Express.js for the server, PostgreSQL for the database, and EJS for templating.

## Features

- Fetches country and capital city data from a PostgreSQL database.
- Randomly selects a country for each quiz question.
- Checks user input for correctness and keeps track of the score.
- Displays feedback for correct and incorrect answers.
- Provides an option to restart the quiz after an incorrect answer.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed Node.js and npm.
- You have a PostgreSQL database set up with a table named `capitals`.
- The `capitals` table should have columns `country` and `capital`.

## Getting Started

Follow these steps to get the project up and running:

### 1. Clone the Repository

```sh
git clone https://github.com/amlansahoo07/world-capital-quiz.git
cd world-capital-quiz
```

### 2. Install Dependencies

```sh
npm install
```

### 3. Set Up PostgreSQL Database

Ensure your PostgreSQL database is running and accessible. Update the database connection configuration in the `index.js` file if necessary:

```javascript
const db = new pg.Client({
  user: "YOUR_DB_USER",
  host: "YOUR_DB_HOST",
  database: "YOUR_DB_NAME",
  password: "YOUR_DB_PASSWORD",
  port: YOUR_DB_PORT
});
```

### 4. Create the `capitals` Table

Create the `capitals` table in your PostgreSQL database and populate it with data:

```sql
CREATE TABLE capitals (
  id SERIAL PRIMARY KEY,
  country VARCHAR(255) NOT NULL,
  capital VARCHAR(255) NOT NULL
);

INSERT INTO capitals (country, capital) VALUES
('France', 'Paris'),
('United Kingdom', 'London'),
('United States of America', 'Washington D.C.');
```
The data can be imported from the 'capitals.csv' sheet

### 5. Run the Application

```sh
node index.js
```

The server will start and be accessible at `http://localhost:3000`.

## Usage

- Open `http://localhost:3000` in your web browser.
- Answer the quiz question by entering the capital city of the displayed country.
- Submit your answer to see if it's correct and move to the next question.
- If you provide an incorrect answer, an alert will show your final score, and you will have the option to restart the quiz.

## Acknowledgements

This project is inspired and developed as part of [Angela Yu's Complete Web Development Bootcamp](https://www.udemy.com/course/the-complete-web-development-bootcamp/)'s on Udemy.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.