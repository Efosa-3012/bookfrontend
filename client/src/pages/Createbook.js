import { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const serverUrl = process.env.REACT_APP_SERVER_URL || "http://localhost:3001";

export const CreateBook = () => {
  const userID = useGetUserID();
  const [cookies, _] = useCookies(["access_token"]);
  const [book, setBook] = useState({
    isbn: "",
    name: "",
    author: "",
    N0_copies: 0,
    imgurl: "",
    userOwner: userID,
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBook({ ...book, [name]: value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`${serverUrl}/books`, book, {
        headers: { authorization: cookies.access_token },
      });
      alert("Book Created Successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="ndiv">
      <div className="create-book">
        <h2>CreateBook</h2>
        <form onSubmit={onSubmit}>
          <label htmlFor="isbn">ISBN</label>
          <input type="text" id="isbn" name="isbn" onChange={handleChange} />

          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" onChange={handleChange} />

          <label htmlFor="author">Author</label>
          <input
            type="text"
            name="author"
            id="author"
            onChange={handleChange}
          />

          <label htmlFor="N0_copies">Number of Copies</label>
          <input
            type="number"
            name="N0_copies"
            id="N0_copies"
            onChange={handleChange}
          />

          <label htmlFor="imgurl">Image URL</label>
          <input
            type="text"
            name="imgurl"
            id="imgurl"
            onChange={handleChange}
          />
          <button type="submit">Create Book</button>
        </form>
      </div>
    </div>
  );
};
