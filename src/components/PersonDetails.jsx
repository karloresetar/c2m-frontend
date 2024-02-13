import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getPerson } from '../api/PersonService';
import { toastError, toastSuccess } from '../api/ToastService';

const PersonDetails = ({ updatePerson, updateImage }) => {
    const inputRef = useRef();

    const [person, setPerson] = useState({
        id: '',
        name: '',
        description: '',
        title: '',
        photoUrl: '',
        channelLink: ''
    });

    const { id } = useParams();


    const fetchPerson = async (id) => {
        try {
            const { data } = await getPerson(id);
            setPerson(data);
            console.log(data);
            // toastSuccess('Person retrieved');
        } catch (error) {
            console.log(error);
            toastError(error.message);
        }
    };

    const selectImage = () => {
        inputRef.current.click();
    };

    const updatePhoto = async (file) => {
        try {
            const formData = new FormData();
            formData.append('file', file, file.name);
            formData.append('id', id);
            await updateImage(formData);
            setPerson((prev) => ({ ...prev, photoUrl: `${prev.photoUrl}?updated_at=${new Date().getTime()}` }));
            toastSuccess('Photo updated');
        } catch (error) {
            console.log(error);
            toastError(error.message);
        }
    };


    const onChange = (event) => {
        setPerson({ ...person, [event.target.name]: event.target.value });
    };


    const onUpdatePerson = async (event) => {
        event.preventDefault();
        await updatePerson(person);
        fetchPerson(id);
        toastSuccess('Person updated');
    };


    useEffect(() => {
        fetchPerson(id);
    }, []);

    return (
        <>
            <Link to={'/persons'} className='link'><i className='bi bi-arrow-left'></i> Back to list</Link>
            <div className='profile'>
                <div className='profile__details'>
                    <img src={person.photoUrl} alt={`Profile photo of ${person.name}`} />
                    <div className='profile__metadata'>
                        <p className='profile__name'>{person.name}</p>
                        <p className='profile__muted'>JPG, GIF, or PNG. Max size of 10MG</p>
                        <button onClick={selectImage} className='btn'><i className='bi bi-cloud-upload'></i> Change Photo</button>
                    </div>
                </div>
                <div className='profile__settings'>
                    <div>
                        <form onSubmit={onUpdatePerson} className="form">
                            <div className="user-details">
                                <input type="hidden" defaultValue={person.id} name="id" required />
                                <div className="input-box">
                                    <span className="details">Name</span>
                                    <input type="text" value={person.name} onChange={onChange} name="name" required />
                                </div>
                                <div className="input-box">
                                    <span className="details">Description</span>
                                    <input type="text" value={person.description} onChange={onChange} name="description" required />
                                </div>
                                <div className="input-box">
                                    <span className="details">Title</span>
                                    <input type="text" value={person.title} onChange={onChange} name="title" required />
                                </div>
                                <div className="input-box">
                                    <span className="details">Channel Link</span>
                                    <input type="text" value={person.channelLink} onChange={onChange} name="channelLink" required />
                                </div>
                            </div>
                            <div className="form_footer">
                                <button type="submit" className="btn">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div >


            <form style={{ display: 'none' }}>
                <input type='file' ref={inputRef} onChange={(event) => updatePhoto(event.target.files[0])} name='file' accept='image/*' />
            </form>
        </>
    )
}

export default PersonDetails