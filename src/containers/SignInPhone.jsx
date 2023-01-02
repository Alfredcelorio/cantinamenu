/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';

import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';
import { useNavigate, useParams } from 'react-router-dom';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import OtpInput from 'react-otp-input';
import { toast } from 'react-toastify';
import { getRestaurantByUrl } from '../utils/getData';

function SignInPhone() {
  const [phone, setPhone] = useState(null);
  const [otp, setOtp] = useState('');
  const [show, setShow] = useState(false);
  const [confirmResult, setConfirmResult] = useState();
  const [restaurant, setRestaurant] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [loadData, setLoadData] = useState(false);

  const check = true;

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    getRestaurantByUrl(params?.id, setRestaurant, setLoadData, check);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.id]);

  useEffect(() => {
    const auth = getAuth();
    window.recaptchaVerifier = new RecaptchaVerifier(
      'sign-in-button',
      {
        size: 'invisible',
        callback: () => {},
        'expired-callback': () => {},
      },
      auth,
    );
  }, []);

  useEffect(() => {
    if (restaurant?.fontFamily) {
      document.querySelector('body').style.fontFamily = restaurant?.fontFamily;
    }
  }, [restaurant]);

  const signin = () => {
    const isValid = isValidPhoneNumber(phone);
    if (isValid) {
      const auth = getAuth();
      const appVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(auth, phone, appVerifier)
        .then((confirmationResult) => {
          setShow(true);
          setConfirmResult(confirmationResult);
        })
        .catch((err) => {
          console.log(err, 'err');
        });
    } else {
      toast.error('Invalid phone number!');
    }
  };

  const confirmCode = () => {
    confirmResult
      .confirm(otp)
      .then(() => {
        navigate(`/${params?.id}/menu`);
      })
      .catch(() => {
        toast.error('Your OTP code is incorrect!');
      });
  };

  return (
    <div className="signin_phone">
      <Helmet>
        <title>{restaurant?.restaurantName}</title>
        <meta name="description" content={restaurant?.description} />
      </Helmet>
      <div className="landingImageDiv">
        <img className="landingImage" src={restaurant?.landingImage} alt="Landing" />
      </div>
      <div className="signin_content">
        {show ? (
          <div className="otp_container">
            <div className="otp_label">Enter OTP Code</div>
            <OtpInput
              className="otp_input"
              value={otp}
              onChange={(val) => setOtp(val)}
              numInputs={6}
              separator={<span>-</span>}
            />
            <button id="sign-in" type="submit" onClick={confirmCode} className="next_btn">
              Submit
            </button>
          </div>
        ) : (
          <>
            <div className="input_field">
              <PhoneInput
                defaultCountry="US"
                placeholder="Enter phone number"
                className="phone_input"
                value={phone}
                onChange={(e) => setPhone(e)}
              />
            </div>
            <button
              disabled={!phone}
              id="sign-in-button"
              type="submit"
              onClick={signin}
              className="next_btn"
            >
              Next
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default SignInPhone;
