import React, { useState } from "react";
import SuggestionCard from "../components/SuggestionCard";

const suggestions = [
  {
    logo: "https://logo.clearbit.com/adobe.com",
    title: "Amigoways Technologies Pvt Ltd",
    category: "Software Development",
    followers: 7664,
    connections: [
      { name: "Alice", avatar: "https://randomuser.me/api/portraits/men/1.jpg" },
      { name: "Bob", avatar: "https://randomuser.me/api/portraits/women/2.jpg" },
      { name: "Charlie", avatar: "https://randomuser.me/api/portraits/men/3.jpg" },
    ],
  },
  {
    logo: "https://logo.clearbit.com/adobe.com",
    title: "TechCorp Solutions",
    category: "Cloud Computing",
    followers: 4821,
    connections: [
      { name: "Dave", avatar: "https://randomuser.me/api/portraits/women/4.jpg" },
      { name: "Eva", avatar: "https://randomuser.me/api/portraits/men/5.jpg" },
    ],
  },
  {
    logo: "https://logo.clearbit.com/netflix.com",
    title: "Netflix Engineering",
    category: "Media & Entertainment",
    followers: 12987,
    connections: [
      { name: "Frank", avatar: "https://randomuser.me/api/portraits/men/6.jpg" },
    ],
  },
];

function SuggestedGroups() {
  const [showAll, setShowAll] = useState(false);

  const handleFollow = (title) => {
    alert(`Followed ${title}`);
  };

  const visibleSuggestions = showAll ? suggestions : suggestions.slice(0, 2);

  return (
    <div className="bg-white rounded-xl shadow ml-9  p-4 mx-auto max-h-[60vh] overflow-hidden">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold mb-4">Suggested Groups</h2>
        <button
          className="text-sm text-blue-500 mb-3 mr-2"
          onClick={() => setShowAll((prev) => !prev)}
        >
          {showAll ? "See Less" : "See All"}
        </button>
      </div>

      <div className="overflow-y-auto pr-2 scrollbar-hide max-h-[calc(60vh-50px)]">
        {visibleSuggestions.map((s, idx) => (
          <SuggestionCard
            key={idx}
            {...s}
            onFollow={() => handleFollow(s.title)}
          />
        ))}
      </div>
    </div>
  );
}

export default SuggestedGroups;
