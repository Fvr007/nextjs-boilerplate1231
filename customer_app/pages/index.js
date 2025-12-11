"use client";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import "../styles.css";

export default function Home(){
  const [orders,setOrders]=useState([]);
  useEffect(()=>{
    const unsub = onSnapshot(collection(db,"orders"),snap=>{
      setOrders(snap.docs.map(d=>({id:d.id,...d.data()})));
    });
    return ()=>unsub();
  },[]);
  const finish = async(id)=>{ await deleteDoc(doc(db,"orders",id)); };
  return (
    <div className="container">
      <h1>Shabu Grill — หน้าเชฟ</h1>
      <div style={{display:"grid",gap:12}}>
        {orders.length===0 ? <div className="card">ยังไม่มีออเดอร์</div> : orders.map(o=>(
          <div className="card" key={o.id}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div>
                <div style={{fontWeight:900}}>โต๊ะ {o.table}</div>
                <div className="small">เวลา: {o.time?.toDate ? o.time.toDate().toLocaleString() : ""}</div>
              </div>
              <div>
                <button className="btn" onClick={()=>finish(o.id)}>เสร็จแล้ว</button>
              </div>
            </div>
            <div style={{marginTop:10}}>
              {o.items?.map((it,idx)=> <div key={idx} style={{padding:6,borderBottom:"1px dashed #eee"}}>{it.name} - ฿{it.price}</div>)}
              <div style={{marginTop:8,fontWeight:800}}>รวม ฿{o.total}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
