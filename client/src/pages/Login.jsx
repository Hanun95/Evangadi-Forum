import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../axiosConfig";

export default function Login() {
  const [inputs, setInputs] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!inputs?.email || !inputs?.password) {
      return console.log("Please fill all fields");
    }

    try {
      const { data, status } = await axios.post("/users/login", inputs);
      if (status === 200) {
        localStorage.setItem("token", data.token);
        navigate("/");
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <section>
      <form onSubmit={handleSubmit} className="">
        <div>
          <span className="">Email</span>
          <input
            name="email"
            type="text"
            placeholder="email"
            onChange={handleChange}
            className=""
          />
        </div>
        <br />
        <div>
          <span className="">Password</span>
          <input
            name="password"
            type="password"
            placeholder="password"
            onChange={handleChange}
            className=""
          />
        </div>

        <button type="submit" className="">
          Login
        </button>
      </form>

      <Link to="/register">Register</Link>
    </section>
  );
}
