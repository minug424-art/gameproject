import React, { useState, useEffect, useCallback } from 'react';
import GameCanvas from './components/GameCanvas';
import RankingBoard from './components/RankingBoard';
import { fetchGameConfig, fetchRanking, postScore } from './api/gameApi';

const DEFAULT_CONFIG = {
  gameTitle: '현다호',
  gameOverMsg: '돼지꿀꿀이ㅠㅠ',
  life: 5,
  playerSpeed: 6,
  enemySpeed: 4,
  enemyCount: 14,
  minStarSize: 4,
  maxStarSize: 19,
  baseScore: 11,
  feverTriggerScore: 150,
  feverMultiplier: 3
};

export default function App() {
  const [config, setConfig] = useState(DEFAULT_CONFIG);
  const [isConnected, setIsConnected] = useState(false);
  const [playerName, setPlayerName] = useState('돼지저금통');
  const [rankings, setRankings] = useState([]);

  useEffect(() => {
    async function initServerData() {
      try {
        const serverConfig = await fetchGameConfig();
        setConfig(serverConfig);
        setIsConnected(true);
        const list = await fetchRanking();
        setRankings(list);
      } catch (err) {
        console.warn('Java 서버에 연결할 수 없어 기본 설정으로 실행합니다.', err);
        setIsConnected(false);
      }
    }
    initServerData();
  }, []);

  const handleGameOver = useCallback(
    async (finalScore) => {
      try {
        const updatedList = await postScore(playerName || '이름없음', finalScore);
        setRankings(updatedList);
      } catch (err) {
        console.error('랭킹 저장 실패:', err);
      }
    },
    [playerName]
  );

  return (
    <div className="app-container">
      <GameCanvas config={config} isConnected={isConnected} onGameOver={handleGameOver} />
      <RankingBoard
        playerName={playerName}
        onNameChange={setPlayerName}
        rankings={rankings}
      />
    </div>
  );
}
