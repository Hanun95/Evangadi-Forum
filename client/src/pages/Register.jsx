import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../axiosConfig";

export default function Register() {
  const [inputs, setInputs] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !inputs?.username ||
      !inputs?.firstname ||
      !inputs?.lastname ||
      !inputs?.email ||
      !inputs?.password
    ) {
      return console.log("Please fill all fields");
    }

    try {
      const res = await axios.post("/users/register", inputs);

      if (res.status === 201) {
        navigate("/login");
      }
      console.log(res.data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  console.log(inputs);

  return (
    <section className="">
      <form onSubmit={handleSubmit} className="">
        <div>
          <span className="">Username</span>
          <input
            onChange={handleChange}
            name="username"
            type="text"
            placeholder="username"
            className=""
          />
        </div>
        <br />
        <div>
          <span className="">First name</span>
          <input
            onChange={handleChange}
            name="firstname"
            type="text"
            placeholder="first name"
            className=""
          />
        </div>
        <br />
        <div>
          <span className="">Last name</span>
          <input
            onChange={handleChange}
            name="lastname"
            type="text"
            placeholder="last name"
            className=""
          />
        </div>
        <br />
        <div>
          <span className="">Email</span>
          <input
            onChange={handleChange}
            name="email"
            type="email"
            placeholder="email"
            className=""
          />
        </div>
        <br />
        <div>
          <span className="">password</span>
          <input
            onChange={handleChange}
            name="password"
            type="password"
            placeholder="password"
            className=""
          />
        </div>

        <button type="submit" className="">
          Register
        </button>
      </form>

      <Link to="/login">Login</Link>
    </section>
  );
}
