import { ChangeEventHandler } from "react"

export type TaskStatus = "in_progress" | "completed" | "pending";
export type ParamValue = string | number | boolean;
export type ParamPair = { key: string; value: ParamValue };
export type ParamInput = ParamPair[] | string[] | { [key: string]: ParamValue };

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  due: string;
  created_at:string;
}

export interface FilterOption {
  value: TaskStatus | "string";
}

export interface EditableInputProps {
  name: string
  type?: 'text' | 'date'
  value: string | number
  readOnly : boolean
  onChange?: ChangeEventHandler<HTMLInputElement>
  className?: string
}