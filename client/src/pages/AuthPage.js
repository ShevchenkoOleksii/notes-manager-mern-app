import React, {useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";
import { Helmet } from 'react-helmet';
import {FacebookShareButton, FacebookIcon} from "react-share";
import {HeadTags} from '../helpers/HeadTags';

export const AuthPage = () => {
  const imageUrl = 'https://res.cloudinary.com/doghotelua/image/upload/v1581456521/blog/108_nft7ng.jpg';
  const auth = useContext(AuthContext);
  const message = useMessage();
  const {request, loading, error, clearError} = useHttp();
  const [form, setForm] = useState({
    username: '',
    password: ''
  });

  useEffect(() => {
    message(error, 'message_error');
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    window.M.updateTextFields()
  }, []);

  const changeHandler = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  };

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', {...form});
      message(data.message);
    } catch (e) {}
  };

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', {...form});
      auth.login(data.jwt_token, data.userId);
      message(data.message);
    } catch (e) {}
  };

  const openPopup = (link, e) => {
    e.preventDefault();
    window.open(link, 'newwindow', 'width=300, height=250');
  };
  const { href } = window.location;
  const FB_DOMAIN = 'https://facebook.com/sharer.php?u=';
  // const ShareFacebookButton = () => (
  //   <>
  //     <Helmet>
  //       <meta property="og:url" content={href} />
  //       <meta property="og:type" content="website" />
  //       <meta property="og:title" content={'noteValue'} />
  //       <meta property="og:image" content={imageUrl} />
  //     </Helmet>
  //     <a
  //       href={`${FB_DOMAIN}${href}`}
  //       onClick={e => openPopup(`${FB_DOMAIN}${href}`, e)}
  //     >
  //       Share!
  //     </a>
  //   </>
  // );

  return (
    <div className="row">
      <HeadTags
            title={'some title'}
            metaDescription={'metaDescription'}
          ></HeadTags>
      {/* <ShareFacebookButton /> */}
      
      <FacebookShareButton 
                url={href}
                quote={"CampersTribe - World is yours to explore"}
                hashtag="#camperstribe">
                <FacebookIcon size={36} />
      </FacebookShareButton>
      <div className="col s6 offset-s3">
        <img src={imageUrl} style={{height: '200px'}} alt='alt-text'></img>
      </div>
      <div className="col s6 offset-s3">
        <div className="card purple darken-1">
          <div className="card-content white-text">
            <span className="card-title">Login Page</span>
            <div>
              <div className="input-field">
                <input className="yellow-input"
                       name="username"
                       id="username"
                       type="text"
                       value={form.username}
                       onChange={changeHandler}
                />
                <label htmlFor="username">User Name</label>
              </div>
              <div className="input-field">
                <input className="yellow-input"
                       name="password"
                       id="password"
                       type="password"
                       value={form.password}
                       onChange={changeHandler}
                       />
                <label htmlFor="password">Password</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button className="btn yellow darken-4 waves-effect waves-purple"
                    style={{marginRight: 10}}
                    onClick={loginHandler}
                    disabled={loading}
            >Log In</button>
            <button className="btn blue darken-2 waves-effect waves-purple"
                    onClick={registerHandler}
                    disabled={loading}
            >Sing In</button>
          </div>
        </div>
      </div>
    </div>
  )
};