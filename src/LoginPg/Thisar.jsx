import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Loginpg.css'
function Thisar() {
    const [formData, setFormData] = useState({
        fname: '',
        dob: ''
    });
    const [error, setError] = useState({});
    const [valid, setValid] = useState(true);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        let isValid = true;
        let validationErrors = {};

        if (formData.fname.trim() === "") {
            isValid = false;
            validationErrors.fname = "First name required";
        }
        if (formData.dob.trim() === "") {
            isValid = false;
            validationErrors.dob = "Date of birth required";
        }

        if (isValid) {
            axios.get('http://localhost:3000/Teacherapp')
                .then(response => {
                    const admins = response.data;
                    const admin = admins.find(admin => admin.Fname === formData.fname && admin.dateofbirth === formData.dob);
                    if (admin) {
                        alert("Login successful");
                        navigate('/Teacherpg');
                    } else {
                        isValid = false;
                        validationErrors.dob = "Wrong date of birth";
                        setError(validationErrors);
                        setValid(isValid);
                    }
                })
                .catch(err => console.log(err));
        } else {
            setError(validationErrors);
            setValid(isValid);
        }
    };

    return (
        <div className="teacherLogin">
            <form className="LoginBox" onSubmit={handleSubmit}>
                <h2 className="TeacherInputHeating">Name</h2>
                <input
                    type="text"
                    name="name"
                    className="LoginInput" 
                    value={formData.fname} 
                    onChange={(e) => setFormData({ ...formData, fname: e.target.value })}/>
                {error.fname && <p className="ererrMessega">{error.fname}</p>}
                <h2 className="TeacherInputHeating">DOB</h2>
                <input
                    type="date" 
                    name="dob"
                    className="LoginInput" 
                    value={formData.dob} 
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}/>
                {error.dob && <p className="ererrMessega">{error.dob}</p>} 
                <div className="d-flex">
                    <Link to="/"><button className="BackButton">Bark</button></Link>
                    <button type="submit" className="LoginButton">Login</button>
                </div>
            </form>
        </div>
    );
}

export default Thisar;
