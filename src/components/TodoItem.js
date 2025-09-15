import { Link } from "react-router-dom";
import React, { useState } from "react";
import { Modal, Input, Button, message } from "antd";
import {useTodoService} from "../useTodoService";

export function TodoItem(props) {
    const item = props.item || props.todo;
    const onToggle = props.onToggle;
    const onDelete = props.onDelete;
    const onEditSuccess = props.onEditSuccess; // 新增，编辑成功后回调
    const showDetailLink = props.showDetailLink !== false;
    const noStrikethrough = props.noStrikethrough;

    const [editVisible, setEditVisible] = useState(false);
    const [editValue, setEditValue] = useState(item ? item.text : "");
    const [loading, setLoading] = useState(false);

    const { updateTodo } = useTodoService();

    // 打开编辑弹窗
    const handleEditClick = () => {
        setEditValue(item.text);
        setEditVisible(true);
    };

    // 确认编辑，发送请求
    const handleEditOk = async () => {
        if (!editValue.trim()) return;
        setLoading(true);
        try {
            // 只更新 text，done 保持原值
            await updateTodo(item.id, { text: editValue.trim(), done: item.done });
            message.success("Todo updated!");
            setEditVisible(false);
            if (onEditSuccess) onEditSuccess(item.id, editValue.trim());
        } catch (err) {
            message.error("Update failed!");
        } finally {
            setLoading(false);
        }
    };

    // 取消编辑
    const handleEditCancel = () => {
        setEditVisible(false);
    };

    if (item) {
        const textClass = item.done
            ? noStrikethrough
                ? "todo-text"
                : "todo-text todo-done"
            : "todo-text";

        return (
            <div className="todo-row">
                <div
                    className={textClass}
                    onClick={onToggle}
                >
                    {item.text}
                </div>
                <button className="danger-btn" onClick={onDelete}>
                    X
                </button>
                <Button
                    type="default"
                    size="small"
                    style={{ marginLeft: 8 }}
                    onClick={handleEditClick}
                >
                    Edit
                </Button>
                {showDetailLink && (
                    <Link to={`/todos/${item.id}`} style={{marginLeft: 8}}>Detail</Link>
                )}

                <Modal
                    title="Edit Todo"
                    open={editVisible}
                    onOk={handleEditOk}
                    onCancel={handleEditCancel}
                    okText="OK"
                    cancelText="Cancel"
                    confirmLoading={loading}
                    footer={[
                        <Button key="cancel" onClick={handleEditCancel}>
                            Cancel
                        </Button>,
                        <Button key="ok" type="primary" loading={loading} onClick={handleEditOk}>
                            OK
                        </Button>,
                    ]}
                >
                    <Input
                        value={editValue}
                        onChange={e => setEditValue(e.target.value)}
                        placeholder="Edit todo content"
                    />
                </Modal>
            </div>
        );
    }
}
