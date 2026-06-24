import React from 'react'

const Card = ({Icon,title,desc,lastOne}) => {
  return (
    <div className='w-[20vw] mycards h-[25vh] bg-[#FFF1E9] rounded-3xl shadow-xl flex items-center gap-6 p-5'>
        <div className="w-20 h-20 rounded-full flex items-center justify-center  bg-[#F6E5DC]">
           {Icon &&  <Icon color="red" className={"w-9 h-auto"} />}
        </div>
        <div className="w-fit">
            <h1 className={`${lastOne === true ? 'font-[900]' : ""} fontTri text-7xl text-[#333333]`}>{title}</h1>
            <p className='montsterat text-[.7rem] font-[500]'>{desc}</p>
            <div className="w-[30%] h-[.8vh] mt-2 bg-red-500"></div>
        </div>
    </div>
  )
}

export default Card