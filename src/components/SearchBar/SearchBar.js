import React, { useState } from "react";
import styles from "./styles.module.css"; // Import css modules stylesheet as styles
import Img from "../ImgWithContainer/Img";
import { useHistory } from "react-router-dom";
import search from "../../assets/img/img/search.png";

const SearchBar = (props) => {
  const [searchKey, setSearchKey] = useState("");

  const history = useHistory();

  const handleSearch = (e) => {
    e.preventDefault();
    if (e.target.value === "") {
      return;
    } else {
      history.push({
        pathname: "/search",
        search: `keyword=${searchKey}`,
        searchKey,
      });
    }
  };

  return (
    <div className={styles.searchContainer}>
      <input
        placeholder="Search..."
        className={styles.searchInput}
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            handleSearch(event);
          }
        }}
        onChange={(e) => setSearchKey(e.target.value)}
      />
      <Img
        source={search}
        containerStyle={styles.search}
        imgStyle={styles.img}
      />
    </div>
  );
};

// SearchBar.propTypes = {
//   // Either a function
//   refProp: PropTypes.oneOfType([
//     // Either a function
//     PropTypes.func,
//     // Or the instance of a DOM native element (see the note about SSR)
//     PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
//   ]),
//   onKeyPress: PropTypes.func,
// };

export default SearchBar;
