import React, {useEffect, useState} from 'react';
import {get} from 'lodash';
import graphqlAPIClient from './graphqlUtils/client';
import {dessertListQuery, createDessertMutation} from './graphqlUtils/queries';
import DataTable from  './DataTable';
import Alert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import { toast, ToastContainer } from "react-toastify";
import './app.css'
import 'react-toastify/dist/ReactToastify.min.css';

const App = (props)=> {
const [dessertList, setDessertList] = useState([]);
const [isLoading, setLoading] = useState(true);
const [isError, setError] = useState(false);

const fetchDessert = (message = 'Desert List fetched successfully')=>{
    graphqlAPIClient({ query: dessertListQuery}).then((response)=>{
        const dessertList = get(response, 'data.dessertList', []);
        setDessertList(dessertList);
        setLoading(false);
        toast.success(message);
    }).catch(()=> {
        toast.error('something went wrong');
        setLoading(false);
        setError(true);
        setTimeout(()=>{
            setError(false);
        }, 3000);
    });
}

 useEffect(fetchDessert,[]);

const onSubmit = async (variables)=> {
  try {
      setLoading(true);
      graphqlAPIClient({ query: createDessertMutation, variables}).then((response)=>{
          toast.success('Desert added successfully');
          const newData = get(response, 'data.createDessert', {});
          setDessertList((dessertList)=>([...dessertList,newData]));
          setTimeout(()=>{
              setLoading(false);
          }, 1500);
      }).catch(()=> {
          setLoading(false);
          setError(true);
          setTimeout(()=>{
              setError(false);
          }, 1500);
      });

  } catch (error) {
    console.log('----error',error);
  }
}

 const onDelete = (selected)=> {
     const updatedList = dessertList.filter((item)=> {
         return !selected.includes(item.dessert);
     });
     toast.success('Data deleted successfully');
     setDessertList(updatedList);
 }

 const onReset = ()=> {
     fetchDessert('Reset successful');
 }


 return <div>
      <ToastContainer />
      {isError && <Alert variant="filled" severity="error">Something went wrong......</Alert>}
      {<DataTable rows={dessertList} onSubmit={onSubmit}  onDelete={onDelete} onReset={onReset} />}
     {isLoading && <div className='circular-loading'><CircularProgress color="secondary" /></div>}
  </div>
}

export default App;