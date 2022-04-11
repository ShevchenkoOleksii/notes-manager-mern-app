import {useState, useCallback} from "react"
import {useAuth} from "./auth.hook";
import {useNavigate} from "react-router-dom";

export const useHttp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const {logout} = useAuth();

  const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
    setLoading(true);
    try {
      if (body) {
        body = JSON.stringify(body);
        headers['Content-Type'] = 'application/json';
      }

      const response = await fetch(url, {
        method,
        body,
        headers
      });

      const data = await response.json();

      if (data.message === 'jwt expired') {
        logout();
      }

      if (!response.ok) {
        throw new Error(data.message || `Something went wrong... :(`);
      }

      setLoading(false);

      return data;
    } catch (e) {
      setLoading(false);
      setError(e.message);
      throw e;
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {request, loading, error, clearError};
};