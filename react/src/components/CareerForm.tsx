import React, { useState } from "react";
import axios from "axios";

const CareerForm = () => {
    const [skills, setSkills] = useState("");
    const [degree, setDegree] = useState("");
    const [response, setResponse] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://127.0.0.1:8000/career-map", {
                skills,
                degree,
            });
            setResponse(res.data.response);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-6 flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold text-indigo-700 mb-6 drop-shadow-md">🎯 SkillPilot: Career Mapper</h1>
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-lg space-y-4"
            >
                <div>
                    <label className="block text-lg font-semibold mb-1 text-gray-700">Your Skills</label>
                    <input
                        type="text"
                        value={skills}
                        onChange={(e) => setSkills(e.target.value)}
                        placeholder="e.g., Python, Data Analysis"
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-lg font-semibold mb-1 text-gray-700">Your Degree</label>
                    <input
                        type="text"
                        value={degree}
                        onChange={(e) => setDegree(e.target.value)}
                        placeholder="e.g., B.Tech in AI & DS"
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700 transition-all"
                >
                    🔍 Map My Career
                </button>
            </form>

            {response && (
                <div className="mt-8 bg-white p-6 rounded-2xl shadow-xl w-full max-w-4xl">
                    <h2 className="text-xl font-bold mb-4 text-indigo-800">Career Map Result:</h2>
                    <pre className="whitespace-pre-wrap text-gray-800">{response}</pre>
                </div>
            )}
        </div>
    );
};

export default CareerForm;
