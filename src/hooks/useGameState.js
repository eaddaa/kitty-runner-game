import { useState, useEffect } from 'react';

export const useGameState = () => {
  const [highScore, setHighScore] = useState(0);
  const [totalGames, setTotalGames] = useState(0);
  const [achievements, setAchievements] = useState([]);

  // LocalStorage'dan verileri yükleme
  useEffect(() => {
    const savedHighScore = parseInt(localStorage.getItem('highScore')) || 0;
    const savedTotalGames = parseInt(localStorage.getItem('totalGames')) || 0;
    const savedAchievements = JSON.parse(localStorage.getItem('achievements')) || [];

    setHighScore(savedHighScore);
    setTotalGames(savedTotalGames);
    setAchievements(savedAchievements);
  }, []);

  // TotalGames değiştiğinde localStorage'ı güncelle
  useEffect(() => {
    localStorage.setItem('totalGames', totalGames.toString());
  }, [totalGames]);

  const updateHighScore = (newScore) => {
    if (newScore > highScore) {
      setHighScore(newScore);
      localStorage.setItem('highScore', newScore.toString());
      return true;
    }
    return false;
  };

  const incrementTotalGames = () => {
    setTotalGames(prev => prev + 1);
  };

  const checkAchievements = (score, combo) => {
    const newAchievements = [];

    // Skor başarıları
    if (score >= 1000 && !achievements.includes('score1000')) {
      newAchievements.push('score1000');
    }
    if (score >= 5000 && !achievements.includes('score5000')) {
      newAchievements.push('score5000');
    }

    // Combo başarıları
    if (combo >= 10 && !achievements.includes('combo10')) {
      newAchievements.push('combo10');
    }
    if (combo >= 20 && !achievements.includes('combo20')) {
      newAchievements.push('combo20');
    }

    // Oyun sayısı başarıları
    if (totalGames + 1 >= 10 && !achievements.includes('games10')) {
      newAchievements.push('games10');
    }
    if (totalGames + 1 >= 50 && !achievements.includes('games50')) {
      newAchievements.push('games50');
    }

    if (newAchievements.length > 0) {
      const updatedAchievements = [...achievements, ...newAchievements];
      setAchievements(updatedAchievements);
      localStorage.setItem('achievements', JSON.stringify(updatedAchievements));
      return newAchievements;
    }

    return [];
  };

  return {
    highScore,
    totalGames,
    achievements,
    updateHighScore,
    incrementTotalGames,
    checkAchievements
  };
};
