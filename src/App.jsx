import { useEffect, useState, useRef } from "react";
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import PersonList from './components/PersonList';
import { getPersons, savePerson, updatePhoto } from './api/PersonService';
import { Routes, Route, Navigate } from 'react-router-dom';
import PersonDetails from './components/PersonDetails';
import { toastError } from "./api/ToastService";
import { ToastContainer, toast } from "react-toastify";


function App() {
  const modalRef = useRef();
  const fileRef = useRef();
  const [data, setData] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [file, setFile] = useState(undefined);
  const [values, setValues] = useState({
    name: '',
    description: '',
    title: '',
    channelLink: '',
  });

  const getAllPersons = async (page = 0, size = 10) => {
    try {
      setCurrentPage(page);
      const { data } = await getPersons(page, size);
      setData(data);
      console.log(data);
    } catch (error) {
      console.log(error)
      toastError(error.message);
    }
  };

  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleNewPerson = async (event) => {
    event.preventDefault();
    try {
      const { data } = await savePerson(values);
      const formData = new FormData();
      formData.append('file', file, file.name);
      formData.append('id', data.id);
      const { data: photoUrl } = await updatePhoto(formData);
      toggleModal(false);
      setFile(undefined);
      fileRef.current.value = null;
      setValues({
        name: '',
        description: '',
        title: '',
        channelLink: '',
      })
      getAllPersons();
    } catch (error) {
      console.log(error);
      toastError(error.message);
    }
  };

  const updatePerson = async (person) => {
    try {
      const { data } = await savePerson(person);
      console.log(data);
    } catch (error) {
      console.log(error);
      toastError(error.message);
    }
  };

  const updateImage = async (formData) => {
    try {
      const { data: photoUrl } = await updatePhoto(formData);
    } catch (error) {
      console.log(error);
      toastError(error.message);
    }

  };

  const toggleModal = show => show ? modalRef.current.showModal() : modalRef.current.close();

  useEffect(() => {
    getAllPersons();
  }, []);

  return (
    <>
      <Header toggleModal={toggleModal} nbOfPersons={data.totalElements} />
      <main className='main'>
        <div className='container'>
          <Routes>
            <Route path='/' element={<Navigate to={'/persons'} />} />
            <Route path="/persons" element={<PersonList data={data} currentPage={currentPage} getAllPersons={getAllPersons} />} />
            <Route path="/persons/:id" element={<PersonDetails updatePerson={updatePerson} updateImage={updateImage} />} />
          </Routes>
        </div>
      </main>

      {/* Modal */}
      <dialog ref={modalRef} className="modal" id="modal">
        <div className="modal__header">
          <h3>New Person</h3>
          <i onClick={() => toggleModal(false)} className="bi bi-x-lg"></i>
        </div>
        <div className="divider"></div>
        <div className="modal__body">
          <form onSubmit={handleNewPerson}>
            <div className="user-details">
              <div className="input-box">
                <span className="details">Name</span>
                <input type="text" value={values.name} onChange={onChange} name='name' required />
              </div>
              <div className="input-box">
                <span className="details">Description</span>
                <input type="text" value={values.description} onChange={onChange} name='description' required />
              </div>
              <div className="input-box">
                <span className="details">Title</span>
                <input type="text" value={values.title} onChange={onChange} name='title' required />
              </div>
              <div className="input-box">
                <span className="details">Channel Link</span>
                <input type="text" value={values.channelLink} onChange={onChange} name='channelLink' required />
              </div>
              <div className="file-input">
                <span className="details">Profile Photo</span>
                <input type="file" onChange={(event) => setFile(event.target.files[0])} ref={fileRef} name='photo' required />
              </div>
            </div>
            <div className="form_footer">
              <button onClick={() => toggleModal(false)} type='button' className="btn btn-danger">Cancel</button>
              <button type='submit' className="btn">Save</button>
            </div>
          </form>
        </div>
      </dialog>
      <ToastContainer />
    </>
  );
}

export default App;
