import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { useSelector, useDispatch } from "react-redux";
import { Mario, LoadingScreen, Score, MobileControls, Footer, BananaGame } from "./components";
import { KeyMessages, Bricks, Sun, Clouds, Birds, Obstacles } from './components/gameBackground'
import { setPause, setReady } from './state/engine/engineSlice';
import { useEffect } from 'react';

let count = 1;

function Home() {
    const dispatch = useDispatch();
    const isPlay = useSelector((state) => state.engine.play);
    const isPause = useSelector((state) => state.engine.pause);
    const score = useSelector(state => state.engine.score);
    

    // Move state update logic to useEffect
    useEffect(() => {
        console.log(count);
        if (score > 100*count) {
            count++;
            dispatch(setReady(false));
            dispatch(setPause(true));

        }

    }, [score, dispatch]); // Dependencies to trigger the effect when score changes


    return (
        <>
        {isPause && <BananaGame />}
            <div className="App">
            
                {!isPlay && (score === 0) && <KeyMessages />}
                {!isPause && <Bricks />}
                {!isPause && <Sun />}
                {!isPause && <Mario />}
                {!isPause && <Clouds />}
                {!isPause && <Birds />}
                {!isPause && <Obstacles />}
                <Score />
                                
            </div>
            <MobileControls />
            <Footer />
            
        </>
    );
}


function App() {
  const isLoading = useSelector((state) => state.engine.loadingScreen);
    return (
        <BrowserRouter>
            {isLoading && <LoadingScreen />}
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
