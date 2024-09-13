import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const JobDetails = () => {
  const { jobId } = useParams(); // Assume the job ID is passed in the route
  const [jobDetails, setJobDetails] = useState(null); // Store job details
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      setLoading(true);
      try {
        // API call to fetch job details by job ID
        const response = await axios.get(`https://api.example.com/jobs/${jobId}`);
        setJobDetails(response.data);
      } catch (err) {
        setError('Failed to load job details.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  if (loading) return <p>Loading job details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>{jobDetails.title}</h2>
      <p>Location: {jobDetails.location}</p>
      <p>Salary: {jobDetails.salary}</p>
      <p>Phone: {jobDetails.phone}</p>
    </div>
  );
};

export default JobDetails;
