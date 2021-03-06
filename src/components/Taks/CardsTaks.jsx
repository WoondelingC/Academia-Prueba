import React from 'react'
import { useDispatch } from 'react-redux'
import { activeCard, Delete } from '../../actions/cardAction'

const CardsTaks = ({card}) => {

    const dispatch = useDispatch()


    const handleEdit = (data) => {
        dispatch(activeCard(data.id, data))
    }

    const handleDelete = (id) => {
        dispatch(Delete(id))
    }
    



    return (
        <div className=" row ">
            {
                card.map(data =>(
                    <div className="col-md-4 text-center py-1 container" key={data.id}>
                    <div className="card mt-2 container text-center">
                        <div className="card-title text-center container">
                            <h3>{data.title}</h3>
                            <img className="text-center container" src={data.url} alt="" width="200px" height="200px" />
                            <span className="badge badge-pill bg-danger ml-2">
                                {data.priority}
                            </span>
    
                        </div>
    
                        <div className="card-body">
    
                            <p>{data.description}</p>
                            <p>
                                <mark>{data.categoria}</mark>
                            </p>
                        </div>
                        <div className="card-footer text-center" >
    
                            <button
                                className="btn btn-warning me-2"
                                onClick={()=> handleEdit(data)}
                            >
                                Edit
                            </button>
    
                            <button
                                className="btn btn-danger"
                                onClick={()=>handleDelete(data.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
                ))
            }
           
        </div>
    )
}

export default CardsTaks