import './App.css';
import Navbar from './components/Navbar';
import blockchain_icon from './assets/blockchain-icn.png';
import token_icon from './assets/token.png';
import analytics_icon from './assets/code.png';
import './mobile.css';
import './tablet.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect} from 'react';
import { fetchAuthorizedAccount } from './ethereum/user';
import { useDispatch} from 'react-redux';
import { useRef } from 'react';
import { BrowserRouter,Route,Routes, useNavigate } from 'react-router-dom';
import CohortDetails from './components/CohortDetails';
import CohortLesson from './components/CohortLesson';

import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme
} from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';

function Home(props){
  
  const navigate = useNavigate()

  return <div>
    <div className='section-1' ref={props.webifyRef}>

    <p className='section-1-col-1-h' data-aos="fade-in" data-aos-delay="300">
      <span style={{color:'white'}}>1 BLOCKCHAIN SCHOOL </span> {"<! - - - -"}showHomePage{"- - - - - - - - - - - - - - - - >"}
    </p>

        <div className='section-1-col-1' data-aos="fade-in" data-aos-delay="700">
          <p className='section-1-col-1-t' >Welcome to Blockchain's<br/>Academy with<br/>webify3.0</p>
          
          <div className='section-1-bottom'>
              <div className='section-1-bottom-info'>
                <p>Learning blockchain is a step to advancing your career for only $1 you can train and have a solid foundation.</p>
                <button className='section-1-button'>Join cohort with webify Academy</button>
              </div>
          </div>
        </div>

        <div className='section-1-col-2-wrapper'>
          <div className='section-1-col-2' data-aos="zoom-in" data-aos-delay="1000"></div>
        </div>

    </div>

    <div className='section-2' >

      <div className='section-2-col-1' data-aos="fade-right" data-aos-delay="300">
        <p className='section-1-col-1-h'><span style={{color:'white'}}>2 GETTING STARTED </span> {"<! - - - -"}showCohortPage{"- - - - - - - - - - - - - - - - - - >"}</p>
        <p className='section-1-col-1-t'>The two best Blockchain cohort</p>
      </div>

      <div className='cohort-item it-1' data-aos="zoom-in" data-aos-delay="300">

          <div className='cohort-item-pattern c-1' ref={props.cohortRef}>
          <img src={blockchain_icon}  alt=""/>
            
          </div>
          <p className='cohort-item-cohort-text'>COHORT 1</p>
          <p className='cohort-item-cohort-header'>Blockchain</p>
          <p className='cohort-item-cohort-text'>
            Get inspiration from the community or just start hunting
          </p>

          <button className='cohort-item-cohort-button' onClick={()=>{
            navigate('/cohort',{ state: { 
              id: 1733 ,name:'Blockchain',
              content:[
                'Blockchain  introduction',
                'Decentralization concept',
                'Cryptocurrency   concept',
                'Mining',
                'Consensus Mechanism',

              ]
          } })
          }}>Enroll course</button>

      </div>

      <div className='cohort-item' data-aos="fade-in" data-aos-delay="300">

          <div className='cohort-item-pattern c-2'>
            <img src={token_icon} width={111}  alt=""/>
          </div>
          <p className='cohort-item-cohort-text'>COHORT 2</p>
          <p className='cohort-item-cohort-header'>Ethereum</p>
          <p className='cohort-item-cohort-text'>
            Get inspiration from the community or just start hunting
          </p>

          <button className='cohort-item-cohort-button' onClick={()=>{
            navigate('/cohort',{ state: { id: 8734,name:'Ethereum',content:[
              'Ethereum',
              'Ethereum EVM-based smart',
              'Ethereum features',
              'Consensus Solidity',
              'Consensus Mechanism',

            ]} })
          }}>Enroll course</button>

      </div>

      {/*<div className='cohort-item' data-aos="zoom-in" data-aos-delay="300">

          <div className='cohort-item-pattern c-3'>
          <img src={analytics_icon} width={111}  alt=""/>

          </div>
          <p className='cohort-item-cohort-text'>COHORT 3</p>
          <p className='cohort-item-cohort-header'>Project</p>
          <p className='cohort-item-cohort-text' >
            Get inspiration from the community or just start hunting
          </p>

          <button className='cohort-item-cohort-button' onClick={()=>{
            navigate('/cohort',{ state: { id:6541,name:'Project',content:[
              'Solidity programming',
              'Create cryptocurrency',
              'React js/ethers.js',
              'DApp',
              'Smart contract security',

            ]} })
          }}>Enroll course</button>

        </div>*/}
      
    </div>

    <div className='section-1' ref={props.communityRef}>
    <p className='section-1-col-1-h' data-aos="fade-in" data-aos-delay="300"><span style={{color:'white'}}>3 WEBIFY COMMUNITY </span> {"<! - - - -"}showWebifyCommunity{"- - - - - - - - - - - - - - - - >"}</p>

        <div className='section-1-col-1'>
          <p className='section-1-col-1-t' data-aos="fade-right" data-aos-delay="300">Grow with the community<br/>and dive into the web3</p>
          <button className='section-1-button' data-aos="fade-right" data-aos-delay="300">Join our discord</button>
        </div>

        <div className='section-community'>

          <div className='section-comm-1' data-aos="zoom-in" data-aos-delay="300">
            <p>LEARN MORE</p>
            <p>Visit our instagram page</p>
            <button className='cohort-item-cohort-button' style={{marginTop:'0px'}}>Start now</button>
          </div>


          <div className='section-comm-1' data-aos="zoom-in" data-aos-delay="300">
            <p>LEARN MORE</p>
            <p>Visit our twitter page</p>
            <button className='cohort-item-cohort-button' style={{marginTop:'0px'}}>Start now</button>
          </div>
          
        </div>
    </div>
  </div>
}
function  App (){

  const { chains, provider } = configureChains(
    [chain.mainnet, chain.goerli],
    [
      publicProvider()
    ]
  );
  
  const { connectors } = getDefaultWallets({
    appName: 'webify3.0',
    chains
  });
  
  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider
  })
  

  const dispatch      = useDispatch()
  const navRef        = useRef();
  const webifyRef     = useRef();
  const cohortRef     = useRef();
  const communityRef  = useRef();

  useEffect(() => {
    AOS.init();
    fetchAuthorizedAccount(dispatch)

  }, [dispatch])
  
  return (
    <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains} theme={darkTheme({
          accentColor: 'white',
          accentColorForeground: 'black',
        })}>
          <BrowserRouter>

            <div className="App">
              
              
              <Routes>
                <Route path='/'       element={
                  <div>
                  <Navbar fixed={true} navRef={navRef} webifyRef={webifyRef} cohortRef={cohortRef} communityRef={communityRef}/>
                    <Home   webifyRef={webifyRef} 
                            cohortRef={cohortRef} 
                            communityRef={communityRef}/>
                            <footer>
                              <p className='footer-title'>Webify3.0</p>
                              <div className='footer-items'>
                                <ul>
                                  <li>Creator</li>
                                  <li>Contact</li>
                                  <li>About</li>
                                  <li>Discord</li>
                                  <li>Community</li>
                                </ul>
                              </div>
                          </footer>
                  </div>
                }
                />
                <Route path='/cohort' element={
                  <div>
                  <Navbar fixed={true} navRef={navRef} webifyRef={webifyRef} cohortRef={cohortRef} communityRef={communityRef}/>

                    <CohortDetails navRef={navRef}/>
                    <footer>
                              <p className='footer-title'>Webify3.0</p>
                              <div className='footer-items'>
                                <ul>
                                  <li>Creator</li>
                                  <li>Contact</li>
                                  <li>About</li>
                                  <li>Discord</li>
                                  <li>Community</li>
                                </ul>
                              </div>
                    </footer>
                  </div>
                }/>
                <Route path='/academy' element={
                  <div>
                  <Navbar fixed={true} navRef={navRef} webifyRef={webifyRef} cohortRef={cohortRef} communityRef={communityRef}/>

                <CohortLesson/>

                  </div>
                }/>
              </Routes>
              


            </div>
            
          </BrowserRouter>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
