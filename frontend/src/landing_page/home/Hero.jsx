import React from 'react';
import { useNavigate } from 'react-router-dom';

function Hero() {

    const navigate = useNavigate();
    
        const handleSignup = () => {
            navigate('/signup');
        };

    return ( 
        <div className='container  p-5 mb-5' >
            <div className='row text-center'>
                <img src='media/images/homeHero.png' alt='Hero Image'  className='mb-5'></img>
                
                <h1 classname='mt-5' >Invest in everything</h1>
                <p>Online paltform to invest in stocks, derivatives, mutual funds</p>
                
                <button className='p-2 btn btn-primary' 
                    style={{width:"20%", margin:"0 auto"}} 
                    onClick={handleSignup}
                >
                    SignUp
                </button>
            </div>
 
        </div>
     );
}

export default Hero;