import { useState } from 'react';
import axios from 'axios';

const useValidityFetch = () => {
  const [validities, setValidities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchValidity = async (opcode, channel, category) => {
    setLoading(true);
    setError(null);

    const payload = { opCode: opcode, channel, category };

    try {
      const { data } = await axios.post(
        'http://172.16.130.8:6060/collect/bundle/get-validity',
        payload,
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (Array.isArray(data)) {
        setValidities(data);
        setLoading(false);
        return {
          success: true,
          message: 'Validities fetched successfully',
          txnId: Date.now(),
          validities: data
        };
      } else {
        setError('Unexpected response format');
        setLoading(false);
        return {
          success: false,
          message: 'Invalid response structure'
        };
      }
    } catch (err) {
      console.error('API Error:', err.message);
      setError('Network or server error.');
      setLoading(false);
      return {
        success: false,
        message: 'API request failed'
      };
    }
  };

  return { validities, loading, error, fetchValidity };
};

export default useValidityFetch;
