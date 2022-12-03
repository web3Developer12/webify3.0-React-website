import { useLocation, useNavigate } from 'react-router-dom';
import { GetETHExchangeRate } from '../ethereum/api';
import { enroll_cohort } from '../ethereum/transactions';
import { useState,useEffect } from 'react';
import './CohortDetails.css';
import ScrollToTop from './ScrollToTop';
import ClipLoader from "react-spinners/ClipLoader";
import { ref, set,get, child} from "firebase/database";
import databaseFire from '../config';
import { useSelector } from 'react-redux';

function addAllowance(sender,cohortId) {

    const dbRef  = ref(databaseFire);
    let  cohorts = []

    get(child(dbRef, `users/${sender.toString()}`)).then((snapshot) => {
    if (snapshot.exists()) {
        cohorts = snapshot.val().cohort;
        set(ref(databaseFire, 'users/' + sender), {
            account:sender,
            cohort:[...cohorts,{
                id:cohortId,
                date:new Date().toLocaleDateString(),
                time:new Date().toLocaleTimeString()
            }],
        });
    } else {
        set(ref(databaseFire, 'users/' + sender), {
            account:sender,
            cohort:[{
                id:cohortId,
                date:new Date().toLocaleDateString(),
                time:new Date().toLocaleTimeString()
            }],
        });
    }
    }).catch((error) => {
        console.error(error);
    });

    
}

function checkIfAlreadyOnCohort(targetId,sender,setOnCohort) {

    const dbRef  = ref(databaseFire);
    get(child(dbRef, `users/${sender.toString()}`)).then((snapshot) => {
        if(snapshot.exists()){
            const subscriptions = snapshot.val().cohort || []
            subscriptions.map((element)=>{
                if(element.id === targetId){
                    setOnCohort(true)
                }
                return true
            })
        }
    })
}

function Check (){
    return <div className='checkIcon'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" fill='#575fcf'/>
        </svg>
    </div>
}

function Loader(props){
    return <ClipLoader
    color="white"
    loading={props.loadingState}
    size={50}
    aria-label="Loading Spinner"
    data-testid="loader"
  />
}

function manageStateButton(onCohortState,paying,ethExRate,setPaying,id,addAllowance,navigate){
    
    if(onCohortState === true){
        return <p className='btn-enroll-2' onClick={()=>{
            navigate('/academy')
        }}>Start lesson</p>
    }else {
        return paying === false? <p className='btn-enroll-2' onClick={()=>{
            enroll_cohort(ethExRate * 1,setPaying,id,addAllowance)
        }}>
            Subscribe for 1$
        </p>:<Loader loadingState={paying}/>
    }
}
export default function CohortDetails(props){
    
    const {state}                   = useLocation();
    const { id,name,content }       = state;
    const [ethExRate, setEthExRate] = useState();
    const [paying,setPaying]        = useState(false);
    const userETH                   = useSelector(state=>state.user.account)
    const [onCohort,setOnCohort]    = useState(false)
    const navigate                  = useNavigate()
    

    useEffect(() => {
        GetETHExchangeRate().then((res) => {
          setEthExRate(parseFloat(res));
        });
        checkIfAlreadyOnCohort(id,userETH,setOnCohort)
      }, [id,userETH,onCohort]);

    return <div className="CohortDetails">

        <ScrollToTop/>        

        <div>
            <h1>Cohort {name}</h1>
            <p className='section-1-col-1-h' data-aos="fade-in" data-aos-delay="300">
                <span style={{color:'white'}}>1 {name.toUpperCase()} COHORT </span> {"<! - - - -"}showCohortPage{"- - - - - - - - - - - - - - - - >"}
            </p>
            <div className={`cohort-img-${id}`}></div>
            <p className='subCC'>
                You can find the videos embedded at the end of many of the Bug Hunter University articles, or you can hop directly to our YouTube playlist and browse through the available videos. Check the description of the individual videos for more information on the creator, links to the related article(s) in the Bug Hunter University, and a table of contents making it easy to navigate to your favorite part of the video
            </p>
            {
                manageStateButton(onCohort,paying,ethExRate,setPaying,id,addAllowance,navigate)
            }
            
        </div>
        <div className='cohortDetails-col2'>
            <div className='cohortWrapper'>
                <p className='syll-h'>Syllabus</p>
                <p className='syll-s'>All topics covered in the {name} cohort</p>

                <ul className='syll-d'>
                    {
                        content.map((element,index)=>{
                            return <li key={index}><Check/>{element}</li>
                        })
                    }

                </ul>
            </div>

        </div>
    </div>
}