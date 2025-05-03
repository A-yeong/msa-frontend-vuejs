import {ref, computed} from "vue";

export default function userLogin() {
    const userId = ref("");
    const pw = ref("");

    const login = async() => {
        try {
            const response = await fetch('http://localhost:8080/api/v1/user/sign-in', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({userId: userId.value, pw: pw.value}),
            });
            if(!response.ok) {
              throw new Error('login failed');
            }
            alert('login successful');
          } catch(error){
            console.error(error);
            alert('Error login')
          }
    }

    return {
        userId,
        pw,
        login,
    }
}