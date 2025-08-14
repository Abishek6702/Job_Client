import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Check, Plus } from "lucide-react";

// Helper to get userId from token
const getUserIdFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    const decoded = jwtDecode(token);
    return decoded.id || decoded.userId || decoded._id || null;
  } catch {
    return null;
  }
};

export default function FriendSuggestions() {
  const navigate = useNavigate();
  const [allUsers, setAllUsers] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState([]);

  // Fetch all users
  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/all`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setAllUsers(data))
      .catch(() => setAllUsers([]));
  }, []);

  // Fetch current user profile
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      const userId = getUserIdFromToken();
      if (!userId || !token) {
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch profile");
        const data = await res.json();
        setProfile(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // Filter users: employee role, not connected, not current user
  const suggestions = React.useMemo(() => {
    if (!profile || !Array.isArray(allUsers)) return [];
    const connections = profile.connections || [];
    return allUsers.filter(
      (user) =>
        user.role === "employee" && 
        user._id !== profile._id &&
        !connections.includes(user._id)
    );
  }, [allUsers, profile]);

  useEffect(() => {
    setAdded(Array(suggestions.length).fill(false));
  }, [suggestions.length]);

  const handleAdd = (idx) => {
    setAdded((prev) => prev.map((v, i) => (i === idx ? !v : v)));
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow p-4 mb-4 w-[95%]">
        <div className="font-semibold text-gray-800 text-base">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow p-4 mb-4 w-[95%] h-[42vh]">
      <div className="flex justify-between items-center mb-2 ">
        <h2 className="font-semibold text-gray-800 text-base">
          Grow Your Network
        </h2>
        <button
          className="text-sm text-blue-500"
          onClick={() => navigate("/network")}
        >
          See All
        </button>
      </div>
      <ul className=" h-[85%] overflow-auto ">
        {suggestions.map((s, idx) => {
          const profileImg =
            s.onboarding?.profileImage &&
            `${import.meta.env.VITE_API_BASE_URL}/${s.onboarding.profileImage}`;

          const Name =
            s.onboarding?.firstName && s.onboarding?.lastName
              ? `${s.onboarding.firstName} ${s.onboarding.lastName}`
              : s.name || "User";

              const userName = s.onboarding?.firstName?.toLowerCase() || "";


          return (
            <li
              key={s._id}
              className="flex items-center justify-between py-2 px-2 rounded-lg hover:bg-gray-100 transition"
            >
              <div className="flex items-center gap-3">
                {profileImg && (
                  <img
                    src={profileImg}
                    alt={userName}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                )}
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    {Name}
                  </div>
                  <div className="text-xs text-gray-500">@{userName}</div>
                </div>
              </div>
              <button
                onClick={() => handleAdd(idx)}
                className={`w-7 h-7 flex items-center justify-center rounded-full border border-gray-300 bg-white text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition ${
                  added[idx] ? "bg-blue-100 text-blue-600" : ""
                }`}
                aria-label="Add Friend"
              >
                {added[idx] ? <Check /> : <Plus />}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
