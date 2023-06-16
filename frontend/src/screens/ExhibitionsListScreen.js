import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Styled from "styled-components";
import MainHeading from "../components/MainHeading";
import Exhibition from "../components/Exhibition";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listExhibits } from "../actions/exhibitActions";

const Container = Styled.div`
  font-family: "Cormorant Garamond";
  margin: 0 0rem;
  padding: 0 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const ExhibitionsListScreen = () => {
  const dispatch = useDispatch();
  const exhibitList = useSelector((state) => state.exhibitList);
  const { loading, error, exhibits } = exhibitList;

  useEffect(() => {
    dispatch(listExhibits());
  }, [dispatch]);

  const exhibitions = exhibits.map((exhibit) => (
    <Exhibition exhibit={exhibit} key={exhibit._id} />
  ));

  return (
    <Container>
      <MainHeading text="Explore the current exhibitions" />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        exhibitions
      )}
    </Container>
  );
};

export default ExhibitionsListScreen;
