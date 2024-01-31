import './footer.css'

const Footer =(()=>{
    return(
        <>
            <div className="footer-con">
                <div className="footer-sub-con">
                    <div className="quicklinks">
                        <h1>QUICK LINKS</h1>
                        <div>About us</div>
                        <div>Sarees</div>
                        <div>Collections</div>
                        <div>Gift Vouchers</div>
                    </div>
                    <div className="policies">
                        <h1>POLICIES</h1>
                        <a>Shipping policy</a>
                        <a>Privacy policy</a>
                        <a>Return & Exchange policy</a>
                        <a>Customs, Duties and Taxes</a>
                        <a>Term & Conditions</a>
                        <a>Disclaimer</a>
                        
                    </div>
                    <div className="letushelp">
                        <h1>LET US HELP YOU</h1>
                        <a>Help/FAQ’s</a>
                        <a>Store Locator</a>
                        <a>Track Order</a>
                        <a>Contact Customer Care</a>
                        
                    </div>
                    <div className="newsletter">
                        <h1>NEWS LETTER</h1>
                        <a>Subscribe to get the latest news from the world of sarees.</a>
                        <input placeholder='enter your email id'/>
                    </div>
                </div>
              
            </div>
        </>
    )
})
export default Footer