import './adminheader.css'
import logo from '../Home/images/logo.png'
import { useNavigate } from 'react-router-dom'

const Adminheader =(()=>{
    const navigate  = useNavigate()
    return(
        <>
           <div className="admin-header">
                 <img src={logo} alt='logo'/>
                 <div className='nav-section'>
                    <p onClick={()=>{navigate('/admincustomer')}}>Customers</p>
                    <p onClick={()=>{navigate('/inventory')}}>Inventory</p>
                    <p onClick={()=>{navigate('/product')}}>Products</p>
                    <p onClick={()=>{navigate('/adminorders')}}>Orders</p>
                    <p onClick={()=>{navigate('/adminfeedback')}}>Feedback</p>
                 </div>
           </div>
        </>
    )
})
export default Adminheader