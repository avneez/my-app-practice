import React from 'react'
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";

const StarRating = ({stars=3.5, reviews=54}) => {

    const ratingStar = Array.from({length:5}, (elem, index) => {
        let number = index + 0.5;
        return (
            <span key={index} >
                {stars >= index + 1 ? (
                    <FaStar style={{fontSize: '2rem'}} />
                ) : stars >= number ? (
                    <FaStarHalfAlt style={{fontSize: '2rem'}} />
                ) : (
                    <AiOutlineStar style={{fontSize: '2.5rem'}} />
                )}
            </span>
        )
    })

  return (
    <div>
        <div style={{display:'flex', flexDirection: 'row', gap: '0.2rem', justifyContent: 'flex-start', alignItems: 'center'}}>
           {ratingStar} 
            <p style={{margin: 0, paddingLeft: '1.2rem'}}><b>{reviews}</b> Customer Reviews</p>
        </div>
    </div>
  )
}

export default StarRating