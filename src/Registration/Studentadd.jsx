import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

function Studentadd() {
    const [formDate,setformDate]=useState({
        Fname:"",
        Lname:"",
        Standar:"",
        ClassSention:"",
        RollNo:"",
        FathersName:"",
        MothersName:"",
        Email:"",
        dateofbirth:"",
        gander:"",
        PhoneNumber:"",
        EmergencyMobileNumber:"",
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
        if (formDate.FathersName === "" || formDate.FathersName === null){
            isvalid =false;
            validationErrors.FathersName="Father's Name name required"
        }
        if (formDate.MothersName === "" || formDate.MothersName === null){
            isvalid =false;
            validationErrors.MothersName="Mother's Name name required"
        }
        if (formDate.Standar === "" || formDate.Standar === null){
            isvalid =false;
            validationErrors.Standar="Standar required"
        }
        if (formDate.ClassSention === "" || formDate.ClassSention === null){
            isvalid =false;
            validationErrors.ClassSention="ClassSention required"
        }
        if (formDate.RollNo === "" || formDate.RollNo === null){
            isvalid =false;
            validationErrors.RollNo="ClassSention required"
        }
        if (formDate.dateofbirth=== "" || formDate.dateofbirth === null){
            isvalid =false;
            validationErrors.dateofbirth=" date of birth required"
        }
        if (!formDate.gender){
            isvalid = false;
            validationErrors.gender = "gender required";
        }
        if (formDate.PhoneNumber === "" || formDate.PhoneNumber === null){
            isvalid =false;
            validationErrors.PhoneNumber="Phone Number required"
        }
        if (formDate.EmergencyMobileNumber === "" || formDate.EmergencyMobileNumber === null){
            isvalid =false;
            validationErrors.EmergencyMobileNumber="Emergency MobilevNumber required"
        }

        if (formDate.Address === "" || formDate.Address === null){
            isvalid =false;
            validationErrors.Address="Address required"
        }
        seterror(validationErrors);
        setvalid(isvalid);
        console.log("Sending request:", formDate);
        if (Object.keys(validationErrors).length === 0) {
            axios.post('http://localhost:3000/Studentapp', formDate)
                .then(result => {
                    alert("Registered successfully");
                    window.location.reload();
                    navigete('/Studentapp');
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
                    <input type="text"
                           name="Fname"
                           onChange={(e)=>setformDate({...formDate,Fname:e.target.value})}
                           className="TeacherappInput"/>
                </div>
                <div>
                   <h1>Last name</h1>
                   <input type="text"
                           className="TeacherappInput"
                           name="Lname"
                           onChange={(e)=>setformDate({...formDate,Lname: e.target.value})}/>
                </div>
            </div>
            <div className="TeacherappRow">
              <div><h1>Standard</h1>
                <select name="Standard" 
                           onChange={(e)=>setformDate({...formDate,Standar: e.target.value})}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option> 
                    <option value="10">10</option>            
                </select>
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
                    <h1>Roll No</h1>
                    <input type="text"
                           name="Fname"
                           onChange={(e)=>setformDate({...formDate,RollNo:e.target.value})}
                           className="TeacherappInput"/>
                </div>
            </div>
            <div className="TeacherappRow">
                <div>
                   <h1>Father's Name</h1>
                   <input type="text"
                           className="TeacherappInput"
                           name="Lname"
                           onChange={(e)=>setformDate({...formDate,FathersName: e.target.value})}/>
                </div>
                <div>
                   <h1>Mother's Name</h1>
                   <input type="text"
                           className="TeacherappInput"
                           name="Lname"
                           onChange={(e)=>setformDate({...formDate,MothersName: e.target.value})}/>
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
                        <small className="TeacherAppGendertext">Male</small>
                    </label>
                    <label>
                        <input type="radio"
                            name="gender"
                            value="female"
                            onChange={(e) => setformDate({...formDate, gender: e.target.value})}/>
                         <small className="TeacherAppGendertext">Female</small>
                    </label>
                </div>
                </div>
            <div>
                <div className="TeacherappRow">
                    <div>
                        <h1>Phone Number</h1>
                        <input type="text"
                            className="TeacherappInput"
                            name="CellPhoneNumber"
                            onChange={(e)=>setformDate({...formDate,PhoneNumber: e.target.value})}/>
                    </div>
                    <div>
                        <h1>Emergency Mobile Number</h1>
                        <input type="text"
                            name="PhoneNumber"
                            className="TeacherappInput"
                            onChange={(e)=>setformDate({...formDate,EmergencyMobileNumber: e.target.value})}/>
                    </div>
                </div>
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
                    {error.Standar}
                    {error.ClassSention}
                    {error.RollNo}
                    {error.FathersName}
                    {error.MothersName}
                    {error.Email}
                    {error.dateofbirth}
                    {error.gander}
                    {error.ClassSention}
                    {error.PhoneNumber}
                    {error.EmergencyMobileNumber}
                    {error.Address}
                </small>
            }
        </form>
      </div>
    </>)
}
export default Studentadd