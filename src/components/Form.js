import React, { useState } from "react";

const Form = props => {
  const [query, setQuery] = useState("");

  const handleChange = e => {
    setQuery(e.target.value);
  };

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        setQuery("");
        props.onSubmit();
      }}
    >
      <input type="text" name="query" value={query} onChange={handleChange} />
      <button>Search</button>
    </form>
  );
};

export default Form;
