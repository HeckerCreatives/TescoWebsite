import React from 'react'
import Typography from '@mui/material/Typography';

import './cardwithimage.css'
const CardWithImage = ({imagePath,totalNumber,labelCard}) => {
  return (
    <div className='card-item-container'>
                <div className='card-item-main'>
                    <div className='image-div'>
                        <figure>
                            <img src={imagePath} alt='' className='image-card'/>
                        </figure>

                    </div>
                    <div className='number-container'>
                        <Typography style={{fontSize:"3em",color:"grey",paddingRight:"0.3em"}} className="typography-number">{totalNumber}</Typography>

                    </div>

                </div>
               
                    <Typography padding={2} color="grey">{labelCard}</Typography>

                

            </div>
  )
}

export default CardWithImage