import { useEffect, useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";

const serverUrl = process.env.REACT_APP_SERVER_URL || "http://localhost:3001";

export const SavedBooks = () => {
  const [savedBooks, setSavedBooks] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchSavedBook = async () => {
      try {
        const response = await axios.get(
          `${serverUrl}/books/savedBooks/${userID}`
        );
        setSavedBooks(response.data.savedBooks);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSavedBook();
  }, []);

  return (
    <div className="homeback">
      {""}
      <h1 className="homeh1">Saved Books</h1>
      <ul className="booklist">
        {savedBooks &&
          savedBooks.map((book) => (
            <li key={book._id} className="book">
              <img src={book.imgurl} alt={book.name} />
              <h2>
                <h2>{book.name}</h2>
              </h2>
              <h4>
                <h2>Author: {book.author}</h2>
              </h4>
              <h4>
                <h2>Copies: {book.N0_copies}</h2>
              </h4>
              <span className="isbn">
                <h2>ISBN: {book.isbn}</h2>
              </span>
            </li>
          ))}
      </ul>
    </div>
  );
};
