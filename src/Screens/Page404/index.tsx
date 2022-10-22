import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";

const PageContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    height: 100vh;
`;

const ContentContainer = styled.div `
h1 {
    font-size: 2.5rem;
    margin-bottom: 1.2rem;
}
`;

const Page404 = () => {
    // initializing usenavigate hook
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            // redirect to home page after showing page not found for 3 seconds
            navigate("/");
        }, 3000);
    });

  return (
    <PageContainer>
        <ContentContainer>
            <h1>Oops, Page not found.</h1>
            <p>Redirecting to Home!</p>
        </ContentContainer>
    </PageContainer>
  )
}

export default Page404