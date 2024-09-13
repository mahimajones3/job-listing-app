import React from 'react';
import { useNavigate } from 'react-router-dom';
import './JobCard.css';

const JobCard = ({ job }) => {
  const navigate = useNavigate();

  const handleDetails = () => {
    navigate(`/job/${job.id}`, { state: job });
  };

  const handleBookmark = () => {
    const savedJobs = JSON.parse(localStorage.getItem('bookmarkedJobs')) || [];
    localStorage.setItem('bookmarkedJobs', JSON.stringify([...savedJobs, job]));
  };

  return (
    <div className="job-card" onClick={handleDetails}>
      <h3>{job.title}</h3>
      <p>{job.location}</p>
      <p>Salary: {job.salary}</p>
      <p>Phone: {job.phone}</p>
      <button onClick={handleBookmark}>Bookmark</button>
    </div>
  );
};

export default JobCard;
