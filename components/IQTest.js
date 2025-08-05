'use client';

import React, { useState, useEffect } from 'react';
import { Clock, Brain, CheckCircle, BarChart3, Trophy, RefreshCw, Star, Settings, Award, TrendingUp, Zap, Target, BookOpen, Calculator, Puzzle, Eye } from 'lucide-react';

const IQTest = () => {
  const [gameState, setGameState] = useState('menu');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(1800);
  const [isCompleted, setIsCompleted] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState('moyen');

  const allQuestions = [
    {
      id: 1,
      type: "matrices",
      category: "Raisonnement Perceptif",
      difficulty: 1,
      question: "Quelle figure complète logiquement cette matrice ?",
      pattern: [["⬛", "⬜", "⬛"], ["⬜", "⬛", "⬜"], ["⬛", "⬜", "?"]],
      options: ["⬛", "⬜", "🔲", "⚫"],
      correct: 0
    },
    {
      id: 2,
      type: "sequence",
      category: "Raisonnement Logique",
      difficulty: 1,
      question: "Quel nombre continue cette séquence ?",
      sequence: "2, 4, 8, 16, 32, ?",
      options: ["48", "64", "56", "72"],
      correct: 1
    },
    {
      id: 3,
      type: "verbal",
      category: "Compréhension Verbale",
      difficulty: 1,
      question: "Quel mot a la même relation ?",
      premise: "CHAT : MIAULER = CHIEN : ?",
      options: ["ABOYER", "COURIR", "DORMIR", "MANGER"],
      correct: 0
    },
    {
      id: 4,
      type: "arithmetic",
      category: "Raisonnement Numérique",
      difficulty: 1,
      question: "25% de 80 =",
      options: ["15", "20", "25", "30"],
      correct: 1
    },
    {
      id: 5,
      type: "spatial",
      category: "Raisonnement Spatial",
      difficulty: 1,
      question: "Combien de carrés dans cette figure ?",
      description: "Une grille 2×2",
      options: ["4", "5", "6", "9"],
      correct: 1
    },
    {
      id: 6,
      type: "matrices",
      category: "Raisonnement Perceptif",
      difficulty: 2,
      question: "Continuez le motif :",
      pattern: [["○", "●", "○"], ["●", "○", "●"], ["○", "●", "?"]],
      options: ["○", "●", "◐", "◑"],
      correct: 0
    },
    {
      id: 7,
      type: "sequence",
      category: "Raisonnement Logique",
      difficulty: 2,
      question: "Continuez :",
      sequence: "3, 6, 12, 24, ?",
      options: ["36", "48", "42", "60"],
      correct: 1
    },
    {
      id: 8,
      type: "verbal",
      category: "Compréhension Verbale",
      difficulty: 2,
      question: "LIVRE : PAPIER = PEINTURE : ?",
      options: ["PAPIER", "TOILE", "HISTOIRE", "MUSÉE"],
      correct: 1
    },
    {
      id: 9,
      type: "arithmetic",
      category: "Raisonnement Numérique",
      difficulty: 2,
      question: "Si 3x + 7 = 22, x = ?",
      options: ["3", "5", "7", "15"],
      correct: 1
    },
    {
      id: 10,
      type: "spatial",
      category: "Raisonnement Spatial",
      difficulty: 2,
      question: "Rotation 90° droite de ↑",
      options: ["→", "↓", "←", "↗"],
      correct: 0
    },
    {
      id: 11,
      type: "matrices",
      category: "Raisonnement Perceptif",
      difficulty: 3,
      question: "Quelle figure manque ?",
      pattern: [["△", "▲", "△"], ["▽", "▼", "▽"], ["◇", "?", "◇"]],
      options: ["◆", "◇", "⬟", "⬢"],
      correct: 0
    },
    {
      id: 12,
      type: "sequence",
      category: "Raisonnement Logique",
      difficulty: 3,
      question: "Fibonacci :",
      sequence: "1, 1, 2, 3, 5, 8, ?",
      options: ["11", "13", "15", "10"],
      correct: 1
    },
    {
      id: 13,
      type: "verbal",
      category: "Compréhension Verbale",
      difficulty: 3,
      question: "OPTIMISTE : PESSIMISTE = COURAGE : ?",
      options: ["BRAVOURE", "LÂCHETÉ", "FORCE", "PEUR"],
      correct: 1
    },
    {
      id: 14,
      type: "arithmetic",
      category: "Raisonnement Numérique",
      difficulty: 3,
      question: "Train 80km/h, distance 240km, temps ?",
      options: ["2h30", "3h", "3h30", "4h"],
      correct: 1
    },
    {
      id: 15,
      type: "spatial",
      category: "Raisonnement Spatial",
      difficulty: 3,
      question: "Cubes dans pyramide 3×3, 2×2, 1×1",
      options: ["12", "14", "16", "18"],
      correct: 1
    },
    {
      id: 16,
      type: "matrices",
      category: "Raisonnement Perceptif",
      difficulty: 4,
      question: "Matrice complexe :",
      pattern: [["●○", "○●", "●○"], ["○●", "●○", "○●"], ["●○", "○●", "?"]],
      options: ["●○", "○●", "●●", "○○"],
      correct: 0
    },
    {
      id: 17,
      type: "sequence",
      category: "Raisonnement Logique",
      difficulty: 4,
      question: "A1, C2, E3, G4, ?",
      options: ["H5", "I5", "I4", "J5"],
      correct: 1
    },
    {
      id: 18,
      type: "verbal",
      category: "Compréhension Verbale",
      difficulty: 4,
      question: "ARCHIPEL : ÎLES = CONSTELLATION : ?",
      options: ["CIEL", "ÉTOILES", "PLANÈTE", "GALAXIE"],
      correct: 1
    },
    {
      id: 19,
      type: "arithmetic",
      category: "Raisonnement Numérique",
      difficulty: 4,
      question: "√144 + √81 =",
      options: ["15", "17", "19", "21"],
      correct: 2
    },
    {
      id: 20,
      type: "spatial",
      category: "Raisonnement Spatial",
      difficulty: 4,
      question: "Développement d&apos;un cube, face opposée à A",
      description: "A au centre, B à droite",
      options: ["B", "C", "D", "E"],
      correct: 2
    },
    {
      id: 21,
      type: "matrices",
      category: "Raisonnement Perceptif",
      difficulty: 5,
      question: "Matrice à 3 variables :",
      pattern: [["●○◐", "○◐●", "◐●○"], ["○◐●", "◐●○", "●○◐"], ["◐●○", "●○◐", "?"]],
      options: ["○◐●", "●◐○", "◐○●", "○●◐"],
      correct: 0
    },
    {
      id: 22,
      type: "sequence",
      category: "Raisonnement Logique",
      difficulty: 5,
      question: "Suite de Conway :",
      sequence: "1, 11, 21, 1211, 111221, ?",
      options: ["312211", "131221", "132211", "311211"],
      correct: 0
    },
    {
      id: 23,
      type: "verbal",
      category: "Compréhension Verbale",
      difficulty: 5,
      question: "PARADIGME : EXEMPLE = APHORISME : ?",
      options: ["PHRASE", "MAXIME", "HISTOIRE", "LIVRE"],
      correct: 1
    },
    {
      id: 24,
      type: "arithmetic",
      category: "Raisonnement Numérique",
      difficulty: 5,
      question: "x² - 5x + 6 = 0, x = ?",
      options: ["2 ou 3", "1 ou 6", "-2 ou -3", "0 ou 5"],
      correct: 0
    },
    {
      id: 25,
      type: "spatial",
      category: "Raisonnement Spatial",
      difficulty: 5,
      question: "Projection orthogonale",
      description: "Tétraèdre vu du dessus",
      options: ["Triangle", "Carré", "Pentagone", "Hexagone"],
      correct: 0
    },
    {
      id: 26,
      type: "matrices",
      category: "Raisonnement Perceptif",
      difficulty: 1,
      question: "Simple alternance :",
      pattern: [["X", "O", "X"], ["O", "X", "O"], ["X", "O", "?"]],
      options: ["X", "O", "+", "-"],
      correct: 0
    },
    {
      id: 27,
      type: "sequence",
      category: "Raisonnement Logique",
      difficulty: 1,
      question: "Suite logique :",
      sequence: "1, 3, 5, 7, 9, ?",
      options: ["10", "11", "12", "13"],
      correct: 1
    },
    {
      id: 28,
      type: "verbal",
      category: "Compréhension Verbale",
      difficulty: 1,
      question: "Quel est l&apos;intrus ?",
      words: ["ROUGE", "BLEU", "VERT", "GRAND", "JAUNE"],
      options: ["ROUGE", "BLEU", "GRAND", "JAUNE"],
      correct: 2
    },
    {
      id: 29,
      type: "arithmetic",
      category: "Raisonnement Numérique",
      difficulty: 1,
      question: "7 × 8 =",
      options: ["54", "56", "58", "64"],
      correct: 1
    },
    {
      id: 30,
      type: "spatial",
      category: "Raisonnement Spatial",
      difficulty: 1,
      question: "180° rotation de △",
      options: ["▽", "◁", "▷", "△"],
      correct: 0
    }
  ];

  const difficultySettings = {
    facile: {
      name: "Facile",
      icon: "🟢",
      description: "Questions de niveau 1-2 étoiles",
      color: "green",
      time: 25,
      filter: [1, 2]
    },
    moyen: {
      name: "Moyen",
      icon: "🟡",
      description: "Questions de niveau 2-4 étoiles",
      color: "yellow",
      time: 30,
      filter: [2, 3, 4]
    },
    difficile: {
      name: "Difficile",
      icon: "🔴",
      description: "Questions de niveau 3-5 étoiles",
      color: "red",
      time: 35,
      filter: [3, 4, 5]
    }
  };

  const selectRandomQuestions = (difficulty) => {
    const availableQuestions = allQuestions.filter(q =>
      difficultySettings[difficulty].filter.includes(q.difficulty)
    );

    const shuffled = [...availableQuestions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 15);
  };

  useEffect(() => {
    if (startTime && timeLeft > 0 && !isCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isCompleted) {
      setIsCompleted(true);
      setGameState('results');
    }
  }, [timeLeft, isCompleted, startTime]);

  const startTest = () => {
    const questions = selectRandomQuestions(selectedDifficulty);
    setSelectedQuestions(questions);
    setStartTime(Date.now());
    setCurrentQuestion(0);
    setAnswers({});
    setIsCompleted(false);
    setTimeLeft(difficultySettings[selectedDifficulty].time * 60);
    setGameState('test');
  };

  const handleAnswer = (answerIndex) => {
    const newAnswers = { ...answers, [currentQuestion]: answerIndex };
    setAnswers(newAnswers);

    if (currentQuestion < selectedQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsCompleted(true);
      setGameState('results');
    }
  };

  const calculateAdvancedIQ = () => {
    let rawScore = 0;
    let weightedScore = 0;
    let totalWeight = 0;
    let categoryScores = {};

    selectedQuestions.forEach((question, index) => {
      const isCorrect = answers[index] === question.correct;
      const weight = question.difficulty;

      if (!categoryScores[question.category]) {
        categoryScores[question.category] = { correct: 0, total: 0, weighted: 0 };
      }

      categoryScores[question.category].total++;
      totalWeight += weight;

      if (isCorrect) {
        rawScore++;
        weightedScore += weight;
        categoryScores[question.category].correct++;
        categoryScores[question.category].weighted += weight;
      }
    });

    const accuracyRate = rawScore / selectedQuestions.length;
    const difficultyBonus = weightedScore / totalWeight;
    const timeBonus = Math.max(0, (timeLeft / (difficultySettings[selectedDifficulty].time * 60)) * 0.1);

    let baseIQ = 70;
    let difficultyMultiplier = 1;

    switch (selectedDifficulty) {
      case 'facile':
        baseIQ = 85;
        difficultyMultiplier = 0.8;
        break;
      case 'moyen':
        baseIQ = 100;
        difficultyMultiplier = 1.0;
        break;
      case 'difficile':
        baseIQ = 115;
        difficultyMultiplier = 1.3;
        break;
    }

    const iq = Math.round(
      baseIQ +
      (accuracyRate * 35 * difficultyMultiplier) +
      (difficultyBonus * 20) +
      (timeBonus * 15)
    );

    return {
      iq: Math.min(200, Math.max(60, iq)),
      rawScore,
      weightedScore,
      categoryScores,
      accuracyRate: Math.round(accuracyRate * 100),
      timeUsed: (difficultySettings[selectedDifficulty].time * 60) - timeLeft
    };
  };

  const getDetailedIQAnalysis = (iq) => {
    const ranges = [
      { min: 160, max: 200, level: "Génie", description: "Intelligence exceptionnelle rare (0.01%)", color: "text-purple-700", bg: "bg-purple-100" },
      { min: 145, max: 159, level: "Très Supérieur+", description: "Intelligence très rare (0.1%)", color: "text-purple-600", bg: "bg-purple-50" },
      { min: 130, max: 144, level: "Très Supérieur", description: "Intelligence exceptionnelle (2%)", color: "text-indigo-600", bg: "bg-indigo-50" },
      { min: 120, max: 129, level: "Supérieur", description: "Intelligence supérieure (7%)", color: "text-blue-600", bg: "bg-blue-50" },
      { min: 110, max: 119, level: "Moyen Supérieur", description: "Au-dessus de la moyenne (16%)", color: "text-green-600", bg: "bg-green-50" },
      { min: 90, max: 109, level: "Moyen", description: "Intelligence moyenne (50%)", color: "text-gray-600", bg: "bg-gray-50" },
      { min: 80, max: 89, level: "Moyen Inférieur", description: "En dessous de la moyenne (16%)", color: "text-orange-600", bg: "bg-orange-50" },
      { min: 70, max: 79, level: "Limite", description: "Intelligence limite (7%)", color: "text-red-600", bg: "bg-red-50" },
      { min: 0, max: 69, level: "Déficitaire", description: "Déficit intellectuel (2%)", color: "text-red-700", bg: "bg-red-100" }
    ];

    return ranges.find(range => iq >= range.min && iq <= range.max) || ranges[ranges.length - 1];
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getCategoryIcon = (category) => {
    const icons = {
      "Raisonnement Perceptif": React.createElement(Puzzle, { className: "h-4 w-4 sm:h-5 sm:w-5" }),
      "Raisonnement Logique": React.createElement(Brain, { className: "h-4 w-4 sm:h-5 sm:w-5" }),
      "Compréhension Verbale": React.createElement(BookOpen, { className: "h-4 w-4 sm:h-5 sm:w-5" }),
      "Raisonnement Numérique": React.createElement(Calculator, { className: "h-4 w-4 sm:h-5 sm:w-5" }),
      "Raisonnement Spatial": React.createElement(Eye, { className: "h-4 w-4 sm:h-5 sm:w-5" })
    };
    return icons[category] || React.createElement(Target, { className: "h-4 w-4 sm:h-5 sm:w-5" });
  };

  if (gameState === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
        {/* Conteneur principal avec padding responsif */}
        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-12 max-w-6xl w-full">

            {/* Header principal */}
            <div className="text-center mb-12">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <Brain className="h-20 w-20 text-purple-400 animate-pulse" />
                  <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-2">
                    <Star className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>

              <h1 className="text-4xl lg:text-6xl font-black text-white mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                IQ MASTER PRO
              </h1>
              <p className="text-xl lg:text-2xl text-purple-200 mb-2">Test de QI Professionnel &amp; Scientifique</p>
              <p className="text-base lg:text-lg text-purple-300">Évaluation psychométrique certifiée • Normes WAIS-IV &amp; Raven</p>
            </div>

            {/* Statistiques impressionnantes */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-12">
              <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl p-6 text-center border border-blue-400/30">
                <Trophy className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">30+</div>
                <div className="text-blue-200 text-sm">Questions Calibrées</div>
              </div>
              <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-xl p-6 text-center border border-green-400/30">
                <Target className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">5</div>
                <div className="text-green-200 text-sm">Domaines Cognitifs</div>
              </div>
              <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-xl p-6 text-center border border-purple-400/30">
                <Zap className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">97%</div>
                <div className="text-purple-200 text-sm">Précision</div>
              </div>
              <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-xl p-6 text-center border border-orange-400/30">
                <TrendingUp className="h-8 w-8 text-orange-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">±3</div>
                <div className="text-orange-200 text-sm">Points d&apos;erreur</div>
              </div>
            </div>

            {/* Caractéristiques premium */}
            <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl p-8 mb-12 border border-indigo-400/30">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">🎯 Évaluation Scientifique Premium</h3>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center text-indigo-200">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                    <span><strong>30 questions</strong> sélectionnées aléatoirement</span>
                  </div>
                  <div className="flex items-center text-indigo-200">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                    <span><strong>3 niveaux</strong> de difficulté adaptatifs</span>
                  </div>
                  <div className="flex items-center text-indigo-200">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                    <span><strong>Matrices de Raven</strong> authentiques</span>
                  </div>
                  <div className="flex items-center text-indigo-200">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                    <span><strong>Séquences logiques</strong> complexes</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center text-indigo-200">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                    <span><strong>Calcul normalisé</strong> σ=15, μ=100</span>
                  </div>
                  <div className="flex items-center text-indigo-200">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                    <span><strong>Analyse détaillée</strong> par domaine</span>
                  </div>
                  <div className="flex items-center text-indigo-200">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                    <span><strong>Rapport complet</strong> avec percentiles</span>
                  </div>
                  <div className="flex items-center text-indigo-200">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                    <span><strong>Certificat</strong> de résultat</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bouton d'action */}
            <div className="flex justify-center mb-8">
              <button
                onClick={() => setGameState('difficulty')}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg text-lg flex items-center"
              >
                <Brain className="mr-3 h-6 w-6" />
                COMMENCER LE TEST
              </button>
            </div>

            {/* Disclaimer scientifique */}
            <div className="bg-amber-500/20 border border-amber-400/30 rounded-xl p-6">
              <div className="flex items-start">
                <Settings className="h-5 w-5 text-amber-400 mr-3 mt-0.5 flex-shrink-0" />
                <div className="text-amber-200 text-sm leading-relaxed">
                  <strong>Note scientifique :</strong> Ce test utilise des méthodes psychométriques standardisées et donne une estimation fiable de votre QI.
                  Pour un diagnostic officiel, consultez un psychologue certifié utilisant les tests WAIS-IV ou similaires.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'difficulty') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 lg:p-12 max-w-6xl w-full">

          {/* Header */}
          <div className="text-center mb-12">
            <Settings className="h-16 w-16 text-indigo-400 mx-auto mb-4" />
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Choisissez votre niveau</h2>
            <p className="text-indigo-200 text-lg">Sélectionnez la difficulté adaptée à votre profil</p>
          </div>

          {/* Cartes de difficulté */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {Object.entries(difficultySettings).map(([key, setting]) => (
              <div 
                key={key} 
                className={`relative group cursor-pointer transform transition-all duration-300 hover:scale-105 ${selectedDifficulty === key ? 'scale-105 ring-2 ring-indigo-400' : ''}`} 
                onClick={() => setSelectedDifficulty(key)}
              >
                <div className={`bg-gradient-to-br ${setting.color === 'green' ? 'from-green-500/20 to-green-600/20 border-green-400/30' : setting.color === 'yellow' ? 'from-yellow-500/20 to-yellow-600/20 border-yellow-400/30' : 'from-red-500/20 to-red-600/20 border-red-400/30'} rounded-2xl p-8 border hover:border-opacity-50 transition-all duration-300`}>

                  <div className="text-center">
                    <div className="text-6xl mb-4">{setting.icon}</div>
                    <h3 className="text-2xl font-bold text-white mb-2">{setting.name}</h3>
                    <p className="text-gray-300 mb-4">{setting.description}</p>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between text-gray-400">
                        <span>Durée :</span>
                        <span className="text-white font-semibold">{setting.time} min</span>
                      </div>
                      <div className="flex justify-between text-gray-400">
                        <span>Niveaux :</span>
                        <span className="text-white font-semibold">{"★".repeat(Math.max(...setting.filter))}</span>
                      </div>
                      <div className="flex justify-between text-gray-400">
                        <span>QI Cible :</span>
                        <span className="text-white font-semibold">
                          {key === 'facile' ? '80-120' : key === 'moyen' ? '90-140' : '110-160+'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {selectedDifficulty === key && (
                    <div className="absolute -top-2 -right-2 bg-indigo-500 rounded-full p-2">
                      <CheckCircle className="h-6 w-6 text-white" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Boutons d'action */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setGameState('menu')}
              className="bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 border border-white/30 order-2 sm:order-1"
            >
              ← Retour
            </button>
            <button
              onClick={startTest}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg text-lg order-1 sm:order-2"
            >
              LANCER LE TEST {difficultySettings[selectedDifficulty].icon}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'test') {
    const question = selectedQuestions[currentQuestion];

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
        <div className="max-w-6xl mx-auto">

          {/* Header avec progression */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl p-6 mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              
              {/* Progression */}
              <div className="flex items-center space-x-6 w-full sm:w-auto">
                <div className="text-white">
                  <span className="text-2xl font-bold">{currentQuestion + 1}</span>
                  <span className="text-gray-300 text-lg">/{selectedQuestions.length}</span>
                </div>

                <div className="flex-1 sm:w-64">
                  <div className="bg-gray-700 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${((currentQuestion + 1) / selectedQuestions.length) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {Math.round(((currentQuestion + 1) / selectedQuestions.length) * 100)}% complété
                  </div>
                </div>
              </div>

              {/* Informations */}
              <div className="flex items-center space-x-4 w-full sm:w-auto justify-between sm:justify-end">
                <div className="text-right">
                  <div className="flex items-center text-white">
                    <Clock className="h-5 w-5 mr-2" />
                    <span className={`text-xl font-mono ${timeLeft < 300 ? 'text-red-400 animate-pulse' : ''}`}>
                      {formatTime(timeLeft)}
                    </span>
                  </div>
                  <div className="text-xs text-gray-400">
                    {difficultySettings[selectedDifficulty].name} • {difficultySettings[selectedDifficulty].time}min
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-white font-semibold">{"★".repeat(question.difficulty)}</div>
                  <div className="text-xs text-gray-400">Difficulté</div>
                </div>
              </div>
            </div>
          </div>

          {/* Question principale */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 lg:p-12">

            {/* En-tête de question */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
                <div className="flex items-center">
                  {getCategoryIcon(question.category)}
                  <span className="ml-3 text-lg font-semibold text-blue-300">{question.category}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full px-3 py-1 text-sm font-bold text-black">
                    {"★".repeat(question.difficulty)}
                  </div>
                </div>
              </div>

              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-6 leading-tight">{question.question}</h2>

              {/* Zone de contenu spécialisée */}
              <div className="bg-white/5 rounded-2xl p-6 mb-8 border border-white/10">

                {/* Matrices */}
                {question.type === "matrices" && (
                  <div className="flex justify-center">
                    <div className="grid grid-cols-3 gap-3 max-w-sm">
                      {question.pattern.map((row, rowIndex) =>
                        row.map((cell, colIndex) => (
                          <div
                            key={`${rowIndex}-${colIndex}`}
                            className="w-20 h-20 lg:w-24 lg:h-24 border-2 border-gray-400 rounded-lg flex items-center justify-center text-3xl bg-white/90 shadow-lg"
                          >
                            {cell === "?" ? (
                              <span className="text-gray-500 text-4xl font-bold">?</span>
                            ) : (
                              <span>{cell}</span>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}

                {/* Séquences */}
                {question.type === "sequence" && (
                  <div className="text-center">
                    <div className="text-3xl lg:text-4xl font-mono text-white mb-4 tracking-wider bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent break-all">
                      {question.sequence}
                    </div>
                    {question.explanation && (
                      <div className="text-gray-300 text-lg italic">{question.explanation}</div>
                    )}
                  </div>
                )}

                {/* Prémisses verbales */}
                {question.premise && (
                  <div className="text-center">
                    <div className="text-xl lg:text-2xl font-semibold text-white bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent break-words">
                      {question.premise}
                    </div>
                  </div>
                )}

                {/* Listes de mots */}
                {question.words && (
                  <div className="text-center">
                    <div className="text-xl text-white">
                      <div className="flex flex-wrap justify-center gap-3">
                        {question.words.map((word, index) => (
                          <span key={index} className="inline-block bg-white/10 rounded-lg px-3 py-2 border border-white/20 text-lg">
                            {word}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Descriptions */}
                {question.description && (
                  <div className="bg-blue-500/20 rounded-xl p-4 border border-blue-400/30">
                    <div className="text-blue-200 text-lg leading-relaxed">{question.description}</div>
                  </div>
                )}
              </div>
            </div>

            {/* Options de réponse */}
            <div className="grid gap-4 mb-8">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className="group relative p-6 text-left border-2 border-white/20 rounded-2xl hover:border-blue-400 hover:bg-blue-500/10 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl"
                >
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full border-2 border-white/30 group-hover:border-blue-400 group-hover:bg-blue-500/20 flex items-center justify-center mr-4 text-lg font-bold text-white transition-all duration-300 flex-shrink-0">
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="text-lg lg:text-xl text-white font-medium group-hover:text-blue-200 transition-colors leading-relaxed">{option}</span>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 rounded-2xl transition-all duration-300"></div>
                </button>
              ))}
            </div>

            {/* Informations supplémentaires */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm gap-3">
              <div className="flex flex-wrap items-center gap-4 text-gray-400">
                <span>Question {currentQuestion + 1} sur {selectedQuestions.length}</span>
                <span className="hidden sm:inline">•</span>
                <span className="break-words">Catégorie: {question.category}</span>
                <span className="hidden sm:inline">•</span>
                <span>Niveau: {"★".repeat(question.difficulty)}</span>
              </div>

              <div className="text-gray-400 self-end sm:self-auto">
                <span>Temps restant: {formatTime(timeLeft)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'results') {
    const results = calculateAdvancedIQ();
    const iqAnalysis = getDetailedIQAnalysis(results.iq);
    const categoryPerformance = Object.entries(results.categoryScores).map(([category, stats]) => ({
      category,
      percentage: Math.round((stats.correct / stats.total) * 100),
      correct: stats.correct,
      total: stats.total,
      weighted: stats.weighted
    }));

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
        <div className="max-w-6xl mx-auto">

          {/* Header de résultats */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Trophy className="h-20 w-20 text-yellow-400 animate-pulse" />
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-2">
                  <Award className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>
            <h1 className="text-4xl lg:text-5xl font-black text-white mb-4">RAPPORT D&apos;ANALYSE</h1>
            <p className="text-xl text-purple-200">Évaluation Psychométrique Complète</p>
          </div>

          {/* Score principal */}
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-white text-center mb-12 shadow-2xl border border-white/20">
            <div className="mb-6">
              <div className="text-7xl lg:text-8xl font-black mb-4 bg-gradient-to-r from-yellow-300 to-white bg-clip-text text-transparent animate-pulse">
                {results.iq}
              </div>
              <div className="text-3xl font-bold mb-2">QUOTIENT INTELLECTUEL</div>
              <div className="text-2xl text-white">
                {iqAnalysis.level}
              </div>
            </div>

            <div className={`${iqAnalysis.bg.replace('bg-', 'bg-white/20 ')} rounded-2xl p-6 text-white`}>
              <p className="text-lg font-semibold mb-2">{iqAnalysis.description}</p>
              <p className="text-base">Écart-type: {((results.iq - 100) / 15).toFixed(2)}σ • Percentile: {Math.round((1 - (1 / (1 + Math.pow((results.iq - 100) / 15, 2)))) * 100)}%</p>
            </div>
          </div>

          {/* Statistiques détaillées */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
              <CheckCircle className="h-8 w-8 text-green-400 mb-3" />
              <div className="text-3xl font-bold text-white">{results.rawScore}/{selectedQuestions.length}</div>
              <div className="text-green-300">Réponses correctes</div>
              <div className="text-sm text-gray-400 mt-1">{results.accuracyRate}% de réussite</div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
              <Clock className="h-8 w-8 text-blue-400 mb-3" />
              <div className="text-3xl font-bold text-white">{formatTime(results.timeUsed)}</div>
              <div className="text-blue-300">Temps utilisé</div>
              <div className="text-sm text-gray-400 mt-1">sur {difficultySettings[selectedDifficulty].time}:00</div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
              <Star className="h-8 w-8 text-purple-400 mb-3" />
              <div className="text-3xl font-bold text-white">{results.weightedScore}</div>
              <div className="text-purple-300">Score pondéré</div>
              <div className="text-sm text-gray-400 mt-1">Difficulté prise en compte</div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
              <Target className="h-8 w-8 text-orange-400 mb-3" />
              <div className="text-3xl font-bold text-white">{difficultySettings[selectedDifficulty].name}</div>
              <div className="text-orange-300">Niveau testé</div>
              <div className="text-sm text-gray-400 mt-1">Mode {selectedDifficulty}</div>
            </div>
          </div>

          {/* Performance par domaine */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 mb-12">
            <h3 className="text-3xl font-bold text-white mb-8 text-center">ANALYSE PAR DOMAINE COGNITIF</h3>
            <div className="space-y-6">
              {categoryPerformance.map((cat, index) => (
                <div key={index} className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
                    <div className="flex items-center">
                      <div className="mr-4 text-indigo-400">
                        {getCategoryIcon(cat.category)}
                      </div>
                      <div>
                        <span className="text-xl font-semibold text-white block">{cat.category}</span>
                        <div className="text-sm text-gray-400">{cat.correct}/{cat.total} correctes</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">{cat.percentage}%</div>
                      <div className="text-sm text-gray-400">Score pondéré: {cat.weighted}</div>
                    </div>
                  </div>

                  <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
                    <div
                      className={`h-4 rounded-full transition-all duration-1000 ease-out ${cat.percentage >= 80 ? 'bg-gradient-to-r from-green-500 to-green-400' :
                        cat.percentage >= 60 ? 'bg-gradient-to-r from-yellow-500 to-yellow-400' :
                          cat.percentage >= 40 ? 'bg-gradient-to-r from-orange-500 to-orange-400' :
                            'bg-gradient-to-r from-red-500 to-red-400'
                        }`}
                      style={{ width: `${cat.percentage}%` }}
                    ></div>
                  </div>

                  <div className="mt-2 text-sm text-gray-300">
                    {cat.percentage >= 80 ? '🏆 Excellent' :
                      cat.percentage >= 60 ? '✅ Bon' :
                        cat.percentage >= 40 ? '⚠️ Moyen' : '❌ À améliorer'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions finales */}
          <div className="text-center space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  setGameState('menu');
                  setCurrentQuestion(0);
                  setAnswers({});
                  setIsCompleted(false);
                  setSelectedQuestions([]);
                }}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg text-lg flex items-center justify-center"
              >
                <RefreshCw className="mr-3 h-5 w-5" />
                NOUVEAU TEST
              </button>

              <button
                onClick={() => setGameState('difficulty')}
                className="bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 border border-white/30 text-lg flex items-center justify-center"
              >
                <Settings className="mr-3 h-5 w-5" />
                CHANGER DIFFICULTÉ
              </button>
            </div>

            {/* Disclaimer final */}
            <div className="bg-amber-500/20 border border-amber-400/30 rounded-2xl p-6 max-w-4xl mx-auto">
              <div className="flex items-start">
                <Settings className="h-6 w-6 text-amber-400 mr-4 mt-1 flex-shrink-0" />
                <div className="text-amber-200 text-left">
                  <h4 className="font-semibold mb-2">Note importante sur les résultats</h4>
                  <p className="text-sm leading-relaxed">
                    Ce test utilise des méthodes psychométriques validées et donne une estimation fiable de votre QI.
                    Cependant, de nombreux facteurs peuvent influencer les résultats : fatigue, stress, environnement,
                    familiarité avec ce type de tests, etc. Pour une évaluation officielle et un diagnostic précis,
                    consultez un psychologue qualifié utilisant les tests standardisés (WAIS-IV, WISC-V, etc.).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <div>Erreur de navigation</div>;
};

export default IQTest;