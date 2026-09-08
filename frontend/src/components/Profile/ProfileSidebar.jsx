import React from 'react'
import { useNavigate } from 'react-router-dom'
import { RxPerson } from 'react-icons/rx'
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from 'react-icons/hi'
import { AiOutlineMessage } from 'react-icons/ai'
import { MdOutlineTrackChanges } from 'react-icons/md'
import { AiOutlineCreditCard } from 'react-icons/ai'
import { TbAddressBook } from 'react-icons/tb'
import { AiOutlineLogin } from 'react-icons/ai'
const ProfileSideBar = ({setActive,active}) => {
    const navigate = useNavigate() 
  return (
    <div>
        <div className="" onClick={()=>setActive(1)}>
          <RxPerson size={24} color={active === 1 ? "red" : ""}/>
          <span>Profile</span>
        </div>
         <div className="" onClick={()=>setActive(1)}>
          <HiOutlineShoppingBag size={24} color={active === 2 ? "red" : ""}/>
          <span>Orders</span>
        </div>
         <div className="" onClick={()=>setActive(3)}>
          <HiOutlineReceiptRefund size={24} color={active === 3 ? "red" : ""}/>
          <span>Refunds</span>
           <div className="" onClick={()=>setActive(4)||navigate("/inbox")}>
          <AiOutlineMessage size={24} color={active === 4 ? "red" : ""}/>
          <span>Inbox</span>
        </div>
        <div className="" onClick={()=>setActive(5)}>
          <MdOutlineTrackChanges size={24} color={active === 5 ? "red" : ""}/>
          <span>Track Order</span>
        </div>
        <div className="" onClick={()=>setActive(6)}>
          <AiOutlineCreditCard size={24} color={active === 6 ? "red" : ""}/>
          <span>Payment Methods</span>
        </div>
        <div className="" onClick={()=>setActive(7)}>
          <TbAddressBook size={24} color={active === 7 ? "red" : ""}/>
          <span>Address</span>
        </div>
        <div className="" onClick={()=>setActive(8)}>
          <AiOutlineLogin size={24} color={active === 8 ? "red" : ""}/>
          <span>Log Out</span>
        </div>
        </div>
    </div>
  )
}

export default ProfileSideBar