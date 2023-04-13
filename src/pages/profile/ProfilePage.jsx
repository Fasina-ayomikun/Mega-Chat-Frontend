import React, { useRef, useEffect } from "react";
import "./profile.css";
import { useDispatch, useSelector } from "react-redux";
import { handleChange, registerUser } from "../../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { uploadImage } from "../../features/files/fileSlice";
import { getFromLocalStorage } from "../../utils/localStorage";
import Loading from "../../utils/loadings/Loading";
function ProfilePage() {
  const { name, phone, bio } = useSelector((s) => s.user);
  let file = new FormData();
  const dispatch = useDispatch();
  const { isLoading: imageLoading, image } = useSelector((s) => s.file);
  const { isLoading } = useSelector((s) => s.user);
  const navigate = useNavigate();
  const user = getFromLocalStorage();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser({ name, bio, profilePicture: image, phone }));
  };
  const handleKeyUp = (input) => {
    const name = input.name;
    const value = input.value;
    dispatch(handleChange({ name, value }));
  };
  const fileRef = useRef();
  const handleFileUpload = (files) => {
    file.append("image", files[0]);
    dispatch(uploadImage(file));
  };
  useEffect(() => {
    if (user) {
      navigate("/chats");
    }
  }, [user]);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <section className='section'>
      <div className='container error-container'>
        <h1 className='h1-m'>Welcome to MegaChat</h1>

        <div className='picture-section'>
          {image ? (
            <img src={image} className='picture' alt='profile' />
          ) : (
            <div
              className='picture-container'
              onClick={() => {
                fileRef?.current.click();
              }}
              multiple={false}
            ></div>
          )}
          <input
            ref={fileRef}
            type='file'
            disabled={imageLoading ? true : false}
            onChange={(e) => handleFileUpload(e.target.files)}
            style={{ display: "none" }}
            accept='image/png, image/jpeg'
          />
          <p>Add Picture</p>
        </div>

        <form onSubmit={handleSubmit}>
          <label htmlFor='name' className='label'>
            Name:
          </label>
          <input
            type='text'
            onKeyUp={(e) => handleKeyUp(e.target)}
            id='name'
            name='name'
            className='input'
            placeholder='John Doe'
            autoComplete='off'
            minLength='2'
            required
            pattern='^[آ-یA-z]{2,}( [آ-یA-z]{2,})+([آ-یA-z]|[ ]?)$'
          />
          <label htmlFor='bio' className='label'>
            Bio:
          </label>
          <input
            onKeyUp={(e) => handleKeyUp(e.target)}
            type='text'
            id='bio'
            name='bio'
            className='input'
            maxLength='50'
            placeholder='Hey there! I use MegaChat.'
            autoComplete='off'
          />
          <button type='submit' className='btn'>
            Done
          </button>
        </form>
      </div>
    </section>
  );
}

export default ProfilePage;
