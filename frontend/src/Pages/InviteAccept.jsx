// import React, { useEffect, useState } from "react";
// import { useSearchParams, useParams } from "react-router-dom";
// import axios from "axios";

// const InviteAccept = () => {
//   const { token } = useParams();
//   const [searchParams] = useSearchParams();
//   const [message, setMessage] = useState("Processing your invite...");

//   useEffect(() => {
//     console.log("token:", token); // Debugging line
//     if (!token) {
//       setMessage("Invalid invite link.");
//       return;
//     }

//     axios
//       .get("http://localhost:5000/api/invitations/accept", { token })
//       .then((res) => setMessage(res.data.message))
//       .catch((err) =>
//         setMessage(err.response?.data?.error || "Something went wrong.")
//       );
//   }, [searchParams]);

//   return (
//     <div className="flex items-center justify-center h-screen">
//       <h1 className="text-xl font-semibold">{message}</h1>
//     </div>
//   );
// };

// export default InviteAccept;

// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const AcceptInvitationPage = () => {
//   const { token } = useParams(); // Get token from URL parameter
//   const [message, setMessage] = useState('Processing your invite...');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const acceptInvite = async () => {
//       try {
//         console.log('token:', token); // Debugging line

//         if (!token) {
//           setMessage('Invalid invite link. No token found.');
//           setLoading(false);
//           return;
//         }

//         // Send the token to your backend API
//         const response = await axios.post(
//           'http://localhost:5000/api/invites/accept',
//           { token },
//           {
//             headers: {
//               'Content-Type': 'application/json'
//             }
//           }
//         );

//         // Handle successful acceptance
//         console.log('Invite accepted:', response.data);
//         setMessage('Invitation accepted successfully! Redirecting...');

//         // Store any returned token or user info if needed
//         if (response.data.authToken) {
//           localStorage.setItem('token', response.data.authToken);
//         }

//         if (response.data.userId) {
//           localStorage.setItem('userId', response.data.userId);
//         }

//         // Redirect to appropriate page after short delay
//         setTimeout(() => {
//           navigate('/dashboard');
//         }, 2000);
//       } catch (err) {
//         console.error('Error accepting invite:', err);

//         if (err.response && err.response.data) {
//           setMessage(`Error: ${err.response.data.message || 'Failed to accept invitation'}`);
//         } else {
//           setMessage('An error occurred while processing your invite. Please try again later.');
//         }

//         setError(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     acceptInvite();
//   }, [token, navigate]);

//   return (
//     <div className="invite-accept-container">
//       <h2>Invitation</h2>
//       {loading ? (
//         <div className="loading-spinner">
//           <p>{message}</p>
//           {/* You can add a spinner component here */}
//         </div>
//       ) : error ? (
//         <div className="error-message">
//           <p>{message}</p>
//           <button onClick={() => navigate('/')}>Return to Home</button>
//         </div>
//       ) : (
//         <div className="success-message">
//           <p>{message}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AcceptInvitationPage;

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const InviteAccept = () => {
  const { token } = useParams();
  const [message, setMessage] = useState("Processing your invite...");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const acceptInvitation = async () => {
      console.log("token:", token); // Debugging line
      
      if (!token) {
        setMessage("Invalid invite link. No token provided.");
        setLoading(false);
        return;
      }

      try {
        // Correctly pass the token as a URL parameter
        const response = await axios.get(
          `http://localhost:5000/api/invitations/accept/${token}`
        );

        // console.log("Response:", response.data);
        setMessage(response.data.message);

        // Handle successful response
        if (response.data.success) {
          // If user needs to sign up first
          if (response.status === 202) {
            const { invitationToken, inviteeEmail, inviteeName, businessName } = response.data.data;
            
            // Store invitation details for the signup page
            localStorage.setItem('pendingInvitation', JSON.stringify({
              token: invitationToken,
              email: inviteeEmail,
              name: inviteeName,
              businessName
            }));
            
            setTimeout(() => {
              navigate('/');
            }, 2000);
          } else {
            // User already exists, store auth token
            const { token, user } = response.data.data;
            
            localStorage.setItem('token', token);
            localStorage.setItem('userId', user.id);
            
            setTimeout(() => {
              navigate('/dashboard');
            }, 2000);
          }
        }
      } catch (err) {
        console.error("Error accepting invitation:", err);
        setMessage(
          err.response?.data?.message || 
          err.response?.data?.error || 
          "Something went wrong processing your invitation."
        );
      } finally {
        setLoading(false);
      }
    };

    acceptInvitation();
  }, [token, navigate]); // Correct dependency array

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-xl font-semibold mb-4">{message}</h1>
      
      {!loading && (
        <button 
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Return to Home
        </button>
      )}
    </div>
  );
};

export default InviteAccept;