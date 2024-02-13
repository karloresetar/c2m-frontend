import React from 'react'
import Person from './Person'
const PersonList = ({ data, currentPage, getAllPersons }) => {
    return (
        <main className='main'>
            {data?.content?.length === 0 && <div>No Persons. Please add a new person</div>}

            <ul className='person__list'>
                {data?.content?.length > 0 && data.content.map(person => <Person person={person} key={person.id} />)}
            </ul>

            {data?.content?.length > 0 && data?.totalPages > 1 &&
                <div className='pagination'>
                    <a onClick={() => getAllPersons(currentPage - 1)} className={0 === currentPage ? 'disabled' : ''}>&laquo;</a>


                    {data && [...Array(data.totalPages).keys()].map((page, index) =>
                        <a onClick={() => getAllPersons(page)} className={currentPage === page ? 'active' : ''} key={page}>{page + 1}</a>)}


                    <a onClick={() => getAllPersons(currentPage + 1)} className={data.totalPages === currentPage + 1 ? 'disabled' : ''}>&raquo;</a>
                </div>

            }

        </main>
    )
}

export default PersonList