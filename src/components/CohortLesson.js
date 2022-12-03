import "./CohortLesson.css";
import Check from '../assets/circle-check-regular.svg';
import NoCheck from '../assets/circle-Nocheck-regular.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Markdown from 'markdown-to-jsx';
import ScrollToTop from "./ScrollToTop";
import { useState,useEffect, useRef } from "react";

export default function CohortLesson(){

    const [lesson,setLesson] = useState("")
    const [chapter,setChapter] = useState("Welcome, let's get you the details!")
    const [indexLesson,setIndexLesson] = useState(0)
    const [completed,setCompleted] = useState([])
    const [allowedLesson,setAllowedLesson]=useState([0])
    const [header,setHeader] = useState("GETTING STARTED")

    

    useEffect(() => {
        import(`../markdown/cohort-1/${indexLesson}.md`)
          .then(res => {
            fetch(res.default)
              .then(response => response.text())
              .then(response => setLesson(response))
              .catch(err => console.log(err))
          })
      }, [indexLesson]);

      const tableLesson=[
        {
              header:"GETTING STARTED",
              sub   :[
                    {
                        index:0,
                        text:"Welcome, let's get you the details!"
                    }
                  
              ]
        },
        {
            header:"BLOCKCHAIN",
            sub   :[
                {
                    index:1,
                    text:"History of the blockchain"
                },
                {
                    index:2,
                    text:"Types of blockchain"
                },
                {
                    index:3,
                    text:"Consensus"
                },
                {
                    index:4,
                    text:"CAP theorem and blockchain"
                }
                
            ]
        },
        {
            header:"DECENTRALIZATION",
            sub   :[
                {
                    index:5,
                    text:"Decentralization using blockchain"
                },
                {
                    index:6,
                    text:"Methods of decentralization"
                },
                {
                    index:7,
                    text:"Smart contracts"
                },
                {
                    index:8,
                    text:"Decentralized Organizations"
                }
                
            ]
        },
        {
            header:"CRYPTOGRAPHY",
            sub   :[
                {
                    index:9,
                    text:"Cryptograhy introduction"
                },
                {
                    index:10,
                    text:"Mathematics"
                },
                {
                    index:11,
                    text:"Confidentiality"
                },
                {
                    index:12,
                    text:"Integrity"
                },
                {
                    index:13,
                    text:"Authentification"
                },
                {
                    index:14,
                    text:"Non-repudiation"
                },
                {
                    index:15,
                    text:"Accountability"
                },
                {
                    index:16,
                    text:"Cryptographic primitives"
                },
                {
                    index:17,
                    text:"Asymmetric cryptography"
                },
                {
                    index:18,
                    text:"Public and private keys"
                }                
            ]
        },
        {
            header:"BITCOIN",
            sub   :[
                {
                    index:19,
                    text:"Introducing Bitcoin"
                },
                {
                    index:20,
                    text:"Digital keys and addresses"
                },
                {
                    index:21,
                    text:"Transactions"
                },
                {
                    index:22,
                    text:"Blockchain"
                },
                {
                    index:23,
                    text:"Mining"
                }            
            ]
        },
        {
            header:"Bitcoin Network and Payments",
            sub   :[
                {
                    index:22,
                    text:"The Bitcoin network"
                },
                {
                    index:23,
                    text:"Wallets"
                },
                {
                    index:24,
                    text:"Bitcoin payments"
                },
                {
                    index:25,
                    text:"Mining"
                }            
            ]
        }
      ]


    let percent     = Math.ceil((completed.length *100)/29)  
    const lessonRef = useRef()

    return <div className="CohortLesson">
        <ScrollToTop/>
        <div className="tableBoard">

            <div className="contentBoard">

                <div className="contentSummary">
                    <div className="cohortImage">
                        <p className="cImageLogo"> W3.0</p>
                        <p>Blockchain<br/>Cohort</p>
                    </div>
                    {
                        tableLesson.map((el,key)=>{
                            return <div key={key}>
                                <p className="table-H">{el.header}</p>

                                {
                                    el.sub.map((subEl,keyEl)=>{
                                        return <div className="content-text" key={keyEl}  onClick={()=>{
                                            
                                          
                                                setIndexLesson(subEl.index)
                                                setChapter(subEl.text)
                                                setHeader(el.header)
                                            
                                            
                                            {
                                                    2 == 3 &&
                                                    toast('You have to finish the previous lesson', {
                                                        position: "bottom-right",
                                                        autoClose: 5000,
                                                        hideProgressBar: false,
                                                        closeOnClick: true,
                                                        pauseOnHover: true,
                                                        draggable: true,
                                                        progress: undefined,
                                                        theme: "dark",
                                                    });
                            

                                            }

                                        }}>
                                            {
                                            
                                            completed.includes(subEl.index) 
                                                ? <img src={Check} alt=""/> : <img src={NoCheck} alt=""/>
                                            }
                                            <p  style={{color:indexLesson === subEl.index && "white"}}>{subEl.text}</p>
                                        </div>
                                    })
                                }
                                
                                
                            </div>
                        })
                    }
                </div>

                <div className="progress">
                    <div style={{ width: 60, height: 60 }}>
                        <CircularProgressbar
                            value={percent}
                            text={`${percent}%`}
                            styles={buildStyles({
                                // Rotation of path and trail, in number of turns (0-1)
                                rotation: 0.25,

                                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                strokeLinecap: 'butt',

                                // Text size
                                textSize: '24px',

                                // How long animation takes to go from one percentage to another, in seconds
                                pathTransitionDuration: 0.5,

                                // Can specify path transition in more detail, or remove it entirely
                                // pathTransition: 'none',

                                // Colors
                                pathColor: `#6c5ce7`,
                                textColor: 'white',
                                trailColor: 'rgba(255,255,255,.1)',
                                backgroundColor: 'gray',
                            })}
                        />
                
                        
                    </div>
                <ul>
                    <li className="cc-1">You completed {percent}% of the cohort</li>
                    <li className="cc-2">Go little rockstar !!</li>

                </ul>

                </div>

            </div>
        </div>

        <article className="lesson" ref={lessonRef}>
            
        <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="dark"
        />
            <p className="link-lesson"><span style={{color:"gray"}}>Learning</span> / <span className="link-decorator" onClick={()=>{
                setIndexLesson(0)
                setChapter("Welcome, let's get you the details!")
            }}>Blockchain cohort</span> / {header.toLowerCase()} / <span id="special-word">{chapter}</span></p>
            <Markdown>
                {lesson}
            </Markdown>
            <div className="button-group">
                <button className="btn-basic" disabled={
                    indexLesson === 0 ? true:false
                }onClick={()=>{
                    
                    lessonRef.current.scroll({
                        top: 0,
                        behavior: 'smooth'
                    });
                    setTimeout(function(){
                        
                        setIndexLesson(indexLesson-1)
                    }, 1000);                   
                }}>
                    Previous 
                </button>
                <button className="complete-button" onClick={()=>{
                    if(!completed.includes(indexLesson)){
                        setCompleted([...completed,indexLesson])
                    }
                }}>
                    <img src={completed.includes(indexLesson)?Check:NoCheck}/>
                </button>
                <button className="btn-basic" disabled={
                    indexLesson > 27 ? true:false || !completed.includes(indexLesson) ? true:false
                } onClick={()=>{
                    lessonRef.current.scroll({
                        top: 0,
                        behavior: 'smooth'
                    });
                    setTimeout(function(){
                        
                        setIndexLesson(indexLesson+1)
                    }, 1000); 
                }}>
                    Next
                </button>
            </div>
        </article>

        
    </div>
}