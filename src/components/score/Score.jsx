import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setScore, setLastScore } from "../../state/engine/engineSlice";
import "./Score.css";

export const Score = () => {
  const score = useSelector(state => state.engine.score);
  const count = useSelector(state => state.engine.level);
  const lastScore = useSelector(state => state.engine.lastScore);
  const play = useSelector(state => state.engine.play);
  const die = useSelector(state => state.engine.die);
  const dispatch = useDispatch();

  useEffect(() => {
    if (play && !die) {
      setTimeout(() => {
        dispatch(setScore(score + 1));
      }, 100);
    }
    if (score && !play) {
      dispatch(setLastScore(score));
    }
  }, [dispatch, play, score, lastScore, die]);
  return (
    <div className=" flex justify-between score-container">
      {play && <p className="score text-black">Score: {score}</p>}
      {play && <p className="score text-right text-black">Level: {count}</p>}
      {!play && <p className="score text-black">Score: {lastScore}</p>}
      {!play && <p className="score text-right text-black">Level: {count}</p>}
    </div>
  )
}
