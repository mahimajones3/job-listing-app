import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JobCard from './JobCard';
import './Jobs.css';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchJobs = async (pageNum) => {
    try {
      setLoading(true);
      const response = await axios.get(`https://api.example.com/jobs?page=${pageNum}`);
      setJobs(prevJobs => [...prevJobs, ...response.data.jobs]);
      setHasMore(response.data.jobs.length > 0);
    } catch (err) {
      setError('Failed to load jobs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs(page);
  }, [page]);

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight && !loading && hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore]);

  if (loading && jobs.length === 0) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (jobs.length === 0) return <div>No jobs found</div>;

  return (
    <div className="jobs-list">
      {jobs.map(job => (
        <JobCard key={job.id} job={job} />
      ))}
      {loading && <div>Loading more...</div>}
    </div>
  );
};

export default Jobs;
