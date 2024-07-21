
import { useState } from 'react';
import { QrReader } from 'react-qr-reader';
export default function Test() {
  const [data, setData] = useState('No result');
  const constraints = { facingMode: 'user' }

  return <>
    <QrReader
      constraints={constraints}
      onResult={(result:any, error) => {
        if (!!result) {
          setData(result?.text);
        }else setData("noResult")

        if (!!error) {
          console.info(error);
        }
      }}
    />
    <p>{data}</p>
  </>
}