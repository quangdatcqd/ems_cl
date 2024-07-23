 
import { useEffect, useState } from 'react';
import { QrReader } from 'react-qr-reader'; 
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'; 

 
interface CheckedInData {
  userName: string,
  eventName: string,
  gender: string,
  seat: string,
  birthday: string
}

function Test() {
  const [cameras, setCameras] = useState<any>([]);
  const [selectedCamera, setSelectedCamera] = useState('');

  const [checkedInData, setCheckedInData] = useState<CheckedInData | any>()

  useEffect(() => {
    // request permission
    navigator.mediaDevices.getUserMedia(
      // constraints
      {
        video: true
      },
    ).then(  // successCallback
      function () {
        navigator.mediaDevices.enumerateDevices()
          .then(devices => {
            const videoDevices = devices.filter(device => device.kind === 'videoinput');
            if (videoDevices.length <= 1 && !videoDevices[0]?.deviceId) return
            setCameras(videoDevices);
            const lastDevice = videoDevices[videoDevices.length - 1];
            setSelectedCamera(lastDevice?.deviceId || '');
          })
          .catch(error => console.error('Error getting media devices:', error));

      },
    ).catch(function (err) {
      console.log(err.name + ": " + err.message);
    }) 
    return () => setCheckedInData(null)
  }, [])
  const handleCameraChange = (event: any) => {
    setSelectedCamera(event.target.value);
  };
  return (
    <>
      <div className="flex w-full justify-center items-center ">
        <EmojiEventsIcon sx={{ color: 'orange', fontSize: 40, borderRadius: '50%', border: '3px solid orange' }} />
      </div>
      {
        cameras?.length <= 0 && <p className=" text-center  font-bold  text-red-500  ">No cameras found  </p>
      }
      {
        (!checkedInData && !(checkedInData === "404")) &&
        < >
          <div className='mx-auto w-100 sm:mb-0 mb-3'>
            <label htmlFor="camera-select">Camera:</label>
            <select id="camera-select" className='font-bold' value={selectedCamera} onChange={handleCameraChange}>
              <option value="">None</option>
              {cameras?.map((camera: any) => (
                <option key={camera.deviceId} value={camera.deviceId}  >
                  {camera.label || `Camera ${cameras.indexOf(camera) + 1}`}
                </option>
              ))}
            </select>
          </div>

          <div className='relative  mx-auto  sm:w-[400px]  w-100   '>
            <p className=" absolute  text-slate-300 text-center left-[50%] -translate-x-[50%] top-14 font-bold z-50 w-[100%] ">Point the camera at the QR code  </p>
            <QrReader
              key={selectedCamera}
              containerStyle={{ width: "100%" }}
              constraints={{ deviceId: selectedCamera }}
              onResult={(e) => console.log(e)}
            />
          </div>
        </>
      }
    </>
  );
}

export default Test;