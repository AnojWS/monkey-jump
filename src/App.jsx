import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  Mario,
  LoadingScreen,
  Score,
  MobileControls,
  Footer,
  BananaGame,
} from './components';
import {
  KeyMessages,
  Bricks,
  Sun,
  Clouds,
  Birds,
  Obstacles,
} from './components/gameBackground';
import { setPause, setReady } from './state/engine/engineSlice';
import { useEffect } from 'react';
import SignUp from './components/signup/signup';
import Signin from './components/signin/signin';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { setUser } from './state/auth/authSlice';

let count = 1;

function Home() {
  const dispatch = useDispatch();
  const isPlay = useSelector((state) => state.engine.play);
  const isPause = useSelector((state) => state.engine.pause);
  const score = useSelector((state) => state.engine.score);

  const isLoading = useSelector((state) => state.engine.loadingScreen);

  // Move state update logic to useEffect
  useEffect(() => {
    console.log(count);
    if (score > 100 * count) {
      count++;
      dispatch(setReady(false));
      dispatch(setPause(true));
    }
  }, [score, dispatch]); // Dependencies to trigger the effect when score changes

  return (
    <>
      {isLoading && <LoadingScreen />}
      {isPause && <BananaGame />}
      <div className="App">
        {!isPlay && score === 0 && <KeyMessages />}
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

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  //   console.log(user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        dispatch(setUser({
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
        }));
      } else {
        // If no user is logged in, clear the state
        dispatch(setUser(null));
      }
    });
    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, [dispatch]);
 
  console.log(user)
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={user != null ? <Home /> : <Navigate to="/" />} />
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<Navigate to="/signin" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
