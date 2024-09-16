import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useRef, useState } from "react";
import { FaEye,FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Login = () => {

    // second step
    const[loginError,setLoginError]=useState('')
    const[succeses,setSucceses]=useState('');
    const[showpassword,setShowpassword]=useState(false);
    const emailRef=useRef(null);


    const handleLogin=e=>{
        e.preventDefault();
        const email=e.target.email.value;
        const password=e.target.password.value;
        
        console.log(email,password);

        if(password.length < 6){
            setLoginError('Your password should be at least 6 characters long');
            return;
        }
        else if((!/[A-Z]/.test(password))){
            setLoginError('Your password should have at least one upper case character');
            return;
        }

        // reset 
        // 5th step
        setLoginError('')
        setSucceses('')

        // add validation
        // First step

        signInWithEmailAndPassword(auth,email,password)
        .then(result=>{
            console.log(result.user);
            setSucceses('Login successfuly');
        
        })
        .catch(error=>{
            console.error(error);

            //setLoginError
            // 3rd step
            setLoginError(error.message);
        })

    }

    const handleForgetPassword=()=>{
        const email=emailRef.current.value;
        if(!email){
            console.log('Please provide an email',emailRef.current.value);
            return;
        }
        else if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)){
            console.log('Please write a valid email');
            return;
        }


        // send validation email

        sendPasswordResetEmail(auth,email)
        .then(()=>{
            alert('Please check your email')
        })
        .catch(error=>{
            console.log(error)
        })
      
   }

    return (
        <div>
            <div className="hero bg-green-300 min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Login now!</h1>
      <p className="py-6">
        Please login  and enjoy undoubtedly
      </p>
    </div>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">

      <form onSubmit={handleLogin} className="card-body">
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
         <div className="flex items-center relative">
         <input type={ showpassword? "text":"password"}
                ref={emailRef}
                placeholder="password"
                name="password" 
                className="input input-bordered w-full"
                required />

         <span className="absolute right-2" onClick={()=>setShowpassword(!showpassword)}>
         {
                    showpassword ? <FaEyeSlash></FaEyeSlash>:<FaEye></FaEye>
         }
         </span>
         </div>
          <label className="label">
            <a onClick={handleForgetPassword} href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Login</button>
        </div>
      </form>

      {
        // 4th step 
        loginError && <p className="text-red-600">{loginError}</p>
      }

      {
        succeses && <p className="text-green-600">{succeses}</p>
      }

      <p>New to this website? Please <Link to="/heroregister">Register</Link></p>

    </div>
  </div>
</div>

        </div>
    );
};

export default Login;