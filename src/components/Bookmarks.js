import React, { useEffect, useState } from 'react';
import JobCard from './JobCard';
import './Bookmarks.css';

const Bookmarks = () => {
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);

  useEffect(() => {
    const savedJobs = JSON.parse(localStorage.getItem('bookmarkedJobs')) || [];
    setBookmarkedJobs(savedJobs);
  }, []);

  if (bookmarkedJobs.length === 0) {
    return <div>No bookmarked jobs</div>;
  }

  return (
    <div className="bookmarks-list">
      {bookmarkedJobs.map(job => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
};

export default Bookmarks;
