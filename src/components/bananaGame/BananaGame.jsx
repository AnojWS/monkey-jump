import { useEffect, useState } from 'react';
import './BananaGame.css';
import { useDispatch, useSelector } from "react-redux";
import { setScore, setReady, setPause} from '../../state/engine/engineSlice';

export const BananaGame = () => {
  const score = useSelector(state => state.engine.score);
  // const play = useSelector(state => state.engine.play);
  const dispatch = useDispatch();
  const [data, setData] = useState();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const result = await fetch('/uob/banana/api.php?out=json');
    const data = await result.json();
    setData(data);
    console.log(data);
  };

  const [answer, setAnswer] = useState(0);
  // Function to handle changes in the input field
  const handleInputChange = (event) => {
    const value = event.target.value;
    setAnswer(value);
    
    
    
  };

  const handleCheck = () => {
    console.log(answer);
    console.log(data.solution);
    if (data.solution == answer) {
      console.log("correct");
      dispatch(setScore(score+10));
      dispatch(setReady(true));
      dispatch(setPause(false));
    }
    // You can also use the inputValue for other logic here
  };

  return (
    <div className="banana-game">
      {data && <img className="banana-game-image" src={data.question} alt="" />}
      <h2>Enter the number should be at Banana</h2>
      <input
        autoFocus
        type="number"
        min="0"
        max="9"
        onChange={handleInputChange}
      />
      <button onClick={handleCheck}>check</button>
    </div>
  );
};
