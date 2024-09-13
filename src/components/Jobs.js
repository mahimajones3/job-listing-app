import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JobCard from './JobCard';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);   // Stores job listings
  const [page, setPage] = useState(1);    // Tracks the current page for API calls
  const [loading, setLoading] = useState(false); // Indicates loading state
  const [hasMore, setHasMore] = useState(true);  // Indicates if there are more jobs to load
  const [error, setError] = useState(null);      // Stores any API errors

  // Function to fetch jobs
  const fetchJobs = async () => {
    setLoading(true);
    setError(null);

    try {
      // API call to fetch jobs, update with actual API endpoint
      const response = await axios.get(`https://testapi.getlokalapp.com/common/jobs?${page=1}`);
      
      setJobs(prevJobs => [...prevJobs, ...response.data.jobs]);

      setHasMore(response.data.jobs.length > 0);
    } catch (err) {
      setError('Failed to load jobs. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch jobs on component mount and whenever the page number changes
  useEffect(() => {
    fetchJobs();
  }, [page]);

  // Infinite scrolling handler
  const handleScroll = () => {
    // Check if the user has scrolled to the bottom of the page
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight && !loading && hasMore) {
      setPage(prevPage => prevPage + 1);  // Load next page of jobs
    }
  };

  // Add scroll event listener for infinite scrolling
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore]);

  return (
    <div>
      <h2>Job Listings</h2>
      {jobs.map(job => <JobCard key={job.id} job={job} />)}
      
      {loading && <p>Loading more jobs...</p>}
      {error && <p>{error}</p>}
      {!loading && jobs.length === 0 && <p>No jobs found.</p>}
    </div>
  );
};

export default Jobs;
