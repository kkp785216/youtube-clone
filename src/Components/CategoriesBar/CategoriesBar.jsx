import React from 'react'
import { useState } from 'react'
import './_categories_bar.scss'
import { useDispatch, useSelector } from 'react-redux'
import { selectCategory } from '../../Redux/Actions/category.action'
import { useEffect } from 'react'
import { allCategoryAction } from '../../Redux/Actions/allCategory.action'

const CategoriesBar = (props) => {

  const dispatch = useDispatch();
  let {activeCategory} = useSelector(state => state.catgoryState);
  const [activeElement, setActiveElement] = useState(activeCategory.title);
  const handleClick = (value, id) => {
    setActiveElement(value);
    dispatch(selectCategory(value, id));
    window.scrollTo({ top: 0, ScrollBehavior: 'auto' })
  }

  useEffect(()=>{
    setActiveElement(activeCategory.title);
  }, [activeCategory.title]);

  const allCategory = useSelector(state => state.allCategory);
  useEffect(() => {
    !allCategory.loaded && allCategory.allCategory.length === 0 &&  dispatch(allCategoryAction());
  }, [dispatch, allCategory.allCategory.length, allCategory.loaded]);

  return (<>
    <div className={`categoriesBar${props.className ? ' '+props.className:''}`}>
      <div>
        {allCategory.loaded &&
          allCategory.allCategory.map((element, index) => {
            return (
              <span
                key={index}
                onClick={() => { handleClick(element.title, element.id) }}
                className={activeElement === element.title ? 'active' : ''}
                title={element.title}
              >{element.title} </span>
            )
          })
        }
      </div>
    </div>
    <div className="category-manage"></div>
  </>)
}

export default CategoriesBar