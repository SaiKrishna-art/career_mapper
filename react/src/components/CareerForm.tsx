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

    const parseResponse = (response: string) => {
    const sections = {
        qualifiedJobs: [] as string[],
        skillGaps: [] as string[],
        freeResources: [] as string[],
        paidResources: [] as string[],
        freeLinks: [] as string[],
        paidLinks: [] as string[]
    };

    const lines = response.split("\n").map(line => line.trim());
    let currentSection = "";
    let isFree = true;

    for (const line of lines) {
        if (line.startsWith("✅")) currentSection = "qualifiedJobs";
        else if (line.startsWith("⚠️")) currentSection = "skillGaps";
        else if (line.startsWith("📚")) currentSection = "learningResources";
        else if (line.toLowerCase().includes("free resources")) isFree = true;
        else if (line.toLowerCase().includes("paid resources")) isFree = false;
        else if (line.startsWith("- [") && currentSection === "learningResources") {
            const match = line.match(/\[(.*?)\]\((https?:\/\/[^\s)]+)\)/);
            if (match) {
                if (isFree) {
                    sections.freeResources.push(line);
                    sections.freeLinks.push(match[2]);
                } else {
                    sections.paidResources.push(line);
                    sections.paidLinks.push(match[2]);
                }
            }
        } else if (line.startsWith("-")) {
            if (currentSection === "qualifiedJobs") sections.qualifiedJobs.push(line.slice(1).trim());
            else if (currentSection === "skillGaps") sections.skillGaps.push(line.slice(1).trim());
        }
    }

    return sections;
};

   const { qualifiedJobs, skillGaps, freeResources, paidResources, freeLinks, paidLinks } = parseResponse(response);



    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-6 flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold text-indigo-700 mb-6 drop-shadow-md">🎯 SkillPilot: Career Mapper</h1>
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-lg space-y-4 glow-on-hover"
                style={{ '--glow-color': '#a78bfa' }}
            >
                <div>
                    <label className="block text-lg font-semibold mb-1 text-gray-700">Your Skills</label>
                    <input
                        type="text"
                        value={skills}
                        onChange={(e) => setSkills(e.target.value)}
                        placeholder="e.g., Python, Data Analysis"
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 glow-on-hover"
                        style={{ '--glow-color': '#6366f1' }}
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
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 glow-on-hover"
                        style={{ '--glow-color': '#6366f1' }}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 rounded-xl
                               hover:bg-indigo-700
                               transition-all duration-300 ease-in-out
                               transform hover:scale-105
                               active:scale-95 glow-on-hover"
                    style={{ '--glow-color': '#4f46e5' }}
                >
                    🔍 Map My Career
                </button>
            </form>

            {response && (
  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl">

    {/* Qualified Jobs */}
    <div className="bg-green-50 rounded-2xl p-6 shadow-xl glow-on-hover" style={{ '--glow-color': '#22c55e' }}>
      <h2 className="text-2xl font-bold text-green-700 mb-4">✅ Qualified Jobs</h2>
      <ul className="list-disc list-inside text-lg text-gray-800 space-y-2">
        {qualifiedJobs.map((job, idx) => <li key={idx}>{job}</li>)}
      </ul>
    </div>

    {/* Skill Gaps */}
    <div className="bg-red-50 rounded-2xl p-6 shadow-xl glow-on-hover" style={{ '--glow-color': '#ef4444' }}>
      <h2 className="text-2xl font-bold text-red-600 mb-4">⚠️ Skill Gaps</h2>
      <ul className="list-disc list-inside text-lg text-gray-800 space-y-2">
        {skillGaps.map((gap, idx) => <li key={idx}>{gap}</li>)}
      </ul>
    </div>

    {/* Learning Resources */}
    <div className="bg-indigo-50 rounded-2xl p-6 shadow-xl col-span-1 md:col-span-2 glow-on-hover" style={{ '--glow-color': '#6366f1' }}>
      <h2 className="text-2xl font-bold text-indigo-700 mb-4">📚 Learning Resources</h2>

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-indigo-800 mb-2">🆓 Free Resources</h3>
        <ul className="list-disc list-inside text-lg text-gray-800 space-y-2">
          {freeResources.map((res, idx) => (
            <li
              key={idx}
              dangerouslySetInnerHTML={{
                __html: res.replace(/\[(.*?)\]\((.*?)\)/g, '<a class="text-blue-600 underline" href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
              }}
            />
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-indigo-800 mb-2">💰 Paid Resources</h3>
        <ul className="list-disc list-inside text-lg text-gray-800 space-y-2">
          {paidResources.map((res, idx) => (
            <li
              key={idx}
              dangerouslySetInnerHTML={{
                __html: res.replace(/\[(.*?)\]\((.*?)\)/g, '<a class="text-blue-600 underline" href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
              }}
            />
          ))}
        </ul>
      </div>
    </div>

    {/* All Resource Links */}
    <div className="bg-purple-50 rounded-2xl p-6 shadow-xl col-span-1 md:col-span-2 glow-on-hover" style={{ '--glow-color': '#a78bfa' }}>
      <h2 className="text-2xl font-bold text-purple-800 mb-4">🔗 All Resource Links</h2>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-purple-700 mb-2">🆓 Free Resource Links</h3>
        <ul className="list-disc list-inside text-lg text-blue-700 space-y-2">
          {freeLinks.map((link, idx) => (
            <li key={idx}>
              <a href={link} target="_blank" rel="noopener noreferrer" className="underline">{link}</a>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-purple-700 mb-2">💰 Paid Resource Links</h3>
        <ul className="list-disc list-inside text-lg text-blue-700 space-y-2">
          {paidLinks.map((link, idx) => (
            <li key={idx}>
              <a href={link} target="_blank" rel="noopener noreferrer" className="underline">{link}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
)}


        </div>
    );
};

export default CareerForm;
