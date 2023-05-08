import { useEffect, useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useCookies } from "react-cookie";

const serverUrl = process.env.REACT_APP_SERVER_URL || "http://localhost:3001";

export const Home = () => {
  const [books, setBooks] = useState([]);
  const [savedBooks, setSaveBooks] = useState([]);
  const [cookies, _] = useCookies(["access_token"]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`${serverUrl}/books`);
        setBooks(response.data);
        //console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSavedBook = async () => {
      try {
        const response = await axios.get(
          `${serverUrl}/books/savedBooks/ids/${userID}`
        );
        setSaveBooks(response.data.savedBooks);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBook();
    fetchSavedBook();
  }, [userID]);

  const saveBook = async (bookID) => {
    try {
      const response = await axios.put(
        `${serverUrl}/books`,
        {
          bookID,
          userID,
        },
        { headers: { authorization: cookies.access_token } }
      );
      setSaveBooks(response.data.savedBooks);
      //console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const isBookSaved = (bookID) => savedBooks && savedBooks.includes(bookID);

  return (
    <div className="homeback">
      {""}
      <h1 className="homeh1">Available Books</h1>
      <ul className="booklist">
        {books.map((book) => (
          <li key={book._id} className="book">
            <img src={book.imgurl} alt={book.name} />
            <h2>
              <h2>{book.name}</h2>
              <button
                onClick={() => saveBook(book._id)}
                disabled={isBookSaved(book._id)}
              >
                {isBookSaved(book._id) ? "Book Borrowed" : "Borrow Book"}
              </button>
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
