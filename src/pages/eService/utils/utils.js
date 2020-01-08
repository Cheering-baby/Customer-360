import proCrockfords from '@/assets/image/pro-crockfords.png';
import proEquariusHotel from '@/assets/image/pro-equarius-hotel.png';
import proFestive from '@/assets/image/pro-festive.png';
import proGenting from '@/assets/image/pro-genting.png';
import proHarRrock from '@/assets/image/pro-hard-rock.png';
import proMichael from '@/assets/image/pro-michael-bigger.png';
import proEquariusBeachVillas from '@/assets/image/pro-equarius-beach-villas.png';

const property = [
  { hotelCode: 'HM', img: proMichael },
  { hotelCode: 'HR', img: proHarRrock },
  { hotelCode: 'FH', img: proFestive },
  { hotelCode: 'EH', img: proEquariusHotel },
  { hotelCode: 'BV', img: proEquariusBeachVillas },
  { hotelCode: 'CT', img: proCrockfords },
  { hotelCode: 'GHJ', img: proGenting },
];

export function imgPatch(target) {
  const reg = new RegExp(' ', 'g');
  const target1 = target.replace(reg, '');
  const now = property.filter(item => item.hotelCode === target1);
  return now[0].img;
}
