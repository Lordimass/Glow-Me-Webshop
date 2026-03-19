import { Content } from "lordis-react-components";
import Header from "../Header/Header.tsx";
import Footer from "../Footer/Footer.tsx";

type ContentProps = Parameters<typeof Content>[0];

/** Default page format for the site. */
export default function Page({ ...args }: ContentProps) {
  return (
    <>
      <Header />
      <Content {...args} />
      <Footer />
    </>
  );
}
