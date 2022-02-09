import ProfileNav from "../components/reusable/ProfileNav";
import LogoutIcon from "../components/icons/Logout";
import Header from "../components/reusable/Header";
import MyContactsArea from "../components/pageComponents/MyContacts";

function MyContactsPage() {
  return (
    <section>
      <Header start={<ProfileNav />} end={<LogoutIcon />} />
      <MyContactsArea />
    </section>
  );
}

export default MyContactsPage;
