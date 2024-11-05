import { useState } from "react";
import { supabase } from "../client";

const CreatePage = () => {
  const [inputs, setInputs] = useState({
    'name': '',
    'speed': '',
    'color': '',
    'category': '' // New category field
  });

  const colors = ['Red', 'Green', 'Blue', 'Purple', 'Yellow', 'Orange', 'Pink', 'Rainbow'];
  const categories = ['Explorer', 'Engineer', 'Scientist']; // Define your categories here

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  };

  const createCrewmate = async (e) => {
    e.preventDefault();

    var inputSpeed = isNaN(parseFloat(inputs["speed"])) ? 0.0 : parseFloat(inputs["speed"]);
    var inputColor = inputs["color"] === "" ? "White" : inputs["color"];

    await supabase
      .from('crewmates')
      .insert({
        name: inputs["name"], 
        speed: inputSpeed, 
        color: inputColor,
        category: inputs["category"] // Save category to database
      });

    setInputs({
      'name': '',
      'speed': '',
      'color': '',
      'category': ''
    });

    alert("Crewmate is created successfully!");
  };

  return (
    <div className="create-page">
      <h1>Create a New Crewmate</h1>
      <img src="src\assets\crewmates.png" alt="crewmates" />
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
          {colors.map((color) => (
            <li key={color}>
              <input type="radio"
                id={color}
                name="color"
                value={color}
                checked={inputs["color"] === color}
                onChange={handleChange}
              />
              {color}
            </li>
          ))}
        </div>
        <div className="input-container">
          <label><h2>Category:</h2></label>
          <select name="category" onChange={handleChange} value={inputs["category"]}>
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </form>
      <button type="submit" onClick={createCrewmate}>Create Crewmate</button>
    </div>
  );
};

export default CreatePage;
