import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Login } from './components';
import { useSelector } from "react-redux";
import { Mario, LoadingScreen, Score, MobileControls, Footer } from "./components";
import { KeyMessages, Bricks, Sun, Clouds, Birds, Obstacles } from './components/gameBackground'

function Home() {
    const isPlay = useSelector((state) => state.engine.play);
    return (
        <>
            <div className="App">
                {!isPlay && <KeyMessages />}
                <Bricks />
                <Mario />
                <Sun />
                <Clouds />
                <Birds />
                <Obstacles />
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
