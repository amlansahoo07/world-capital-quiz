import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

// Initialize the Express application
const app = express();
const port = 3000;

// Configure the PostgreSQL client
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "postgres",
  port: 5432
});

// Connect to the PostgreSQL database
db.connect();

// Initialize the quiz array to store the quiz data
let quiz = [];

// Query the database to fetch quiz data
db.query("SELECT * FROM capitals", (err, res) => {
  if (err) {
    console.error("Error executing query", err.stack);
  } else {
    quiz = res.rows;
  }
  db.end();
});

// Initialize the total correct answers counter
let totalCorrect = 0;

// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
// Serve static files from the 'public' directory
app.use(express.static("public"));

// Initialize the current question
let currentQuestion = {};

/**
 * GET home page
 * Renders the home page with the first quiz question.
 */
app.get("/", async (req, res) => {
  totalCorrect = 0;
  await nextQuestion();
  console.log(currentQuestion);
  res.render("index.ejs", { question: currentQuestion });
});

/**
 * POST submit answer
 * Handles the submission of an answer, checks if it's correct, updates the score, and renders the next question.
 */
app.post("/submit", (req, res) => {
  let answer = req.body.answer.trim();
  let isCorrect = false;

  // Check if the provided answer is correct
  if (currentQuestion.capital.toLowerCase() === answer.toLowerCase()) {
    totalCorrect++;
    console.log(totalCorrect);
    isCorrect = true;
  }

  nextQuestion();
  res.render("index.ejs", {
    question: currentQuestion,
    wasCorrect: isCorrect,
    totalScore: totalCorrect,
  });
});

/**
 * Function to select the next question randomly from the quiz array.
 */
async function nextQuestion() {
  const randomCountry = quiz[Math.floor(Math.random() * quiz.length)];
  currentQuestion = randomCountry;
}

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
