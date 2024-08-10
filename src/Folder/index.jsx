// import React from 'react';
import FolderItem from './filderItem'
import {data} from '../data/data'
import { useState } from 'react';
import { useEffect } from 'react';
import useTravasal from '../hook/useTravasal'

const Folder = () => {
    const [allData,setAllData] = useState({}) 
    const {insert,deleteItem,editItem} = useTravasal()
    useEffect(()=>{
        setAllData({...data})
    },[])
   const HandelAdd=( id, item,value,isFolder)=>{
    insert(allData, id, item,value,isFolder)
    }
    const handelDelete=(item)=>{
        deleteItem(allData,item);
        setAllData({...allData})
    }
   const handelEdit=(id,inputVal)=>{
    editItem(allData,id,inputVal)
    }
    return (
        <div className="main">
         {allData.name  &&  <FolderItem handelEdit={handelEdit} handelDelete={handelDelete} HandelAdd={HandelAdd} data={allData}/>}
            </div>
    );
}

export default Folder;
