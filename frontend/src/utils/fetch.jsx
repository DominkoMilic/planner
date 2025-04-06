const fetchUserEmail = async () => {
  try {
    const response = await fetch(`http://localhost:5000/api/auth/user`, {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("User not authenticated");
    }

    const data = await response.json();
    return data.email;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const postNewPlan = async (
  selectedColor,
  planTitle,
  selectedDate,
  userEmail
) => {
  try {
    if (!selectedColor || !planTitle || !selectedDate) {
      alert("Please select a color and plan type.");
      return;
    }

    const token = localStorage.getItem("token");
    const email = userEmail;

    const response = await fetch("http://localhost:5000/api/newPlan/addPlan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        email,
        color: selectedColor,
        planText: planTitle,
        date: selectedDate,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to add plan");
    }

    alert("Plan created successfully");
    return data;
  } catch (error) {
    alert("Error occured during creating plan :(");
    console.error("Error creating plan type:", error);
  }
};

const fetchAllPlans = async (email) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `http://localhost:5000/api/plans/findPlans?email=${email}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("User not authenticated");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const fetchDeletePlan = async (email, planId, setAllPlans) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `http://localhost:5000/api/delete/deletePlan?email=${email}&planId=${planId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("User not authenticated");
    }

    setAllPlans((prevPlans) => prevPlans.filter((plan) => plan._id !== planId));
    alert("Plan deleted successfully");
  } catch (error) {
    console.error("Error deleting plan ", error);
    return null;
  }
};

const postNewPlanName = async (userEmail, planId, planNewText, setAllPlans) => {
  try {
    if (!planId || !planNewText || !userEmail) {
      alert("Missing dependencies.");
      return;
    }

    const token = localStorage.getItem("token");
    const email = userEmail;

    const response = await fetch("http://localhost:5000/api/edit/editPlan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        email,
        planText: planNewText,
        planId,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to edit plan");
    }

    alert("Plan edited successfully");

    setAllPlans((prevPlans) =>
      prevPlans.map((plan) =>
        plan._id === planId ? { ...plan, text: planNewText } : plan
      )
    );
  } catch (error) {
    alert("Error occured during editing plan :(");
    console.error("Error editing plan:", error);
  }
};

export {
  fetchUserEmail,
  postNewPlan,
  fetchAllPlans,
  fetchDeletePlan,
  postNewPlanName,
};
