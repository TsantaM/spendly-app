"use client"

import { Button } from '@/src/components/ui/components/button'
import './components.css'
import ToggleTheme from '@/src/components/ui/components/toogleTheme';
import Input, { DatePickerInput, Textarea } from '@/src/components/ui/components/input';
import { useForm } from 'react-hook-form';
import {z} from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import Link from "next/link"
import { ToastContainer, toast } from 'react-toastify';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

const testSchema = z.object({
    email: z.string().email('Entrez un email'),
    text: z.string().min(1, 'Entrez quelque chose tout de même'),
    date: z.date().refine(date => date <= new Date(), {
        message: "La date ne peut pas être dans le futur",})
    })

type schema = z.infer<typeof testSchema>

export default function ComponentsLib() {


    const { register, handleSubmit, control } = useForm<schema>({
        resolver: zodResolver(testSchema)
    });

    const onSubmit = (data: schema) => {

        toast(`Email : ${data.email} Message : ${data.text} Date: ${format(data.date, 'dd/MM/yyyy')}`, {
            className: 'toast',
            draggable: true
        })

        console.log(data.date);
    }


    const clickTest = () => {
        toast.info('Bonsoir !',{
            className: 'toast',
            draggable: true
        })
        toast.error('Bonsoir !',{
            className: 'toast',
            draggable: true
        });
        toast.warn('Bonsoir !',{
            className: 'toast',
            draggable: true
        })
        toast.success('Bonsoir !',{
            className: 'toast',
            draggable: true
        })
    }

    return (
        <>
            
            <section id="buttons">
                <div className="container">
                    <ToggleTheme/>
                    <Button content='Primary' event={clickTest}/>
                    <Button content='Secondary' event={clickTest} variant='secondary'/>
                    <Button content='Destructive' event={clickTest} variant='destructive'/>
                    <Button content={<Link href='/'>Acceuil</Link>} variant='ghost'/>
                </div>

            </section>
        
            <section id='inputs'>
                <form action="" onSubmit={handleSubmit(onSubmit)} className='form'>
                    <Input placeholder={'Your e-mail'} type='email' register={register('email')}/>

                    <DatePickerInput
                        control={control}
                        name='date'
                        classes='dater'
                    />

                    <Textarea placeholder='Votre message' register={register('text')}/>
                    <Button content='Envoyer' variant='secondary'/>
                </form>
            </section>
            <ToastContainer />

        </>
    )
}