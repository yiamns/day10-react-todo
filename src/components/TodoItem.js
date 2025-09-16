import { Link } from "react-router-dom";
import React, { useState } from "react";
import { Modal, Input, Button, message } from "antd";
import {useTodoService} from "../useTodoService";
import { EditOutlined } from '@ant-design/icons';


export function TodoItem(props) {
    const item = props.item || props.todo;
    const onToggle = props.onToggle;
    const onDelete = props.onDelete;
    const onEditSuccess = props.onEditSuccess;
    const showDetailLink = props.showDetailLink !== false;
    const noStrikethrough = props.noStrikethrough;
    const hideDelete = props.hideDelete;
    const hideEdit = props.hideEdit;

    const [editVisible, setEditVisible] = useState(false);
    const [editValue, setEditValue] = useState(item ? item.text : "");
    const [loading, setLoading] = useState(false);

    const { updateTodo } = useTodoService();

    const handleEditClick = () => {
        setEditValue(item.text);
        setEditVisible(true);
    };

    const handleEditOk = async () => {
        if (!editValue.trim()) return;
        setLoading(true);
        try {
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
                    style={{ flex: 1 }}
                >
                    {item.text}
                </div>
                <div className="todo-actions">
                    {!hideEdit && (
                        <Button
                            type="default"
                            size="middle"
                            style={{ marginRight: 8 }}
                            onClick={handleEditClick}
                            icon={<EditOutlined />}
                        />
                    )}
                    {!hideDelete && (
                        <button className="danger-btn" onClick={onDelete}>
                            X
                        </button>
                    )}
                    {showDetailLink && (
                        <Link
                            to={`/todos/${item.id}`}
                            className="detail-link"
                            style={{marginLeft: 8}}
                        >
                            Detail
                        </Link>
                    )}
                </div>

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
