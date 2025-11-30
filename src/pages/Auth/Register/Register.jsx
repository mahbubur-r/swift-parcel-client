import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import axios from 'axios';
import useAxiosSecure from '../../../hooks/useAxiosSecure';


const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { registerUser, updateUserProfile } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const handleRegister = (data) => {
        // console.log('after register', data);    
        const profileImg = data.photo[0];
        registerUser(data.email, data.password)
            .then(() => {
                // console.log(result.user);

                //1. store the image and get the photo url
                const formData = new FormData();
                formData.append('image', profileImg)
                //2. send the photo
                
                const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`

                
                axios.post(image_API_URL,formData)
                .then(res=> {
                    const photoURL = res.data.data.url

                    // create user to the database
                    const userInfo = {
                        email: data.email,
                        displayName: data.name,
                        photoURL: photoURL,
                    }
                    axiosSecure.post('/users', userInfo)
                        .then(res=> {
                            if(res.data.insertedId){
                                console.log('user created in the database');
                            }
                        })


                    //2. update user profile to firebase
                    const userProfile = {
                         displayName : data.name, 
                         photoURL: photoURL,
                         

                    }
                    updateUserProfile(userProfile)
                    .then(()=> {console.log('user profile updated done');
                        navigate(location.state || '/' )
                    })
                    .catch(error=> console.log(error))
                    
                })


            }) 
            .catch(error => {
                console.log(error);

            })

    }

    return (
        <div>

            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <h3 className='text-3xl text-center font-bold mt-5'>Welcome to SwiftParcel</h3>
                <p className='text-xl text-center font-bold mt-2'>Please Register Now!</p>
                <div className="card-body">
                    <form className='card-body' onSubmit={handleSubmit(handleRegister)}>
                        <fieldset className="fieldset">
                            {/* Name */}
                            <label className="label">Name</label>
                            <input type="text"{...register('name', {
                                required: true,

                            })} className="input" placeholder="Name" />
                            {errors.email?.type === 'required' && <p className='text-red-500'>Name is required</p>}
                            {/* Photo*/}
                            <label className="label">Photo</label>
                            <input type="file"{...register('photo', {
                                required: true,

                            })} className="file-input" placeholder="Photo" />
                            {errors.email?.type === 'required' && <p className='text-red-500'>Name is required</p>}
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
                            <button className="btn btn-primary  text-black font-bold mt-4">Register</button>
                            <SocialLogin></SocialLogin>
                        </fieldset>
                    </form>
                    <p className='text-center'>Already have an account? <Link
                    state={location.state}
                     to='/login' className='text-blue-600 font-bold underline'>Login</Link></p>

                </div>
            </div>



        </div >
    );
};

export default Register;