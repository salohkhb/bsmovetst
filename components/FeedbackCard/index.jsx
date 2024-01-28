import styled from "styled-components";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import CardContent from "@mui/material/CardContent";

import styles from "./index.module.css";
import { useAlert } from "../../hooks/alert";
import { useState } from "react";

const S = {};

S.Card = styled(Card)`
  padding: 0px;
  border-radius: 7px;
  min-width: 23rem;
  height: 320px !important;
  max-width: 20%;
  height: 100%;
`;

S.CardContent = styled(CardContent)`
  text-align: left;
  text-overflow: ellipsis;
  margin: 0;
`;

S.Avatar = styled(Avatar)`
  width: 32px;
  height: 32px;
`;

const fakefeedback =
  "Très bon professionnel. Nous sommes déjà passé trois fois par lui et toujours avec satisfaction. Très réactif et toujours à l'écoute pour gérer le déménagement.";

const FeedbackCard = ({ feedback = "coucou", user, imgSrc }) => {
  const [raised, setRaised] = useState(false);

  function toggleRaised() {
    return setRaised((prevRaised) => !prevRaised);
  }
  return (
    <>
      <S.Card
        onMouseOver={toggleRaised}
        onMouseOut={toggleRaised}
        raised={raised}
      >
        <CardContent>
          <div className={styles.feedback_user_container}>
            <S.Avatar src={imgSrc} />
            <div className={styles.feedback_user_infos}>
              <div className={styles.feedback_user_name}>{user.name}</div>
              {/* <div className={styles.feedback_tags}>"tags"</div> */}
            </div>
          </div>
        </CardContent>
        <S.CardContent>
          <div className={styles.feedback_content}>{feedback}</div>
        </S.CardContent>
      </S.Card>
    </>
  );
};

export default FeedbackCard;
