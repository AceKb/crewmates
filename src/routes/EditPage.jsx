import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from '../client';

const EditPage = () => {
  const params = useParams();
  const [inputs, setInputs] = useState({
    'name': '',
    'speed': '',
    'color': ''
  });
  const [crewmate, setCrewmate] = useState(null);

  useEffect (() => {
    fetchCrewmate().catch(console.error);
  }, [])

  const fetchCrewmate = async () => {
    const {data} = await supabase
      .from('crewmates')
      .select()
      .eq('id', params.id);

    setCrewmate(data[0]);
  };

  const colors = ['Red', 'Green', 'Blue', 'Purple', 'Yellow', 'Orange', 'Pink', 'Rainbow'];

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  }

  const navigate = useNavigate();

  const updateCrewmate = async (e) => {
    e.preventDefault();

    var inputSpeed = isNaN(parseFloat(inputs["speed"])) ? 0.0 : parseFloat(inputs["speed"])
    var inputColor = inputs["color"] === "" ? "White" : inputs["color"]

    await supabase
      .from('crewmates')
      .update({name: inputs["name"], speed: inputSpeed, color: inputColor})
      .eq('id', params.id);

    setInputs({
      'name': '',
      'speed': '',
      'color': ''
    });

    alert("Crewmate is updated successfully!");

    fetchCrewmate().catch(console.error);
  };

  const deleteCrewmate = async () => {
    await supabase
      .from('crewmates')
      .delete()
      .eq('id', params.id);

    alert("Crewmate is deleted successfully!");
    navigate(`/gallery`, {replace: true});
  };

  return (
    <div className="edit-page">
      <h1>Update Your Crewmate</h1>
      <img src="..\src\assets\crewmates.png" alt="crewmates" />
      <div>
        <h3>Current Crewmate Info:</h3>
        {crewmate &&
          <h4>Name: {crewmate.name}, Speed: {crewmate.speed}, Color: {crewmate.color}</h4>
        }
      </div>
      <form className="form-container">
        <div className="input-container">
          <label htmlFor="name"><h2>Name:</h2></label>
          <input type="text" name="name" id="name" placeholder="Enter crewmate's name" onChange={handleChange} value={inputs["name"]} />
        </div>
        <div className="input-container">
          <label htmlFor="speed"><h2>Speed (mph):</h2></label>
          <input type="text" name="speed" id="speed" placeholder="Enter speed in mph" onChange={handleChange} value={inputs["speed"]} />
        </div>
        <div className="input-container">
          <label><h2>Color:</h2></label>
          {colors &&
            colors.map((color) => (
              <li key={color}>
                <input type="radio"
                  id={color}
                  name="color"
                  value={color}
                  checked={inputs["color"] == color}
                  onChange={handleChange}
                />
                  {color}
              </li>
            ))
          }
        </div>
      </form>
      <button type="submit" onClick={updateCrewmate}>Update Crewmate</button>
      <button className="delete-button" type="button" onClick={deleteCrewmate}>Delete Crewmate</button>
    </div>
  );
};

export default EditPage;