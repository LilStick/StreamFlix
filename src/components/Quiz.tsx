import React, { useState, useEffect, useCallback } from 'react';
import { useApp } from '../hooks/useApp';
import { quizQuestions, shuffleQuestions, getScoreMessage, type QuizQuestion, type QuizAnswer } from '../data/quiz';

type QuizState = 'welcome' | 'playing' | 'results';

const Quiz: React.FC = () => {
  const { isDarkMode, showNotification } = useApp();

  // Quiz states
  const [quizState, setQuizState] = useState<QuizState>('welcome');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [questions, setQuestions] = useState<QuizQuestion[]>(quizQuestions);
  const [timeLeft, setTimeLeft] = useState(15);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [challengeMode, setChallengeMode] = useState(false);
  const [bestScore, setBestScore] = useState(0);

  // Show confetti animation
  const triggerConfetti = useCallback(() => {
    showNotification('🎊 PARFAIT ! Score parfait ! 🎊', 'success');
  }, [showNotification]);

  // Handle next question
  const handleNextQuestion = useCallback(() => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

    // Save answer
    const newAnswer: QuizAnswer = {
      questionId: currentQuestion.id,
      selectedAnswer: selectedAnswer || "Temps écoulé",
      isCorrect
    };

    setAnswers(prev => [...prev, newAnswer]);

    if (currentQuestionIndex < questions.length - 1) {
      // Next question
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer('');
      setTimeLeft(15);
    } else {
      // Quiz completed
      setQuizState('results');
      setIsTimerActive(false);

      // Calculate final score
      const finalAnswers = [...answers, newAnswer];
      const score = finalAnswers.filter(a => a.isCorrect).length;

      // Update best score
      if (score > bestScore) {
        setBestScore(score);
        showNotification(`Nouveau record ! ${score}/10 🎉`, 'success');
      }

      // Confetti if perfect score
      if (score === 10) {
        triggerConfetti();
      }
    }
  }, [answers, bestScore, currentQuestionIndex, questions, selectedAnswer, showNotification, triggerConfetti]);

  // Timer for questions
  useEffect(() => {
    let interval: number;
    if (isTimerActive && timeLeft > 0 && quizState === 'playing') {
      interval = window.setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && quizState === 'playing') {
      // Time up, go to next question
      handleNextQuestion();
    }

    return () => clearInterval(interval);
  }, [isTimerActive, timeLeft, quizState, handleNextQuestion]);

  const startQuiz = (challenge: boolean = false) => {
    setChallengeMode(challenge);
    setQuestions(challenge ? shuffleQuestions(quizQuestions) : quizQuestions);
    setQuizState('playing');
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setSelectedAnswer('');
    setTimeLeft(15);
    setIsTimerActive(true);
  };

  const selectAnswer = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const resetQuiz = () => {
    setQuizState('welcome');
    setCurrentQuestionIndex(0);
    setSelectedAnswer('');
    setAnswers([]);
    setTimeLeft(15);
    setIsTimerActive(false);
  };

  // Share score to clipboard
  const shareScore = () => {
    const score = answers.filter(a => a.isCorrect).length;
    const message = `J'ai obtenu ${score}/10 au Quiz Cinéma StreamFlix ! 🎬✨`;
    navigator.clipboard.writeText(message);
    showNotification('Score copié dans le presse-papiers !', 'success');
  };

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const score = answers.filter(a => a.isCorrect).length;

  return (
    <div className={`min-h-screen py-16 ${isDarkMode ? 'bg-netflix-dark' : 'bg-gray-50'}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Welcome screen */}
        {quizState === 'welcome' && (
          <div className={`text-center p-8 rounded-xl shadow-xl ${
            isDarkMode ? 'bg-gray-900' : 'bg-white'
          }`}>
            <div className="mb-8">
              <h1 className={`text-4xl font-bold mb-4 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                🧠 Quiz Cinéma
              </h1>
              <p className={`text-xl mb-2 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Testez vos connaissances !
              </p>
              <p className={`text-lg ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                10 questions sur l'univers du cinéma
              </p>
            </div>

            <div className={`mb-8 p-6 rounded-lg ${
              isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
            }`}>
              <h3 className={`text-lg font-semibold mb-4 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Règles du jeu :
              </h3>
              <ul className={`text-left space-y-2 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                <li>• 10 questions à choix multiples</li>
                <li>• 15 secondes par question ⏱️</li>
                <li>• Pas de retour en arrière possible</li>
                <li>• Votre meilleur score : <span className="text-netflix-red font-bold">{bestScore}/10</span></li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => startQuiz(false)}
                className="px-8 py-4 bg-netflix-red hover:bg-red-700 text-white font-bold rounded-lg transition-colors text-lg"
              >
                🎬 Commencer le Quiz
              </button>
              <button
                onClick={() => startQuiz(true)}
                className={`px-8 py-4 font-bold rounded-lg transition-colors text-lg ${
                  isDarkMode
                    ? 'bg-gray-700 hover:bg-gray-600 text-white'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
                }`}
              >
                🎲 Mode Défi (Questions aléatoires)
              </button>
            </div>
          </div>
        )}

        {/* Game interface */}
        {quizState === 'playing' && currentQuestion && (
          <div className={`p-8 rounded-xl shadow-xl ${
            isDarkMode ? 'bg-gray-900' : 'bg-white'
          }`}>
            {/* Progress header */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <span className={`text-lg font-semibold ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Question {currentQuestionIndex + 1}/10
                  {challengeMode && <span className="ml-2 text-netflix-red">🎲 MODE DÉFI</span>}
                </span>
                <div className={`flex items-center space-x-2 ${
                  timeLeft <= 5 ? 'text-red-500' : isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z" />
                  </svg>
                  <span className={`font-mono text-xl ${timeLeft <= 5 ? 'animate-pulse' : ''}`}>
                    {timeLeft}s
                  </span>
                </div>
              </div>

              {/* Barre de progression */}
              <div className={`w-full rounded-full h-2 ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
              }`}>
                <div
                  className="bg-netflix-red h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>

              {/* Timer bar */}
              <div className={`w-full rounded-full h-1 mt-2 ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
              }`}>
                <div
                  className={`h-1 rounded-full transition-all duration-1000 ${
                    timeLeft <= 5 ? 'bg-red-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${(timeLeft / 15) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Question */}
            <div className="mb-8">
              <h2 className={`text-2xl font-bold mb-6 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {currentQuestion.question}
              </h2>

              {/* Options de réponse */}
              <div className="grid gap-4">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => selectAnswer(option)}
                    className={`p-4 rounded-lg text-left transition-all duration-200 border-2 ${
                      selectedAnswer === option
                        ? 'border-netflix-red bg-netflix-red text-white'
                        : isDarkMode
                        ? 'border-gray-700 bg-gray-800 text-white hover:border-gray-600 hover:bg-gray-700'
                        : 'border-gray-200 bg-gray-50 text-gray-900 hover:border-gray-300 hover:bg-gray-100'
                    }`}
                  >
                    <span className="font-medium">
                      {String.fromCharCode(65 + index)}. {option}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Next button */}
            <div className="text-center">
              <button
                onClick={handleNextQuestion}
                disabled={!selectedAnswer && timeLeft > 0}
                className={`px-8 py-3 font-bold rounded-lg transition-all ${
                  !selectedAnswer && timeLeft > 0
                    ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                    : 'bg-netflix-red hover:bg-red-700 text-white'
                }`}
              >
                {currentQuestionIndex === questions.length - 1 ? '📊 Voir mes résultats' : '➡️ Question suivante'}
              </button>
            </div>
          </div>
        )}

        {/* Results screen */}
        {quizState === 'results' && (
          <div className={`p-8 rounded-xl shadow-xl ${
            isDarkMode ? 'bg-gray-900' : 'bg-white'
          }`}>
            <div className="text-center mb-8">
              <div className="mb-6">
                <div className={`text-6xl mb-4 ${getScoreMessage(score, 10).color}`}>
                  {getScoreMessage(score, 10).emoji}
                </div>
                <h2 className={`text-3xl font-bold mb-2 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Vous avez obtenu {score}/10 !
                </h2>
                <p className={`text-xl ${getScoreMessage(score, 10).color}`}>
                  {getScoreMessage(score, 10).message}
                </p>
                <p className={`text-lg mt-2 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Score : {Math.round((score / 10) * 100)}% • Meilleur score : {bestScore}/10
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <button
                  onClick={shareScore}
                  className={`px-6 py-3 font-bold rounded-lg transition-colors ${
                    isDarkMode
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-blue-500 hover:bg-blue-600 text-white'
                  }`}
                >
                  📤 Partager mon score
                </button>
                <button
                  onClick={resetQuiz}
                  className="px-6 py-3 bg-netflix-red hover:bg-red-700 text-white font-bold rounded-lg transition-colors"
                >
                  🔄 Recommencer le quiz
                </button>
              </div>
            </div>

            {/* Answer details */}
            <div>
              <h3 className={`text-2xl font-bold mb-6 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                📋 Détail de vos réponses
              </h3>

              <div className="space-y-4">
                {questions.map((question, index) => {
                  const userAnswer = answers[index];
                  const isCorrect = userAnswer?.isCorrect;

                  return (
                    <div
                      key={question.id}
                      className={`p-4 rounded-lg border-l-4 ${
                        isCorrect
                          ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                          : 'border-red-500 bg-red-50 dark:bg-red-900/20'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className={`font-semibold ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          {index + 1}. {question.question}
                        </h4>
                        <span className={`text-2xl ml-4 ${
                          isCorrect ? 'text-green-500' : 'text-red-500'
                        }`}>
                          {isCorrect ? '✓' : '✗'}
                        </span>
                      </div>

                      <div className={`text-sm ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        <p className={isCorrect ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                          <strong>Votre réponse :</strong> {userAnswer?.selectedAnswer}
                        </p>
                        {!isCorrect && (
                          <p className="text-green-600 dark:text-green-400 mt-1">
                            <strong>Bonne réponse :</strong> {question.correctAnswer}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;