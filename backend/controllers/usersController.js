import { supabase } from "../connections/supabase.js";

// Access all the users
export const getUsers = async (req, res) => {
  try {
    const { data, error } = await supabase.from("users").select("*");

    if (error) throw error;

    console.log(data);
    res.status(200).json({ users: data });
  } catch (error) {
    console.error("Error fetching users", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

export const postALogin = (req, res) => {
  const { email, password } = req.body;

  console.log("Email:", email);
  console.log("Password:", password);

  res.send("Login request received");
};
