import React, {useCallback, useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../components/Loader";
import {useNavigate} from "react-router-dom";
import {useMessage} from "../hooks/message.hook";
// import {useAuth} from "../hooks/auth.hook";

export const ProfilePage = () => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const auth = useContext(AuthContext);
  const {loading, request} = useHttp();
  const {token} = useContext(AuthContext);
  const message = useMessage();
  // const {ready} = useAuth();
  const [readyToDelete, setReadyToDelete] = useState(false);

  useEffect(() => {
    window.M.updateTextFields()
  }, []);

  const fetchedUser = useCallback(async () => {
    try {
      const fetched = await request('/api/users/me', 'GET', null, {
        Authorization: `Bearer ${token}`,
      });
      setUserProfile(fetched.user);
      console.log(fetched.user)
    } catch (e) {
      console.log(e.message)
    }
  }, [token, request]);

  useEffect(() => {
    fetchedUser();
  }, [fetchedUser]);

  const changePassword = async (event) => {
    event.preventDefault();
    try {
      const fetched = await request('/api/users/me', 'PATCH', {
            oldPassword,
            newPassword
          },
          {
            Authorization: `Bearer ${token}`
          });
      setOldPassword('');
      setNewPassword('');
      message(fetched.message);
    } catch (e) {
      setOldPassword('');
      setNewPassword('');
      message(e.message);
    }
  };

  const deleteAccount = useCallback(async () => {
    try {
      const fetched = await request('/api/users/me', 'DELETE', null,
          {
            Authorization: `Bearer ${token}`
          });
      auth.logout();
      navigate("api/auth", {replace: true});
      message(fetched.message);
    } catch (e) {
      message(e.message);
    }
  }, [token, request]);



  if (loading || !userProfile) {
    return <Loader/>
  }

  return (
      <div className="row">
        <div className="col s8 offset-s2">
          <div className="card horizontal">
            <div className="card-stacked">
              <div className="card-content">
                <h5>User Profile</h5>
                <table>
                  <thead>
                  <tr>
                    <th>User Name</th>
                    <th>Created Date</th>
                    <th>ID</th>
                  </tr>
                  </thead>

                  <tbody>
                  <tr>
                    <td>{userProfile.username}</td>
                    <td>{`${new Date(userProfile.createdDate).toLocaleTimeString()} ${new Date(userProfile.createdDate).toLocaleDateString()}`}</td>
                    <td>{userProfile._id}</td>
                  </tr>
                  </tbody>
                </table>
              </div>
              <div className="card-action">
                <p>
                  <label>
                    <input type="checkbox"
                           onChange={() => setReadyToDelete(!readyToDelete)}
                    />
                    <span>Are you sure you want to delete your account?</span>
                  </label>
                </p>
                <button className="btn red darken-1"
                        onClick={deleteAccount}
                        disabled={!readyToDelete}
                >Delete Account!
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="col s8 offset-s2">
          <div className="card horizontal">
            <div className="card-stacked">
              <div className="card-content">
                <div className="input-field col s6">
                  <input id="oldPassword"
                         type="password"
                         value={oldPassword}
                         onChange={(e) => setOldPassword(e.target.value)}
                         className="validate"/>
                  <label htmlFor="oldPassword">Old Password</label>
                </div>
                <div className="input-field col s6">
                  <input id="newPassword"
                         type="password"
                         value={newPassword}
                         onChange={(e) => setNewPassword(e.target.value)}
                         className="validate"/>
                  <label htmlFor="newPassword">New Password</label>
                </div>
              </div>
              <div className="card-action">
                <a href="/"
                   onClick={changePassword}
                   className="btn orange darken-1"
                >Change Password</a>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
};
