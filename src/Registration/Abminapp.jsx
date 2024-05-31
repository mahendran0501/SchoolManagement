import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

function Abminapp() {
    const [formDate,setformDate]=useState({
        fname:"",
        lname:"",
        email:"",
        dateofbirth:"",
        password:"",
        cpassword:""
    })
    const [error,seterror]=useState({})
    const [valid,setvalid]=useState(true)
    const navigete =useNavigate()

    const handleSubmoit =(e)=>{
        e.preventDefault();
        console.log(formDate)
        let isvalid =true;
        const validationErrors = {};
        if (formDate.fname === "" || formDate.fname === null){
            isvalid =false;
            validationErrors.fname="first name required"
        }
        if (formDate.lname === "" || formDate.lname === null){
            isvalid =false;
            validationErrors.lname="last name required"
        }
        if (formDate.email === "" || formDate.email === null){
            isvalid =false;
            validationErrors.email="Email required"
        }else if(!/\S+@\S+\.\S+/.test(formDate.email)){
            isvalid=false;
            validationErrors.email="Email is not valid"
        }
        if (formDate.dateofbirth=== "" || formDate.dateofbirth === null){
            isvalid =false;
            validationErrors.dateofbirth=" date of birth required"
        }
        if (formDate.password=== "" || formDate.password === null){
            isvalid =false;
            validationErrors.password="password required"
        }else if(formDate.password.length>11){
            isvalid=false;
            validationErrors.email="Password length at least 8 char"
        }
        if (formDate.cpassword !== formDate.password){
            isvalid =false;
            validationErrors.cpassword="c password not match"
        }
        seterror(validationErrors);
        setvalid(isvalid);
        if (Object.keys(validationErrors).length===0){
            axios.post('http://localhost:3000/Abminapp',formDate)
            .then(result => {
                alert("Registered successfully")
                navigete('/')
            })
            .catch(err=> console/log(err ))
        }
        // if (isvalid) {
        //     alert("Registered Successfully");
        // }
    }
    return(<>
      <div className="Abminapp">
        <form className="Abminappbox" onSubmit={handleSubmoit}>
            <div className="d-flex">
                <div>
                    <h1>first name</h1>
                    <input type="text"
                           name="fname"
                           onChange={(e)=>setformDate({...formDate,fname:e.target.value})}/>
                </div>
                <div>
                   <h1>Last name</h1>
                   <input type="text"
                           name="lname"
                           onChange={(e)=>setformDate({...formDate,lname: e.target.value})}/>
                </div>
            </div>
            <h1>Email</h1>
            <input type="text"
                           name="email"
                           onChange={(e)=>setformDate({...formDate,email: e.target.value})}/>
            <h1>DOM</h1>
            <input type="date"
                           name="dateofbirth"
                           onChange={(e)=>setformDate({...formDate,dateofbirth: e.target.value})}/>
            <h1>Passwaed</h1>
            <input type="text"
                           name="password"
                           onChange={(e)=>setformDate({...formDate,password: e.target.value})}/>
            <h1>Comfirm Passwaed</h1>
            <input type="text"
                           name="cpassword"
                           onChange={(e)=>setformDate({...formDate,cpassword: e.target.value})}/><br/><br/>
            <button>Sidnup</button>
            <Link to="/Admin"><button>login</button></Link><br/>
            {
                valid ? <></>:
                <small className="AbminappOutputmessage">
                    {error.fname}
                    {error.lname}
                    {error.dateofbirth}
                    {error.email}
                    {error.password}
                    {error.cpassword}
                </small>
            }
        </form>
      </div>
    </>)
}
export default Abminapp