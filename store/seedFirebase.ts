import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { exhibitions } from './exhibitions';

export const seedExhibitions = async () => {
  console.log('seedExhibitions 시작');
  try {
    for (const ex of exhibitions) {
      console.log('업로드 중:', ex.title);
      const response = await fetch(
        `https://firestore.googleapis.com/v1/projects/curart-cdaf2/databases/(default)/documents/exhibitions`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fields: {
              id: { integerValue: ex.id },
              title: { stringValue: ex.title },
              museum: { stringValue: ex.museum },
              city: { stringValue: ex.city },
              date: { stringValue: ex.date },
              image: { stringValue: ex.image },
              tag: { stringValue: ex.tag },
              genre: { stringValue: ex.genre },
              color: { stringValue: ex.color },
              ticketUrl: { stringValue: ex.ticketUrl },
              description: { stringValue: ex.description },
            }
          })
        }
      );
      const result = await response.json();
      console.log('결과:', result.name);
    }
    console.log('완료');
  } catch (error) {
    console.error('오류:', error);
  }
};