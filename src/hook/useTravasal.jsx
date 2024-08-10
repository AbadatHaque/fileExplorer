
const useTravasal = () => {

    const insert=(tree, id, item,value,isFolder)=>{
        if(tree.id == item.id){
            const obj ={
                  name:value,
                  isFolder,
                  id:new Date().toString(),
                  item:isFolder? []: undefined
            }
            tree.item.unshift(obj)
            return true
        }
        tree.isFolder &&  tree.item.forEach((ite)=>{
            insert(ite, id, item,value,isFolder)
        })
    }

    const deleteItem=(tree,item,parentRef={},ind=0, )=>{
        if(tree.id === item.id){
            parentRef?.item ?  parentRef.item.splice(ind,1) : clearObj(tree);
            return true
        }
        tree.isFolder &&  tree.item.forEach((ite,index)=>{
            deleteItem(ite, item,tree,index )
        })
    }

    const clearObj=(obj)=>{
        for (var key in obj) {
              delete obj[key];
          }
    }

    const editItem=(data,id,value)=>{
        if(data.id == id){
            data.name= value;
            return true
        }
        data.isFolder && data.item.forEach((item)=>{
            editItem(item,id,value)
        })
    }

    return {insert,deleteItem,editItem}
}

export default useTravasal;
