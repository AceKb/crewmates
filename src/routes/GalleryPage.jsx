import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../client";
import CrewmateCard from "../components/CrewmateCard";

const GalleryPage = () => {
  const [crewmates, setCrewmates] = useState([]);
  const [statistics, setStatistics] = useState({
    total: 0,
    averageSpeed: 0,
    categoryCounts: {},
  });

  useEffect(() => {
    fetchCrewmates().catch(console.error);
  }, []);

  const fetchCrewmates = async () => {
    const { data } = await supabase
      .from('crewmates')
      .select()
      .order('created_at', { ascending: true });

    setCrewmates(data);
    calculateStatistics(data); // Calculate statistics after fetching data
  };

  const calculateStatistics = (crewmates) => {
    const total = crewmates.length;
    const averageSpeed = total > 0 
      ? (crewmates.reduce((acc, crewmate) => acc + crewmate.speed, 0) / total).toFixed(2) 
      : 0;

    const categoryCounts = {};
    crewmates.forEach((crewmate) => {
      if (categoryCounts[crewmate.category]) {
        categoryCounts[crewmate.category]++;
      } else {
        categoryCounts[crewmate.category] = 1;
      }
    });

    setStatistics({
      total,
      averageSpeed,
      categoryCounts,
    });
  };

  return (
    <div className="gallery-page">
      <h1>Your Crewmate Gallery!</h1>
      
      {/* Statistics Section */}
      <div className="statistics">
        <h2>Statistics</h2>
        <p>Total Crewmates: {statistics.total}</p>
        <p>Average Speed: {statistics.averageSpeed} mph</p>
        <h3>Category Counts:</h3>
        <ul>
          {Object.entries(statistics.categoryCounts).map(([category, count]) => (
            <li key={category}>
              {category}: {count}
            </li>
          ))}
        </ul>
      </div>

      <div>
        {crewmates && crewmates.length > 0 ? (
          <div className="crewmates-container">
            {crewmates.map((item) => (
              <CrewmateCard 
                key={item.id}
                name={item.name}
                speed={item.speed}
                color={item.color}
                id={item.id}
                category={item.category} // Ensure category is passed here
              />
            ))}
          </div>
        ) : (
          <div className="empty-container">
            <h3>You haven't made a crewmate yet!</h3>
            <Link to="/create">Create one here!</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryPage;
