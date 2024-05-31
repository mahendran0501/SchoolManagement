import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

function Teacherapp() {
    const [formDate,setformDate]=useState({
        Fname:"",
        Lname:"",
        Email:"",
        dateofbirth:"",
        gander:"",
        ClassSention:"",
        Subject:"",
        WorkPhoneNumber:"",
        CellPhoneNumber:"",
        Qualification:"",
        Experience:"",
        Address:""
    })
    const [error,seterror]=useState({})
    const [valid,setvalid]=useState(true)
    const navigete =useNavigate()

    const handleSubmoit =(e)=>{
        e.preventDefault();
        console.log(formDate)
        let isvalid =true;
        const validationErrors = {};
        if (formDate.Fname === "" || formDate.Fname === null){
            isvalid =false;
            validationErrors.Fname="first name required"
        }
        if (formDate.Lname === "" || formDate.Lname === null){
            isvalid =false;
            validationErrors.Lname="last name required"
        }
        if (formDate.Email === "" || formDate.Email === null){
            isvalid =false;
            validationErrors.Email="Email required"
        }else if(!/\S+@\S+\.\S+/.test(formDate.Email)){
            isvalid=false;
            validationErrors.Email="Email is not valid"
        }
        if (formDate.dateofbirth=== "" || formDate.dateofbirth === null){
            isvalid =false;
            validationErrors.dateofbirth=" date of birth required"
        }
        if (!formDate.gender){
            isvalid = false;
            validationErrors.gender = "gender required";
        }
        
        if (formDate.ClassSention === "" || formDate.ClassSention === null){
            isvalid =false;
            validationErrors.ClassSention="ClassSention required"
        }
        if (formDate.Subject === "" || formDate.Subject === null){
            isvalid =false;
            validationErrors.Subject="Subject required"
        }
        if (formDate.WorkPhoneNumber === "" || formDate.WorkPhoneNumber === null){
            isvalid =false;
            validationErrors.WorkPhoneNumber="Work Phone Number required"
        }
        if (formDate.CellPhoneNumber === "" || formDate.CellPhoneNumber === null){
            isvalid =false;
            validationErrors.CellPhoneNumber="Cell Phone Number required"
        }
        if (formDate.Qualification === "" || formDate.Qualification === null){
            isvalid =false;
            validationErrors.Qualification="Qualification required"
        }
        if (formDate.Experience === "" || formDate.Experience === null){
            isvalid =false;
            validationErrors.Experience="Experience required"
        }
        if (formDate.Address === "" || formDate.Address === null){
            isvalid =false;
            validationErrors.Address="Address required"
        }
        // if (formDate.password=== "" || formDate.password === null){
        //     isvalid =false;
        //     validationErrors.password="password required"
        // }else if(formDate.password.length>11){
        //     isvalid=false;
        //     validationErrors.email="Password length at least 8 char"
        // }
        // if (formDate.cpassword !== formDate.password){
        //     isvalid =false;
        //     validationErrors.cpassword="c password not match"
        // }
        seterror(validationErrors);
        setvalid(isvalid);
        console.log("Sending request:", formDate);
        if (Object.keys(validationErrors).length === 0) {
            axios.post('http://localhost:3000/Teacherapp', formDate)
                .then(result => {
                    alert("Registered successfully");
                    navigete('/Teacherapp');
                })
                .catch(err => console.log(err));
        }

    }
    return(<>
      <div className="Teacherapp">
        <form className="Teacherappbox" onSubmit={handleSubmoit}>
            <Link to="/Abminpg"><button className="TeacherappBark">X</button></Link>
            <div className="TeacherappRow">
                <div className="TeacherappFirstName">
                    <h1 >first name</h1>
                    <input className="Teacherappinput"  type="text"
                           name="Fname"
                           onChange={(e)=>setformDate({...formDate,Fname:e.target.value})}/>
                </div>
                <div>
                   <h1>Last name</h1>
                   <input type="text"
                   className="Teacherappinput"
                           name="Lname"
                           onChange={(e)=>setformDate({...formDate,Lname: e.target.value})}/>
                </div>
            </div>
            <div className="Teacherappinputheating">
                <h1>Email</h1>
                <input type="text"
                       className="Teacherappinputbox"
                       name="Email"
                       onChange={(e)=>setformDate({...formDate,Email: e.target.value})}/>
            </div>
            <div className="TeacherAppThireeInputRowHeating">
                <div><h1>DOM</h1>
                <input type="date"
                        className="Teacherappinputbox"
                        name="dateofbirth"
                        onChange={(e)=>setformDate({...formDate,dateofbirth: e.target.value})}/>
                </div>
                <div className="TeacherAppGender">
                   <h1>Gender</h1>
                   <label>
                        <input type="radio"
                            name="gender"
                            value="male"
                            onChange={(e) => setformDate({...formDate, gender: e.target.value})}/>
                        Male
                    </label>
                    <label>
                        <input type="radio"
                            name="gender"
                            value="female"
                            onChange={(e) => setformDate({...formDate, gender: e.target.value})}/>
                         Female
                    </label>
</div>

                <div><h1>class section</h1>
                <select name="ClassSection" 
                           onChange={(e)=>setformDate({...formDate,ClassSention: e.target.value})}>
                    <option value="A1">A1</option>
                    <option value="A2">A2</option>
                    <option value="B1">B1</option>
                    <option value="B2">B2</option>
                    <option value="C1">C1</option>
                    <option value="C2">C2</option>
                    <option value="C3">C3</option>
                    <option value="D1">D1</option>            
                </select>
                </div>
                <div>
                   <h1>Subject</h1>
                   <input type="text"
                           name="Subject"
                           className="TeacherAddSubject"
                           onChange={(e)=>setformDate({...formDate,Subject: e.target.value})}/>
                </div>
            </div>
            <div>
                <h1>Content No</h1>
                <div className="TeacherappRow">
                    <div className="TeacherappFirstName">
                        <h1>Work Phone Number</h1>
                        <input type="text"
                        className="Teacherappinput"
                            name="WorkPhoneNumber"
                            onChange={(e)=>setformDate({...formDate,WorkPhoneNumber: e.target.value})}/>
                    </div>
                    <div>
                        <h1>Cell Phone Number</h1>
                        <input type="text"
                            name="CellPhoneNumber"
                            className="Teacherappinput"
                            onChange={(e)=>setformDate({...formDate,CellPhoneNumber: e.target.value})}/>
                    </div>
                </div>
            </div>
            <div className="Teacherappinputheating">    
            <h1>Qualification</h1>
                <input type="text"
                        name="Qualification"
                        className="Teacherappinputbox"
                        onChange={(e)=>setformDate({...formDate,Qualification: e.target.value})}/>
            </div>
            <div className="Teacherappinputheating">
                <h1>Experience</h1>
                <input type="text"
                        name="Experience"
                        className="Teacherappinputbox"
                        onChange={(e)=>setformDate({...formDate,Experience: e.target.value})}/>
            </div>
            <div className="Teacherappinputheating">
                <h1>Address</h1>
                <input type="text"
                        name="Address"
                        className="Teacherappinputbox"
                        onChange={(e)=>setformDate({...formDate,Address: e.target.value})}/>
            </div>
            <button className="TeacherAppButton">Submit</button>
            {
                valid ? <></>:
                <small className="TeacherappOutputmessage">
                    {error.Fname}
                    {error.Lname}
                    {error.dateofbirth}
                    {error.Email}
                    {error.gander}
                    {error.ClassSention}
                    {error.Subject}
                    {error.WorkPhoneNumber}
                    {error.CellPhoneNumber}
                    {error.Qualification}
                    {error.Experience}
                    {error.Address}
                </small>
            }
        </form>
      </div>
    </>)
}
export default Teacherapp