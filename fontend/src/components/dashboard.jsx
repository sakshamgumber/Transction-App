import { useEffect, useState } from "react";
import { Button } from "./buttons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");
    // const [amount,setAmount]=useState("");
    const navigate = useNavigate();
    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
            .then(response => {
                setUsers(response.data.user);
            });
    }, [filter]);
    // const props=axios.get("http://localhost:3000/api/v1/account/balance");
    

    const logout=()=>{
        localStorage.clear();
        navigate('/');
    }
    return (
        <>
        {/* <div></div> */}
            <div className="font-bold mt-2 mx-3 text-lg flex justify-between shadow-lg items-center bg-blue-500 text-white p-3 rounded">
                Users
                <div className="flex justify-center">
                    <div>
                        <button className="text-white rounded h-6 bg-slate-800 w-20 flex justify-center items-center" onClick={logout}>Logout</button>
                    </div>
                    <div className=" bg-green-400 flex rounded-full w-12 h-6 justify-center items-center bg-black mx-4">H</div>
                </div>
            </div>
            <div className="my-2">
                <input
                    onChange={(e) => {
                        setFilter(e.target.value);
                    }}
                    type="text"
                    placeholder="Search users..."
                    className="w-full px-2 py-1 border rounded border-slate-200"
                ></input>
            </div>
            <div>
                {users.map((user) => (
                    <User key={user._id} user={user} />
                ))}
            </div>
        </>
    );
};

function User({ user }) {
    const navigate = useNavigate();

    return (
        <div className="flex justify-between rounded p-3 mb-2 bg-blue-500">
            <div className="flex">
                <div className="rounded-full h-12 w-12 bg-green-400 flex justify-center items-center mr-2">
                    <div className="text-xl">{user.name[0]}</div>
                </div>
                <div className="flex flex-col justify-center">
                    <div>{user.name}</div>
                    <div>{user.id}</div>
                </div>
            </div>
            <div className="flex flex-col justify-center">
                <Button
                    onClick={(e) => {
                        navigate("/payment",{state:{id:user._id,name:user.name}});
                        // console.log(user._id);
                    }}
                    label={"Send Money"}
                    className="bg-blue-500 text-white hover:bg-blue-700"
                />
            </div>
        </div>
    );
}
