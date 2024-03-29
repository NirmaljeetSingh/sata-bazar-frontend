import {React, useEffect, useState} from 'react';
import axios from "axios";
import { Navigate } from "react-router-dom"
import { Table, Nav ,Spinner, Modal, Button, Form} from 'react-bootstrap'
import Moment from 'moment';
// import DateTimePicker from 'react-datetime-picker';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import config from '../config'


const AddNewData = (props) => {
    const [isLoading,setisLoading] = useState(false);
    const [sattaList, setSattaList] = useState([])
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState(' ');
    const [resultDate, setResultDate] = useState(new Date());
    const [resultA, setResultA] = useState('');
    const [resultB, setResultB] = useState('');
    const [resultC, setResultC] = useState('');

    // const URL = 'http://localhost:3003'
    // const URL = 'https://satta-backend.herokuapp.com'
    // const URL = 'https://44.207.30.122:8000'
    const URL = config.apiUrl
    
  const sattaAdd = async (e) => {
    //   e.preveventDefault();
        setisLoading(true);
      e.preventDefault();
      let submit_data = {
        title : title,
        description : description,
        resultDate : Moment(resultDate).utc().format(),
        resultA : resultA,
        resultB : resultB,
        resultC : resultC
      };
      let token = localStorage.getItem('loginToken')
    const headers = {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        'token': token,
      }
      console.log(headers);
      console.log(submit_data);
      await axios.post(URL+'/api/admin/satta',submit_data,{
          headers
      }).then((data) => {
        setisLoading(false)
        console.log(data);
        if(data.status == 202)
        {
            alert(data.data.message);
            return false;
        }
        alert(data.data.message || 'Some error !!');
        window.location.href = '/home'
      }).catch((er) => {
          console.log('error ',er);
          setisLoading(false)
        alert('Somthing went wrong !!');
      })
  }
  useEffect(() => {
    // getList();
    let token = localStorage.getItem('loginToken')
    if(!token)
    {
        window.location.href = '/login'
    }
  },[])
  return (
      <>
        <div className='container mt-3 admin-pages'>
            <div className='row'>
                <div className='col-md-12'>
                    <form onSubmit={sattaAdd}>
                        <div className="mb-3 mt-3">
                            <label >Title</label>
                            <input type="text" className="form-control"  placeholder="Enter Title" name="title" onChange={(e) => setTitle(e.target.value)}/>
                        </div>
                        {/* <div className="mb-3 mt-3">
                            <label >Description</label>
                            <textarea className="form-control"  placeholder="Enter Title" name="Description" onChange={(e) => setDescription(e.target.value)}></textarea>
                        </div> */}
                        <div className="mb-3 mt-3">
                            <label >Result Date:</label>
                            <DatePicker 
                                showTimeSelect
                                name="date"
                                className={'form-control'}
                                timeIntervals={20}
                                onChange={(date) => { 
                                    console.log(date);
                                    setResultDate(Moment(date).format('YYYY/MM/DD hh:mm A')) }} value={resultDate} />
                        </div>
                        <div className="mb-3 mt-3">
                            <label >Result A</label>
                            <input type="number" className="form-control"  placeholder="Result A" name="resultA" onChange={(e) => setResultA(e.target.value)} value={resultA}/>
                        </div>
                        <div className="mb-3 mt-3">
                            <label >Result B:</label>
                            <input type="number" className="form-control"  placeholder="Result B" name="resultB" onChange={(e) => setResultB(e.target.value)} value={resultB}/>
                        </div>
                        <div className="mb-3 mt-3">
                            <label >Result C:</label>
                            <input type="number" className="form-control"  placeholder="Result C" name="resultC" onChange={(e) => setResultC(e.target.value)} value={resultC}/>
                        </div>
                        <button type="submit" className="btn btn-primary">
                            {!isLoading && 'Submit'}
                            { isLoading && 
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden loader-ns">Loading...</span>
                                </Spinner>
                            }
                        </button>
                    </form>
                </div>
            </div>
        </div>
      </>
  );
}

export default AddNewData;