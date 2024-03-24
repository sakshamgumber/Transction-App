import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from 'react';
export const Payment = () => {
    const [amount, setAmount] = useState();
    const navigate=useNavigate();
    const location = useLocation();
    const iniate = async () => {
        const to = location.state.id;
        console.log(to);
        const token=localStorage.getItem('token');
        const headers = {
            'authorisation': token // Corrected spelling
        };
        
        // const to=location.state.id;
        const response = await axios.post('http://localhost:3000/api/v1/account/transfer', { amount, to }, { headers: headers } );
        console.log(response.data);
        alert(response.data.message,response.data.amount);
        navigate('/dashboard')
    };
    return (
        <div className="h-screen">
            <div className="flex justify-center items-center">
                <div className="flex flex-col items-center justify-center mt-20 shadow-2xl lg:w-1/2 md:w-2/3 sm:w-full mx-auto p-4">
                    <div className="font-bold text-xl py-4">Send Money</div>
                    <div className="flex items-center ">
                        <div className="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center text-4xl">{location.state.name[0].toUpperCase()}</div>
                        <div className="font-bold pr-60">{location.state.name.toUpperCase()}</div>
                    </div>
                    <div className="text-sl text-sm pr-80 text-sm">Amount(in Rs)</div>
                    <div><input type="text" placeholder="Enter Amount" className="border rounded border-slate-200 w-96" onChange={(e) => { setAmount(e.target.value) }} /></div>
                    <div><button className="bg-green-400 mt-2 rounded w-96" onClick={iniate} >Iniate Transfer</button></div>
                </div>
            </div>
        </div>
    )
}