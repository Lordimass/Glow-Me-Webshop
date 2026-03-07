import { Toast, ToastContainer } from "react-bootstrap";

function App() {
  return (
    <>
      <ToastContainer>
        <Toast>
          <Toast.Header>
            {/*<img*/}
            {/*  src="https://images-ext-1.discordapp.net/external/y9SuOvseQ8m_ozjbaWW7WaPXcH7nU4xyLtbW735n2_M/https/www.heynutritionlady.com/wp-content/uploads/2021/02/halloumi_carbonara-SQ.jpg?format=webp&width=50&height=50"*/}
            {/*  className="rounded me-2"*/}
            {/*  alt=""*/}
            {/*/>*/}
            <strong className="me-auto">Notification</strong>
          </Toast.Header>
          <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}

export default App;
