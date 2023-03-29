import React from 'react'
import { useNavigate } from 'react-router-dom'
import { loader } from '../assets'
import FunCard from './FunCard'

const CampaignList = ({title, isLoading, campaigns})=>{
    const navigate = useNavigate()

    const handleNavigate = (item)=>{
        navigate(`/campaign-details/${item.title}`,{state:item})
    }

    return (
        <div>
            <h1 className='text-white font-epilogue font-semibold text-[18px] text-left'>{title} ({campaigns.length})</h1>
            <div className='flex flex-wrap mt-[20px] gap-[26px]'>
                {isLoading && (
                    <img src={loader} alt='loader' className='w-[100px] h-[100px] object-contain'/>
                )}
                {!isLoading&& campaigns.length===0&&(
                    <p className='text-white font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183] '>You have not created any campaigns yet</p>
                )}
                {!isLoading&& campaigns.length>0 && campaigns.map(
                    (item)=><FunCard 
                    key={item.pid}
                    {...item}
                    handleClick={()=>handleNavigate(item)}
                    />)}
            </div>
        </div>
    )
}

export default CampaignList