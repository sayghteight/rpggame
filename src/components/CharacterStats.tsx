import React from 'react';

interface CharacterStatsProps {
  stats: {
    name: string;
    level: number;
    hp: number;
    maxHp: number;
    mp: number;
    maxMp: number;
    exp: number;
    nextLevelExp: number;
  };
}

const CharacterStats: React.FC<CharacterStatsProps> = ({ stats }) => {
  const renderBar = (current: number, max: number, color: string) => {
    const percentage = (current / max) * 100;
    return (
      <div className="w-full bg-gray-700 rounded-full h-2.5">
        <div
          className={`${color} h-2.5 rounded-full`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    );
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-4">
      <h2 className="text-2xl font-semibold mb-4">Character Stats</h2>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="font-semibold">{stats.name}</span>
          <span>Level {stats.level}</span>
        </div>
        <div>
          <div className="flex justify-between text-sm">
            <span>HP</span>
            <span>{stats.hp} / {stats.maxHp}</span>
          </div>
          {renderBar(stats.hp, stats.maxHp, 'bg-red-500')}
        </div>
        <div>
          <div className="flex justify-between text-sm">
            <span>MP</span>
            <span>{stats.mp} / {stats.maxMp}</span>
          </div>
          {renderBar(stats.mp, stats.maxMp, 'bg-blue-500')}
        </div>
        <div>
          <div className="flex justify-between text-sm">
            <span>EXP</span>
            <span>{stats.exp} / {stats.nextLevelExp}</span>
          </div>
          {renderBar(stats.exp, stats.nextLevelExp, 'bg-green-500')}
        </div>
      </div>
    </div>
  );
};

export default CharacterStats;