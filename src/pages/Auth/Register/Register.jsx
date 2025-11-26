import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';


const Register = () => {
    const {register, handleSubmit, formState: {errors}} = useForm(); 
    const {registerUser} = useAuth();

    const handleRegister= (data)=>{
        console.log('after register',data);
        registerUser(data.email, data.password)
        .then(result => {
            console.log(result.user);
            
        })
        .catch(error => {
            console.log(error);
            
        })
        
    }

    return (
        <div>
            <form onSubmit={handleSubmit(handleRegister)}>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        
                        <fieldset className="fieldset">
                            {/* Email */}
                            <label className="label">Email</label>
                            <input type="email"{...register('email', {
                                required: true,

                                })} className="input" placeholder="Email" />
                                {errors.email?.type==='required'&& <p className='text-red-500'>Email is required</p>}
                            {/* Password */}
                            <label className="label">Password</label>
                            <input type="password" {...register('password', {
                                required: true,
                                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/,
                                minLength: 6})} className="input" placeholder="Password" />
                                {
                                    errors.password?.type==='required'&& <p className='text-red-500'>Password is required</p>
                                }
                                {
                                    errors.password?.type==='minLength' && <p className='text-red-500'> Password must be 6 character or long</p>
                                }
                                {
                                    errors.password?.type==='pattern'&& <p className='text-red-500'>At least one uppercase, one lowercase, one number and one symbol!</p>
                                }
                            <button className="btn btn-neutral mt-4">Register</button>
                        </fieldset>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Register;