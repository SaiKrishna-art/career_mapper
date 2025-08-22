import React, { useState } from "react";

// Define an interface for the structure of the parsed response sections
interface ParsedSections {
    qualifiedJobs: string[];
    skillGaps: string[];
    roadmaps: {
        beginner: string[];
        intermediate: string[];
        advanced: string[];
    };
    freeResources: string[];
    paidResources: string[];
    freeLinks: string[];
    paidLinks: string[];
}
 
const CareerForm = () => {
    const [skills, setSkills] = useState<string>("");
    const [degree, setDegree] = useState<string>("");
    const [response, setResponse] = useState<string>("");
    const [error, setError] = useState<string | null>(null); // State to store error messages

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setError(null); // Clear previous errors
        setResponse(""); // Clear previous response

        try {
            const res = await fetch("career-mapper-aua420ztr-saikrishna-arts-projects.vercel.app", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    skills,
                    degree,
                }),
            });

            if (!res.ok) { // Check if the response was NOT successful (e.g., 405, 500)
                let errorMessage = `HTTP error! Status: ${res.status}`;
                try {
                    const errorData = await res.json(); // Try to parse JSON error from FastAPI
                    if (errorData && errorData.detail) {
                        errorMessage = `Error: ${errorData.detail}`;
                    } else if (errorData) {
                        errorMessage = `Error: ${JSON.stringify(errorData)}`;
                    }
                } catch (jsonError) {
                    // If parsing JSON fails, try to get plain text
                    const textError = await res.text();
                    errorMessage = `HTTP error ${res.status}: ${textError || 'Unknown server error'}`;
                }
                throw new Error(errorMessage); // Throw an error to be caught by the catch block
            }

            const data = await res.json();
            // Assuming your FastAPI response is like {"response": "..."}
            if (data && typeof data.response === 'string') {
                setResponse(data.response);
            } else {
                throw new Error("Invalid response format from server.");
            }

        } catch (err: any) {
            console.error("Fetch error:", err);
            setError(err.message || "An unexpected error occurred."); // Set the error message
        }
    };

    // This line might still cause TypeError if 'response' is empty initially,
    // or if the data.response was not a string due to the unhandled error in the original code.
    // With improved error handling above, 'response' should only contain a string on success.
    const { qualifiedJobs, skillGaps, roadmaps, freeResources, paidResources, freeLinks, paidLinks } = parseResponse(response);

    return (
        <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
            {/* Custom CSS for neon glow effects */}
            <style dangerouslySetInnerHTML={{
                __html: `
                .neon-glow {
                    transition: all 0.3s ease-in-out;
                }
                .neon-glow:hover {
                    box-shadow: 0 0 20px rgba(255, 255, 255, 0.5),
                                0 0 40px rgba(255, 255, 255, 0.3),
                                0 0 60px rgba(255, 255, 255, 0.2);
                    transform: translateY(-2px);
                }
                .neon-glow-purple {
                    transition: all 0.3s ease-in-out;
                }
                .neon-glow-purple:hover {
                    box-shadow: 0 0 20px rgba(168, 85, 247, 0.6),
                                0 0 40px rgba(168, 85, 247, 0.4),
                                0 0 60px rgba(168, 85, 247, 0.2);
                    transform: translateY(-2px);
                }
                .neon-glow-green {
                    transition: all 0.3s ease-in-out;
                }
                .neon-glow-green:hover {
                    box-shadow: 0 0 20px rgba(34, 197, 94, 0.6),
                                0 0 40px rgba(34, 197, 94, 0.4),
                                0 0 60px rgba(34, 197, 94, 0.2);
                    transform: translateY(-2px);
                }
                .neon-glow-red {
                    transition: all 0.3s ease-in-out;
                }
                .neon-glow-red:hover {
                    box-shadow: 0 0 20px rgba(239, 68, 68, 0.6),
                                0 0 40px rgba(239, 68, 68, 0.4),
                                0 0 60px rgba(239, 68, 68, 0.2);
                    transform: translateY(-2px);
                }
                .neon-glow-blue {
                    transition: all 0.3s ease-in-out;
                }
                .neon-glow-blue:hover {
                    box-shadow: 0 0 20px rgba(99, 102, 241, 0.6),
                                0 0 40px rgba(99, 102, 241, 0.4),
                                0 0 60px rgba(99, 102, 241, 0.2);
                    transform: translateY(-2px);
                }
                .neon-glow-orange {
                    transition: all 0.3s ease-in-out;
                }
                .neon-glow-orange:hover {
                    box-shadow: 0 0 20px rgba(251, 146, 60, 0.6),
                                0 0 40px rgba(251, 146, 60, 0.4),
                                0 0 60px rgba(251, 146, 60, 0.2);
                    transform: translateY(-2px);
                }
                .neon-input {
                    transition: all 0.3s ease-in-out;
                }
                .neon-input:hover {
                    box-shadow: 0 0 15px rgba(255, 255, 255, 0.4),
                                0 0 30px rgba(255, 255, 255, 0.2);
                }
                .neon-input:focus {
                    box-shadow: 0 0 20px rgba(255, 255, 255, 0.6),
                                0 0 40px rgba(255, 255, 255, 0.3);
                }
                .neon-button {
                    transition: all 0.3s ease-in-out;
                }
                .neon-button:hover {
                    box-shadow: 0 0 20px rgba(147, 51, 234, 0.6),
                                0 0 40px rgba(147, 51, 234, 0.4),
                                0 0 60px rgba(147, 51, 234, 0.2);
                    transform: translateY(-2px) scale(1.02);
                }
                `
            }} />
            {/* Cosmic Background */}
            <div
                className="absolute inset-0 w-full h-full"
                style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
                }}
            />

            {/* Mountain Silhouettes */}
            <div className="absolute bottom-0 left-0 w-full">
                <svg viewBox="0 0 1200 300" className="w-full h-32 opacity-30">
                    <polygon fill="#4c1d95" points="0,300 0,200 100,150 200,180 300,120 400,160 500,100 600,140 700,80 800,120 900,60 1000,100 1100,40 1200,80 1200,300"/>
                    <polygon fill="#5b21b6" points="0,300 0,220 150,170 250,200 350,140 450,180 550,120 650,160 750,100 850,140 950,80 1050,120 1150,60 1200,100 1200,300"/>
                </svg>
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto">
                {/* Main Form */}
                <div className="flex flex-col items-center">
                    <h1 className="text-5xl font-bold text-white mb-8 text-center tracking-wider">
                        Career Mapper
                    </h1>

                    <div
                        className="relative p-8 rounded-3xl shadow-2xl backdrop-blur-md border border-white/20 w-full max-w-md neon-glow"
                        style={{
                            background: 'rgba(255, 255, 255, 0.1)',
                            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
                        }}
                    >
                        <div className="space-y-6">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={skills}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSkills(e.target.value)}
                                    placeholder="Your Skills (e.g., python, Data analysis)"
                                    className="w-full px-6 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300 text-lg neon-input"
                                    required
                                />
                                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/70">
                                    👤
                                </div>
                            </div>

                            <div className="relative">
                                <input
                                    type="text"
                                    value={degree}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDegree(e.target.value)}
                                    placeholder="Your Degree (e.g., B.Tech in AI&DS )"
                                    className="w-full px-6 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300 text-lg neon-input"
                                    required
                                />
                                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/70">
                                    🎓
                                </div>
                            </div>

                            <button
                                type="submit"
                                onClick={handleSubmit}
                                className="w-full bg-white text-purple-700 py-4 rounded-2xl font-semibold text-lg hover:bg-white/90 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg neon-button"
                            >
                                Map My Career
                            </button>
                        </div>
                    </div>
                </div>

                {/* Display Error Message */}
                {error && (
                    <div className="mt-8 p-4 bg-red-800 text-white rounded-lg shadow-md text-center">
                        <p>{error}</p>
                    </div>
                )}

                {/* Results Section - only show if there's a response and no error */}
                {response && !error && (
                    <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8 px-4">
                        {/* Qualified Jobs */}
                        <div
                            className="p-6 rounded-3xl shadow-2xl backdrop-blur-md border border-white/20 neon-glow-green"
                            style={{
                                background: 'rgba(34, 197, 94, 0.15)',
                                boxShadow: '0 8px 32px 0 rgba(34, 197, 94, 0.2)'
                            }}
                        >
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                                <span className="mr-3">✅</span>
                                Qualified Jobs
                            </h2>
                            <ul className="space-y-3">
                                {qualifiedJobs.map((job: string, idx: number) => (
                                    <li key={idx} className="text-white/90 text-lg flex items-center">
                                        <div className="w-2 h-2 bg-green-400 rounded-full mr-3 flex-shrink-0"></div>
                                        {job}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Skill Gaps */}
                        <div
                            className="p-6 rounded-3xl shadow-2xl backdrop-blur-md border border-white/20 neon-glow-red"
                            style={{
                                background: 'rgba(239, 68, 68, 0.15)',
                                boxShadow: '0 8px 32px 0 rgba(239, 68, 68, 0.2)'
                            }}
                        >
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                                <span className="mr-3">⚠️</span>
                                Skill Gaps
                            </h2>
                            <ul className="space-y-3">
                                {skillGaps.map((gap: string, idx: number) => (
                                    <li key={idx} className="text-white/90 text-lg flex items-center">
                                        <div className="w-2 h-2 bg-red-400 rounded-full mr-3 flex-shrink-0"></div>
                                        {gap}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Career Roadmaps */}
                        <div
                            className="lg:col-span-2 p-6 rounded-3xl shadow-2xl backdrop-blur-md border border-white/20 neon-glow-orange"
                            style={{
                                background: 'rgba(251, 146, 60, 0.15)',
                                boxShadow: '0 8px 32px 0 rgba(251, 146, 60, 0.2)'
                            }}
                        >
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                                <span className="mr-3">🗺️</span>
                                Career Roadmaps
                            </h2>

                            <div className="grid md:grid-cols-3 gap-6">
                                {/* Beginner Level */}
                                <div className="space-y-4">
                                    <h3 className="text-xl font-semibold text-white flex items-center">
                                        <span className="mr-2">📍</span>
                                        Beginner Level
                                    </h3>
                                    <p className="text-white/70 text-sm">(0-6 months)</p>
                                    <ul className="space-y-3">
                                        {roadmaps.beginner.map((item: string, idx: number) => (
                                            <li key={idx} className="text-white/90 text-sm flex items-start">
                                                <div className="w-2 h-2 bg-orange-300 rounded-full mr-3 flex-shrink-0 mt-2"></div>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Intermediate Level */}
                                <div className="space-y-4">
                                    <h3 className="text-xl font-semibold text-white flex items-center">
                                        <span className="mr-2">📍</span>
                                        Intermediate Level
                                    </h3>
                                    <p className="text-white/70 text-sm">(6-18 months)</p>
                                    <ul className="space-y-3">
                                        {roadmaps.intermediate.map((item: string, idx: number) => (
                                            <li key={idx} className="text-white/90 text-sm flex items-start">
                                                <div className="w-2 h-2 bg-orange-400 rounded-full mr-3 flex-shrink-0 mt-2"></div>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Advanced Level */}
                                <div className="space-y-4">
                                    <h3 className="text-xl font-semibold text-white flex items-center">
                                        <span className="mr-2">📍</span>
                                        Advanced Level
                                    </h3>
                                    <p className="text-white/70 text-sm">(18+ months)</p>
                                    <ul className="space-y-3">
                                        {roadmaps.advanced.map((item: string, idx: number) => (
                                            <li key={idx} className="text-white/90 text-sm flex items-start">
                                                <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 flex-shrink-0 mt-2"></div>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Learning Resources */}
                        <div
                            className="lg:col-span-2 p-6 rounded-3xl shadow-2xl backdrop-blur-md border border-white/20 neon-glow-blue"
                            style={{
                                background: 'rgba(99, 102, 241, 0.15)',
                                boxShadow: '0 8px 32px 0 rgba(99, 102, 241, 0.2)'
                            }}
                        >
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                                <span className="mr-3">📚</span>
                                Learning Resources
                            </h2>

                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                                        <span className="mr-2">🆓</span>
                                        Free Resources
                                    </h3>
                                    <ul className="space-y-3">
                                        {freeResources.map((res: string, idx: number) => (
                                            <li key={idx} className="text-white/90 text-lg flex items-center">
                                                <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 flex-shrink-0"></div>
                                                <span dangerouslySetInnerHTML={{
                                                    __html: res.replace(/\[(.*?)\]\((.*?)\)/g, '$1')
                                                }} />
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                                        <span className="mr-2">💰</span>
                                        Paid Resources
                                    </h3>
                                    <ul className="space-y-3">
                                        {paidResources.map((res: string, idx: number) => (
                                            <li key={idx} className="text-white/90 text-lg flex items-center">
                                                <div className="w-2 h-2 bg-purple-400 rounded-full mr-3 flex-shrink-0"></div>
                                                <span dangerouslySetInnerHTML={{
                                                    __html: res.replace(/\[(.*?)\]\((.*?)\)/g, '$1')
                                                }} />
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Resource Links */}
                        {(freeLinks.length > 0 || paidLinks.length > 0) && (
                            <div
                                className="lg:col-span-2 p-6 rounded-3xl shadow-2xl backdrop-blur-md border border-white/20 neon-glow-purple"
                                style={{
                                    background: 'rgba(168, 85, 247, 0.15)',
                                    boxShadow: '0 8px 32px 0 rgba(168, 85, 247, 0.2)'
                                }}
                            >
                                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                                    <span className="mr-3">🔗</span>
                                    Resource Links
                                </h2>

                                <div className="grid md:grid-cols-2 gap-8">
                                    {freeLinks.length > 0 && (
                                        <div>
                                            <h3 className="text-lg font-semibold text-white mb-4">🆓 Free Links</h3>
                                            <ul className="space-y-2">
                                                {freeLinks.map((link: string, idx: number) => (
                                                    <li key={idx}>
                                                        <a
                                                            href={link}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-blue-300 hover:text-blue-200 underline break-all transition-colors duration-200"
                                                        >
                                                            {link}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {paidLinks.length > 0 && (
                                        <div>
                                            <h3 className="text-lg font-semibold text-white mb-4">💰 Paid Links</h3>
                                            <ul className="space-y-2">
                                                {paidLinks.map((link: string, idx: number) => (
                                                    <li key={idx}>
                                                        <a
                                                            href={link}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-purple-300 hover:text-purple-200 underline break-all transition-colors duration-200"
                                                        >
                                                            {link}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CareerForm;
