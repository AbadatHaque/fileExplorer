import { useState } from "react";
import { Input, Button, Space, Collapse, Typography } from "antd";
import { FolderOutlined, FileOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "../App.css";

const { Text } = Typography;
const { Panel } = Collapse;

const FolderItem = ({ data, HandelAdd, handelDelete, handelEdit }) => {
    const [isShowAddInput, setIsShowAddInput] = useState(false);
    const [inputVal, setInputVal] = useState("");
    const [inputType, setInputType] = useState("");

    const handelAddFolder = () => {
        setInputType("folder");
        setIsShowAddInput(true);
    };

    const handelAddFile = () => {
        setInputType("file");
        setIsShowAddInput(true);
    };

    const handelOnchange = (e) => {
        setInputVal(e.target.value);
    };

    const handelOnblur = () => {
        setInputVal("");
        setIsShowAddInput(false);
    };

    const handelSubmit = (e) => {
        e.preventDefault();
        if (inputType === "edit") {
            handelEdit(data.id, inputVal);
        } else {
            HandelAdd(data.id, data, inputVal, inputType === "folder");
        }
        handelOnblur();
    };

    return (
        <Collapse defaultActiveKey={[]} ghost>
            <Panel 
                header={
                    <Space>
                        {data.isFolder ? <FolderOutlined style={{ color: "#faad14" }} /> : <FileOutlined style={{ color: "#1890ff" }} />}
                        <Text strong>{data.name}</Text>
                    </Space>
                }
                key={data.id}
            >
                <Space wrap>
                    {data.isFolder && (
                        <>
                            <Button type="primary" icon={<PlusOutlined />} onClick={handelAddFolder}>
                                Add Folder
                            </Button>
                            <Button type="default" icon={<PlusOutlined />} onClick={handelAddFile}>
                                Add File
                            </Button>
                        </>
                    )}
                    <Button type="dashed" icon={<EditOutlined />} onClick={() => setInputType("edit") || setIsShowAddInput(true)}>
                        Edit
                    </Button>
                  { data.id != 1 && <Button danger type="primary" icon={<DeleteOutlined />} onClick={() => handelDelete(data)}>
                        Delete
                    </Button>}
                </Space>

                {isShowAddInput && (
                    <form onSubmit={handelSubmit} style={{ marginTop: "10px" }}>
                        <Input autoFocus type="text" onBlur={handelOnblur} value={inputVal} onChange={handelOnchange} />
                    </form>
                )}

                <div style={{ paddingLeft: "20px", marginTop: "10px" }}>
                    {data.isFolder && data.item.map((item, index) => (
                        <FolderItem key={index} handelEdit={handelEdit} handelDelete={handelDelete} HandelAdd={HandelAdd} data={item} />
                    ))}
                </div>
            </Panel>
        </Collapse>
    );
};

export default FolderItem;