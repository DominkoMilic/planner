import React, { useState } from "react";
import "./DisplayEvents.css";
import { findPlanForDate } from "../../../utils/calendarFunctions";
import { Trash, Edit, Save, X } from "lucide-react";
import { fetchDeletePlan, postNewPlanName } from "../../../utils/fetch";

function EventsByDate({ userEmail, setAllPlans, allPlans, selectedDate }) {
  const [isEditPlanVisible, setIsEditPlanVisible] = useState(false);
  const [newPlanName, setNewPlanName] = useState("My event");
  const [editableEvent, setEditableEvent] = useState(null);

  const date = new Date(selectedDate);
  date.setDate(selectedDate.getDate() + 1);
  const plansForDay = findPlanForDate(allPlans, date);

  const handleDeletePlanClick = async (plan) => {
    await fetchDeletePlan(userEmail, plan.id, setAllPlans);
    setEditableEvent(null);
  };

  const handleEditPlanClick = async (plan, idx) => {
    setNewPlanName(plan.text);
    setIsEditPlanVisible(true);
    setEditableEvent(idx);
  };

  const handleChange = (e) => {
    setNewPlanName(e.target.value);
  };

  const handleSaveChangeClick = async (plan) => {
    await postNewPlanName(userEmail, plan.id, newPlanName, setAllPlans);
    setIsEditPlanVisible(false);
    setEditableEvent(null);
  };

  const handleCancelChangeClick = () => {
    setIsEditPlanVisible(false);
    setEditableEvent(null);
  };

  return (
    <>
      {plansForDay.length > 0
        ? plansForDay.map((plan, idx) => (
            <div key={idx}>
              <div className="single-event">
                <div className="color-text">
                  <div
                    className="event-color"
                    style={{ backgroundColor: plan.color }}
                  ></div>
                  {isEditPlanVisible && idx === editableEvent ? (
                    <input
                      className="change-title-input"
                      type="text"
                      value={newPlanName}
                      onChange={handleChange}
                    ></input>
                  ) : (
                    plan.text
                  )}
                </div>
                <div className="icon-container">
                  {isEditPlanVisible && idx === editableEvent ? (
                    <>
                      <Save
                        className="save-icon"
                        size={"32px"}
                        onClick={() => handleSaveChangeClick(plan)}
                      />
                      <X
                        className="cancel-icon"
                        size={"32px"}
                        onClick={() => handleCancelChangeClick()}
                      />
                    </>
                  ) : (
                    <>
                      <Edit
                        className="edit-icon"
                        size={"32px"}
                        onClick={() => handleEditPlanClick(plan, idx)}
                      />
                      <Trash
                        className="trash-icon"
                        size={"32px"}
                        onClick={() => handleDeletePlanClick(plan)}
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        : ""}
    </>
  );
}

export default EventsByDate;
