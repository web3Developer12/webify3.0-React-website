import { ethers } from "ethers";
import { contract_address } from "./contract";

export const enroll_cohort= async(price,setPaying,cohortId,addAllowance)=>{
    try{
        const {ethereum} = window
        if(ethereum){
            const provider = new ethers.providers.Web3Provider(ethereum)
            const accounts = await ethereum.request({method:'eth_requestAccounts'})

            const signer   = provider.getSigner()

            const tx       = {
                from:accounts[0].toString(),
                to:contract_address,
                value:ethers.utils.parseEther(price.toString())
            }
            const transaction = await signer.sendTransaction(tx)
            setPaying(true)
            await transaction.wait()
            setPaying(false)
            addAllowance(accounts[0],cohortId)

        }
    }catch(e){
        console.log(e)
    }
}
