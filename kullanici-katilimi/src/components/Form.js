import React, { useState } from "react";
import axios from "axios";
import * as yup from "yup";

const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  terms: yup.bool().oneOf([true], "Lütfen kullanım koşullarını kabul edin"),
});

function Form() {
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    terms: false,
  });

  const [errors, setErrors] = useState({});

  const [users, setUsers] = useState([]);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const fieldValue = type === "checkbox" ? checked : value;
    setFormState((prevState) => ({ ...prevState, [name]: fieldValue }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    schema
      .validate(formState, { abortEarly: false })
      .then(() => {
        setErrors({});
        axios.post("https://reqres.in/api/users", formState).then((response) => {
          console.log(response.data);
          setUsers((prevState) => [...prevState, response.data]);
        });
      })
      .catch((err) => {
        const newErrors = {};
        err.inner.forEach((validationError) => {
          newErrors[validationError.path] = validationError.message;
        });
        setErrors(newErrors);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formState.firstName}
            onChange={handleInputChange}
          />
          {errors.firstName && <div className="error">{errors.firstName}</div>}
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formState.lastName}
            onChange={handleInputChange}
          />
          {errors.lastName && <div className="error">{errors.lastName}</div>}
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formState.email}
            onChange={handleInputChange}
          />
          {errors.email && <div className="error">{errors.email}</div>}
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formState.password}
            onChange={handleInputChange}
          />
          {errors.password && <div className="error">{errors.password}</div>}
        </div>
        <div>
          <label htmlFor="terms">Terms of Service:</label>
          <input
            type="checkbox"
            id="terms"
            name="terms"
            checked={formState.terms}
            onChange={handleInputChange}
          />
          {errors.terms && <div className="error">{errors.terms}</div>}
        </div>
        <button type="submit">Sign Up</button>
        </form>
      <div>
        {users.map((user, index) => (
          <pre key={index}>{JSON.stringify(user, null, 2)}</pre>
        ))}
      </div>
    </div>
  );
};

export default Form;