import React from 'react'

const BannerLine = ({mLeft, mRight}) => {
  return (
    <div
    style={{
        width: "257px",
        height: "10px",
        background:
            "linear-gradient(90deg, #D8EA9A 0%, #AFE5CA 25.5%, #FBB8B8 62.5%, #FFFFFF 87.5%)",
        marginLeft: mLeft, 
        marginRight: mRight,
    }}
    >
  </div>
  )
}

export default BannerLine
