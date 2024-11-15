import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopScores } from "../../state/score/scoreSlice";
import mainBackgroundImage from "../../assets/img/sign_up.png";
import cardBackgroundImage from "../../assets/img/sign_up.png";

const Leaderboard = () => {
    const dispatch = useDispatch();
    const { topScores, loading } = useSelector((state) => state.scores);

    useEffect(() => {
        dispatch(fetchTopScores());
    }, [dispatch]);

    return (
        <div
            className="flex items-center justify-center h-screen "
        >
            <img
                src={mainBackgroundImage}
                alt="Background"
                className="absolute w-full h-full object-cover opacity-20"
            />
            <div
                className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full"
                style={{
                    backgroundImage: cardBackgroundImage,
                    backgroundSize: "cover",
                    backgroundBlendMode: "overlay",
                    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
                }}
            >

                <h1 className="text-2xl font-bold text-center mb-4 text-yellow-700">
                    🏆 Leader Board 🏆
                </h1>

                {loading ? (
                    <div className="text-center">Loading...</div>
                ) : topScores.length > 0 ? (
                    <div className="overflow-y-auto max-h-80">
                        {topScores.map((user, index) => (
                            <div
                                key={index}
                                className="flex justify-between p-3 mb-2 bg-gray-100 rounded-md shadow-sm"
                            >
                                <span className="font-semibold">{user.email || "No Email"}</span>
                                <span className="text-blue-600">{user.score}</span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-600 font-semibold">
                        No leaderboard available
                    </div>
                )}

                <button className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded mt-4 mx-auto block shadow-md transition duration-300 ease-in-out transform hover:scale-105">
                    Play Again
                </button>
            </div>
        </div>
    );
};

export default Leaderboard;
