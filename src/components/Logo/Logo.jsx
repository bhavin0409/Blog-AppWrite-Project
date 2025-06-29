import React from 'react'
import animeBlog from "../../../public/anime-blog.png"

const Logo = ({width ='100px'}) => {
  return (
    <div style={{width} } >
      <img src={animeBlog}  alt="Anime-Blog" />
    </div>
  )
}

export default Logo