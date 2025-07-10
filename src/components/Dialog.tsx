import { LoadingOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import React, { useEffect, useState, type ReactNode } from "react";

type TDialog = {
	onOpen?: () => void;
	onConfirm?: () => void;
	onClose?: () => void;

	okButton?: ReactNode;
	cancelButton?: ReactNode;

	style?: React.CSSProperties;
	className?: string;
	children?: ReactNode;
	openButton?: ReactNode;
	title?: ReactNode;
	loading?: boolean;
	footer?: ReactNode | null;
};

const Dialog = ({ okButton = "OK", cancelButton = "Hủy", ...props }: TDialog) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		if (!props.loading && isModalOpen) {
			setIsModalOpen(false);
		}
	}, [props.loading]);

	const showModal = () => {
		setIsModalOpen(true);
		if (props.onOpen) props.onOpen();
	};

	const handleOk = () => {
		if (props.loading) setIsModalOpen(false);
		if (props.onConfirm) props.onConfirm();
	};

	const handleCancel = () => {
		setIsModalOpen(false);
		if (props.onClose) props.onClose();
	};

	const Open = () => {
		return (
			<>
				{props.openButton ? (
					<div onClick={showModal}>{props.openButton}</div>
				) : (
					<Button type="primary" onClick={showModal}>
						Open Modal
					</Button>
				)}
			</>
		);
	};

	return (
		<>
			<Open />
			<Modal
				style={props.style}
				className={props.className}
				centered
				title={props.title}
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
				cancelText={cancelButton}
				okText={props.loading ? <LoadingOutlined /> : okButton}
				okButtonProps={{ disabled: props.loading }}
				footer={props.footer}
			>
				<div className="flex flex-col gap-3 pt-5">{props.children}</div>
			</Modal>
		</>
	);
};

export default Dialog;
