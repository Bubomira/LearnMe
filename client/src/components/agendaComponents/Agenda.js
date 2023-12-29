import './Agenda.css'

import { ScheduleComponent,Inject, Day,Week,Month } from "@syncfusion/ej2-react-schedule"

import { useNavigate } from 'react-router-dom'

import { useState,useEffect } from "react"

import { getEvents, saveEvents } from "../../services/eventServices"

export default function Agenda(){

    const navigate = useNavigate();

    let [events,setEvents] = useState([])

    useEffect(()=>{
        getEvents().then(eventsJSON=>{
            setEvents(eventsJSON);
        }).catch(err=>{
            navigate('/404')
        })
    },[])

    const onSaveEvent = ()=>{
        saveEvents(JSON.stringify(events)).then(()=>{
            alert('Saved!')
        }).catch(err=>{
            alert('Unable to save changes. Try again later!')
        })
    }

    return (
        <>
    <ScheduleComponent eventSettings={{dataSource:events}} >
        <Inject services={[Day,Week,Month]} />
    </ScheduleComponent>
    <section className="save-events">
        <p>Do not forget to save the changes to your agenda!</p>
        <button onClick={onSaveEvent}>Save</button>
    </section>
        </>
    )
}