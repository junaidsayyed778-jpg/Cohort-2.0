import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setQuery } from '../features/searchSlice'

const SearchBar = () => {
  const [text, setText] = useState("")
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(setQuery(text))
    setText("");
  }

  return (
    <div className="fixed top-0 left-0 w-full bg-gray-900 px-5 py-3 shadow-lg z-50">
      <form
        onSubmit={submitHandler}
        className="flex gap-3 max-w-xl mx-auto"
      >
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Search anything..."
          className="
            flex-1
            px-4 py-2.5
            rounded-md
            bg-gray-700
            text-gray-100
            placeholder-gray-400
            outline-none
            border border-gray-600
            focus:border-gray-400
            focus:ring-2 focus:ring-gray-500
            transition
          "
        />

        <button
          type="submit"
          className="
            px-5 py-2.5
            bg-gray-700
            text-white
            rounded-md
            hover:bg-gray-600
            transition
          "
        >
          Search
        </button>
      </form>
    </div>
  )
}

export default SearchBar

