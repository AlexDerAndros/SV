import React, { useState, useEffect } from 'react';
import './SVKasten.css';
import { db } from '../config/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { getAuth, signInAnonymously } from 'firebase/auth';

export default function SVKasten() {
  const [text, setText] = useState('');

  useEffect(() => {
    const auth = getAuth();
    signInAnonymously(auth)
      .then(() => {
        // Signed in..
      })
      .catch((error) => {
        console.error("Authentication error:", error);
      });
  }, []);

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleClick = async () => {
    if (text.trim() !== '') {
      try {
        await addDoc(collection(db, 'messages'), {
          text: text,
          timestamp: new Date()
        });
        setText('');
      } catch (e) {
        console.error('Error adding document: ', e);
      }
    }
  };

  return (
    <>
      <div className="main_kasten">
        <div className="center">
          <div className="head">
            SV Kasten 
          </div>
          <div className="neinene"></div>
          <div className="kasten">
            <div className="texte">
              <div className="text">
                Wilkommen beim SV Kasten! Hier könnt ihr uns eure Wünsche und Beschwerden schicken, damit wir diese dann bestmöglich erfüllen können, um die Schule zu einem besseren Ort zu machen. Natürlich ist das ganze Anonym.
              </div>
            </div>
          </div>
          <div className='gap123'></div>
          <div className="kasten_schreiben">
            <div className="input">
              <input 
                type="text" 
                placeholder="Was wollen sie uns mitteilen?"
                className="input_real"
                value={text}
                onChange={handleChange}
              />
            </div>
            <div className='gap123'></div>
            <button className="button-36" role="button" onClick={handleClick}>Senden</button>
          </div>
        </div>
      </div>
    </>
  );
}
