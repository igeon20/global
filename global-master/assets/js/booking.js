  firebase.initializeApp();
  
  const db = firebase.firestore();
  
  const bookingForm = document.getElementById('bookingForm');
  
  bookingForm.addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const formData = new FormData(bookingForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const otp1 = formData.get('otp-1') === 'true';
    const otp2 = formData.get('otp-2') === 'true';
    const otp3 = formData.get('otp-3') === 'true';
    const swimmingPool = formData.get('otp-4') === 'true';
    const otp5 = formData.get('otp-5') === 'true';
    const otp6 = formData.get('otp-6') === 'true';
    const oneroom = formData.get('oneroom');
    const tworoom = formData.get('tworoom');
    const imageUpload1 = formData.get('image-upload1');
    const imageUpload2 = formData.get('image-upload2');
    const imageUpload3 = formData.get('image-upload3');
  
    const floors = [];
    if (otp3) {
      floors.push(3);
    } else if (otp2) {
      floors.push(2);
    } else if (otp1) {
      floors.push(1);
    }
  
    const bookingData = {
      name,
      email,
      floors,
      swimmingPool,
      bbq,
      amenities,
      oneroom,
      tworoom,
    };
    
    // 이미지를 저장하는 방법은 데이터베이스에 따라 다릅니다. Firebase Storage를 사용하는 경우 다음과 같이 저장할 수 있습니다.
    // 이미지 저장에 대한 자세한 정보는 Firebase Storage 문서를 참조해 주세요.
    
    // 이미지 파일을 동일한 위치에 저장하려면 아래 주석을 제거하고 필요에 따라 코드를 수정하세요.
    /* const storageRef = firebase.storage().ref();
  
    if (imageUpload1) {
      storageRef.child('images/' + imageUpload1.name).put(imageUpload1);
    }
    if (imageUpload2) {
      storageRef.child('images/' + imageUpload2.name).put(imageUpload2);
    }
    if (imageUpload3) {
      storageRef.child('images/' + imageUpload3.name).put(imageUpload3);
    }
    */
  
    // 데이터베이스에 저장
    try {
      await db.collection('bookings').add(bookingData);
      alert('예약이 성공적으로 완료되었습니다.');
      bookingForm.reset();
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('예약 도중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  });
  