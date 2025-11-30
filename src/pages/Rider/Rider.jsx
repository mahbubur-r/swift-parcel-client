import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useLoaderData, useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const Rider = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        control,
        // formState: { errors } 
    } = useForm();
    const { user } = useAuth();
    // call the axios secure
    const axiosSecure = useAxiosSecure();

    const serviceCenters = useLoaderData();
    const regionsDuplicate = serviceCenters.map(c => c.region)
    // remove the duplicate
    const regions = [...new Set(regionsDuplicate)]
    // console.log(regions);
    const riderRegion = useWatch({ control, name: 'region' });

    const handleRiderApplication = data => {
        console.log(data);
        axiosSecure.post('/riders', data)
            .then(res => {
                    if (res.data.insertedId) {
                        // after added one parcel it will redirect to payment page.
                        navigate('/')

                        Swal.fire({
                            title: "Confirmed!",
                            text: "Your appication has been received we will reach out soon!",
                            icon: "success",
                            timer: 2500,
                        });
                    }
            })

    }

    const districtByRegion = (region) => {
        const regionDisticts = serviceCenters.filter(c => c.region === region);
        const disctricts = regionDisticts.map(d => d.district)
        return disctricts;
    }

    return (
        <div>
            <form onSubmit={handleSubmit(handleRiderApplication)} className='mt-12 p-4 text-black'>

                <div className='grid grid-cols-1 md:grid-cols-2 md:gap-10 '>
                    {/* sender and receiver */}
                    <div className=''>
                        <h4 className='text-xl font-bold'>Rider Details</h4>
                        {/* Region */}
                        <fieldset className="fieldset">
                            <label className="label">Rider Region</label>
                            <select {...register('region')} defaultValue="Pick a region" className="select">
                                <option disabled={true}>Select a State</option>

                                {
                                    regions.map((r, i) => <option key={i} value={r}>{r}</option>)
                                }
                            </select>
                        </fieldset>

                        {/* District */}
                        <fieldset className="fieldset">
                            <label className="label">Rider City</label>
                            <select {...register('district')} defaultValue="Pick a district" className="select">
                                <option disabled={true}>Select a City</option>
                                {
                                    districtByRegion(riderRegion).map((r, i) => <option key={i} value={r}>{r}</option>)
                                }
                            </select>
                        </fieldset>

                        <fieldset className="fieldset">
                            <label className="label">Rider Name</label>

                            <input type="text" {...register('name')}
                                defaultValue={user?.displayName} className="input w-full" placeholder="Rider Name" />
                        </fieldset>
                        <fieldset className="fieldset">
                            <label className="label">Rider Email</label>
                            <input type="email" {...register('email')}
                                defaultValue={user?.email}
                                className="input w-full" placeholder="Rider Email" />
                        </fieldset>

                    </div>

                    <div>
                        <h4 className='text-xl font-bold'>More Details</h4>
                        <fieldset className="fieldset">
                            <label className="label">Rider Mobile Number</label>
                            <input type="text" {...register('number')} className="input w-full" placeholder="Rider Mobile Number" />
                        </fieldset>
                        <fieldset className="fieldset">
                            <label className="label">Rider Full Address</label>
                            <input type="text" {...register('address')} className="input w-full" placeholder="Rider Adddress" />
                        </fieldset>

                        {/* Receiver Details*/}
                        <fieldset className="fieldset">
                            <label className="label">Rider NID</label>
                            <input type="text" {...register('nid')} className="input w-full" placeholder="NID Number" />
                        </fieldset>
                        <fieldset className="fieldset">
                            <label className="label">Rider Driving License</label>
                            <input type="text" {...register('license')} className="input w-full" placeholder="Rider Driving License" />
                        </fieldset>
                        <fieldset className="fieldset">
                            <label className="label">Rider Bike</label>
                            <input type="text" {...register('bike')} className="input w-full" placeholder="Rider Bike" />
                        </fieldset>
                    </div>
                </div>
                <input type="submit" value="Send Rider Application" className='btn btn-primary text-black' />
            </form>
        </div>
    );
};

export default Rider;