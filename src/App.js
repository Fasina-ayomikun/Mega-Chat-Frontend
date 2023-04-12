import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import ChatsPage from "./pages/chats/ChatsPage";
import ProfilePage from "./pages/profile/ProfilePage";
import NewContactModal from "./components/NewContactModal";
import ErrorPage from "./pages/error/ErrorPage";
import ContactModel from "./components/ContactModel";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='chats' element={<ChatsPage />} />
        <Route path='profile' element={<ProfilePage />} />

        <Route path='new-contact' element={<NewContactModal />} />
        <Route path='edit-contact/:id' element={<NewContactModal />} />
        <Route path='contacts' element={<ContactModel />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
