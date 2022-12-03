import "./Navbar.css";
import menu_icon from '../assets/menu.png';
import { requestAuthorizedAccount } from "../ethereum/user";
import { useDispatch,useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RainBowButton } from "./RainbowButton";



function NavElement(props){
    return <li className={props.selectedIndex === props.index?'active_li':'inactive_li'} 
               data-aos-delay={props.delay} onClick={()=>{
                   props.setSelected(props.index)
                   if(props.text.toLowerCase().includes('cohort')){
                        props.cohortRef.current.scrollIntoView()
                   }else if(props.text.toLowerCase().includes('community')){
                        props.communityRef.current.scrollIntoView()
                   }
                }}>
                {props.text}
            </li>
}

export default function Navbar(props){
    
  const dispatch = useDispatch()
  const userETH  = useSelector(state=>state.user.account)
  const [selected,setSelected] = useState(-1);
  const navigate = useNavigate()


    return <div className="navBar" style={{position:props.fixed?"fixed":"sticky"}} ref={props.navRef}>

        <p className="title" onClick={()=>{
            navigate('/')
        }} data-aos="fade-right" data-aos-delay="300">Webify3.0</p>
        <p className="navHeader" data-aos="fade-in" data-aos-delay="300">Training</p>
        
        <ul className="navItems">

                <NavElement text="Cohort"    cohortRef={props.cohortRef} index={0} selectedIndex={selected} setSelected={setSelected}/>
                <NavElement text="Community" communityRef={props.communityRef}   index={1} selectedIndex={selected} setSelected={setSelected}/>
                <NavElement text="LeaderBord"  index={2} selectedIndex={selected} setSelected={setSelected}/>
                
        </ul>
        <p onClick={()=>{
            requestAuthorizedAccount(dispatch)
        }} className="connect" data-aos="fade-left" data-aos-delay="1300">
            
            { userETH === ''?"Connect With Wallet":<div className="account-ceils">
                
                <p>{userETH.slice(0,11)+"..."}</p>
                </div>
            }
            
        </p>
        <div className="hamburger-container">
            <img src={menu_icon} width={30} className="hamburger"  alt=""/>
        </div>

    </div>
}