/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import axios from 'axios';
import BASE_API from '../api.js'

const Notes = ({ branch }) => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        axios.get(`${BASE_API}/notes/getBranchNotes/${branch}`)
            .then(response => {
                // console.log('Fetched data:', response.data);
                if (response.data && response.data.subjects) {
                    setCourses(response.data.subjects);
                } else {
                    console.error('Invalid data format:', response.data);
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [branch]);

    return (
        <div className="overflow-x-auto w-full text-white">
            <table className="table">
                <thead>
                    <tr className="text-lg text-white">
                        <th>Course</th>
                        <th>Videos</th>
                        <th>Material</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(courses) && courses.map((course, index) => (
                        <tr key={index}>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div>
                                        <div className="font-bold">{course.name}</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                {course.videos.map((video, videoIndex) => (
                                    <span key={videoIndex}>
                                        <a href="#" className='cursor-auto'>{video.title}</a>{videoIndex !== course.videos.length - 1 && ' | '}
                                    </span>
                                ))}
                            </td>
                            <td>
                                {course.materials.map((material, materialIndex) => (
                                    <span key={materialIndex}>
                                        <a href={material.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{material.title}</a>{materialIndex !== course.materials.length - 1 && <br />}
                                    </span>
                                ))}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Notes;
