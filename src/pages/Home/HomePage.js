import React, { useEffect } from 'react'
import Thumbnails from '../../components/Thumbnails/Thumbnails';
import { useReducer } from 'react';
import { getAll,getAllTags,getAllByTag } from '../../services/foodService';
import { useParams } from 'react-router-dom';
import { search } from '../../services/foodService';
import Search from '../../components/Search/Search';
import Tags from '../../components/Tags/Tags';



const initialState = { foods: [], tags: [] };


const reducer = (state, action) => {
    switch (action.type) {
      case 'FOODS_LOADED':
        return { ...state, foods: action.payload };
      case 'TAGS_LOADED':
        return { ...state, tags: action.payload };
      default:
        return state;
    }
  };
export default function HomePage() {

    

      const [state, dispatch] = useReducer(reducer, initialState);
  const { foods,tags} = state
  const { searchTerm,tag } = useParams();

  useEffect(() => {
    getAllTags().then(tags => dispatch({ type: 'TAGS_LOADED', payload: tags }));

    const loadFoods = tag
      ? getAllByTag(tag)
      : searchTerm
      ? search(searchTerm)
      : getAll();

    loadFoods.then(foods => dispatch({ type: 'FOODS_LOADED', payload: foods }));
  }, [searchTerm, tag]);


  return (
<>
    <Tags tags={tags} />
    <Search />
  
  <Thumbnails foods={foods}/>

  </>
    
  )
}