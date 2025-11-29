import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { BsTextarea } from 'react-icons/bs';
import { useLoaderData, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';

const SendParcel = () => {
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
    const senderRegion = useWatch({ control, name: 'senderRegion' });
    const receiverRegion = useWatch({ control, name: 'receiverRegion' })


    const navigate = useNavigate()



    // 
    const districtByRegion = (region) => {
        const regionDisticts = serviceCenters.filter(c => c.region === region);
        const disctricts = regionDisticts.map(d => d.district)
        return disctricts;
    }


    const handleSendParcel = data => {
        // console.log(data);
        // calculatee the cost
        const isDocument = data.parcelType === 'document'
        const isSameDistrict = data.senderDistrict === data.receiverDistrict
        console.log(isSameDistrict);
        const parcelWeight = parseFloat(data.parcelWeight);

        let cost = 0;
        if (isDocument) {
            cost = isSameDistrict ? 6 : 8;

        }
        else {
            if (parcelWeight < 3) {
                cost = isSameDistrict ? 11 : 15;
            }
            else {
                const minCharge = isSameDistrict ? 11 : 15;
                const extraWeight = parcelWeight - 3;
                const extraCharge = isSameDistrict ? extraWeight * 4 :
                    extraWeight * 4 + 4;
                cost = minCharge + extraCharge;
            }
        }

        console.log('cost:', cost);
        data.cost = cost;

        Swal.fire({
            title: "Agree with the cost?",
            text: `You will be charged ${cost} EUR!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm and Continue to Payment!"
        }).then((result) => {
            if (result.isConfirmed) {
                // save the parcel info to the database
                axiosSecure.post('/parcels', data)
                    .then(res => {
                        console.log('after saving parcel', res.data);
                        if (res.data.insertedId) {
                            // after added one parcel it will redirect to payment page.
                            navigate('/dashboard/my-parcels')

                            Swal.fire({
                                title: "Confirmed!",
                                text: "Your parcel has been processed for delovery and pay now.",
                                icon: "success",
                                timer: 2500,
                            });
                        }
                    })


            }
        });

    }

    return (

        <div>
            <h2 className="text-5xl text-center mt-5 font-bold">Send a Parcel</h2>
            <form onSubmit={handleSubmit(handleSendParcel)} className='mt-12 p-4 text-black'>
                {/* Document */}
                <div className='mr-5'>
                    <label className="label mr-5">
                        <input type="radio" value="document" {...register('parcelType')} className="radio radio-xs" defaultChecked />Documents</label>
                    <label className="label mr-5">

                        <input type="radio" value="non-document" {...register('parcelType')} className="radio radio-xs" defaultChecked />Non-Document</label>

                </div>

                {/* parcel info, name, weight */}
                <div className='grid grid-cols-1 md:grid-cols-2 md:gap-10 my-8'>
                    <fieldset className="fieldset">
                        <label className="label">Parcel Name</label>
                        <input type="text" {...register('parcelName')} className="input w-full" placeholder="Parcel Name" />
                    </fieldset>
                    <fieldset className="fieldset">
                        <label className="label">Parcel Weight(Kg)</label>
                        <input type="text" {...register('parcelWeight')} className="input w-full" placeholder="Parcel Weight" />
                    </fieldset>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 md:gap-10'>
                    {/* sender and receiver */}
                    <div>
                        <h4 className='text-xl font-bold'>Sender Details</h4>
                        {/* sender */}
                        <fieldset className="fieldset">
                            <label className="label">Sender Name</label>

                            <input type="text" {...register('senderName')}
                                defaultValue={user?.displayName} className="input w-full" placeholder="Sender Name" />
                        </fieldset>
                        <fieldset className="fieldset">
                            <label className="label">Sender Email</label>
                            <input type="email" {...register('senderEmail')}
                                defaultValue={user?.email}
                                className="input w-full" placeholder="Sender Email" />
                        </fieldset>
                        <fieldset className="fieldset">
                            <label className="label">Sender Number</label>
                            <input type="text" {...register('senderNumber')} className="input w-full" placeholder="Sender Number" />
                        </fieldset>
                        <fieldset className="fieldset">
                            <label className="label">Sender Address</label>
                            <input type="text" {...register('senderAddress')} className="input w-full" placeholder="Sender Adddress" />
                        </fieldset>
                        {/* Sender Region */}
                        <fieldset className="fieldset">
                            <label className="label">Sender Region</label>
                            <select {...register('senderRegion')} defaultValue="Pick a region" className="select">
                                <option disabled={true}>Select a State</option>

                                {
                                    regions.map((r, i) => <option key={i} value={r}>{r}</option>)
                                }
                            </select>
                        </fieldset>

                        {/* Sender District */}
                        <fieldset className="fieldset">
                            <label className="label">Sender City</label>
                            <select {...register('senderDistrict')} defaultValue="Pick a district" className="select">
                                <option disabled={true}>Select a City</option>
                                {
                                    districtByRegion(senderRegion).map((r, i) => <option key={i} value={r}>{r}</option>)
                                }
                            </select>
                        </fieldset>

                        <fieldset className="fieldset">
                            <label className="label">Sender Instruction</label>
                            <textarea className="textarea input h-24 w-full" {...register('senderInsctruction')} placeholder="Sender Instruction"></textarea>
                        </fieldset>

                    </div>

                    <div>
                        <h4 className='text-xl font-bold'>Receiver Details</h4>
                        {/* Receiver Details*/}
                        <fieldset className="fieldset">
                            <label className="label">Receiver Name</label>
                            <input type="text" {...register('receiverName')} className="input w-full" placeholder="Receiver Name" />
                        </fieldset>
                        <fieldset className="fieldset">
                            <label className="label">Receiver Email</label>
                            <input type="email" {...register('receiverEmail')} className="input w-full" placeholder="Receiver Email" />
                        </fieldset>
                        <fieldset className="fieldset">
                            <label className="label">Receiver Number</label>
                            <input type="text" {...register('receiverrNumber')} className="input w-full" placeholder="Receiver Number" />
                        </fieldset>
                        <fieldset className="fieldset">
                            <label className="label">Receiver Address</label>
                            <input type="text" {...register('receiverAddress')} className="input w-full" placeholder="Receiver Adddress" />
                        </fieldset>
                        {/* Receiver Region */}
                        <fieldset className="fieldset">
                            <label className="label">Receiver Region</label>
                            <select {...register('receiverRegion')} defaultValue="Pick a region" className="select">
                                <option disabled={true}>Select a State</option>

                                {
                                    regions.map((r, i) => <option key={i} value={r}>{r}</option>)
                                }
                            </select>
                        </fieldset>

                        {/* Receiver District */}
                        <fieldset className="fieldset">
                            <label className="label">Receiver City</label>
                            <select {...register('receiverDistrict')} defaultValue="Pick a district" className="select">
                                <option disabled={true}>Select City</option>
                                {
                                    districtByRegion(receiverRegion).map((r, i) => <option key={i} value={r}>{r}</option>)
                                }
                            </select>
                        </fieldset>

                        <fieldset className="fieldset">
                            <label className="label">Receiver Instruction</label>
                            <textarea className="textarea h-24 w-full input" {...register('receiverInsctruction')} placeholder="Receiver Instruction"></textarea>
                        </fieldset>
                        {/* receiver details */}

                    </div>
                </div>
                <input type="submit" value="Send Parcel" className='btn btn-primary mt-5 text-black' />
            </form>
        </div>
    );
};

export default SendParcel;