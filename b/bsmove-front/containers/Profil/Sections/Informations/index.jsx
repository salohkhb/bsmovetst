import Section from "../section";
import messages from "./messages";
import { CoordinatesComponent, PasswordComponent } from "./component";

const ProfileInformations = () => {
  return (
    <>
      <Section
        sectionTitle={messages.sectionTitle.coordinates}
        component={CoordinatesComponent}
      />
      <Section
        sectionTitle={messages.sectionTitle.password}
        component={PasswordComponent}
      />
    </>
  );
};

export default ProfileInformations;
