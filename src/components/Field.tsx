import { Form, Input } from "antd";
import type { ReactNode } from "react";
import { Controller, type Control, type FieldError, type FieldValues, type Path } from "react-hook-form";

type Props<T extends FieldValues> = {
	isInvalid?: FieldError|boolean;
	message?: string;
	control: Control<T>;
	name: Path<T>;
	label?: ReactNode;
	children?: (field: {
		value: any;
		onChange: (...args: any[]) => void;
		onBlur: () => void;
		ref: React.Ref<any>;
		name: string;
	}) => React.ReactElement;
	style?: React.CSSProperties;
	className?: string;
};

const Field = <T extends FieldValues>({
	isInvalid,
	message,
	control,
	name,
	label,
	children,
	style,
	className,
}: Props<T>) => {
	return (
		<Form.Item validateStatus={isInvalid ? "error" : ""} help={message} className={className} style={style}>
			<Controller
				name={name}
				control={control}
				render={({ field }) => (
					<label
						htmlFor={name}
						className={`flex flex-col gap-2 font-semibold ${isInvalid ? "text-red-500" : ""}`}
					>
						{label}
						<div className="contents !font-normal">
							{children ? (
								children(field)
							) : (
								<Input {...field} type="text" allowClear id={name} />
							)}
						</div>
					</label>
				)}
			/>
		</Form.Item>
	);
};

export default Field;
