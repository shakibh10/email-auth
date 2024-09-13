import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";


const Register = () => {

    const[registerError,setRegisterError]=useState('');

    const[success,setSuccess]=useState('');

    const hsndleRegister=e=>{
        e.preventDefault();

        const email=e.target.email.value;
        const password=e.target.password.value;

        console.log(email,password);

        if(password.lenght <6 ){
            setRegisterError('Password should be at least 6 characters or longer');
            return;
        }

        //reset error
        setRegisterError('');
        setSuccess('');

        //create users 
        createUserWithEmailAndPassword(auth,email,password)
        .then(result=>{
            console.log(result.user);
            setSuccess('User created successfuly')
        })
        .catch(error=>{
            console.log(error);
            setRegisterError(error.message);
        })
    }
    return (
        <div>
            <div className="mx-auto md:w-1/2">
            <h className="text-3xl">PLEASE REGISTER</h>

            <form onSubmit={hsndleRegister}>
            <input className="mb-4 w-3/4 py-2 px-4" type="email" name="email" id="" placeholder="Email" required />
        <br />
        <input className="mb-4 w-3/4 py-2 px-4" type="password" name="password" id="" placeholder="Password" required />
        <br />
        <input className="btn btn-secondary mb-4 w-3/4" type="submit" value="Register" />
        </form>

            {
                registerError && <p className="text-red-600">{registerError}</p>
             
            }
            {
                success && <p className="text-green-600">{ success }</p>
             
            }

            </div>
        </div>
    );
};

export default Register;