import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";
import { FaEye,FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const HeroRegister = () => {

    // second step decalre usestate

    const[heroRegister,setHeroRegister]=useState('');
    const[success,setSuccess]=useState('');
    const[showPassword,setShowPassword]=useState(false)

    const handleHeroRegister=e=>{
        e.preventDefault();
        const email=e.target.email.value;
        const password=e.target.password.value;
        const accepted=e.target.terms.checked;
        console.log(email,password,accepted);

        if(password.lenght < 6){
            setHeroRegister('Password should be at least 6 characters');
            return;
        }
        else if(!/[A-Z]/.test(password)){
            setHeroRegister('Your password should have at least one upper case characters');
            return;

        }
        else if(!accepted){
            setHeroRegister('Please accept our terms and conditions')
            return;
        }

        // reset error and success
        setHeroRegister('');
        setSuccess('');


        // first step  Create user 
        createUserWithEmailAndPassword(auth,email,password)
        .then(result=>{
            console.log(result.user);
            if(result.user){
              setSuccess('user created successfuly');
            }else {
              alert('Please verify your email address')
            }
           


            // send verification emailVerified
            sendEmailVerification(result.user)
            .then(()=>{
              alert('Please check your email and verify your password');
            })

        })
        .catch(error=>{
            console.error(error);

            // setHeroRegister
            setHeroRegister(error.message)
        })
    }


    


    return (
        <div>
            <div className="hero bg-red-300 min-h-screen rounded-lg">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Register now!</h1>
      <p className="py-6">
        Register once and get free services 
      </p>
    </div>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <form onSubmit={handleHeroRegister} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" placeholder="email" name="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>


          <div className=" relative flex items-center">
          <input 
                type={showPassword ? "text":"password"}
                placeholder="password" 
                name="password" 
                className="input input-bordered w-full"
                required />

          <span className=" absolute right-2" onClick={()=>setShowPassword(!showPassword)}>
                {
                    showPassword ? <FaEyeSlash></FaEyeSlash>:<FaEye></FaEye>
                }
          </span>
          </div>
          <br />
          <div className="mb-4 ">
          <input type="checkbox" name="terms" id="terms" />
          <label  className="ml-2 " htmlFor="terms">Accept our <a href=""> Terms and Conditions</a></label>
          </div>
        <br />
         
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Register</button>
        </div>
      </form>
        
      {
        // we will show the error
        heroRegister && <p className="text-red-600">{heroRegister}</p>
      }

      {
        success && <p className="text-green-600">{success}</p>
      }

        <p>Already have an account? <Link to="/login">Login</Link></p>

    </div>
  </div>
</div>
        </div>
    );
};

export default HeroRegister;