import './Homepg.css';

function Content(){
    return (
        <>
           <div className="Contentbackground" id="Contact">
               <h1>Content us</h1>
               <div className="ContactUs">
              <div>
                <h3 className="ContactHeating">Contact Info</h3>
                <h3 className="ContactDetail">Address : Edu School, 10001, 5th Avenue, #06 <br/>lane street, NY - 62617.</h3>
                <h3 className="ContactDetail">Phone Number : +1(21) 234 4567</h3>
                <h3 className="ContactDetail">Email : info@example.com</h3>
            </div>
            <div>
                <h3 className="ContactHeating">Quick Links</h3>
                <h3 className="ContactDetail">About Us</h3>
                <h3 className="ContactDetail">Achievements</h3>
                <h3 className="ContactDetail">Contact us</h3>
                <h3 className="ContactDetail">Login</h3>
            </div>
            <div>
                <h3 className="ContactHeating">Socil Media</h3>
                <div>
                    <img src="https://i.ibb.co/F7Zt623/fb.png" className="Contacticon"/>
                    <small className="ContactDetail">facebook.com</small>
                </div>
                <div>
                    <img src="https://i.ibb.co/QHCWJZm/linkedin.png" className="Contacticon"/>
                    <small className="ContactDetail">Linkedln.com</small>
                </div>
                <div>
                    <img src="https://i.ibb.co/PW7Tbcm/twitter.png" className="Contacticon"/>
                    <small className="ContactDetail">Twitter.com</small>
                </div>
                <div>
                    <img src="https://i.ibb.co/GVYPKPJ/youtube.png" className="Contacticon"/>
                    <small className="ContactDetail">youtube.com</small>
                </div>
            </div>
            <div>
                <h3>Subscribe</h3>
                <input type="emeil" className="ContactinputBox"/>
                <h3 className="ContactDetail">Subscribe to our mailing list and get updates to your email inbox.</h3>
            </div>
        </div>
    </div>
    </>
    )
}

export default Content;
