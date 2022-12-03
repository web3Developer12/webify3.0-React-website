import { setUser,setUserStatus } from "../redux/userSlice";

export const fetchAuthorizedAccount = async(dispatch) =>{
    try{
        const {ethereum} = window;
        if(ethereum){
            const accounts = await ethereum.request({method:'eth_accounts'})
            if(accounts.length > 0){
                dispatch(setUser(accounts[0]));
                dispatch(setUserStatus('Authorized Account'));

            }else{
                dispatch(setUserStatus('No Authorized Account'));
            }
        }else{
            dispatch(setUserStatus('Please Install Metamask'));
        }
    }catch(e){
        console.log(e)
    }
}
export const requestAuthorizedAccount = async(dispatch) =>{
    try{
        const {ethereum} = window;
        if(ethereum){
            const accounts = await ethereum.request({method:'eth_requestAccounts'})
            if(accounts.length > 0){
                dispatch(setUser(accounts[0]));
                dispatch(setUserStatus('Authorized Account'));

            }
        }else{
            dispatch(setUserStatus('Please Install Metamask'));
        }
    }catch(e){
        console.log(e)
    }
}