import React, { useEffect, useState } from "react";
import "./Calendar.css";
import MainContainer from "../../components/mainContainer/MainContainer";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchUserEmail, fetchAllPlans } from "../../utils/fetch";
import AddEventMenu from "../../components/addEventMenu/AddEventMenu";

function Calendar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [tokenFound, setTokenFound] = useState(false);
  const [userEmail, setUserEmail] = useState();
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(undefined);
  const [allPlans, setAllPlans] = useState(undefined);

  useEffect(() => {
    const getUserEmail = async () => {
      const email = await fetchUserEmail();
      setUserEmail(email);
    };

    getUserEmail();
  }, []);

  useEffect(() => {
    const getPlans = async () => {
      if (!userEmail) return;

      const plans = await fetchAllPlans(userEmail);
      setAllPlans(plans);
    };

    getPlans();
  }, [userEmail]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");

    if (token) {
      localStorage.setItem("token", token);
      setTokenFound(true);
    } else {
      console.error("No token found in the URL");
      setTokenFound(false);
      navigate("/");
    }
  }, [location, navigate]);

  if (!tokenFound || !userEmail) {
    return <div>Loading...</div>;
  }

  return (
    <div className="main-page">
      <MainContainer
        setIsAddEventOpen={setIsAddEventOpen}
        setSelectedDate={setSelectedDate}
        allPlans={allPlans}
      />

      <AddEventMenu
        isAddEventOpen={isAddEventOpen}
        setIsAddEventOpen={setIsAddEventOpen}
        selectedDate={selectedDate}
        userEmail={userEmail}
        setAllPlans={setAllPlans}
        allPlans={allPlans}
      />
    </div>
  );
}

export default Calendar;
