import { useEffect, useState } from "react"
import CampaignList from "../components/CampaignList"
import { useStateContext } from "../context"

const Home = ()=>{
    const [isLoading,setIsLoading] = useState(false)
    const [campaigns,setCampaigns] = useState([])
    const {addresss, contract, getCampaigns, getUserCampaigns} = useStateContext()

    const fetchCampaigns = async()=>{
        setIsLoading(true)
        const data = await getCampaigns()
        console.log('list',data)
        setCampaigns(data)
        setIsLoading(false)
    }
    useEffect(()=>{
        if (contract) fetchCampaigns()
    },[])
    return(
        <CampaignList
            title="All Campaigns"
            isLoading={isLoading}
            campaigns={campaigns}
        />
    )
}

export default Home