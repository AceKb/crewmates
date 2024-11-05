import { Link, useNavigate } from 'react-router-dom';

const CrewmateCard = ({ name, speed, color, id, category }) => {
  const navigate = useNavigate();

  const editItem = () => {
    navigate(`/edit/${id}`, { replace: true });
  };

  const calculateSuccess = (speed) => {
    return speed > 5 ? 'success' : '';
  };

  return (
    <div className={`crewmate-card ${calculateSuccess(speed)}`} id={color}>
      <Link to={`../${id}`} relative="path">
        <img src="src/assets/crewmate.png" alt="crewmate" />
      </Link>
      <p>Name of Crewmate: <span>{name}</span></p>
      <p>Speed of Crewmate: <span>{speed} mph</span></p>
      <p>Color of Crewmate: <span>{color}</span></p>
      <p>Category of Crewmate: <span className="crewmate-category">{category}</span></p> {/* Add a class for styling */}
      <button type="button" onClick={editItem}>Edit Crewmate</button>
    </div>
  );
};

export default CrewmateCard;
