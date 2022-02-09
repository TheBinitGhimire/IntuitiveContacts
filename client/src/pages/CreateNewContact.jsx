import ProfileNav from "../components/reusable/ProfileNav";
import LogoutIcon from "../components/icons/Logout";
import Header from "../components/reusable/Header";
import ContactOperation from "../components/pageComponents/ContactOperation";

function CreateNewContactPage() {
  return (
    <section>
      <Header start={<ProfileNav />} end={<LogoutIcon />} />
      <ContactOperation
        title="Create a New Contact"
        picture="https://res.cloudinary.com/binit/image/upload/v1644233860/IntuitiveContacts/profile_ya4nx1.png"
      />
    </section>
  );
}

export default CreateNewContactPage;
