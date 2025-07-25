import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Chart from "../components/home/Chart";

const difficulties = [
  { label: "Easy", value: 0 },
  { label: "Medium", value: 1 },
  { label: "Hard", value: 2 },
];

const Home = () => {
  const navigate = useNavigate();
  const [difficulty, setDifficulty] = useState(() => {
    const saved = localStorage.getItem('lockpick-difficulty');
    return saved ? parseInt(saved) : 0;
  });

  // Save difficulty to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('lockpick-difficulty', difficulty.toString());
  }, [difficulty]);  const bgGradient = [
    "bg-gradient-to-b from-blue-950 to-blue-900", // Easy
    "bg-gradient-to-b from-orange-900 to-yellow-700", // Medium
    "bg-gradient-to-b from-rose-950 to-red-800", // Hard
  ][difficulty];

  const textGradient = [
    "bg-gradient-to-r from-blue-400 to-blue-200 text-blue-950", // Easy
    "bg-gradient-to-r from-orange-300 to-yellow-200 text-orange-900", // Medium
    "bg-gradient-to-r from-rose-400 to-red-300 text-rose-900", // Hard
  ][difficulty];

  const buttonGradient = [
    "bg-gradient-to-r from-blue-400 to-blue-200 text-blue-950",
    "bg-gradient-to-r from-orange-300 to-yellow-200 text-orange-900",
    "bg-gradient-to-r from-rose-400 to-red-300 text-rose-900",
  ][difficulty];

  return (
    <div
      className={`flex flex-col items-center justify-center h-screen w-screen ${bgGradient} transition-colors duration-700 relative`}
    >
      <Chart difficulty={difficulty} />
      
      <span
        className={`text-7xl font-extrabold mb-8 bg-clip-text text-transparent leading-relaxed pt-2 ${textGradient} transition-colors duration-700`}
      >
        LOKPIK
      </span>
      <div className="flex flex-col items-center justify-center w-full">
        <div className="flex flex-col items-center mb-8 w-72">
          <input
            type="range"
            min={0}
            max={2}
            step={1}
            value={difficulty}
            onChange={(e) => setDifficulty(Number(e.target.value))}
            className="w-full accent-blue-400"
          />
          <div className="flex justify-between w-full mt-2 text-lg font-semibold">
            {difficulties.map((d, idx) => (
              <span
                key={d.value}
                className={`px-4 py-1 rounded-xl transition-all duration-300 cursor-pointer select-none hover:scale-105 hover:brightness-110
                  ${difficulty === idx
                    ? `${textGradient} font-bold bg-white/20 shadow-md`
                    : "text-blue-200 hover:text-white hover:bg-white/10"}
                `}
                onClick={() => setDifficulty(idx)}
              >
                {d.label}
              </span>
            ))}
          </div>
        </div>
        <button
          className={`mt-4 px-12 py-5 text-4xl font-black tracking-widest rounded-2xl shadow-2xl hover:scale-110 hover:brightness-110 hover:shadow-3xl active:scale-105 transition-all duration-300 ${buttonGradient} transition-colors duration-700`}
          onClick={() => navigate("/game")}
        >
          LET'S PLAY
        </button>
      </div>
    </div>
  );
};

export default Home;
