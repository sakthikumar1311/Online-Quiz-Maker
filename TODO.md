# Online Quiz Maker Development TODO

## Step 1: Set up Node.js project ✅
- Create package.json with necessary scripts and dependencies.

## Step 2: Install dependencies ✅
- Run npm install to install all required packages (express, react, bcrypt, express-session, etc.).

## Step 3: Create backend structure ✅
- Create server.js as the backend entry point.
- Create routes/auth.js for authentication routes.
- Create routes/quizzes.js for quiz-related routes.
- Create models/User.js for user data handling.
- Create models/Quiz.js for quiz data handling.

## Step 4: Create frontend structure ✅
- Set up React app structure.
- Create public/index.html.
- Create src/App.js as the main React component.
- Create src/components/Home.js.
- Create src/components/CreateQuiz.js.
- Create src/components/TakeQuiz.js.
- Create src/components/Results.js.
- Create src/components/QuizList.js.
- Create src/components/Auth.js (for login/register).

## Step 5: Implement data storage ✅
- Create data/users.json for storing user data.
- Create data/quizzes.json for storing quiz data.
- Implement read/write functions in models.

## Step 6: Add styling and responsiveness ✅
- Create src/styles.css with responsive CSS for mobile devices.

## Step 7: Start development server and test
- Run the application.
- Test all features: registration, login, quiz creation, taking quizzes, results, listing.
