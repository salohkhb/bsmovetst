import HomePrestationsSection from "../Home/HomePrestationsSection/HomePrestationsSection";
import styles from "./index.module.css"
import Image from "next/legacy/image";
import Button from "../../components/Button";
import { useGlobal } from "../../hooks/global";
import { useRouter } from "next/router";
import messages from "./messages";
import Routes from "../../helpers/routes";
import styled from "styled-components";
import Card from "@mui/material/Card";
import { useState } from "react";
  
const MeauxEstimateSection = () => {
  const {
    global: { screenWidth },
  } = useGlobal();
  let router = useRouter();
  return (
    <div className={styles.estimate_section}>
      <div className={styles.home_estimate_section_left}>
        <h1 className={styles.section_title}>
          {messages.estimateSection.title}
        </h1>
        <h1 className={styles.estimate_section_main_content}>
          {messages.estimateSection.content.main}
        </h1>
        <div className={styles.estimate_section_secondary_content}>
          {messages.estimateSection.content.secondary}
        </div>
        <div className={styles.estimate_section_actions_container}>
          <Button
            onClick={() => router.push(Routes.ESTIMATE_DETAILS_PAGE)}
            margin="0 4px 0 0"
          >
            {messages.estimateSection.actions.leftButton}
          </Button>
        </div>
      </div>
      <div className={styles.home_estimate_section_right}>
        <div className={styles.home_estimate_section_right_img_container}>
          <Image
            className={styles.home_estimage_section_right_img_illustration}
            layout="fill"
            src="/images/meaux.jpg"
            alt="homepage_section_estimate"
          />
        </div>
      </div>
    </div>
  );
};

const MeauxCompetencesSection = () => {
  const router = useRouter();
  return (
  <div className={styles.competences_section}>
    <div className={styles.competences_section_illustration_container}>
      <div className={styles.competences_section_illustration}>
        <Image
          className={styles.prestation_section_category_thumbnail}
          layout="fill"
          src="/images/moving_together_illu.png"
          alt="competences"
        />
      </div>
    </div>
    <div className={styles.competences_section_infos}>
      <div className={styles.section_title}>
        {messages.competencesSection.title}
      </div>
      <div className={styles.section_subtitle}>
        {messages.competencesSection.subtitle}
      </div>
      <div className={styles.competences_section_infos_content}>
        <div>{messages.competencesSection.contents.firstPart}</div>
        <div>{messages.competencesSection.contents.secondPart}</div>
      </div>
      <div className={styles.estimate_section_actions_container}>
          <Button
            onClick={() => router.push(Routes.VEHICLE_RENT_PAGE)}
            margin="0 0 0 4px"
          >
            {messages.competencesSection.action}
          </Button>
        </div>
    </div>
  </div>
  );
};
const S = {};

S.AdvantageCard = styled(Card)`
  max-width: 376px;
  min-width: 320px;
`;

const AdvantageCard = ({ title, content }) => {
  const [raised, setRaised] = useState(false);

  function toggleRaised() {
    return setRaised((prevRaised) => !prevRaised);
  }
  return (
    <Card
      onMouseOver={toggleRaised}
      onMouseOut={toggleRaised}
      raised={raised}
      sx={{ backgroundColor: "transparent !important" }}
    >
      <S.AdvantageCard elevation={1}>
        <div className={styles.advantages_card_container}>
          <div className={styles.advantages_card_title}>{title}</div>
          <div className={styles.section_content}>{content}</div>
        </div>
      </S.AdvantageCard>
    </Card>
  );
};
const MeauxAdvantagesSection = () => (
  <div className={styles.advantages_section}>
    <div className={styles.section_title}>
      {messages.advantagesSection.title}
    </div>
    <div className={styles.section_subtitle}>
      {messages.advantagesSection.subtitle}
    </div>
    <div className={styles.advantages_section_cards}>
      <AdvantageCard
        title={messages.advantagesSection.advantages.first.title}
        content={messages.advantagesSection.advantages.first.content}
      />
      <AdvantageCard
        title={messages.advantagesSection.advantages.second.title}
        content={messages.advantagesSection.advantages.second.content}
      />
      <AdvantageCard
        title={messages.advantagesSection.advantages.third.title}
        content={messages.advantagesSection.advantages.third.content}
      />
    </div>
  </div>
);

const MeauxMeubleSection = () => {
  const {
    global: { screenWidth },
  } = useGlobal();
  let router = useRouter();
  return (
    <div className={styles.estimate_section}>
      <div className={styles.home_estimate_section_left}>
        <h1 className={styles.section_title}>
          {messages.meubleSection.title}
        </h1>
        <h1 className={styles.estimate_section_main_content}>
          {messages.meubleSection.content.main}
        </h1>
        <div className={styles.estimate_section_secondary_content}>
          {messages.meubleSection.content.secondary}
        </div>
        <div className={styles.estimate_section_actions_container}>
          <Button
            onClick={() => router.push(Routes.FURNITURES_BUY_PAGE)}
            margin="0 4px 0 0"
          >
            {messages.meubleSection.actions.leftButton}
          </Button>
        </div>
      </div>
      <div className={styles.home_estimate_section_right}>
        <div className={styles.home_estimate_section_right_img_container}>
          <Image
            className={styles.home_estimage_section_right_img_illustration}
            layout="fill"
            src="/images/prestation_3.png"
            alt="homepage_section_estimate"
          />
        </div>
      </div>
    </div>
  );
};
const MeauxGettingStartedSection = () => {
  const router = useRouter();
  return (
    <div className={styles.getting_started_section}>
      <div className={styles.getting_started_container}>
        <div className={styles.getting_started_left_container}>
          <div className={styles.getting_started_infos}>
            <div className={styles.section_subtitle}>
              {messages.gettingStartedSection.subtitle}
            </div>
            <div className={styles.section_content}>
              {messages.gettingStartedSection.content}
            </div>
          </div>
          <div className={styles.getting_started_action_container}>
            <Button
              onClick={() => router.push(Routes.ESTIMATE_DETAILS_PAGE)}
              outlined
            >
              {messages.gettingStartedSection.action}
            </Button>
          </div>
        </div>
        <div className={styles.getting_started_section_right_container}>
          <div
            className={styles.getting_started_section_illustration_container}
          >
            <Image
              className={styles.getting_started_illustration}
              layout="fill"
              src="/images/ready_to_move_truck_illustration.png"
              alt="getting_started_truck"
            />
          </div>
        </div>
      </div>
    </div>
  );
};


const Meaux = () => {
  return (
    <div className={styles.container}>
      <MeauxEstimateSection />
      <HomePrestationsSection />
      <MeauxCompetencesSection />
      <MeauxAdvantagesSection />
      <MeauxMeubleSection />
      <MeauxGettingStartedSection />
    </div>
  )
}

export default Meaux