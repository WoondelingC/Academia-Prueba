import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CardNew, startUploading ,clearCard, Edit} from '../../actions/cardAction';
import { useForm } from '../../hooks/useForm'

const AddTaks = () => {
  const {active} = useSelector(state => state.card)
  const dispatch = useDispatch()
  let file = "";
  
  const [formValue, handleInputChange, reset] = useForm(active)

  const { title, categoria, description } = formValue

  const activeId =useRef(active.id)

  useEffect(() =>{
    if (active.id !== activeId.current){
      reset(active)
    }
    activeId.current = active.id
  }, [active, reset])

const handlNewCard = (e) => {
    e.preventDefault();
    
    if(active.title===""){
      dispatch(CardNew(formValue))
      reset()
    }else if(active.id !== ""){
      dispatch(Edit(formValue))
    }
    
    dispatch(clearCard())
  }
  
  const handlePictureClick = () => {
    document.querySelector('#fileSelector').click();
  }
  
  const handleFileChange = (e) => {
    file = e.target.files[0];
    console.log(file)
    if (file) {
      dispatch(startUploading(file))
    }
  }

  

  
  console.log (handleInputChange.title);

  return (
    <div className="card container text-center">
      <h2>Agregar Pelicula</h2>
      <form className="card-body " onSubmit={handlNewCard}>
        <div className="form-group">
          <input
            type="text"
            name="title"
            className="form-control mt-1"
            placeholder="Pokemon"
            value={title}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            name="categoria"
            className="form-control mt-1"
            placeholder="Especie"
            value={categoria}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            name="description"
            className="form-control mt-1"
            placeholder="Habilidades"
            value={description}
            onChange={handleInputChange}
          />
        </div>

        <input
          id="fileSelector"
          type="file"
          name="file"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <div>
          <input
            type="button"
            className="btn border-bottom shadow-sm"
            value="Picture"
            onClick={handlePictureClick}
          />
        </div>

        <button type="submit" className="btn btn-primary mt-2">
          Guardar
        </button>
      </form>
    </div>
  )
}

export default AddTaks