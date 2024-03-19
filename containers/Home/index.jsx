import Image from "next/legacy/image";
import styled from "styled-components";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card";

import Routes from "../../helpers/routes";
import Button from "../../components/Button";

import styles from "./index.module.css";
import messages from "./messages";
import { useAlert } from "../../hooks/alert";
import { useRouter } from "next/router";
import HomeEstimateSection from "./HomeEstimateSection/HomeEstimateSection";
import HomeFeedbacksSection from "./HomeFeedbacksSection/HomeFeedbacksSection";
import CategoryPreview from "./CategoryPreview/CategoryPreview";
import HomePrestationsSection from "./HomePrestationsSection/HomePrestationsSection";
import { useState } from "react";

const HomeGuidelineSection = () => (
  <div className={styles.guideline_section}>
    <div className={styles.guideline_section_container}>
      <div className={styles.section_title}>
        {messages.guidelineSection.title}
      </div>
      <div className={styles.section_subtitle}>
        {messages.guidelineSection.subtitle}
      </div>
      <div className={styles.guideline_section_steps_container}>
        <div className={styles.guideline_section_step_illustration_container}>
          <div className={styles.guideline_section_step_illustration_component}>
            <Image
              className={styles.furniture_card_img_illustration}
              layout="fill"
              src="/images/icon_steps_homepage.png"
              alt={`img-step-1`}
            />
          </div>
        </div>
        <div className={styles.guideline_section_step_infos}>
          <h3 className={styles.guideline_section_step_title}>
            {messages.guidelineSection.steps.first.title}
          </h3>
          <div className={styles.guideline_section_step_content}>
            {messages.guidelineSection.steps.first.content}
          </div>
        </div>
      </div>
      <div className={styles.guideline_section_steps_container}>
        <div className={styles.guideline_section_step_illustration_container}>
          <div className={styles.guideline_section_step_illustration_component}>
            <Image
              className={styles.furniture_card_img_illustration}
              layout="fill"
              src="/images/icon_steps_homepage.png"
              alt={`img-step-1`}
            />
          </div>
        </div>
        <div className={styles.guideline_section_step_infos}>
          <h3 className={styles.guideline_section_step_title}>
            {messages.guidelineSection.steps.second.title}
          </h3>
          <div className={styles.guideline_section_step_content}>
            {messages.guidelineSection.steps.second.content}
          </div>
        </div>
      </div>
      <div className={styles.guideline_section_steps_container}>
        <div className={styles.guideline_section_step_illustration_container}>
          <div className={styles.guideline_section_step_illustration_component}>
            <Image
              className={styles.furniture_card_img_illustration}
              layout="fill"
              src="/images/icon_steps_homepage.png"
              alt={`img-step-1`}
            />
          </div>
        </div>
        <div className={styles.guideline_section_step_infos}>
          <h3 className={styles.guideline_section_step_title}>
            {messages.guidelineSection.steps.third.title}
          </h3>
          <div className={styles.guideline_section_step_content}>
            {messages.guidelineSection.steps.third.content}
          </div>
        </div>
      </div>
    </div>
  </div>
);

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

const HomeAdvantagesSection = () => (
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

const HomeCompetencesSection = () => (
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
    </div>
  </div>
);

const HomePresentationSection = () => (
  <div className={styles.presentation_section}>
    <div className={styles.presentation_section_infos}>
      <div className={styles.section_title}>
        {messages.presentationSection.title}
      </div>
      <div className={styles.section_subtitle}>
        {messages.presentationSection.subtitle}
      </div>
      <div className={styles.presentation_section_content}>
        {messages.presentationSection.content}
      </div>
    </div>
    <div className={styles.presentation_section_illustration_container}>
      <Image
        className={styles.presentation_section_illustration}
        layout="fill"
        src="/images/paris_map.png"
        alt="where_img_homescreen"
      />
    </div>
  </div>
);

// MOCK

const articles = [
  {
    title: messages.blogSection.articles.first.title,
    content: messages.blogSection.articles.first.content,
    action: messages.blogSection.articles.first.action,
    src: "/images/actuality_one.png",
  },
  {
    title: messages.blogSection.articles.second.title,
    content: messages.blogSection.articles.second.content,
    action: messages.blogSection.articles.second.action,
    src: "/images/actuality_two.png",
  },
  {
    title: messages.blogSection.articles.third.title,
    content: messages.blogSection.articles.third.content,
    action: messages.blogSection.articles.third.action,
    src: "/images/actuality_three.png",
  },
];

S.BlogCard = styled(Card)`
  border-radius: 12px;
  width: 20em;
  height: 30em;
  display: flex;
  flex-direction: column;
  text-align: left;
`;

const ArticlePreview = ({ article, technicalIssueAlert }) => (
  <S.BlogCard elevation={4}>
    <div className={styles.blog_article_thumbnail}>
      <CategoryPreview title={article.title} src={article.src} />
    </div>
    <div className={styles.blog_article_infos}>
      <div className={styles.blog_article_title}>{article.title}</div>
      <div className={styles.blog_article_content}>{article.content}</div>
      <div className={styles.blog_article_action}>
        <div>{article.action}</div>
        <IconButton
          onClick={technicalIssueAlert}
          className={styles.blog_article_action_icon}
          size="large"
        >
          <ArrowForwardIcon />
        </IconButton>
      </div>
    </div>
  </S.BlogCard>
);

const HomeBlogSection = ({ technicalIssueAlert }) => (
  <div className={styles.blog_section}>
    <div className={styles.section_title}>{messages.blogSection.title}</div>
    <div className={styles.section_subtitle}>
      {messages.blogSection.subtitle}
    </div>
    <div className={styles.blog_articles_container}>
      {articles.map((article) => (
        <ArticlePreview
          key={article.title}
          article={article}
          technicalIssueAlert={technicalIssueAlert}
        />
      ))}
    </div>
    <div
      style={{
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
      }}
    >
      <div className={styles.blog_see_more}>
        <Button onClick={technicalIssueAlert}>
          {messages.blogSection.action}
        </Button>
      </div>
    </div>
  </div>
);

const HomeGettingStartedSection = ({ technicalIssueAlert }) => {
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

const HomePageContainer = () => {
  const { setAlert } = useAlert();

  function technicalIssueAlert() {
    return setAlert({ severity: "info", content: "Bientôt disponible!" });
  }
  return (
    <div className={styles.container}>
      <HomeEstimateSection technicalIssueAlert={technicalIssueAlert} />
      <HomeFeedbacksSection technicalIssueAlert={technicalIssueAlert} />
      <HomePrestationsSection technicalIssueAlert={technicalIssueAlert} />
      <HomeGuidelineSection technicalIssueAlert={technicalIssueAlert} />
      <HomeAdvantagesSection technicalIssueAlert={technicalIssueAlert} />
      <HomeCompetencesSection technicalIssueAlert={technicalIssueAlert} />
      <HomePresentationSection technicalIssueAlert={technicalIssueAlert} />
      {/* <HomeBlogSection technicalIssueAlert={technicalIssueAlert} /> */}
      <HomeGettingStartedSection technicalIssueAlert={technicalIssueAlert} />
    </div>
  );
};

export default HomePageContainer;
