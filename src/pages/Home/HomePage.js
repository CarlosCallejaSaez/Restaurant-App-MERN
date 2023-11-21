import React, { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import Search from "../../components/Search/Search";
import Tags from "../../components/Tags/Tags";
import Thumbnails from "../../components/Thumbnails/Thumbnails";
import {
  getAll,
  getAllByTag,
  getAllTags,
  search,
} from "../../services/foodService";
import NotFound from "../../components/NotFound/NotFound";
import { useState } from "react";
import axios from "axios";

const initialState = { foods: [], tags: [] };

const reducer = (state, action) => {
  switch (action.type) {
    case "FOODS_LOADED":
      return { ...state, foods: action.payload };
    case "TAGS_LOADED":
      return { ...state, tags: action.payload };
    default:
      return state;
  }
};

export default function HomePage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { foods, tags } = state;
  const { searchTerm, tag } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios.get("/");

        setLoading(false);
      } catch (error) {
        console.error("Error", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    getAllTags().then((tags) =>
      dispatch({ type: "TAGS_LOADED", payload: tags })
    );

    const loadFoods = tag
      ? getAllByTag(tag)
      : searchTerm
      ? search(searchTerm)
      : getAll();

    loadFoods.then((foods) =>
      dispatch({ type: "FOODS_LOADED", payload: foods })
    );
  }, [searchTerm, tag]);

  return (
    <>
      <Search />
      <Tags tags={tags} />
      {loading && (
        <p>
          {" "}
          ⌛⌛⌛ Loading our delicatessens ... it may take around a minute due
          to the response from the backend free tier(render.com)
        </p>
      )}
      {foods.length === 0 && <NotFound linkText="Reset Search" />}
      <Thumbnails foods={foods} />
    </>
  );
}
