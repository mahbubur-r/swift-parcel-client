import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signinUser} = useAuth();
    const location = useLocation();
    const navigate = useNavigate
    console.log('in the login page', );
    

    const handleSignin = (data) => {
        console.log('after register', data);
        signinUser(data.email, data.password)
            .then(result => {
                console.log(result.user);
                navigate(location?.state || '/')

            })
            .catch(error => {
                console.log(error);

            })

    }
    return (
        <div>
            
            <form className='card-body' onSubmit={handleSubmit(handleSignin)}>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <h3 className='text-3xl text-center font-bold mt-5'>Welcome Back!</h3>
                    <p className='text-xl text-center font-bold mt-2'>Please login!</p>
                    <div className="card-body">

                        <fieldset className="fieldset">
                            {/* Email */}
                            <label className="label">Email</label>
                            <input type="email"{...register('email', {
                                required: true,

                            })} className="input" placeholder="Email" />
                            {errors.email?.type === 'required' && <p className='text-red-500'>Email is required</p>}
                            {/* Password */}
                            <label className="label">Password</label>
                            <input type="password" {...register('password', {
                                required: true,
                                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/,
                                minLength: 6
                            })} className="input" placeholder="Password" />
                            {
                                errors.password?.type === 'required' && <p className='text-red-500'>Password is required</p>
                            }
                            {
                                errors.password?.type === 'minLength' && <p className='text-red-500'> Password must be 6 character or long</p>
                            }
                            {
                                errors.password?.type === 'pattern' && <p className='text-red-500'>At least one uppercase, one lowercase, one number and one symbol!</p>
                            }
                            <div><a className="link link-hover">Forgot password?</a></div>
                            <button className="btn btn-primary  text-black font-bold mt-4">Login</button>
                            <SocialLogin></SocialLogin>
                        </fieldset>
                        <p className='text-center'>New to SwiftParcel? <Link
                        state={location.state} 
                        to='/register' className='text-blue-600 font-bold underline'>Register</Link></p>
                    </div>
                </div>
            </form>
            
        </div>
    );
};

export default Login;