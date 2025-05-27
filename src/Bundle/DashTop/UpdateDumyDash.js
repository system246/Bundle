import { useState } from 'react';
import axios from 'axios';

const useBundleUpdate = () => {
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);

  const updateBundles = async (bundles) => {
    setUpdating(true);
    setError(null);

    try {
      // Remove the 'key' field from each bundle (if exists)
      const cleanedBundles = bundles.map(({ key, ...rest }) => rest);

      console.log("Sending updated bundle JSON:", cleanedBundles);

      const response = await axios.post(
        'http://172.16.130.8:6060/collect/bundle/bundleUpdateList',
        cleanedBundles,
        {
          headers: {
            Authorization: "1234rt",
            'Content-Type': 'application/json',
          },
        }
      );
      
      if (response.data?.status?.toLowerCase() === 'true') {
        console.log('Update successful:', response.data);
        return { success: true, message: response.data.message || 'Update successful' };
      } else {
        console.error('API response error:', response.data);
        return { success: false, message: response.data?.message || 'Update failed' };
      }}
       catch (err) {
      console.error('UpdateBundles error:', err);
      setError('Update failed.');
      return { success: false, message: 'Update request failed' };
    } finally {
      setUpdating(false);
    }
  };

  return { updateBundles, updating, error };
};

export default useBundleUpdate;
