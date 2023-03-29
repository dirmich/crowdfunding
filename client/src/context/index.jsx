import React, { createContext, useContext } from 'react'
import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from '@thirdweb-dev/react'
import { ethers } from 'ethers'
const StateContext = createContext()

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract('0xf7631d9535fc8be174d967a9eb31b272e0e4de6e')
  const { mutateAsync: createCampaign } = useContractWrite(
    contract,
    'createCampaign'
  )

  const address = useAddress()
  const connect = useMetamask()

  const publishCampaign = async (form) => {
    try {
      const data = await createCampaign([
        address,
        form.title,
        form.description,
        form.target,
        new Date(form.deadline).getTime(),
        form.image,
      ])
      console.log('contract call ok', data)
    } catch (e) {
      console.log('contract call fail', e)
    }
  }

  const getCampaigns = async ()=>{
    try {
      const data = await contract.call('getCampaigns')
      console.log('contract call ok', data)
      const ret = data.map((item,i)=>({
        owner:item.owner,
        title:item.title,
        description:item.description,
        target:ethers.utils.formatEther(item.target.toString()),
        deadline:item.deadline.toNumber(),
        amountCollected: ethers.utils.formatEther(item.amountCollected.toString()),
        image: item.image,
        pid:i
      }))
      return ret
    } catch (e) {
      console.log('contract call fail', e)
    }
  }

  const donate = async(pid, amount)=>{
    const data = await contract.call('donateToCampaign',pid,{value:ethers.utils.parseEther(amount)})
    return data
  }
  const getDonations = async (pid)=>{
    const donations = await contract.call('getDonators',pid)
    console.log('donations',donations)
    const numberOfDonations = donations[0].length
    
    const parsed = []
    for (let i=0;i<numberOfDonations;i++) {
      parsed.push({
        donator:donations[0][i],
        donation:ethers.utils.formatEther(donations[1][i]).toString()
      })
    }
    return parsed
  }

  const getUserCampaigns = async ()=>{
    const data = await getCampaigns()
    console.log('addr',address)
    return data.filter((item)=>item.owner===address)
  }
  return (
    <StateContext.Provider
      value={{ address, contract, connect, createCampaign: publishCampaign, getCampaigns, getUserCampaigns,donate,getDonations }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext)
