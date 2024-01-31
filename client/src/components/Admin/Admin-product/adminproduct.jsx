import Adminheader from "../adminheader"
import './adminproduct.css'
import view from '../images/view.png'
import deleteicon from '../images/delete.png'

const Adminproduct =(()=>{
    return(
        <>
           <Adminheader/>
           <div className="adminproduct">
                  <h1>Orders</h1>
                  <div className="orders-list">
                        <table>
                            <tr>
                                <th>Name</th>
                                <th>Items</th>
                                <th>Order Date</th>
                                <th>Delivery date</th>
                                <th>Order ID</th>
                                <th>Action</th>
                            </tr>
                            <tr>
                                <td>Janaki</td>
                                <td>2</td>
                                <td>20/04/2023</td>
                                <td>26/04/2023</td>
                                <td>908765356</td>
                                <td className="action">
                                    <img src={view} alt="view"/>
                                    <img src={deleteicon} alt="delete"/>
                                </td>
                            </tr>
                        </table>
                  </div>
           </div>
        </>
    )
})
export default Adminproduct