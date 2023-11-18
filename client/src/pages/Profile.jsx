import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function Profile() {
  const fileRef = useRef(null);

  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(null);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (file) {
      handleFileUpload();
    }
  }, [file]);

  const handleFileUpload = () => {
    const storage = getStorage(); // Assuming `app` is defined globally or imported properly
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setFilePerc(Math.round(progress));
    }, (error) => {
      console.error('Error during upload:', error.code, error.message);
      if (error.code === 'storage/quota-exceeded') {
        console.log('Quota exceeded. Check Firebase Storage rules.');
      }
      setFileUploadError(true);
    }, () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setFormData({ ...formData, avatar: downloadURL });
        setFilePerc(100); // Set progress to 100% on completion
        setFile(null); // Clear the file state after successful upload
      });
    });
  };

  const resetUploadState = () => {
    setFilePerc(0);
    setFileUploadError(false);
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className="flex flex-col gap-4">
        <input onChange={(e) => { setFile(e.target.files[0]); resetUploadState(); }} type="file" ref={fileRef} hidden accept="image/*" />
        <img onClick={() => fileRef.current.click()} src={currentUser.avatar} alt="profile" className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2" />
        <p className='text-sm self-center'>
          {fileUploadError && (
            <span className='text-red-700'>
              Error: Image upload failed (check console for details).
            </span>
          )}
          {filePerc > 0 && filePerc < 100 && (
            <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
          )}
          {filePerc === 100 && (
            <span className='text-green-700'>Image successfully uploaded!</span>
          )}
        </p>

        <input type="text" placeholder="username" id="username" className="border p-3 rounded-lg" />
        <input type="text" placeholder="email" id="email" className="border p-3 rounded-lg" />
        <input type="text" placeholder="password" id="password" className="border p-3 rounded-lg" />
        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">Update</button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-500 cursor-pointer">Delete Account</span>
        <span className="text-red-500 cursor-pointer">Sign out</span>
      </div>
    </div>
  );
}

export default Profile;
