"use client"

import '../style/input.css'
import type { Control, UseFormRegisterReturn } from "react-hook-form";
import React from 'react';
import { Controller, FieldValues, FieldPath } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


type inputType = 'text' | 'email' | 'password' | "number"

type InputProps = {
    type: inputType,
    placeholder: string,
    register: UseFormRegisterReturn,
    classes?: string | null
}

type DateFormat =
  | 'dd/MM/yyyy'
  | 'MM/dd/yyyy'
  | 'yyyy/MM/dd'
  | 'dd-MMM-yyyy'
  | 'MMMM dd, yyyy'
  | 'EEEE, MMMM dd, yyyy';


type Textarea_type = {
    placeholder: string,
    register: UseFormRegisterReturn,
    classes?: string | null,
    content?: string
}

type datePickerProps<T extends FieldValues> = {
    name: FieldPath<T>,
    dateFormat?: DateFormat,
    placeholder?: string
    control: Control<T>,
    classes?: string
}

export default function Input({ type, placeholder, register, classes }: InputProps) {
    return (
        <input className={`input_form ${classes ? classes : ''}`} type={type} placeholder={placeholder} {...register} />
    )
}

export function Textarea({ placeholder, register, classes, content }: Textarea_type) {
    return (
        <textarea className={`textarea ${classes ? classes : ''}`} placeholder={placeholder} {...register}>{content}</textarea>
    )
}

export function DatePickerInput<T extends FieldValues>({ classes, control, name, dateFormat = "dd/MM/yyyy", placeholder = "Sélectionnez une date SVP" }: datePickerProps<T>) {

    return (

            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <DatePicker
                        {...field}
                        selected={field.value}
                        onChange={(date) => field.onChange(date)}
                        dateFormat={dateFormat}
                        placeholderText={placeholder}
                        wrapperClassName={`datepicker ${classes}`}
                    />
                )}
            />
    )
}
