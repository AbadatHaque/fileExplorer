/* eslint-disable react/prop-types */
import { useState } from "react";
// import reactLogo from './assets/react.svg'
import folderLogo from '../assets/folder.png'
import fileLogo from '../assets/file.png'
import '../App.css'


const FolderItem = ({data,HandelAdd,handelDelete,handelEdit}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [isShowAddInput, setISShowAddInput] = useState(false)
    const [inputVal, setInputVal] = useState('')
    const [inputType,setInputType] = useState('')
    const handelClick=()=>{
        setIsOpen(!isOpen)
    }
    const handelAddFolder=()=>{
        setInputType('folder')
        setISShowAddInput(true)
    }
    const handelAddFile=()=>{
        setInputType('file')
        setISShowAddInput(true)
    }
    const handelOnchange=(e)=>{
        setInputVal(e.target.value)
    }
   const handelOnblur=()=>{
       setInputVal('')
       setISShowAddInput(false)
    }
    const handelSubmit=(e)=>{
        e.preventDefault()
        if(inputType === 'edit'){
            handelEdit(data.id,inputVal)
        }else{
            HandelAdd(data.id,data,inputVal,inputType ==='folder')
        }
       handelOnblur()
    }
    const deleteFn=()=>{
        handelDelete(data)
    }
    const editFn=()=>{
        setInputType('edit')
        setISShowAddInput(true)
    }

    return (
        < >
            <div className="container">
             <img style={{width:'20px', height:'20px', paddingLeft:'5px'}} src={data.isFolder ? folderLogo : fileLogo} alt="logo" />
            <span  onClick={handelClick}>{data.name}</span>
            {  data.isFolder &&<><button className="actionBtn" onClick={handelAddFolder} type="button">AddFolder</button>
            <button className="actionBtn" onClick={handelAddFile} type="button">AddFile</button></>}
            <button style={{backgroundColor:'yellow'}} className="actionBtn"  onClick={editFn}>Edit </button>
            <button style={{backgroundColor:'red'}} className="actionBtn"  onClick={deleteFn}>Delete </button>
            </div>
            {isShowAddInput &&  <form onSubmit={handelSubmit}> <input autoFocus type="text" onBlur={handelOnblur} value={inputVal} onChange={handelOnchange} /> </form>}
            <div  style={{paddingLeft:'15px'}}>
            {
               isOpen && data.isFolder && data.item.map((item,index)=>( 
                <span  style={{paddingLeft:'15px'}} key={index}><FolderItem handelEdit={handelEdit} handelDelete={handelDelete} HandelAdd={HandelAdd} data={item}/></span>
               ))           
                }
            </div>
        </>
    );
}

export default FolderItem;
