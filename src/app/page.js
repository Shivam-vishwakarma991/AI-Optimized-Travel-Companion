"use client";
import React, { useState } from "react";
import { generateResponse } from "../app/api";

const TripPlanner = () => {
  const [loading, setloading]= useState(false)
  const [responseText, setResponseText] = useState(undefined);
  const [formData, setFormData] = useState({
    Name: "",
    location: "",
    destination: "",
    startDate: "",
    endDate: "",
    numPeople: 1,
    budget: "",
    tripType: "Select Type",
    additionalInfo: "",
  });

  const handleFormSubmit = async (e) => {
    setloading(true)
    e.preventDefault();
    let reqBody = {
      Name: formData.Name,
      location: formData.location,
      destination: formData.destination,
      startDate: formData.startDate,
      endDate: formData.endDate,
      numPeople: formData.numPeople,
      budget: formData.budget,
      tripType: formData.tripType,
      additionalInfo: formData.additionalInfo,
    };
    try {
      const response = await generateResponse(reqBody);
      setResponseText(response.data.response.content);
    } catch (error) {
      console.log(error)
    } finally {
      setloading(false); 
    }
  };

  return (
    <>
      <div className="container1">
        <h1 className="texthead">Your Next Trip Planner</h1>

        <form onSubmit={handleFormSubmit}>
          <label htmlFor="destination">Your Name</label>
          <input
            type="text"
            id="Name"
            name="Name"
            value={formData.Name}
            onChange={(e) => setFormData({ ...formData, Name: e.target.value })}
            required
          />

          <label htmlFor="location">Current location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            required
          />
          <label htmlFor="destination">Where do you want to go?</label>
          <input
            type="text"
            id="destination"
            name="destination"
            value={formData.destination}
            onChange={(e) =>
              setFormData({ ...formData, destination: e.target.value })
            }
            required
          />

          <div className="">
            <div className="date-range row">
              <div className="date-field col-lg-6 col-md-6 col-sm-12">
                <label htmlFor="startDate">From Date : </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={(e) =>
                    setFormData({ ...formData, startDate: e.target.value })
                  }
                  required
                />
              </div>
              <div className="date-field col-lg-6 col-md-6 col-sm-12">
                <label htmlFor="endDate">To Date : </label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={formData.endDate}
                  onChange={(e) =>
                    setFormData({ ...formData, endDate: e.target.value })
                  }
                  required
                />
              </div>
            </div>
          </div>
          <label htmlFor="numPeople">How many people are going?</label>
          <div className="num-people">
            <input
              type="number"
              id="numPeople"
              name="numPeople"
              value={formData.numPeople}
              onChange={(e) =>
                setFormData({ ...formData, numPeople: e.target.value })
              }
              required
            />
            <span
              style={{ cursor: "pointer", margin: "5px" }}
              onClick={() =>
                setFormData({
                  ...formData,
                  numPeople: Math.max(formData.numPeople - 1, 1),
                })
              }
            >
              -
            </span>
            <span
              style={{ cursor: "pointer", margin: "5px" }}
              onClick={() =>
                setFormData({ ...formData, numPeople: formData.numPeople + 1 })
              }
            >
              +
            </span>
          </div>

          <label htmlFor="budget">
            How much do you plan to spend on this trip? (Optional)
          </label>
          <input
            type="number"
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={(e) =>
              setFormData({ ...formData, budget: e.target.value })
            }
          />

          <label htmlFor="tripType">What type of trip is this?</label>
          <select
            className="mt-1"
            id="tripType"
            name="tripType"
            value={formData.tripType}
            onChange={(e) =>
              setFormData({ ...formData, tripType: e.target.value })
            }
          >
            <option value="Select Type">Select Type</option>
            <option value="relaxation">Relaxation</option>
            <option value="adventure">Adventure</option>
            <option value="tourism">Tourism</option>
            <option value="festival">Festival</option>
          </select>

          <label htmlFor="additionalInfo">
            Do you want to tell us something our holiday planner should take
            into account about your trip?
          </label>
          <textarea
            className="mt-1"
            id="additionalInfo"
            name="additionalInfo"
            value={formData.additionalInfo}
            onChange={(e) =>
              setFormData({ ...formData, additionalInfo: e.target.value })
            }
          />

          <button type="submit" className="create-button">
          {loading ? "Loading..." : "Create My Trip"}
          </button>
          <div>
            {responseText && <p className="mt-3">{`${responseText}`}</p>}
          </div>
        </form>
      </div>
    </>
  );
};

export default TripPlanner;
