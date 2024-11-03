import "./Monkey.css";
import MarioCharacter from "../../assets/img/gif/monkey.gif";
import { useEffect, useRef, useCallback, useMemo } from "react";
import jumpAudio from "../../assets/audio/mario-jump.mp3";
import backgroundMusic from "../../assets/audio/running-about.mp3";
// redux
import { useDispatch, useSelector } from "react-redux";
import {
  monkeyJumping,
  monkeyHeight,
  monkeyLeft,
  monkeyTop,
  monkeyWidth,
} from "../../state/monkey/monkeySlice";
import { setReady, setDie, setScore } from "../../state/engine/engineSlice";

// die
import dieAudio from "../../assets/audio/mario-died.mp3";

export const Mario = () => {
  const marioRef = useRef();
  const dispatch = useDispatch();
  const die = useSelector((state) => state.engine.die);
  const loadingScreen = useSelector((state) => state.engine.loadingScreen);

  const isPlay = useSelector((state) => state.engine.play);
  // Mario positions & jump
  const mario_jump = useSelector((state) => state.mario.jumping);
  const mario_height = useSelector((state) => state.mario.height);
  const mario_left = useSelector((state) => state.mario.left);
  const mario_top = useSelector((state) => state.mario.top);
  const mario_width = useSelector((state) => state.mario.width);
  // Obstacle1 positions
  const obs1_height = useSelector((state) => state.obstacle.obs1Height);
  const obs1_left = useSelector((state) => state.obstacle.obs1Left);
  const obs1_top = useSelector((state) => state.obstacle.obs1Top);
  const obs1_width = useSelector((state) => state.obstacle.obs1Width);
  // Obstacle2 positions
  const obs2_height = useSelector((state) => state.obstacle.obs2Height);
  const obs2_left = useSelector((state) => state.obstacle.obs2Left);
  const obs2_top = useSelector((state) => state.obstacle.obs2Top);
  const obs2_width = useSelector((state) => state.obstacle.obs2Width);

  // Jump audio
  const jump = useMemo(() => {
    return new Audio(jumpAudio);
  }, []);

  // Die
  const marioDie = useMemo(() => {
    return new Audio(dieAudio);
  }, []);

  const bgMusic = useMemo(() => {
    return new Audio(backgroundMusic);
  }, []);

  // Handling key press event.
  const handleKey = useCallback(
    (e) => {
      if (e.code === "Enter" && !isPlay && !die && !loadingScreen) {
        dispatch(setReady(true));
      }
      if (mario_jump === false && e.code === "Space" && isPlay && !die && !loadingScreen) {
        dispatch(monkeyJumping(true));
        jump.play();
        setTimeout(() => {
          dispatch(monkeyJumping(false));
          jump.pause();
          jump.currentTime = 0;
        }, 400);
      }
    },
    [mario_jump, jump, dispatch, isPlay, die, loadingScreen]
  );

  useEffect(() => {
    if (
      mario_left < obs1_left + obs1_width &&
      mario_left + mario_width > obs1_left &&
      mario_top < obs1_top + obs1_height &&
      mario_top + mario_height > obs1_top
    ) {
      dispatch(setDie(true));
      marioDie.play();
      dispatch(setReady(false));
      setTimeout(() => {
        dispatch(setDie(false));
      }, 2000);
      setTimeout(() => {
        dispatch(setScore(0));
      }, 100);
    }

    if (
      mario_left < obs2_left + obs2_width &&
      mario_left + mario_width > obs2_left &&
      mario_top < obs2_top + obs2_height &&
      mario_top + mario_height > obs2_top
    ) {
      dispatch(setDie(true));
      marioDie.play();
      dispatch(setReady(false));
      setTimeout(() => {
        dispatch(setDie(false));
      }, 2000);
      setTimeout(() => {
        dispatch(setScore(0));
      }, 100);
    }
  }, [
    mario_left,
    obs1_left,
    obs1_width,
    mario_width,
    mario_top,
    obs1_top,
    obs1_height,
    mario_height,
    dispatch,
    marioDie,
    obs2_left,
    obs2_width,
    obs2_top,
    obs2_height,
  ]);

  // Monitor key press.
  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    dispatch(monkeyHeight(marioRef.current.getBoundingClientRect().height));
    dispatch(monkeyLeft(marioRef.current.getBoundingClientRect().left));
    dispatch(monkeyTop(marioRef.current.getBoundingClientRect().top));
    dispatch(monkeyWidth(marioRef.current.getBoundingClientRect().width));

    if (isPlay) {
      bgMusic.play();
    } else {
      bgMusic.pause();
      bgMusic.currentTime = 0;
    }
  }, [handleKey, dispatch, bgMusic, isPlay]);

  return (
    <div className="monkey-container">
      {!die && (
        <img
          src={MarioCharacter}
          alt=""
          className={`monkey ${mario_jump ? "jump" : ""}`}
          ref={marioRef}
        />
      )}
      {die && (
        <img
          src={MarioCharacter}
          alt=""
          className={`monkey ${die ? "die" : ""}`}
          ref={marioRef}
        />
      )}
    </div>
  );
};

