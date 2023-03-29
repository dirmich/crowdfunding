import { useEffect, useState } from "react"
import CampaignList from "../components/CampaignList"
import { useStateContext } from "../context"

const Profile = ()=>{
    const [isLoading,setIsLoading] = useState(false)
    const [campaigns,setCampaigns] = useState([])
    const {addresss, contract,  getUserCampaigns} = useStateContext()

    const fetchCampaigns = async()=>{
        setIsLoading(true)
        const data = await getUserCampaigns()
        // console.log('list',data)
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

export default Profile
