import './Agenda.css'

import { ScheduleComponent,Inject, Day,Week,Month} from "@syncfusion/ej2-react-schedule"

import {DataManager, WebApiAdaptor} from '@syncfusion/ej2-data'

import { useNavigate } from 'react-router-dom'

import { useState,useEffect } from "react"

import { getEvents, saveEvents } from "../../services/eventServices"

export default function Agenda(){

    const navigate = useNavigate();

    let [events,setEvents] = useState([])

    useEffect(()=>{
        getEvents().then(eventsJSON=>{
            setEvents(eventsJSON? eventsJSON:[]);
            console.log(eventsJSON)
        }).catch(err=>{
            navigate('/404')
        })
    },[])

    const onSaveEvent = ()=>{
        console.log(events)
        saveEvents(JSON.stringify(events)).then(()=>{
            alert('Заназено!')
        }).catch(err=>{
            alert('Неуспешно запазване, моля опитайте по- късно!')
        })
    }

    return (
        <>
    <ScheduleComponent eventSettings={{dataSource:events}} >
        <Inject services={[Day,Week,Month]} />
    </ScheduleComponent>
    <section className="save-events">
        <p>Не забравяй да запазиш промените по своята програма!</p>
        <button onClick={onSaveEvent}>Запази</button>
    </section>
        </>
    )
}