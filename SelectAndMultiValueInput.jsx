// Select element from drop down and add multiple values through one input box
import React, { useState, useEffect } from 'react'
import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios'

const AddJobDesc = (props) => {
    const url = '/api/AddJobDesc'
    const [response, setResponse] = useState('')
    const [descArr, setDescArr] = useState(['',])
    
    const [data, setData] = useState({desc:''})
    const [currentJob, setcurrentJob] = useState('')

    // this line for selecting element
    const changeFruit = (newFruit) => {
        setcurrentJob(newFruit)
    }

    const [jobs, setJobs] = useState([])
    useEffect(() => {
        axios.get('/api/jobs')
            .then(res => {
                const data = res.data;
                setJobs(data);
            })
    }, [])

    function handleSubmit(e) {
        e.preventDefault();

        axios.post(url, {
            title: data.title,
            posts: data.posts,
            exp: data.experience
        })
            .then(res => {
                setResponse(res.data)
                console.log(res.data)
                setTimeout(function () {
                    setResponse('')
                    props.onHide()
                    window.location.reload(false);
                }, 1200);
            })

    }
    function addArr(){
        setDescArr([...descArr,data.desc])
        // setData('')
        document.getElementById("desc-form").reset();
    }
    function submitArr(){
       
        let descArrList = JSON.stringify(descArr);
        axios.post('/api/AddJobDesc', {
            jobid:currentJob,
            desc:descArrList
        })
            .then(res => {
                setResponse(res.data)
                console.log(res.data)
                setTimeout(function () {
                    setResponse('')
                    props.onHide()
                    // window.location.reload(false);
                }, 1200);
            })

    }
    function handle(e) {
        e.preventDefault()
        const newData = { ...data }
        newData[e.target.id] = e.target.value
        console.log(newData)
        setData(newData)
    }

    return (
        <>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton className='bg-light'>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add Job Description
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='login-modal'>
                    <div className='container-fluid'>
                        <div className='row gy-4'>
                            <h2>Select Job</h2>
                            <div className="col-12 col-md-6">
                                <form>
                                    <select
                                        onChange={(event) => changeFruit(event.target.value)}
                                        value={currentJob}
                                    >
                                        {
                                            jobs.map((val, ind) => {
                                                return (<option value={val.id}>{val.title}</option>)
                                            })
                                        }

                                    </select>
                                </form>
                            </div>
                            <div className="col-12 col-md-6 bg-light">
                                {
                                    descArr.map((item)=>{
                                       return( <label className="desc-job">{item}</label>)
                                    })
                                }
                                
                            </div>
                            <h1 className='text-dark text-center'>Add Job Description</h1>
                            <Form onSubmit={handleSubmit} id="desc-form">
                                <div className="row">
                                    <div className="col-12 col-sm-9">
                                        <Form.Group className="mb-3">
                                            <Form.Control type="text" required onChange={(e) => handle(e)} id="desc" placeholder="Hardworking" />
                                        </Form.Group>
                                    </div>
                                    <div className="col-12 col-sm-2">
                                        <Button variant="info" onClick={()=>addArr()} type="button">
                                            Add
                                        </Button>
                                    </div>
                                </div>

                                <Button variant="primary" onClick={()=>submitArr()} type="button">
                                    Submit
                                </Button>
                            </Form>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>

    )
}

export default AddJobDesc